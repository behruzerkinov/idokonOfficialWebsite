import React from 'react';
import { SITE, formatPhone } from '../data/site';
import { Reveal } from './Reveal';
import { LeadForm } from './LeadForm';

const Row = ({ code, href, children, external }) => (
  <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="flex min-h-[44px] items-center gap-3 font-bold">
    <span className="flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold" style={{ background: 'var(--accent-bright)', color: '#052e22' }}>{code}</span>
    {children}
  </a>
);

/** Deep panel with contacts on the left, form (or call buttons while offline) on the right. */
export const ContactConfigurator = ({ t, lang, prefill }) => {
  const c = t.contact;
  const handle = (u) => '@' + u.replace(/\/$/, '').split('/').pop();
  return (
    <section id="contact" className="section scroll-mt-16">
      <div className="container-page">
        <Reveal>
          <div className="grid overflow-hidden rounded-3xl lg:grid-cols-[1fr_1fr]" style={{ boxShadow: 'var(--ring), var(--shadow-card)' }}>
            <div className="flex flex-col justify-between gap-10 p-8 md:p-12" style={{ background: 'var(--deep)', color: 'var(--on-deep)' }}>
              <div>
                <span className="eyebrow" style={{ color: 'var(--accent-bright)' }}>{c.eyebrow}</span>
                <h2 className="h2 mt-5">{c.title}</h2>
                <p className="mt-5 max-w-[44ch]" style={{ color: 'var(--on-deep-muted)' }}>{c.lead}</p>
              </div>
              <div className="space-y-1">
                {SITE.phones.map((p) => <Row key={p} code="TL" href={`tel:${p}`}>{formatPhone(p)}</Row>)}
                <Row code="TG" href={SITE.telegram} external>{handle(SITE.telegram)}</Row>
                <Row code="IG" href={SITE.instagram} external>{handle(SITE.instagram)}</Row>
              </div>
            </div>
            <div className="p-8 md:p-12" style={{ background: 'var(--surface)' }}>
              <h3 className="mb-5 text-lg font-bold">{c.formTitle}</h3>
              <LeadForm t={t} lang={lang} type="contact" store plan message defaults={prefill} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
