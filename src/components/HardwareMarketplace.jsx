import React, { useEffect, useRef, useState } from 'react';
import { dragScroll } from '../lib/interactions';
import { ArrowUpRight, ChevronLeft, ChevronRight, ShoppingCart, Check } from 'lucide-react';
import { toast } from 'sonner';
import { hardwareProducts } from '../data/mockData';
import { formatPrice, currencyLabel } from '../data/site';
import { Reveal } from './Reveal';

const ARROW = 'icon-btn border bg-[var(--surface)]';

export const HardwareMarketplace = ({ lang, t, cart, onAddToCart, onOpenSpecsModal, onOpenCart, onRequestKit }) => {
  const e = t.equipment;
  const scroller = useRef(null);
  const [all, setAll] = useState(false);
  useEffect(() => (all ? undefined : dragScroll(scroller.current)), [all]);
  const by = (dir) => scroller.current?.scrollBy({ left: dir * 340, behavior: 'smooth' });

  const add = (product) => {
    onAddToCart(product);
    const title = product.title[lang] || product.title.uz;
    toast.success(`${title} ${e.addedToCartToast}`, { action: { label: t.nav.cart, onClick: onOpenCart } });
  };

  const count = cart.reduce((s, i) => s + i.qty, 0);
  const sum = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <section id="equipment" className="section section-alt scroll-mt-16">
      <div className="container-page">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow">{e.eyebrow}</span>
            <h2 className="h2 mt-5">{e.title}</h2>
            <p className="lede mt-5 max-w-[52ch]">{e.lead}</p>
          </div>
          {!all && (
            <div className="flex gap-2" style={{ borderColor: 'var(--line)' }}>
              <button type="button" className={ARROW} style={{ borderColor: 'var(--line)' }} onClick={() => by(-1)} aria-label={e.prev}><ChevronLeft size={20} strokeWidth={1.75} /></button>
              <button type="button" className={ARROW} style={{ borderColor: 'var(--line)' }} onClick={() => by(1)} aria-label={e.next}><ChevronRight size={20} strokeWidth={1.75} /></button>
            </div>
          )}
        </Reveal>

        <ul ref={scroller} data-dragscroll={all ? undefined : ''} className={all ? 'mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3' : 'hide-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8'}>
          {hardwareProducts.map((p) => {
            const inCart = cart.some((i) => i.id === p.id);
            const title = p.title[lang] || p.title.uz;
            return (
              <li key={p.id} className={`card spot tilt flex flex-col overflow-hidden ${all ? '' : 'w-[80vw] shrink-0 snap-start sm:w-[300px]'}`}>
                <button type="button" onClick={() => onOpenSpecsModal(p)} className="block text-left" aria-label={`${title}: ${e.details}`}>
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
                  <p className="font-bold tabular-nums leading-tight">{new Intl.NumberFormat('uz-UZ').format(p.price)}<span className="block text-xs font-medium" style={{ color: 'var(--muted)' }}>{formatPrice(0, lang).replace(/^0\s/, '')}</span></p>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => add(p)} aria-label={inCart ? e.inCartBadge : e.addBtn} className={inCart ? 'btn-outline !min-h-[44px] !px-3' : 'btn-primary !min-h-[44px] !px-3'}>
                      {inCart ? <Check size={18} strokeWidth={2} /> : <ShoppingCart size={18} strokeWidth={2} />}
                    </button>
                    <button type="button" onClick={() => onOpenSpecsModal(p)} aria-label={`${title}: ${e.details}`} className="btn-deep !min-h-[44px] !px-3"><ArrowUpRight size={18} strokeWidth={2} /></button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button type="button" onClick={() => setAll((a) => !a)} className="btn-outline" aria-pressed={all}>{all ? e.viewRow : e.viewAll}</button>
        </div>

        {count > 0 && (
          <button type="button" onClick={onOpenCart} className="card mt-6 flex w-full items-center justify-between gap-4 p-5 text-left font-bold">
            <span>{e.setupTotal} · {count}</span>
            <span className="tabular-nums">{formatPrice(sum, lang)}</span>
          </button>
        )}

        <div className="card mt-8 flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-bold">{e.kitTitle}</h3>
            <p style={{ color: 'var(--muted)' }}>{e.kitDesc}</p>
          </div>
          <button type="button" onClick={onRequestKit} className="btn-deep shrink-0">{e.kitBtn}</button>
        </div>
      </div>
    </section>
  );
};
