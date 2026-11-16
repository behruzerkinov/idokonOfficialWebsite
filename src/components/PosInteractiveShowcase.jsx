import React, { useRef, useState } from 'react';
import { Check, Maximize2 } from 'lucide-react';
import { SectionHead } from './SectionHead';

const TABS = [
  { id: 'sales', src: '/screenshots/showcase_savdo.webp', w: 1353, h: 756 },
  { id: 'inventory', src: '/screenshots/showcase_ombor.webp', w: 1359, h: 757 },
  { id: 'analytics', src: '/screenshots/showcase_analitika.webp', w: 1347, h: 749 },
  { id: 'cashiers', src: '/screenshots/showcase_kassirlar.webp', w: 1359, h: 716 },
];

export const PosInteractiveShowcase = ({ t, onOpenLightbox }) => {
  const [i, setI] = useState(0);
  const refs = useRef([]);
  const touchX = useRef(null);
  const tab = TABS[i];
  const s = t.software.screens[tab.id];

  const select = (n, focus) => {
    const k = (n + TABS.length) % TABS.length;
    setI(k);
    if (focus) refs.current[k]?.focus();
  };
  const onKey = (e) => {
    const map = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: TABS.length - 1 };
    if (e.key in map) { e.preventDefault(); select(map[e.key], true); }
  };
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50) select(i + (dx < 0 ? 1 : -1));
  };

  return (
    <section id="features" className="section scroll-mt-16">
      <div className="container-page">
        <SectionHead title={t.software.title} lead={t.software.lead} />

        <div role="tablist" aria-label={t.software.tablist} onKeyDown={onKey} className="hide-scrollbar segmented mx-auto mb-10 flex max-w-full overflow-x-auto md:w-fit">
          {TABS.map((x, n) => (
            <button
              key={x.id} ref={(el) => (refs.current[n] = el)} role="tab" id={`tab-${x.id}`} type="button"
              aria-selected={i === n} aria-controls={`panel-${x.id}`} tabIndex={i === n ? 0 : -1}
              onClick={() => select(n)}
              className="seg-btn min-h-[44px] !px-5"
            >
              {t.software.tabs[x.id]}
            </button>
          ))}
        </div>

        <div
          role="tabpanel" id={`panel-${tab.id}`} aria-labelledby={`tab-${tab.id}`}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)} onTouchEnd={onTouchEnd}
          className="grid items-center gap-8 lg:grid-cols-[2fr_3fr] lg:gap-12"
        >
          <div>
            <h3 className="text-2xl font-semibold leading-snug">{s.title}</h3>
            <ul className="mt-5 space-y-3">
              {['b1', 'b2', 'b3'].map((b) => (
                <li key={b} className="flex gap-3">
                  <Check size={20} strokeWidth={1.75} className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                  <span>{s[b]}</span>
                </li>
              ))}
            </ul>
          </div>
          <button
            type="button" onClick={() => onOpenLightbox(tab.src, s.title)} aria-label={t.software.zoom}
            className="group relative block overflow-hidden rounded-2xl bg-white p-1.5" style={{ boxShadow: 'var(--ring), var(--shadow-pop)' }}
          >
            <img src={tab.src} alt={s.title} width={tab.w} height={tab.h} loading="lazy" decoding="async" className="h-auto w-full rounded-xl" />
            <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg bg-black/70 px-2.5 py-1.5 text-xs text-white">
              <Maximize2 size={16} strokeWidth={1.75} aria-hidden="true" />{t.software.zoom}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
