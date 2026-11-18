import { useRef, useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { Reveal } from './Reveal';

const TABS = [
  { id: 'pos', src: '/screenshots/showcase_kassirlar.webp', w: 1359, h: 716 },
  { id: 'sales', src: '/screenshots/showcase_savdo.webp', w: 1353, h: 756 },
  { id: 'stock', src: '/screenshots/showcase_ombor.webp', w: 1359, h: 757 },
  { id: 'abc', src: '/screenshots/showcase_analitika.webp', w: 1347, h: 749 },
];

/**
 * Real admin screens with tabs. All four images stay mounted and decoded, stacked in one grid cell;
 * switching only cross-fades opacity, so the new screen is on screen the instant a tab is pressed.
 */
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
    <section id="software" className="section deep-panel" style={{ background: 'var(--deep)', color: 'var(--on-deep)' }}>
      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <div className="overflow-hidden rounded-2xl p-1.5" style={{ background: 'var(--deep-2)', boxShadow: '0 0 0 1px var(--on-deep-line), var(--shadow-pop)' }}>
            <p className="flex items-center gap-2 px-3 py-2.5 text-[11px] font-semibold tracking-[0.1em]" style={{ color: 'var(--on-deep-muted)' }} aria-live="polite">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--accent-bright)' }} aria-hidden="true" />{s.screens[tab.id]}
            </p>
            <div role="tabpanel" id={`panel-${tab.id}`} aria-labelledby={`tab-${tab.id}`} onTouchStart={(e) => (touchX.current = e.touches[0].clientX)} onTouchEnd={onTouchEnd}>
              <button type="button" onClick={() => onOpenLightbox(tab.src, s.tabs[tab.id])} aria-label={`${s.tabs[tab.id]}: ${s.zoom}`} className="relative grid w-full overflow-hidden rounded-xl bg-white">
                {TABS.map((x, n) => (
                  <img
                    key={x.id} src={x.src} alt={n === i ? s.tabs[x.id] : ''} aria-hidden={n !== i} data-active={n === i}
                    width={x.w} height={x.h} decoding="async" loading="lazy"
                    className="col-start-1 row-start-1 h-full w-full object-cover object-left-top transition-[opacity,scale] duration-500 ease-out"
                    style={{ opacity: n === i ? 1 : 0, scale: n === i ? '1' : '1.015' }}
                  />
                ))}
                <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg bg-black/70 px-2.5 py-1.5 text-xs text-white">
                  <Maximize2 size={14} strokeWidth={1.75} aria-hidden="true" />{s.zoom}
                </span>
              </button>
            </div>
          </div>
          <div role="tablist" aria-label={s.tablist} onKeyDown={onKey} className="mt-3 grid grid-cols-2 gap-1 rounded-xl p-1 sm:grid-cols-4" style={{ background: 'rgb(255 255 255 / 0.06)', boxShadow: 'inset 0 0 0 1px var(--on-deep-line)' }}>
            {TABS.map((x, n) => (
              <button
                key={x.id} ref={(el) => (refs.current[n] = el)} role="tab" id={`tab-${x.id}`} type="button"
                aria-selected={i === n} aria-controls={`panel-${x.id}`} tabIndex={i === n ? 0 : -1} onClick={() => select(n)}
                className="min-h-[44px] rounded-lg px-2 text-sm font-semibold transition-colors duration-200"
                style={i === n ? { background: 'var(--accent-bright)', color: 'var(--bright-ink)' } : { color: 'var(--on-deep-muted)' }}
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
              <li key={n} className="flex gap-5 border-t py-5" style={{ borderColor: 'var(--on-deep-line)' }}>
                <span className="pt-0.5 text-xs font-bold" style={{ color: 'var(--accent-bright)' }}>0{n}</span>
                <div>
                  <h3 className="font-bold">{s[`p${n}_title`]}</h3>
                  <p className="mt-1 text-sm" style={{ color: 'var(--on-deep-muted)' }}>{s[`p${n}_desc`]}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
};
