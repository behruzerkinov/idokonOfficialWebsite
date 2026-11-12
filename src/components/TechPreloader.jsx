import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function TechPreloader({ onComplete }) {
  const [isFinished, setIsFinished] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if user already saw the preloader in this session
    const seen = sessionStorage.getItem('idokon_preloader_shown');
    if (seen === 'true') {
      setIsFinished(true);
      if (onComplete) onComplete();
      return;
    }

    const start = performance.now();
    const duration = 500; // Fast, elegant 500ms reveal

    const tick = (now) => {
      const elapsed = now - start;
      const pct = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(pct);

      if (elapsed < duration) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setIsFinished(true);
          sessionStorage.setItem('idokon_preloader_shown', 'true');
          if (onComplete) onComplete();
        }, 100);
      }
    };

    requestAnimationFrame(tick);
  }, [onComplete]);

  if (isFinished) return null;

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] bg-[#070b10] text-white flex flex-col items-center justify-center overflow-hidden select-none"
        >
          {/* Subtle Twain AI ambient glow */}
          <div className="w-80 h-80 rounded-full bg-emerald-500/10 blur-[90px] pointer-events-none absolute" />

          {/* Clean Editorial Logo & Indicator */}
          <div className="relative z-10 flex flex-col items-center">
            <h1 className="font-serif text-3xl sm:text-4xl tracking-tight text-white font-normal mb-6">
              IDO<span className="text-emerald-500 font-serif italic">'KON</span>
            </h1>

            {/* Hairline Progress Bar */}
            <div className="w-48 h-[2px] bg-zinc-800 rounded-full overflow-hidden relative">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-3 text-[11px] font-mono text-zinc-500">
              {progress}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
