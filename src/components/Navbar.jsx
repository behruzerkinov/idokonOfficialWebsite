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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages = [
    { code: 'uz', short: 'UZ', label: 'O‘zbekcha', flag: '🇺🇿' },
    { code: 'ru', short: 'RU', label: 'Русский', flag: '🇷🇺' },
    { code: 'en', short: 'EN', label: 'English', flag: '🇬🇧' }
  ];

  const currentLanguage = languages.find(l => l.code === lang) || languages[0];

  const navLinks = [
    { href: '#home', label: t.nav.home },
    { href: '#features', label: t.nav.features },
    { href: '#terminal', label: t.nav.terminal },
    { href: '#equipment', label: t.nav.equipment },
    { href: '#integrations', label: t.nav.integrations },
    { href: '#pricing', label: t.nav.pricing },
    { href: '#course', label: t.nav.course },
    { href: '#faq', label: t.nav.faq },
    { href: '#contact', label: t.nav.contact }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-200 foundation-nav py-2.5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          
          {/* Logo & Brand */}
          <a href="#home" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 font-black text-sm shadow-sm group-hover:scale-105 transition-transform">
              <span>ID</span>
              <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
            </div>
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="font-extrabold text-base tracking-tight text-zinc-900 dark:text-zinc-50 group-hover:text-emerald-500 transition-colors">
                IDO'KON
              </span>
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                POS
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links: Strict Single Line */}
          <nav className="hidden xl:flex items-center gap-0.5 flex-shrink-0">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-2.5 py-1.5 rounded-md text-xs font-medium text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
            
            {/* Phone Hotline Link: Single Line */}
            <a 
              href="tel:+998991180999" 
              className="hidden lg:flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors whitespace-nowrap"
              title="Savdo operatori"
            >
              <div className="w-4 h-4 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                <Phone className="w-2.5 h-2.5" />
              </div>
              <span className="font-mono text-xs whitespace-nowrap">+998 99 118 09 99</span>
            </a>

            {/* Dark / Light Mode Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer flex-shrink-0"
              aria-label="Toggle theme"
              title={theme === 'dark' ? "Yorug' rejim" : "Qorong'i rejim"}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-zinc-700" />
              )}
            </button>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer whitespace-nowrap"
                aria-label="Tilni tanlash"
              >
                <span className="text-xs">{currentLanguage.flag}</span>
                <span className="font-mono">{currentLanguage.short}</span>
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
                        <span>{l.flag}</span>
                        <span>{l.label}</span>
                      </span>
                      {lang === l.code && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Hardware Cart Drawer Trigger with Emil Kowalski NumberFlow */}
            <button
              type="button"
              onClick={onOpenCart}
              className="relative p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors cursor-pointer flex-shrink-0"
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
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-950 bg-emerald-500 hover:bg-emerald-400 shadow-sm transition-all duration-150 active:scale-95 whitespace-nowrap cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.nav.tryDemo}</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 cursor-pointer"
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
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-2.5">
            <a 
              href="tel:+998991180999" 
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 text-xs font-semibold font-mono"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-500" />
              <span>+998 99 118 09 99</span>
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
