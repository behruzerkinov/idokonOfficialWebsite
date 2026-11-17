import React, { useState } from 'react';
import { SITE, formatPrice } from '../data/site';
import { SectionHead } from './SectionHead';
import { PrintLine } from './ReceiptTape';

const PERIODS = [
  { key: 'monthly', label: 'period1', months: 1 },
  { key: '6m', label: 'period6', months: 6, badge: 'badge6' },
  { key: '12m', label: 'period12', months: 12, badge: 'badge12' },
];

/** Each plan is printed as a receipt: name, price per month, total, what is included. */
export const PricingCalculator = ({ t, lang, onSelectPlan }) => {
  const [period, setPeriod] = useState('monthly');
  const p = PERIODS.find((x) => x.key === period);

  return (
    <section id="pricing" className="section scroll-mt-16">
      <div className="container-page">
        <SectionHead title={t.pricing.title} lead={t.pricing.lead} />

        <div role="group" aria-label={t.pricing.periodLabel} className="segmented mx-auto mb-12 flex w-fit max-w-full">
          {PERIODS.map((x) => (
            <button
              key={x.key} type="button" aria-pressed={period === x.key} onClick={() => setPeriod(x.key)}
              className="seg-btn flex min-h-[48px] flex-col items-center justify-center !px-4"
            >
              {t.pricing[x.label]}
              {x.badge && <span className="text-[11px] font-normal text-emerald-700 dark:text-emerald-400">{t.pricing[x.badge]}</span>}
            </button>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-3 md:items-start">
          {SITE.plans.map((plan, n) => {
            const info = t.pricing[plan.id];
            const total = plan[period];
            const perMonth = Math.round(total / p.months);
            return (
              <PrintLine key={plan.id} i={n} className="receipt-plan">
                <div className="receipt !max-w-none flex flex-col">
                  <div className="receipt-row text-[13px] font-bold">
                    <span>{info.name}</span>
                    {plan.popular && <span className="receipt-stamp">{t.pricing.popular}</span>}
                  </div>
                  <p className="receipt-muted mt-1">{info.subtitle}</p>
                  <hr className="receipt-rule" />
                  <p className="receipt-row"><span>{t.pricing.perMonth}</span><span className="font-bold">{formatPrice(perMonth, lang)}</span></p>
                  {period !== 'monthly' && (
                    <p className="receipt-row receipt-total mt-1"><span>{t.pricing.total}</span><span>{formatPrice(total, lang)}</span></p>
                  )}
                  <hr className="receipt-rule" />
                  <ul className="mb-5 flex-1 space-y-1.5">
                    {info.features.map((f) => <li key={f} className="flex gap-2"><span aria-hidden="true">+</span><span>{f}</span></li>)}
                  </ul>
                  <button type="button" onClick={() => onSelectPlan(plan.id)} className={plan.popular ? 'btn-primary w-full' : 'btn-secondary w-full'}>
                    {t.pricing.choose}
                  </button>
                </div>
              </PrintLine>
            );
          })}
        </div>
      </div>
    </section>
  );
};
