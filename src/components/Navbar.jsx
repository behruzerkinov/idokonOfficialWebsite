import React, { useEffect, useState } from 'react';
import { Drawer } from 'vaul';
import { Menu, Moon, ShoppingBag, Sun, X } from 'lucide-react';

const LANGS = [
  { code: 'uz', short: "O'Z" },
  { code: 'ru', short: 'РУ' },
  { code: 'en', short: 'EN' },
];
const LINKS = ['features', 'equipment', 'pricing', 'support', 'contact'];

export const LangSwitch = ({ lang, setLang, label }) => (
  <div role="group" aria-label={label} className="flex rounded-[10px] border p-0.5" style={{ borderColor: 'var(--line)' }}>
    {LANGS.map((l) => (
      <button
        key={l.code} type="button" onClick={() => setLang(l.code)} aria-pressed={lang === l.code}
        className={`min-h-[40px] min-w-[44px] rounded-lg px-2 text-sm font-medium transition-colors duration-150 ${
          lang === l.code ? 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-zinc-950' : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-white/10'
        }`}
      >
        {l.short}
      </button>
    ))}
  </div>
);

export const Navbar = ({ lang, setLang, t, theme, toggleTheme, cartCount, onOpenCart, onOpenDemo }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    if (open) document.body.dataset.drawerOpen = '1';
    return () => { delete document.body.dataset.drawerOpen; };
  }, [open]);

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
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-[var(--bg)] transition-colors duration-150 ${scrolled ? '' : 'border-transparent'}`}
      style={scrolled ? { borderColor: 'var(--line)' } : undefined}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-black">{t.skip}</a>
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <a href="#home" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} aria-label="IDO'KON" className="flex items-center">
          <img src="/idokon_logo.webp" alt="IDO'KON" width="120" height="37" className="h-7 w-auto" />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {LINKS.map((id) => (
            <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); go(id); }} className="inline-flex min-h-[44px] items-center rounded-[10px] px-3 text-sm font-medium text-zinc-600 transition-colors duration-150 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white">
              {t.nav[id]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <div className="hidden sm:block"><LangSwitch lang={lang} setLang={setLang} label={t.nav.language} /></div>
          <div className="hidden sm:block">{ThemeBtn}</div>
          {cartCount > 0 && (
            <button type="button" onClick={onOpenCart} className="icon-btn relative" aria-label={`${t.nav.cart}: ${cartCount}`}>
              <ShoppingBag size={20} strokeWidth={1.75} />
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-600 px-1 text-[10px] font-semibold text-white">{cartCount}</span>
            </button>
          )}
          <button type="button" onClick={onOpenDemo} className="btn-primary hidden md:inline-flex">{t.nav.tryDemo}</button>

          <Drawer.Root open={open} onOpenChange={setOpen} direction="right">
            <Drawer.Trigger asChild>
              <button type="button" className="icon-btn lg:hidden" aria-label={t.menu.open}><Menu size={20} strokeWidth={1.75} /></button>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 z-[90] bg-black/50" />
              <Drawer.Content className="fixed bottom-0 right-0 top-0 z-[95] flex w-[85vw] max-w-sm flex-col bg-[var(--bg)] p-5 text-[var(--fg)] shadow-lg outline-none">
                <Drawer.Title className="sr-only">{t.menu.open}</Drawer.Title>
                <Drawer.Description className="sr-only">{t.menu.open}</Drawer.Description>
                <div className="mb-4 flex justify-end">
                  <button type="button" onClick={() => setOpen(false)} className="icon-btn" aria-label={t.menu.close}><X size={20} strokeWidth={1.75} /></button>
                </div>
                <nav className="flex flex-col" aria-label="Mobile">
                  {LINKS.map((id) => (
                    <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); go(id); }} className="flex min-h-[48px] items-center border-b text-lg font-medium" style={{ borderColor: 'var(--line)' }}>
                      {t.nav[id]}
                    </a>
                  ))}
                </nav>
                <div className="mt-6 flex items-center justify-between gap-3">
                  <LangSwitch lang={lang} setLang={setLang} label={t.nav.language} />
                  {ThemeBtn}
                </div>
                <button type="button" onClick={() => { setOpen(false); onOpenDemo(); }} className="btn-primary mt-6 w-full">{t.nav.tryDemo}</button>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>
      </div>
    </header>
  );
};
