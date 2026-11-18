import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';
import { dragScroll } from '../lib/interactions';
import { hardwareProducts } from '../data/mockData';
import { currencyLabel, formatNum, formatPrice } from '../data/site';
import { Reveal } from './Reveal';
import { NumberRoll } from './NumberRoll';


/** Device catalogue as an estimator: select devices, the total rolls to the new sum. No cart, no checkout. */
export const HardwareMarketplace = ({ lang, t, picked, onTogglePick, onClearPicked, onOpenSpecs, onContact }) => {
  const e = t.equipment;
  const scroller = useRef(null);
  const [all, setAll] = useState(false);
  useEffect(() => (all ? undefined : dragScroll(scroller.current)), [all]);
  const by = (dir) => scroller.current?.scrollBy({ left: dir * 340, behavior: 'smooth' });

  const chosen = hardwareProducts.filter((p) => picked.has(p.id));
  const sum = chosen.reduce((s, p) => s + p.price, 0);
  const name = (p) => p.title[lang] || p.title.uz;
  const askKit = () => onContact({ message: chosen.length ? e.kitMessageList.replace('{list}', chosen.map(name).join(', ')).replace('{sum}', formatPrice(sum, lang)) : e.kitMessage });

  return (
    <section id="equipment" className="section section-alt">
      <div className="container-page">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow">{e.eyebrow}</span>
            <h2 className="h2 mt-5">{e.title}</h2>
            <p className="lede mt-5 max-w-[52ch]">{e.lead}</p>
          </div>
          {!all && (
            <div className="flex gap-2">
              <button type="button" className="icon-btn" style={{ boxShadow: 'inset 0 0 0 1px var(--line-strong)' }} onClick={() => by(-1)} aria-label={e.prev}><ChevronLeft size={20} strokeWidth={1.75} /></button>
              <button type="button" className="icon-btn" style={{ boxShadow: 'inset 0 0 0 1px var(--line-strong)' }} onClick={() => by(1)} aria-label={e.next}><ChevronRight size={20} strokeWidth={1.75} /></button>
            </div>
          )}
        </Reveal>

        <ul ref={scroller} data-dragscroll={all ? undefined : ''} className={all ? 'mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3' : 'hide-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8'}>
          {hardwareProducts.map((p) => {
            const on = picked.has(p.id);
            const title = name(p);
            return (
              <li key={p.id} className={`card flex flex-col overflow-hidden ${all ? '' : 'w-[80vw] shrink-0 snap-start sm:w-[300px]'}`} style={on ? { boxShadow: '0 0 0 2px var(--accent)' } : undefined}>
                <button type="button" onClick={() => onOpenSpecs(p)} className="block text-left" aria-label={`${title}: ${e.details}`}>
                  <div className="flex h-56 items-center justify-center bg-white">
                    <img src={p.image} alt={title} width="300" height="224" loading="lazy" decoding="async" className="h-full w-full object-contain p-4" />
                  </div>
                  <div className="p-5 pb-2">
                    <p className="text-[11px] font-bold tracking-[0.1em]" style={{ color: 'var(--accent)' }}>{e.cat[p.category]}</p>
                    <h3 className="mt-2 line-clamp-2 min-h-[3rem] text-lg font-bold leading-snug tracking-tight">{title}</h3>
                    <p className="mt-1 line-clamp-3 min-h-[4.5rem] text-sm" style={{ color: 'var(--muted)' }}>{p.desc[lang] || p.desc.uz}</p>
                  </div>
                </button>
                <div className="mt-auto flex items-end justify-between gap-3 p-5 pt-2">
                  <p className="font-bold tabular-nums leading-tight">{formatNum(p.price)}<span className="block text-xs font-medium" style={{ color: 'var(--muted)' }}>{currencyLabel(lang)}</span></p>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => onOpenSpecs(p)} aria-label={`${title}: ${e.details}`} className="btn-outline !min-h-[40px] !px-3"><ArrowUpRight size={18} strokeWidth={2} /></button>
                    <button type="button" onClick={() => onTogglePick(p.id)} aria-pressed={on} className={`${on ? 'btn-primary' : 'btn-outline'} !min-h-[40px] !px-3.5`}>
                      {on ? <Check size={17} strokeWidth={2.25} aria-hidden="true" /> : <Plus size={17} strokeWidth={2.25} aria-hidden="true" />}{on ? e.picked : e.pick}
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 flex justify-center">
          <button type="button" onClick={() => setAll((a) => !a)} className="btn-outline" aria-pressed={all}>{all ? e.viewRow : e.viewAll}</button>
        </div>

        {/* Running total. Sticks to the bottom of the viewport while the section is on screen. */}
        <div className="sticky bottom-[88px] z-10 mt-8 md:bottom-6">
          <div className="flex flex-col gap-4 rounded-2xl p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5" style={{ background: 'var(--deep)', color: 'var(--on-deep)', boxShadow: '0 0 0 1px var(--on-deep-line), var(--shadow-pop)' }} aria-live="polite">
            <div className="min-w-0">
              <p className="text-sm" style={{ color: 'var(--on-deep-muted)' }}>{chosen.length ? `${e.estimate} · ${chosen.length} ${e.items}` : e.estimateNone}</p>
              <p className="mt-1 flex items-baseline gap-2">
                <NumberRoll value={sum} className="text-3xl font-bold leading-none tracking-tight" />
                <span className="text-sm font-medium" style={{ color: 'var(--on-deep-muted)' }}>{currencyLabel(lang)}</span>
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              {chosen.length > 0 && (
                <button type="button" onClick={onClearPicked} className="btn !min-h-[44px] !px-4" style={{ color: 'var(--on-deep)', boxShadow: 'inset 0 0 0 1px var(--on-deep-line)' }}>
                  <X size={16} strokeWidth={2} aria-hidden="true" />{e.clear}
                </button>
              )}
              <button type="button" onClick={askKit} className="btn !min-h-[44px] flex-1 whitespace-normal text-center sm:flex-none" style={{ background: 'var(--accent-bright)', color: 'var(--bright-ink)' }}>{e.kitBtn}</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
