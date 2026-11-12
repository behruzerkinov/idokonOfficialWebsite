import React from 'react';
import { X } from 'lucide-react';

export const LightboxModal = ({ isOpen, onClose, image, title }) => {
  if (!isOpen || !image) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-3 bg-slate-950 flex items-center justify-between text-white text-xs border-b border-slate-800">
          <span className="font-bold text-slate-300 font-mono">{title}</span>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <img
          src={image}
          alt={title}
          className="w-full h-auto max-h-[80vh] object-contain"
        />
      </div>
    </div>
  );
};
