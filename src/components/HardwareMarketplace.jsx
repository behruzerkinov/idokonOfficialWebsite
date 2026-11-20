import { useRef, useState } from 'react';
import { Check, ChevronLeft, ChevronRight, Plus } from './icons';
import { hardwareProducts } from '../data/mockData';
import { currencyLabel, formatNum, formatPrice } from '../data/site';
import { NumberRoll } from './NumberRoll';
import { Img } from './Img';

/** Device catalogue as an estimator: pick devices and the total rolls to the new sum. No cart, no checkout. */
export const HardwareMarketplace = ({ lang, t, picked, onTogglePick, onClearPicked, onOpenSpecs, onContact }) => {
  const e = t.equipment;
  const scroller = useRef(null);
  const [all, setAll] = useState(false);
  const by = (dir) => scroller.current?.scrollBy({ left: dir * scroller.current.clientWidth * 0.8, behavior: 'smooth' });

  const chosen = hardwareProducts.filter((p) => picked.has(p.id));
  const sum = chosen.reduce((s, p) => s + p.price, 0);
  const name = (p) => p.title[lang] || p.title.uz;
  const askKit = () => onContact({ message: chosen.length ? e.kitMessageList.replace('{list}', chosen.map(name).join(', ')).replace('{sum}', formatPrice(sum, lang)) : e.kitMessage });
  const paddle = 'icon-btn !h-9 !w-9 disabled:opacity-40';

  return (
    <section id="equipment" className="section section-alt">
      <div className="wrap">
        <header className="head">
          <h2 className="t-headline">{e.title}</h2>
          <p className="t-intro">{e.lead}</p>
        </header>

        {/* The total floats only while the devices themselves are on screen, never over the heading */}
        <div className="mt-[clamp(3rem,6vw,4.5rem)]">
        <ul
          ref={scroller}
          className={all
            ? 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3'
            : 'no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 sm:-mx-8 sm:scroll-px-8 sm:px-8'}
        >
          {hardwareProducts.map((p) => {
            const on = picked.has(p.id);
            const title = name(p);
            return (
              <li key={p.id} className={`flex flex-col overflow-hidden rounded-[22px] ${all ? '' : 'w-[78vw] max-w-[320px] shrink-0 snap-start'}`} style={{ background: 'var(--tile)', boxShadow: on ? 'inset 0 0 0 2px var(--accent)' : undefined }}>
                <button type="button" onClick={() => onOpenSpecs(p)} className="block text-left" title={e.details}>
                  <div className="m-2 overflow-hidden rounded-[16px] bg-white">
                    <Img name={p.image} kind="hardware" alt={title} sizes="(min-width: 1024px) 352px, 320px" />
                  </div>
                  <div className="px-5 pb-2 pt-3">
                    <p className="t-caption">{e.cat[p.category]}</p>
                    <h3 className="mt-1 line-clamp-2 min-h-[2.9em] text-[19px] font-semibold leading-snug tracking-tight">{title}</h3>
                  </div>
                </button>
                <div className="mt-auto flex items-center justify-between gap-3 px-5 pb-5 pt-2">
                  <p className="text-[17px] tabular-nums">{formatNum(p.price)} <span className="muted">{currencyLabel(lang)}</span></p>
                  <button type="button" onClick={() => onTogglePick(p.id)} aria-pressed={on} className={`${on ? 'btn-primary' : 'btn-secondary'} btn-sm shrink-0`}>
                    {on ? <Check size={15} strokeWidth={2.5} aria-hidden="true" /> : <Plus size={15} strokeWidth={2.5} aria-hidden="true" />}{on ? e.picked : e.pick}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 flex items-center justify-between gap-4">
          <button type="button" onClick={() => setAll((a) => !a)} className="link" aria-pressed={all}>{all ? e.viewRow : e.viewAll}<ChevronRight size={18} strokeWidth={2} /></button>
          {!all && (
            <div className="flex gap-2">
              <button type="button" className={paddle} style={{ background: 'var(--tile)' }} onClick={() => by(-1)} aria-label={e.prev}><ChevronLeft size={18} strokeWidth={2} /></button>
              <button type="button" className={paddle} style={{ background: 'var(--tile)' }} onClick={() => by(1)} aria-label={e.next}><ChevronRight size={18} strokeWidth={2} /></button>
            </div>
          )}
        </div>

        <div className="z-10 mt-8 lg:sticky lg:bottom-6">
          <div className="total-bar flex flex-col gap-4 rounded-[22px] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6" aria-live="polite">
            <div className="min-w-0">
              <p className="t-caption">{chosen.length ? `${e.estimate} · ${chosen.length} ${e.items}` : e.estimateNone}</p>
              <p className="mt-0.5 flex items-baseline gap-1.5">
                <NumberRoll value={sum} className="text-[28px] font-semibold leading-tight tracking-tight" />
                <span className="muted">{currencyLabel(lang)}</span>
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-x-5 gap-y-2">
              {chosen.length > 0 && <button type="button" onClick={onClearPicked} className="link">{e.clear}</button>}
              <button type="button" onClick={askKit} className="btn-primary flex-1 whitespace-normal text-center sm:flex-none">{e.kitBtn}</button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};
