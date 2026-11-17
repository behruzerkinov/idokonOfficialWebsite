import React from 'react';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { SITE } from '../data/site';
import { Reveal } from './Reveal';

const WINDOW_DOTS = ['#ff5f56', '#ffbd2e', '#27c93f'];

export const Hero = ({ t, onOpenDemo, onOpenLightbox }) => {
  const h = t.hero;
  const { rating, reviews, setupMinutes, support247 } = SITE.claims;
  const meta = [h.meta1, setupMinutes.verified && h.meta2, support247.verified && h.meta3].filter(Boolean);
  return (
    <section id="home" className="hero-wash relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-36">
      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <Reveal>
          <span className="eyebrow">{h.eyebrow}</span>
          <h1 className="display mt-6 max-w-[13ch]">
            {h.titleStart} <span style={{ color: 'var(--accent)' }}>{h.titleHighlight}</span> {h.titleEnd}
          </h1>
          <p className="lede mt-6 max-w-[48ch]">{h.subtitle}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <button type="button" onClick={onOpenDemo} className="btn-primary !px-7">{h.ctaPrimary}<ArrowRight size={18} strokeWidth={2} aria-hidden="true" /></button>
            <a href={`tel:${SITE.phones[0]}`} className="btn-outline !px-6">{h.ctaSecondary}<ArrowUpRight size={18} strokeWidth={2} aria-hidden="true" /></a>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium" style={{ color: 'var(--muted)' }}>
            {meta.map((m) => (
              <li key={m} className="flex items-center gap-2"><Check size={16} strokeWidth={2.5} style={{ color: 'var(--accent)' }} aria-hidden="true" />{m}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="relative mx-auto w-full max-w-[620px] pb-10 pr-0 sm:pr-8">
          {/* offset panel behind the window, as on the live site */}
          <div aria-hidden="true" className="absolute inset-y-8 left-8 right-0 rounded-[28px]" style={{ background: 'var(--deep)' }} />
          <div className="spot relative rounded-2xl p-1.5" style={{ background: 'var(--surface)', boxShadow: 'var(--ring), var(--shadow-pop)' }}>
            <div className="flex items-center gap-3 px-3 py-2.5">
              <span className="flex gap-1.5" aria-hidden="true">{WINDOW_DOTS.map((c) => <i key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />)}</span>
              <span className="text-[11px] font-bold tracking-[0.12em]" style={{ color: 'var(--muted)' }}>{h.windowTitle}</span>
            </div>
            <button type="button" onClick={() => onOpenLightbox('/screenshots/kassa.webp', h.imageAlt)} aria-label={h.zoom} className="block w-full overflow-hidden rounded-xl">
              <img src="/screenshots/kassa.webp" alt={h.imageAlt} width="1359" height="716" fetchpriority="high" decoding="async" className="h-auto w-full" />
            </button>
          </div>
          <div className="absolute -top-3 left-3 inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-bold sm:left-0" style={{ background: 'var(--surface)', boxShadow: 'var(--ring), var(--shadow-card)' }}>
            <span className="ping" aria-hidden="true" />{h.liveStatus}
          </div>
          {rating.verified && (
            <div className="absolute bottom-0 right-0 w-52 rounded-2xl p-5 text-white" style={{ background: 'var(--deep-2)', boxShadow: 'var(--shadow-pop)' }}>
              <p className="text-xs font-medium" style={{ color: 'var(--on-deep-muted)' }}>{h.ratingLabel}</p>
              <p className="mt-1 text-3xl font-bold tracking-tight">{rating.value} / 5</p>
              {reviews.verified && <p className="mt-1 text-xs font-semibold" style={{ color: 'var(--accent-bright)' }}>{h.ratingBasis.replace('{n}', reviews.value)}</p>}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
};
