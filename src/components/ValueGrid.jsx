import React from 'react';
import { Reveal, RevealWords, Stagger, StaggerItem } from './Reveal';

const STAT_PILL = 'rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[11px] font-medium tabular-nums text-emerald-700 dark:text-emerald-300';
const INDEX_BADGE = 'font-mono text-xs font-medium tabular-nums text-zinc-400 dark:text-zinc-500';
const TAG = 'rounded-full border border-[color:var(--line)] px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-600 dark:text-zinc-400';

export const ValueGrid = ({ t }) => {
  const cards = [
    { n: '01', tag: t.features.f1_tag, title: t.features.f1_title, desc: t.features.f1_desc, left: t.features.f1_stat_left, right: t.features.f1_stat_right },
    { n: '02', tag: t.features.f2_tag, title: t.features.f2_title, desc: t.features.f2_desc, left: t.features.f2_stat_left, right: t.features.f2_stat_right },
    { n: '03', tag: t.features.f3_tag, title: t.features.f3_title, desc: t.features.f3_desc, left: t.features.f3_stat_left, right: t.features.f3_stat_right },
    { n: '04', tag: t.features.f4_tag, title: t.features.f4_title, desc: t.features.f4_desc, left: t.features.f4_stat_left, right: t.features.f4_stat_right },
  ];

  return (
    <section id="features" className="section scroll-mt-20">
      <div className="container-page">

        <div className="mb-14 max-w-3xl">
          <Reveal>
            <span className="eyebrow mb-4">{t.features.eyebrow}</span>
          </Reveal>
          <RevealWords as="h2" text={t.features.title} className="display-lg text-zinc-900 dark:text-zinc-50" />
          <Reveal delay={0.15}>
            <p className="lede mt-5 max-w-[60ch]">{t.features.lead}</p>
          </Reveal>
        </div>

        <Stagger className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {cards.map((card) => (
            <StaggerItem key={card.n} className="h-full">
              <div className="surface surface-lift flex h-full flex-col p-8 sm:p-9">
                <div className="mb-6 flex items-center justify-between">
                  <span className={INDEX_BADGE}>{card.n}</span>
                  <span className={TAG}>{card.tag}</span>
                </div>

                <h3 className="mb-3 font-sans text-xl font-semibold tracking-[-0.02em] text-zinc-900 dark:text-zinc-50 sm:text-2xl">
                  {card.title}
                </h3>

                <p className="mb-6 max-w-[65ch] text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
                  {card.desc}
                </p>

                <div className="mt-auto flex items-center justify-between gap-3 border-t border-[color:var(--line)] pt-4">
                  <span className={STAT_PILL}>{card.left}</span>
                  <span className={STAT_PILL}>{card.right}</span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

      </div>
    </section>
  );
};
