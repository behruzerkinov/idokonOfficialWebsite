import { SITE, formatPhone } from '../data/site';

const COLS = (t) => [
  [t.footer.product, [[t.nav.features, '#features'], [t.footer.software, '#software'], [t.nav.equipment, '#equipment'], [t.nav.integrations, '#integrations']]],
  [t.footer.resources, [[t.nav.pricing, '#pricing'], [t.nav.course, '#course'], [t.footer.faq, '#faq']]],
];

/** Quiet, small, complete: like a system footer. */
export const Footer = ({ t, onOpenDemo }) => {
  const link = 'inline-flex min-h-[32px] items-center hover:underline underline-offset-2';
  return (
    <footer className="text-[13px] leading-[1.45]" style={{ background: 'var(--bg-alt)', color: 'var(--muted)' }}>
      <div className="wrap py-12">
        <p className="max-w-[60ch]">{t.footer.about}</p>
        <div className="mt-8 grid grid-cols-2 gap-8 border-t pt-8 md:grid-cols-3" style={{ borderColor: 'var(--hairline)' }}>
          {COLS(t).map(([title, items], k) => (
            <nav key={title} aria-label={title}>
              <h2 className="mb-1.5 font-semibold" style={{ color: 'var(--fg)' }}>{title}</h2>
              <ul>
                {items.map(([label, href]) => <li key={href}><a href={href} className={link}>{label}</a></li>)}
                {k === 1 && <li><button type="button" onClick={onOpenDemo} className={link}>{t.nav.tryDemo}</button></li>}
              </ul>
            </nav>
          ))}
          <nav aria-label={t.footer.support}>
            <h2 className="mb-1.5 font-semibold" style={{ color: 'var(--fg)' }}>{t.footer.support}</h2>
            <ul>
              {SITE.phones.map((p) => <li key={p}><a href={`tel:${p}`} className={link}>{formatPhone(p)}</a></li>)}
              <li><a href={SITE.telegram} target="_blank" rel="noopener noreferrer" className={link}>Telegram</a></li>
              <li><a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className={link}>Instagram</a></li>
              <li><a href="#contact" className={link}>{t.nav.contact}</a></li>
            </ul>
          </nav>
        </div>
        <div className="mt-8 flex flex-col gap-2 border-t pt-6 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: 'var(--hairline)' }}>
          <p>© {new Date().getFullYear()} iDokon. {t.footer.rights}</p>
          <img src="/img/logo-196.webp" alt="iDokon" width="98" height="30" loading="lazy" decoding="async" className="h-6 w-auto self-start sm:self-auto" />
        </div>
      </div>
    </footer>
  );
};
