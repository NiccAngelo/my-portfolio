import React, { useState } from 'react';
import { MessageCircle, X, ArrowRight } from 'lucide-react';

const Chatbot = ({ messages, inputMessage, setInputMessage, isTyping, onSubmit }) => {
  const [chatbotOpen, setChatbotOpen] = useState(false);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim() || isTyping) return;
    onSubmit(e);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setChatbotOpen(!chatbotOpen)}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#3d5a45] to-[#5a7a63] text-white rounded-full shadow-2xl hover:scale-110 transition-all z-50 flex items-center justify-center"
        aria-label="Open chat"
      >
        {chatbotOpen ? (
          <X size={20} className="md:w-6 md:h-6" />
        ) : (
          <MessageCircle size={20} className="md:w-6 md:h-6" />
        )}
      </button>

      {/* Chatbot Window */}
      {chatbotOpen && (
        <div className="fixed inset-x-4 bottom-20 md:bottom-24 md:right-6 md:left-auto md:w-96 h-[calc(100vh-120px)] max-h-[600px] bg-white rounded-2xl md:rounded-3xl shadow-2xl border border-[#a8b5a0]/20 z-50 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#3d5a45] to-[#5a7a63] text-white p-3 md:p-4 rounded-t-2xl md:rounded-t-3xl flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <MessageCircle size={16} className="md:w-5 md:h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm md:text-base truncate">Nizamin</h3>
              <p className="text-xs text-white/80">Portfolio Assistant</p>
            </div>
            <button
              onClick={() => setChatbotOpen(false)}
              className="p-1.5 md:p-2 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
            >
              <X size={18} className="md:w-5 md:h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4 bg-gradient-to-b from-[#f5f8f6] to-white">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] md:max-w-[80%] px-3 py-2 md:px-4 md:py-3 rounded-2xl text-xs md:text-sm ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-[#3d5a45] to-[#5a7a63] text-white'
                      : 'bg-[#e8ede6] text-[#2d4739] border border-[#d4dcd0]/30'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#e8ede6] border border-[#d4dcd0]/30 px-3 py-2 md:px-4 md:py-3 rounded-2xl">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-[#5a7a63] rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-[#5a7a63] rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-[#5a7a63] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 md:p-4 border-t border-[#d4dcd0] bg-white rounded-b-2xl md:rounded-b-3xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about my work..."
                className="flex-1 px-3 py-2 md:px-4 md:py-3 text-sm md:text-base border-2 border-[#d4dcd0] rounded-xl focus:outline-none focus:border-[#3d5a45] transition-colors"
              />
              <button
                onClick={handleSubmit}
                disabled={isTyping || !inputMessage.trim()}
                className="px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-[#3d5a45] to-[#5a7a63] text-white rounded-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                <ArrowRight size={18} className="md:w-5 md:h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;