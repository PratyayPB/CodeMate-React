import { pipeline, env } from "@xenova/transformers";
import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenAI } from "@google/genai";

// Configure transformers to use /tmp for caching models on Vercel Serverless
env.cacheDir = "/tmp";
env.allowLocalModels = false;

// Cache the embedding pipeline outside the handler for warm starts
let generateEmbedding = null;

// Initialize Pinecone client lazily
let pc = null;
function getPineconeIndex() {
  if (!pc) {
    if (!process.env.PINECONE_API_KEY) {
      throw new Error("PINECONE_API_KEY is not configured.");
    }
    pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
  }
  const indexName = process.env.PINECONE_INDEX_NAME || "codemate-index";
  return pc.Index(indexName);
}

/**
 * Helper to call Gemini model with timeout
 */
async function generateWithTimeout(ai, model, contents, systemInstruction, timeoutMs = 15000) {
  const timeoutPromise = new Promise((_, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`TIMEOUT: Model ${model} timed out after ${timeoutMs / 1000}s`));
    }, timeoutMs);
    // Unref timer if available in node environment
    if (timer.unref) timer.unref();
  });

  const apiPromise = ai.models.generateContent({
    model: model,
    contents: contents,
    config: {
      systemInstruction: systemInstruction,
      temperature: 0.3,
    },
  });

  return Promise.race([apiPromise, timeoutPromise]);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // 1. Parse User Query & History
    const { message, history } = req.body || {};
    if (!message || typeof message !== "string" || !message.trim()) {
      return res
        .status(400)
        .json({ error: "Message is required and must be non-empty string." });
    }

    // 2. Check & Sanitize Gemini API Key
    let rawApiKey = process.env.GEMINI_API_KEY || "";
    const geminiApiKey = rawApiKey.trim().replace(/[\r\n]+/g, "");

    if (!geminiApiKey) {
      return res.status(500).json({
        error: "GEMINI_API_KEY is not configured or invalid on the server.",
      });
    }

    // 3. Generate Embedding using all-MiniLM-L6-v2
    if (!generateEmbedding) {
      generateEmbedding = await pipeline(
        "feature-extraction",
        "Xenova/all-MiniLM-L6-v2",
      );
    }
    const output = await generateEmbedding(message, {
      pooling: "mean",
      normalize: true,
    });
    const embeddingArray = Array.from(output.data);

    // 4. Query Pinecone (retrieve top 5 relevant chunks)
    const index = getPineconeIndex();
    const queryResponse = await index.query({
      vector: embeddingArray,
      topK: 5,
      includeMetadata: true,
    });

    const matches = queryResponse.matches || [];
    const context = matches
      .map((m) => m.metadata?.text || "")
      .filter(Boolean)
      .join("\n\n---\n\n");

    // Prepare source attributions
    const sources = matches.map((m) => ({
      text: m.metadata?.text
        ? m.metadata.text.substring(0, 150) + "..."
        : "Knowledge Chunk",
      score: Math.round((m.score || 0) * 100) / 100,
    }));

    // 5. Construct System Prompt & Messages with Memory (Server-Side Only)
    const systemPrompt = `You are the official AI assistant for CodeMate, the student-led technology community of NEHU, Shillong.

CRITICAL INSTRUCTIONS:
- Answer ONLY using the supplied context below.
- If the information is not available in the context, politely respond: "I don't have that specific information in my CodeMate knowledge base. Feel free to contact Team CodeMate directly!"
- Do NOT make up facts or hallucinate details not present in the context.
- Be concise, accurate, friendly, and professional.
- Format your response clearly using markdown formatting where helpful (bullet points, bold text, etc.).

SUPPLIED CONTEXT:
${context || "No context found."}`;

    // Format conversation history for Google Gemini SDK format
    const contents = [];

    if (Array.isArray(history)) {
      history.slice(-6).forEach((h) => {
        const role = h.role === "user" ? "user" : "model";
        const text = String(h.content || "").trim();
        if (text) {
          contents.push({
            role: role,
            parts: [{ text: text }],
          });
        }
      });
    }

    // Add current user prompt
    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    // 6. Initialize Google Gemini SDK with sanitized API key
    const ai = new GoogleGenAI({ apiKey: geminiApiKey });

    // Candidate models list with fallbacks
    const MODELS = [
      "gemini-3.6-flash",
      "gemini-3.5-flash",
      "gemini-2.0-flash",
      "gemini-1.5-flash",
    ];

    let answer = null;
    let lastError = null;
    let isRateLimited = false;

    for (const model of MODELS) {
      try {
        console.log(`Attempting Gemini model: ${model}`);
        const response = await generateWithTimeout(ai, model, contents, systemPrompt, 15000);
        
        if (response && response.text) {
          answer = response.text;
          break; // Success!
        }
      } catch (err) {
        const errMessage = err?.message || String(err);
        console.warn(`Gemini model ${model} failed:`, errMessage);
        lastError = errMessage;

        if (errMessage.includes("429") || errMessage.toLowerCase().includes("rate limit") || errMessage.toLowerCase().includes("quota")) {
          isRateLimited = true;
        }
      }
    }

    if (!answer) {
      console.error("All candidate Gemini models failed. Last error:", lastError);

      if (isRateLimited) {
        return res.status(429).json({
          error: "Gemini API rate limit or quota exceeded. Please wait a minute and try again.",
        });
      }

      if (lastError && lastError.startsWith("TIMEOUT")) {
        return res.status(504).json({
          error: "Response timed out. Please ask a shorter question or try again.",
        });
      }

      return res.status(502).json({
        error: "All Gemini LLM providers are currently busy or unavailable. Please try again shortly.",
      });
    }

    return res.status(200).json({ answer, sources });
  } catch (error) {
    console.error("Chat API Error:", error);
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
}
