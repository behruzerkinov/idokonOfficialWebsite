import React from 'react';
import { Phone, Send } from 'lucide-react';
import { SITE, formatPhone } from '../data/site';
import { SectionHead } from './SectionHead';
import { LeadForm } from './LeadForm';

export const ContactConfigurator = ({ t, lang, prefill }) => (
  <section id="contact" className="section scroll-mt-16" style={{ background: 'var(--surface)' }}>
    <div className="container-page">
      <SectionHead title={t.contact.title} lead={t.contact.lead} />
      <div className={`mx-auto grid gap-8 ${SITE.leadsEnabled ? 'max-w-4xl md:grid-cols-[2fr_3fr]' : 'max-w-md'}`}>
        {SITE.leadsEnabled && <div className="space-y-2">
          <h3 className="font-semibold">{t.contact.callUs}</h3>
          {SITE.phones.map((p) => (
            <a key={p} href={`tel:${p}`} className="flex min-h-[44px] items-center gap-2 text-lg font-medium text-emerald-700 hover:underline dark:text-emerald-400">
              <Phone size={20} strokeWidth={1.75} aria-hidden="true" />{formatPhone(p)}
            </a>
          ))}
          <a href={SITE.telegram} target="_blank" rel="noopener noreferrer" className="flex min-h-[44px] items-center gap-2 text-lg font-medium text-emerald-700 hover:underline dark:text-emerald-400">
            <Send size={20} strokeWidth={1.75} aria-hidden="true" />{t.contact.telegram}
          </a>
        </div>}
        <div className="card p-6">
          <h3 className="mb-4 text-lg font-semibold">{t.contact.formTitle}</h3>
          <LeadForm t={t} lang={lang} type="contact" store plan message defaults={prefill} />
        </div>
      </div>
    </div>
  </section>
);
