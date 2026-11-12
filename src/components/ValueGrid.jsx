import React from 'react';

export const ValueGrid = ({ t }) => {
  return (
    <section id="features" className="py-20 lg:py-24 bg-white dark:bg-[#090a0f] text-zinc-900 dark:text-zinc-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>{t.features.eyebrow}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight leading-tight">
            {t.features.title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {t.features.lead}
          </p>
        </div>

        {/* 2x2 Bento Grid with Foundation UI styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1 */}
          <div className="p-7 sm:p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-emerald-500/30 dark:border-emerald-500/20 shadow-sm transition-all duration-200">
            <div className="flex items-center justify-between mb-6">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs shadow-sm">
                01
              </span>
              <span className="text-xs font-mono font-medium uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                {t.features.f1_tag}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-3 text-zinc-900 dark:text-zinc-50">
              {t.features.f1_title}
            </h3>
            
            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed mb-6">
              {t.features.f1_desc}
            </p>

            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-mono">
              <span>Tranzaksiya: &lt; 0.8 sek</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">100% Soliqqa muvofiq</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-7 sm:p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200">
            <div className="flex items-center justify-between mb-6">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-bold text-xs">
                02
              </span>
              <span className="text-xs font-mono font-medium uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-zinc-200/60 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700">
                {t.features.f2_tag}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-3 text-zinc-900 dark:text-zinc-50">
              {t.features.f2_title}
            </h3>

            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed mb-6">
              {t.features.f2_desc}
            </p>

            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-mono">
              <span>O'rganish vaqti: ~10 daqiqa</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Sodda interfeys</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-7 sm:p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200">
            <div className="flex items-center justify-between mb-6">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-bold text-xs">
                03
              </span>
              <span className="text-xs font-mono font-medium uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-zinc-200/60 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700">
                {t.features.f3_tag}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-3 text-zinc-900 dark:text-zinc-50">
              {t.features.f3_title}
            </h3>

            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed mb-6">
              {t.features.f3_desc}
            </p>

            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-mono">
              <span>Boshqaruv: Web & Windows</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">1-klikda Excel</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-7 sm:p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200">
            <div className="flex items-center justify-between mb-6">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-bold text-xs">
                04
              </span>
              <span className="text-xs font-mono font-medium uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-zinc-200/60 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700">
                {t.features.f4_tag}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-3 text-zinc-900 dark:text-zinc-50">
              {t.features.f4_title}
            </h3>

            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed mb-6">
              {t.features.f4_desc}
            </p>

            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-mono">
              <span>Sozlash: 1 kunda</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Mutaxassis o'rgatishi</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
