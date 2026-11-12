import React from 'react';
import { FluentRevealCard } from './FluentReveal';

export const ValueGrid = ({ t }) => {
  return (
    <section id="features" className="py-20 lg:py-24 bg-transparent text-zinc-900 dark:text-zinc-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3 font-mono">
            <span>{t.features.eyebrow}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-zinc-950 dark:text-zinc-50 tracking-[-0.03em] leading-tight">
            {t.features.title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {t.features.lead}
          </p>
        </div>

        {/* 2x2 Bento Grid with Windows 10 Fluent Reveal Spotlight & Tech Corners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1 */}
          <FluentRevealCard className="group p-7 sm:p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-emerald-500/40 dark:hover:border-emerald-500/40 hover:shadow-md transition-all duration-300 tech-box">
            <div className="tech-corner-square tech-corner-tl" />
            <div className="tech-corner-square tech-corner-br" />
            
            <div className="flex items-center justify-between mb-6">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-200/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold text-xs font-mono border border-transparent group-hover:bg-emerald-500/10 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 group-hover:border-emerald-500/40 transition-all duration-300">
                01
              </span>
              <span className="text-xs font-mono font-medium uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-zinc-200/60 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700 group-hover:bg-emerald-500/10 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-all duration-300">
                {t.features.f1_tag}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-3 text-zinc-900 dark:text-zinc-50 [text-wrap:balance]">
              {t.features.f1_title}
            </h3>
            
            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed mb-6 max-w-[65ch]">
              {t.features.f1_desc}
            </p>

            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs font-mono tabular-nums">
              <span className="text-emerald-500 dark:text-emerald-400 font-semibold">{t.features.f1_stat_left}</span>
              <span className="text-emerald-500 dark:text-emerald-400 font-semibold">{t.features.f1_stat_right}</span>
            </div>
          </FluentRevealCard>

          {/* Card 2 */}
          <FluentRevealCard className="group p-7 sm:p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-emerald-500/40 dark:hover:border-emerald-500/40 hover:shadow-md transition-all duration-300 tech-box">
            <div className="tech-corner-square tech-corner-tl" />
            <div className="tech-corner-square tech-corner-br" />

            <div className="flex items-center justify-between mb-6">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-200/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold text-xs font-mono border border-transparent group-hover:bg-emerald-500/10 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 group-hover:border-emerald-500/40 transition-all duration-300">
                02
              </span>
              <span className="text-xs font-mono font-medium uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-zinc-200/60 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700 group-hover:bg-emerald-500/10 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-all duration-300">
                {t.features.f2_tag}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-3 text-zinc-900 dark:text-zinc-50 [text-wrap:balance]">
              {t.features.f2_title}
            </h3>

            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed mb-6 max-w-[65ch]">
              {t.features.f2_desc}
            </p>

            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs font-mono tabular-nums">
              <span className="text-emerald-500 dark:text-emerald-400 font-semibold">{t.features.f2_stat_left}</span>
              <span className="text-emerald-500 dark:text-emerald-400 font-semibold">{t.features.f2_stat_right}</span>
            </div>
          </FluentRevealCard>

          {/* Card 3 */}
          <FluentRevealCard className="group p-7 sm:p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-emerald-500/40 dark:hover:border-emerald-500/40 hover:shadow-md transition-all duration-300 tech-box">
            <div className="tech-corner-square tech-corner-tl" />
            <div className="tech-corner-square tech-corner-br" />

            <div className="flex items-center justify-between mb-6">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-200/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold text-xs font-mono border border-transparent group-hover:bg-emerald-500/10 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 group-hover:border-emerald-500/40 transition-all duration-300">
                03
              </span>
              <span className="text-xs font-mono font-medium uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-zinc-200/60 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700 group-hover:bg-emerald-500/10 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-all duration-300">
                {t.features.f3_tag}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-3 text-zinc-900 dark:text-zinc-50 [text-wrap:balance]">
              {t.features.f3_title}
            </h3>

            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed mb-6 max-w-[65ch]">
              {t.features.f3_desc}
            </p>

            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs font-mono tabular-nums">
              <span className="text-emerald-500 dark:text-emerald-400 font-semibold">{t.features.f3_stat_left}</span>
              <span className="text-emerald-500 dark:text-emerald-400 font-semibold">{t.features.f3_stat_right}</span>
            </div>
          </FluentRevealCard>

          {/* Card 4 */}
          <FluentRevealCard className="group p-7 sm:p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-emerald-500/40 dark:hover:border-emerald-500/40 hover:shadow-md transition-all duration-300 tech-box">
            <div className="tech-corner-square tech-corner-tl" />
            <div className="tech-corner-square tech-corner-br" />

            <div className="flex items-center justify-between mb-6">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-200/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold text-xs font-mono border border-transparent group-hover:bg-emerald-500/10 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 group-hover:border-emerald-500/40 transition-all duration-300">
                04
              </span>
              <span className="text-xs font-mono font-medium uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-zinc-200/60 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700 group-hover:bg-emerald-500/10 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-all duration-300">
                {t.features.f4_tag}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-3 text-zinc-900 dark:text-zinc-50 [text-wrap:balance]">
              {t.features.f4_title}
            </h3>

            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed mb-6 max-w-[65ch]">
              {t.features.f4_desc}
            </p>

            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs font-mono tabular-nums">
              <span className="text-emerald-500 dark:text-emerald-400 font-semibold">{t.features.f4_stat_left}</span>
              <span className="text-emerald-500 dark:text-emerald-400 font-semibold">{t.features.f4_stat_right}</span>
            </div>
          </FluentRevealCard>

        </div>

      </div>
    </section>
  );
};
