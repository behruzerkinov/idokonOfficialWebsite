import React from 'react';
import { Check, ShieldCheck, ShoppingCart } from 'lucide-react';
import { formatPrice } from '../data/site';
import { Modal } from './Modal';

export const HardwareSpecsModal = ({ isOpen, onClose, product, lang, t, onAddToCart, isInCart }) => {
  if (!product) return null;
  const pick = (v) => (v && typeof v === 'object' ? v[lang] || v.uz : v);
  const title = pick(product.title);
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} closeLabel={t.equipment.close} maxWidth="max-w-lg">
      <h3 className="pr-10 text-lg font-semibold">{title}</h3>
      <div className="my-4 flex items-center gap-4">
        <img src={product.image} alt={title} width="96" height="96" decoding="async" className="h-24 w-24 shrink-0 rounded-lg border bg-white object-contain p-2" style={{ borderColor: 'var(--line)' }} />
        <div>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>{t.equipment.officialPrice}</p>
          <p className="text-xl font-semibold tabular-nums">{formatPrice(product.price, lang)}</p>
          <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-emerald-700 dark:text-emerald-400">
            <ShieldCheck size={20} strokeWidth={1.75} aria-hidden="true" />{pick(product.warranty)}
          </p>
        </div>
      </div>
      {product.desc && <p className="mb-4" style={{ color: 'var(--muted)' }}>{pick(product.desc)}</p>}
      {product.specs.length > 0 && <h4 className="mb-2 text-sm font-semibold">{t.equipment.parameters}</h4>}
      {product.specs.length > 0 && <dl className="mb-6 divide-y overflow-hidden rounded-xl border text-sm" style={{ borderColor: 'var(--line)' }}>
        {product.specs.map((s, i) => (
          <div key={i} className="flex justify-between gap-4 p-3" style={{ borderColor: 'var(--line)' }}>
            <dt style={{ color: 'var(--muted)' }}>{pick(s.key)}</dt>
            <dd className="text-right font-medium">{pick(s.val)}</dd>
          </div>
        ))}
      </dl>}
      <button type="button" className="btn-primary w-full" onClick={() => { if (!isInCart) onAddToCart(product); onClose(); }}>
        {isInCart ? <Check size={20} strokeWidth={1.75} /> : <ShoppingCart size={20} strokeWidth={1.75} />}
        {isInCart ? t.equipment.inCart : t.equipment.addToCart}
      </button>
    </Modal>
  );
};
