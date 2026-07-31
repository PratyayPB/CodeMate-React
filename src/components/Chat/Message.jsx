import React, { useState } from 'react';
import { renderMarkdown } from '../../utils/markdown';

const Message = ({ message, isLast, onRegenerate }) => {
  const [copied, setCopied] = useState(false);
  const [showSources, setShowSources] = useState(false);

  const isUser = message.role === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`chat-msg ${isUser ? 'user-msg' : 'assistant-msg'} ${message.isError ? 'error-msg' : ''}`}>
      <div className="msg-avatar">
        {isUser ? <i className="fa-solid fa-user"></i> : <i className="fa-solid fa-robot"></i>}
      </div>

      <div className="msg-content-wrap">
        <div className="msg-bubble">
          {isUser ? (
            <p className="msg-paragraph">{message.content}</p>
          ) : (
            <div className="msg-markdown">{renderMarkdown(message.content)}</div>
          )}

          {/* Timestamp */}
          {message.timestamp && <span className="msg-timestamp">{message.timestamp}</span>}
        </div>

        {/* Source Attributions */}
        {!isUser && message.sources && message.sources.length > 0 && (
          <div className="msg-sources">
            <button
              className="toggle-sources-btn"
              onClick={() => setShowSources(!showSources)}
            >
              <i className="fa-solid fa-book-open"></i> {showSources ? 'Hide Sources' : `Sources (${message.sources.length})`}
            </button>

            {showSources && (
              <div className="sources-list">
                {message.sources.map((src, i) => (
                  <div key={i} className="source-pill">
                    <span className="source-score">Relevance: {Math.round(src.score * 100)}%</span>
                    <p className="source-snippet">"{src.text}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Action Buttons for Assistant Message */}
        {!isUser && (
          <div className="msg-actions">
            <button className="msg-action-btn" onClick={handleCopy} title="Copy message">
              <i className={copied ? "fa-solid fa-check" : "fa-solid fa-copy"}></i>
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            {(isLast || message.isError) && onRegenerate && (
              <button className="msg-action-btn" onClick={onRegenerate} title="Regenerate response">
                <i className="fa-solid fa-rotate-right"></i>
                <span>Retry</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
