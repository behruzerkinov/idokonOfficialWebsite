import React, { useState } from 'react';
import { Reveal } from './Reveal';

/** Four numbered cards. The active one is deep teal; it follows hover, focus and tap. */
export const ValueGrid = ({ t }) => {
  const f = t.features;
  const [active, setActive] = useState(1);
  return (
    <section id="features" className="section section-alt scroll-mt-16">
      <div className="container-page">
        <Reveal className="max-w-3xl">
          <span className="eyebrow">{f.eyebrow}</span>
          <h2 className="h2 mt-5">{f.title}</h2>
          <p className="lede mt-5 max-w-[56ch]">{f.lead}</p>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {[1, 2, 3, 4].map((n) => {
            const on = active === n;
            return (
              <Reveal key={n}>
                <article
                  tabIndex={0} onMouseEnter={() => setActive(n)} onFocus={() => setActive(n)} onClick={() => setActive(n)}
                  className="card flex h-full min-h-[260px] flex-col justify-between p-8 outline-none transition-colors duration-300"
                  style={on ? { background: 'var(--deep)', color: 'var(--on-deep)', boxShadow: 'var(--shadow-pop)' } : undefined}
                >
                  <div>
                    <span className="chip-num" style={on ? { background: 'var(--accent-bright)', color: '#052e22' } : undefined}>0{n}</span>
                    <h3 className="mt-10 text-2xl font-bold tracking-tight md:text-3xl">{f[`f${n}_title`]}</h3>
                    <p className="mt-3 max-w-[44ch] text-[15px]" style={{ color: on ? 'var(--on-deep-muted)' : 'var(--muted)' }}>{f[`f${n}_desc`]}</p>
                  </div>
                  <p className="mt-6 text-xs font-bold tracking-[0.12em]" style={{ color: on ? 'var(--accent-bright)' : 'var(--accent)' }}>{f[`f${n}_tag`]}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
