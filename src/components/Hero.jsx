import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Laptop, Zap, Headphones, Star, Maximize2 } from 'lucide-react';
import { EASE_OUT } from './Reveal';

// Above-the-fold entrances use initial/animate (not whileInView) so the hero is never hidden on first paint.
const rise = (delay = 0, y = 18) => ({
  initial: { opacity: 0, y, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 1, ease: EASE_OUT, delay },
});

const WINDOW_DOTS = ['bg-[#ff5f56]', 'bg-[#ffbd2e]', 'bg-[#27c93f]'];
const SCREENSHOT = { src: '/screenshots/showcase_savdo.webp', width: 1353, height: 756 };

const toWords = (text, accent = false) =>
  String(text ?? '').split(' ').filter(Boolean).map((word) => ({ word, accent }));

export const Hero = ({ t, onOpenDemo, onScrollToTerminal, onOpenLightbox }) => {
  const titleWords = [
    ...toWords(t.hero.titleStart),
    ...toWords(t.hero.titleHighlight, true),
    ...toWords(t.hero.titleEnd),
  ];
  const trustItems = [
    { icon: Laptop, label: t.hero.meta1 },
    { icon: Zap, label: t.hero.meta2 },
    { icon: Headphones, label: t.hero.meta3 },
  ];

  return (
    <section id="home" className="relative overflow-hidden pt-20 pb-14 sm:pt-24 sm:pb-16 lg:pt-28 lg:pb-20 text-zinc-900 dark:text-zinc-100">
      <div className="container-page relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">

          {/* Left column: headline and calls to action */}
          <div className="flex flex-col items-start text-left lg:col-span-7">

            <motion.div
              {...rise(0)}
              className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-medium tracking-tight text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              <span>{t.hero.eyebrow}</span>
            </motion.div>

            <motion.h1 className="display-lg mb-6 text-zinc-950 [text-wrap:balance] dark:text-zinc-50">
              {titleWords.map(({ word, accent }, i) => (
                <React.Fragment key={i}>
                  {i > 0 && ' '}
                  <motion.span
                    initial={{ opacity: 0, y: '0.5em', filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.1 + i * 0.06 }}
                    className={`inline-block ${accent ? 'text-emerald-600 dark:text-emerald-400' : ''}`}
                  >
                    {word}
                  </motion.span>
                </React.Fragment>
              ))}
            </motion.h1>

            <motion.p {...rise(0.55)} className="lede mb-8 max-w-[62ch]">
              {t.hero.subtitle}
            </motion.p>

            <motion.div
              {...rise(0.7, 12)}
              className="mb-10 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center"
            >
              <button type="button" onClick={onOpenDemo} className="btn-primary hover:-translate-y-0.5">
                <span>{t.hero.ctaPrimary}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button type="button" onClick={onScrollToTerminal} className="btn-secondary hover:-translate-y-0.5">
                <span>{t.hero.ctaSecondary}</span>
                <ArrowRight className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </button>
            </motion.div>

            <motion.ul
              {...rise(0.8, 12)}
              className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-zinc-200 pt-6 text-xs font-medium text-zinc-500 sm:text-sm dark:border-zinc-800 dark:text-zinc-400"
            >
              {trustItems.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-zinc-700 dark:text-zinc-300">{label}</span>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Right column: real software screenshot */}
          <motion.div
            {...rise(0.9, 32)}
            className="relative mx-auto max-w-lg lg:col-span-5 lg:max-w-none"
          >
            <div className="rounded-2xl border border-zinc-200 bg-white p-2 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center justify-between rounded-t-xl border-b border-zinc-200 bg-zinc-100 px-3.5 py-2.5 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="flex items-center gap-1.5">
                  {WINDOW_DOTS.map((color) => (
                    <span key={color} className={`h-2.5 w-2.5 rounded-full ${color}`} />
                  ))}
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>idokon.uz · Admin Panel</span>
                </div>
              </div>

              <div
                className="group relative cursor-pointer overflow-hidden rounded-b-xl bg-zinc-100 dark:bg-zinc-950"
                onClick={() => onOpenLightbox && onOpenLightbox(SCREENSHOT.src, "IDO'KON Savdo Hisoboti")}
              >
                <img
                  src={SCREENSHOT.src}
                  width={SCREENSHOT.width}
                  height={SCREENSHOT.height}
                  alt="IDO'KON dasturi real skrinshoti"
                  className="block h-auto w-full"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 text-xs font-semibold text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <Maximize2 className="h-4 w-4 text-emerald-400" />
                  <span>{t.hero.zoom || 'Kattalashtirish'}</span>
                </div>
              </div>
            </div>

            {/* Floating rating badge */}
            <div className="absolute -bottom-5 -left-4 z-20 flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-3 shadow-lg sm:-left-5 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500/15">
                <Star className="h-5 w-5 fill-emerald-500 text-emerald-500" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold leading-none text-zinc-900 dark:text-zinc-100">{t.hero.badgeScore}</span>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <div className="mt-0.5 text-[11px] font-medium text-zinc-500 dark:text-zinc-400">{t.hero.badgeReviews}</div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
