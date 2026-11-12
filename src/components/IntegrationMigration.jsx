import React from 'react';
import { 
  RefreshCw, ShieldCheck, Headphones, CheckCircle2, 
  ArrowRight, Layers, FileSpreadsheet, Database 
} from 'lucide-react';
import { ScrambleText } from './ScrambleText';

export const IntegrationMigration = ({ t, onOpenContact }) => {
  return (
    <section id="integrations" className="py-20 lg:py-24 bg-transparent text-zinc-900 dark:text-zinc-100 transition-colors border-b border-zinc-200 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>{t.integrations.eyebrow}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight leading-tight">
            {t.integrations.title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {t.integrations.lead}
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Foundation Migration Pillar Card with Tech Box */}
          <div className="lg:col-span-5 rounded-2xl p-7 sm:p-8 bg-zinc-50 dark:bg-zinc-900 border border-emerald-500/30 dark:border-emerald-500/20 shadow-sm flex flex-col justify-between tech-box relative">
            <div className="tech-corner-square tech-corner-tl" />
            <div className="tech-corner-square tech-corner-tr" />
            <div className="tech-corner-square tech-corner-bl" />
            <div className="tech-corner-square tech-corner-br" />

            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-bold mb-4">
                <RefreshCw className="w-3.5 h-3.5 text-emerald-500" />
                <span>{t.integrations.zeroDowntime || "Nol to'xtalishli migratsiya"}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6 leading-snug">
                <ScrambleText text={t.integrations?.migrationHeadline || "1C yoki Excel bazangizni 1 kunda xatosiz o'tkazib beramiz"} scrambleOnHover duration={450} />
              </h3>

              <div className="space-y-5">
                <div className="flex gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 font-bold">
                    <RefreshCw className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">{t.integrations.card1_title}</h4>
                    <p className="text-zinc-600 dark:text-zinc-400 text-xs mt-0.5 leading-relaxed">
                      {t.integrations.card1_desc}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 font-bold">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">{t.integrations.card2_title}</h4>
                    <p className="text-zinc-600 dark:text-zinc-400 text-xs mt-0.5 leading-relaxed">
                      {t.integrations.card2_desc}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 font-bold">
                    <Headphones className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">{t.integrations.card3_title}</h4>
                    <p className="text-zinc-600 dark:text-zinc-400 text-xs mt-0.5 leading-relaxed">
                      {t.integrations.card3_desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400 font-mono flex items-center justify-between">
              <span>{t.integrations.transitionService || "O'tish davri xizmati:"}</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">{t.integrations.freeBadge || "100% BEPUL"}</span>
            </div>
          </div>

          {/* Right Column: Supported Systems Cards Grid */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
                <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  {t.integrations?.badgeTax || "Soliq / Kassa"}
                </span>
                <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-base mt-2.5 mb-1">Multikassa</h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {t.integrations.multikassaDesc}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
                <span className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  {t.integrations?.badgePos || "To'lov / Kassa"}
                </span>
                <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-base mt-2.5 mb-1">Arco Kassa</h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {t.integrations.arcoDesc}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
                <span className="text-[10px] font-mono font-bold text-blue-700 dark:text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                  {t.integrations?.badgePayments || "To'lovlar"}
                </span>
                <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-base mt-2.5 mb-1">Click & Payme</h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {t.integrations.paymentsDesc}
                </p>
              </div>
            </div>

            {/* Bottom Callout Banner */}
            <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold flex-shrink-0">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                    {t.integrations?.calloutTitle || "Eski bazangiz formatidan qat'i nazar"}
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {t.integrations?.calloutDesc || "Tovarlar, narxlar va qoldiqlarni to'liq ko'chirib, kassirlaringizni bepul o'qitamiz."}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenContact}
                className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:white text-white dark:text-zinc-950 font-bold text-xs transition-colors cursor-pointer"
              >
                <span>{t.integrations.contactSpecialist || "Mutaxassis bilan bog'lanish"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
