import React, { useEffect, useRef, useState } from 'react';
import { Drawer } from 'vaul';
import { ChevronDown, Menu, Moon, ShoppingBag, Sun, X } from 'lucide-react';
import { SITE } from '../data/site';

const LANGS = [
  { code: 'uz', name: 'O‘zbekcha' },
  { code: 'ru', name: 'Русский' },
  { code: 'en', name: 'English' },
];
// Displacement map for the glass lens: neutral grey in the middle, red/blue ramps at the edges bend the backdrop inward.
const edge = (id, a, b, v) => `<linearGradient id="${id}" ${v ? 'y2="1"' : ''}><stop stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
const LENS = 'data:image/svg+xml,' + encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><defs>${edge('l', '#ff8080', '#808080')}${edge('r', '#808080', '#008080')}${edge('t', '#8080ff', '#808080', 1)}${edge('b', '#808080', '#808000', 1)}</defs>` +
  '<rect width="100" height="100" fill="#808080"/><rect width="7" height="100" fill="url(#l)"/><rect x="93" width="7" height="100" fill="url(#r)"/><rect width="100" height="32" fill="url(#t)" opacity=".7"/><rect y="68" width="100" height="32" fill="url(#b)" opacity=".7"/></svg>'
);
const LINKS = ['home', 'features', 'equipment', 'integrations', 'pricing', 'course', 'contact'];

/** Language picker: one button, a small menu. Closes on pick, outside click and Escape. */
export const LangMenu = ({ lang, setLang, label, up = false }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const off = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    const key = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', off);
    document.addEventListener('keydown', key);
    return () => { document.removeEventListener('pointerdown', off); document.removeEventListener('keydown', key); };
  }, [open]);
  const current = LANGS.find((l) => l.code === lang) || LANGS[0];
  return (
    <div ref={ref} className="relative">
      <button type="button" aria-haspopup="true" aria-expanded={open} aria-label={label} onClick={() => setOpen((o) => !o)} className="btn-outline nav-ctl !gap-2 !px-3.5">
        <span>{current.name}</span>
        <ChevronDown size={16} strokeWidth={2} aria-hidden="true" className={`transition-transform duration-150 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <ul className={`card pop-in absolute right-0 z-10 w-40 overflow-hidden p-1 ${up ? 'bottom-full mb-2' : 'top-full mt-2'}`}>
          {LANGS.map((l) => (
            <li key={l.code}>
              <button type="button" aria-pressed={lang === l.code} onClick={() => { setLang(l.code); setOpen(false); }} className="flex min-h-[40px] w-full items-center rounded-lg px-3 text-left text-sm font-medium aria-pressed:bg-[var(--accent-soft)] aria-pressed:text-[var(--accent)]">
                {l.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export const Navbar = ({ lang, setLang, t, isDark, toggleTheme, cartCount, onOpenCart, onOpenDemo }) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    if (open) document.body.dataset.drawerOpen = '1';
    return () => { delete document.body.dataset.drawerOpen; };
  }, [open]);

  // Scroll spy: the last section whose top has passed the header is the current one
  useEffect(() => {
    const on = () => {
      let cur = LINKS[0];
      for (const id of LINKS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) cur = id;
      }
      setActive(cur);
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  const go = (id) => {
    setOpen(false);
    setTimeout(() => (id === 'home' ? window.scrollTo({ top: 0, behavior: 'smooth' }) : document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })), 50);
  };

  const ThemeBtn = (
    <button type="button" onClick={(e) => toggleTheme(e)} className="icon-btn nav-ctl" aria-label={t.nav.theme}>
      {isDark ? <Sun size={20} strokeWidth={1.75} /> : <Moon size={20} strokeWidth={1.75} />}
    </button>
  );

  return (
    <header className="site-header">
      <svg aria-hidden="true" width="0" height="0" className="absolute">
        <filter id="liquid" primitiveUnits="objectBoundingBox" colorInterpolationFilters="sRGB">
          <feImage href={LENS} x="0" y="0" width="1" height="1" preserveAspectRatio="none" result="map" />
          <feDisplacementMap in="SourceGraphic" in2="map" scale="0.12" xChannelSelector="R" yChannelSelector="B" />
        </filter>
      </svg>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:rounded focus:bg-[var(--surface)] focus:px-3 focus:py-2">{t.skip}</a>

      <div className="flex h-[62px] items-center justify-between gap-3 px-3 sm:px-5">
        <a href="#home" onClick={(e) => { e.preventDefault(); go('home'); }} aria-label="IDO'KON" className="flex shrink-0 items-center">
          <img src={SITE.brand.logo} alt="IDO'KON" width="98" height="30" className="h-9 w-auto" />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-0.5 xl:flex">
          {LINKS.map((id) => (
            <a key={id} href={`#${id}`} aria-current={active === id ? 'true' : undefined} onClick={(e) => { e.preventDefault(); go(id); }} className="nav-link inline-flex h-10 items-center rounded-lg px-3 text-sm font-medium" style={{ color: 'var(--muted)' }}>
              {t.nav[id]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <div className="hidden md:block"><LangMenu lang={lang} setLang={setLang} label={t.nav.language} /></div>
          <div className="hidden md:block">{ThemeBtn}</div>
          {cartCount > 0 && (
            <button type="button" onClick={onOpenCart} className="icon-btn nav-ctl relative" aria-label={`${t.nav.cart}: ${cartCount}`}>
              <ShoppingBag size={20} strokeWidth={1.75} />
              <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold text-white" style={{ background: 'var(--accent)' }}>{cartCount}</span>
            </button>
          )}
          <button type="button" onClick={onOpenDemo} className="btn-deep nav-ctl hidden !px-5 sm:inline-flex">{t.nav.tryDemo}</button>
          <Drawer.Root open={open} onOpenChange={setOpen} direction="right">
            <Drawer.Trigger asChild>
              <button type="button" className="icon-btn nav-ctl xl:hidden" aria-label={t.menu.open}><Menu size={22} strokeWidth={1.75} /></button>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm" />
              <Drawer.Content className="fixed bottom-0 right-0 top-0 z-[95] flex w-[85vw] max-w-sm flex-col bg-[var(--bg)] p-5 text-[var(--fg)] shadow-lg outline-none">
                <Drawer.Title className="sr-only">{t.menu.open}</Drawer.Title>
                <Drawer.Description className="sr-only">{t.menu.open}</Drawer.Description>
                <div className="mb-4 flex justify-end">
                  <button type="button" onClick={() => setOpen(false)} className="icon-btn" aria-label={t.menu.close}><X size={20} strokeWidth={1.75} /></button>
                </div>
                <nav className="flex flex-col" aria-label="Mobile">
                  {LINKS.map((id) => (
                    <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); go(id); }} className="flex min-h-[52px] items-center border-b text-lg font-semibold tracking-tight" style={{ borderColor: 'var(--line)' }}>
                      {t.nav[id]}
                    </a>
                  ))}
                </nav>
                <button type="button" onClick={() => { setOpen(false); onOpenDemo(); }} className="btn-deep mt-5 w-full">{t.nav.tryDemo}</button>
                <div className="mt-6 flex items-center justify-between gap-3">
                  <LangMenu lang={lang} setLang={setLang} label={t.nav.language} up />
                  {ThemeBtn}
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>
      </div>
      <span className="scroll-progress" aria-hidden="true" />
    </header>
  );
};
