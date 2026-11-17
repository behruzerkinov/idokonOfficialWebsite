import React from 'react';
import { Send, Phone, Monitor, GraduationCap, DatabaseBackup, Star, ArrowRight } from 'lucide-react';
import { SITE, formatPhone } from '../data/site';
import { Reveal } from './Reveal';
import { HeroBackdrop } from './HeroBackdrop';
import { ReceiptTape } from './ReceiptTape';

const FACTS = [['fact1', Monitor], ['fact2', GraduationCap], ['fact3', DatabaseBackup]];

export const Hero = ({ t, lang, onOpenDemo, onOpenLightbox }) => {
  const { rating, activeStores } = SITE.claims;
  return (
    <>
      <section id="home" className="relative isolate overflow-hidden px-3 pb-44 pt-36 text-white md:pb-64 md:pt-44">
        <HeroBackdrop />
        <Reveal className="container-page text-center">
          <h1 className="h1 hero-title mx-auto max-w-[15ch]">{t.hero.title}</h1>
          <p className="mx-auto mt-6 max-w-[46ch] text-base text-white/75 sm:text-lg">{t.hero.subtitle}</p>

          {/* Mercury-style action row: the phone number sits where the email field would be */}
          <div className="mx-auto mt-10 flex w-full max-w-md items-center gap-2 rounded-full bg-white/10 p-1.5 pl-5 ring-1 ring-white/15 backdrop-blur-md">
            <a href={`tel:${SITE.phones[0]}`} className="flex min-h-[44px] flex-1 items-center gap-2 whitespace-nowrap text-left text-[13px] text-white/85 sm:text-sm">
              <Phone size={18} strokeWidth={1.75} aria-hidden="true" />{formatPhone(SITE.phones[0])}
            </a>
            <button type="button" onClick={onOpenDemo} className="inline-flex h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-white px-4 text-sm font-medium text-black transition-transform duration-150 active:scale-[0.97]">
              {t.hero.ctaPrimary}<ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>
          <a href={SITE.telegram} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-white/70 transition-colors duration-150 hover:text-white">
            <Send size={18} strokeWidth={1.75} aria-hidden="true" />{t.hero.ctaSecondary}
          </a>
        </Reveal>
      </section>

      <div className="relative z-10 mx-auto -mt-36 max-w-[1240px] px-3 md:-mt-52">
        <div className="relative mx-auto max-w-5xl">
        <button
          type="button" onClick={() => onOpenLightbox('/screenshots/kassa.webp', t.hero.imageAlt)} aria-label={t.software.zoom}
          className="block w-full overflow-hidden rounded-3xl bg-white p-2 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.55)] ring-1 ring-black/10"
        >
          <img src="/screenshots/kassa.webp" alt={t.hero.imageAlt} width="1359" height="716" fetchpriority="high" decoding="async" className="h-auto w-full rounded-2xl" />
        </button>
        {/* Signature receipt: overlaps the screen on wide viewports, sits under it on phones */}
        <ReceiptTape t={t} lang={lang} className="mx-auto mt-6 lg:absolute lg:right-2 xl:-right-10 lg:bottom-10 lg:mt-0 lg:rotate-[2.5deg]" />
        </div>
        <p className="mx-auto mt-6 max-w-md text-center text-sm" style={{ color: 'var(--muted)' }}>{t.hero.caption}</p>
        {rating.verified && (
          <p className="mt-3 flex items-center justify-center gap-2 text-sm">
            <Star size={18} strokeWidth={1.75} className="fill-amber-400 text-amber-400" aria-hidden="true" />
            <span className="font-semibold">{rating.value} / 5</span>
            {activeStores.verified && <span style={{ color: 'var(--muted)' }}>· {activeStores.value} {t.hero.storesLabel}</span>}
          </p>
        )}
        <ul className="mx-auto mt-8 flex max-w-3xl flex-col items-center justify-center gap-x-10 gap-y-3 text-sm sm:flex-row" style={{ color: 'var(--muted)' }}>
          {FACTS.map(([k, Icon]) => (
            <li key={k} className="flex items-center gap-2.5">
              <Icon size={20} strokeWidth={1.75} className="shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              {t.hero[k]}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
