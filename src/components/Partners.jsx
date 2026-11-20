import { BrandLogo, LOGOS } from './BrandLogo';

export { BrandLogo, LOGOS };

/** Systems iDokon works with: a caption and one ruled cell per company. */
export const Partners = ({ t }) => (
  <section aria-label={t.partners.title} className="mt-[clamp(3.5rem,6vw,5rem)] border-y" style={{ borderColor: 'var(--line)' }}>
    <div className="wrap grid lg:grid-cols-[220px_1fr]">
      <p className="t-small flex items-center py-5 lg:pr-6">{t.partners.title}</p>
      {/* 1px gaps over a hairline-coloured ground draw identical rules between the cells */}
      <ul className="grid grid-cols-2 gap-px border-t sm:grid-cols-5 lg:border-l lg:border-t-0" style={{ borderColor: 'var(--line)', background: 'var(--line)' }}>
        {Object.keys(LOGOS).map((id, k) => (
          <li key={id} data-brand={id} className={`flex h-20 items-center justify-center px-4 ${k === 4 ? 'col-span-2 sm:col-span-1' : ''}`} style={{ background: 'var(--bg)' }}>
            <span className="sr-only">{LOGOS[id][0]}</span>
            <BrandLogo id={id} className="h-6 w-auto max-w-[112px]" />
          </li>
        ))}
      </ul>
    </div>
  </section>
);
