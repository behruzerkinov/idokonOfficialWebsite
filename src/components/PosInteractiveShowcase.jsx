import React, { useState, useEffect, useRef } from 'react';
import { 
  Maximize2, Sparkles, ShoppingCart, 
  Package, BarChart2, Monitor, ArrowRight,
  CheckCircle2, Layers
} from 'lucide-react';

export const PosInteractiveShowcase = ({ t, onOpenLightbox }) => {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);
  const isManualTabRef = useRef(false);

  const stages = [
    {
      id: 'inventory',
      num: '01',
      tag: t?.software?.screens?.inventory?.badge || 'Shtrix-kod & Qoldiq',
      eyebrow: '01 / OMBOR VA TAHLIL',
      title: t?.software?.screens?.inventory?.label || "Ombor qoldiqlari va tovarlar hisobi",
      desc: t?.software?.screens?.inventory?.desc || "Qoldiqlar hisoboti, mahsulot shtrix-kodi, partiyalar qoldig'i va minimal zaxira ogohlantirishi.",
      stats: '100% SKU aniqligi · Avto-ogohlantirish',
      src: '/screenshots/showcase_ombor.png',
      icon: <Package className="w-4 h-4" />
    },
    {
      id: 'kassa',
      num: '02',
      tag: t?.software?.screens?.kassa?.badge || '0.8 sek tezlik',
      eyebrow: '02 / TEZKOR POS TERMINAL',
      title: t?.software?.screens?.kassa?.label || "Kassirlar Ish O'rni (POS Terminal)",
      desc: t?.software?.screens?.kassa?.desc || "Kassirlar uchun maxsus interfeys: tezkor qidiruv, shtrix-kod skanerlash, smena yopish va naqd/karta to'lov.",
      stats: '0.8 soniya tranzaksiya · Oflayn rejim',
      src: '/screenshots/showcase_kassirlar.png',
      icon: <Monitor className="w-4 h-4" />
    },
    {
      id: 'analytics',
      num: '03',
      tag: t?.software?.screens?.analytics?.badge || 'Foyda & Daromad',
      eyebrow: '03 / MOLIYAVIY INTELLEKT',
      title: t?.software?.screens?.analytics?.label || "ABC Tahlil va rentabellik hisoboti",
      desc: t?.software?.screens?.analytics?.desc || "ABC tahlili, tovar sotuv summasi, sof daromad, muzlatilgan mablag' va marja toifalari.",
      stats: 'ABC tahlili · Sof marja tahlili',
      src: '/screenshots/showcase_analitika.png',
      icon: <BarChart2 className="w-4 h-4" />
    },
    {
      id: 'sales',
      num: '04',
      tag: t?.software?.screens?.sales?.badge || 'Real-vaqt hisobot',
      eyebrow: '04 / SAVDO VA EKOTIZIM',
      title: t?.software?.screens?.sales?.label || "Savdo hisoboti va cheklar monitoringi",
      desc: t?.software?.screens?.sales?.desc || "Kunlik va oylik savdo hisoboti, tovarlar, kassirlar, Excel eksport va grafik tahlili bitta ekranda.",
      stats: '100% Soliq integratsiyasi · Excel / 1C',
      src: '/screenshots/showcase_savdo.png',
      icon: <ShoppingCart className="w-4 h-4" />
    }
  ];

  // Twain AI scroll-driven stage advancement (Pins full screen and switches tabs sequentially)
  useEffect(() => {
    const handleScroll = () => {
      if (isManualTabRef.current) return;
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress through the container
      const totalScrollable = rect.height - windowHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(currentScroll / totalScrollable, 0), 0.999);
      
      const newStep = Math.min(Math.floor(progress * stages.length), stages.length - 1);
      if (newStep !== activeStep && newStep >= 0 && newStep < stages.length) {
        setActiveStep(newStep);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeStep, stages.length]);

  // Tab click handler with synchronized smooth scroll to stage section
  const handleTabClick = (idx) => {
    setActiveStep(idx);
    isManualTabRef.current = true;
    
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const containerTop = window.scrollY + rect.top;
      const containerHeight = rect.height;
      const windowHeight = window.innerHeight;
      const totalScrollable = containerHeight - windowHeight;
      
      const targetScroll = containerTop + (idx / stages.length) * totalScrollable + 50;
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }

    setTimeout(() => {
      isManualTabRef.current = false;
    }, 900);
  };

  const currentStage = stages[activeStep] || stages[0];

  return (
    <>
      <div 
        ref={containerRef} 
        id="features-and-benefits"
        className="relative bg-transparent text-zinc-900 dark:text-zinc-100 min-h-[320vh] lg:min-h-[360vh] scroll-mt-24"
      >
        <span id="terminal" className="absolute top-0 pointer-events-none" />
        {/* Sticky viewport frame that locks on screen */}
        <div className="sticky top-16 lg:top-20 min-h-[calc(100vh-4rem)] flex flex-col justify-center py-6 lg:py-10 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            
            {/* Section Eyebrow Header & Reference Tab Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-zinc-200/80 dark:border-white/[0.08]">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-100/90 dark:bg-[#12141c] border border-zinc-200 dark:border-white/[0.08] text-zinc-700 dark:text-zinc-300 text-xs font-mono font-medium tracking-tight shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                <span>{t?.software?.eyebrow || "DASTUR IMKONIYATLARI"}</span>
              </div>

              {/* Connected iOS Glass Tab Switcher (Twain reference style) */}
              <div className="flex items-center gap-1 p-1.5 rounded-2xl bg-zinc-100/80 dark:bg-[#12141c]/90 border border-zinc-200/90 dark:border-white/[0.1] shadow-lg shadow-black/10 dark:shadow-black/40 backdrop-blur-2xl">
                {stages.map((st, idx) => {
                  const isSelected = activeStep === idx;
                  return (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => handleTabClick(idx)}
                      className={`relative px-3.5 sm:px-4 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                        isSelected 
                          ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-md font-semibold ring-1 ring-black/5 dark:ring-white/10' 
                          : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-emerald-500' : 'bg-transparent'}`} />
                      <span>{st.num}</span>
                      <span className="hidden sm:inline font-mono uppercase tracking-wider">{st.id}</span>
                      {isSelected && (
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                          Live
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Twain Two-Column Stage Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              
              {/* Left Column: Twain .deep-research-copy-stack */}
              <div className="lg:col-span-5 flex flex-col justify-center space-y-6 sm:space-y-8">
                {stages.map((stage, index) => {
                  const isActive = activeStep === index;
                  return (
                    <div
                      key={stage.id}
                      onClick={() => handleTabClick(index)}
                      className={`cursor-pointer transition-all duration-500 relative pl-4 border-l-2 ${
                        isActive 
                          ? 'border-emerald-500 twain-blur-active' 
                          : 'border-transparent twain-blur-inactive hover:opacity-50'
                      }`}
                    >
                      {/* Eyebrow */}
                      <span className="text-[11px] font-mono tracking-wider uppercase font-semibold text-emerald-600 dark:text-emerald-400 mb-1 block">
                        {stage.eyebrow}
                      </span>

                      {/* Editorial Title (Twain Produkt / Fraunces style) */}
                      <h3 className={`font-serif text-2xl sm:text-3xl lg:text-[40px] font-normal tracking-[-0.025em] leading-[1.1] transition-colors duration-300 ${
                        isActive 
                          ? 'text-zinc-950 dark:text-zinc-50' 
                          : 'text-zinc-600 dark:text-zinc-400'
                      }`}>
                        {stage.title}
                      </h3>

                      {/* Description */}
                      <p className={`font-sans text-sm sm:text-base leading-relaxed mt-2.5 transition-opacity duration-300 ${
                        isActive 
                          ? 'text-zinc-600 dark:text-zinc-300 opacity-100 max-h-32' 
                          : 'text-zinc-400 dark:text-zinc-500 opacity-70 max-h-0 sm:max-h-32 overflow-hidden'
                      }`}>
                        {stage.desc}
                      </p>

                      {/* Stats badge */}
                      {isActive && (
                        <div className="mt-3.5 flex items-center gap-2 text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                          <span>{stage.stats}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Right Column: Twain Interactive Visual Canvas (Deep Obsidian / Pure Glass) */}
              <div className="lg:col-span-7 relative">
                <div className="relative rounded-3xl bg-white dark:bg-[#0c0d13] border border-zinc-200/90 dark:border-white/[0.09] p-3 sm:p-4 shadow-2xl backdrop-blur-xl overflow-hidden transition-all duration-500">
                  
                  {/* Canvas Header bar */}
                  <div className="flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-zinc-100/90 dark:bg-[#141620] border border-zinc-200/60 dark:border-white/[0.06] mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300">
                        {currentStage.tag}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
                        {currentStage.eyebrow}
                      </span>
                      <button
                        type="button"
                        onClick={() => onOpenLightbox && onOpenLightbox(currentStage.src, currentStage.title)}
                        className="p-1.5 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                        title={t?.software?.zoomLightbox || "To'liq hajmda ko'rish"}
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Canvas Display Viewport */}
                  <div 
                    className="relative rounded-2xl overflow-hidden bg-zinc-100 dark:bg-[#08090d] border border-zinc-200/60 dark:border-white/[0.06] min-h-[260px] sm:min-h-[420px] lg:min-h-[480px] flex items-center justify-center cursor-pointer group"
                    onClick={() => onOpenLightbox && onOpenLightbox(currentStage.src, currentStage.title)}
                  >
                    <img
                      key={currentStage.src}
                      src={currentStage.src}
                      alt={currentStage.title}
                      className="w-full h-auto max-h-[560px] object-contain rounded-xl shadow-md transition-all duration-500 group-hover:scale-[1.01]"
                    />

                    {/* Hover zoom pill */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs sm:text-sm font-semibold rounded-xl backdrop-blur-xs">
                      <div className="px-4 py-2 rounded-full bg-zinc-900/90 border border-zinc-700 flex items-center gap-2 shadow-xl">
                        <Maximize2 className="w-4 h-4 text-emerald-400" />
                        <span>{t?.software?.zoomLightbox || "To'liq hajmda ko'rish"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Canvas Footer specs */}
                  <div className="mt-3 px-3 py-2 rounded-xl bg-zinc-50 dark:bg-[#141620]/80 border border-zinc-200/50 dark:border-white/[0.05] flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">
                      {currentStage.title}
                    </span>
                    <span className="font-mono text-zinc-400 text-[11px]">
                      {t?.software?.platformVersion || "I-DO'KON Cloud Platform"}
                    </span>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
};
