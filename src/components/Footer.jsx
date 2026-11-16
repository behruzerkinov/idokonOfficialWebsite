import React from 'react';
import { Phone, Send } from 'lucide-react';
import { SITE, formatPhone } from '../data/site';
import { LangSwitch } from './Navbar';

const LINKS = ['features', 'equipment', 'pricing', 'support', 'contact'];

export const Footer = ({ t, lang, setLang }) => (
  <footer className="border-t py-12" style={{ borderColor: 'var(--line)' }}>
    <div className="container-page grid gap-8 md:grid-cols-3">
      <div>
        <img src="/idokon_logo.webp" alt="IDO'KON" width="120" height="37" loading="lazy" className="h-7 w-auto" />
        <p className="mt-3 max-w-xs text-sm" style={{ color: 'var(--muted)' }}>{t.footer.about}</p>
      </div>
      <nav aria-label={t.footer.menu}>
        <h2 className="mb-2 font-semibold">{t.footer.menu}</h2>
        <ul>
          {LINKS.map((id) => (
            <li key={id}><a href={`#${id}`} className="inline-flex min-h-[40px] items-center text-sm hover:underline" style={{ color: 'var(--muted)' }}>{t.nav[id]}</a></li>
          ))}
        </ul>
      </nav>
      <div>
        <h2 className="mb-2 font-semibold">{t.footer.contacts}</h2>
        <ul className="space-y-1 text-sm">
          {SITE.phones.map((p) => (
            <li key={p}><a href={`tel:${p}`} className="inline-flex min-h-[40px] items-center gap-2 hover:underline"><Phone size={20} strokeWidth={1.75} aria-hidden="true" />{formatPhone(p)}</a></li>
          ))}
          <li><a href={SITE.telegram} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[40px] items-center gap-2 hover:underline"><Send size={20} strokeWidth={1.75} aria-hidden="true" />Telegram</a></li>
          <li style={{ color: 'var(--muted)' }}>{t.footer.location}</li>
        </ul>
        <div className="mt-4"><LangSwitch lang={lang} setLang={setLang} label={t.nav.language} /></div>
      </div>
    </div>
    <div className="container-page mt-10 flex flex-col gap-1 text-sm sm:flex-row sm:justify-between" style={{ color: 'var(--muted)' }}>
      <p>© {new Date().getFullYear()} IDO'KON. {t.footer.rights}</p>
      <p>{t.footer.built}</p>
    </div>
  </footer>
);
