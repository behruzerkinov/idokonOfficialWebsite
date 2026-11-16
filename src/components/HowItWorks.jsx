import React from 'react';
import { SectionHead } from './SectionHead';
import { Reveal } from './Reveal';

export const HowItWorks = ({ t }) => (
  <section className="section">
    <div className="container-page">
      <SectionHead title={t.how.title} lead={t.how.lead} />
      <ol className="grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((n) => (
          <Reveal as="li" key={n} className="card p-6">
            <span className="text-5xl font-semibold text-emerald-600 dark:text-emerald-400" aria-hidden="true">{n}</span>
            <h3 className="mt-3 text-lg font-semibold">{t.how[`s${n}_title`]}</h3>
            <p className="mt-2" style={{ color: 'var(--muted)' }}>{t.how[`s${n}_desc`]}</p>
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
);
