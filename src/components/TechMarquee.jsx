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
  const content = items.join('   /   ');

  return (
    <div className={`relative w-full overflow-hidden border-y border-black/[0.05] dark:border-white/[0.06] bg-zinc-100/40 dark:bg-[#0c0d10] py-3 sm:py-3.5 select-none ${className}`}>
      {/* Edge gradient masks for elegant fade */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#fbfbfd] dark:from-[#000000] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#fbfbfd] dark:from-[#000000] to-transparent z-10" />

      {/* Marquee Track */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        <div className="flex items-center gap-8 whitespace-nowrap px-4 text-[11px] sm:text-xs font-medium tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
          <span>{content}</span>
          <span className="text-zinc-300 dark:text-zinc-700">/</span>
          <span>{content}</span>
          <span className="text-zinc-300 dark:text-zinc-700">/</span>
        </div>
        <div className="flex items-center gap-8 whitespace-nowrap px-4 text-[11px] sm:text-xs font-medium tracking-wider text-zinc-500 dark:text-zinc-400 uppercase" aria-hidden="true">
          <span>{content}</span>
          <span className="text-zinc-300 dark:text-zinc-700">/</span>
          <span>{content}</span>
          <span className="text-zinc-300 dark:text-zinc-700">/</span>
        </div>
      </div>
    </div>
  );
}
