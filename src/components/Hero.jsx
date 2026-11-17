import React from 'react';
import { Send, Phone, Monitor, GraduationCap, DatabaseBackup, Star } from 'lucide-react';
import { SITE, formatPhone } from '../data/site';
import { Reveal } from './Reveal';
import { ReceiptTape } from './ReceiptTape';

const FACTS = [['fact1', Monitor], ['fact2', GraduationCap], ['fact3', DatabaseBackup]];

export const Hero = ({ t, lang, onOpenDemo, onOpenLightbox }) => {
  const { rating, activeStores } = SITE.claims;
  return (
    <>
      <section id="home" className="relative px-3 pb-10 pt-28 md:pt-32">
        <Reveal className="container-page text-center">
          <img src={SITE.brand.heroImage} alt="" width="757" height="558" fetchpriority="high" decoding="async" className="doodle doodle-float mx-auto h-auto w-[220px] sm:w-[280px]" />
          <h1 className="h1 mx-auto mt-4 max-w-[16ch]">{t.hero.title}</h1>
          <p className="lede mx-auto mt-5 max-w-[46ch]">{t.hero.subtitle}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button type="button" onClick={onOpenDemo} className="btn-dark !px-6">{t.hero.ctaPrimary}</button>
            <a href={`tel:${SITE.phones[0]}`} className="btn-secondary !px-5">
              <Phone size={18} strokeWidth={1.75} aria-hidden="true" />{formatPhone(SITE.phones[0])}
            </a>
          </div>
          <a href={SITE.telegram} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium" style={{ color: 'var(--muted)' }}>
            <Send size={18} strokeWidth={1.75} aria-hidden="true" />{t.hero.ctaSecondary}
          </a>
        </Reveal>
      </section>

      <div className="relative mx-auto max-w-[1240px] px-3">
        <div className="relative mx-auto max-w-5xl">
          <button
            type="button" onClick={() => onOpenLightbox('/screenshots/kassa.webp', t.hero.imageAlt)} aria-label={t.software.zoom}
            className="block w-full overflow-hidden rounded-2xl p-2" style={{ background: 'var(--stage)', boxShadow: 'var(--ring), var(--shadow-pop)' }}
          >
            <img src="/screenshots/kassa.webp" alt={t.hero.imageAlt} width="1359" height="716" fetchpriority="high" decoding="async" className="h-auto w-full rounded-xl" />
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
