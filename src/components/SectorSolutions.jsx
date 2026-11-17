import React from 'react';
import { Reveal } from './Reveal';

/** Five ruled cells in one rounded frame. */
export const SectorSolutions = ({ t }) => (
  <section id="users" className="section scroll-mt-16">
    <div className="container-page">
      <Reveal className="mx-auto max-w-3xl text-center">
        <span className="eyebrow eyebrow-center">{t.sectors.eyebrow}</span>
        <h2 className="h2 mt-5">{t.sectors.title}</h2>
        <p className="lede mx-auto mt-5 max-w-[52ch]">{t.sectors.lead}</p>
      </Reveal>
      <Reveal className="mt-12">
        <ul className="grid overflow-hidden rounded-3xl sm:grid-cols-2 lg:grid-cols-5" style={{ boxShadow: 'inset 0 0 0 1px var(--line)' }}>
          {[1, 2, 3, 4, 5].map((n) => (
            <li key={n} className="spot flex min-h-[200px] flex-col justify-between border-b p-6 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:last:border-r-0 lg:[&:nth-child(odd)]:border-r" style={{ borderColor: 'var(--line)' }}>
              <span className="chip-num">0{n}</span>
              <div className="mt-10">
                <h3 className="text-lg font-bold tracking-tight">{t.sectors[`s${n}`]}</h3>
                <p className="mt-1 text-sm" style={{ color: 'var(--muted)' }}>{t.sectors[`s${n}_desc`]}</p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  </section>
);
