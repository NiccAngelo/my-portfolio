import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { NAV_ITEMS, PERSONAL_INFO } from '../../data/portfolioData';

const Navigation = ({ activeSection, scrollToSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (section) => {
    scrollToSection(section);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-white/70 backdrop-blur-xl border-b border-[#a8b5a0]/20 z-50 h-16 md:h-20 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-full flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 md:gap-3 group">
          <div className="h-10 w-10 md:h-14 md:w-14 flex items-center justify-center scale-110 md:scale-125 transition-transform group-hover:scale-[1.2] md:group-hover:scale-[1.35]">
            <img 
              src="assets/NA-logo (2).png" 
              alt={PERSONAL_INFO.name} 
              className="w-full h-full object-contain drop-shadow-lg" 
            />
          </div>
          <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-[#2d4739] to-[#5a7a63] bg-clip-text text-transparent">
            Portfolio
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-6 xl:gap-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`capitalize transition-all relative group ${
                activeSection === item.id 
                  ? 'text-[#3d5a45] font-semibold' 
                  : 'text-[#6b8370] hover:text-[#3d5a45]'
              }`}
            >
              {item.label}
              <span 
                className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#3d5a45] to-[#5a7a63] transition-all ${
                  activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                }`} 
              />
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 hover:bg-[#e8ede6] rounded-lg transition-colors"
        >
          <Menu size={24} className="text-[#3d5a45]" />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-16 md:top-20 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-[#a8b5a0]/20 shadow-lg animate-slideUp">
          <div className="flex flex-col p-4 space-y-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`capitalize py-3 px-4 text-left rounded-lg transition-all ${
                  activeSection === item.id 
                    ? 'bg-gradient-to-r from-[#3d5a45] to-[#5a7a63] text-white font-semibold' 
                    : 'text-[#6b8370] hover:bg-[#e8ede6]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;