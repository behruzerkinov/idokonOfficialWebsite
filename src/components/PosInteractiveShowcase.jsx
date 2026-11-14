import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, Sparkles, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';
import { Reveal, EASE_OUT } from './Reveal';

const ARROW_BUTTON = 'inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition-[transform,background-color,color] duration-200 hover:-translate-y-0.5 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800';

// Directional slide for both copy and screenshot. Enter is a slow ease-out; exit is quick so the swap stays snappy.
const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 24 : -24, opacity: 0, filter: 'blur(3px)' }),
  center: { x: 0, opacity: 1, filter: 'blur(0px)', transition: { duration: 0.6, ease: EASE_OUT } },
  exit: (dir) => ({
    x: dir > 0 ? -24 : 24,
    opacity: 0,
    filter: 'blur(3px)',
    transition: { duration: 0.25, ease: 'easeIn' },
  }),
};

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
      tag: t?.software?.screens?.inventory?.badge || 'Shtrix-kod & Qoldiq',
      eyebrow: '01 / OMBOR VA TAHLIL',
      title: t?.software?.screens?.inventory?.label || 'Ombor qoldiqlari va tovarlar hisobi',
      desc: t?.software?.screens?.inventory?.desc || "Qoldiqlar hisoboti, mahsulot shtrix-kodi, partiyalar qoldig'i va minimal zaxira ogohlantirishi.",
      stats: '100% SKU aniqligi · Avto-ogohlantirish',
      src: '/screenshots/showcase_ombor.webp',
      width: 1359,
      height: 757,
    },
    {
      id: 'kassa',
      tag: t?.software?.screens?.kassa?.badge || '0.8 sek tezlik',
      eyebrow: '02 / TEZKOR POS TERMINAL',
      title: t?.software?.screens?.kassa?.label || "Kassirlar Ish O'rni (POS Terminal)",
      desc: t?.software?.screens?.kassa?.desc || "Kassirlar uchun maxsus interfeys: tezkor qidiruv, shtrix-kod skanerlash, smena yopish va naqd/karta to'lov.",
      stats: '0.8 soniya tranzaksiya · Oflayn rejim',
      src: '/screenshots/showcase_kassirlar.webp',
      width: 1359,
      height: 716,
    },
    {
      id: 'analytics',
      tag: t?.software?.screens?.analytics?.badge || 'Foyda & Daromad',
      eyebrow: '03 / MOLIYAVIY INTELLEKT',
      title: t?.software?.screens?.analytics?.label || 'ABC Tahlil va rentabellik hisoboti',
      desc: t?.software?.screens?.analytics?.desc || "ABC tahlili, tovar sotuv summasi, sof daromad, muzlatilgan mablag' va marja toifalari.",
      stats: 'ABC tahlili · Sof marja tahlili',
      src: '/screenshots/showcase_analitika.webp',
      width: 1347,
      height: 749,
    },
    {
      id: 'sales',
      tag: t?.software?.screens?.sales?.badge || 'Real-vaqt hisobot',
      eyebrow: '04 / SAVDO VA EKOTIZIM',
      title: t?.software?.screens?.sales?.label || 'Savdo hisoboti va cheklar monitoringi',
      desc: t?.software?.screens?.sales?.desc || 'Kunlik va oylik savdo hisoboti, tovarlar, kassirlar, Excel eksport va grafik tahlili bitta ekranda.',
      stats: '100% Soliq integratsiyasi · Excel / 1C',
      src: '/screenshots/showcase_savdo.webp',
      width: 1353,
      height: 756,
    },
  ];

  const currentStage = stages[activeStep] || stages[0];

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setActiveStep((prev) => {
      if (newDirection > 0) {
        return (prev + 1) % stages.length;
      }
      return (prev - 1 + stages.length) % stages.length;
    });
  };

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

  // 2. Desktop Mouse Click-and-Drag
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

  const zoomLabel = t?.software?.zoomLightbox || "To'liq hajmda ko'rish";

  return (
    <section
      id="terminal"
      className="relative scroll-mt-20 touch-pan-y border-b border-zinc-200/80 py-14 sm:py-16 lg:py-20 dark:border-zinc-800/80"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onWheel={handleWheel}
    >
      <div className="container-page">

        {/* Section top bar */}
        <div className="mb-6 flex items-center justify-between gap-4 border-b border-zinc-200/80 pb-3 sm:mb-8 dark:border-zinc-800/80">
          <div className="eyebrow">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{t?.software?.eyebrow || 'DASTUR IMKONIYATLARI'}</span>
          </div>

          {/* Swipe / drag hint */}
          <div className="hidden select-none items-center gap-2 font-mono text-[11px] text-zinc-400 sm:flex">
            <span>Surish yoki tortish</span>
            <span className="text-zinc-300 dark:text-zinc-700">·</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">{activeStep + 1} / {stages.length}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">

          {/* Left column: copy and step controls */}
          <Reveal className="flex select-none flex-col justify-center lg:col-span-5">

            <div className="relative flex min-h-[190px] flex-col justify-center overflow-hidden border-l-2 border-emerald-500 pl-4 sm:min-h-[210px]">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={currentStage.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-3"
                >
                  <span className="inline-block font-mono text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    {currentStage.eyebrow}
                  </span>

                  <h3 className="font-sans text-2xl font-semibold leading-[1.15] tracking-[-0.03em] text-zinc-950 sm:text-3xl lg:text-[36px] dark:text-zinc-50">
                    {currentStage.title}
                  </h3>

                  <p className="max-w-[48ch] font-sans text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-300">
                    {currentStage.desc}
                  </p>

                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1 text-xs font-medium text-white">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                      <span>{currentStage.stats}</span>
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Step indicator and prev / next */}
            <div className="mt-6 flex items-center gap-3 pl-4">
              <div
                className="flex items-center gap-1.5 rounded-full border border-zinc-200/80 bg-zinc-100 p-1 dark:border-zinc-800 dark:bg-zinc-900"
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
                    className={`h-2.5 cursor-pointer rounded-full transition-[width,background-color] duration-300 ${
                      activeStep === i
                        ? 'w-9 bg-emerald-500'
                        : 'w-2.5 bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-700 dark:hover:bg-zinc-600'
                    }`}
                    aria-label={`Bosqich ${i + 1}: ${st.title}`}
                    title={st.title}
                  />
                ))}
              </div>

              <div className="ml-auto flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    paginate(-1);
                  }}
                  className={ARROW_BUTTON}
                  aria-label="Oldingi"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    paginate(1);
                  }}
                  className={ARROW_BUTTON}
                  aria-label="Keyingi"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

          </Reveal>

          {/* Right column: screenshot canvas (drag / swipe / wheel enabled) */}
          <Reveal delay={0.12} className="relative lg:col-span-7">
            <div
              className={`relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-3 shadow-lg sm:p-4 dark:border-zinc-800 dark:bg-zinc-900 ${
                isMouseDown ? 'cursor-grabbing' : 'cursor-grab'
              }`}
            >
              {/* Canvas header */}
              <div className="mb-3 flex select-none items-center justify-between rounded-xl border border-zinc-200/60 bg-zinc-100 px-3.5 py-2 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="font-mono text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    {currentStage.tag}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden font-mono text-xs text-zinc-400 sm:inline">
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
                    className="cursor-pointer rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-zinc-200 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                    title={zoomLabel}
                  >
                    <Maximize2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Screenshot viewport */}
              <div
                className="group relative flex min-h-[260px] select-none items-center justify-center overflow-hidden rounded-xl border border-zinc-200/60 bg-zinc-100 sm:min-h-[400px] lg:min-h-[460px] dark:border-zinc-800 dark:bg-zinc-950"
                onClick={handleImageClick}
              >
                <AnimatePresence custom={direction} mode="wait">
                  <motion.img
                    key={currentStage.src}
                    src={currentStage.src}
                    width={currentStage.width}
                    height={currentStage.height}
                    alt={currentStage.title}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                    className="pointer-events-none h-auto max-h-[540px] w-full select-none rounded-lg object-contain"
                  />
                </AnimatePresence>

                {/* Hover zoom hint */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <div className="flex items-center gap-2 rounded-full bg-zinc-900/90 px-4 py-2 text-xs font-semibold text-white sm:text-sm">
                    <Maximize2 className="h-4 w-4 text-emerald-400" />
                    <span>{zoomLabel}</span>
                  </div>
                </div>
              </div>

              {/* Canvas footer */}
              <div className="mt-3 flex select-none flex-wrap items-center justify-between gap-2 rounded-xl border border-zinc-200/60 bg-zinc-50 px-3 py-2 text-xs dark:border-zinc-800 dark:bg-zinc-950">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">
                  {currentStage.title}
                </span>
                <span className="font-mono text-[11px] text-zinc-400">
                  {t?.software?.platformVersion || "I-DO'KON Cloud Platform"}
                </span>
              </div>
            </div>
          </Reveal>

        </div>

      </div>
    </section>
  );
};
