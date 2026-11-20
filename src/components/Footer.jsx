import { SITE, formatPhone } from '../data/site';

const COLS = (t) => [
  [t.footer.product, [[t.nav.features, '#features'], [t.footer.software, '#software'], [t.nav.equipment, '#equipment'], [t.nav.integrations, '#integrations']]],
  [t.footer.resources, [[t.nav.pricing, '#pricing'], [t.nav.course, '#course'], [t.footer.faq, '#faq']]],
];

/** Quiet and complete: the logo and one line, then the links in three columns. */
export const Footer = ({ t, onOpenDemo }) => {
  const link = 'inline-flex min-h-[32px] items-center fg-2 transition-colors duration-150 hover:text-[var(--fg)]';
  return (
    <footer className="border-t text-[14px]" style={{ borderColor: 'var(--line)' }}>
      <div className="wrap grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <img src="/img/logo-196.webp" alt="iDokon" width="98" height="30" loading="lazy" decoding="async" className="h-7 w-auto" />
          <p className="fg-3 mt-4 max-w-[36ch]">{t.footer.about}</p>
        </div>
        {COLS(t).map(([title, items], k) => (
          <nav key={title} aria-label={title}>
            <h2 className="mb-2 font-medium">{title}</h2>
            <ul>
              {items.map(([label, href]) => <li key={href}><a href={href} className={link}>{label}</a></li>)}
              {k === 1 && <li><button type="button" onClick={onOpenDemo} className={link}>{t.nav.tryDemo}</button></li>}
            </ul>
          </nav>
        ))}
        <nav aria-label={t.footer.support}>
          <h2 className="mb-2 font-medium">{t.footer.support}</h2>
          <ul>
            {SITE.phones.map((p) => <li key={p}><a href={`tel:${p}`} className={`${link} num`}>{formatPhone(p)}</a></li>)}
            <li><a href={SITE.telegram} target="_blank" rel="noopener noreferrer" className={link}>Telegram</a></li>
            <li><a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className={link}>Instagram</a></li>
            <li><a href="#contact" className={link}>{t.nav.contact}</a></li>
          </ul>
        </nav>
      </div>
      <div className="wrap rule py-6 fg-3">
        <p>© {new Date().getFullYear()} iDokon. {t.footer.rights}</p>
      </div>
    </footer>
  );
};
