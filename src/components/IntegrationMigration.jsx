import React from 'react';
import {
  ArrowRight, CreditCard, Database, Headphones, Layers,
  RefreshCw, Server, ShieldCheck, ShoppingBag
} from 'lucide-react';
import { Reveal, RevealWords, Stagger, StaggerItem } from './Reveal';

const ICON_TILE = 'flex shrink-0 items-center justify-center border border-zinc-200 bg-zinc-50 text-emerald-600 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-emerald-400';
const BADGE = 'rounded-full border border-zinc-200 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-zinc-600 dark:border-white/[0.08] dark:text-zinc-400';
const MUTED_TEXT = 'text-zinc-600 dark:text-zinc-400';

export const IntegrationMigration = ({ t, onOpenContact }) => {
  const integrationsList = [
    {
      id: 'soliq',
      badge: t.integrations?.badgeTax || "Soliq / Fiskal",
      title: "Davlat Soliq Qo'mitasi",
      desc: "100% rasmiy fiskallashtirish, avtomat QR-kodli cheklar va soliq bazasiga hisobotlar yuborish.",
      icon: Server
    },
    {
      id: 'multikassa',
      badge: "Kassa / Apparat",
      title: "Multikassa & Arca Group",
      desc: "O'zbekistonda keng tarqalgan zamonaviy fiskal apparatlar va kassa printerlari bilan sinxronlash.",
      icon: Layers
    },
    {
      id: 'payments',
      badge: t.integrations?.badgePayments || "To'lov tizimlari",
      title: "Payme, Click & Uzum Pay",
      desc: "Kassada 0.8 soniyada to'lovni tasdiqlash, QR-skanerlash va har qanday bank kartalarini qabul qilish.",
      icon: CreditCard
    },
    {
      id: 'marketplaces',
      badge: "E-tijorat / Ombor",
      title: "Uzum Market & Telegram Bot",
      desc: "Onlayn buyurtmalar va do'koningiz ombor qoldiqlarini real vaqtda bir joyda sinxronlashtirish.",
      icon: ShoppingBag
    }
  ];

  const migrationSteps = [
    { icon: RefreshCw, title: t.integrations.card1_title, desc: t.integrations.card1_desc },
    { icon: ShieldCheck, title: t.integrations.card2_title, desc: t.integrations.card2_desc },
    { icon: Headphones, title: t.integrations.card3_title, desc: t.integrations.card3_desc }
  ];

  return (
    <section id="integrations" className="section scroll-mt-20 border-b border-zinc-200/80 dark:border-white/[0.08]">
      <div className="container-page">

        <div className="mb-12 max-w-3xl">
          <Reveal>
            <span className="eyebrow mb-4">{t.integrations.eyebrow}</span>
          </Reveal>
          <RevealWords as="h2" text={t.integrations.title} className="display-lg text-zinc-950 dark:text-zinc-50" />
          <Reveal as="p" delay={0.15} className={`lede mt-5 ${MUTED_TEXT}`}>
            {t.integrations.lead}
          </Reveal>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Migration showcase */}
          <Reveal className="surface flex flex-col justify-between p-7 sm:p-9 lg:col-span-5">
            <div>
              <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-3.5 py-1 text-xs font-medium text-white">
                <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{t.integrations.zeroDowntime || "Nol to'xtalishli migratsiya"}</span>
              </span>

              <h3 className="display-md mb-7 text-zinc-950 dark:text-zinc-50">
                {t.integrations?.migrationHeadline || "1C yoki Excel bazangizni 1 kunda xatosiz o'tkazib beramiz"}
              </h3>

              <ul className="space-y-6">
                {migrationSteps.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <li key={i} className="flex gap-4">
                      <span className={`${ICON_TILE} h-10 w-10 rounded-xl`}>
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div>
                        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{step.title}</h4>
                        <p className={`mt-1 text-sm leading-relaxed ${MUTED_TEXT}`}>{step.desc}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-8 flex items-center justify-between gap-4 border-t border-zinc-200/80 pt-5 font-mono text-xs text-zinc-500 dark:border-white/[0.08] dark:text-zinc-400">
              <span>{t.integrations.transitionService || "O'tish davri xizmati:"}</span>
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{t.integrations.freeBadge || "100% BEPUL"}</span>
            </div>
          </Reveal>

          {/* Integration cards */}
          <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
            {integrationsList.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.id} className="h-full">
                  <article className="surface surface-lift flex h-full flex-col justify-between p-6">
                    <div>
                      <div className="mb-5 flex items-center justify-between gap-3">
                        <span className={BADGE}>{item.badge}</span>
                        <span className={`${ICON_TILE} h-8 w-8 rounded-full`}>
                          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                      </div>
                      <h4 className="mb-2 text-lg font-semibold tracking-[-0.02em] text-zinc-950 dark:text-zinc-50 sm:text-xl">
                        {item.title}
                      </h4>
                      <p className={`text-sm leading-relaxed ${MUTED_TEXT}`}>{item.desc}</p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-zinc-200/80 pt-4 font-mono text-[11px] text-zinc-500 dark:border-white/[0.08] dark:text-zinc-400">
                      <span>Holat:</span>
                      <span className="flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                        <span>Faol integratsiya</span>
                      </span>
                    </div>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>

        {/* Callout */}
        <Reveal className="surface flex flex-col items-start justify-between gap-6 p-6 sm:p-7 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <span className={`${ICON_TILE} h-12 w-12 rounded-2xl`}>
              <Database className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h4 className="text-lg font-semibold tracking-[-0.02em] text-zinc-950 dark:text-zinc-50 sm:text-xl">
                {t.integrations?.calloutTitle || "Eski bazangiz formatidan qat'i nazar"}
              </h4>
              <p className={`mt-1 text-sm ${MUTED_TEXT}`}>
                {t.integrations?.calloutDesc || "Tovarlar, narxlar va qoldiqlarni to'liq ko'chirib, kassirlaringizni bepul o'qitamiz."}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenContact}
            className="btn-primary shrink-0"
          >
            <span>{t.integrations.contactSpecialist || "Mutaxassis bilan bog'lanish"}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </Reveal>

      </div>
    </section>
  );
};
