import React, { useState, useEffect, useRef } from 'react';
import {
  Code,
  Github,
  ExternalLink,
  Video,
  ArrowRight,
  Zap,
  Star,
  Layers,
  Sparkles
} from 'lucide-react';

export default function ProjectsSection({ setSelectedVideo, scrollToSection }) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      title: "QuickCart",
      subtitle: "Full Stack E-commerce Platform",
      description:
        "Serverless e-commerce application with React frontend, AWS Lambda backend, and Supabase PostgreSQL. Features user authentication, shopping cart, order management, and real-time inventory tracking.",
      tech: [
        "React",
        "Vite",
        "AWS Lambda",
        "Express",
        "PostgreSQL",
        "Supabase",
        "GitHub Actions",
        "Tailwind CSS"
      ],
      github: "https://github.com/NiccAngelo/my-shopify",
      liveUrl: "https://niccangelo.github.io/my-shopify/",
      highlight: "Featured",
      gradient: "from-[#2d5a3d] via-[#3d6a4d] to-[#4d7a5d]",
      icon: Zap,
      category: "Web"
    },
    {
      title: "BarangayCare",
      subtitle: "Health Center Management System",
      description:
        "Full-stack mobile and web application for managing community health data with household profiling, medical checkups, and pregnancy monitoring.",
      tech: ["PHP", "MySQL", "Flutter", "Git"],
      github: "https://github.com/NiccAngelo/barangaycare",
      videoUrl: "https://youtube.com/embed/mZ7kHz-79DE",
      gradient: "from-[#4a5f70] to-[#5a7f90]",
      icon: Code,
      category: "Mobile"
    },
    {
      title: "Broadcast System",
      subtitle: "Real-time Notification Platform",
      description:
        "Full-stack notification platform with REST API, JWT authentication, and Firebase Cloud Messaging for real-time push notifications.",
      tech: ["Rails 7", "React 18", "Flutter", "PostgreSQL", "Docker", "Firebase"],
      github: "https://github.com/NiccAngelo/broadcast-management-system",
      videoUrl: "https://www.youtube.com/embed/DG1TxNzgjVU",
      gradient: "from-[#5a4a70] to-[#7a6a90]",
      icon: Layers,
      category: "Full-Stack"
    }
  ];

  const filters = ['All', 'Web', 'Full-Stack', 'Mobile'];
  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter(p => p.category === activeFilter);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 px-4 md:px-8 relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_40%,black,transparent)]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className={`mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-1 w-16 bg-gradient-to-r from-[#2d5a3d] to-[#4d7a5d] rounded-full" />
            <span className="text-sm font-bold text-[#2d5a3d] uppercase tracking-widest">
              Portfolio
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-5 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            Full-stack development, serverless architecture, and mobile applications
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-[#2d5a3d] to-[#3d6a4d] text-white shadow-lg shadow-green-900/20 scale-105'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`group relative bg-white rounded-3xl border border-gray-200 overflow-hidden transition-all duration-500 ${
                hoveredCard === index 
                  ? 'shadow-2xl shadow-gray-900/10 scale-[1.02] -translate-y-2' 
                  : 'shadow-md hover:shadow-xl'
              }`}
            >
              {/* Gradient top bar */}
              <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />

              {/* Featured badge - only for QuickCart */}
              {project.highlight && (
                <div className="absolute top-6 right-6 z-10">
                  <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${project.gradient} text-white text-xs font-bold flex items-center gap-1.5 shadow-lg`}>
                    <Star className="w-3.5 h-3.5 fill-current" />
                    {project.highlight}
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Icon and GitHub */}
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${project.gradient} flex items-center justify-center shadow-lg transition-transform duration-300 ${
                    hoveredCard === index ? 'scale-110 rotate-3' : ''
                  }`}>
                    <project.icon className="w-8 h-8 text-white" />
                  </div>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-gray-900 hover:scale-110 group/icon"
                  >
                    <Github className="w-5 h-5 text-gray-700 group-hover/icon:text-white transition-colors" />
                  </a>
                </div>

                {/* Title and subtitle */}
                <h3 className="text-2xl font-bold mb-1.5 text-gray-900">{project.title}</h3>
                <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-4">
                  {project.subtitle}
                </p>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.slice(0, 4).map((tech, i) => (
                    <span 
                      key={i} 
                      className="text-xs px-3 py-2 bg-gray-50 text-gray-700 rounded-lg font-medium border border-gray-100 hover:border-gray-300 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="text-xs px-3 py-2 bg-gray-50 text-gray-500 rounded-lg font-medium border border-gray-100">
                      +{project.tech.length - 4}
                    </span>
                  )}
                </div>

                {/* CTA Button */}
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 w-full px-5 py-3.5 bg-gradient-to-r ${project.gradient} text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-green-900/30 group/btn`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Live Project
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </a>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedVideo(project);
                      scrollToSection('videos');
                    }}
                    className={`flex items-center justify-center gap-2 w-full px-5 py-3.5 bg-gradient-to-r ${project.gradient} text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg group/btn`}
                  >
                    <Video className="w-4 h-4" />
                    Watch Demo
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="text-center">
          <a
            href="https://github.com/NiccAngelo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gray-900 text-white rounded-2xl font-semibold transition-all duration-300 hover:bg-[#2d5a3d] hover:shadow-2xl hover:shadow-green-900/20 hover:scale-105 group"
          >
            <Github className="w-5 h-5" />
            View Complete GitHub Profile
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}