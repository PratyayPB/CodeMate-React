import React from 'react';

const TypingIndicator = () => {
  return (
    <div className="chat-msg assistant-msg typing-msg">
      <div className="msg-avatar">
        <i className="fa-solid fa-robot"></i>
      </div>
      <div className="msg-bubble typing-bubble">
        <div className="typing-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
