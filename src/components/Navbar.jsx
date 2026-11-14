import React, { useState, useEffect, useRef } from 'react';
import { Drawer } from 'vaul';
import { X, Phone, ShoppingBag, Sun, Moon, ArrowUp } from 'lucide-react';
import NumberFlow from '@number-flow/react';
import { motion, AnimatePresence } from 'motion/react';

const EASE = [0.22, 1, 0.36, 1];

const SECTION_IDS = ['home', 'features', 'terminal', 'equipment', 'integrations', 'pricing', 'course', 'faq', 'contact'];

export const Navbar = ({
  lang,
  setLang,
  t,
  theme,
  toggleTheme,
  cartCount,
  onOpenCart,
  onOpenDemo
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const lockRef = useRef(null);

  // Scroll state: compact + more opaque once the page moves
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setShowTopBtn(y > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll spy; paused briefly after a click so the indicator doesn't flicker
  useEffect(() => {
    const onSpy = () => {
      if (lockRef.current) return;
      if (window.scrollY < 200) return setActiveSection('home');
      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTION_IDS[i]);
        if (el && el.getBoundingClientRect().top <= 220 && el.getBoundingClientRect().bottom > 80) {
          return setActiveSection(SECTION_IDS[i]);
        }
      }
    };
    window.addEventListener('scroll', onSpy, { passive: true });
    onSpy();
    return () => window.removeEventListener('scroll', onSpy);
  }, []);

  const goTo = (e, id) => {
    e.preventDefault();
    setActiveSection(id);
    clearTimeout(lockRef.current);
    lockRef.current = setTimeout(() => { lockRef.current = null; }, 900);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const languages = [
    { code: 'uz', label: "O'zbekcha", short: "O'Z" },
    { code: 'ru', label: 'Русский', short: 'РУ' },
    { code: 'en', label: 'English', short: 'EN' }
  ];

  const navLinks = [
    { id: 'home', label: t.nav.home, num: '01' },
    { id: 'features', label: t.nav.features, num: '02' },
    { id: 'terminal', label: t.nav.terminal, num: '03' },
    { id: 'equipment', label: t.nav.equipment, num: '04' },
    { id: 'integrations', label: t.nav.integrations, num: '05' },
    { id: 'pricing', label: t.nav.pricing, num: '06' },
    { id: 'course', label: t.nav.course, num: '07' },
    { id: 'faq', label: t.nav.faq, num: '08' },
    { id: 'contact', label: t.nav.contact, num: '09' }
  ];

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="fixed inset-x-0 top-3 sm:top-4 z-50 px-3 sm:px-6 pointer-events-none"
      >
        <div
          className={`nav-bar pointer-events-auto mx-auto flex max-w-[1400px] items-center gap-3 rounded-2xl border transition-[padding,background-color,box-shadow] duration-500 ${
            scrolled ? 'nav-bar--scrolled px-2.5 py-1.5' : 'px-3 py-2'
          }`}
        >
          {/* Brand */}
          <a href="#home" onClick={(e) => goTo(e, 'home')} className="flex shrink-0 items-center pl-1.5 pr-2" aria-label="IDOKON">
            <img src="/idokon_logo.webp" alt="IDOKON" className="h-6 w-auto object-contain sm:h-7" />
          </a>

          {/* Desktop links */}
          <nav className="hidden xl:flex min-w-0 flex-1 items-center justify-center gap-1" aria-label="Asosiy">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => goTo(e, link.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`group relative whitespace-nowrap rounded-lg px-2.5 py-1.5 text-[13px] font-medium tracking-tight transition-colors duration-200 2xl:px-3 ${
                    isActive ? 'text-zinc-950 dark:text-white' : 'text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-line"
                      transition={{ duration: 0.5, ease: EASE }}
                      className="absolute inset-x-2.5 -bottom-0.5 h-[2px] rounded-full bg-emerald-500"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right cluster */}
          <div className="ml-auto flex shrink-0 items-center gap-2 xl:ml-0">
            {/* Hotline: ultra-wide only */}
            <a
              href="tel:+998991130999"
              className="hidden min-[1680px]:flex items-center gap-2 whitespace-nowrap px-2 text-xs font-medium text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
            >
              <Phone className="h-3.5 w-3.5 text-emerald-500" />
              <span className="font-mono tabular-nums">+998 99 113 09 99</span>
            </a>

            {/* Language segmented control (desktop) */}
            <div className="nav-segment hidden xl:flex items-center rounded-lg p-0.5" role="group" aria-label="Til">
              {languages.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setLang(l.code)}
                  aria-pressed={lang === l.code}
                  className={`relative rounded-md px-2 py-1 font-mono text-[11px] font-semibold transition-colors duration-200 ${
                    lang === l.code ? 'text-zinc-950 dark:text-white' : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
                  }`}
                >
                  {lang === l.code && (
                    <motion.span
                      layoutId="nav-lang-pill"
                      transition={{ duration: 0.4, ease: EASE }}
                      className="nav-segment-active absolute inset-0 rounded-md"
                    />
                  )}
                  <span className="relative">{l.short}</span>
                </button>
              ))}
            </div>

            {/* Theme */}
            <button
              type="button"
              onClick={toggleTheme}
              className="hidden xl:flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-black/5 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
              aria-label="Mavzuni almashtirish"
              title={theme === 'dark' ? "Yorug' rejim" : "Qorong'i rejim"}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Cart */}
            <button
              type="button"
              onClick={onOpenCart}
              className="relative flex h-8 w-8 items-center justify-center rounded-lg text-zinc-600 transition-colors hover:bg-black/5 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white"
              aria-label={t.nav.cart}
              title={t.nav.cart}
            >
              <ShoppingBag className="h-4 w-4" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-500 px-1 font-mono text-[10px] font-bold text-white">
                  <NumberFlow value={cartCount} />
                </span>
              )}
            </button>

            {/* Primary CTA */}
            <button
              type="button"
              onClick={onOpenDemo}
              className="hidden sm:inline-flex h-8 items-center whitespace-nowrap rounded-lg bg-zinc-950 px-3.5 text-xs font-semibold text-white transition-colors duration-200 hover:bg-emerald-600 dark:bg-white dark:text-zinc-950 dark:hover:bg-emerald-400"
            >
              {t.nav.tryDemo}
            </button>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="xl:hidden flex h-8 w-8 flex-col items-center justify-center gap-[5px] rounded-lg text-zinc-800 transition-colors hover:bg-black/5 dark:text-zinc-200 dark:hover:bg-white/10"
              aria-label={t.menu?.open || 'Menyuni ochish'}
            >
              <span className="block h-px w-4 bg-current" />
              <span className="block h-px w-4 bg-current" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Back to top */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="nav-bar fixed bottom-6 right-5 z-40 flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold text-zinc-800 dark:text-zinc-100 sm:bottom-8 sm:right-8"
            aria-label="Yuqoriga qaytish"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            <span>Top</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <Drawer.Root direction="right" open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm" />
          <Drawer.Content className="fixed bottom-0 right-0 top-0 z-[90] flex w-[86vw] max-w-sm flex-col border-l border-zinc-200 bg-white focus:outline-none dark:border-white/10 dark:bg-[#0a0a0b]">
            <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-white/10">
              <img src="/idokon_logo.webp" alt="IDOKON" className="h-6 w-auto object-contain" />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 hover:bg-black/5 hover:text-zinc-950 dark:hover:bg-white/10 dark:hover:text-white"
                aria-label="Yopish"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center justify-between gap-3 border-b border-zinc-200 px-6 py-3 dark:border-white/10">
              <div className="nav-segment flex items-center rounded-lg p-0.5">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => setLang(l.code)}
                    aria-pressed={lang === l.code}
                    className={`rounded-md px-2.5 py-1 font-mono text-[11px] font-semibold transition-colors ${
                      lang === l.code ? 'nav-segment-active text-zinc-950 dark:text-white' : 'text-zinc-500 dark:text-zinc-400'
                    }`}
                  >
                    {l.short}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={toggleTheme}
                className="flex h-8 items-center gap-2 rounded-lg px-2.5 text-xs font-medium text-zinc-600 hover:bg-black/5 dark:text-zinc-300 dark:hover:bg-white/10"
              >
                {theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
                <span>{theme === 'dark' ? "Yorug'" : 'Tungi'}</span>
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-4">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.id;
                return (
                  <motion.a
                    key={link.id}
                    href={`#${link.id}`}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.05 + i * 0.03 }}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      goTo(e, link.id);
                    }}
                    className={`flex items-center gap-4 rounded-lg px-3 py-2.5 text-[15px] transition-colors ${
                      isActive
                        ? 'font-semibold text-zinc-950 dark:text-white'
                        : 'font-medium text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white'
                    }`}
                  >
                    <span className="w-5 font-mono text-[11px] text-zinc-400 dark:text-zinc-600">{link.num}</span>
                    <span className="flex-1">{link.label}</span>
                    {isActive && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />}
                  </motion.a>
                );
              })}
            </nav>

            <div className="space-y-3 border-t border-zinc-200 px-6 py-5 dark:border-white/10">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDemo();
                }}
                className="w-full rounded-lg bg-zinc-950 py-3 text-sm font-semibold text-white hover:bg-emerald-600 dark:bg-white dark:text-zinc-950 dark:hover:bg-emerald-400"
              >
                {t.nav.tryDemo}
              </button>
              <div className="grid grid-cols-2 gap-2 font-mono text-[11px] tabular-nums text-zinc-600 dark:text-zinc-400">
                <a href="tel:+998991130999" className="flex items-center justify-center gap-1.5 rounded-lg border border-zinc-200 py-2 hover:text-emerald-600 dark:border-white/10 dark:hover:text-emerald-400">
                  <Phone className="h-3 w-3 text-emerald-500" /> 99 113 09 99
                </a>
                <a href="tel:+998953600999" className="flex items-center justify-center gap-1.5 rounded-lg border border-zinc-200 py-2 hover:text-emerald-600 dark:border-white/10 dark:hover:text-emerald-400">
                  <Phone className="h-3 w-3 text-emerald-500" /> 95 360 09 99
                </a>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
};
