import { ChevronRight } from './icons';
import { BrandLogo, LOGOS } from './BrandLogo';

const GROUPS = [
  ['payments', [['click', 'click'], ['payme', 'payme'], ['uzum', 'uzum']]],
  ['fiscal', [['multikassa', 'mk'], ['arca', 'ar']]],
];

/** Every supported company in its own tile, grouped by kind; the three promises underneath. */
export const IntegrationMigration = ({ t, onOpenContact }) => {
  const i = t.integrations;
  return (
    <section id="integrations" className="section">
      <div className="wrap">
        <header className="head">
          <h2 className="t-headline">{i.title}</h2>
          <p className="t-intro">{i.lead}</p>
        </header>

        <div className="mt-[clamp(3rem,6vw,4.5rem)] space-y-10">
          {GROUPS.map(([g, items]) => (
            <div key={g}>
              <h3 className="t-caption font-semibold">{i[g]}</h3>
              <ul className={`mt-3 grid gap-4 md:gap-5 ${items.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
                {items.map(([logo, desc]) => (
                  <li key={logo} data-brand={logo} className="tile !p-7">
                    <span className="sr-only">{LOGOS[logo][0]}</span>
                    <div className="flex h-8 items-center"><BrandLogo id={logo} className="h-7 w-auto max-w-[130px]" /></div>
                    <p className="muted mt-5">{i[desc]}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <ul className="mt-[clamp(3rem,6vw,4.5rem)] grid gap-8 border-t pt-10 sm:grid-cols-3" style={{ borderColor: 'var(--hairline)' }}>
          {[1, 2, 3].map((n) => (
            <li key={n}>
              <h3 className="text-[17px] font-semibold">{i[`c${n}_title`]}</h3>
              <p className="t-caption mt-1.5">{i[`c${n}_desc`]}</p>
            </li>
          ))}
        </ul>

        <p className="mt-12 text-center">
          <span className="muted">{i.otherDesc}</span>{' '}
          <button type="button" onClick={onOpenContact} className="link">{i.otherTitle}<ChevronRight size={18} strokeWidth={2} /></button>
        </p>
      </div>
    </section>
  );
};
