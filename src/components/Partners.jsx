import React from 'react';

const PARTNERS = [
  ['Click', '/logos/click.svg'], ['Payme', '/logos/payme.svg'], ['Uzum', '/logos/uzum.svg'],
  ['Soliq', null], ['Multikassa', '/logos/multikassa.webp', true],
  ['E-imzo', '/logos/e-imzo.webp'], ['ARCA', '/logos/arca.svg'],
];

export const Partners = ({ t }) => (
  <section aria-label={t.partners.title} className="border-y py-8" style={{ borderColor: 'var(--line)' }}>
    <div className="container-page">
      <p className="mb-5 text-center text-sm" style={{ color: 'var(--muted)' }}>{t.partners.title}</p>
      <ul className="hide-scrollbar flex items-center gap-8 overflow-x-auto md:flex-wrap md:justify-center md:gap-x-12">
        {PARTNERS.map(([name, src, label]) => (
          <li key={name} className="flex shrink-0 items-center gap-2">
            {src ? <img src={src} alt={name} height="28" loading="lazy" decoding="async" className="h-7 w-auto max-w-[120px] object-contain" /> : <span className="text-xl font-semibold tracking-tight">{name}</span>}
            {label && <span className="text-lg font-semibold tracking-tight">{name}</span>}
          </li>
        ))}
      </ul>
    </div>
  </section>
);
