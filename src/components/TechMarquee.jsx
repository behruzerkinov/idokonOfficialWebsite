import React from 'react';

export function TechMarquee({
  items = [
    "NEXT-GEN RETAIL OS",
    "WINDOWS & WEB TERMINAL",
    "1C & EXCEL 1-DAY MIGRATION",
    "REAL-TIME FISCAL SOLIQ INTEGRATION",
    "INSTANT CARD & QR CHECKOUT",
    "900+ ACTIVE ENTERPRISES"
  ],
  speed = 35,
  direction = 'left',
  className = ''
}) {
  const content = items.join('  ✦  ');

  return (
    <div className={`relative w-full overflow-hidden border-y border-zinc-200 dark:border-zinc-800/90 bg-zinc-100/70 dark:bg-[#0c0e14] py-3.5 sm:py-4 select-none ${className}`}>
      
      {/* Tech Corner Accent Squares (ChainGPT Labs style) */}
      <div className="absolute top-0 left-0 w-2 h-2 bg-emerald-500" />
      <div className="absolute top-0 right-0 w-2 h-2 bg-emerald-500" />
      <div className="absolute bottom-0 left-0 w-2 h-2 bg-emerald-500" />
      <div className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500" />

      {/* Marquee Track */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        <div className="flex items-center gap-8 whitespace-nowrap px-4 font-mono text-xs sm:text-sm font-bold tracking-widest text-zinc-800 dark:text-zinc-200 uppercase">
          <span>{content}</span>
          <span className="text-emerald-500">✦</span>
          <span>{content}</span>
          <span className="text-emerald-500">✦</span>
        </div>
        <div className="flex items-center gap-8 whitespace-nowrap px-4 font-mono text-xs sm:text-sm font-bold tracking-widest text-zinc-800 dark:text-zinc-200 uppercase" aria-hidden="true">
          <span>{content}</span>
          <span className="text-emerald-500">✦</span>
          <span>{content}</span>
          <span className="text-emerald-500">✦</span>
        </div>
      </div>
    </div>
  );
}
