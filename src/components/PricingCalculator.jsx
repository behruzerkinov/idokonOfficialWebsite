import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { SITE, formatPrice } from '../data/site';
import { SectionHead } from './SectionHead';

const PERIODS = [
  { key: 'monthly', label: 'period1', months: 1 },
  { key: '6m', label: 'period6', months: 6, badge: 'badge6' },
  { key: '12m', label: 'period12', months: 12, badge: 'badge12' },
];
const FREE_MONTHS = { monthly: 0, '6m': 1, '12m': 2 }; // 6m = 5 paid + 1 free, 12m = 10 paid + 2 free

export const PricingCalculator = ({ t, lang, onSelectPlan }) => {
  const [period, setPeriod] = useState('monthly');
  const p = PERIODS.find((x) => x.key === period);

  return (
    <section id="pricing" className="section scroll-mt-16">
      <div className="container-page">
        <SectionHead title={t.pricing.title} lead={t.pricing.lead} />

        <div role="group" aria-label={t.pricing.periodLabel} className="mx-auto mb-10 flex max-w-md justify-center gap-2">
          {PERIODS.map((x) => (
            <button
              key={x.key} type="button" aria-pressed={period === x.key} onClick={() => setPeriod(x.key)}
              className={`flex min-h-[44px] flex-1 flex-col items-center justify-center rounded-[10px] px-3 text-sm font-medium transition-colors duration-150 ${
                period === x.key ? 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-zinc-950' : 'border hover:bg-zinc-100 dark:hover:bg-white/10'
              }`}
              style={period === x.key ? undefined : { borderColor: 'var(--line)' }}
            >
              {t.pricing[x.label]}
              {x.badge && <span className="text-[11px] font-normal opacity-90">{t.pricing[x.badge]}</span>}
            </button>
          ))}
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {SITE.plans.map((plan) => {
            const info = t.pricing[plan.id];
            const total = plan[period];
            const perMonth = Math.round(total / p.months);
            return (
              <div key={plan.id} className={`card relative flex flex-col p-6 ${plan.popular ? 'border-emerald-600 ring-1 ring-emerald-600 dark:border-emerald-400 dark:ring-emerald-400' : ''}`}>
                {plan.popular && (
                  <span className="absolute -top-3 left-6 rounded-full bg-emerald-600 px-3 py-0.5 text-xs font-medium text-white dark:bg-emerald-500 dark:text-zinc-950">{t.pricing.popular}</span>
                )}
                <h3 className="text-xl font-semibold">{info.name}</h3>
                <p className="mt-1 text-sm" style={{ color: 'var(--muted)' }}>{info.subtitle}</p>
                <p className="mt-5 text-3xl font-semibold tabular-nums">{formatPrice(perMonth, lang)}</p>
                <p className="text-sm" style={{ color: 'var(--muted)' }}>
                  {t.pricing.perMonth}{period !== 'monthly' && <> · {t.pricing.total}: {formatPrice(total, lang)}</>}
                </p>
                <ul className="mb-6 mt-5 flex-1 space-y-2.5 text-sm">
                  {info.features.map((f) => (
                    <li key={f} className="flex gap-2.5">
                      <Check size={20} strokeWidth={1.75} className="mt-px shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />{f}
                    </li>
                  ))}
                </ul>
                <button type="button" onClick={() => onSelectPlan(plan.id)} className={plan.popular ? 'btn-primary w-full' : 'btn-secondary w-full'}>
                  {t.pricing.choose}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
