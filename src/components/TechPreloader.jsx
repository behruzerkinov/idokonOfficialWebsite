import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function TechPreloader({ onComplete }) {
  const [digits, setDigits] = useState({ d1: '0', d2: '0', d3: '0' });
  const [isPixelating, setIsPixelating] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Check if user already saw the preloader in this session
    const seen = sessionStorage.getItem('idokon_preloader_shown');
    if (seen === 'true') {
      setIsFinished(true);
      if (onComplete) onComplete();
      return;
    }

    let count = 0;
    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 4) + 1;
      if (count >= 99) {
        count = 99;
        setDigits({ d1: '0', d2: '9', d3: '9' });
        clearInterval(interval);

        // ChainGPT Labs pixelation trigger
        setTimeout(() => {
          setDigits({ d1: '1', d2: '0', d3: '0' });
          setIsPixelating(true);

          setTimeout(() => {
            setIsFinished(true);
            sessionStorage.setItem('idokon_preloader_shown', 'true');
            if (onComplete) onComplete();
          }, 850);
        }, 250);
      } else {
        const padded = count.toString().padStart(3, '0');
        setDigits({
          d1: padded[0],
          d2: padded[1],
          d3: padded[2]
        });
      }
    }, 28);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (isFinished) return null;

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] bg-[#0c0d12] text-white flex flex-col justify-between overflow-hidden select-none font-mono"
        >
          {/* 5 Vertical Architectural Grid Lines (ChainGPT Labs signature #line) */}
          <div className="absolute inset-0 grid grid-cols-5 pointer-events-none z-0">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className="relative h-full border-r border-zinc-800/80"
              >
                {/* Animated growing line accent */}
                <div 
                  className="absolute right-0 bottom-0 w-[1px] bg-emerald-500 animate-pulse"
                  style={{
                    height: `${30 + i * 15}%`,
                    boxShadow: '0 0 8px rgba(16, 185, 129, 0.8)'
                  }}
                />
              </div>
            ))}
          </div>

          {/* Top Bar Navigation Preview */}
          <div className="relative z-20 flex items-center justify-between p-6 sm:p-10 border-b border-zinc-800/80 text-xs text-zinc-400">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.9)]" />
              <span className="text-zinc-200 font-bold tracking-widest uppercase">IDO'KON LABS</span>
              <span className="text-zinc-600">/</span>
              <span className="text-emerald-400">POS.OS v4.2.0</span>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <span className="text-zinc-500">INIT // 2026</span>
              <button
                type="button"
                onClick={() => {
                  setIsFinished(true);
                  sessionStorage.setItem('idokon_preloader_shown', 'true');
                  if (onComplete) onComplete();
                }}
                className="px-2.5 py-1 border border-zinc-700 hover:border-emerald-500 text-zinc-300 hover:text-emerald-400 text-[10px] tracking-wider uppercase transition-colors cursor-pointer"
              >
                SKIP ➔
              </button>
            </div>
          </div>

          {/* Center Giant Amiga Digits (ChainGPT Labs #zero1 #zero2 #zero3 with LabsAmiga font) */}
          <div className="relative z-20 my-auto flex items-center justify-center">
            <div className="flex items-baseline justify-center font-amiga text-[24vw] sm:text-[22vw] leading-none tracking-tight text-white select-none drop-shadow-[0_0_35px_rgba(16,185,129,0.35)]">
              <span className="text-zinc-600">{digits.d1}</span>
              <span className="text-zinc-300">{digits.d2}</span>
              <span className="text-emerald-400">{digits.d3}</span>
            </div>
          </div>

          {/* Bottom Bar Info */}
          <div className="relative z-20 flex items-center justify-between p-6 sm:p-10 border-t border-zinc-800/80 text-[11px] text-zinc-500">
            <div className="flex items-center gap-4">
              <span>[CALIBRATING HARDWARE & FISCAL APIS]</span>
            </div>
            <div className="text-emerald-400 tracking-wider">
              STATUS: READY
            </div>
          </div>

          {/* ChainGPT Labs Pixel Dissolve Transition Overlay */}
          {isPixelating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 z-50 pointer-events-none grid grid-cols-6 sm:grid-cols-12 grid-rows-6 bg-transparent"
            >
              {Array.from({ length: 72 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 1, backgroundColor: '#0c0d12' }}
                  animate={{ 
                    opacity: 0, 
                    backgroundColor: ['#0c0d12', '#10b981', 'transparent'] 
                  }}
                  transition={{ 
                    duration: 0.6, 
                    delay: (i % 12) * 0.025 + Math.random() * 0.2 
                  }}
                  className="border border-emerald-500/20"
                />
              ))}
            </motion.div>
          )}

        </motion.div>
      )}
    </AnimatePresence>
  );
}
