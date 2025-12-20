import React, { useState, useEffect, useRef } from 'react';
import { Code2, Smartphone, Server, Database, Cloud, Wrench } from 'lucide-react';

export default function SkillsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const categories = [
    { name: 'All', icon: null },
    { name: 'Frontend', icon: Code2 },
    { name: 'Mobile', icon: Smartphone },
    { name: 'Backend', icon: Server },
    { name: 'Database', icon: Database },
    { name: 'DevOps', icon: Cloud },
    { name: 'Tools', icon: Wrench }
  ];

  const skills = [
    { name: "React", percentage: 90, logo: "assets/react.png", category: "Frontend" },
    { name: "JavaScript", percentage: 90, logo: "assets/js.png", category: "Frontend" },
    { name: "Flutter", percentage: 85, logo: "assets/flutter.png", category: "Mobile" },
    { name: "Ruby on Rails", percentage: 85, logo: "assets/ruby.png", category: "Backend" },
    { name: "PHP", percentage: 80, logo: "assets/php.png", category: "Backend" },
    { name: "PostgreSQL", percentage: 85, logo: "assets/postgre.png", category: "Database" },
    { name: "MySQL", percentage: 85, logo: "assets/mysql.png", category: "Database" },
    { name: "Docker", percentage: 80, logo: "assets/docker.png", category: "DevOps" },
    { name: "AWS", percentage: 75, logo: "assets/aws.png", category: "DevOps" },
    { name: "Git/GitHub", percentage: 90, logo: "assets/github (2).png", category: "Tools" },
    { name: "Figma", percentage: 80, logo: "assets/figma.png", category: "Tools" },
  ];

  const filteredSkills = activeCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="py-20 px-4 md:px-6 bg-gradient-to-b from-[#fafafa] to-white relative overflow-hidden"
    >
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className={`mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-3 mb-3">
            <div className="h-1 w-12 bg-gradient-to-r from-[#3d5a45] to-transparent rounded-full" />
            <span className="text-sm font-semibold text-[#3d5a45] tracking-wider uppercase">Skills & Expertise</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] tracking-tight">
            Technical Proficiency
          </h2>
        </div>

        {/* Category Filter */}
        <div className={`mb-10 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(cat.name)}
                className={`group flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                  activeCategory === cat.name
                    ? 'bg-[#3d5a45] text-white shadow-lg shadow-[#3d5a45]/20'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {cat.icon && (
                  <cat.icon className={`w-4 h-4 transition-transform duration-300 ${activeCategory === cat.name ? 'rotate-0' : 'group-hover:rotate-12'}`} />
                )}
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {filteredSkills.map((skill, idx) => (
            <div
              key={idx}
              className="group relative bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#3d5a45]/30 hover:shadow-xl hover:shadow-[#3d5a45]/5 transition-all duration-500 hover:-translate-y-1"
              style={{ transitionDelay: `${idx * 30}ms` }}
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 w-0 h-1 bg-gradient-to-r from-[#3d5a45] to-[#5a7a63] group-hover:w-full transition-all duration-500 rounded-t-2xl" />

              <div className="flex flex-col items-center">
                {/* Logo Container */}
                <div className="relative mb-4">
                  {/* Background Circle */}
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center p-4 group-hover:from-[#f0f4f1] group-hover:to-[#e8ede6] transition-all duration-300 group-hover:scale-105">
                    <img 
                      src={skill.logo} 
                      alt={skill.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  {/* Percentage Indicator */}
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-[#3d5a45] to-[#2d4739] text-white text-xs font-bold rounded-lg px-2 py-1 shadow-lg">
                    {skill.percentage}%
                  </div>
                </div>

                {/* Skill Name */}
                <h4 className="text-sm font-semibold text-[#1a1a1a] text-center mb-1 group-hover:text-[#3d5a45] transition-colors duration-300">
                  {skill.name}
                </h4>

                {/* Category Badge */}
                <span className="text-xs text-gray-500 font-medium">
                  {skill.category}
                </span>

                {/* Progress Bar */}
                <div className="w-full mt-4 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#3d5a45] to-[#5a7a63] rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: isVisible ? `${skill.percentage}%` : '0%',
                      transitionDelay: `${idx * 50}ms`
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

       
          
        
      </div>
    </section>
  );
}