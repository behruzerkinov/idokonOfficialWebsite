import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Phone, ShoppingBag, Sparkles, Check, ChevronDown, Sun, Moon 
} from 'lucide-react';
import NumberFlow from '@number-flow/react';

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
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Section Scroll Spy to switch tabs smoothly as user scrolls through the page
  useEffect(() => {
    const sectionIds = ['home', 'features', 'terminal', 'equipment', 'integrations', 'pricing', 'course', 'faq', 'contact'];
    
    const handleScrollSpy = () => {
      const scrollPos = window.scrollY + 140; // offset for sticky navbar + header breathing room
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(sectionIds[i]);
            return;
          }
        }
      }
      setActiveSection('home');
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy();
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  // Clean language list without duplicated flag glyphs
  const languages = [
    { code: 'uz', short: 'UZ', label: 'O‘zbekcha' },
    { code: 'ru', short: 'RU', label: 'Русский' },
    { code: 'en', short: 'EN', label: 'English' }
  ];

  const currentLanguage = languages.find(l => l.code === lang) || languages[0];

  const navLinks = [
    { id: 'home', href: '#home', label: t.nav.home },
    { id: 'features', href: '#features', label: t.nav.features },
    { id: 'terminal', href: '#terminal', label: t.nav.terminal },
    { id: 'equipment', href: '#equipment', label: t.nav.equipment },
    { id: 'integrations', href: '#integrations', label: t.nav.integrations },
    { id: 'pricing', href: '#pricing', label: t.nav.pricing },
    { id: 'course', href: '#course', label: t.nav.course },
    { id: 'faq', href: '#faq', label: t.nav.faq },
    { id: 'contact', href: '#contact', label: t.nav.contact }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 foundation-nav py-2 sm:py-2.5 ${
      isScrolled ? 'shadow-md shadow-zinc-950/5 dark:shadow-black/20' : ''
    }`}>
      <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-4 lg:px-6">
        <div className="grid grid-cols-2 xl:grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-3">
          
          {/* Left Col: Logo & Brand */}
          <div className="flex items-center justify-start">
            <a href="#home" className="flex items-center gap-2 flex-shrink-0 group py-1" aria-label="IDO'KON Bosh sahifa">
              <img
                src="/idokon_logo.png"
                alt="IDO'KON"
                className="h-7 sm:h-8.5 w-auto object-contain transition-transform duration-150 group-hover:scale-[1.02]"
              />
            </a>
          </div>

          {/* Center Col: Desktop Navigation Links (True Visual Center) */}
          <div className="hidden xl:flex items-center justify-center">
            <nav className="flex items-center gap-0.5 2xl:gap-1 p-1 rounded-xl bg-zinc-100/60 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/60 backdrop-blur-md">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setActiveSection(link.id)}
                    className={`relative px-2 2xl:px-2.5 py-1.5 rounded-lg text-[11px] 2xl:text-xs font-semibold transition-all duration-150 whitespace-nowrap select-none cursor-pointer ${
                      isActive
                        ? 'bg-white dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 font-bold shadow-xs border border-zinc-200/80 dark:border-zinc-700/80'
                        : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 border border-transparent'
                    }`}
                  >
                    <span className="relative z-10">{link.label}</span>
                    {isActive && (
                      <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-3.5 h-[2px] bg-emerald-500 rounded-full" />
                    )}
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Right Col: Action Bar (Unified h-9 Frame Heights) */}
          <div className="flex items-center justify-end gap-1.5 sm:gap-2 flex-shrink-0">
            
            {/* Phone Hotline Link: shown on ultra-wide screens to ensure CTA never clips */}
            <a 
              href="tel:+998991130999" 
              className="hidden min-[1680px]:flex items-center gap-1.5 h-9 px-3 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors whitespace-nowrap"
              title="Savdo operatori"
            >
              <div className="w-4 h-4 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                <Phone className="w-2.5 h-2.5" />
              </div>
              <span className="font-mono text-xs whitespace-nowrap tabular-nums">+998 99 113 09 99</span>
            </a>

            {/* Dark / Light Mode Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="h-9 w-9 flex items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer flex-shrink-0"
              aria-label="Toggle theme"
              title={theme === 'dark' ? "Yorug' rejim" : "Qorong'i rejim"}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-zinc-700" />
              )}
            </button>

            {/* Language Selector Dropdown: Single Clean Badge */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="h-9 px-3 flex items-center gap-1.5 rounded-lg text-xs font-semibold bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer whitespace-nowrap"
                aria-label="Tilni tanlash"
              >
                <span className="font-mono font-bold tracking-wider">{currentLanguage.short}</span>
                <ChevronDown className="w-3 h-3 text-zinc-400" />
              </button>

              {langDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-36 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 py-1 z-50 backdrop-blur-xl animate-in fade-in duration-100"
                  onClick={() => setLangDropdownOpen(false)}
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => setLang(l.code)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-left transition-colors cursor-pointer ${
                        lang === l.code 
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold' 
                          : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-zinc-200/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                          {l.short}
                        </span>
                        <span>{l.label}</span>
                      </span>
                      {lang === l.code && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Hardware Cart Drawer Trigger with NumberFlow */}
            <button
              type="button"
              onClick={onOpenCart}
              className="h-9 w-9 flex items-center justify-center relative rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors cursor-pointer flex-shrink-0"
              aria-label={t.nav.cart}
              title={t.nav.cart}
            >
              <ShoppingBag className="w-4 h-4 text-emerald-500" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 px-1.5 h-4 rounded-full bg-emerald-500 text-white font-mono font-bold text-[10px] flex items-center justify-center shadow-sm">
                  <NumberFlow value={cartCount} />
                </span>
              )}
            </button>

            {/* Primary Demo CTA Button */}
            <button
              type="button"
              onClick={onOpenDemo}
              className="h-9 px-3.5 inline-flex items-center gap-1.5 rounded-lg text-xs font-bold text-slate-950 bg-emerald-500 hover:bg-emerald-400 shadow-sm transition-all duration-150 active:scale-95 whitespace-nowrap cursor-pointer flex-shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span className="shrink-0">{t.nav.tryDemo}</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden h-9 w-9 flex items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 cursor-pointer"
              aria-label={mobileMenuOpen ? t.menu.close : t.menu.open}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800 px-4 pt-3 pb-6 shadow-xl animate-in fade-in duration-150">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    setActiveSection(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold'
                      : 'text-zinc-700 dark:text-zinc-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
          
          <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-2">
            <a 
              href="tel:+998991130999" 
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 text-xs font-semibold font-mono tabular-nums"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-500" />
              <span>+998 99 113 09 99</span>
            </a>

            <a 
              href="tel:+998953600999" 
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 text-xs font-semibold font-mono tabular-nums"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-500" />
              <span>+998 95 360 09 99</span>
            </a>
            
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemo();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase shadow-sm active:scale-98 transition-transform"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t.nav.tryDemo}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
