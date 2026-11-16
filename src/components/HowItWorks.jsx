import React from 'react';
import { SectionHead } from './SectionHead';
import { Reveal } from './Reveal';

export const HowItWorks = ({ t }) => (
  <section className="section">
    <div className="container-page">
      <SectionHead title={t.how.title} lead={t.how.lead} />
      <ol className="grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((n) => (
          <Reveal as="li" key={n} className="card p-7">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--accent-soft)] text-lg font-semibold text-[var(--accent)]" aria-hidden="true">{n}</span>
            <h3 className="mt-5 text-lg font-semibold tracking-tight">{t.how[`s${n}_title`]}</h3>
            <p className="mt-2" style={{ color: 'var(--muted)' }}>{t.how[`s${n}_desc`]}</p>
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
);
