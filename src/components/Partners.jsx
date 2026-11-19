import { BrandLogo, LOGOS } from './BrandLogo';

export { BrandLogo, LOGOS };

/** Systems we work with: label, then one ruled cell per company with clean transparent logos. */
export const Partners = ({ t }) => (
  <section aria-label={t.partners.title} className="border-y" style={{ borderColor: 'var(--line)' }}>
    <div className="container-page grid items-stretch lg:grid-cols-[minmax(200px,1fr)_4fr]">
      <p className="flex items-center py-6 pr-6 text-sm font-semibold leading-snug">{t.partners.title}</p>
      {/* 1px gaps over a line-coloured backdrop draw identical hairlines between cells */}
      <ul className="grid grid-cols-2 gap-px border-t sm:grid-cols-5 lg:border-l lg:border-t-0" style={{ borderColor: 'var(--line)', background: 'var(--line)' }}>
        {Object.keys(LOGOS).map((id, k) => (
          <li
            key={id}
            data-brand={id}
            className={`flex min-h-[84px] items-center justify-center px-4 py-5 transition-colors duration-200 hover:bg-[var(--surface-2)] ${
              k === 4 ? 'col-span-2 sm:col-span-1' : ''
            }`}
            style={{ background: 'var(--bg)' }}
          >
            <span className="sr-only">{LOGOS[id][0]}</span>
            <BrandLogo id={id} className="h-7 w-auto max-w-[125px] transition-transform duration-200 hover:scale-105" />
          </li>
        ))}
      </ul>
    </div>
  </section>
);
