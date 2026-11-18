import { ArrowUpRight, Phone, Send } from 'lucide-react';
import { Instagram } from './icons';
import { SITE, formatPhone } from '../data/site';

const COLS = (t) => [
  [t.footer.product, [[t.nav.features, '#features'], [t.footer.software, '#software'], [t.nav.equipment, '#equipment'], [t.nav.integrations, '#integrations']]],
  [t.footer.resources, [[t.nav.pricing, '#pricing'], [t.nav.course, '#course'], [t.footer.faq, '#faq']]],
];

export const Footer = ({ t, onOpenDemo }) => {
  const link = 'inline-flex min-h-[36px] items-center gap-2 text-sm hover:text-white';
  const mute = { color: 'var(--on-deep-muted)' };
  return (
    <footer className="deep-panel mb-3 mt-3" style={{ background: 'var(--deep)', color: 'var(--on-deep)' }}>
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <img src={SITE.brand.logo} alt="iDokon" width="140" height="43" loading="lazy" className="h-11 w-auto" />
          <p className="mt-5 max-w-[34ch] text-sm" style={mute}>{t.footer.about}</p>
        </div>
        {COLS(t).map(([title, items], k) => (
          <nav key={title} aria-label={title}>
            <h2 className="mb-2 text-sm font-bold">{title}</h2>
            <ul>
              {items.map(([label, href]) => <li key={href}><a href={href} className={link} style={mute}>{label}</a></li>)}
              {k === 1 && <li><button type="button" onClick={onOpenDemo} className={link} style={mute}>{t.nav.tryDemo}</button></li>}
            </ul>
          </nav>
        ))}
        <nav aria-label={t.footer.support}>
          <h2 className="mb-2 text-sm font-bold">{t.footer.support}</h2>
          <ul>
            <li><a href={`tel:${SITE.phones[0]}`} className={link} style={mute}><Phone size={15} aria-hidden="true" />{formatPhone(SITE.phones[0])}</a></li>
            <li><a href={SITE.telegram} target="_blank" rel="noopener noreferrer" className={link} style={mute}><Send size={15} aria-hidden="true" />Telegram</a></li>
            <li><a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className={link} style={mute}><Instagram size={15} aria-hidden="true" />Instagram</a></li>
            <li><a href="#contact" className={link} style={mute}>{t.nav.contact}</a></li>
          </ul>
        </nav>
      </div>
      <div className="container-page flex flex-col gap-2 border-t py-6 text-xs sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: 'rgba(255,255,255,0.12)', ...mute }}>
        <p>© {new Date().getFullYear()}. {t.footer.rights}</p>
        <p className="flex gap-4 font-bold">
          <a href={SITE.telegram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-white">Telegram <ArrowUpRight size={12} aria-hidden="true" /></a>
          <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-white">Instagram <ArrowUpRight size={12} aria-hidden="true" /></a>
        </p>
      </div>
    </footer>
  );
};
