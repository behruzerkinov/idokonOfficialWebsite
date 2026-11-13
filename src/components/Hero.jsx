import React from 'react';
import { 
  ArrowRight, ShieldCheck, Zap, Headphones, Star, 
  Sparkles, Laptop, Maximize2 
} from 'lucide-react';

export const Hero = ({ t, onOpenDemo, onScrollToTerminal, onOpenLightbox }) => {
  return (
    <section id="home" className="relative pt-10 pb-14 sm:pt-14 sm:pb-16 lg:pt-16 lg:pb-20 overflow-hidden bg-transparent text-zinc-900 dark:text-zinc-100 transition-colors">
      {/* Gentle ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Top Eyebrow Pill with Live Indicator */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-medium tracking-tight mb-6 backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{t.hero.eyebrow}</span>
            </div>

            {/* Main Monumental Headline */}
            <h1 className="font-sans text-4xl sm:text-6xl lg:text-[70px] font-semibold tracking-[-0.035em] text-[#1d1d1f] dark:text-[#f5f5f7] leading-[1.08] mb-6 [text-wrap:balance]">
              {t.hero.titleStart}{' '}
              <span className="px-3.5 py-0.5 rounded-2xl bg-emerald-600 text-white font-semibold inline-block shadow-xs">
                {t.hero.titleHighlight}
              </span>{' '}
              {t.hero.titleEnd}
            </h1>

            {/* Subhead */}
            <p className="font-sans text-base sm:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-[62ch] mb-8 font-normal">
              {t.hero.subtitle}
            </p>

            {/* CTA Buttons - Twain AI Pill styling */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mb-10">
              <button
                type="button"
                onClick={onOpenDemo}
                className="relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-500/15 transition-all duration-200 active:scale-95 group cursor-pointer"
              >
                <span>{t.hero.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                type="button"
                onClick={onScrollToTerminal}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-900/90 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 transition-all duration-200 active:scale-95 cursor-pointer shadow-sm"
              >
                <span>{t.hero.ctaSecondary}</span>
                <ArrowRight className="w-4 h-4 text-emerald-500" />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-y-3 gap-x-6 pt-6 border-t border-zinc-200/80 dark:border-zinc-800/80 text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-2">
                <Laptop className="w-4 h-4 text-emerald-500" />
                <span className="text-zinc-700 dark:text-zinc-300">{t.hero.meta1}</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-500" />
                <span className="text-zinc-700 dark:text-zinc-300">{t.hero.meta2}</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
              <div className="flex items-center gap-2">
                <Headphones className="w-4 h-4 text-emerald-500" />
                <span className="text-zinc-700 dark:text-zinc-300">{t.hero.meta3}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Real Software Screenshot Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Apple macOS Window Frame */}
              <div className="relative rounded-3xl p-2 bg-white/90 dark:bg-[#161617]/90 border border-black/[0.08] dark:border-white/[0.1] shadow-2xl overflow-hidden backdrop-blur-2xl">
                
                {/* Window header */}
                <div className="flex items-center justify-between px-3.5 py-2.5 bg-zinc-100/80 dark:bg-zinc-950/80 rounded-t-2xl border-b border-black/[0.05] dark:border-white/[0.06]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>idokon.uz · Admin Panel</span>
                  </div>
                </div>

                {/* REAL I-DO'KON APP SCREENSHOT */}
                <div 
                  className="relative rounded-b-xl overflow-hidden bg-zinc-100 dark:bg-zinc-950 cursor-pointer group"
                  onClick={() => onOpenLightbox && onOpenLightbox('/screenshots/showcase_savdo.png', "IDO'KON Savdo Hisoboti")}
                >
                  <img
                    src="/screenshots/showcase_savdo.png"
                    alt="IDO'KON dasturi real skrinshoti"
                    className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-200"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-semibold text-xs backdrop-blur-xs">
                    <Maximize2 className="w-4 h-4 text-emerald-400" />
                    <span>{t.hero.zoom || "Kattalashtirish"}</span>
                  </div>
                </div>

              </div>

              {/* Floating Customer Rating Badge: Zero overlap, positioned cleanly */}
              <div className="absolute -bottom-5 -left-4 sm:-left-5 bg-white dark:bg-zinc-900 rounded-xl p-3 shadow-lg flex items-center gap-3 z-20 border border-zinc-200 dark:border-zinc-800">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-base flex-shrink-0">
                  <Star className="w-5 h-5 fill-emerald-500 text-emerald-500" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-zinc-900 dark:text-zinc-100 text-sm leading-none">{t.hero.badgeScore}</span>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">{t.hero.badgeReviews}</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
