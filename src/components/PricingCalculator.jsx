import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Sparkles, ArrowRight, Gift } from 'lucide-react';
import NumberFlow from '@number-flow/react';
import { EASE_OUT, Reveal, RevealWords, Stagger, StaggerItem } from './Reveal';

const CARD_BASE = 'relative flex h-full cursor-pointer flex-col justify-between rounded-2xl border p-7 transition-[border-color,background-color,transform] duration-300';
const CARD_IDLE = 'border-zinc-200/80 bg-white hover:-translate-y-0.5 hover:border-zinc-300 dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:border-white/[0.15]';
const CARD_SELECTED = 'border-emerald-500 bg-emerald-500/[0.05] dark:bg-emerald-500/[0.08]';
const MUTED_TEXT = 'text-zinc-600 dark:text-zinc-400';

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

  const periodOptions = [
    { key: 'monthly', label: t.pricing.periodMonthly, badge: null },
    { key: '6m', label: t.pricing.period6m, badge: t.pricing.badge1mFree },
    { key: '12m', label: t.pricing.period12m, badge: t.pricing.badge2mFree }
  ];

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
    <section id="pricing" className="section scroll-mt-20">
      <div className="container-page">

        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-4xl text-center">
          <Reveal>
            <span className="eyebrow mb-4">{t.pricing.eyebrow}</span>
          </Reveal>
          <RevealWords as="h2" text={t.pricing.title} className="display-lg text-zinc-950 dark:text-zinc-50" />
          <Reveal as="p" delay={0.15} className={`lede mt-5 ${MUTED_TEXT}`}>
            {t.pricing.lead}
          </Reveal>

          {/* Billing period switcher */}
          <Reveal delay={0.25} className="mt-8 flex justify-center">
            <div
              role="group"
              className="inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-xl border border-zinc-200 bg-zinc-100/70 p-1 dark:border-white/[0.08] dark:bg-white/[0.04]"
            >
              {periodOptions.map((opt) => {
                const isActive = billingPeriod === opt.key;
                return (
                  <button
                    key={opt.key}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setBillingPeriod(opt.key)}
                    className={`inline-flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 sm:px-4 ${
                      isActive
                        ? 'bg-white text-zinc-950 shadow-sm dark:bg-zinc-800 dark:text-white'
                        : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {opt.badge && (
                      <span className="rounded bg-emerald-600 px-1.5 py-px font-mono text-[10px] font-semibold text-white">
                        {opt.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Discount callout: appears for 6m / 12m */}
          {(billingPeriod === '6m' || billingPeriod === '12m') && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
              className="mt-4 flex justify-center"
            >
              <div className="inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-700 whitespace-normal sm:text-sm sm:whitespace-nowrap dark:text-emerald-300">
                <Gift className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  {billingPeriod === '6m'
                    ? (t.pricing?.gift6m || "5 oylik to'lov qiling — 1 oy sovg'a (Jami 6 oy)")
                    : (t.pricing?.gift12m || "10 oylik to'lov qiling — 2 oy sovg'a (Jami 12 oy)")}
                </span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Pricing cards */}
        <Stagger className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
          {plans.map((plan) => {
            const currentPrice = plan.prices[billingPeriod];
            const isSelected = selectedPlanId === plan.id;

            return (
              <StaggerItem key={plan.id} className="h-full">
                <div
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={`${CARD_BASE} ${isSelected ? CARD_SELECTED : CARD_IDLE}`}
                >
                  {/* Popular pill */}
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-emerald-600 px-3.5 py-0.5 text-[11px] font-semibold tracking-tight text-white">
                      <Sparkles className="h-3 w-3 fill-white" aria-hidden="true" />
                      <span>{t.pricing?.mostPopular || "Eng ommabop tarif"}</span>
                    </div>
                  )}

                  <div>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <h3 className="text-2xl font-semibold tracking-[-0.02em] text-zinc-950 dark:text-zinc-50">
                        {plan.name}
                      </h3>
                      {isSelected && (
                        <span className="rounded bg-emerald-600 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-white">
                          {t.pricing?.activeBadge || "Tanlangan"}
                        </span>
                      )}
                    </div>

                    <p className="mb-6 text-xs text-zinc-500 dark:text-zinc-400">
                      {plan.subtitle}
                    </p>

                    {/* Price */}
                    <div className="mb-6 border-b border-zinc-200 pb-6 dark:border-white/[0.08]">
                      <div className="flex items-baseline gap-1 font-mono">
                        <span className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
                          <NumberFlow value={currentPrice} format={{ useGrouping: true }} />
                        </span>
                        <span className="font-sans text-xs text-zinc-500 dark:text-zinc-400">
                          {periodSuffixMap[billingPeriod]?.[currentLang] || periodSuffixMap[billingPeriod]?.uz}
                        </span>
                      </div>

                      <div className="mt-1 font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
                        {billingHintMap[billingPeriod]?.[currentLang] || billingHintMap[billingPeriod]?.uz}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-8 space-y-3">
                      <div className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        {t.pricing?.featuresHeadline || "Tarif imkoniyatlari:"}
                      </div>
                      {plan.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5 text-sm text-zinc-700 dark:text-zinc-300">
                          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                            <Check className="h-2.5 w-2.5" aria-hidden="true" />
                          </span>
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Plan CTA */}
                  <div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPlanId(plan.id);
                        onSelectPlan(plan, billingPeriod);
                      }}
                      className={`${isSelected ? 'btn-primary' : 'btn-secondary'} w-full`}
                    >
                      <span>{t.pricing?.activatePlan || "Tarifni faollashtirish"}</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

      </div>
    </section>
  );
};
