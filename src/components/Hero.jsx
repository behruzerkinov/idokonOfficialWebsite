import { ArrowRight, Check, Quote } from 'lucide-react';
import { SITE } from '../data/site';
import { scrollToId } from '../lib/scroll';

const WINDOW_DOTS = ['#ff5f56', '#ffbd2e', '#27c93f'];

export const Hero = ({ t, onOpenDemo, onOpenLightbox }) => {
  const h = t.hero;
  const { setupMinutes, support } = SITE.claims;
  const meta = [h.meta1, setupMinutes.verified && h.meta2, support.verified && h.meta3].filter(Boolean);
  return (
    <section id="home" className="relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-36">
      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div>
          <span className="eyebrow">{h.eyebrow}</span>
          <h1 className="display mt-6 max-w-[13ch]">
            {h.titleStart} <span className="grad-text">{h.titleHighlight}</span> {h.titleEnd}
          </h1>
          <p className="lede mt-6 max-w-[48ch]">{h.subtitle}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <button type="button" onClick={onOpenDemo} className="btn-primary !min-h-[48px] !px-6">{h.ctaPrimary}<ArrowRight size={18} strokeWidth={2} aria-hidden="true" /></button>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToId('contact'); }} className="btn-outline !min-h-[48px] !px-6">{h.ctaSecondary}</a>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium" style={{ color: 'var(--muted)' }}>
            {meta.map((m) => (
              <li key={m} className="flex items-center gap-2"><Check size={16} strokeWidth={2.5} style={{ color: 'var(--accent)' }} aria-hidden="true" />{m}</li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[620px] sm:pb-16 sm:pr-8">
          <div className="drift relative rounded-2xl p-1.5" style={{ background: 'var(--surface)', boxShadow: 'var(--ring), var(--shadow-pop)' }}>
            <div className="flex items-center gap-3 px-3 py-2.5">
              <span className="flex gap-1.5" aria-hidden="true">{WINDOW_DOTS.map((c) => <i key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />)}</span>
              <span className="text-[11px] font-semibold tracking-[0.08em]" style={{ color: 'var(--muted)' }}>{h.windowTitle}</span>
            </div>
            <button type="button" onClick={() => onOpenLightbox('/screenshots/kassa.webp', h.imageAlt)} aria-label={h.zoom} className="block w-full overflow-hidden rounded-xl">
              <img src="/screenshots/kassa.webp" alt={h.imageAlt} width="1280" height="542" fetchPriority="high" decoding="async" className="h-auto w-full" />
            </button>
          </div>
          <div className="drift drift-fast absolute -top-4 right-4 sm:right-12">
            <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold" style={{ background: 'var(--surface)', boxShadow: 'var(--ring), var(--shadow-pop)' }}>
              <span className="ping" aria-hidden="true" />{h.liveStatus}
            </div>
          </div>
          <figure className="drift drift-fast relative ml-auto mt-4 w-[min(320px,92%)] rounded-2xl p-5 sm:absolute sm:bottom-0 sm:right-0 sm:mt-0 sm:w-[300px]" style={{ background: 'var(--deep)', color: 'var(--on-deep)', boxShadow: '0 0 0 1px var(--on-deep-line), var(--shadow-pop)' }}>
            <Quote size={18} strokeWidth={2} style={{ color: 'var(--accent-bright)' }} aria-hidden="true" />
            <blockquote className="mt-2 text-lg font-semibold leading-snug tracking-tight">{h.quote}</blockquote>
            <p className="mt-2 text-[13px] leading-relaxed" style={{ color: 'var(--on-deep-muted)' }}>{h.quoteNote}</p>
            <figcaption className="mt-3 text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: 'var(--accent-bright)' }}>{h.quoteBy}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
};
