import React from 'react';

const PARTNERS = [
  ['Click', '/logos/click.svg'], ['Payme', '/logos/payme.svg'], ['Uzum', '/logos/uzum.svg'],
  ['Soliq', '/logos/soliq.svg'], ['Multikassa', '/logos/multikassa.webp'],
  ['E-imzo', '/logos/e-imzo.webp'], ['ARCA', '/logos/arca.svg'],
];

export const Partners = ({ t }) => (
  <section aria-label={t.partners.title} className="border-y py-8" style={{ borderColor: 'var(--line)' }}>
    <div className="container-page">
      <p className="mb-5 text-center text-sm" style={{ color: 'var(--muted)' }}>{t.partners.title}</p>
      <ul className="hide-scrollbar flex items-center gap-8 overflow-x-auto md:flex-wrap md:justify-center md:gap-x-12">
        {PARTNERS.map(([name, src]) => (
          <li key={name} className="shrink-0">
            <img src={src} alt={name} height="28" loading="lazy" decoding="async" className="h-7 w-auto max-w-[120px] object-contain dark:brightness-0 dark:invert" />
          </li>
        ))}
      </ul>
    </div>
  </section>
);
