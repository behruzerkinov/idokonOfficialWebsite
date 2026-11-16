import { SITE } from '../data/site';
import React, { useEffect, useState } from 'react';
import { Drawer } from 'vaul';
import { ArrowRight, Menu, Moon, ShoppingBag, Sun, X } from 'lucide-react';

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

const PILL_BTN = 'inline-flex h-10 w-10 items-center justify-center rounded-xl text-white/80 transition-colors duration-150 hover:bg-white/10 hover:text-white active:scale-95';

export const Navbar = ({ lang, setLang, t, theme, toggleTheme, cartCount, onOpenCart, onOpenDemo }) => {
  const [open, setOpen] = useState(false);

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
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3">
      <a href="#main" className="pointer-events-auto sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-black">{t.skip}</a>

      {/* Desktop corner controls */}
      <div className="pointer-events-auto absolute right-5 top-3 hidden items-center gap-2 lg:flex">
        <LangSwitch lang={lang} setLang={setLang} label={t.nav.language} />
        {ThemeBtn}
      </div>

      <div className="pointer-events-auto mx-auto w-full max-w-[620px] space-y-1.5">
        <div className="flex h-12 items-center justify-between rounded-2xl bg-black px-3 pl-4 text-white shadow-[0_8px_30px_-12px_rgba(0,0,0,0.5)] dark:bg-[#1c1c1e]">
          <a href="#home" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} aria-label="IDO'KON" className="flex items-center">
            <img src={SITE.brand.logo} alt="IDO'KON" width="98" height="30" className="h-6 w-auto" />
          </a>

          <nav aria-label="Main" className="hidden items-center md:flex">
            {LINKS.map((id) => (
              <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); go(id); }} className="inline-flex h-10 items-center rounded-xl px-2.5 text-[13px] text-white/75 transition-colors duration-150 hover:text-white">
                {t.nav[id]}
              </a>
            ))}
          </nav>

          <div className="flex items-center">
            {cartCount > 0 && (
              <button type="button" onClick={onOpenCart} className={`${PILL_BTN} relative`} aria-label={`${t.nav.cart}: ${cartCount}`}>
                <ShoppingBag size={20} strokeWidth={1.75} />
                <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-500 px-1 text-[10px] font-semibold text-black">{cartCount}</span>
              </button>
            )}
            <Drawer.Root open={open} onOpenChange={setOpen} direction="right">
              <Drawer.Trigger asChild>
                <button type="button" className={`${PILL_BTN} lg:hidden`} aria-label={t.menu.open}><Menu size={20} strokeWidth={1.75} /></button>
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
                      <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); go(id); }} className="flex min-h-[52px] items-center border-b text-xl font-medium tracking-tight" style={{ borderColor: 'var(--line)' }}>
                        {t.nav[id]}
                      </a>
                    ))}
                  </nav>
                  <div className="mt-6 flex items-center justify-between gap-3">
                    <LangSwitch lang={lang} setLang={setLang} label={t.nav.language} />
                    {ThemeBtn}
                  </div>
                </Drawer.Content>
              </Drawer.Portal>
            </Drawer.Root>
          </div>
        </div>

        <button type="button" onClick={onOpenDemo} className="group flex h-11 w-full items-center justify-between rounded-2xl bg-emerald-600 pl-4 pr-1.5 text-sm font-medium text-white transition-[transform,background-color] duration-150 hover:bg-emerald-700 active:scale-[0.99]">
          {t.nav.tryDemo}
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/20"><ArrowRight size={18} strokeWidth={1.75} /></span>
        </button>
      </div>
    </header>
  );
};
