import { useState } from 'react';
import { Phone, Plus } from 'lucide-react';
import { SITE, formatPhone } from '../data/site';
import { Reveal } from './Reveal';

/**
 * Emil Kowalski signature accordion:
 * Butter-smooth height spring transition using CSS grid-template-rows 0fr -> 1fr,
 * subtle content slide-fade, and spring-rotated icon with active tactile feedback.
 */
export const FaqAccordion = ({ t }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="section section-alt">
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
        <Reveal>
          <span className="eyebrow">{t.faq.eyebrow}</span>
          <h2 className="h2 mt-5">{t.faq.title}</h2>
          <p className="lede mt-5 max-w-[40ch]">{t.faq.lead}</p>
          <a href={`tel:${SITE.phones[0]}`} className="btn-primary mt-8 !min-h-[48px] whitespace-normal !px-6">
            <Phone size={18} strokeWidth={2} aria-hidden="true" />{t.faq.ask}
            <span className="hidden font-medium opacity-80 sm:inline">· {formatPhone(SITE.phones[0])}</span>
          </a>
        </Reveal>
        <Reveal delay={1}>
          <div className="border-t" style={{ borderColor: 'var(--line)' }}>
            {t.faq.items.map((it, n) => {
              const isOpen = openIndex === n;
              return (
                <div key={it.q} className="border-b" style={{ borderColor: 'var(--line)' }}>
                  <button
                    type="button"
                    id={`faq-question-${n}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${n}`}
                    onClick={() => toggle(n)}
                    className="flex min-h-[64px] w-full items-center justify-between gap-4 py-4 text-left font-bold transition-[color,transform] duration-200 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                    style={{ color: isOpen ? 'var(--fg)' : 'color-mix(in oklab, var(--fg) 90%, var(--muted))' }}
                  >
                    <span className="text-base sm:text-lg tracking-tight leading-snug">{it.q}</span>
                    <span
                      className={`chip-num shrink-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isOpen ? 'rotate-45 !bg-[var(--accent)] !text-[var(--accent-ink)] shadow-sm' : ''
                      }`}
                      aria-hidden="true"
                    >
                      <Plus size={16} strokeWidth={2.5} />
                    </span>
                  </button>
                  <div
                    id={`faq-answer-${n}`}
                    role="region"
                    aria-labelledby={`faq-question-${n}`}
                    className="ek-accordion-content"
                    data-state={isOpen ? 'open' : 'closed'}
                  >
                    <div className="ek-accordion-inner">
                      <p className="ek-accordion-body">
                        {it.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
