import { GoogleGenerativeAI } from '@google/generative-ai';

export const chat = async (event) => {
  // Handle preflight CORS
  if (event.requestContext.http.method === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    };
  }

  try {
    const { messages = [], inputMessage } = JSON.parse(event.body || '{}');

    if (!process.env.GEMINI_API_KEY) {
      return {
        statusCode: 500,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ text: 'Server misconfiguration' })
      };
    }

    if (!inputMessage) {
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ text: 'Missing inputMessage' })
      };
    }

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
      generationConfig: { temperature: 0.7, maxOutputTokens: 1000 }
    });

    const result = await chat.sendMessage(inputMessage);
    const responseText = result.response.text();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: responseText })
    };
  } catch (error) {
    console.error('Error:', error);
    console.error('Error message:', error.message);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ text: 'Error processing request' })
    };
  }
};