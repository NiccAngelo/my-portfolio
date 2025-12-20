import React, { useEffect, useRef } from 'react';

const ScrollingTextBanner = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const text = textRef.current;
    if (!text) return;

    let scrollAmount = 0;
    const scrollSpeed = 0.5;

    const animate = () => {
      scrollAmount += scrollSpeed;
      if (text) {
        text.style.transform = `translateX(-${scrollAmount}px)`;
        
        // Reset when half the content has scrolled
        if (scrollAmount >= text.scrollWidth / 2) {
          scrollAmount = 0;
        }
      }
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  const scrollText = "Cloud Architecture • Full-Stack Development • Data-Driven Solutions • AWS Lambda • React • Ruby on Rails • ";

  return (
    <div className="relative w-full bg-gradient-to-r from-[#2d4739] via-[#3d5a45] to-[#2d4739] py-6 md:py-8 overflow-hidden border-y border-[#5a7a63]/30">
      {/* Animated Stars Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              opacity: Math.random() * 0.7 + 0.3
            }}
          />
        ))}
      </div>

      {/* Scrolling Text */}
      <div className="relative flex whitespace-nowrap">
        <div ref={textRef} className="flex">
          {/* Duplicate text for seamless loop */}
          <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-white pr-8">
            {scrollText}
          </span>
          <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-white pr-8">
            {scrollText}
          </span>
          <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-white pr-8">
            {scrollText}
          </span>
        </div>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#2d4739] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#2d4739] to-transparent pointer-events-none z-10" />
    </div>
  );
};

export default ScrollingTextBanner;