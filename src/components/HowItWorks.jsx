import React from 'react';
import { Reveal } from './Reveal';

/** Three numbered steps on one ruled row. */
export const HowItWorks = ({ t }) => (
  <section className="section">
    <div className="container-page">
      <Reveal className="max-w-2xl">
        <h2 className="h2">{t.how.title}</h2>
        <p className="lede mt-5">{t.how.lead}</p>
      </Reveal>
      <ol className="mt-12 grid border-t md:grid-cols-3" style={{ borderColor: 'var(--line)' }}>
        {[1, 2, 3].map((n) => (
          <Reveal as="li" key={n} delay={(n - 1) * 0.1} className="border-b py-8 md:border-b-0 md:pr-8 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:pl-8" style={{ borderColor: 'var(--line)' }}>
            <span className="chip-num">0{n}</span>
            <h3 className="mt-6 text-lg font-bold tracking-tight">{t.how[`s${n}_title`]}</h3>
            <p className="mt-2 text-[15px]" style={{ color: 'var(--muted)' }}>{t.how[`s${n}_desc`]}</p>
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
);
