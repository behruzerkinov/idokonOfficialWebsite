import { useEffect, useRef, useState, useCallback } from 'react';
import { Check, Globe, Menu, Moon, Sun, X } from './icons';
import { scrollToId } from '../lib/scroll';

const LANGS = [
  { code: 'uz', short: 'UZ', name: 'O‘zbekcha' },
  { code: 'ru', short: 'RU', name: 'Русский' },
  { code: 'en', short: 'EN', name: 'English' },
];
const LINKS = ['features', 'equipment', 'integrations', 'pricing', 'course', 'contact'];

/** Language picker: compact trigger, small menu. Closes on pick, outside click and Escape. */
export const LangMenu = ({ lang, setLang, label, up = false, full = false }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const off = (e) => !ref.current?.contains(e.target) && setOpen(false);
    const key = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', off);
    document.addEventListener('keydown', key);
    return () => { document.removeEventListener('pointerdown', off); document.removeEventListener('keydown', key); };
  }, [open]);
  const current = LANGS.find((l) => l.code === lang) || LANGS[0];
  return (
    <div ref={ref} className="relative">
      <button type="button" aria-haspopup="true" aria-expanded={open} onClick={() => setOpen((o) => !o)} className="icon-btn !w-auto gap-1.5 px-2.5 text-[14px]">
        <Globe size={16} strokeWidth={1.5} aria-hidden="true" /><span className="sr-only">{label}: </span>{full ? current.name : current.short}
      </button>
      {open && (
        <ul className={`absolute z-10 w-44 rounded-xl p-1 ${up ? 'bottom-full left-0 mb-2' : 'right-0 top-full mt-1.5'}`} style={{ background: 'var(--card)', boxShadow: 'inset 0 0 0 1px var(--line), var(--shadow-float)' }}>
          {LANGS.map((l) => (
            <li key={l.code}>
              <button type="button" aria-pressed={lang === l.code} onClick={() => { setLang(l.code); setOpen(false); }} className="flex min-h-[40px] w-full items-center justify-between rounded-lg px-3 text-left text-[14px] hover:bg-[var(--raised)]">
                {l.name}{lang === l.code && <Check size={16} strokeWidth={1.75} style={{ color: 'var(--accent)' }} aria-hidden="true" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

/** Scroll spy: the section crossing the upper-middle of the viewport is current.
 * A nav click locks the target as current until that scroll ends, so the highlight
 * does not flicker through every section passed on the way. */
const useActive = () => {
  const [active, setActive] = useState(null);
  const lockedRef = useRef(null);
  const timerRef = useRef(null);

  const lockActive = useCallback((id) => {
    lockedRef.current = id;
    setActive(id);
    clearTimeout(timerRef.current);
    const unlock = () => {
      lockedRef.current = null;
      removeEventListener('scrollend', unlock);
      removeEventListener('wheel', unlock);
      removeEventListener('touchstart', unlock);
    };
    addEventListener('scrollend', unlock, { once: true });
    addEventListener('wheel', unlock, { once: true, passive: true });
    addEventListener('touchstart', unlock, { once: true, passive: true });
    timerRef.current = setTimeout(unlock, 1200);
  }, []);

  useEffect(() => {
    const seen = new Map();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => seen.set(e.target.id, e.isIntersecting));
      if (!lockedRef.current) setActive(LINKS.findLast((id) => seen.get(id)) ?? null);
    }, { rootMargin: '-35% 0px -60% 0px' });
    // Sections below the hero are lazy; observe them as they appear
    const watch = () => LINKS.forEach((id) => {
      const el = document.getElementById(id);
      if (el && !seen.has(id)) { seen.set(id, false); io.observe(el); }
    });
    watch();
    const mo = new MutationObserver(watch);
    const main = document.getElementById('main');
    if (main) mo.observe(main, { childList: true });
    return () => { io.disconnect(); mo.disconnect(); clearTimeout(timerRef.current); };
  }, []);

  return [active, lockActive];
};

export const Navbar = ({ lang, setLang, t, isDark, toggleTheme, onOpenDemo }) => {
  const [active, lockActive] = useActive();
  const menu = useRef(null);

  const nav = (id) => (e) => {
    e.preventDefault();
    menu.current?.close();
    lockActive(id);
    scrollToId(id);
  };
  const Theme = (
    <button type="button" onClick={toggleTheme} className="icon-btn" aria-label={t.nav.theme}>
      {isDark ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
    </button>
  );

  return (
    <header className="site-header">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-lg focus:bg-[var(--card)] focus:px-3 focus:py-2">{t.skip}</a>
      <div className="wrap flex h-full items-center gap-6">
        <a href="#home" onClick={nav('home')} aria-label="iDokon" className="flex shrink-0 items-center">
          <img src="/img/logo-196.webp" alt="iDokon" width="98" height="30" className="h-7 w-auto" />
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="line-map flex items-start">
            {LINKS.map((id) => (
              <li key={id}><a href={`#${id}`} aria-current={active === id ? 'true' : undefined} onClick={nav(id)} className="nav-link">{t.nav[id]}</a></li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1">
          <div className="hidden items-center md:flex">
            <LangMenu lang={lang} setLang={setLang} label={t.nav.language} />
            {Theme}
          </div>
          <button type="button" onClick={onOpenDemo} className="btn-primary btn-sm ml-2 hidden sm:inline-flex">{t.nav.tryDemo}</button>
          <button type="button" className="icon-btn -mr-2 lg:hidden" aria-label={t.menu.open} onClick={() => menu.current?.showModal()}><Menu size={20} strokeWidth={1.5} /></button>
        </div>
      </div>

      <dialog ref={menu} className="menu" aria-label={t.menu.open}>
        <div className="wrap flex h-full flex-col">
          <div className="flex h-[60px] items-center justify-between">
            <img src="/img/logo-196.webp" alt="" width="98" height="30" className="h-7 w-auto" />
            <button type="button" onClick={() => menu.current?.close()} className="icon-btn -mr-2" aria-label={t.menu.close}><X size={20} strokeWidth={1.5} /></button>
          </div>
          <nav className="menu-map mt-6 flex flex-col" aria-label="Mobile">
            {LINKS.map((id) => (
              <a key={id} href={`#${id}`} onClick={nav(id)} aria-current={active === id ? 'true' : undefined} className="flex min-h-[56px] items-center text-[22px] font-medium" style={{ fontFamily: 'var(--font-sign)' }}>{t.nav[id]}</a>
            ))}
          </nav>
          <button type="button" onClick={() => { menu.current?.close(); onOpenDemo(); }} className="btn-primary mt-8 w-full">{t.nav.tryDemo}</button>
          <div className="mt-auto flex items-center justify-between gap-3 pb-6 pt-6">
            <LangMenu lang={lang} setLang={setLang} label={t.nav.language} up full />
            {Theme}
          </div>
        </div>
      </dialog>
    </header>
  );
};
