import React from 'react';
import { Check, Maximize2 } from 'lucide-react';
import { SectionHead } from './SectionHead';
import { Reveal } from './Reveal';

const SCREENS = [
  { id: 'sales', src: '/screenshots/showcase_savdo.webp', w: 1353, h: 756 },
  { id: 'inventory', src: '/screenshots/showcase_ombor.webp', w: 1359, h: 757 },
  { id: 'analytics', src: '/screenshots/showcase_analitika.webp', w: 1347, h: 749 },
  { id: 'cashiers', src: '/screenshots/showcase_kassirlar.webp', w: 1359, h: 716 },
];

/** Product first: each benefit is a headline next to the real screen, alternating sides. */
export const PosInteractiveShowcase = ({ t, onOpenLightbox }) => (
  <section id="features" className="section scroll-mt-16">
    <div className="container-page">
      <SectionHead title={t.software.title} lead={t.software.lead} />
      <div className="space-y-20 md:space-y-32">
        {SCREENS.map((x, n) => {
          const s = t.software.screens[x.id];
          return (
            <Reveal key={x.id} className="grid items-center gap-8 lg:grid-cols-[2fr_3fr] lg:gap-16">
              <div className={n % 2 ? 'lg:order-2' : ''}>
                <p className="text-sm font-medium text-[var(--accent)]">{t.software.tabs[x.id]}</p>
                <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-tight md:text-3xl">{s.title}</h3>
                <ul className="mt-6 space-y-3">
                  {['b1', 'b2', 'b3'].map((b) => (
                    <li key={b} className="flex gap-3">
                      <Check size={20} strokeWidth={1.75} className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                      <span style={{ color: 'var(--muted)' }}>{s[b]}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                type="button" onClick={() => onOpenLightbox(x.src, s.title)} aria-label={t.software.zoom}
                className="stage group relative block !p-3 md:!p-6"
              >
                <img src={x.src} alt={s.title} width={x.w} height={x.h} loading="lazy" decoding="async" className="h-auto w-full rounded-xl shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)]" />
                <span className="absolute bottom-5 right-5 flex items-center gap-1.5 rounded-lg bg-black/70 px-2.5 py-1.5 text-xs text-white md:bottom-9 md:right-9">
                  <Maximize2 size={16} strokeWidth={1.75} aria-hidden="true" />{t.software.zoom}
                </span>
              </button>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);
