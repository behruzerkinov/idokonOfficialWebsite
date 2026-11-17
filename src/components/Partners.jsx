import React from 'react';

// span = mobile column span (2-col grid); g1 holds three logos, so it gets a wider desktop column.
const GROUPS = [
  { key: 'g1', span: 'col-span-2 lg:col-span-1', logos: [['Click', '/logos/click.svg'], ['Payme', '/logos/payme.svg'], ['Uzum', '/logos/uzum.svg']] },
  { key: 'g2', span: '', logos: [['Arco', '/logos/arco.svg']] },
  { key: 'g3', span: '', logos: [['Multikassa', '/logos/multikassa.webp']] },
  { key: 'g4', span: 'col-span-2 lg:col-span-1', logos: [['E-imzo', '/logos/e-imzo.webp']] },
];

/** Systems we work with: label on the left, ruled cells on the right. Every logo sits in the same fixed-height tile. */
export const Partners = ({ t }) => (
  <section aria-label={t.partners.title} className="border-y" style={{ borderColor: 'var(--line)' }}>
    <div className="container-page grid items-stretch lg:grid-cols-[minmax(200px,1fr)_4fr]">
      <p className="flex items-center py-6 pr-6 text-sm font-semibold leading-snug" style={{ color: 'var(--fg)' }}>{t.partners.title}</p>
      {/* 1px gaps over a line-coloured backdrop give identical hairlines between every cell */}
      <ul className="grid grid-cols-2 gap-px border-t lg:grid-cols-[1.7fr_1fr_1fr_1fr] lg:border-l lg:border-t-0" style={{ borderColor: 'var(--line)', background: 'var(--line)' }}>
        {GROUPS.map((g) => (
          <li key={g.key} className={`flex min-h-[84px] items-center justify-center gap-2 px-4 py-4 ${g.span}`} style={{ background: 'var(--bg)' }} aria-label={t.partners[g.key]}>
            {g.logos.map(([name, src]) => (
              <span key={name} className="flex h-10 w-[84px] shrink-0 items-center justify-center rounded-sm px-2 text-[#0f0f0f] dark:bg-[#f2f2f0]">
                <img src={src} alt={name} height="24" loading="lazy" decoding="async" className="max-h-6 w-auto max-w-full object-contain" />
              </span>
            ))}
          </li>
        ))}
      </ul>
    </div>
  </section>
);
