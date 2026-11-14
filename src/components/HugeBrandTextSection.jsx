import React from 'react';
import { Sparkles } from 'lucide-react';
import { Reveal } from './Reveal';

export const HugeBrandTextSection = ({ lang = 'uz' }) => {
  const isRu = lang === 'ru';
  const isEn = lang === 'en';

  const texts = {
    eyebrow: isRu ? "ЭКОСИСТЕМА ТОРГОВЛИ И СКЛАДА" : isEn ? "RETAIL & INVENTORY ECOSYSTEM" : "SAVDO VA OMBOR EKOTIZIMI",
    tagline: isRu ? "Торговля во всех точках. Контроль в единой системе." : isEn ? "Retail at every point. Control in a single platform." : "Savdo barcha nuqtalarda. Nazorat yagona tizimda."
  };

  return (
    <section
      id="brand-finale"
      className="relative z-30 -mt-16 flex h-[100dvh] min-h-screen w-full select-none flex-col items-center justify-center overflow-hidden rounded-t-[40px] border-t border-[color:var(--line)] bg-white py-12 shadow-[0_-20px_60px_-30px_rgba(0,0,0,0.25)] transition-colors sm:-mt-24 sm:rounded-t-[60px] sm:py-20 lg:-mt-28 lg:rounded-t-[72px] dark:bg-black dark:shadow-none"
    >
      {/* Slide Grabber Pill on top edge */}
      <div className="pointer-events-none absolute left-1/2 top-5 h-1.5 w-16 -translate-x-1/2 rounded-full bg-zinc-300 dark:bg-zinc-700" />

      {/* Subtle Depth Grid */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] opacity-[0.04] [background-size:32px_32px] dark:opacity-[0.06]" />

      <div className="container-page relative z-10 my-auto flex w-full flex-col items-center justify-center">

        <Reveal className="mb-6 sm:mb-8">
          <div className="eyebrow">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{texts.eyebrow}</span>
          </div>
        </Reveal>

        {/* Monumental Brand Display - Fills Screen Width */}
        <div className="relative w-full overflow-hidden text-center">
          <Reveal y={24}>
            <h2 className="font-sans text-[22vw] font-semibold leading-[0.82] tracking-[-0.05em] text-zinc-950 [text-wrap:nowrap] sm:text-[21vw] lg:text-[240px] xl:text-[280px] dark:text-white">
              IDO<span className="text-emerald-500">KON</span>
            </h2>
          </Reveal>

          <Reveal as="p" delay={0.15} className="mx-auto mt-6 max-w-3xl px-4 font-sans text-xl font-medium tracking-tight text-zinc-600 sm:mt-8 sm:text-2xl lg:text-3xl dark:text-zinc-400">
            {texts.tagline}
          </Reveal>
        </div>

        {/* Minimal Signature Stamp */}
        <Reveal delay={0.3} className="mt-10 font-mono text-xs uppercase tracking-widest text-zinc-400 sm:mt-14 dark:text-zinc-600">
          idokon.uz · 2026
        </Reveal>

      </div>
    </section>
  );
};
