import React from 'react';
import { Store, ShoppingCart, ShoppingBag, Globe, UtensilsCrossed } from 'lucide-react';
import { SectionHead } from './SectionHead';

const ICONS = [Store, ShoppingCart, ShoppingBag, Globe, UtensilsCrossed];

export const SectorSolutions = ({ t }) => (
  <section id="sectors" className="section scroll-mt-16">
    <div className="container-page">
      <SectionHead title={t.sectors.title} lead={t.sectors.lead} />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {ICONS.map((Icon, n) => (
          <li key={n} className="card p-5">
            <Icon size={20} strokeWidth={1.75} className="text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            <h3 className="mt-3 font-semibold">{t.sectors[`s${n + 1}`]}</h3>
            <p className="mt-1 text-sm" style={{ color: 'var(--muted)' }}>{t.sectors[`s${n + 1}_desc`]}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
