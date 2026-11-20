import { Check, Plus, ShieldCheck } from './icons';
import { formatPrice } from '../data/site';
import { Modal } from './Modal';
import { Img } from './Img';

export default function HardwareSpecsModal({ onClose, product, lang, t, picked, onTogglePick }) {
  const pick = (v) => (v && typeof v === 'object' ? v[lang] || v.uz : v);
  const title = pick(product.title);
  const e = t.equipment;
  return (
    <Modal onClose={onClose} title={title} closeLabel={e.close} maxWidth="max-w-lg">
      <div className="overflow-hidden rounded-xl bg-white">
        <Img name={product.image} kind="hardware" alt={title} sizes="(min-width: 560px) 448px, 90vw" />
      </div>
      <h3 className="t-h3 mt-6 pr-6">{title}</h3>
      <p className="num mt-2 text-[22px]">{formatPrice(product.price, lang)}</p>
      <p className="t-small mt-1 inline-flex items-center gap-1.5">
        <ShieldCheck size={16} strokeWidth={1.5} aria-hidden="true" />{pick(product.warranty)}
      </p>
      {product.desc && <p className="fg-2 mt-4">{pick(product.desc)}</p>}
      {product.specs.length > 0 && (
        <>
          <h4 className="mt-6 font-medium">{e.parameters.replace(/:$/, '')}</h4>
          <dl className="mt-2 text-[14px]">
            {product.specs.map((s, i) => (
              <div key={i} className={`flex justify-between gap-4 py-2.5 ${i ? 'rule' : ''}`}>
                <dt className="fg-3">{pick(s.key)}</dt>
                <dd className="text-right">{pick(s.val)}</dd>
              </div>
            ))}
          </dl>
        </>
      )}
      <button type="button" aria-pressed={picked} className={`${picked ? 'btn-primary' : 'btn-secondary'} mt-6 w-full`} onClick={() => onTogglePick(product.id)}>
        {picked ? <Check size={18} strokeWidth={1.75} aria-hidden="true" /> : <Plus size={18} strokeWidth={1.75} aria-hidden="true" />}
        {picked ? e.picked : e.pick}
      </button>
    </Modal>
  );
}
