import { useState, useCallback } from 'react';
import { sendChatMessage } from '../services/chatApi';

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastPrompt, setLastPrompt] = useState(null);

  const sendMessage = useCallback(async (userText) => {
    if (!userText || !userText.trim() || isLoading) return;

    const trimmedText = userText.trim();
    setLastPrompt(trimmedText);

    const userMessage = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      content: trimmedText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Format current messages for backend history (excluding errors)
    const history = messages
      .filter((m) => !m.isError)
      .map((m) => ({ role: m.role, content: m.content }));

    try {
      const data = await sendChatMessage(trimmedText, history);

      const assistantMessage = {
        id: `msg-${Date.now()}-assistant`,
        role: 'assistant',
        content: data.answer,
        sources: data.sources || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage = {
        id: `msg-${Date.now()}-error`,
        role: 'assistant',
        content: err.message || 'Sorry, I encountered an error connecting to CodeMate AI.',
        isError: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading]);

  const regenerateLastResponse = useCallback(async () => {
    if (!lastPrompt || isLoading) return;

    // Remove the last assistant error/message if applicable
    setMessages((prev) => {
      if (prev.length > 0 && prev[prev.length - 1].role === 'assistant') {
        return prev.slice(0, -1);
      }
      return prev;
    });

    setIsLoading(true);

    const history = messages
      .slice(0, -2) // exclude last user & assistant pair
      .filter((m) => !m.isError)
      .map((m) => ({ role: m.role, content: m.content }));

    try {
      const data = await sendChatMessage(lastPrompt, history);

      const assistantMessage = {
        id: `msg-${Date.now()}-assistant`,
        role: 'assistant',
        content: data.answer,
        sources: data.sources || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage = {
        id: `msg-${Date.now()}-error`,
        role: 'assistant',
        content: err.message || 'Sorry, I encountered an error connecting to CodeMate AI.',
        isError: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [lastPrompt, isLoading, messages]);

  const clearConversation = useCallback(() => {
    setMessages([]);
    setLastPrompt(null);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    regenerateLastResponse,
    clearConversation,
  };
}
