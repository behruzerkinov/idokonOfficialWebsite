import React, { useRef } from 'react';
import { Check, ChevronLeft, ChevronRight, ShoppingCart, Wand2 } from 'lucide-react';
import { toast } from 'sonner';
import { hardwareProducts } from '../data/mockData';
import { formatPrice } from '../data/site';
import { SectionHead } from './SectionHead';

const ARROW = 'icon-btn hidden border bg-white shadow-xs dark:bg-zinc-900 sm:inline-flex';

export const HardwareMarketplace = ({ lang, t, cart, onAddToCart, onOpenSpecsModal, onOpenCart, onRequestKit }) => {
  const scroller = useRef(null);
  const by = (dir) => scroller.current?.scrollBy({ left: dir * 340, behavior: 'smooth' });

  const add = (product) => {
    onAddToCart(product);
    const title = product.title[lang] || product.title.uz;
    toast.success(`${title} ${t.equipment.addedToCartToast}`, {
      action: { label: t.nav.cart, onClick: onOpenCart },
    });
  };

  const count = cart.reduce((s, i) => s + i.qty, 0);
  const sum = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <section id="equipment" className="section scroll-mt-16">
      <div className="container-page">
        <SectionHead title={t.equipment.title} lead={t.equipment.lead} />

        <div className="mb-6 flex justify-end gap-2">
          <button type="button" className={ARROW} onClick={() => by(-1)} aria-label={t.equipment.prev}><ChevronLeft size={20} strokeWidth={1.75} /></button>
          <button type="button" className={ARROW} onClick={() => by(1)} aria-label={t.equipment.next}><ChevronRight size={20} strokeWidth={1.75} /></button>
        </div>

        <ul ref={scroller} className="hide-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8">
          {hardwareProducts.map((p) => {
            const inCart = cart.some((i) => i.id === p.id);
            const title = p.title[lang] || p.title.uz;
            return (
              <li key={p.id} className="card spot flex w-[80vw] shrink-0 snap-start flex-col overflow-hidden sm:w-[300px]">
                <button type="button" onClick={() => onOpenSpecsModal(p)} className="block text-left" aria-label={`${title}: ${t.equipment.details}`}>
                  <div className="flex h-56 items-center justify-center border-b bg-white" style={{ borderColor: 'var(--line)' }}>
                    <img src={p.image} alt={title} width="300" height="224" loading="lazy" decoding="async" className="h-full w-full object-contain p-3" />
                  </div>
                  <div className="p-4">
                    <h3 className="line-clamp-2 min-h-[3rem] font-semibold">{title}</h3>
                  </div>
                </button>
                <div className="mt-auto flex items-center justify-between gap-3 p-4 pt-0">
                  <span className="font-semibold tabular-nums">{formatPrice(p.price, lang)}</span>
                  <button type="button" onClick={() => add(p)} className={inCart ? 'btn-secondary px-3' : 'btn-primary px-3'}>
                    {inCart ? <Check size={20} strokeWidth={1.75} /> : <ShoppingCart size={20} strokeWidth={1.75} />}
                    {inCart ? t.equipment.inCartBadge : t.equipment.addBtn}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        {count > 0 && (
          <button type="button" onClick={onOpenCart} className="receipt !max-w-none receipt-row mt-6 w-full text-left text-[13px]">
            <span className="font-bold">{t.equipment.setupTotal} · {count}</span>
            <span className="font-bold">{formatPrice(sum, lang)}</span>
          </button>
        )}

        <div className="card mt-8 flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <Wand2 size={20} strokeWidth={1.75} className="mt-1 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            <div>
              <h3 className="font-semibold">{t.equipment.kitTitle}</h3>
              <p style={{ color: 'var(--muted)' }}>{t.equipment.kitDesc}</p>
            </div>
          </div>
          <button type="button" onClick={onRequestKit} className="btn-primary shrink-0">{t.equipment.kitBtn}</button>
        </div>
      </div>
    </section>
  );
};
