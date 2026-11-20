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

  return (
    <section id="equipment" className="section">
      <div className="wrap">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <header className="head">
            <h2 className="t-h2">{e.title}</h2>
            <p className="t-lead">{e.lead}</p>
          </header>
          {!all && (
            <div className="flex gap-2">
              <button type="button" className="btn-secondary !min-h-[40px] !w-10 !p-0" onClick={() => by(-1)} aria-label={e.prev}><ChevronLeft size={18} strokeWidth={1.5} /></button>
              <button type="button" className="btn-secondary !min-h-[40px] !w-10 !p-0" onClick={() => by(1)} aria-label={e.next}><ChevronRight size={18} strokeWidth={1.5} /></button>
            </div>
          )}
        </div>

        {/* The total floats only on wide screens and only while the devices are on screen */}
        <div className="mt-10">
          <ul
            ref={scroller}
            className={all
              ? 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3'
              : 'no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-1 sm:-mx-8 sm:scroll-px-8 sm:px-8'}
          >
            {hardwareProducts.map((p) => {
              const on = picked.has(p.id);
              const title = name(p);
              return (
                <li key={p.id} className={`card flex flex-col ${all ? '' : 'w-[78vw] max-w-[300px] shrink-0 snap-start'}`} style={on ? { boxShadow: 'inset 0 0 0 1.5px var(--accent), var(--shadow)' } : undefined}>
                  <button type="button" onClick={() => onOpenSpecs(p)} className="block text-left" title={e.details}>
                    <div className="m-2 overflow-hidden rounded-[10px] bg-white">
                      <Img name={p.image} kind="hardware" alt={title} sizes="(min-width: 1024px) 380px, 300px" />
                    </div>
                    <div className="px-4 pb-1 pt-3">
                      <p className="t-small">{e.cat[p.category]}</p>
                      <h3 className="mt-0.5 line-clamp-2 min-h-[2.7em] text-[17px] font-medium leading-snug">{title}</h3>
                    </div>
                  </button>
                  <div className="mt-auto flex items-center justify-between gap-3 px-4 pb-4 pt-2">
                    <p className="text-[15px]"><span className="num">{formatNum(p.price)}</span> <span className="fg-3">{currencyLabel(lang)}</span></p>
                    <button type="button" onClick={() => onTogglePick(p.id)} aria-pressed={on} className={`${on ? 'btn-primary' : 'btn-secondary'} btn-sm shrink-0 !gap-1.5`}>
                      {on ? <Check size={16} strokeWidth={2} aria-hidden="true" /> : <Plus size={16} strokeWidth={2} aria-hidden="true" />}{on ? e.picked : e.pick}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          <button type="button" onClick={() => setAll((a) => !a)} className="link mt-6" aria-pressed={all}>{all ? e.viewRow : e.viewAll}<ChevronRight size={16} strokeWidth={1.75} /></button>

          <div className="card z-10 mt-6 flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:sticky lg:bottom-6" style={{ boxShadow: 'inset 0 0 0 1px var(--line), var(--shadow-float)' }} aria-live="polite">
            <div className="min-w-0">
              <p className="t-small">{chosen.length ? `${e.estimate} · ${chosen.length} ${e.items}` : e.estimateNone}</p>
              <p className="mt-0.5 flex items-baseline gap-1.5">
                <NumberRoll value={sum} className="text-[28px] font-medium leading-tight" />
                <span className="fg-3">{currencyLabel(lang)}</span>
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-2">
              {chosen.length > 0 && <button type="button" onClick={onClearPicked} className="btn-secondary">{e.clear}</button>}
              <button type="button" onClick={askKit} className="btn-primary flex-1 whitespace-normal text-center sm:flex-none">{e.kitBtn}</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
