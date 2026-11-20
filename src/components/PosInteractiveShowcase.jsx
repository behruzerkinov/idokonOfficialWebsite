import { useRef, useState } from 'react';
import { Img } from './Img';

const TABS = [
  { id: 'pos', img: 'showcase_kassirlar' },
  { id: 'sales', img: 'showcase_savdo' },
  { id: 'stock', img: 'showcase_ombor' },
  { id: 'abc', img: 'showcase_analitika' },
];
const SIZES = '(min-width: 1200px) 1136px, (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)';

/**
 * Real admin screens behind a segmented control. All four stay mounted in one grid cell,
 * so switching is an instant cross-fade with no loading gap.
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
    <section id="software" className="section">
      <div className="wrap">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <header className="head">
            <h2 className="t-h2 stop">{s.title}</h2>
            <p className="t-lead">{s.lead}</p>
          </header>
          <div role="tablist" aria-label={s.tablist} onKeyDown={onKey} className="segmented no-scrollbar max-w-full self-start overflow-x-auto lg:self-auto">
            {TABS.map((x, n) => (
              <button
                key={x.id} ref={(el) => (refs.current[n] = el)} role="tab" id={`tab-${x.id}`} type="button"
                aria-selected={i === n} aria-controls={`panel-${x.id}`} tabIndex={i === n ? 0 : -1} onClick={() => select(n)}
                className="seg shrink-0"
              >
                {s.tabs[x.id]}
              </button>
            ))}
          </div>
        </div>

        <div role="tabpanel" id={`panel-${tab.id}`} aria-labelledby={`tab-${tab.id}`} className="mt-10" onTouchStart={(e) => (touchX.current = e.touches[0].clientX)} onTouchEnd={onTouchEnd}>
          <button type="button" onClick={() => onOpenLightbox(tab.img, s.tabs[tab.id])} aria-label={`${s.tabs[tab.id]}: ${s.zoom}`} className="shot grid w-full cursor-zoom-in" style={{ aspectRatio: '1359 / 757' }}>
            {TABS.map((x, n) => (
              <span key={x.id} className="col-start-1 row-start-1 transition-opacity duration-300" style={{ opacity: n === i ? 1 : 0 }}>
                <Img name={x.img} alt={n === i ? s.tabs[x.id] : ''} sizes={SIZES} className="h-full object-cover object-left-top" style={{ aspectRatio: '1359 / 757' }} />
              </span>
            ))}
          </button>
        </div>

        <ul className="mt-12 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((n) => (
            <li key={n} className="rule pt-5">
              <h3 className="font-medium">{s[`p${n}_title`]}</h3>
              <p className="t-small mt-1.5">{s[`p${n}_desc`]}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
