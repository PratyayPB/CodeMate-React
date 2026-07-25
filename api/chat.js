import { pipeline, env } from '@xenova/transformers';
import { Pinecone } from '@pinecone-database/pinecone';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

// Configure transformers to use /tmp for caching models on Vercel Serverless
env.cacheDir = '/tmp';
env.allowLocalModels = false;

// Initialize Upstash Redis & Ratelimiter if credentials are available
let ratelimit = null;
if (process.env.CodeMateRAG_KV_REST_API_URL && process.env.CodeMateRAG_KV_REST_API_TOKEN) {
  const redis = new Redis({
    url: process.env.CodeMateRAG_KV_REST_API_URL,
    token: process.env.CodeMateRAG_KV_REST_API_TOKEN,
  });

  // Sliding window ratelimiter (20 requests per minute per IP)
  ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(20, "1 m"),
  });
}

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
  const indexName = process.env.PINECONE_INDEX_NAME || 'codemate-index';
  return pc.Index(indexName);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // 1. Rate Limiting
    if (ratelimit) {
      const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '127.0.0.1';
      const { success, limit, remaining, reset } = await ratelimit.limit(ip);
      
      res.setHeader('X-RateLimit-Limit', limit);
      res.setHeader('X-RateLimit-Remaining', remaining);
      res.setHeader('X-RateLimit-Reset', reset);

      if (!success) {
        return res.status(429).json({ error: 'Rate limit exceeded: 20 requests per minute. Please wait a moment before asking another question.' });
      }
    }

    // 2. Parse User Query & History
    const { message, history } = req.body || {};
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message is required and must be non-empty string.' });
    }

    // 3. Generate Embedding using all-MiniLM-L6-v2
    if (!generateEmbedding) {
      generateEmbedding = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
    }
    const output = await generateEmbedding(message, { pooling: 'mean', normalize: true });
    const embeddingArray = Array.from(output.data);

    // 4. Query Pinecone (retrieve top 5 relevant chunks)
    const index = getPineconeIndex();
    const queryResponse = await index.query({
      vector: embeddingArray,
      topK: 5,
      includeMetadata: true
    });
    
    const matches = queryResponse.matches || [];
    const context = matches.map(m => m.metadata?.text || '').filter(Boolean).join('\n\n---\n\n');
    
    // Prepare source attributions
    const sources = matches.map(m => ({
      text: m.metadata?.text ? (m.metadata.text.substring(0, 150) + '...') : 'Knowledge Chunk',
      score: Math.round((m.score || 0) * 100) / 100
    }));

    // 5. Construct System Prompt & Messages with Memory
    const systemPrompt = `You are the official AI assistant for CodeMate, the student-led technology community of NEHU, Shillong.

CRITICAL INSTRUCTIONS:
- Answer ONLY using the supplied context below.
- If the information is not available in the context, politely respond: "I don't have that specific information in my CodeMate knowledge base. Feel free to contact Team CodeMate directly!"
- Do NOT make up facts or hallucinate details not present in the context.
- Be concise, accurate, friendly, and professional.
- Format your response clearly using markdown formatting where helpful (bullet points, bold text, etc.).

SUPPLIED CONTEXT:
${context || "No context found."}`;

    // Include up to 6 recent conversation history items
    const formattedHistory = Array.isArray(history) 
      ? history.slice(-6).map(h => ({
          role: h.role === 'user' ? 'user' : 'assistant',
          content: String(h.content || '')
        }))
      : [];

    const llmMessages = [
      { role: "system", content: systemPrompt },
      ...formattedHistory,
      { role: "user", content: message }
    ];

    // 6. Call OpenRouter API with Fallback Model Support
    const openRouterKey = process.env.OPENROUTER_API_KEY;
    if (!openRouterKey) {
      throw new Error("OPENROUTER_API_KEY is not configured.");
    }

    const CANDIDATE_MODELS = [
      "google/gemma-4-31b-it:free",
      "meta-llama/llama-3.3-70b-instruct:free",
      "deepseek/deepseek-r1:free",
      "qwen/qwen-2.5-72b-instruct:free",
      "mistralai/mistral-7b-instruct:free"
    ];

    let answer = null;
    let lastError = null;

    for (const model of CANDIDATE_MODELS) {
      try {
        const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${openRouterKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://codematenehu.vercel.app",
            "X-Title": "CodeMate AI Assistant"
          },
          body: JSON.stringify({
            model: model,
            messages: llmMessages,
            temperature: 0.3
          })
        });

        if (openRouterResponse.ok) {
          const data = await openRouterResponse.json();
          answer = data.choices?.[0]?.message?.content;
          if (answer) break; // Successfully retrieved an answer!
        } else {
          const errText = await openRouterResponse.text();
          console.warn(`OpenRouter model ${model} failed (${openRouterResponse.status}): ${errText}`);
          lastError = errText;
        }
      } catch (err) {
        console.warn(`Error trying OpenRouter model ${model}:`, err);
        lastError = err.message;
      }
    }

    if (!answer) {
      console.error('All candidate LLM models failed. Last error:', lastError);
      return res.status(502).json({ error: 'All free LLM providers are currently busy. Please try again in a few seconds.' });
    }

    return res.status(200).json({ answer, sources });

  } catch (error) {
    console.error('Chat API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
