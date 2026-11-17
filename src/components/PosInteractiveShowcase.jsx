import React, { useRef, useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { Reveal } from './Reveal';

const TABS = [
  { id: 'order', src: '/screenshots/kassa.webp', w: 1359, h: 716 },
  { id: 'sales', src: '/screenshots/showcase_savdo.webp', w: 1353, h: 756 },
  { id: 'inventory', src: '/screenshots/showcase_ombor.webp', w: 1359, h: 757 },
  { id: 'analytics', src: '/screenshots/showcase_analitika.webp', w: 1347, h: 749 },
];

/** Dark section: a window with four screens on the left, four numbered points on the right. */
export const PosInteractiveShowcase = ({ t, onOpenLightbox }) => {
  const s = t.software;
  const [i, setI] = useState(0);
  const refs = useRef([]);
  const touchX = useRef(null);
  const tab = TABS[i];

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
    <section id="software" className="section scroll-mt-16" style={{ background: 'var(--deep)', color: 'var(--on-deep)' }}>
      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <div className="spot overflow-hidden rounded-2xl p-1.5" style={{ background: 'var(--deep-2)', boxShadow: '0 0 0 1px rgba(255,255,255,0.08), var(--shadow-pop)' }}>
            <p className="px-3 py-2.5 text-[11px] font-bold tracking-[0.12em]" style={{ color: 'var(--on-deep-muted)' }}>{s.orderLabel}</p>
            <div role="tabpanel" id={`panel-${tab.id}`} aria-labelledby={`tab-${tab.id}`} onTouchStart={(e) => (touchX.current = e.touches[0].clientX)} onTouchEnd={onTouchEnd}>
              <button type="button" onClick={() => onOpenLightbox(tab.src, s.tabs[tab.id])} aria-label={s.zoom} className="group relative block w-full overflow-hidden rounded-xl bg-white">
                <img src={tab.src} alt={s.tabs[tab.id]} width={tab.w} height={tab.h} loading="lazy" decoding="async" className="h-auto w-full" />
                <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg bg-black/70 px-2.5 py-1.5 text-xs text-white">
                  <Maximize2 size={14} strokeWidth={1.75} aria-hidden="true" />{s.zoom}
                </span>
              </button>
            </div>
          </div>
          <div role="tablist" aria-label={s.tablist} onKeyDown={onKey} className="mt-4 grid grid-cols-4 gap-2">
            {TABS.map((x, n) => (
              <button
                key={x.id} ref={(el) => (refs.current[n] = el)} role="tab" id={`tab-${x.id}`} type="button"
                aria-selected={i === n} aria-controls={`panel-${x.id}`} tabIndex={i === n ? 0 : -1} onClick={() => select(n)}
                className="min-h-[48px] rounded-xl px-2 text-sm font-semibold transition-colors duration-150"
                style={i === n ? { background: 'var(--accent-bright)', color: '#052e22' } : { background: 'rgba(255,255,255,0.06)', color: 'var(--on-deep)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)' }}
              >
                {s.tabs[x.id]}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal className="order-1 lg:order-2">
          <span className="eyebrow" style={{ color: 'var(--accent-bright)' }}>{s.eyebrow}</span>
          <h2 className="h2 mt-5">{s.title}</h2>
          <p className="mt-5 max-w-[48ch] text-base sm:text-lg" style={{ color: 'var(--on-deep-muted)' }}>{s.lead}</p>
          <ol className="mt-8">
            {[1, 2, 3, 4].map((n) => (
              <li key={n} className="border-t py-5" style={{ borderColor: 'rgba(255,255,255,0.12)' }}>
                <div className="flex gap-5">
                  <span className="pt-0.5 text-xs font-bold" style={{ color: 'var(--accent-bright)' }}>0{n}</span>
                  <div>
                    <h3 className="font-bold">{s[`p${n}_title`]}</h3>
                    <p className="mt-1 text-sm" style={{ color: 'var(--on-deep-muted)' }}>{s[`p${n}_desc`]}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
};
