import { ChevronRight } from './icons';
import { SITE } from '../data/site';
import { scrollToId } from '../lib/scroll';
import { Img } from './Img';

// Must match the <link rel="preload"> in index.html so the LCP image is fetched once, early.
export const HERO_SIZES = '(min-width: 1120px) 1056px, (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)';

/** Centred statement, two actions, then the product itself at full width. */
export const Hero = ({ t, onOpenDemo, onOpenLightbox }) => {
  const h = t.hero;
  const { setupMinutes, support } = SITE.claims;
  const meta = [h.meta1, setupMinutes.verified && h.meta2, support.verified && h.meta3].filter(Boolean);
  return (
    <section id="home" className="pb-[clamp(4.5rem,9vw,7rem)] pt-[calc(52px+clamp(3.5rem,8vw,6rem))]">
      <div className="wrap text-center">
        <p className="t-eyebrow">{h.eyebrow}</p>
        <h1 className="t-hero mx-auto mt-3 max-w-[920px]">{h.titleStart} {h.titleHighlight} {h.titleEnd}</h1>
        <p className="t-intro mx-auto mt-6 max-w-[600px]">{h.subtitle}</p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
          <button type="button" onClick={onOpenDemo} className="btn-primary">{h.ctaPrimary}</button>
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToId('contact'); }} className="link">{h.ctaSecondary}<ChevronRight size={18} strokeWidth={2} /></a>
        </div>
        <ul className="t-caption mt-8 flex flex-wrap justify-center gap-x-2">
          {meta.map((m, i) => <li key={m}>{i > 0 && <span aria-hidden="true" className="mr-2">·</span>}{m}</li>)}
        </ul>
      </div>
      <div className="wrap mt-[clamp(3rem,6vw,4.5rem)]">
        <button type="button" onClick={() => onOpenLightbox('kassa', h.imageAlt)} aria-label={`${h.imageAlt}. ${h.zoom}`} className="shot w-full cursor-zoom-in">
          <Img name="kassa" alt={h.imageAlt} sizes={HERO_SIZES} priority />
        </button>
      </div>
    </section>
  );
};
