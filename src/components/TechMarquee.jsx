import React from 'react';

const TRACK = 'flex items-center gap-8 whitespace-nowrap px-4 text-[11px] font-medium uppercase tracking-wider text-zinc-500 sm:text-xs dark:text-zinc-400';
const SEPARATOR = 'text-zinc-300 dark:text-zinc-700';

const Segment = ({ content, ...rest }) => (
  <div className={TRACK} {...rest}>
    <span>{content}</span>
    <span className={SEPARATOR}>/</span>
    <span>{content}</span>
    <span className={SEPARATOR}>/</span>
  </div>
);

export function TechMarquee({
  items = [
    'NEXT-GEN RETAIL OS',
    'WINDOWS & WEB TERMINAL',
    '1C & EXCEL 1-DAY MIGRATION',
    'REAL-TIME FISCAL SOLIQ INTEGRATION',
    'INSTANT CARD & QR CHECKOUT',
    '900+ ACTIVE ENTERPRISES'
  ],
  className = ''
}) {
  const content = items.join('   /   ');

  return (
    <div className={`relative w-full select-none overflow-hidden border-y border-zinc-200/80 py-3 sm:py-3.5 dark:border-zinc-800/80 ${className}`}>
      {/* Edge masks blend into the page background */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--bg)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--bg)] to-transparent" />

      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        <Segment content={content} />
        <Segment content={content} aria-hidden="true" />
      </div>
    </div>
  );
}
