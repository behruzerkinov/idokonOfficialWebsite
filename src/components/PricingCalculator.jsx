import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { SITE, formatPrice, currencyLabel } from '../data/site';
import { Reveal } from './Reveal';

const PERIODS = [
  { key: 'monthly', label: 'period1', months: 1 },
  { key: '6m', label: 'period6', months: 6, badge: 'badge6' },
  { key: '12m', label: 'period12', months: 12, badge: 'badge12' },
];

export const PricingCalculator = ({ t, lang, onSelectPlan }) => {
  const [period, setPeriod] = useState('monthly');
  const p = PERIODS.find((x) => x.key === period);

  return (
    <section id="pricing" className="section section-alt scroll-mt-16">
      <div className="container-page">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow eyebrow-center">{t.pricing.eyebrow}</span>
          <h2 className="h2 mt-5">{t.pricing.title}</h2>
          <p className="lede mx-auto mt-5 max-w-[52ch]">{t.pricing.lead}</p>
          <div role="group" aria-label={t.pricing.periodLabel} className="segmented mx-auto mt-8 flex w-fit max-w-full">
            {PERIODS.map((x) => (
              <button key={x.key} type="button" aria-pressed={period === x.key} onClick={() => setPeriod(x.key)} className="seg-btn flex min-h-[48px] flex-col items-center justify-center !px-5">
                {t.pricing[x.label]}
                {x.badge && <span className="text-[11px] font-semibold opacity-80">{t.pricing[x.badge]}</span>}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3 md:items-stretch">
          {SITE.plans.map((plan) => {
            const info = t.pricing[plan.id];
            const total = plan[period];
            const perMonth = Math.round(total / p.months);
            const on = plan.popular;
            const muted = on ? 'var(--on-deep-muted)' : 'var(--muted)';
            return (
              <Reveal key={plan.id}>
                <div className="card relative flex h-full flex-col p-8" style={on ? { background: 'var(--deep)', color: 'var(--on-deep)', boxShadow: 'var(--shadow-pop)' } : undefined}>
                  {on && <span className="absolute right-6 top-6 rounded-full px-3 py-1 text-[11px] font-bold tracking-wider" style={{ background: 'var(--accent-bright)', color: '#052e22' }}>{t.pricing.popular.toUpperCase()}</span>}
                  <h3 className="text-2xl font-bold tracking-tight">{info.name}</h3>
                  <p className="mt-1 text-sm" style={{ color: muted }}>{info.subtitle}</p>
                  <p className="mt-8 flex flex-wrap items-baseline gap-x-2 tabular-nums">
                    <span className="text-5xl font-bold tracking-tight">{new Intl.NumberFormat('uz-UZ').format(perMonth)}</span>
                    <span className="text-xs font-medium" style={{ color: muted }}>{formatPrice(0, lang).replace(/^0\s/, '')} / {t.pricing.perMonth}</span>
                  </p>
                  {period !== 'monthly' && <p className="mt-1 text-sm" style={{ color: muted }}>{t.pricing.total}: {formatPrice(total, lang)}</p>}
                  <ul className="mb-8 mt-7 flex-1 space-y-3 border-t pt-6 text-sm" style={{ borderColor: on ? 'rgba(255,255,255,0.14)' : 'var(--line)' }}>
                    {info.features.map((f) => (
                      <li key={f} className="flex gap-2.5">
                        <Check size={18} strokeWidth={2.5} className="mt-px shrink-0" style={{ color: on ? 'var(--accent-bright)' : 'var(--accent)' }} aria-hidden="true" />{f}
                      </li>
                    ))}
                  </ul>
                  <button type="button" onClick={() => onSelectPlan(plan.id)} className={on ? 'btn w-full' : 'btn-outline w-full'} style={on ? { background: 'var(--accent-bright)', color: '#052e22' } : undefined}>
                    {t.pricing.choose}
                  </button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
