import { GoogleGenerativeAI } from '@google/generative-ai';

// Portfolio data - easily maintainable
const PORTFOLIO_DATA = {
  owner: {
    name: "Nic Angelo Idian",
    title: "Full-Stack Developer",
    education: "BS Information Technology, University of Nueva Caceres",
    location: "Naga, Bicol, Philippines",
    email: "nicangelo.idian@unc.edu.ph",
    github: "https://github.com/NiccAngelo",
    linkedin: "Add your LinkedIn here",
    website: "Add your portfolio URL here"
  },
  
  projects: [
    {
      name: "BarangayCare",
      description: "A comprehensive healthcare management system designed for barangay communities",
      technologies: ["React", "Node.js", "PostgreSQL", "Docker"],
      features: [
        "Patient records management",
        "Appointment scheduling",
        "Medicine inventory tracking",
        "Health worker dashboard",
        "Real-time notifications"
      ],
      highlights: "Streamlines healthcare delivery in local communities with an intuitive interface",
      status: "Completed",
      github: "Add GitHub link",
      demo: "Add demo link"
    },
    {
      name: "Broadcast Management System",
      description: "A sophisticated system for managing broadcast schedules and content delivery",
      technologies: ["Ruby on Rails", "PostgreSQL", "Redis", "AWS S3"],
      features: [
        "Schedule programming",
        "Content library management",
        "Multi-channel support",
        "Automated playlists",
        "Analytics dashboard"
      ],
      highlights: "Automates broadcast operations with smart scheduling and content management",
      status: "Completed",
      github: "Add GitHub link",
      demo: "Add demo link"
    },
    {
      name: "QuickCart",
      description: "A modern e-commerce platform with seamless shopping experience and secure payments",
      technologies: ["React", "Flutter", "Node.js", "MySQL", "Stripe API"],
      features: [
        "Product catalog with search & filters",
        "Shopping cart & wishlist",
        "Secure payment integration",
        "Order tracking system",
        "Admin dashboard for inventory",
        "Mobile app for iOS & Android"
      ],
      highlights: "Full-featured e-commerce solution with cross-platform support",
      status: "In Development",
      github: "Add GitHub link",
      demo: "Add demo link"
    }
  ],
  
  skills: {
    frontend: {
      frameworks: ["React", "Flutter", "Vue.js"],
      styling: ["Tailwind CSS", "Bootstrap", "Material-UI"],
      tools: ["Vite", "Webpack", "Redux"]
    },
    backend: {
      languages: ["Node.js", "Ruby on Rails", "PHP"],
      frameworks: ["Express.js", "Sinatra"],
      apis: ["RESTful", "GraphQL"]
    },
    database: {
      sql: ["PostgreSQL", "MySQL"],
      nosql: ["MongoDB", "Redis"],
      orm: ["Sequelize", "Prisma", "ActiveRecord"]
    },
    devops: {
      cloud: ["AWS Lambda", "AWS S3", "AWS RDS", "Vercel", "Netlify"],
      containers: ["Docker", "Docker Compose"],
      cicd: ["GitHub Actions", "GitLab CI"],
      tools: ["Serverless Framework", "PM2"]
    },
    other: {
      versionControl: ["Git", "GitHub", "GitLab"],
      testing: ["Jest", "Mocha", "Cypress"],
      ai: ["Google Gemini API", "OpenAI API"]
    }
  },
  
  experience: [
    {
      role: "Add your role",
      company: "Add company",
      duration: "Add duration",
      description: "Add description of your work"
    }
  ],
  
  achievements: [
    "Graduated with BS in Information Technology",
    "Built multiple full-stack applications",
    "Experienced in cloud deployment and DevOps",
    "Strong problem-solving and system design skills"
  ]
};

// Enhanced system instruction with personality and context
const SYSTEM_INSTRUCTION = `You are Nizamin, an intelligent and friendly AI assistant specifically designed to showcase Nic Angelo Idian's portfolio.

PERSONALITY:
- Professional yet approachable
- Enthusiastic about technology
- Detail-oriented when discussing projects
- Encouraging and supportive
- Clear and concise communication

KNOWLEDGE BASE:
You have deep knowledge about:

ABOUT NIC ANGELO:
${PORTFOLIO_DATA.owner.name} is a ${PORTFOLIO_DATA.owner.title} from ${PORTFOLIO_DATA.owner.location}.
Education: ${PORTFOLIO_DATA.owner.education}
Contact: ${PORTFOLIO_DATA.owner.email}
GitHub: ${PORTFOLIO_DATA.owner.github}

PROJECTS:
${PORTFOLIO_DATA.projects.map(p => `
- ${p.name} (${p.status})
  ${p.description}
  Tech: ${p.technologies.join(', ')}
  Key features: ${p.features.slice(0, 3).join(', ')}
  ${p.highlights}
