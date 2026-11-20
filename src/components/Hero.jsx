import { Check } from './icons';
import { SITE } from '../data/site';
import { scrollToId } from '../lib/scroll';
import { Img } from './Img';

// Must match the <link rel="preload"> in index.html so the LCP image is fetched once, early.
export const HERO_SIZES = '(min-width: 1200px) 932px, (min-width: 640px) 78vw, 88vw';

/**
 * Left-aligned statement over the product. The stage is a device pair: the till on the desktop,
 * the payment step of the same sale on a phone straddling its edge. The proverb is a badge: in the hero's
 * empty right side on wide screens, level with the actions; under the actions everywhere else.
 */
export const Hero = ({ t, onOpenDemo, onOpenLightbox }) => {
  const h = t.hero;
  const { setupMinutes, support } = SITE.claims;
  const meta = [h.meta1, setupMinutes.verified && h.meta2, support.verified && h.meta3].filter(Boolean);
  return (
    <section id="home" className="pt-[calc(60px+clamp(3rem,7vw,6rem))]">
      <div className="wrap">
        <div className="relative">
          <div className="max-w-[760px]">
            <h1 className="t-display max-w-[14ch]">{h.titleStart} {h.titleHighlight} {h.titleEnd}</h1>
            <p className="t-lead mt-6 max-w-[46ch]">{h.subtitle}</p>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5 text-[14px] fg-2">
              {meta.map((m) => (
                <li key={m} className="flex items-center gap-2"><Check size={16} strokeWidth={1.75} className="fg-3" />{m}</li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <button type="button" onClick={onOpenDemo} className="btn-primary">{h.ctaPrimary}</button>
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToId('contact'); }} className="btn-secondary">{h.ctaSecondary}</a>
            </div>
          </div>
          <figure className="motto">
            <blockquote className="motto-quote">“{h.quote.replace(/\.$/, '')}”</blockquote>
            <figcaption className="mt-2">
              <p className="t-small fg-2">{h.quoteNote}</p>
              <p className="mt-2 text-[12px] font-medium" style={{ color: 'var(--accent)' }}>{h.quoteBy}</p>
            </figcaption>
          </figure>
        </div>

        <div className="stage mt-[clamp(3rem,6vw,4.5rem)]">
          <button type="button" onClick={() => onOpenLightbox('showcase_kassirlar', h.imageAlt)} aria-label={`${h.imageAlt}. ${h.zoom}`} className="stage-desk shot cursor-zoom-in">
            <Img name="showcase_kassirlar" alt={h.imageAlt} sizes={HERO_SIZES} priority />
          </button>
          <div className="stage-phone">
            <Img name="ios-payment" kind="ios" alt={h.phoneAlt} sizes="(min-width: 1200px) 228px, (min-width: 640px) 20vw, 31vw" priority />
          </div>
        </div>
      </div>
    </section>
  );
};
