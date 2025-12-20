// src/data/portfolioData.js

export const PERSONAL_INFO = {
  name: "Nic Angelo Idian",
  title: "Full-Stack Developer",
  email: "nicangelo.idian@unc.edu.ph",
  alternateEmail: "nic.angelo.idian@gmail.com",
  location: "Naga, Bicol Region, Philippines",
  social: {
    github: "https://github.com/NiccAngelo",
    linkedin: "https://linkedin.com/in/nic-angelo-idian-49b0b329a/",
    email: "nic.angelo.idian@gmail.com"
  }
};

export const HERO_CONTENT = {
  tagline: "Welcome to my world",
  greeting: "Hi, I'm",
  name: "Nic",
  role: "a Full-Stack Developer.",
  title: "a Full-Stack Developer.",
  subtitle: "Building digital experiences with modern web technologies",
  description: "Full-stack developer specializing in building secure, scalable web and mobile applications. I create user-centered solutions that address real-world community needs through modern development practices and thoughtful design.",
  profileImage: "assets/final-pfp.png",
  badge: "Welcome to my world",
  cta: {
    primary: "View My Work",
    secondary: "Get In Touch"
  }
};

export const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'videos', label: 'Videos' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' }
];

export const ABOUT_CONTENT = {
  badge: "Get to know me",
  title: "About Me",
  paragraphs: [
    "I'm a full-stack developer and recent BS Information Technology graduate from the University of Nueva Caceres, specializing in building secure, scalable applications that solve real-world problems.",
    
    "My development journey has been driven by a passion for creating technology that makes a tangible impact on communities. I've built production-ready systems from the ground up—from a health center management platform serving barangay communities with household profiling and medical tracking, to a broadcast notification system with real-time push capabilities using Firebase Cloud Messaging.",
    
    "I work across the full stack with React, Flutter, Ruby on Rails, and PHP, focusing on delivering clean, maintainable code. My expertise includes REST API development with JWT authentication, Docker containerization, cloud infrastructure on AWS, and database design with PostgreSQL and MySQL.",
    
    "What sets my work apart is my commitment to understanding user needs first, then architecting solutions that are both technically robust and genuinely useful. I follow modern development practices including version control with Git, agile methodologies, and comprehensive testing to ensure reliability.",
    
    "Currently based in Naga, Bicol Region, I'm actively seeking opportunities where I can contribute to innovative projects, collaborate with talented teams, and continue growing as a developer."
  ],
  cvUrl: "/my-portfolio/Nic-Angelo-Idian-CV.pdf"
};

export const FOOTER_CONTENT = {
  copyright: "© 2025 Nic Angelo Idian. Built with React.",
  education: "BS Information Technology Graduate June 2025 • University of Nueva Caceres",
  social: {
    github: "https://github.com/NiccAngelo",
    linkedin: "https://linkedin.com/in/nic-angelo-idian-49b0b329a/",
    email: "mailto:nic.angelo.idian@gmail.com"
  }
};

export const projects = [
  {
    title: "My-Shopify - Full Stack E-commerce Platform",
    description: "Serverless e-commerce application with React frontend, AWS Lambda backend, and Supabase PostgreSQL. Features user authentication, shopping cart, order management, and real-time inventory tracking.",
    tech: ["React", "Vite", "AWS Lambda", "Express", "PostgreSQL", "Supabase", "GitHub Actions", "Tailwind CSS"],
    github: "https://github.com/NiccAngelo/my-shopify",
    demo: "https://niccangelo.github.io/my-shopify/",
    liveUrl: "https://niccangelo.github.io/my-shopify/",
    apiUrl: "https://feody2fhhe.execute-api.ap-southeast-1.amazonaws.com/api",
    structure: {
      frontend: "React + Vite hosted on GitHub Pages",
      backend: "AWS Lambda (ap-southeast-1) with Express",
      database: "Supabase PostgreSQL (ap-south-1)",
      cicd: "GitHub Actions for automated deployment"
    },
    features: [
      "JWT-based authentication & authorization",
      "Real-time shopping cart management",
      "Order processing & history",
      "Product search & filtering",
      "Responsive mobile-first design",
      "Serverless architecture for scalability"
    ]
  },
  {
    title: "BarangayCare - Health Center Management System",
    description: "Full-stack mobile and web application for managing community health data with household profiling, medical checkups, and pregnancy monitoring.",
    tech: ["PHP", "MySQL", "Flutter", "Git"],
    github: "https://github.com/NiccAngelo/barangaycare",
    demo: "#",
    videoUrl: "https://youtube.com/embed/mZ7kHz-79DE"
  },
  {
    title: "Broadcast Management System",
    description: "Full-stack notification platform with REST API, JWT authentication, and Firebase Cloud Messaging for real-time push notifications.",
    tech: ["Rails 7", "React 18", "Flutter", "PostgreSQL", "Docker", "Firebase"],
    github: "https://github.com/NiccAngelo/broadcast-management-system",
    demo: "#",
    videoUrl: "https://www.youtube.com/embed/DG1TxNzgjVU"
  }
];

