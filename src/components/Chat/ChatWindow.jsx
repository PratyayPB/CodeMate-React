import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../../hooks/useChat';
import Message from './Message';
import TypingIndicator from './TypingIndicator';
import SuggestedQuestions from './SuggestedQuestions';
import ChatInput from './ChatInput';
import '../../styles/chat.css';

const ChatWindow = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, isLoading, sendMessage, regenerateLastResponse, clearConversation } = useChat();
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen((prev) => !prev);

  // Auto-scroll to bottom whenever messages update or loading state changes
  useEffect(() => {
    if (messagesEndRef.current && isOpen) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  return (
    <div className="chat-widget-root">
      {/* Floating Toggle Button */}
      <button
        id="chatbot-toggle"
        className={`chat-toggle-btn ${isOpen ? 'active' : ''}`}
        aria-label="Toggle Chatbot"
        onClick={toggleChat}
      >
        <i className={isOpen ? "fa-solid fa-xmark" : "fa-solid fa-comments"}></i>
        {!isOpen && <span className="chat-toggle-badge">AI</span>}
      </button>

      {/* Main Chatbot Window */}
      <div className={`chat-window-panel ${isOpen ? 'open' : 'closed'}`}>
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="chat-avatar-icon">
              <i className="fa-solid fa-robot"></i>
            </div>
            <div>
              <h3>CodeMate Assistant</h3>
              <p className="chat-status">
                <span className="status-dot"></span> Powered by RAG & AI
              </p>
            </div>
          </div>
          <div className="chat-header-actions">
            {messages.length > 0 && (
              <button
                className="chat-icon-btn"
                title="Clear conversation"
                onClick={clearConversation}
              >
                <i className="fa-solid fa-trash-can"></i>
              </button>
            )}
            <button
              className="chat-icon-btn"
              title="Close chat"
              onClick={toggleChat}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>

        {/* Messages Body */}
        <div className="chat-body">
          {/* Welcome Message */}
          <div className="chat-msg assistant-msg welcome-msg">
            <div className="msg-avatar">
              <i className="fa-solid fa-robot"></i>
            </div>
            <div className="msg-content-wrap">
              <div className="msg-bubble">
                <p className="msg-paragraph">
                  👋 Hi! I'm the <strong>CodeMate AI Assistant</strong>. Ask me anything about our community, leadership, events, or resources!
                </p>
              </div>
            </div>
          </div>

          {/* Suggested Questions when list is empty */}
          {messages.length === 0 && (
            <SuggestedQuestions onSelectQuestion={sendMessage} />
          )}

          {/* Chat Messages */}
          {messages.map((msg, index) => (
            <Message
              key={msg.id || index}
              message={msg}
              isLast={index === messages.length - 1}
              onRegenerate={regenerateLastResponse}
            />
          ))}

          {/* Typing Loading Indicator */}
          {isLoading && <TypingIndicator />}

          <div ref={messagesEndRef} />
        </div>

        {/* Footer Input */}
        <ChatInput onSend={sendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatWindow;
