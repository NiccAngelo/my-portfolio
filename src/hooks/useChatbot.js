import { useState } from 'react';

export function useChatbot() {
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: 'Hi! I\'m Nizamin, your portfolio assistant. Ask me about Nic Angelo\'s skills, projects, or experience!' 
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleChatSubmit = async (e) => {
    if (e?.preventDefault) {
      e.preventDefault();
    }
    
    if (!inputMessage.trim()) return;

    const userMessage = { role: 'user', content: inputMessage };
    const currentInput = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    // Update messages BEFORE sending to include the new user message
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    try {
      const API_URL = import.meta.env.VITE_API_URL;

      // Build conversation history excluding the initial greeting
      const conversationHistory = updatedMessages
        .filter(msg => 
          msg.content !== 'Hi! I\'m Nizamin, your portfolio assistant. Ask me about Nic Angelo\'s skills, projects, or experience!'
        )
        .map(msg => ({
          role: msg.role,
          content: msg.content
        }));

      // Remove the current user message from history since we're sending it as inputMessage
      const historyWithoutCurrent = conversationHistory.slice(0, -1);

      console.log('Sending to backend:', {
        inputMessage: currentInput,
        messages: historyWithoutCurrent
      });

      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputMessage: currentInput,
          messages: historyWithoutCurrent
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Server error:', response.status);
        console.error('Error details:', JSON.stringify(errorData, null, 2));
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Backend response:', data);
      
      const assistantMessage = data.text || 'No response received';
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: assistantMessage
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I\'m having trouble connecting. Please check your internet connection or try again later!'
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return { messages, inputMessage, setInputMessage, isTyping, handleChatSubmit };
}