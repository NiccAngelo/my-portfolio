import React from 'react';

const BackgroundElements = ({ mousePosition }) => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div 
        className="absolute w-96 h-96 bg-gradient-to-br from-[#a8b5a0]/20 to-transparent rounded-full blur-3xl" 
        style={{ 
          top: '10%', 
          left: '5%', 
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)` 
        }} 
      />
      <div 
        className="absolute w-96 h-96 bg-gradient-to-br from-[#5a7a63]/10 to-transparent rounded-full blur-3xl" 
        style={{ 
          bottom: '20%', 
          right: '10%', 
          transform: `translate(${-mousePosition.x * 0.03}px, ${-mousePosition.y * 0.03}px)` 
        }} 
      />
    </div>
  );
};

export default BackgroundElements;