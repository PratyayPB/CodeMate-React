import React from 'react';

const SUGGESTED_QUESTIONS = [
  "What is CodeMate?",
  "How can I join CodeMate?",
  "What events does CodeMate organize?",
  "Who is the Tech Team Lead?",
  "Does CodeMate provide mentorship?",
  "What resources are available?"
];

const SuggestedQuestions = ({ onSelectQuestion }) => {
  return (
    <div className="suggested-questions-container">
      <p className="suggested-title">💡 Frequently Asked Questions:</p>
      <div className="suggested-chips">
        {SUGGESTED_QUESTIONS.map((q, idx) => (
          <button
            key={idx}
            className="suggested-chip"
            onClick={() => onSelectQuestion(q)}
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedQuestions;
