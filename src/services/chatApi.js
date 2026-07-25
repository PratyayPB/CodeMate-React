/**
 * Sends user message and conversation history to backend /api/chat RAG endpoint
 * @param {string} message - User's current message
 * @param {Array<{role: string, content: string}>} history - Previous messages
 * @returns {Promise<{answer: string, sources: Array<{text: string, score: number}>}>}
 */
export async function sendChatMessage(message, history = []) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message, history }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to reach CodeMate AI assistant.');
  }

  return data;
}
