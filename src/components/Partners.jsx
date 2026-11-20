import { BrandLogo, LOGOS } from './BrandLogo';

export { BrandLogo, LOGOS };

/** Systems we work with: one caption, then every company in its own quiet cell. */
export const Partners = ({ t }) => (
  <section aria-label={t.partners.title} className="pb-[clamp(4rem,8vw,6rem)]">
    <div className="wrap">
      <p className="t-caption text-center">{t.partners.title}</p>
      <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {Object.keys(LOGOS).map((id, k) => (
          <li key={id} data-brand={id} className={`flex h-[84px] items-center justify-center rounded-2xl px-4 ${k === 4 ? 'col-span-2 sm:col-span-1' : ''}`} style={{ background: 'var(--tile)' }}>
            <span className="sr-only">{LOGOS[id][0]}</span>
            <BrandLogo id={id} className="h-6 w-auto max-w-[116px]" />
          </li>
        ))}
      </ul>
    </div>
  </section>
);
