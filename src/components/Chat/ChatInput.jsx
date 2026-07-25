import React, { useState, useRef, useEffect } from 'react';

const ChatInput = ({ onSend, isLoading }) => {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [text]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || isLoading) return;
    onSend(text);
    setText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form className="chat-input-container" onSubmit={handleSubmit}>
      <textarea
        ref={textareaRef}
        className="chat-textarea"
        placeholder="Ask about CodeMate (e.g. teams, events, resources)..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        rows={1}
      />
      <button
        type="submit"
        className="chat-send-btn"
        disabled={!text.trim() || isLoading}
        aria-label="Send Message"
      >
        {isLoading ? (
          <i className="fa-solid fa-spinner fa-spin"></i>
        ) : (
          <i className="fa-solid fa-paper-plane"></i>
        )}
      </button>
    </form>
  );
};

export default ChatInput;