export const skills = [
  { name: "React", percentage: 90, description: "Component-based UI development with hooks and context API", logo: "assets/react.png" },
  { name: "Flutter", percentage: 85, description: "Cross-platform mobile apps with Firebase integration", logo: "assets/flutter.png" },
  { name: "Ruby on Rails", percentage: 85, description: "REST API development with JWT authentication", logo: "assets/ruby.png" },
  { name: "PHP", percentage: 80, description: "Full-stack web applications and server-side scripting", logo: "assets/php.png" },
  { name: "JavaScript", percentage: 90, description: "Modern ES6+ for dynamic web applications", logo: "assets/js.png" },
  { name: "PostgreSQL", percentage: 85, description: "Relational database design and optimization", logo: "assets/postgre.png" },
  { name: "MySQL", percentage: 85, description: "Database management and healthcare data systems", logo: "assets/mysql.png" },
  { name: "Docker", percentage: 80, description: "Containerization and deployment with docker-compose", logo: "assets/docker.png" },
  { name: "Git/GitHub", percentage: 90, description: "Version control and collaborative development workflows", logo: "assets/github (2).png" },
  { name: "AWS", percentage: 75, description: "Cloud databases and infrastructure management", logo: "assets/aws.png" },
  { name: "Figma", percentage: 80, description: "UI/UX prototyping and design systems", logo: "assets/figma.png" }
];

export const certifications = [
  { name: "AWS Academy Cloud Foundations", issuer: "AWS Academy", image: "assets/IDIAN - AWS Academy Cloud Foundations Badge.png" },
  { name: "AWS Cloud Architecting", issuer: "AWS Academy", image: "assets/IDIAN - AWS Cloud Architecting Badge.png" },
  { name: "AWS Academy Cloud Operations", issuer: "AWS Academy", image: "assets/IDIAN - AWS Cloud Operations Badge.png" },
  { name: "AWS Cloud Developing", issuer: "AWS Academy", image: "assets/IDIAN - AWS Cloud Developing Badge.png" },
  { name: "Academic Research Foundations: Quantitative", issuer: "LinkedIn Learning", image: "assets/academic-research-quantitative.png" },
  { name: "Learning SQL Programming", issuer: "LinkedIn Learning", image: "assets/learning-sql-programming.png" },
  { name: "Business Analysis Foundations: Business Process Modeling", issuer: "LinkedIn Learning", image: "assets/business-analysis.png" },
  { name: "Introduction to Transactional SQL", issuer: "LinkedIn Learning", image: "assets/introduction-to-transactSQL.png" },
  { name: "Requirements Elicitation and Analysis", issuer: "LinkedIn Learning", image: "assets/requirements-elicitation-and-requirements.png" },
  { name: "Cisco Introduction to Cybersecurity", issuer: "LinkedIn Learning", image: "assets/Cisco.png" },
  { name: "Learning PHP", issuer: "SoloLearn", image: "assets/PHP.jpg" },
  { name: "Learning HTML", issuer: "Sololearn", image: "assets/HTML.jpg" }
];