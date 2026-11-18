import { useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { SITE, currencyLabel, formatPrice } from '../data/site';
import { Reveal } from './Reveal';
import { NumberRoll } from './NumberRoll';

const PERIODS = [
  { key: 'monthly', label: 'period1', months: 1 },
  { key: '6m', label: 'period6', months: 6, badge: 'badge6' },
  { key: '12m', label: 'period12', months: 12, badge: 'badge12' },
];
const NEW_FEATURE = { premium: 4 }; // index of the feature marked "New" (Seyf)

/** Each plan lists only what it adds; the line above says which plans it already contains. */
export const PricingCalculator = ({ t, lang, onSelectPlan }) => {
  const [period, setPeriod] = useState('monthly');
  const p = PERIODS.find((x) => x.key === period);
  const pr = t.pricing;
  const names = SITE.plans.map((x) => pr[x.id].name);
  const includes = (k) => (k === 1 ? pr.plus.replace('{p}', names[0]) : k === 2 ? pr.plus2.replace('{a}', names[0]).replace('{b}', names[1]) : null);

  return (
    <section id="pricing" className="section section-alt">
      <div className="container-page">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">{pr.eyebrow}</span>
          <h2 className="h2 mt-5">{pr.title}</h2>
          <p className="lede mx-auto mt-5 max-w-[52ch]">{pr.lead}</p>
          <div role="group" aria-label={pr.periodLabel} className="segmented mx-auto mt-8 flex w-full sm:w-fit">
            {PERIODS.map((x) => (
              <button key={x.key} type="button" aria-pressed={period === x.key} onClick={() => setPeriod(x.key)} className="seg-btn flex min-h-[48px] min-w-0 flex-1 !shrink flex-col items-center justify-center !px-2 py-1 text-center leading-tight sm:!px-5">
                {pr[x.label]}
                {x.badge && <span className="text-[11px] font-semibold" style={{ color: 'var(--accent)' }}>{pr[x.badge]}</span>}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-14 grid items-start gap-5 lg:grid-cols-3">
          {SITE.plans.map((plan, k) => {
            const info = pr[plan.id];
            const total = plan[period];
            const on = plan.popular;
            const muted = on ? 'var(--on-deep-muted)' : 'var(--muted)';
            const tick = on ? 'var(--accent-bright)' : 'var(--accent)';
            return (
              <Reveal key={plan.id} delay={k} className={on ? 'lg:-mt-4' : ''}>
                <article
                  className={`relative flex h-full flex-col rounded-3xl p-8 ${on ? '' : 'card'}`}
                  style={on ? { background: 'var(--deep)', color: 'var(--on-deep)', boxShadow: '0 0 0 1.5px var(--accent-bright), 0 30px 60px -30px color-mix(in oklab, var(--accent) 60%, transparent)' } : undefined}
                  aria-label={on ? `${info.name} · ${pr.popular}` : info.name}
                >
                  {on && (
                    <span className="absolute -top-3 left-8 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold" style={{ background: 'var(--accent-bright)', color: 'var(--bright-ink)' }}>
                      <Sparkles size={13} strokeWidth={2.25} aria-hidden="true" />{pr.popular}
                    </span>
                  )}
                  <h3 className="text-2xl font-bold tracking-tight">{info.name}</h3>
                  <p className="mt-1 text-sm" style={{ color: muted }}>{info.subtitle}</p>
                  <p className="mt-8 flex flex-wrap items-baseline gap-x-2">
                    <NumberRoll value={Math.round(total / p.months)} className="text-5xl font-bold leading-none tracking-tight" />
                    <span className="text-sm font-medium" style={{ color: muted }}>{currencyLabel(lang)} / {pr.perMonth}</span>
                  </p>
                  <p className="mt-2 h-5 text-sm" style={{ color: muted }}>{period !== 'monthly' && `${pr.total}: ${formatPrice(total, lang)}`}</p>
                  <button type="button" onClick={() => onSelectPlan(plan.id)} className={`mt-6 w-full ${on ? 'btn' : 'btn-outline'}`} style={on ? { background: 'var(--accent-bright)', color: 'var(--bright-ink)' } : undefined}>
                    {pr.choose}
                  </button>
                  <div className="mt-7 border-t pt-6 text-sm" style={{ borderColor: on ? 'var(--on-deep-line)' : 'var(--line)' }}>
                    {includes(k) && <p className="mb-4 font-semibold">{includes(k)}</p>}
                    <ul className="space-y-3">
                      {info.features.map((f, n) => (
                        <li key={f} className="flex gap-2.5">
                          <Check size={17} strokeWidth={2.5} className="mt-0.5 shrink-0" style={{ color: tick }} aria-hidden="true" />
                          <span>
                            {f}
                            {NEW_FEATURE[plan.id] === n && <span className="ml-2 rounded-full px-2 py-0.5 align-middle text-[10px] font-bold uppercase tracking-wider" style={{ background: tick, color: on ? 'var(--bright-ink)' : 'var(--accent-ink)' }}>{pr.isNew}</span>}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
