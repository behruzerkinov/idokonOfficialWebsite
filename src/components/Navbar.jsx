import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Menu, X, Phone, ShoppingBag, Sparkles, Check, ChevronDown, Sun, Moon 
} from 'lucide-react';
import NumberFlow from '@number-flow/react';
import { motion, AnimatePresence } from 'motion/react';

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
  const [hoveredId, setHoveredId] = useState(null);

  const navRef = useRef(null);
  const linkRefs = useRef({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Liquid bottom bar calculation: measures exact offset and width of active link
  const updateIndicator = useCallback(() => {
    const navEl = navRef.current;
    const linkEl = linkRefs.current[activeSection];
    if (navEl && linkEl) {
      const navRect = navEl.getBoundingClientRect();
      const linkRect = linkEl.getBoundingClientRect();
      setIndicator({
        left: linkRect.left - navRect.left + 6,
        width: Math.max(linkRect.width - 12, 18),
        opacity: 1
      });
    }
  }, [activeSection]);

  useEffect(() => {
    updateIndicator();
    const timer = setTimeout(updateIndicator, 60);
    window.addEventListener('resize', updateIndicator);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateIndicator);
    };
  }, [updateIndicator, lang]);

  // Section Scroll Spy using getBoundingClientRect for sticky stacking sections
  useEffect(() => {
    const sectionIds = ['home', 'features', 'terminal', 'equipment', 'integrations', 'pricing', 'course', 'faq', 'contact'];
    
    const handleScrollSpy = () => {
      const threshold = 220; // viewport threshold from top
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= threshold && rect.bottom > 80) {
            setActiveSection(sectionIds[i]);
            return;
          }
        }
      }
      if (window.scrollY < 200) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy();
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  // Smooth click scroll handler that immediately glides the liquid indicator
  const handleLinkClick = (e, id) => {
    e.preventDefault();
    setActiveSection(id);
    const targetEl = document.getElementById(id);
    if (targetEl) {
      const offset = 80;
      const top = targetEl.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

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

          {/* Center Col: Desktop Navigation Links with Liquid Bottom Bar Animation */}
          <div className="hidden xl:flex items-center justify-center">
            <nav 
              ref={navRef}
              className="relative flex items-center gap-0.5 2xl:gap-1 p-1 rounded-xl bg-zinc-100/70 dark:bg-zinc-900/70 border border-zinc-200/70 dark:border-zinc-800/70 backdrop-blur-md overflow-hidden select-none"
            >
              {/* Liquid Bottom Bar Indicator (Spring-driven fluid glide) */}
              <motion.div
                className="absolute bottom-1 h-[3px] rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-400 shadow-[0_0_12px_rgba(16,185,129,0.85)] pointer-events-none z-10"
                animate={{
                  left: indicator.left,
                  width: indicator.width,
                  opacity: indicator.opacity
                }}
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 28,
                  mass: 0.65
                }}
              />

              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                const isHovered = hoveredId === link.id;

                return (
                  <a
                    key={link.href}
                    ref={(el) => { linkRefs.current[link.id] = el; }}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.id)}
                    onMouseEnter={() => setHoveredId(link.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className={`relative px-2.5 2xl:px-3 py-1.5 rounded-lg text-[11px] 2xl:text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors duration-150 z-20 ${
                      isActive
                        ? 'text-zinc-950 dark:text-white font-bold'
                        : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100'
                    }`}
                  >
                    {/* Distinct Hover Animation: Soft floating pill highlight */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          layoutId="nav-hover-pill"
                          className="absolute inset-0 rounded-lg bg-zinc-200/70 dark:bg-zinc-800/70 -z-10 shadow-xs"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                        />
                      )}
                    </AnimatePresence>

                    <span className="relative z-10">{link.label}</span>
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
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleLinkClick(e, link.id);
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
