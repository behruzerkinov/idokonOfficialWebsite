import { SITE } from '../data/site';
import React, { useEffect, useState } from 'react';
import { Drawer } from 'vaul';
import { Menu, Moon, ShoppingBag, Sun, X } from 'lucide-react';
import { ScrambleText } from './ScrambleText';

const LANGS = [
  { code: 'uz', short: "O'Z" },
  { code: 'ru', short: 'РУ' },
  { code: 'en', short: 'EN' },
];
const LINKS = ['features', 'equipment', 'pricing', 'support', 'contact'];

export const LangSwitch = ({ lang, setLang, label }) => (
  <div role="group" aria-label={label} className="segmented">
    {LANGS.map((l) => (
      <button key={l.code} type="button" onClick={() => setLang(l.code)} aria-pressed={lang === l.code} className="seg-btn min-w-[44px] !px-2">
        {l.short}
      </button>
    ))}
  </div>
);

export const Navbar = ({ lang, setLang, t, theme, toggleTheme, cartCount, onOpenCart, onOpenDemo }) => {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    if (open) document.body.dataset.drawerOpen = '1';
    return () => { delete document.body.dataset.drawerOpen; };
  }, [open]);

  useEffect(() => {
    const on = () => setStuck(window.scrollY > 8);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  const go = (id) => {
    setOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  const ThemeBtn = (
    <button type="button" onClick={toggleTheme} className="icon-btn" aria-label={t.nav.theme}>
      {theme === 'dark' ? <Sun size={20} strokeWidth={1.75} /> : <Moon size={20} strokeWidth={1.75} />}
    </button>
  );

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-[background-color,border-color] duration-200 ${stuck ? 'bg-[color-mix(in_srgb,var(--bg)_88%,transparent)]' : 'bg-[color-mix(in_srgb,var(--bg)_60%,transparent)]'}`} style={{ borderColor: stuck ? 'var(--line)' : 'transparent' }}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:rounded focus:bg-[var(--surface)] focus:px-3 focus:py-2">{t.skip}</a>

      <div className="mx-auto flex h-14 max-w-[1240px] items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#home" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} aria-label="IDO'KON" className="flex shrink-0 items-center">
          <img src={SITE.brand.logo} alt="IDO'KON" width="98" height="30" className="h-7 w-auto" />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-0.5 md:flex">
          {LINKS.map((id) => (
            <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); go(id); }} className="nav-link inline-flex h-9 items-center rounded-md px-3 text-sm" style={{ color: 'var(--muted)' }}>
              <ScrambleText text={t.nav[id]} />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <div className="hidden lg:block"><LangSwitch lang={lang} setLang={setLang} label={t.nav.language} /></div>
          <div className="hidden lg:block">{ThemeBtn}</div>
          {cartCount > 0 && (
            <button type="button" onClick={onOpenCart} className="icon-btn relative" aria-label={`${t.nav.cart}: ${cartCount}`}>
              <ShoppingBag size={20} strokeWidth={1.75} />
              <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-700 px-1 text-[10px] font-semibold text-white">{cartCount}</span>
            </button>
          )}
          <button type="button" onClick={onOpenDemo} className="btn-dark ml-1 hidden !min-h-[36px] !px-3.5 sm:inline-flex">
            <span className="ping" aria-hidden="true" />{t.nav.tryDemo}
          </button>
          <Drawer.Root open={open} onOpenChange={setOpen} direction="right">
            <Drawer.Trigger asChild>
              <button type="button" className="icon-btn lg:hidden" aria-label={t.menu.open}><Menu size={20} strokeWidth={1.75} /></button>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 z-[90] bg-black/40" />
              <Drawer.Content className="fixed bottom-0 right-0 top-0 z-[95] flex w-[85vw] max-w-sm flex-col bg-[var(--bg)] p-5 text-[var(--fg)] shadow-lg outline-none">
                <Drawer.Title className="sr-only">{t.menu.open}</Drawer.Title>
                <Drawer.Description className="sr-only">{t.menu.open}</Drawer.Description>
                <div className="mb-4 flex justify-end">
                  <button type="button" onClick={() => setOpen(false)} className="icon-btn" aria-label={t.menu.close}><X size={20} strokeWidth={1.75} /></button>
                </div>
                <nav className="flex flex-col" aria-label="Mobile">
                  {LINKS.map((id) => (
                    <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); go(id); }} className="flex min-h-[52px] items-center border-b text-lg font-medium tracking-tight" style={{ borderColor: 'var(--line)' }}>
                      {t.nav[id]}
                    </a>
                  ))}
                </nav>
                <button type="button" onClick={() => { setOpen(false); onOpenDemo(); }} className="btn-dark mt-5 w-full">{t.nav.tryDemo}</button>
                <div className="mt-6 flex items-center justify-between gap-3">
                  <LangSwitch lang={lang} setLang={setLang} label={t.nav.language} />
                  {ThemeBtn}
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>
      </div>
    </header>
  );
};
