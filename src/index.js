import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

export function useChatbot() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m Nic\'s portfolio assistant. Ask me about his projects, skills, or experience!' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = { role: 'user', content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash", 
        systemInstruction: `You are a helpful assistant for Nic Angelo Idian's portfolio. Answer questions about:
- His projects: BarangayCare, Broadcast Management System, and My-Shopify (e-commerce platform)
- His skills: React, Flutter, Ruby on Rails, PHP, JavaScript, PostgreSQL, MySQL, Docker, AWS
- His background: BS IT graduate from University of Nueva Caceres, located in Naga, Bicol Region
- Contact: nicangelo.idian@unc.edu.ph, GitHub: @NiccAngelo
Be friendly, concise, and helpful.`
      });
     
      const conversationHistory = messages
        .filter(msg => msg.content !== "Hi! I'm Nic's portfolio assistant. Ask me about his projects, skills, or experience!")
        .map(msg => ({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }]
        }));

      const chat = model.startChat({
        history: conversationHistory,
        generationConfig: { temperature: 0.7, maxOutputTokens: 1000 },
      });

      const result = await chat.sendMessage(inputMessage);
      const text = result.response.text();
      setMessages(prev => [...prev, { role: 'assistant', content: text }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Error: ${error.message || 'Please try again or contact Nic directly!'}`
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return { messages, inputMessage, setInputMessage, isTyping, handleChatSubmit };
}