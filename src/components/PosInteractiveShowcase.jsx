import React, { useState } from 'react';
import { 
  Maximize2, Sparkles, ShoppingCart, 
  Package, BarChart2, Clock, Monitor
} from 'lucide-react';

export const PosInteractiveShowcase = ({ t, onOpenLightbox }) => {
  const [activeTab, setActiveTab] = useState('sales');

  const screens = {
    sales: {
      src: "/screenshots/showcase_savdo.png",
      label: t?.software?.screens?.sales?.label || "Savdo hisoboti va cheklar monitoringi",
      tabLabel: t?.software?.screens?.sales?.tabLabel || t?.software?.tabs?.sales || "Savdo",
      badge: t?.software?.screens?.sales?.badge || "Real-vaqt hisobot",
      icon: <ShoppingCart className="w-3.5 h-3.5" />,
      desc: t?.software?.screens?.sales?.desc || "Kunlik va oylik savdo hisoboti, tovarlar, kassirlar, Excel eksport va grafik tahlili bitta ekranda."
    },
    inventory: {
      src: "/screenshots/showcase_ombor.png",
      label: t?.software?.screens?.inventory?.label || "Ombor qoldiqlari va tovarlar hisobi",
      tabLabel: t?.software?.screens?.inventory?.tabLabel || t?.software?.tabs?.inventory || "Ombor",
      badge: t?.software?.screens?.inventory?.badge || "Shtrix-kod & Qoldiq",
      icon: <Package className="w-3.5 h-3.5" />,
      desc: t?.software?.screens?.inventory?.desc || "Qoldiqlar hisoboti, mahsulot shtrix-kodi, partiyalar qoldig'i va umumiy summa nazorati."
    },
    analytics: {
      src: "/screenshots/showcase_analitika.png",
      label: t?.software?.screens?.analytics?.label || "ABC Tahlil va rentabellik hisoboti",
      tabLabel: t?.software?.screens?.analytics?.tabLabel || t?.software?.tabs?.analytics || "Analitika",
      badge: t?.software?.screens?.analytics?.badge || "Foyda & Daromad",
      icon: <BarChart2 className="w-3.5 h-3.5" />,
      desc: t?.software?.screens?.analytics?.desc || "ABC tahlili, tovar sotuv summasi, sof daromad, muzlatilgan mablag' va marja toifalari."
    },
    kassa: {
      src: "/screenshots/showcase_kassirlar.png",
      label: t?.software?.screens?.kassa?.label || "Kassirlar Ish O'rni (POS Terminal)",
      tabLabel: t?.software?.screens?.kassa?.tabLabel || t?.software?.tabs?.cashiers || "Kassirlar",
      badge: t?.software?.screens?.kassa?.badge || "0.8 sek tezlik",
      icon: <Monitor className="w-3.5 h-3.5" />,
      desc: t?.software?.screens?.kassa?.desc || "Kassirlar uchun maxsus interfeys: tezkor qidiruv, shtrix-kod skanerlash, smena yopish va naqd/karta to'lov."
    }
  };

  const currentScreen = screens[activeTab] || screens.sales;

  return (
    <section id="terminal" className="py-20 lg:py-24 bg-transparent text-zinc-900 dark:text-zinc-100 transition-colors border-y border-zinc-200 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.software.eyebrow}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight mb-4">
            {t.software.title}
          </h2>
          
          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed">
            {t.software.lead}
          </p>
        </div>

        {/* Foundation UI Screen Frame with 5 Authentic Tabs */}
        <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden">
          
          {/* Top Control Bar with Segmented Tabs */}
          <div className="p-3 sm:p-4 bg-zinc-100 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3">
            
            {/* Segmented Tab Controls */}
            <div className="inline-flex p-1 rounded-xl bg-zinc-200/80 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 gap-1 overflow-x-auto max-w-full">
              {Object.entries(screens).map(([key, item]) => {
                const isActive = activeTab === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveTab(key)}
                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-sm'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-300/40 dark:hover:bg-zinc-800/40'
                    }`}
                  >
                    <span className={isActive ? 'text-emerald-500' : 'text-zinc-500'}>
                      {item.icon}
                    </span>
                    <span>{item.tabLabel}</span>
                  </button>
                );
              })}
            </div>

            {/* Current Tab Info & Badge */}
            <div className="hidden sm:flex items-center gap-3">
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                {currentScreen.badge}
              </span>
              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                {currentScreen.label}
              </span>
            </div>
          </div>

          {/* Screenshot Display Area with Lightbox Zoom Trigger */}
          <div 
            className="relative bg-zinc-100 dark:bg-zinc-950 min-h-[340px] sm:min-h-[480px] lg:min-h-[580px] flex items-center justify-center p-2 sm:p-4 cursor-pointer group"
            onClick={() => onOpenLightbox && onOpenLightbox(currentScreen.src, currentScreen.label)}
            title="Batafsil ko'rish uchun bosing"
          >
            <img
              key={currentScreen.src}
              src={currentScreen.src}
              alt={currentScreen.label}
              className="w-full h-auto max-h-[700px] object-contain rounded-xl border border-zinc-200 dark:border-zinc-800/60 shadow-lg group-hover:scale-[1.01] transition-transform duration-200"
            />

            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-semibold text-xs sm:text-sm rounded-xl backdrop-blur-xs">
              <div className="px-4 py-2 rounded-lg bg-zinc-900/90 border border-zinc-700 flex items-center gap-2 shadow-xl">
                <Maximize2 className="w-4 h-4 text-emerald-400" />
                <span>{t.software?.zoomLightbox || "To'liq hajmda ko'rish"}</span>
              </div>
            </div>
          </div>

          {/* Bottom Feature Description Bar */}
          <div className="p-4 bg-zinc-50 dark:bg-zinc-900/90 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {currentScreen.label}:
              </span>
              <span className="text-zinc-600 dark:text-zinc-400">
                {currentScreen.desc}
              </span>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="text-zinc-400 font-mono text-[11px]">
                {t?.software?.platformVersion || "I-DO'KON Cloud Platform"}
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
