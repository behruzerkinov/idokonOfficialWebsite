import { Phone, Plus } from 'lucide-react';
import { SITE, formatPhone } from '../data/site';
import { Reveal } from './Reveal';

/** Left: heading and a call-centre button. Right: ruled list of questions, the first one open. */
export const FaqAccordion = ({ t }) => (
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
          {t.faq.items.map((it, n) => (
            <details key={it.q} name="faq" open={n === 0} className="group border-b" style={{ borderColor: 'var(--line)' }}>
              <summary className="flex min-h-[64px] list-none items-center justify-between gap-4 py-4 font-bold [&::-webkit-details-marker]:hidden">
                {it.q}
                <span className="chip-num shrink-0 transition-transform duration-200 group-open:rotate-45" aria-hidden="true"><Plus size={16} strokeWidth={2.5} /></span>
              </summary>
              <p className="pb-5 pr-12 text-[15px]" style={{ color: 'var(--muted)' }}>{it.a}</p>
            </details>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);
