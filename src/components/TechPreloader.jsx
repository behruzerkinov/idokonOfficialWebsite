import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function TechPreloader({ onComplete }) {
  const [count, setCount] = useState(0);
  const [isDissolving, setIsDissolving] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [telemetryText, setTelemetryText] = useState('SYS_INIT // IDOKON_CORE');

  useEffect(() => {
    // Check if shown in this tab session
    const shown = sessionStorage.getItem('idokon_preloader_shown');
    if (shown === 'true') {
      setIsDone(true);
      if (onComplete) onComplete();
      return;
    }

    const telemetryStages = [
      { at: 15, text: 'LOADING HARDWARE INTERFACES...' },
      { at: 40, text: 'SYNCING FISCAL MODULE (SOLIQ_UZ)...' },
      { at: 65, text: 'ESTABLISHING DB_REPLICA STREAM...' },
      { at: 85, text: 'DECRYPTING CASHIER TERMINAL OS...' },
      { at: 100, text: 'SYSTEM READY // ALL NODES ONLINE' },
    ];

    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 4) + 2;
      if (current >= 100) {
        current = 100;
        setCount(100);
        setTelemetryText('SYSTEM READY // ALL NODES ONLINE');
        clearInterval(interval);

        setTimeout(() => {
          setIsDissolving(true);
          setTimeout(() => {
            setIsDone(true);
            sessionStorage.setItem('idokon_preloader_shown', 'true');
            if (onComplete) onComplete();
          }, 800);
        }, 300);
      } else {
        setCount(current);
        const stage = telemetryStages.find((s) => current <= s.at);
        if (stage) setTelemetryText(stage.text);
      }
    }, 32);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (isDone) return null;

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-[#07080c] text-white flex flex-col justify-between p-6 sm:p-12 overflow-hidden select-none font-mono"
        >
          {/* Subtle Cybernetic Background Matrix Grid */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: 'linear-gradient(to right, #10b98133 1px, transparent 1px), linear-gradient(to bottom, #10b98133 1px, transparent 1px)',
              backgroundSize: '32px 32px'
            }}
          />

          {/* CRT Scanline Effect */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-15"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.5) 2px, rgba(0, 0, 0, 0.5) 4px)'
            }}
          />

          {/* Top Bar Telemetry */}
          <div className="relative z-10 flex items-center justify-between border-b border-zinc-800/80 pb-4 text-xs">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <span className="text-emerald-400 font-bold tracking-wider">IDO'KON LABS // POS_OS</span>
              <span className="hidden sm:inline text-zinc-500">|</span>
              <span className="hidden sm:inline text-zinc-400">BUILD 2026.11.R4</span>
            </div>

            <div className="flex items-center gap-4 text-zinc-400 text-[11px]">
              <span className="tabular-nums">LATENCY: 0.4ms</span>
              <span className="hidden sm:inline text-emerald-400/80">[SECURE_SESSION]</span>
              <button
                type="button"
                onClick={() => {
                  setIsDone(true);
                  sessionStorage.setItem('idokon_preloader_shown', 'true');
                  if (onComplete) onComplete();
                }}
                className="px-2 py-0.5 rounded border border-zinc-700 hover:border-emerald-500 hover:text-emerald-400 text-[10px] text-zinc-400 transition-colors uppercase cursor-pointer"
              >
                Skip ➔
              </button>
            </div>
          </div>

          {/* Center Digital Big Counter & Glitch Flicker (ChainGPT Labs style) */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center">
            
            {/* Tech Corner Brackets */}
            <div className="relative px-8 sm:px-16 py-8 border border-zinc-800/60 bg-zinc-950/40 backdrop-blur-sm rounded-xl">
              
              {/* Corner squares (ChainGPT hero-square) */}
              <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />

              <div className="text-[11px] sm:text-xs text-zinc-400 tracking-widest uppercase mb-2">
                SYSTEM CALIBRATION
              </div>

              {/* Massive 3-Digit Counter */}
              <div className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500 tabular-nums flex items-baseline justify-center">
                <span className="text-zinc-600 font-light select-none">
                  {count < 10 ? '00' : count < 100 ? '0' : ''}
                </span>
                <span className="text-white drop-shadow-[0_0_25px_rgba(16,185,129,0.45)]">
                  {count}
                </span>
                <span className="text-2xl sm:text-3xl text-emerald-400 font-bold ml-1">%</span>
              </div>

              {/* Progress Bar with neon laser fill */}
              <div className="mt-6 w-48 sm:w-72 h-1.5 bg-zinc-800 rounded-full overflow-hidden mx-auto">
                <div 
                  className="h-full bg-emerald-400 transition-all duration-75 shadow-[0_0_12px_rgba(16,185,129,0.9)]"
                  style={{ width: `${count}%` }}
                />
              </div>

              {/* Dynamic Telemetry Status */}
              <div className="mt-4 text-xs text-emerald-400/90 font-medium tracking-wide h-5">
                {telemetryText}
              </div>
            </div>

          </div>

          {/* Bottom Bar Details */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between border-t border-zinc-800/80 pt-4 text-xs text-zinc-500 gap-2">
            <div className="flex items-center gap-2">
              <span className="text-zinc-400 font-bold">[TASHKENT_HQ]</span>
              <span>41.2995° N, 69.2401° E</span>
            </div>

            <div className="flex items-center gap-3 text-[11px]">
              <span className="text-emerald-400">STATUS: INITIALIZING ENVIRONMENT</span>
              <span>EST TIME: ~1.2s</span>
            </div>
          </div>

          {/* Dissolving Pixel Curtain Overlay on Exit */}
          {isDissolving && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-50 pointer-events-none grid grid-cols-6 sm:grid-cols-12 grid-rows-6"
            >
              {Array.from({ length: 72 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 1 }}
                  animate={{ 
                    opacity: [0, 0.9, 0],
                    backgroundColor: ['#07080c', '#10b981', 'transparent']
                  }}
                  transition={{ 
                    duration: 0.5, 
                    delay: (i % 12) * 0.02 + Math.random() * 0.15 
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
