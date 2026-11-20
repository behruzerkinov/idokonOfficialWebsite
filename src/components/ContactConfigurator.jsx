import { Phone, Send, Instagram } from './icons';
import { SITE, formatPhone } from '../data/site';
import { LeadForm } from './LeadForm';

const Row = ({ icon: Icon, href, children, external }) => (
  <li>
    <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="flex min-h-[44px] items-center gap-3 text-[17px]">
      <Icon size={18} strokeWidth={1.75} className="muted" aria-hidden="true" />{children}
    </a>
  </li>
);

/** One tile: who to reach on the left, the form (or call buttons while offline) on the right. */
export const ContactConfigurator = ({ t, lang, prefill }) => {
  const c = t.contact;
  const handle = (u) => '@' + u.replace(/\/$/, '').split('/').pop();
  return (
    <section id="contact" className="section section-alt">
      <div className="wrap">
        <div className="tile grid gap-10 lg:grid-cols-2 lg:gap-16 lg:!p-14">
          <div>
            <h2 className="t-headline">{c.title}</h2>
            <p className="t-intro mt-5">{c.lead}</p>
            <ul className="mt-8">
              {/* While the form is off, the phones and Telegram are already the buttons on the right */}
              {SITE.leadsEnabled && SITE.phones.map((p) => <Row key={p} icon={Phone} href={`tel:${p}`}>{formatPhone(p)}</Row>)}
              {SITE.leadsEnabled && <Row icon={Send} href={SITE.telegram} external>{handle(SITE.telegram)}</Row>}
              <Row icon={Instagram} href={SITE.instagram} external>{handle(SITE.instagram)}</Row>
            </ul>
          </div>
          <div className="lg:pt-2">
            <h3 className="t-title mb-5">{c.formTitle}</h3>
            <LeadForm t={t} lang={lang} type="contact" store plan message defaults={prefill} />
          </div>
        </div>
      </div>
    </section>
  );
};
