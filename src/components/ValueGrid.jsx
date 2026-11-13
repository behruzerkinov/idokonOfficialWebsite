import React from 'react';
import { FluentRevealCard } from './FluentReveal';

export const ValueGrid = ({ t }) => {
  return (
    <section id="features" className="scroll-mt-20 py-16 sm:py-20 lg:py-24 bg-transparent text-zinc-900 dark:text-zinc-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-black/[0.06] dark:border-white/[0.08] text-zinc-600 dark:text-zinc-400 text-xs font-mono font-medium uppercase tracking-wider mb-4">
            <span>{t.features.eyebrow}</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-semibold text-[#1d1d1f] dark:text-zinc-50 tracking-[-0.03em] leading-[1.08]">
            {t.features.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            {t.features.lead}
          </p>
        </div>

        {/* 2x2 Bento Grid with Apple Refined Aesthetics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1 */}
          <FluentRevealCard className="group p-8 sm:p-9 rounded-3xl bg-white dark:bg-[#161617] border border-black/[0.06] dark:border-white/[0.08] shadow-sm hover:border-black/[0.12] dark:hover:border-white/[0.22] hover:shadow-xl dark:hover:shadow-[0_16px_48px_rgba(255,255,255,0.10)] hover:-translate-y-1 transition-all duration-300 ease-out">
            <div className="flex items-center justify-between mb-6">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold text-xs font-mono border border-transparent group-hover:bg-emerald-500/10 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-all duration-300">
                01
              </span>
              <span className="text-xs font-mono font-medium uppercase tracking-wider px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 transition-all duration-300">
                {t.features.f1_tag}
              </span>
            </div>

            <h3 className="font-sans text-xl sm:text-2xl font-semibold tracking-[-0.02em] mb-3 text-[#1d1d1f] dark:text-zinc-50 [text-wrap:balance]">
              {t.features.f1_title}
            </h3>
            
            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed mb-6 max-w-[65ch]">
              {t.features.f1_desc}
            </p>

            <div className="pt-4 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between text-xs font-mono tabular-nums">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-medium text-[11px] shadow-xs">{t.features.f1_stat_left}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-medium text-[11px] shadow-xs">{t.features.f1_stat_right}</span>
            </div>
          </FluentRevealCard>

          {/* Card 2 */}
          <FluentRevealCard className="group p-8 sm:p-9 rounded-3xl bg-white dark:bg-[#161617] border border-black/[0.06] dark:border-white/[0.08] shadow-sm hover:border-black/[0.12] dark:hover:border-white/[0.22] hover:shadow-xl dark:hover:shadow-[0_16px_48px_rgba(255,255,255,0.10)] hover:-translate-y-1 transition-all duration-300 ease-out">
            <div className="flex items-center justify-between mb-6">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold text-xs font-mono border border-transparent group-hover:bg-emerald-500/10 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-all duration-300">
                02
              </span>
              <span className="text-xs font-mono font-medium uppercase tracking-wider px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 transition-all duration-300">
                {t.features.f2_tag}
              </span>
            </div>

            <h3 className="font-sans text-xl sm:text-2xl font-semibold tracking-[-0.02em] mb-3 text-[#1d1d1f] dark:text-zinc-50 [text-wrap:balance]">
              {t.features.f2_title}
            </h3>

            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed mb-6 max-w-[65ch]">
              {t.features.f2_desc}
            </p>

            <div className="pt-4 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between text-xs font-mono tabular-nums">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-medium text-[11px] shadow-xs">{t.features.f2_stat_left}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-medium text-[11px] shadow-xs">{t.features.f2_stat_right}</span>
            </div>
          </FluentRevealCard>

          {/* Card 3 */}
          <FluentRevealCard className="group p-8 sm:p-9 rounded-3xl bg-white dark:bg-[#161617] border border-black/[0.06] dark:border-white/[0.08] shadow-sm hover:border-black/[0.12] dark:hover:border-white/[0.22] hover:shadow-xl dark:hover:shadow-[0_16px_48px_rgba(255,255,255,0.10)] hover:-translate-y-1 transition-all duration-300 ease-out">
            <div className="flex items-center justify-between mb-6">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold text-xs font-mono border border-transparent group-hover:bg-emerald-500/10 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-all duration-300">
                03
              </span>
              <span className="text-xs font-mono font-medium uppercase tracking-wider px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 transition-all duration-300">
                {t.features.f3_tag}
              </span>
            </div>

            <h3 className="font-sans text-xl sm:text-2xl font-semibold tracking-[-0.02em] mb-3 text-[#1d1d1f] dark:text-zinc-50 [text-wrap:balance]">
              {t.features.f3_title}
            </h3>

            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed mb-6 max-w-[65ch]">
              {t.features.f3_desc}
            </p>

            <div className="pt-4 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between text-xs font-mono tabular-nums">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-medium text-[11px] shadow-xs">{t.features.f3_stat_left}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-medium text-[11px] shadow-xs">{t.features.f3_stat_right}</span>
            </div>
          </FluentRevealCard>

          {/* Card 4 */}
          <FluentRevealCard className="group p-8 sm:p-9 rounded-3xl bg-white dark:bg-[#161617] border border-black/[0.06] dark:border-white/[0.08] shadow-sm hover:border-black/[0.12] dark:hover:border-white/[0.22] hover:shadow-xl dark:hover:shadow-[0_16px_48px_rgba(255,255,255,0.10)] hover:-translate-y-1 transition-all duration-300 ease-out">
            <div className="flex items-center justify-between mb-6">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold text-xs font-mono border border-transparent group-hover:bg-emerald-500/10 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-all duration-300">
                04
              </span>
              <span className="text-xs font-mono font-medium uppercase tracking-wider px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 transition-all duration-300">
                {t.features.f4_tag}
              </span>
            </div>

            <h3 className="font-sans text-xl sm:text-2xl font-semibold tracking-[-0.02em] mb-3 text-[#1d1d1f] dark:text-zinc-50 [text-wrap:balance]">
              {t.features.f4_title}
            </h3>

            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed mb-6 max-w-[65ch]">
              {t.features.f4_desc}
            </p>

            <div className="pt-4 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between text-xs font-mono tabular-nums">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-medium text-[11px] shadow-xs">{t.features.f4_stat_left}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-medium text-[11px] shadow-xs">{t.features.f4_stat_right}</span>
            </div>
          </FluentRevealCard>

        </div>

      </div>
    </section>
  );
};
