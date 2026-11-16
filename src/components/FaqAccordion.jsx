import React from 'react';
import { ChevronDown } from 'lucide-react';
import { SectionHead } from './SectionHead';

export const FaqAccordion = ({ t, onScrollToContact }) => (
  <section id="faq" className="section scroll-mt-16">
    <div className="container-page max-w-3xl">
      <SectionHead title={t.faq.title} lead={t.faq.lead} />
      <div className="card divide-y" style={{ '--tw-divide-opacity': 1 }}>
        {t.faq.items.map((it) => (
          <details key={it.q} className="group border-[color:var(--line)] [&:not(:first-child)]:border-t">
            <summary className="flex min-h-[56px] list-none items-center justify-between gap-4 px-5 py-3 font-medium [&::-webkit-details-marker]:hidden">
              {it.q}
              <ChevronDown size={20} strokeWidth={1.75} className="shrink-0 transition-transform duration-150 group-open:rotate-180" aria-hidden="true" />
            </summary>
            <p className="px-5 pb-5" style={{ color: 'var(--muted)' }}>{it.a}</p>
          </details>
        ))}
      </div>
      <div className="mt-8 text-center">
        <button type="button" onClick={onScrollToContact} className="btn-secondary">{t.faq.ask}</button>
      </div>
    </div>
  </section>
);
