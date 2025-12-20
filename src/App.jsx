import React, { useState, useEffect } from 'react';

// Layout Components
import Navigation from './components/layout/Navigation.jsx';
import Footer from './components/layout/Footer.jsx';
import BackgroundElements from './components/layout/BackgroundElements.jsx';

// Section Components
import HeroSection from './components/sections/HeroSection.jsx';
import AboutSection from './components/sections/AboutSection.jsx';
import ScrollingTextBanner from './components/sections/ScrollingTextBanner.jsx';
import ProjectsSection from './components/sections/ProjectsSection.jsx';
import VideoSection from './components/sections/VideoSection.jsx';
import SkillsSection from './components/sections/SkillsSection.jsx';
import CertificationsSection from './components/sections/CertificationsSection.jsx';
import ContactSection from './components/sections/ContactSection.jsx';

import Chatbot from './components/features/Chatbot.jsx';
import ContactModal from './components/features/ContactModal.jsx';
import CertificateModal from './components/features/CertificateModal.jsx';

import { useScrollTracking } from './hooks/useScrollTracking.js';
import { useEmailJS } from './hooks/useEmailJS.js';
import { useChatbot } from './hooks/useChatbot.js';

export default function Portfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);

  const { activeSection, setActiveSection, scrollY } = useScrollTracking();
  const { handleSubmit, isSubmitting, submitStatus } = useEmailJS();
  const { messages, inputMessage, setInputMessage, isTyping, handleChatSubmit } = useChatbot();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (section) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f6f4] via-white to-[#e8ede6] text-[#2d4739] overflow-x-hidden">
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-slideUp { animation: slideUp 0.3s ease-out; }
      `}</style>

      <Chatbot
        messages={messages}
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        isTyping={isTyping}
        onSubmit={handleChatSubmit}
      />

      <BackgroundElements mousePosition={mousePosition} />

      <Navigation
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <HeroSection scrollY={scrollY} />
      <ScrollingTextBanner />
      <AboutSection />
      <ProjectsSection setSelectedVideo={setSelectedVideo} scrollToSection={scrollToSection} />
      <VideoSection selectedVideo={selectedVideo} setSelectedVideo={setSelectedVideo} />
      <SkillsSection />
      <CertificationsSection setSelectedCert={setSelectedCert} />
      <ContactSection onOpenModal={() => setShowContactModal(true)} />

      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitStatus={submitStatus}
      />

      <CertificateModal
        cert={selectedCert}
        onClose={() => setSelectedCert(null)}
      />

      <Footer />
    </div>
  );
}