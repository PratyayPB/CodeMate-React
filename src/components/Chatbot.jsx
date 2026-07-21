import React, { useState } from 'react';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Chatbot logic will be added here
        setInput('');
    };

    return (
        <div className="chatbot-widget">
            <button 
                id="chatbot-toggle" 
                className="chatbot-toggle-btn" 
                aria-label="Toggle Chat"
                onClick={toggleChat}
            >
                <i className="fa-solid fa-message"></i>
            </button>
            
            <div id="chatbot-window" className={`chatbot-window ${isOpen ? '' : 'hidden'}`}>
                <div className="chatbot-header">
                    <div className="chatbot-header-info">
                        <div className="chatbot-avatar">
                            <i className="fa-solid fa-robot"></i>
                        </div>
                        <div>
                            <h3>CodeMate Assistant</h3>
                            <p>Online</p>
                        </div>
                    </div>
                    <button 
                        id="chatbot-close" 
                        className="chatbot-close-btn" 
                        aria-label="Close Chat"
                        onClick={toggleChat}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                
                <div id="chatbot-messages" className="chatbot-messages">
                    <div className="message bot-message">
                        <div className="message-content">
                            Hi! I'm the CodeMate Assistant. How can I help you today?
                        </div>
                    </div>
                </div>
                
                <form id="chatbot-form" className="chatbot-input-area" onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        id="chatbot-input" 
                        placeholder="Ask about CodeMate..." 
                        autoComplete="off" 
                        required 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button type="submit" id="chatbot-send" aria-label="Send Message">
                        <i className="fa-solid fa-paper-plane"></i>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chatbot;
