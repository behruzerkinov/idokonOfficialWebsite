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
    <section id="pricing" className="section section-alt">
      <div className="wrap">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <header className="head">
            <h2 className="t-h2">{pr.title}</h2>
            <p className="t-lead">{pr.lead}</p>
          </header>
          <div className="flex flex-col items-start gap-2 lg:items-end">
            <div role="group" aria-label={pr.periodLabel} className="segmented">
              {PERIODS.map((x) => (
                <button key={x.key} type="button" aria-pressed={period === x.key} onClick={() => setPeriod(x.key)} className="seg min-w-[76px]">{pr[x.label]}</button>
              ))}
            </div>
            <p className="t-small h-5" style={{ color: 'var(--accent)' }}>{p.badge ? pr[p.badge] : ''}</p>
          </div>
        </div>

        <div className="mt-10 grid items-stretch gap-4 lg:grid-cols-3">
          {SITE.plans.map((plan, k) => {
            const info = pr[plan.id];
            const total = plan[period];
            const on = plan.popular;
            return (
              <article
                key={plan.id}
                className="card relative flex flex-col p-6 sm:p-7"
                style={on ? { boxShadow: 'inset 0 0 0 2px var(--accent)' } : undefined}
                aria-label={on ? `${info.name} · ${pr.popular}` : info.name}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="t-h3">{info.name}</h3>
                  {on && <p className="text-[13px] font-medium" style={{ color: 'var(--accent)' }}>{pr.popular}</p>}
                </div>
                <p className="t-small mt-1 lg:min-h-[3em]">{info.subtitle}</p>
                <p className="mt-6 flex flex-wrap items-baseline gap-x-2">
                  <NumberRoll value={Math.round(total / p.months)} className="text-[36px] font-medium leading-none" />
                  <span className="fg-3 text-[14px]">{currencyLabel(lang)} / {pr.perMonth}</span>
                </p>
                <p className="t-small mt-2 h-5">{period !== 'monthly' && <>{pr.total}: <span className="num">{formatPrice(total, lang)}</span></>}</p>
                <button type="button" onClick={() => onSelectPlan(plan.id)} className={`${on ? 'btn-primary' : 'btn-secondary'} mt-5 w-full`}>{pr.choose}</button>
                <div className="rule mt-7 pt-6 text-[15px]">
                  {includes(k) && <p className="mb-4 font-medium">{includes(k)}</p>}
                  <ul className="space-y-2.5">
                    {info.features.map((f, n) => (
                      <li key={f} className="flex gap-2.5">
                        <Check size={16} strokeWidth={1.75} className="mt-[4px] shrink-0 fg-3" aria-hidden="true" />
                        <span className="fg-2">
                          {f}
                          {NEW_FEATURE[plan.id] === n && <span className="ml-2 text-[13px] font-medium" style={{ color: 'var(--accent)' }}>{pr.isNew}</span>}
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
