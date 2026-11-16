import React from 'react';
import { Send, Monitor, GraduationCap, DatabaseBackup, Star, ArrowRight } from 'lucide-react';
import { SITE } from '../data/site';
import { Reveal } from './Reveal';
import { HeroBackdrop } from './HeroBackdrop';

const FACTS = [['fact1', Monitor], ['fact2', GraduationCap], ['fact3', DatabaseBackup]];

export const Hero = ({ t, onOpenDemo, onOpenLightbox }) => {
  const { rating, activeStores } = SITE.claims;
  return (
    <section id="home" className="relative isolate px-3 pb-6 pt-36 md:pt-44">
      <HeroBackdrop />
      <Reveal className="container-page text-center">
        <img src="/favicon.svg" alt="" width="72" height="72" className="mx-auto h-[72px] w-[72px] rounded-[20px] shadow-[0_12px_30px_-12px_rgba(0,0,0,0.4)]" />
        <h1 className="h1 mx-auto mt-8 max-w-[14ch]">{t.hero.title}</h1>
        <p className="lede mx-auto mt-5 max-w-[46ch]">{t.hero.subtitle}</p>

        <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <button type="button" onClick={onOpenDemo} className="group inline-flex h-12 items-center gap-3 rounded-full bg-black pl-6 pr-1.5 text-sm font-medium text-white transition-transform duration-150 active:scale-[0.97] dark:bg-white dark:text-black">
            {t.hero.ctaPrimary}
            <span className="flex h-9 items-center gap-1 rounded-full bg-emerald-600 px-3 text-white"><ArrowRight size={18} strokeWidth={1.75} /></span>
          </button>
          <a href={SITE.telegram} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-[var(--muted)] transition-colors duration-150 hover:text-[var(--fg)]">
            <Send size={18} strokeWidth={1.75} aria-hidden="true" />{t.hero.ctaSecondary}
          </a>
        </div>
      </Reveal>

      <div className="mx-auto mt-14 max-w-[1240px] md:mt-20">
        <div className="stage relative">
          <button
            type="button" onClick={() => onOpenLightbox('/screenshots/kassa.webp', t.hero.imageAlt)} aria-label={t.software.zoom}
            className="mx-auto block w-full max-w-4xl overflow-hidden rounded-2xl bg-white p-1.5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)]"
          >
            <img src="/screenshots/kassa.webp" alt={t.hero.imageAlt} width="1359" height="716" fetchpriority="high" decoding="async" className="h-auto w-full rounded-xl" />
          </button>
          <p className="mx-auto mt-6 max-w-md text-center text-sm" style={{ color: 'var(--muted)' }}>{t.hero.caption}</p>
          {rating.verified && (
            <p className="mt-3 flex items-center justify-center gap-2 text-sm">
              <Star size={18} strokeWidth={1.75} className="fill-amber-400 text-amber-400" aria-hidden="true" />
              <span className="font-semibold">{rating.value} / 5</span>
              {activeStores.verified && <span style={{ color: 'var(--muted)' }}>· {activeStores.value} {t.hero.storesLabel}</span>}
            </p>
          )}
        </div>
        <ul className="mx-auto mt-8 flex max-w-3xl flex-col items-center justify-center gap-x-10 gap-y-3 text-sm sm:flex-row" style={{ color: 'var(--muted)' }}>
          {FACTS.map(([k, Icon]) => (
            <li key={k} className="flex items-center gap-2.5">
              <Icon size={20} strokeWidth={1.75} className="shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              {t.hero[k]}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
