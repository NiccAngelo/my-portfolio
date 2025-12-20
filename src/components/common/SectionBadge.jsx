import React from 'react';

const SectionBadge = ({ icon: Icon, text }) => {
  return (
    <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-[#3d5a45]/10 to-transparent rounded-full mb-4 text-xs md:text-sm">
      <Icon size={14} className="md:w-4 md:h-4 text-[#5a7a63]" />
      <span className="uppercase tracking-wider text-[#6b8370] font-medium">
        {text}
      </span>
    </div>
  );
};

export default SectionBadge;