`).join('\n')}

TECHNICAL SKILLS:
Frontend: ${PORTFOLIO_DATA.skills.frontend.frameworks.join(', ')}
Backend: ${PORTFOLIO_DATA.skills.backend.languages.join(', ')}
Databases: ${PORTFOLIO_DATA.skills.database.sql.join(', ')}, ${PORTFOLIO_DATA.skills.database.nosql.join(', ')}
Cloud & DevOps: ${PORTFOLIO_DATA.skills.devops.cloud.join(', ')}, Docker, CI/CD
Other: Git, Testing (Jest, Cypress), AI APIs

CONVERSATION GUIDELINES:
1. When asked about projects, provide rich details including tech stack, features, and impact
2. For skills questions, explain not just what Nic knows but how they're applied in projects
3. Suggest related projects or skills when relevant
4. If asked about something not in the portfolio, be honest but redirect to available information
5. Offer to elaborate or provide code examples when appropriate
6. Use formatting like bullet points for clarity
7. Keep responses concise but informative (2-4 paragraphs max unless asked for more detail)
8. End complex answers with "Would you like to know more about any specific aspect?"
9. Never use emojis in responses

RESPONSE STYLE:
- Use markdown for better formatting (bold, lists, code blocks)
- Structure longer responses with clear sections
- Provide GitHub links when discussing projects
- Suggest next questions to keep conversation flowing

Remember: Your goal is to effectively communicate Nic's skills and experience while keeping visitors engaged!`;

// Intelligent response handler with context awareness
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

    // Validation
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY not configured');
      return {
        statusCode: 500,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ 
          text: 'Server configuration error. Please contact the administrator.' 
        })
      };
    }

    if (!inputMessage || !inputMessage.trim()) {
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ 
          text: 'Please provide a message to continue our conversation!' 
        })
      };
    }

  
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash', 
      systemInstruction: SYSTEM_INSTRUCTION
    });

    const conversationHistory = messages.length > 0 
      ? messages.map(msg => ({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }]
        }))
      : [];

   
    const chat = model.startChat({
      history: conversationHistory,
      generationConfig: { 
        temperature: 0.8,        
        maxOutputTokens: 2000,   // Allow longer responses
        topP: 0.95,
        topK: 40
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        }
      ]
    });

  
    console.log('Processing message:', {
      messageLength: inputMessage.length,
      historyLength: conversationHistory.length,
      timestamp: new Date().toISOString()
    });

    // Send message and get response
    const result = await chat.sendMessage(inputMessage);
    const responseText = result.response.text();


    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'X-Response-Time': new Date().toISOString()
      },
      body: JSON.stringify({ 
        text: responseText,
        timestamp: Date.now(),
        // Optional: Add suggested follow-up questions
        suggestions: generateSuggestions(inputMessage, responseText)
      })
    };

  } catch (error) {
    // Enhanced error logging
    console.error('Chat Error:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      timestamp: new Date().toISOString()
    });

  
    let errorMessage = 'I apologize, but I encountered an issue processing your request.';
    
    if (error.message?.includes('API key')) {
      errorMessage = 'There is a configuration issue with the AI service. Please contact support.';
    } else if (error.message?.includes('quota') || error.message?.includes('limit')) {
      errorMessage = 'The service is currently experiencing high traffic. Please try again in a moment.';
    } else if (error.message?.includes('network') || error.message?.includes('timeout')) {
      errorMessage = 'Network connection issue. Please check your connection and try again.';
    }

    return {
      statusCode: 500,
      headers: { 
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        text: errorMessage,
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    };
  }
};

function generateSuggestions(userMessage, response) {
  const lowerMessage = userMessage.toLowerCase();
  const suggestions = [];

  // Context-aware suggestions
  if (lowerMessage.includes('project')) {
    suggestions.push(
      "Tell me more about the technologies used",
      "What challenges did you face?",
      "Do you have a demo or GitHub link?"
    );
  } else if (lowerMessage.includes('skill') || lowerMessage.includes('technology')) {
    suggestions.push(
      "Which projects use this technology?",
      "What other related skills do you have?",
      "Can you show me code examples?"
    );
  } else if (lowerMessage.includes('contact') || lowerMessage.includes('hire')) {
    suggestions.push(
      "What's your availability?",
      "What type of projects are you interested in?",
      "Can I see your resume?"
    );
  } else {
    // Default suggestions
    suggestions.push(
      "Tell me about your projects",
      "What technologies do you use?",
      "How can I contact you?"
    );
  }

  return suggestions.slice(0, 3); // Return top 3 suggestions
}