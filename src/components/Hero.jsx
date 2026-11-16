import React from 'react';
import { Send, Monitor, GraduationCap, DatabaseBackup, Star } from 'lucide-react';
import { SITE } from '../data/site';
import { Reveal } from './Reveal';

const FACTS = [['fact1', Monitor], ['fact2', GraduationCap], ['fact3', DatabaseBackup]];

export const Hero = ({ t, onOpenDemo, onOpenLightbox }) => {
  const { rating, activeStores } = SITE.claims;
  return (
    <section id="home" className="section hero-glow pt-28 md:pt-36">
      <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <Reveal>
          <h1 className="h1">{t.hero.title}</h1>
          <p className="lede mt-5 max-w-[52ch]">{t.hero.subtitle}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={onOpenDemo} className="btn-primary px-6">{t.hero.ctaPrimary}</button>
            <a href={SITE.telegram} target="_blank" rel="noopener noreferrer" className="btn-secondary px-6">
              <Send size={20} strokeWidth={1.75} aria-hidden="true" />{t.hero.ctaSecondary}
            </a>
          </div>
          <ul className="mt-8 flex flex-wrap gap-2 text-sm">
            {FACTS.map(([k, Icon]) => (
              <li key={k} className="pill">
                <Icon size={18} strokeWidth={1.75} className="shrink-0" aria-hidden="true" />
                <span>{t.hero[k]}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="relative">
          <button
            type="button" onClick={() => onOpenLightbox('/screenshots/kassa.webp', t.hero.imageAlt)}
            className="block w-full overflow-hidden rounded-2xl bg-white p-1.5" style={{ boxShadow: 'var(--ring), var(--shadow-pop)' }}
            aria-label={t.software.zoom}
          >
            <img src="/screenshots/kassa.webp" alt={t.hero.imageAlt} width="1359" height="716" fetchpriority="high" decoding="async" className="h-auto w-full rounded-xl" />
          </button>
          {rating.verified && (
            <div className="card absolute -bottom-5 left-4 flex items-center gap-2 px-3 py-2 text-sm">
              <Star size={20} strokeWidth={1.75} className="fill-amber-400 text-amber-400" aria-hidden="true" />
              <span className="font-semibold">{rating.value} / 5</span>
              {activeStores.verified && <span style={{ color: 'var(--muted)' }}>· {activeStores.value} {t.hero.storesLabel}</span>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
