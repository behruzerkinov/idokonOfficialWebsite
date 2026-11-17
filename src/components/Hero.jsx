import React from 'react';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { m, useScroll, useSpring, useTransform } from 'motion/react';
import { SITE } from '../data/site';
import { Reveal } from './Reveal';

const WINDOW_DOTS = ['#ff5f56', '#ffbd2e', '#27c93f'];

export const Hero = ({ t, onOpenDemo, onOpenLightbox }) => {
  // Macro: the product window drifts up slower than the page, the chips drift faster
  const { scrollY } = useScroll();
  const win = useSpring(useTransform(scrollY, [0, 700], [0, -36]), { stiffness: 120, damping: 24 });
  const chip = useSpring(useTransform(scrollY, [0, 700], [0, -80]), { stiffness: 120, damping: 24 });
  const h = t.hero;
  const { rating, reviews, setupMinutes, support } = SITE.claims;
  const meta = [h.meta1, setupMinutes.verified && h.meta2, support.verified && h.meta3].filter(Boolean);
  return (
    <section id="home" className="relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-36">
      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <Reveal>
          <span className="eyebrow">{h.eyebrow}</span>
          <h1 className="display mt-6 max-w-[13ch]">
            {h.titleStart} <span className="grad-text">{h.titleHighlight}</span> {h.titleEnd}
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

        <Reveal className="relative mx-auto w-full max-w-[620px] pb-10 pr-0 sm:pr-8" delay={0.12}>
          <m.div style={{ y: win }}>
          <div className="spot tilt relative rounded-3xl p-1.5" style={{ background: 'var(--surface)', boxShadow: 'var(--ring), var(--shadow-pop)' }}>
            <div className="flex items-center gap-3 px-3 py-2.5">
              <span className="flex gap-1.5" aria-hidden="true">{WINDOW_DOTS.map((c) => <i key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />)}</span>
              <span className="text-[11px] font-bold tracking-[0.12em]" style={{ color: 'var(--muted)' }}>{h.windowTitle}</span>
            </div>
            <button type="button" onClick={() => onOpenLightbox('/screenshots/kassa.webp', h.imageAlt)} aria-label={h.zoom} className="block w-full overflow-hidden rounded-2xl">
              <img src="/screenshots/kassa.webp" alt={h.imageAlt} width="1359" height="716" fetchpriority="high" decoding="async" className="h-auto w-full" />
            </button>
          </div>
          </m.div>
          <m.div style={{ y: chip }} className="absolute -top-3 left-3 sm:left-0">
            <div className="float inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-bold" style={{ background: 'var(--surface)', boxShadow: 'var(--ring)' }}>
              <span className="ping" aria-hidden="true" />{h.liveStatus}
            </div>
          </m.div>
          {rating.verified && (
            <m.div style={{ y: chip }} className="absolute bottom-0 right-0">
            <div className="float w-52 rounded-3xl p-5 text-white" style={{ background: 'var(--deep-2)', boxShadow: 'var(--shadow-pop)', animationDelay: '-3s' }}>
              <p className="text-xs font-medium" style={{ color: 'var(--on-deep-muted)' }}>{h.ratingLabel}</p>
              <p className="mt-1 text-3xl font-bold tracking-tight">{rating.value} / 5</p>
              {reviews.verified && <p className="mt-1 text-xs font-semibold" style={{ color: 'var(--accent-bright)' }}>{h.ratingBasis.replace('{n}', reviews.value)}</p>}
            </div>
            </m.div>
          )}
        </Reveal>
      </div>
    </section>
  );
};
