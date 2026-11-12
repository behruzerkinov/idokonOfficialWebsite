import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const Toast = ({ message, visible }) => {
  if (!visible || !message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-200">
      <div className="px-5 py-3 rounded-2xl bg-slate-900 text-white border border-emerald-500/40 shadow-2xl flex items-center gap-3 text-xs sm:text-sm font-bold backdrop-blur-md">
        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
        <span>{message}</span>
      </div>
    </div>
  );
};
