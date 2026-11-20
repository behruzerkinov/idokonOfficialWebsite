import { useState } from 'react';
import { Check } from './icons';
import { SITE, currencyLabel, formatPrice } from '../data/site';
import { NumberRoll } from './NumberRoll';

const PERIODS = [
  { key: 'monthly', label: 'period1', months: 1 },
  { key: '6m', label: 'period6', months: 6, badge: 'badge6' },
  { key: '12m', label: 'period12', months: 12, badge: 'badge12' },
];
const NEW_FEATURE = { premium: 4 }; // index of the feature marked "New" (Seyf)

/** Each plan lists only what it adds; the line above says which plans it already contains. Premium is highlighted. */
export const PricingCalculator = ({ t, lang, onSelectPlan }) => {
  const [period, setPeriod] = useState('monthly');
  const p = PERIODS.find((x) => x.key === period);
  const pr = t.pricing;
  const names = SITE.plans.map((x) => pr[x.id].name);
  const includes = (k) => (k === 1 ? pr.plus.replace('{p}', names[0]) : k === 2 ? pr.plus2.replace('{a}', names[0]).replace('{b}', names[1]) : null);

  return (
    <section id="pricing" className="section">
      <div className="wrap">
        <header className="head">
          <h2 className="t-headline">{pr.title}</h2>
          <p className="t-intro">{pr.lead}</p>
        </header>

        <div className="mt-10 flex flex-col items-center gap-3">
          <div role="group" aria-label={pr.periodLabel} className="segmented">
            {PERIODS.map((x) => (
              <button key={x.key} type="button" aria-pressed={period === x.key} onClick={() => setPeriod(x.key)} className="seg min-w-[84px]">{pr[x.label]}</button>
            ))}
          </div>
          <p className="t-caption h-5" style={{ color: 'var(--accent)' }}>{p.badge ? pr[p.badge] : ''}</p>
        </div>

        <div className="mt-8 grid items-stretch gap-4 lg:grid-cols-3 lg:gap-5">
          {SITE.plans.map((plan, k) => {
            const info = pr[plan.id];
            const total = plan[period];
            const on = plan.popular;
            return (
              <article
                key={plan.id}
                className="tile relative flex flex-col"
                style={on ? { boxShadow: 'inset 0 0 0 2px var(--accent)' } : undefined}
                aria-label={on ? `${info.name} · ${pr.popular}` : info.name}
              >
                <p className="t-caption h-5 font-semibold" style={{ color: 'var(--accent)' }}>{on ? pr.popular : ''}</p>
                <h3 className="t-title mt-2">{info.name}</h3>
                <p className="muted mt-1 lg:min-h-[2.94em]">{info.subtitle}</p>
                <p className="mt-8 flex flex-wrap items-baseline gap-x-2">
                  <NumberRoll value={Math.round(total / p.months)} className="text-[40px] font-semibold leading-none tracking-tight" />
                  <span className="muted">{currencyLabel(lang)} / {pr.perMonth}</span>
                </p>
                <p className="t-caption mt-2 h-5">{period !== 'monthly' && `${pr.total}: ${formatPrice(total, lang)}`}</p>
                <button type="button" onClick={() => onSelectPlan(plan.id)} className={`${on ? 'btn-primary' : 'btn-secondary'} mt-6 w-full`}>{pr.choose}</button>
                <div className="mt-8 border-t pt-6 text-[15px]" style={{ borderColor: 'var(--hairline)' }}>
                  {includes(k) && <p className="mb-4 font-semibold">{includes(k)}</p>}
                  <ul className="space-y-3">
                    {info.features.map((f, n) => (
                      <li key={f} className="flex gap-2.5">
                        <Check size={16} strokeWidth={2.5} className="mt-[3px] shrink-0" style={{ color: 'var(--accent)' }} aria-hidden="true" />
                        <span>
                          {f}
                          {NEW_FEATURE[plan.id] === n && <span className="ml-2 align-baseline text-[13px] font-semibold" style={{ color: 'var(--accent)' }}>{pr.isNew}</span>}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
