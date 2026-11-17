import React from 'react';

const GROUPS = [
  { key: 'g1', logos: [['Click', '/logos/click.svg'], ['Payme', '/logos/payme.svg'], ['Uzum', '/logos/uzum.svg']] },
  { key: 'g2', logos: [['Arco', '/logos/arco.svg']] },
  { key: 'g3', logos: [['Multikassa', '/logos/multikassa.webp']] },
  { key: 'g4', logos: [['E-imzo', '/logos/e-imzo.webp']] },
];

/** Systems we work with: label on the left, four ruled cells on the right (as on the live site). */
export const Partners = ({ t }) => (
  <section aria-label={t.partners.title} className="border-y" style={{ borderColor: 'var(--line)' }}>
    <div className="container-page grid items-stretch lg:grid-cols-[minmax(220px,1fr)_3fr]">
      <p className="flex items-center py-6 pr-6 text-sm font-semibold leading-snug" style={{ color: 'var(--fg)' }}>{t.partners.title}</p>
      <ul className="grid grid-cols-2 border-t lg:grid-cols-4 lg:border-t-0" style={{ borderColor: 'var(--line)' }}>
        {GROUPS.map((g, i) => (
          <li key={g.key} className={`flex min-h-[84px] items-center justify-center gap-4 px-4 py-4 ${i % 2 ? 'border-l' : ''} ${i > 1 ? 'border-t lg:border-t-0' : ''} lg:border-l`} style={{ borderColor: 'var(--line)' }} aria-label={t.partners[g.key]}>
            {g.logos.map(([name, src]) => <img key={name} src={src} alt={name} height="26" loading="lazy" decoding="async" className="h-6 w-auto max-w-[96px] object-contain dark:[filter:brightness(0)_invert(1)] dark:opacity-80" />)}
          </li>
        ))}
      </ul>
    </div>
  </section>
);
