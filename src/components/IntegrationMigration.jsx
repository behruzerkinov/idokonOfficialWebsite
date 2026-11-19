import { ArrowRight } from 'lucide-react';
import { Reveal } from './Reveal';
import { BrandLogo, LOGOS } from './BrandLogo';

const GROUPS = [
  ['payments', [['click', 'click'], ['payme', 'payme'], ['uzum', 'uzum']]],
  ['fiscal', [['multikassa', 'mk'], ['arca', 'ar']]],
];

/** Left: deep card with three promises. Right: every supported company as its own professional card, grouped by kind. */
export const IntegrationMigration = ({ t, onOpenContact }) => {
  const i = t.integrations;
  return (
    <section id="integrations" className="section">
      <div className="container-page grid gap-5 lg:grid-cols-2">
        <Reveal>
          <div className="flex h-full flex-col rounded-3xl p-8 md:p-10" style={{ background: 'var(--deep)', color: 'var(--on-deep)' }}>
            <span className="eyebrow" style={{ color: 'var(--accent-bright)' }}>{i.eyebrow}</span>
            <h2 className="h2 mt-5">{i.title}</h2>
            <p className="mt-5 max-w-[48ch]" style={{ color: 'var(--on-deep-muted)' }}>{i.lead}</p>
            <ol className="mt-8 space-y-5">
              {[1, 2, 3].map((n) => (
                <li key={n} className="flex gap-4">
                  <span className="chip-num shrink-0" style={{ background: 'var(--accent-bright)', color: 'var(--bright-ink)' }}>0{n}</span>
                  <div>
                    <h3 className="font-bold">{i[`c${n}_title`]}</h3>
                    <p className="text-sm" style={{ color: 'var(--on-deep-muted)' }}>{i[`c${n}_desc`]}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <div className="card h-full p-6 md:p-8">
            <p className="eyebrow">{i.supported}</p>
            {GROUPS.map(([g, items]) => (
              <div key={g} className="mt-6">
                <h3 className="text-xs font-semibold tracking-[0.08em]" style={{ color: 'var(--muted)' }}>{i[g]}</h3>
                <ul className={`mt-3 grid gap-3 ${items.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
                  {items.map(([logo, desc]) => (
                    <li
                      key={logo}
                      data-brand={logo}
                      className="spot group flex flex-col justify-between rounded-2xl p-5 transition-all duration-200 hover:border-[var(--line-strong)]"
                      style={{ background: 'var(--surface-2)', boxShadow: 'inset 0 0 0 1px var(--line)' }}
                    >
                      <div>
                        <div className="flex h-9 items-center">
                          <BrandLogo id={logo} className="h-6 sm:h-7 w-auto max-w-[120px]" />
                          <span className="sr-only">{LOGOS[logo][0]}</span>
                        </div>
                        <p className="mt-3.5 text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                          {i[desc]}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <button type="button" onClick={onOpenContact} className="group mt-6 flex w-full items-center justify-between gap-4 rounded-2xl p-5 text-left" style={{ background: 'var(--accent-soft)' }}>
              <span>
                <span className="block font-bold" style={{ color: 'var(--accent)' }}>{i.otherTitle}</span>
                <span className="mt-1 block text-sm" style={{ color: 'var(--muted)' }}>{i.otherDesc}</span>
              </span>
              <ArrowRight size={18} className="shrink-0 transition-transform group-hover:translate-x-0.5" style={{ color: 'var(--accent)' }} aria-hidden="true" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
