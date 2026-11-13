import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export const HugeBrandTextSection = ({ lang = 'uz', t }) => {
  const isRu = lang === 'ru';
  const isEn = lang === 'en';

  const texts = {
    eyebrow: isRu ? "ЭКОСИСТЕМА ТОРГОВЛИ И СКЛАДА" : isEn ? "RETAIL & INVENTORY ECOSYSTEM" : "SAVDO VA OMBOR EKOTIZIMI",
    tagline: isRu ? "Торговля во всех точках. Контроль в единой системе." : isEn ? "Retail at every point. Control in a single platform." : "Savdo barcha nuqtalarda. Nazorat yagona tizimda."
  };

  return (
    <section 
      id="brand-finale"
      className="relative z-30 w-full min-h-screen h-[100dvh] flex flex-col justify-center items-center py-12 sm:py-20 overflow-hidden rounded-t-[40px] sm:rounded-t-[60px] lg:rounded-t-[72px] bg-white dark:bg-[#000000] border-t border-black/[0.08] dark:border-white/[0.12] shadow-[0_-35px_90px_-15px_rgba(0,0,0,0.25)] dark:shadow-[0_-50px_120px_-20px_rgba(0,0,0,0.98)] -mt-16 sm:-mt-24 lg:-mt-28 select-none transition-colors"
    >
      {/* Slide Grabber Pill on top edge */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 w-16 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700/80 pointer-events-none" />

      {/* Ambient Radial Depth Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[700px] bg-emerald-500/[0.06] dark:bg-emerald-500/[0.05] rounded-full blur-[180px] pointer-events-none" />

      {/* Subtle Depth Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center justify-center my-auto">
        
        {/* Top Eyebrow Tag */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-100 dark:bg-[#12141c] border border-zinc-200/90 dark:border-white/[0.08] text-zinc-700 dark:text-zinc-300 text-xs font-mono font-medium tracking-wide uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>{texts.eyebrow}</span>
          </div>
        </div>

        {/* Monumental Brand Display - Fills Screen Width */}
        <div className="relative text-center overflow-hidden w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 35 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-sans text-[22vw] sm:text-[21vw] lg:text-[240px] xl:text-[280px] font-bold leading-[0.82] tracking-[-0.05em] text-[#1d1d1f] dark:text-white [text-wrap:nowrap] transition-all duration-300">
              IDO<span className="text-emerald-500 font-bold">KON</span>
            </h2>
          </motion.div>

          <p className="mt-6 sm:mt-8 font-sans text-xl sm:text-2xl lg:text-3xl text-zinc-600 dark:text-zinc-400 font-medium tracking-tight max-w-3xl mx-auto px-4">
            {texts.tagline}
          </p>
        </div>

        {/* Minimal Signature Stamp */}
        <div className="mt-10 sm:mt-14 text-xs font-mono text-zinc-400 dark:text-zinc-600 tracking-widest uppercase">
          idokon.uz · 2026
        </div>

      </div>
    </section>
  );
};
