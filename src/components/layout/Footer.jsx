import React from 'react';
import { FOOTER_CONTENT } from '../../data/portfolioData';

const Footer = () => {
  return (
    <footer className="py-8 px-6 border-t border-[#d4dcd0]">
      <div className="max-w-5xl mx-auto text-center text-[#6b8370] text-sm">
        <p>{FOOTER_CONTENT.copyright}</p>
        <p className="mt-2">{FOOTER_CONTENT.education}</p>
      </div>
    </footer>
  );
};

export default Footer;