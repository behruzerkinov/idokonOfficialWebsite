export const LOGOS = {
  click: ['Click', '/logos/click.svg'],
  payme: ['Payme', '/logos/payme.svg'],
  uzum: ['Uzum', '/logos/uzum.svg'],
  arco: ['Arco', '/logos/arco.svg'],
  multikassa: ['Multikassa', '/logos/multikassa.webp'],
};

/** Logo tile: white plate so every brand mark keeps its own colours in both themes. */
export const LogoTile = ({ id, className = '' }) => {
  const [name, src] = LOGOS[id];
  return (
    <span className={`flex h-11 w-[104px] shrink-0 items-center justify-center rounded-lg bg-white px-3 ${className}`} style={{ boxShadow: 'inset 0 0 0 1px rgb(0 0 0 / 0.06)' }}>
      <img src={src} alt={name} height="24" loading="lazy" decoding="async" className="max-h-6 w-auto max-w-full object-contain" />
    </span>
  );
};

/** Systems we work with: label, then one ruled cell per company. */
export const Partners = ({ t }) => (
  <section aria-label={t.partners.title} className="border-y" style={{ borderColor: 'var(--line)' }}>
    <div className="container-page grid items-stretch lg:grid-cols-[minmax(200px,1fr)_4fr]">
      <p className="flex items-center py-6 pr-6 text-sm font-semibold leading-snug">{t.partners.title}</p>
      {/* 1px gaps over a line-coloured backdrop draw identical hairlines between cells */}
      <ul className="grid grid-cols-2 gap-px border-t sm:grid-cols-5 lg:border-l lg:border-t-0" style={{ borderColor: 'var(--line)', background: 'var(--line)' }}>
        {Object.keys(LOGOS).map((id, k) => (
          <li key={id} className={`flex min-h-[84px] items-center justify-center px-3 py-4 ${k === 4 ? 'col-span-2 sm:col-span-1' : ''}`} style={{ background: 'var(--bg)' }}>
            <LogoTile id={id} />
          </li>
        ))}
      </ul>
    </div>
  </section>
);
