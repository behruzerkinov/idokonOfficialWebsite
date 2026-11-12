import React, { useState } from 'react';
import { Store, ShoppingCart, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';

export const SectorSolutions = ({ t, onOpenDemo }) => {
  const [selectedSector, setSelectedSector] = useState(0);

  const sectors = [
    {
      id: "retail",
      title: t.sectors.s1, // Chakana do'konlar
      desc: t.sectors.s1_desc,
      icon: Store,
      features: [
        "Shtrix-kod skaneri va etiketka printeri bilan to'liq integratsiya",
        "Kiyim-kechak, kosmetika va nooziq-ovqat tovarlar qulay nazorati",
        "Kechki Z-hisobot va kassir inkassatsiyasi"
      ]
    },
    {
      id: "supermarket",
      title: t.sectors.s2, // Supermarketlar
      desc: t.sectors.s2_desc,
      icon: ShoppingCart,
      features: [
        "Bir nechta kassa apparatlarini bir vaqtda tarmoqlash",
        "Elektron savdo tarozilari bilan avtomat sinxronlash",
        "Tezkor navbatlarni bartaraf etish va ommaviy sotuv"
      ]
    },
    {
      id: "minimarket",
      title: t.sectors.s3, // Mini-marketlar
      desc: t.sectors.s3_desc,
      icon: ShoppingBag,
      features: [
        "Tejamkor POS monoblok va planshetda ishlash imkoniyati",
        "Muzlatilgan qoldiqlarni aniqlash va muddat nazorati",
        "Qarz daftari (Nasiya) elektron boshqaruvi"
      ]
    }
  ];

  return (
    <section className="py-20 lg:py-24 bg-transparent text-zinc-900 dark:text-zinc-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>{t.sectors.eyebrow}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            {t.sectors.title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
            {t.sectors.lead}
          </p>
        </div>

        {/* 3 Pure Retail Shop Sectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          {sectors.map((sec, idx) => {
            const Icon = sec.icon;
            const isSelected = selectedSector === idx;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => setSelectedSector(idx)}
                className={`p-6 rounded-2xl text-left transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-500/10 dark:bg-emerald-500/10 border-2 border-emerald-500 shadow-sm'
                    : 'bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                  isSelected 
                    ? 'bg-emerald-500 text-slate-950 dark:text-slate-950 font-bold shadow-xs' 
                    : 'bg-zinc-200/80 dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400'
                }`}>
                  <Icon 
                    strokeWidth={isSelected ? 2.5 : 2}
                    style={isSelected ? { color: '#020617' } : undefined}
                    className={`w-5 h-5 transition-colors ${
                      isSelected 
                        ? 'text-slate-950 dark:text-slate-950' 
                        : 'text-emerald-600 dark:text-emerald-400'
                    }`} 
                  />
                </div>
                <h3 className="font-bold text-lg mb-1.5 text-zinc-900 dark:text-zinc-50">
                  {sec.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {sec.desc}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Sector Highlights Preview Banner */}
        <div className="rounded-2xl p-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Do'koningiz uchun imkoniyatlar: {sectors[selectedSector].title}
            </div>
            <div className="flex flex-wrap gap-y-2 gap-x-6 pt-1">
              {sectors[selectedSector].features.map((feat, fIdx) => (
                <div key={fIdx} className="flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenDemo}
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold text-slate-950 bg-emerald-500 hover:bg-emerald-400 shadow-sm transition-all duration-150 cursor-pointer"
          >
            <span>{t.hero.ctaPrimary}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
