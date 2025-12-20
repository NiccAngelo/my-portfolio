import React, { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Mail, Sparkles, ArrowDown } from 'lucide-react';
import { HERO_CONTENT, PERSONAL_INFO } from '../../data/portfolioData';

const HeroSection = ({ scrollY }) => {
  const canvasRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = canvas.width < 768 ? 80 : 150;
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 1;
        this.baseSize = this.size;
        this.speedX = Math.random() * 0.8 - 0.4;
        this.speedY = Math.random() * 0.8 - 0.4;
        this.opacity = Math.random() * 0.6 + 0.3;
        this.baseOpacity = this.opacity;
        this.colorIndex = Math.floor(Math.random() * 3);
        this.colors = [
          { r: 90, g: 122, b: 99 },
          { r: 168, g: 181, b: 160 },
          { r: 61, g: 90, b: 69 }
        ];
        this.color = this.colors[this.colorIndex];
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulsePhase = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;

        this.pulsePhase += this.pulseSpeed;
        const pulse = Math.sin(this.pulsePhase) * 0.5 + 0.5;
        this.size = this.baseSize * (0.8 + pulse * 0.4);
        this.opacity = this.baseOpacity * (0.7 + pulse * 0.3);

        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceRadius = 150;

        if (distance < forceRadius) {
          const force = (forceRadius - distance) / forceRadius;
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force * 3;
          this.y -= Math.sin(angle) * force * 3;
        }
      }

      draw() {
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 2
        );
        gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`);
        gradient.addColorStop(0.5, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function connectParticles() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 150;

          if (distance < maxDistance) {
            const opacity = 0.25 * (1 - distance / maxDistance);
            
            const gradient = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            gradient.addColorStop(0, `rgba(90, 122, 99, ${opacity * particles[i].opacity})`);
            gradient.addColorStop(1, `rgba(90, 122, 99, ${opacity * particles[j].opacity})`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationId;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      connectParticles();
      animationId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  const scrollToNextSection = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
@keyframes slide-in-right {
  from { opacity: 0; transform: translate(-50%, -50%) translateX(50px); }
  to { opacity: 1; transform: translate(-50%, -50%) translateX(0); }
}
@keyframes fade-in-scale {
  from { 
    opacity: 0; 
    transform: translate(-50%, -50%) scale(0.8); 
  }
  to { 
    opacity: 1; 
    transform: translate(-50%, -50%) scale(1); 
  }
}
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes float-icon {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.1); }
        }

@keyframes bounce-arrow {
  0%, 100% { transform: translate(-50%, 0px); }
  50% { transform: translate(-50%, 8px); }
}
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        
        .animate-slide-up-delay {
          animation: slide-up 0.8s ease-out 0.2s backwards;
        }
        
        .animate-fade-in-up {
          animation: slide-up 0.8s ease-out 0.4s backwards;
        }
        
        .animate-fade-in-up-delay {
          animation: slide-up 0.8s ease-out 0.6s backwards;
        }

        .animate-slide-in-right {
          animation: slide-in-right 1s ease-out 0.3s backwards;
        }
        
        .animate-fade-in-scale {
          animation: fade-in-scale 1s ease-out 0.3s backwards;
        }
        
        .animate-gradient-shift {
          animation: gradient-shift 4s ease infinite;
        }
        
        .animate-float-icon {
          animation: float-icon 3s ease-in-out infinite;
        }
        
        .animate-float-icon-delay-1 {
          animation: float-icon 3s ease-in-out infinite 0.3s;
        }
        
        .animate-float-icon-delay-2 {
          animation: float-icon 3s ease-in-out infinite 0.6s;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 8s ease-in-out infinite;
        }

        .animate-bounce-arrow {
          animation: bounce-arrow 2s ease-in-out infinite;
        }
      `}</style>
      
      <section id="home" className="min-h-screen pt-20 md:pt-24 pb-16 md:pb-20 px-4 md:px-6 relative flex items-center overflow-hidden bg-gradient-to-b from-[#f5f8f6] via-white to-[#f0f4f1]">
        {/* Full Section Canvas */}
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 0.85 }}
        />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            
            {/* Mobile Image Section */}
            <div className="flex-shrink-0 block md:hidden w-full order-1">
              <div className="relative w-full max-w-[240px] h-[300px] mx-auto">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] bg-gradient-to-br from-[#a8b5a0]/20 to-[#5a7a63]/10 rounded-full blur-3xl animate-pulse-glow"></div>
                
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full h-full drop-shadow-2xl animate-fade-in-scale">
                  <img 
                    src={HERO_CONTENT.profileImage} 
                    alt={PERSONAL_INFO.name} 
                    className="w-full h-full object-contain object-center" 
                  />
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div 
              className="flex-1 max-w-2xl space-y-5 md:space-y-6 text-center md:text-left order-2 md:order-1"
              style={!isMobile ? { transform: `translateY(${scrollY * 0.1}px)` } : {}}
            >
              <div className="inline-flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 bg-gradient-to-r from-[#3d5a45]/10 to-transparent rounded-full border border-[#a8b5a0]/30 shadow-sm text-xs md:text-sm animate-fade-in backdrop-blur-sm">
                <Sparkles size={14} className="md:w-4 md:h-4 text-[#5a7a63]" />
                <span className="uppercase tracking-wider text-[#6b8370] font-semibold">
                  {HERO_CONTENT.tagline}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#2d4739] leading-tight animate-slide-up">
                {HERO_CONTENT.greeting}{' '}
                <span className="bg-gradient-to-r from-[#3d5a45] via-[#5a7a63] to-[#3d5a45] bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient-shift">
                  {HERO_CONTENT.name}
                </span>
              </h1>
              
              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#4a6652] animate-slide-up-delay">
                {HERO_CONTENT.role}
              </h2>
              
              <p className="text-base md:text-lg lg:text-xl text-[#6b8370] leading-relaxed max-w-xl mx-auto md:mx-0 animate-fade-in-up">
                {HERO_CONTENT.description}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6 pt-4 animate-fade-in-up-delay">
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#6b8370] mb-3 font-semibold">Connect With Me</p>
                  <div className="flex gap-3">
                    <a 
                      href={PERSONAL_INFO.social.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-12 h-12 md:w-14 md:h-14 bg-white backdrop-blur-sm shadow-lg rounded-xl flex items-center justify-center hover:shadow-2xl hover:scale-110 hover:bg-gradient-to-br hover:from-[#3d5a45] hover:to-[#5a7a63] transition-all duration-300 group animate-float-icon border border-[#d4dfd7]"
                      aria-label="GitHub Profile"
                    >
                      <Github size={20} className="md:w-6 md:h-6 text-[#3d5a45] group-hover:text-white transition-colors" />
                    </a>
                    <a 
                      href={PERSONAL_INFO.social.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-12 h-12 md:w-14 md:h-14 bg-white backdrop-blur-sm shadow-lg rounded-xl flex items-center justify-center hover:shadow-2xl hover:scale-110 hover:bg-gradient-to-br hover:from-[#3d5a45] hover:to-[#5a7a63] transition-all duration-300 group animate-float-icon-delay-1 border border-[#d4dfd7]"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin size={20} className="md:w-6 md:h-6 text-[#3d5a45] group-hover:text-white transition-colors" />
                    </a>
                    <a 
                      href={`mailto:${PERSONAL_INFO.alternateEmail}`} 
                      className="w-12 h-12 md:w-14 md:h-14 bg-white backdrop-blur-sm shadow-lg rounded-xl flex items-center justify-center hover:shadow-2xl hover:scale-110 hover:bg-gradient-to-br hover:from-[#3d5a45] hover:to-[#5a7a63] transition-all duration-300 group animate-float-icon-delay-2 border border-[#d4dfd7]"
                      aria-label="Email Contact"
                    >
                      <Mail size={20} className="md:w-6 md:h-6 text-[#3d5a45] group-hover:text-white transition-colors" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
{/* Desktop Image Section */}
<div 
  className="flex-shrink-0 hidden md:block order-1 md:order-2"
>
  <div 
    className="relative w-[320px] lg:w-[380px] xl:w-[420px] h-[400px] lg:h-[480px] xl:h-[520px]"
    style={!isMobile ? { transform: `translateY(${scrollY * -0.05}px)` } : {}}
  >
    <div 
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] lg:w-[320px] h-[260px] lg:h-[320px] bg-gradient-to-br from-[#a8b5a0]/20 to-[#5a7a63]/10 rounded-full blur-3xl animate-pulse-glow"
    ></div>
    
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full h-full drop-shadow-2xl animate-slide-in-right">
      <img 
        src={HERO_CONTENT.profileImage} 
        alt={PERSONAL_INFO.name} 
        className="w-full h-full object-contain object-center hover:scale-105 transition-transform duration-700" 
      />
    </div>
  </div>
</div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <button
          onClick={scrollToNextSection}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#5a7a63] hover:text-[#3d5a45] transition-colors cursor-pointer animate-bounce-arrow z-20"
          aria-label="Scroll to next section"
        >
          <span className="text-xs uppercase tracking-wider font-semibold">Scroll Down</span>
          <ArrowDown size={24} className="text-[#5a7a63]" />
        </button>
      </section>
    </>
  );
};

export default HeroSection;