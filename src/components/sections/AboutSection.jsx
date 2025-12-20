import React, { useState, useEffect, useRef } from 'react';
import { Code2, Smartphone, Cloud, ArrowRight, Download, X, CheckCircle2 } from 'lucide-react';

// Detailed specialty data
const SPECIALTIES = [
  { 
    label: 'AWS Cloud', 
    icon: Cloud, 
    color: 'from-orange-400 via-orange-500 to-orange-600',
    description: 'Cloud infrastructure & deployment',
    gradient: 'bg-gradient-to-br from-orange-50 to-orange-100',
    details: {
      title: 'AWS Cloud Expertise',
      overview: 'Experienced in building serverless applications using AWS Lambda. Skilled in integrating cloud services with modern databases like Supabase for scalable, cost-effective solutions.',
      technologies: [
        'AWS Lambda (Serverless)',
        'Supabase (PostgreSQL)',
        'API Gateway',
        'Node.js Runtime',
        'Serverless Framework',
        'CloudWatch Logs'
      ],
      projects: [
        'Built QuickCart e-commerce with AWS Lambda serverless functions',
        'Integrated Supabase PostgreSQL for product and order management',
        'Implemented serverless API endpoints for cart and checkout with JWT auth'
      ]
    }
  },
  { 
    label: 'Mobile Development', 
    icon: Smartphone, 
    color: 'from-blue-400 via-blue-500 to-blue-600',
    description: 'React Native & Android apps',
    gradient: 'bg-gradient-to-br from-blue-50 to-blue-100',
    details: {
      title: 'Mobile App Development',
      overview: 'Building cross-platform mobile applications with React Native and native Android development. Focus on creating smooth, intuitive user experiences with offline-first capabilities.',
      technologies: [
        'React Native (Expo)',
        'Java (Android Studio)',
        'Redux & Context API',
        'Firebase Push Notifications',
        'SQLite & AsyncStorage',
        'Native Modules Integration'
      ],
      projects: [
        'Built BarangayCare health center services and management system for community health data',
        'Developed Broadcast Management System with real-time push notifications',
        'Created Flutter mobile apps with offline-first capabilities'
      ]
    }
  },
  { 
    label: 'Full-Stack Web', 
    icon: Code2, 
    color: 'from-emerald-400 via-emerald-500 to-emerald-600',
    description: 'End-to-end web solutions',
    gradient: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
    details: {
      title: 'Full-Stack Web Development',
      overview: 'Specialized in building modern, scalable web applications from database to UI. Expert in React ecosystem, Node.js backend, and RESTful API design with a focus on clean architecture.',
      technologies: [
        'React.js & Vite',
        'Node.js & Express',
        'Ruby on Rails',
        'PostgreSQL & Supabase',
        'Tailwind CSS',
        'REST APIs & JWT Auth'
      ],
      projects: [
        'BarangayCare health center services and management platform with patient records',
        'Broadcast Management System with WebSocket integration',
        'QuickCart e-commerce platform with shopping cart functionality'
      ]
    }
  },
];

