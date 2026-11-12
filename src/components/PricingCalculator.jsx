import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck, Gift } from 'lucide-react';
import NumberFlow from '@number-flow/react';

export const PricingCalculator = ({ t, lang = 'uz', onSelectPlan }) => {
  const [billingPeriod, setBillingPeriod] = useState('monthly'); // 'monthly' | '6m' | '12m'
  const [selectedPlanId, setSelectedPlanId] = useState('pro'); // Interactive active plan state

  const currentLang = ['uz', 'ru', 'en'].includes(lang) ? lang : 'uz';

  const periodSuffixMap = {
    monthly: { uz: "so'm / oy", ru: "сум / мес", en: "UZS / mo" },
    '6m': { uz: "so'm / 6 oy", ru: "сум / 6 мес", en: "UZS / 6 mo" },
    '12m': { uz: "so'm / yil", ru: "сум / год", en: "UZS / yr" }
  };

  const billingHintMap = {
    monthly: { uz: "Oylik to'lov", ru: "Ежемесячная оплата", en: "Billed monthly" },
    '6m': { uz: "5 oy to'lanadi + 1 oy bepul", ru: "5 мес оплата + 1 мес бесплатно", en: "Pay 5 months + 1 month free" },
    '12m': { uz: "10 oy to'lanadi + 2 oy bepul", ru: "10 мес оплата + 2 мес бесплатно", en: "Pay 10 months + 2 months free" }
  };

  const plans = [
    {
      id: 'start',
      name: t.pricing.start.name,
      subtitle: t.pricing.start.subtitle,
      prices: {
        monthly: 100000,
        '6m': 500000,
        '12m': 1000000
      },
      popular: false,
      features: t.pricing.start.features
    },
    {
      id: 'standard',
      name: t.pricing.standard.name,
      subtitle: t.pricing.standard.subtitle,
      prices: {
        monthly: 150000,
        '6m': 750000,
        '12m': 1500000
      },
      popular: true,
      features: t.pricing.standard.features
    },
    {
      id: 'premium',
      name: t.pricing.premium.name,
      subtitle: t.pricing.premium.subtitle,
      prices: {
        monthly: 250000,
        '6m': 1250000,
        '12m': 2500000
      },
      popular: false,
      features: t.pricing.premium.features
    }
  ];

  return (
    <section id="pricing" className="py-28 sm:py-36 lg:py-44 bg-transparent text-zinc-900 dark:text-zinc-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-mono font-medium uppercase tracking-wider mb-4">
            <span>{t.pricing.eyebrow}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-zinc-950 dark:text-zinc-50 tracking-[-0.025em] leading-[1.08]">
            {t.pricing.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-normal">
            {t.pricing.lead}
          </p>

          {/* 3-Way Period Switcher with Emil Kowalski style pills */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex-nowrap justify-center gap-1 max-w-full overflow-x-auto">
              
              {/* 1 Month */}
              <button
                type="button"
                onClick={() => setBillingPeriod('monthly')}
                className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  billingPeriod === 'monthly'
                    ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {t.pricing.periodMonthly}
              </button>

              {/* 6 Months (5 paid + 1 free) */}
              <button
                type="button"
                onClick={() => setBillingPeriod('6m')}
                className={`relative px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  billingPeriod === '6m'
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                <span>{t.pricing.period6m}</span>
                <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono font-bold ${
                  billingPeriod === '6m' ? 'bg-slate-950 text-white' : 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                }`}>
                  {t.pricing.badge1mFree}
                </span>
              </button>

              {/* 12 Months (10 paid + 2 free) */}
              <button
                type="button"
                onClick={() => setBillingPeriod('12m')}
                className={`relative px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  billingPeriod === '12m'
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                <span>{t.pricing.period12m}</span>
                <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono font-bold ${
                  billingPeriod === '12m' ? 'bg-slate-950 text-white' : 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                }`}>
                  {t.pricing.badge2mFree}
                </span>
              </button>

            </div>
          </div>

          {/* Discount callout note: adaptive 1-line badge */}
          {(billingPeriod === '6m' || billingPeriod === '12m') && (
            <div className="mt-3.5 flex justify-center w-full">
              <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs sm:text-sm font-medium text-emerald-600 dark:text-emerald-400 animate-in fade-in whitespace-normal sm:whitespace-nowrap max-w-full shadow-xs">
                <Gift className="w-4 h-4 shrink-0 text-emerald-500" />
                <span>
                  {billingPeriod === '6m' 
                    ? (t.pricing?.gift6m || "5 oylik to'lov qiling — 1 oy sovg'a (Jami 6 oy)") 
                    : (t.pricing?.gift12m || "10 oylik to'lov qiling — 2 oy sovg'a (Jami 12 oy)")}
                </span>
              </div>
            </div>
          )}

        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => {
            const currentPrice = plan.prices[billingPeriod];
            const isSelected = selectedPlanId === plan.id;
            
            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlanId(plan.id)}
                className={`rounded-2xl p-7 flex flex-col justify-between transition-all duration-200 relative cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-500/[0.12] dark:bg-emerald-950/60 border-2 border-emerald-500 shadow-xl ring-2 ring-emerald-500/30'
                    : 'bg-white dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md'
                }`}
              >
                {/* Popular Pill */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-emerald-500 text-white font-semibold text-[11px] tracking-tight shadow-sm flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 fill-white" />
                    <span>{t.pricing?.mostPopular || "Eng ommabop tarif"}</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-serif font-normal text-2xl text-zinc-900 dark:text-zinc-50">
                      {plan.name}
                    </h3>
                    {isSelected && (
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                        {t.pricing?.activeBadge || "Tanlangan"}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
                    {plan.subtitle}
                  </p>

                  {/* Price with Emil Kowalski NumberFlow */}
                  <div className="mb-6 pb-6 border-b border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-baseline gap-1 font-mono">
                      <span className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
                        <NumberFlow value={currentPrice} format={{ useGrouping: true }} />
                      </span>
                      <span className="text-xs font-normal text-zinc-500 dark:text-zinc-400 font-sans">
                        {periodSuffixMap[billingPeriod]?.[currentLang] || periodSuffixMap[billingPeriod]?.uz}
                      </span>
                    </div>

                    <div className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-1 font-mono">
                      {billingHintMap[billingPeriod]?.[currentLang] || billingHintMap[billingPeriod]?.uz}
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
                      {t.pricing?.featuresHeadline || "Tarif imkoniyatlari:"}
                    </div>
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-zinc-700 dark:text-zinc-300">
                        <div className="w-4 h-4 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span className="leading-tight">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Plan Action CTA */}
                <div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPlanId(plan.id);
                      onSelectPlan(plan, billingPeriod);
                    }}
                    className={`w-full py-3 rounded-lg text-xs font-bold transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md font-extrabold'
                        : 'bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100'
                    }`}
                  >
                    <span>{t.pricing?.activatePlan || "Tarifni faollashtirish"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
