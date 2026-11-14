import React, { useState } from 'react';
import { Store, ShoppingCart, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Reveal, RevealWords, Stagger, StaggerItem } from './Reveal';

const FOCUS_RING = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500';

export const SectorSolutions = ({ t, onOpenDemo }) => {
  const [selectedSector, setSelectedSector] = useState(0);

  const sectors = [
    {
      id: "retail",
      title: t.sectors.s1, // Chakana do'konlar
      desc: t.sectors.s1_desc,
      icon: Store,
      features: t.sectors.retailFeatures || [
        "Shtrix-kod skaneri va etiketka printeri bilan to'liq integratsiya",
        "Kiyim-kechak, kosmetika va nooziq-ovqat tovarlar qulay nazorati",
        "Kechki Z-hisobot va kassir inkassatsiyasi"
      ]
    },
    {
      id: "supermarket",
      title: t.sectors.s2, // Supermarketlar
      desc: t.sectors.s2_desc,
      icon: ShoppingCart,
      features: t.sectors.supermarketFeatures || [
        "Bir nechta kassa apparatlarini bir vaqtda tarmoqlash",
        "Elektron savdo tarozilari bilan avtomat sinxronlash",
        "Tezkor navbatlarni bartaraf etish va ommaviy sotuv"
      ]
    },
    {
      id: "minimarket",
      title: t.sectors.s3, // Mini-marketlar
      desc: t.sectors.s3_desc,
      icon: ShoppingBag,
      features: t.sectors.minimarketFeatures || [
        "Tejamkor POS monoblok va planshetda ishlash imkoniyati",
        "Muzlatilgan qoldiqlarni aniqlash va muddat nazorati",
        "Qarz daftari (Nasiya) elektron boshqaruvi"
      ]
    }
  ];

  const active = sectors[selectedSector];

  return (
    <section className="section">
      <div className="container-page">

        <div className="mx-auto mb-14 max-w-3xl text-center">
          <Reveal>
            <span className="eyebrow mb-4">{t.sectors.eyebrow}</span>
          </Reveal>
          <RevealWords as="h2" text={t.sectors.title} className="display-lg text-zinc-900 dark:text-zinc-50" />
          <Reveal delay={0.15}>
            <p className="lede mt-5">{t.sectors.lead}</p>
          </Reveal>
        </div>

        <Stagger className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-3">
          {sectors.map((sec, idx) => {
            const Icon = sec.icon;
            const isSelected = selectedSector === idx;
            return (
              <StaggerItem key={sec.id} className="h-full">
                <button
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedSector(idx)}
                  className={`flex h-full w-full cursor-pointer flex-col rounded-2xl border p-7 text-left transition-[border-color,background-color,transform] duration-500 ease-out hover:-translate-y-0.5 ${FOCUS_RING} ${
                    isSelected
                      ? 'border-emerald-500/50 bg-emerald-500/[0.06] dark:bg-emerald-400/[0.05]'
                      : 'surface border-[color:var(--line)] hover:border-zinc-300 dark:hover:border-white/[0.16]'
                  }`}
                >
                  <div className={`mb-5 flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-500 ${
                    isSelected
                      ? 'bg-emerald-600 text-white'
                      : 'bg-zinc-100 text-emerald-600 dark:bg-white/[0.06] dark:text-emerald-400'
                  }`}>
                    <Icon strokeWidth={isSelected ? 2.25 : 2} className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 font-sans text-xl font-semibold tracking-[-0.02em] text-zinc-900 dark:text-zinc-50 sm:text-2xl">
                    {sec.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {sec.desc}
                  </p>
                </button>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal className="surface flex flex-col items-start justify-between gap-6 p-6 md:flex-row md:items-center sm:p-7">
          <div className="space-y-3">
            <span className="eyebrow">
              {t.sectors?.opportunitiesFor || "Do'koningiz uchun imkoniyatlar:"} {active.title}
            </span>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-1">
              {active.features.map((feat, fIdx) => (
                <li key={fIdx} className="flex items-center gap-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 sm:text-sm">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-500" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            onClick={onOpenDemo}
            className={`btn-primary flex-shrink-0 text-xs ${FOCUS_RING}`}
          >
            <span>{t.hero.ctaPrimary}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </Reveal>

      </div>
    </section>
  );
};
