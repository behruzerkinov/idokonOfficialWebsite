import { Phone, Plus } from './icons';
import { SITE, formatPhone } from '../data/site';

/** Native exclusive accordion (<details name>); questions the page can't answer go to the call centre. */
export const FaqAccordion = ({ t }) => (
  <section id="faq" className="section section-alt">
    <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
      <header className="head lg:sticky lg:top-24 lg:self-start">
        <h2 className="t-h2">{t.faq.title}</h2>
        <p className="t-lead">{t.faq.lead}</p>
        <a href={`tel:${SITE.phones[0]}`} className="btn-secondary mt-7 whitespace-normal">
          <Phone size={16} strokeWidth={1.5} aria-hidden="true" />{t.faq.ask} <span className="num fg-2 whitespace-nowrap">{formatPhone(SITE.phones[0])}</span>
        </a>
      </header>
      <div className="faq border-b" style={{ borderColor: 'var(--line)' }}>
        {t.faq.items.map((it, n) => (
          <details key={it.q} name="faq" open={n === 0} className="rule">
            <summary className="flex min-h-[64px] items-center justify-between gap-6 py-5 text-[17px] font-medium leading-snug">
              {it.q}
              <Plus size={18} strokeWidth={1.5} className="shrink-0 fg-3" />
            </summary>
            <p className="fg-2 max-w-[60ch] pb-6 pr-8">{it.a}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);
