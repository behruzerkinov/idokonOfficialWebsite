import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Maximize2, Sparkles, ShoppingCart, 
  Package, BarChart2, Monitor,
  CheckCircle2, ChevronRight, ChevronLeft
} from 'lucide-react';

export const PosInteractiveShowcase = ({ t, onOpenLightbox }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [direction, setDirection] = useState(0); // 1 = next, -1 = prev
  const [isMouseDown, setIsMouseDown] = useState(false);

  // Touch & Mouse Gesture tracking refs for thumb/drag swiping
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);
  const touchDeltaXRef = useRef(0);
  const isHorizontalSwipeRef = useRef(false);

  const mouseStartXRef = useRef(0);
  const mouseMovedRef = useRef(false);
  const lastWheelTimeRef = useRef(0);

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

  const paginate = useCallback((newDirection) => {
    setDirection(newDirection);
    setActiveStep((prev) => {
      if (newDirection > 0) {
        return (prev + 1) % stages.length;
      }
      return (prev - 1 + stages.length) % stages.length;
    });
  }, [stages.length]);

  const goToStep = (index) => {
    if (index === activeStep) return;
    setDirection(index > activeStep ? 1 : -1);
    setActiveStep(index);
  };

  // 1. Mobile Touch / Thumb Swiping
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
    touchDeltaXRef.current = 0;
    isHorizontalSwipeRef.current = false;
  };

  const handleTouchMove = (e) => {
    const deltaX = e.touches[0].clientX - touchStartXRef.current;
    const deltaY = e.touches[0].clientY - touchStartYRef.current;

    // Detect horizontal thumb gesture vs vertical page scroll
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 12) {
      isHorizontalSwipeRef.current = true;
      touchDeltaXRef.current = deltaX;
    }
  };

  const handleTouchEnd = () => {
    if (isHorizontalSwipeRef.current) {
      // Swiping left with thumb -> advance to next
      if (touchDeltaXRef.current < -40) {
        paginate(1);
      } else if (touchDeltaXRef.current > 40) {
        // Swiping right with thumb -> go back to previous
        paginate(-1);
      }
    }
    isHorizontalSwipeRef.current = false;
    touchDeltaXRef.current = 0;
  };

  // 2. Desktop Mouse Click-and-Drag Physics
  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    setIsMouseDown(true);
    mouseStartXRef.current = e.clientX;
    mouseMovedRef.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown) return;
    const deltaX = e.clientX - mouseStartXRef.current;
    if (Math.abs(deltaX) > 8) {
      mouseMovedRef.current = true;
    }
  };

  const handleMouseUp = (e) => {
    if (!isMouseDown) return;
    setIsMouseDown(false);
    const deltaX = e.clientX - mouseStartXRef.current;
    if (mouseMovedRef.current) {
      if (deltaX < -45) {
        paginate(1);
      } else if (deltaX > 45) {
        paginate(-1);
      }
    }
  };

  const handleMouseLeave = () => {
    if (isMouseDown) {
      setIsMouseDown(false);
    }
  };

  // 3. Trackpad Two-Finger Horizontal Gesture
  const handleWheel = (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 28) {
      const now = Date.now();
      if (now - lastWheelTimeRef.current > 380) {
        lastWheelTimeRef.current = now;
        if (e.deltaX > 0) {
          paginate(1);
        } else {
          paginate(-1);
        }
      }
    }
  };

  const handleImageClick = () => {
    if (mouseMovedRef.current) {
      mouseMovedRef.current = false;
      return;
    }
    if (onOpenLightbox) {
      onOpenLightbox(currentStage.src, currentStage.title);
    }
  };

  // Directional slide variants for both text and canvas
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 35 : -35,
      opacity: 0,
      filter: 'blur(3px)'
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)'
    },
    exit: (dir) => ({
      x: dir > 0 ? -35 : 35,
      opacity: 0,
      filter: 'blur(3px)'
    })
  };

  return (
    <section 
      id="terminal"
      className="scroll-mt-20 relative py-14 sm:py-16 lg:py-20 bg-transparent text-zinc-900 dark:text-zinc-100 transition-colors border-b border-zinc-200/80 dark:border-white/[0.08] touch-pan-y"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onWheel={handleWheel}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Top Control Bar: Eyebrow */}
        <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8 pb-3 border-b border-zinc-200/80 dark:border-white/[0.08]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100/90 dark:bg-[#12141c] border border-zinc-200 dark:border-white/[0.08] text-zinc-700 dark:text-zinc-300 text-xs font-mono font-medium tracking-tight shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>{t?.software?.eyebrow || "DASTUR IMKONIYATLARI"}</span>
          </div>

          {/* Swipe indicator hint for mobile thumb and computer drag */}
          <div className="text-[11px] font-mono text-zinc-400 select-none hidden sm:flex items-center gap-2">
            <span>Surish yoki tortish</span>
            <span className="text-zinc-300 dark:text-zinc-700">·</span>
            <span className="text-emerald-500 font-semibold">{activeStep + 1} / {stages.length}</span>
          </div>
        </div>

        {/* Two-Column Clean Layout with Thumb & Drag gesture support */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Morphing Copy Viewport */}
          <div className="lg:col-span-5 flex flex-col justify-center select-none">
            
            <div className="relative min-h-[190px] sm:min-h-[210px] flex flex-col justify-center pl-4 border-l-2 border-emerald-500 overflow-hidden">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={currentStage.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
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

            {/* Thumb-Scrollable Step Switcher Controls */}
            <div className="mt-6 pl-4 flex items-center gap-3">
              
              {/* Interactive Dots / Thumb Capsule Bar */}
              <div 
                className="flex items-center gap-1.5 p-1 rounded-full bg-zinc-100 dark:bg-zinc-800/60 border border-black/[0.04] dark:border-white/[0.06] cursor-pointer"
                title="Bosqichni tanlash yoki surish"
              >
                {stages.map((st, i) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToStep(i);
                    }}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeStep === i 
                        ? 'w-9 bg-emerald-500 shadow-xs' 
                        : 'w-2.5 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600'
                    }`}
                    aria-label={`Bosqich ${i + 1}: ${st.title}`}
                    title={st.title}
                  />
                ))}
              </div>

              {/* Prev / Next Click Controls */}
              <div className="flex items-center gap-1.5 ml-auto">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    paginate(-1);
                  }}
                  className="p-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-xs"
                  aria-label="Oldingi"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    paginate(1);
                  }}
                  className="p-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-xs"
                  aria-label="Keyingi"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Clean Interactive Visual Canvas (Thumb & Drag Responsive) */}
          <div className="lg:col-span-7 relative">
            <div 
              className={`relative rounded-3xl bg-white dark:bg-[#0c0d13] border border-zinc-200/90 dark:border-white/[0.09] p-3 sm:p-4 shadow-xl backdrop-blur-xl overflow-hidden transition-all duration-300 ${
                isMouseDown ? 'cursor-grabbing' : 'cursor-grab'
              }`}
            >
              
              {/* Canvas Header bar */}
              <div className="flex items-center justify-between px-3.5 py-2 rounded-2xl bg-zinc-100/90 dark:bg-[#141620] border border-zinc-200/60 dark:border-white/[0.06] mb-3 select-none">
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
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onOpenLightbox) {
                        onOpenLightbox(currentStage.src, currentStage.title);
                      }
                    }}
                    className="p-1.5 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
                    title={t?.software?.zoomLightbox || "To'liq hajmda ko'rish"}
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Canvas Display Viewport with smooth directional slide animation */}
              <div 
                className="relative rounded-2xl overflow-hidden bg-zinc-100 dark:bg-[#08090d] border border-zinc-200/60 dark:border-white/[0.06] min-h-[260px] sm:min-h-[400px] lg:min-h-[460px] flex items-center justify-center select-none group"
                onClick={handleImageClick}
              >
                <AnimatePresence custom={direction} mode="wait">
                  <motion.img
                    key={currentStage.src}
                    src={currentStage.src}
                    alt={currentStage.title}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    draggable="false"
                    className="w-full h-auto max-h-[540px] object-contain rounded-xl shadow-md pointer-events-none select-none"
                  />
                </AnimatePresence>

                {/* Hover zoom pill (only visible on hover, does not interfere with drag) */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs sm:text-sm font-semibold rounded-xl backdrop-blur-xs pointer-events-none">
                  <div className="px-4 py-2 rounded-full bg-zinc-900/90 border border-zinc-700 flex items-center gap-2 shadow-xl">
                    <Maximize2 className="w-4 h-4 text-emerald-400" />
                    <span>{t?.software?.zoomLightbox || "To'liq hajmda ko'rish"}</span>
                  </div>
                </div>
              </div>

              {/* Canvas Footer specs */}
              <div className="mt-3 px-3 py-2 rounded-xl bg-zinc-50 dark:bg-[#141620]/80 border border-zinc-200/50 dark:border-white/[0.05] flex flex-wrap items-center justify-between gap-2 text-xs select-none">
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