// Modal Component
const SpecialtyModal = ({ specialty, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  if (!specialty) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      {/* Modal */}
      <div 
        className={`relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transition-all duration-300 ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`relative bg-gradient-to-br ${specialty.color} p-8 text-white rounded-t-3xl`}>
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-4 mb-3">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-lg flex items-center justify-center">
              <specialty.icon className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-3xl font-black">{specialty.details.title}</h3>
              <p className="text-white/90 text-sm">{specialty.description}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Overview */}
          <div>
            <h4 className="text-xl font-bold text-[#2d4739] mb-3">Overview</h4>
            <p className="text-[#6b8370] leading-relaxed">{specialty.details.overview}</p>
          </div>

          {/* Technologies */}
          <div>
            <h4 className="text-xl font-bold text-[#2d4739] mb-4">Technologies & Tools</h4>
            <div className="grid grid-cols-2 gap-3">
              {specialty.details.technologies.map((tech, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 p-3 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 hover:border-[#3d5a45] transition-colors"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#3d5a45] flex-shrink-0" />
                  <span className="text-sm font-medium text-[#2d4739]">{tech}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h4 className="text-xl font-bold text-[#2d4739] mb-4">Key Projects</h4>
            <div className="space-y-3">
              {specialty.details.projects.map((project, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-[#f0f4f1] to-white border border-[#a8b5a0]/30 hover:border-[#3d5a45]/50 transition-colors"
                >
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${specialty.color} mt-2 flex-shrink-0`} />
                  <p className="text-[#6b8370] text-sm leading-relaxed">{project}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="pt-6 border-t border-gray-200">
            <button
              onClick={() => {
                handleClose();
                setTimeout(() => {
                  const projectsSection = document.getElementById('projects');
                  if (projectsSection) {
                    projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }, 400);
              }}
              className={`w-full py-4 rounded-xl bg-gradient-to-r ${specialty.color} text-white font-bold hover:shadow-xl transition-all duration-300 hover:scale-105`}
            >
              Explore More Projects
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        id="about"
        ref={sectionRef}
        className="py-20 px-4 md:px-6 relative overflow-hidden bg-gradient-to-b from-white to-[#fafafa]"
      >
        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <div className={`mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-1 w-12 bg-gradient-to-r from-[#3d5a45] to-transparent rounded-full" />
              <span className="text-sm font-semibold text-[#3d5a45] tracking-wider uppercase">About Me</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] tracking-tight mb-4">
              Building Digital Solutions
            </h2>
          </div>

          <div className={`transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Two Column Layout */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* Left: Bio */}
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg">
                <div className="space-y-4 mb-6">
                  <p className="text-gray-700 leading-relaxed">
                    I'm a <span className="font-semibold text-[#3d5a45]">BS Information Technology graduate</span> passionate about building scalable web applications. My recent work includes developing a health center services platform and a broadcast notification system.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    I specialize in full-stack development with expertise in <span className="font-semibold text-[#3d5a45]">React, AWS Lambda, Ruby on Rails, and Flutter</span>. Based in Naga, Bicol Region, I'm always excited to collaborate on innovative projects.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={`${import.meta.env.BASE_URL}Nic-Angelo-Idian-CV.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#3d5a45] to-[#5a7a63] text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    <Download className="w-4 h-4" />
                    View CV
                  </a>
                </div>
              </div>

              {/* Right: Stats */}
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg">
                  <div className="text-4xl font-bold bg-gradient-to-r from-[#3d5a45] to-[#5a7a63] bg-clip-text text-transparent mb-2">
                    10+
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Technologies Mastered</div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg">
                  <div className="text-4xl font-bold bg-gradient-to-r from-[#3d5a45] to-[#5a7a63] bg-clip-text text-transparent mb-2">
                    3+
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Main Projects Completed</div>
                </div>
              </div>
            </div>

            {/* Specializations */}
            <div>
              <h3 className="text-2xl font-bold text-[#1a1a1a] mb-6">Core Specializations</h3>
              <div className="grid md:grid-cols-3 gap-5">
                {SPECIALTIES.map((specialty, index) => (
                  <div
                    key={specialty.label}
                    onClick={() => setSelectedSpecialty(specialty)}
                    className="group bg-white rounded-xl p-6 border border-gray-100 hover:border-[#3d5a45]/30 hover:shadow-xl transition-all duration-300 cursor-pointer"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${specialty.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                      <specialty.icon className="w-7 h-7 text-white" />
                    </div>
                    
                    <h4 className="text-lg font-bold text-[#1a1a1a] mb-2">
                      {specialty.label}
                    </h4>
                    
                    <p className="text-sm text-gray-600 mb-3">
                      {specialty.description}
                    </p>

                    <div className="flex items-center gap-1 text-xs text-[#3d5a45] font-semibold">
                      Learn more
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedSpecialty && (
        <SpecialtyModal 
          specialty={selectedSpecialty} 
          onClose={() => setSelectedSpecialty(null)} 
        />
      )}
    </>
  );
};

export default AboutSection;