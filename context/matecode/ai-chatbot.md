# AI Agent Implementation Prompt

You are a senior Full Stack Engineer and AI Systems Architect. Your task is to design and implement a production-ready AI chatbot for my existing React application.

## Project Context

I currently have a **frontend-only React application**.

The project already contains:

- A knowledge base (`codemate_knowledge.md`)
- An embedding script (`embed.js`)
- Pinecone configured as the vector database
- Embeddings generated using `Xenova/all-MiniLM-L6-v2`

The embedding script uploads the knowledge base into Pinecone.

**Do NOT change the embedding pipeline unless absolutely necessary.**

The chatbot should use the existing Pinecone index.

---

# Goal

Implement a secure Retrieval-Augmented Generation (RAG) chatbot using a **hybrid architecture**.

The frontend remains a React application while AI processing occurs inside a single serverless backend endpoint.

The chatbot should answer questions exclusively using the CodeMate knowledge base.

---

# Architecture

```
React Frontend
        │
        ▼
POST /api/chat
        │
        ▼
Serverless Function
        │
        ├── Generate embedding
        ├── Query Pinecone
        ├── Retrieve relevant chunks
        ├── Build prompt
        ├── Call LLM
        └── Return answer
        │
        ▼
React Chat Interface
```

---

# Technology Stack

Frontend

- React
- Material UI (existing design system)
- React Hooks

Backend

- Vercel Serverless Functions (preferred)
- Node.js

AI

- Pinecone
- Existing embedding model (all-MiniLM-L6-v2)
- Gemini or OpenAI API (configurable)

---

# Requirements

## 1. Chat UI

Create a modern chatbot interface.

Features:

- Floating chatbot or dedicated page
- Responsive
- Auto-scroll
- Typing indicator
- Loading state
- Markdown rendering
- User messages
- Assistant messages
- Error state
- Retry button

The UI should integrate naturally into the existing application.

---

## 2. Backend API

Create

```
/api/chat
```

Responsibilities

- Validate request
- Receive

```
{
    message,
    history
}
```

- Generate embedding for the user question
- Query Pinecone
- Retrieve top 5 relevant chunks
- Build context
- Call Gemini/OpenAI
- Return answer

Never expose API keys to the frontend.

---

## 3. Retrieval Pipeline

Use this sequence:

1. User asks a question.
2. Generate embedding using the existing embedding model.
3. Query Pinecone.
4. Retrieve the most relevant chunks.
5. Build context.
6. Send context to the LLM.
7. Return the generated answer.

---

## 4. Prompt Engineering

Use a strong system prompt.

Example:

```
You are the official AI assistant for CodeMate.

Answer ONLY using the supplied context.

If the answer cannot be found inside the context,
politely say that the information is not available.

Do not hallucinate.

Be concise, accurate, and professional.
```

---

## 5. Conversation Memory

Support multi-turn conversations.

Every request includes previous messages.

The backend should include recent conversation history when constructing the prompt.

Limit history length to avoid excessive token usage.

---

## 6. Source Attribution

Return the retrieved chunks.

Example response:

```json
{
  "answer": "...",
  "sources": [
    {
      "title": "About CodeMate",
      "score": 0.93
    },
    {
      "title": "FAQ",
      "score": 0.89
    }
  ]
}
```

Display the sources below every AI response.

---

## 7. Error Handling

Handle:

- Empty messages
- Pinecone failures
- LLM failures
- Timeouts
- Missing API keys
- Network failures

Return meaningful error messages.

---

## 8. Security

API keys must remain server-side.

Never expose

- Pinecone API key
- Gemini key
- OpenAI key

Use environment variables.

---

## 9. Folder Structure

Follow this structure:

```
src/
│
├── components/
│   └── Chat/
│       ├── ChatWindow.jsx
│       ├── ChatInput.jsx
│       ├── Message.jsx
│       ├── TypingIndicator.jsx
│       └── SuggestedQuestions.jsx
│
├── hooks/
│   └── useChat.js
│
├── services/
│   └── chatApi.js
│
└── pages/
    └── Chat.jsx

api/
└── chat.js

lib/
├── pinecone.js
├── embedding.js
├── retrieval.js
├── prompt.js
└── llm.js

knowledge/
scripts/
```

---

## 10. Suggested Questions

When the chat loads, display example prompts like:

- What is CodeMate?
- How can I join CodeMate?
- What events does CodeMate organize?
- Who is the Tech Team Lead?
- Does CodeMate provide mentorship?
- What resources are available?

---

## 11. Streaming

If supported by the selected LLM, stream responses token-by-token for a natural typing experience.

Otherwise, gracefully fall back to standard responses.

---

## 12. UI Enhancements

Include:

- Copy response
- Regenerate response
- Clear conversation
- Enter to send
- Shift+Enter for newline
- Scroll to latest message
- Mobile responsive layout
- Dark mode compatibility

---

## 13. Performance

- Reuse clients instead of recreating them.
- Keep API latency low.
- Limit retrieved chunks.
- Cache reusable objects where appropriate.
- Avoid unnecessary rerenders in React.

---

## 14. Code Quality

The implementation must:

- Use modern React patterns
- Be modular
- Be strongly typed if TypeScript is available
- Include comments where appropriate
- Follow clean architecture principles
- Be production-ready
- Be easy to extend

---

## 15. Deliverables

Implement the feature incrementally.

For every step:

1. Explain what will be implemented.
2. Generate the code.
3. Explain how to test it.
4. Wait until that step is complete before moving to the next.

Do not skip steps.

---

## Success Criteria

The final chatbot should:

- Answer questions using the existing CodeMate knowledge base.
- Retrieve context from Pinecone.
- Generate accurate responses through an LLM.
- Never hallucinate when information is unavailable.
- Maintain conversational context.
- Display cited sources.
- Integrate seamlessly into the existing React application.
- Be secure, scalable, maintainable, and production-ready.
