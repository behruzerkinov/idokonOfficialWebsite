import React from 'react';
import { Store, ShoppingCart, ShoppingBag, Globe, UtensilsCrossed } from 'lucide-react';
import { Reveal } from './Reveal';

const ICONS = [Store, ShoppingCart, ShoppingBag, Globe, UtensilsCrossed];

/** A ledger of shop types: heading on the left, hairline rows on the right. Not a card grid. */
export const SectorSolutions = ({ t }) => (
  <section id="sectors" className="section scroll-mt-16">
    <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <h2 className="h2">{t.sectors.title}</h2>
        <p className="lede mt-4 max-w-[34ch]">{t.sectors.lead}</p>
      </div>
      <ul className="border-t" style={{ borderColor: 'var(--line)' }}>
        {ICONS.map((Icon, n) => (
          <Reveal as="li" key={n} className="flex gap-4 border-b border-[var(--line)] py-6">
            <Icon size={22} strokeWidth={1.75} className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            <div>
              <h3 className="font-semibold">{t.sectors[`s${n + 1}`]}</h3>
              <p className="mt-1 text-sm" style={{ color: 'var(--muted)' }}>{t.sectors[`s${n + 1}_desc`]}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </div>
  </section>
);
