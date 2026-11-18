import { Check, Plus, ShieldCheck } from 'lucide-react';
import { formatPrice } from '../data/site';
import { Modal } from './Modal';

export default function HardwareSpecsModal({ onClose, product, lang, t, picked, onTogglePick }) {
  const pick = (v) => (v && typeof v === 'object' ? v[lang] || v.uz : v);
  const title = pick(product.title);
  const e = t.equipment;
  return (
    <Modal onClose={onClose} title={title} closeLabel={e.close} maxWidth="max-w-lg">
      <h3 className="pr-10 text-lg font-semibold">{title}</h3>
      <div className="my-4 flex items-center gap-4">
        <img src={product.image} alt={title} width="96" height="96" decoding="async" className="h-24 w-24 shrink-0 rounded-lg bg-white object-contain p-2" style={{ boxShadow: 'var(--ring)' }} />
        <div>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>{e.officialPrice}</p>
          <p className="text-xl font-semibold tabular-nums">{formatPrice(product.price, lang)}</p>
          <p className="mt-1 inline-flex items-center gap-1.5 text-sm" style={{ color: 'var(--accent)' }}>
            <ShieldCheck size={18} strokeWidth={1.75} aria-hidden="true" />{pick(product.warranty)}
          </p>
        </div>
      </div>
      {product.desc && <p className="mb-4" style={{ color: 'var(--muted)' }}>{pick(product.desc)}</p>}
      {product.specs.length > 0 && (
        <>
          <h4 className="mb-2 text-sm font-semibold">{e.parameters}</h4>
          <dl className="mb-6 divide-y overflow-hidden rounded-xl text-sm" style={{ boxShadow: 'var(--ring)' }}>
            {product.specs.map((s, i) => (
              <div key={i} className="flex justify-between gap-4 p-3" style={{ borderColor: 'var(--line)' }}>
                <dt style={{ color: 'var(--muted)' }}>{pick(s.key)}</dt>
                <dd className="text-right font-medium">{pick(s.val)}</dd>
              </div>
            ))}
          </dl>
        </>
      )}
      <button type="button" aria-pressed={picked} className={`${picked ? 'btn-primary' : 'btn-outline'} w-full`} onClick={() => onTogglePick(product.id)}>
        {picked ? <Check size={18} strokeWidth={2} aria-hidden="true" /> : <Plus size={18} strokeWidth={2} aria-hidden="true" />}
        {picked ? e.picked : e.pick}
      </button>
    </Modal>
  );
}
