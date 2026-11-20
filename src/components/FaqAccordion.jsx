import { ChevronDown, Phone } from './icons';
import { SITE, formatPhone } from '../data/site';

/** Native exclusive accordion (<details name>): keyboard, find-in-page and screen readers work for free. */
export const FaqAccordion = ({ t }) => (
  <section id="faq" className="section">
    <div className="wrap">
      <header className="head">
        <h2 className="t-headline">{t.faq.title}</h2>
        <p className="t-intro">{t.faq.lead}</p>
        <a href={`tel:${SITE.phones[0]}`} className="link mt-5 flex-wrap justify-center gap-x-1.5">
          <Phone size={17} strokeWidth={2} aria-hidden="true" />{t.faq.ask} <span className="whitespace-nowrap">· {formatPhone(SITE.phones[0])}</span>
        </a>
      </header>
      <div className="faq mx-auto mt-[clamp(3rem,6vw,4.5rem)] max-w-[760px] border-t" style={{ borderColor: 'var(--hairline)' }}>
        {t.faq.items.map((it, n) => (
          <details key={it.q} name="faq" open={n === 0} className="border-b" style={{ borderColor: 'var(--hairline)' }}>
            <summary className="flex min-h-[64px] items-center justify-between gap-6 py-5 text-[19px] font-semibold leading-snug tracking-tight">
              {it.q}
              <ChevronDown size={20} strokeWidth={2} className="shrink-0 muted" />
            </summary>
            <p className="muted pb-6 pr-10">{it.a}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);
