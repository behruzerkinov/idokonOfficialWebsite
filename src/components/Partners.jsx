import React from 'react';

const PARTNERS = [
  ['Click', '/logos/click.svg'], ['Payme', '/logos/payme.svg'], ['Uzum', '/logos/uzum.svg'],
  ['Soliq', null], ['Multikassa', '/logos/multikassa.webp', true],
  ['E-imzo', '/logos/e-imzo.webp'], ['ARCA', '/logos/arca.svg'],
];

const Item = ({ name, src, label, dup }) => (
  <li className="flex shrink-0 items-center gap-2" aria-hidden={dup || undefined}>
    {src ? <img src={src} alt={name} height="28" loading="lazy" decoding="async" className="h-7 w-auto max-w-[120px] object-contain" /> : <span className="text-xl font-semibold tracking-tight">{name}</span>}
    {label && <span className="text-lg font-semibold tracking-tight">{name}</span>}
  </li>
);

/** Slow marquee of the systems we work with. Six copies so screens up to about 2400px never run dry; copies 2 to 6 are hidden from screen readers and from reduced-motion users. */
export const Partners = ({ t }) => (
  <section aria-label={t.partners.title} className="py-12">
    <p className="mb-6 text-center text-sm" style={{ color: 'var(--muted)' }}>{t.partners.title}</p>
    <div className="marquee-wrap">
      <ul className="marquee items-center">
        {PARTNERS.map(([n, s, l]) => <Item key={n} name={n} src={s} label={l} />)}
        {[1, 2, 3, 4, 5].flatMap((k) => PARTNERS.map(([n, s, l]) => <Item key={n + k} name={n} src={s} label={l} dup />))}
      </ul>
    </div>
  </section>
);
