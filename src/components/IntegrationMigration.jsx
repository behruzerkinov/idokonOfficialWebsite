import { ArrowRight } from './icons';
import { BrandLogo, LOGOS } from './BrandLogo';

const GROUPS = [
  ['payments', [['click', 'click'], ['payme', 'payme'], ['uzum', 'uzum']]],
  ['fiscal', [['multikassa', 'mk'], ['arca', 'ar']]],
];

/** Left: the promise and its three terms. Right: every company in its own ruled cell, grouped by kind. */
export const IntegrationMigration = ({ t, onOpenContact }) => {
  const i = t.integrations;
  return (
    <section id="integrations" className="section section-alt">
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          <header className="head">
            <h2 className="t-h2">{i.title}</h2>
            <p className="t-lead">{i.lead}</p>
          </header>
          <dl className="mt-10 border-b" style={{ borderColor: 'var(--line)' }}>
            {[1, 2, 3].map((n) => (
              <div key={n} className="rule grid gap-1 py-4 sm:grid-cols-[180px_1fr] sm:gap-6">
                <dt className="font-medium">{i[`c${n}_title`]}</dt>
                <dd className="fg-2">{i[`c${n}_desc`]}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="space-y-8">
          {GROUPS.map(([g, items]) => (
            <div key={g}>
              <h3 className="t-small">{i[g]}</h3>
              <ul className={`mt-3 grid gap-3 ${items.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
                {items.map(([logo, desc]) => (
                  <li key={logo} data-brand={logo} className="card p-5">
                    <span className="sr-only">{LOGOS[logo][0]}</span>
                    <div className="flex h-8 items-center"><BrandLogo id={logo} className="h-6 w-auto max-w-[120px]" /></div>
                    <p className="t-small mt-4">{i[desc]}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <button type="button" onClick={onOpenContact} className="card group flex w-full items-center justify-between gap-4 p-5 text-left">
            <span>
              <span className="block font-medium">{i.otherTitle}</span>
              <span className="t-small mt-0.5 block">{i.otherDesc}</span>
            </span>
            <ArrowRight size={18} strokeWidth={1.5} className="shrink-0 fg-3 transition-transform duration-150 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
