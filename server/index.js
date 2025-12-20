import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

/* =======================
   Middleware
======================= */
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.get('/', (req, res) => {
  res.status(200).json({ 
    status: 'healthy',
    service: 'Portfolio Chatbot API',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.post('/chat', async (req, res) => {
  const { messages = [], inputMessage } = req.body;

  if (!process.env.GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY not configured');
    return res.status(500).json({
      text: 'Server misconfiguration: GEMINI_API_KEY missing'
    });
  }

  if (!inputMessage) {
    return res.status(400).json({
      text: 'Missing inputMessage in request'
    });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: `You are Nizamin, a helpful assistant for Nic Angelo Idian's portfolio. Answer questions about:
- Projects: BarangayCare, Broadcast Management System, My-Shopify
- Skills: React, Flutter, Ruby on Rails, PHP, JavaScript, PostgreSQL, MySQL, Docker, AWS
- Background: BS IT graduate from University of Nueva Caceres, Naga, Bicol
- Contact: nicangelo.idian@unc.edu.ph, GitHub: @NiccAngelo
Be friendly, concise, and helpful.`
    });

    // Only process history if messages array is not empty
    const conversationHistory = messages.length > 0 
      ? messages.map(msg => ({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }]
        }))
      : [];

    const chat = model.startChat({
      history: conversationHistory,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000
      }
    });

    const result = await chat.sendMessage(inputMessage);
    const responseText = result.response.text();
    
    console.log('Gemini response:', responseText);
    res.json({ text: responseText });

  } catch (error) {
    console.error('Gemini error:', error);
    console.error('Error message:', error.message);
    res.status(500).json({
      text: 'Error processing request. Please try again later.'
    });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});