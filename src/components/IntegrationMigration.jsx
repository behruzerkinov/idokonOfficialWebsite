import React from 'react';
import { Reveal } from './Reveal';

const SYSTEMS = [
  { code: 'MK', name: 'Multikassa', desc: 'mk' },
  { code: 'AR', name: 'Arco', desc: 'ar' },
  { code: 'EI', name: 'E-imzo SMS', desc: 'ei' },
];

/** Left: deep card with three promises. Right: supported systems. */
export const IntegrationMigration = ({ t, onOpenContact }) => {
  const i = t.integrations;
  return (
    <section id="integrations" className="section scroll-mt-16">
      <div className="container-page grid gap-5 lg:grid-cols-2">
        <Reveal>
          <div className="flex h-full flex-col rounded-3xl p-8 md:p-10" style={{ background: 'var(--deep)', color: 'var(--on-deep)' }}>
            <span className="eyebrow" style={{ color: 'var(--accent-bright)' }}>{i.eyebrow}</span>
            <h2 className="h2 mt-5">{i.title}</h2>
            <p className="mt-5 max-w-[48ch]" style={{ color: 'var(--on-deep-muted)' }}>{i.lead}</p>
            <ol className="mt-8 space-y-5">
              {[1, 2, 3].map((n) => (
                <li key={n} className="flex gap-4">
                  <span className="chip-num shrink-0" style={{ background: 'var(--accent-bright)', color: '#052e22' }}>0{n}</span>
                  <div>
                    <h3 className="font-bold">{i[`c${n}_title`]}</h3>
                    <p className="text-sm" style={{ color: 'var(--on-deep-muted)' }}>{i[`c${n}_desc`]}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <Reveal>
          <div className="card h-full p-8 md:p-10">
            <span className="eyebrow">{i.supported}</span>
            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {SYSTEMS.map((s) => (
                <li key={s.code} className="spot rounded-2xl p-4" style={{ background: 'var(--alt)', boxShadow: 'inset 0 0 0 1px var(--line)' }}>
                  <span className="chip-num" style={{ background: 'var(--surface)' }}>{s.code}</span>
                  <h3 className="mt-5 font-bold">{s.name}</h3>
                  <p className="mt-1 text-xs" style={{ color: 'var(--muted)' }}>{i[s.desc]}</p>
                </li>
              ))}
            </ul>
            <ul className="mt-3 grid grid-cols-3 overflow-hidden rounded-2xl text-center text-sm font-bold" style={{ boxShadow: 'inset 0 0 0 1px var(--line)' }}>
              {['Click', 'Payme', 'Uzum'].map((n, k) => <li key={n} className={`py-4 ${k ? 'border-l' : ''}`} style={{ borderColor: 'var(--line)' }}>{n}</li>)}
            </ul>
            <button type="button" onClick={onOpenContact} className="mt-3 block w-full rounded-2xl p-5 text-left" style={{ background: 'var(--accent-soft)' }}>
              <span className="block font-bold" style={{ color: 'var(--accent)' }}>{i.otherTitle}</span>
              <span className="mt-1 block text-sm" style={{ color: 'var(--muted)' }}>{i.otherDesc}</span>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
