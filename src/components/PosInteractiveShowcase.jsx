import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Maximize2, Sparkles, ShoppingCart, 
  Package, BarChart2, Monitor, ArrowRight,
  CheckCircle2, ChevronRight, ChevronLeft
} from 'lucide-react';

export const PosInteractiveShowcase = ({ t, onOpenLightbox }) => {
  const [activeStep, setActiveStep] = useState(0);

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

  const currentStage = stages[activeStep] || stages[0];

  const handleNext = () => {
    setActiveStep((prev) => (prev + 1) % stages.length);
  };

  const handlePrev = () => {
    setActiveStep((prev) => (prev - 1 + stages.length) % stages.length);
  };

  return (
    <section 
      id="terminal"
      className="scroll-mt-20 relative py-14 sm:py-16 lg:py-20 bg-transparent text-zinc-900 dark:text-zinc-100 transition-colors border-b border-zinc-200/80 dark:border-white/[0.08]"
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Top Control Bar: Eyebrow */}
        <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8 pb-3 border-b border-zinc-200/80 dark:border-white/[0.08]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100/90 dark:bg-[#12141c] border border-zinc-200 dark:border-white/[0.08] text-zinc-700 dark:text-zinc-300 text-xs font-mono font-medium tracking-tight shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>{t?.software?.eyebrow || "DASTUR IMKONIYATLARI"}</span>
          </div>
        </div>

        {/* Two-Column Clean Layout with zero trailing empty space */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Clean, Morphing Single Copy Viewport (No blurred ghosts underneath) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            
            <div className="relative min-h-[190px] sm:min-h-[210px] flex flex-col justify-center pl-4 border-l-2 border-emerald-500">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStage.id}
                  initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-3"
                >
                  {/* Eyebrow */}
                  <div>
                    <span className="text-xs font-mono font-bold tracking-wider uppercase text-emerald-500 dark:text-emerald-400 inline-block">
                      {currentStage.eyebrow}
                    </span>
                  </div>

                  {/* Section Title */}
                  <h3 className="font-sans text-2xl sm:text-3xl lg:text-[36px] font-semibold tracking-[-0.03em] leading-[1.15] text-[#1d1d1f] dark:text-zinc-50">
                    {currentStage.title}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-300 font-normal max-w-[48ch]">
                    {currentStage.desc}
                  </p>

                  {/* Stats badge (Green accent with white text) */}
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-medium shadow-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white flex-shrink-0" />
                      <span className="text-white">{currentStage.stats}</span>
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Quick Step Switcher Controls */}
            <div className="mt-6 pl-4 flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                {stages.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveStep(i)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      activeStep === i ? 'w-8 bg-emerald-500' : 'w-2 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400'
                    }`}
                    aria-label={`Bosqich ${i + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-1.5 ml-auto">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 transition-colors cursor-pointer"
                  aria-label="Oldingi"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 transition-colors cursor-pointer"
                  aria-label="Keyingi"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Clean Interactive Visual Canvas */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-3xl bg-white dark:bg-[#0c0d13] border border-zinc-200/90 dark:border-white/[0.09] p-3 sm:p-4 shadow-xl backdrop-blur-xl overflow-hidden transition-all duration-300">
              
              {/* Canvas Header bar */}
              <div className="flex items-center justify-between px-3.5 py-2 rounded-2xl bg-zinc-100/90 dark:bg-[#141620] border border-zinc-200/60 dark:border-white/[0.06] mb-3">
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
                    className="p-1.5 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
                    title={t?.software?.zoomLightbox || "To'liq hajmda ko'rish"}
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Canvas Display Viewport */}
              <div 
                className="relative rounded-2xl overflow-hidden bg-zinc-100 dark:bg-[#08090d] border border-zinc-200/60 dark:border-white/[0.06] min-h-[260px] sm:min-h-[400px] lg:min-h-[460px] flex items-center justify-center cursor-pointer group"
                onClick={() => onOpenLightbox && onOpenLightbox(currentStage.src, currentStage.title)}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentStage.src}
                    src={currentStage.src}
                    alt={currentStage.title}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-auto max-h-[540px] object-contain rounded-xl shadow-md"
                  />
                </AnimatePresence>

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
    </section>
  );
};
