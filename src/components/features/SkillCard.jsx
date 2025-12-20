import React from 'react';

const SkillCard = ({ skill }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all group">
      <div className="relative w-28 h-28 mx-auto mb-6">
        {/* Circular Progress */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="56"
            cy="56"
            r="52"
            stroke="#d4dcd0"
            strokeWidth="6"
            fill="none"
          />
          <circle
            cx="56"
            cy="56"
            r="52"
            stroke="#5a7a63"
            strokeWidth="6"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 52}`}
            strokeDashoffset={`${2 * Math.PI * 52 * (1 - skill.percentage / 100)}`}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>

        {/* Logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center p-3 shadow-sm">
            <img
              src={skill.logo}
              alt={skill.name}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Percentage Badge */}
        <div className="absolute bottom-0 right-0 bg-[#5a7a63] text-white text-sm font-bold rounded-full w-12 h-12 flex items-center justify-center shadow-md">
          {skill.percentage}%
        </div>
      </div>

      <h3 className="text-xl font-bold text-[#2d4739] mb-3 text-center">
        {skill.name}
      </h3>

      <p className="text-sm text-[#6b8370] text-center leading-relaxed">
        {skill.description}
      </p>
    </div>
  );
};

export default SkillCard;