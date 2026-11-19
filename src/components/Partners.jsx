export const LOGOS = {
  click: ['Click', '/logos/click.svg'],
  payme: ['Payme', '/logos/payme.svg'],
  uzum: ['Uzum', '/logos/uzum.svg'],
  arca: ['Arca', '/logos/arca.svg'],
  multikassa: ['Multikassa', '/logos/multikassa.webp'],
};

/** Brand logo badge: transparent background, crisp distinct border, name next to or top of logo. */
export const LogoTile = ({ id, className = '', showName = true, namePlacement = 'next' }) => {
  const item = LOGOS[id];
  if (!item) return null;
  const [name, src] = item;
  return (
    <span
      data-brand={id}
      className={`brand-badge group inline-flex items-center justify-center gap-2.5 rounded-xl border border-[var(--line)] bg-transparent px-3 py-2 transition-all duration-200 hover:border-[var(--line-strong)] hover:bg-[var(--surface-2)] ${namePlacement === 'top' ? 'flex-col gap-1.5' : 'flex-row'} ${className}`}
      style={{ boxShadow: 'inset 0 0 0 1px var(--line)' }}
    >
      {showName && namePlacement === 'top' && (
        <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)] group-hover:text-[var(--fg)]">{name}</span>
      )}
      <img
        src={src}
        alt={name}
        height="22"
        loading="lazy"
        decoding="async"
        className={`max-h-6 w-auto max-w-[85px] object-contain transition-transform duration-200 group-hover:scale-105 ${id === 'arca' ? 'dark:brightness-150 dark:contrast-125' : ''}`}
      />
      {showName && namePlacement === 'next' && (
        <span className="text-xs sm:text-sm font-bold tracking-tight text-[var(--fg)]">{name}</span>
      )}
    </span>
  );
};

/** Systems we work with: label, then one ruled cell per company with individual brand badges. */
export const Partners = ({ t }) => (
  <section aria-label={t.partners.title} className="border-y" style={{ borderColor: 'var(--line)' }}>
    <div className="container-page grid items-stretch lg:grid-cols-[minmax(200px,1fr)_4fr]">
      <p className="flex items-center py-6 pr-6 text-sm font-semibold leading-snug">{t.partners.title}</p>
      {/* 1px gaps over a line-coloured backdrop draw identical hairlines between cells */}
      <ul className="grid grid-cols-2 gap-px border-t sm:grid-cols-5 lg:border-l lg:border-t-0" style={{ borderColor: 'var(--line)', background: 'var(--line)' }}>
        {Object.keys(LOGOS).map((id, k) => (
          <li key={id} className={`flex min-h-[84px] items-center justify-center px-3 py-4 ${k === 4 ? 'col-span-2 sm:col-span-1' : ''}`} style={{ background: 'var(--bg)' }}>
            <LogoTile id={id} showName namePlacement="next" />
          </li>
        ))}
      </ul>
    </div>
  </section>
);
