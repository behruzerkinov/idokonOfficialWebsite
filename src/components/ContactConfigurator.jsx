import { Phone, Send, Instagram } from './icons';
import { SITE, formatPhone } from '../data/site';
import { LeadForm } from './LeadForm';

const Row = ({ icon: Icon, href, children, external }) => (
  <li>
    <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="flex min-h-[44px] items-center gap-3">
      <Icon size={18} strokeWidth={1.5} className="fg-3" aria-hidden="true" />{children}
    </a>
  </li>
);

/** One card: who to reach on the left, the form (or call buttons while offline) on the right. */
export const ContactConfigurator = ({ t, lang, prefill }) => {
  const c = t.contact;
  const handle = (u) => '@' + u.replace(/\/$/, '').split('/').pop();
  return (
    <section id="contact" className="section">
      <div className="wrap">
        <div className="card grid gap-10 p-6 sm:p-10 lg:grid-cols-2 lg:gap-16 lg:p-12">
          <div>
            <h2 className="t-h2 stop terminus [--stop-x:-48px] sm:[--stop-x:-64px] lg:[--stop-x:-102px]">{c.title}</h2>
            <p className="t-lead mt-4">{c.lead}</p>
            <ul className="mt-8">
              {/* While the form is off, the phones and Telegram are already the buttons on the right */}
              {SITE.leadsEnabled && SITE.phones.map((p) => <Row key={p} icon={Phone} href={`tel:${p}`}><span className="num">{formatPhone(p)}</span></Row>)}
              {SITE.leadsEnabled && <Row icon={Send} href={SITE.telegram} external>{handle(SITE.telegram)}</Row>}
              <Row icon={Instagram} href={SITE.instagram} external>{handle(SITE.instagram)}</Row>
            </ul>
          </div>
          <div>
            <h3 className="t-h3 mb-4">{c.formTitle}</h3>
            <LeadForm t={t} lang={lang} type="contact" store plan message defaults={prefill} />
          </div>
        </div>
      </div>
    </section>
  );
};
