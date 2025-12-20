import React from 'react';
import { X } from 'lucide-react';

const CertificateModal = ({ cert, onClose }) => {  // ← Change to "cert"
  if (!cert) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="sticky top-4 right-4 float-right p-2 bg-[#2d4739] text-white rounded-full hover:bg-[#3d5a45] transition-colors z-10"
        >
          <X size={20} />
        </button>
        <div className="p-6">
          <h3 className="text-2xl font-bold text-[#2d4739] mb-2">
            {cert.name}
          </h3>
          <p className="text-[#6b8370] mb-4">{cert.issuer}</p>
          <img
            src={cert.image}
            alt={cert.name}
            className="w-full rounded-lg border border-[#d4dcd0]"
            onError={(e) => {
              console.error('Failed to load image:', cert.image);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;