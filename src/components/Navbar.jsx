import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Drawer } from 'vaul';
import { 
  X, Phone, ShoppingBag, Sparkles, Check, ChevronDown, Sun, Moon, ArrowRight 
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
  const isManualNavRef = useRef(false);
  const navTimeoutRef = useRef(null);

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

  // Section Scroll Spy with lock to prevent jumping during click navigation
  useEffect(() => {
    const sectionIds = ['home', 'features', 'terminal', 'equipment', 'integrations', 'pricing', 'course', 'faq', 'contact'];
    
    const handleScrollSpy = () => {
      if (isManualNavRef.current) return;

      const threshold = 220;
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

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    isManualNavRef.current = true;
    setActiveSection(id);

    if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
    navTimeoutRef.current = setTimeout(() => {
      isManualNavRef.current = false;
    }, 900);

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const languages = [
    { code: 'uz', label: "O'zbekcha", short: "O'Z" },
    { code: 'ru', label: "Русский", short: "РУ" },
    { code: 'en', label: "English", short: "EN" }
  ];

  const currentLanguage = languages.find(l => l.code === lang) || languages[0];

  const navLinks = [
    { id: 'home', href: '#home', label: t.nav.home, num: '01' },
    { id: 'features', href: '#features', label: t.nav.features, num: '02' },
    { id: 'terminal', href: '#terminal', label: t.nav.terminal, num: '03' },
    { id: 'equipment', href: '#equipment', label: t.nav.equipment, num: '04' },
    { id: 'integrations', href: '#integrations', label: t.nav.integrations, num: '05' },
    { id: 'pricing', href: '#pricing', label: t.nav.pricing, num: '06' },
    { id: 'course', href: '#course', label: t.nav.course, num: '07' },
    { id: 'faq', href: '#faq', label: t.nav.faq, num: '08' },
    { id: 'contact', href: '#contact', label: t.nav.contact, num: '09' }
  ];

  return (
    <>
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 py-2 sm:py-2.5 backdrop-blur-3xl backdrop-saturate-[220%] bg-white/85 dark:bg-[#07080a]/85 border-b border-black/[0.06] dark:border-white/[0.08] relative before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/30 dark:before:via-white/20 before:to-transparent ${
        isScrolled ? 'shadow-xl shadow-black/10 dark:shadow-black/60' : ''
      }`}>
        <div className="w-full max-w-[1680px] mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between xl:grid xl:grid-cols-[1fr_auto_1fr] gap-2 sm:gap-3">
            
            {/* Left Col: Logo & Brand */}
            <div className="flex items-center justify-start flex-shrink-0">
              <a href="#home" className="flex items-center gap-2 group py-1" aria-label="IDO'KON Bosh sahifa">
                <img
                  src="/idokon_logo.png"
                  alt="IDO'KON"
                  className="h-7 sm:h-8.5 w-auto object-contain transition-transform duration-150 group-hover:scale-[1.02]"
                />
              </a>
            </div>

            {/* Center Col: Desktop Navigation Links */}
            <div className="hidden xl:flex items-center justify-center">
              <nav 
                ref={navRef}
                className="relative flex items-center gap-1 2xl:gap-1.5 p-1.5 rounded-2xl bg-zinc-100/80 dark:bg-[#0f1118]/85 border border-zinc-200/90 dark:border-white/[0.1] backdrop-blur-2xl shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.2),0_8px_24px_-4px_rgba(0,0,0,0.35)] select-none overflow-hidden"
              >
                {/* iOS Refraction Top Highlight Line */}
                <div className="absolute inset-x-2 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

                {/* Liquid Bottom Bar Indicator (Spring-driven fluid glide) */}
                <motion.div
                  className="absolute bottom-1 h-[3px] rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-400 shadow-[0_0_14px_rgba(16,185,129,0.9)] pointer-events-none z-10"
                  animate={{
                    left: indicator.left,
                    width: indicator.width,
                    opacity: indicator.opacity
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 420,
                    damping: 30,
                    mass: 0.6
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
                      className={`relative px-3.5 2xl:px-4 py-2 rounded-xl text-[13px] 2xl:text-[14px] font-medium tracking-tight whitespace-nowrap cursor-pointer transition-colors duration-200 z-20 ${
                        isActive
                          ? 'text-zinc-950 dark:text-white font-semibold'
                          : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100'
                      }`}
                    >
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            layoutId="nav-hover-pill"
                            className="absolute inset-0 rounded-xl bg-zinc-200/70 dark:bg-zinc-800/80 -z-10 shadow-xs"
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

            {/* Right Col: Tidy Responsive Action Bar */}
            <div className="flex items-center justify-end gap-2 flex-shrink-0">
              
              {/* Phone Hotline Link: Ultra-wide desktop only */}
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

              {/* Dark / Light Mode Toggle: Desktop only (neatly moved to Drawer on mobile) */}
              <button
                type="button"
                onClick={toggleTheme}
                className="hidden xl:flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer flex-shrink-0"
                aria-label="Toggle theme"
                title={theme === 'dark' ? "Yorug' rejim" : "Qorong'i rejim"}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-zinc-700" />
                )}
              </button>

              {/* Language Selector Dropdown: Desktop only (neatly moved to Drawer on mobile) */}
              <div className="relative hidden xl:block">
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

              {/* Hardware Cart Drawer Trigger */}
              <button
                type="button"
                onClick={onOpenCart}
                className="h-10 w-10 sm:h-9 sm:w-9 flex items-center justify-center relative rounded-xl sm:rounded-lg bg-zinc-100 dark:bg-[#12141c] border border-zinc-200 dark:border-white/[0.08] text-zinc-700 dark:text-zinc-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors cursor-pointer flex-shrink-0"
                aria-label={t.nav.cart}
                title={t.nav.cart}
              >
                <ShoppingBag className="w-4.5 h-4.5 sm:w-4 sm:h-4 text-emerald-500" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 px-1.5 h-4.5 min-w-[18px] rounded-full bg-emerald-500 text-slate-950 font-mono font-extrabold text-[10px] flex items-center justify-center shadow-sm">
                    <NumberFlow value={cartCount} />
                  </span>
                )}
              </button>

              {/* Primary Demo CTA Button (hidden on tiny mobile to keep bar tidy, shown on sm+) */}
              <button
                type="button"
                onClick={onOpenDemo}
                className="hidden sm:inline-flex h-9 px-3.5 items-center gap-1.5 rounded-lg text-xs font-bold text-slate-950 bg-emerald-500 hover:bg-emerald-400 shadow-sm transition-all duration-150 active:scale-95 whitespace-nowrap cursor-pointer flex-shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span className="shrink-0">{t.nav.tryDemo}</span>
              </button>

              {/* Prominent, Touch-Friendly Animated Burger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="xl:hidden h-10 w-10 sm:h-9 sm:w-9 flex flex-col items-center justify-center gap-1.5 rounded-xl sm:rounded-lg bg-zinc-100 dark:bg-[#12141c] border border-zinc-200 dark:border-white/[0.08] text-zinc-800 dark:text-zinc-200 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                aria-label={t.menu?.open || "Menyuni ochish"}
              >
                <span className="w-5 h-0.5 rounded-full bg-current block" />
                <span className="w-5 h-0.5 rounded-full bg-current block" />
                <span className="w-3.5 h-0.5 rounded-full bg-emerald-500 block self-start ml-2.5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Emil Kowalski Vaul Slide-over Drawer for Mobile Menu */}
      <Drawer.Root 
        direction="right" 
        open={mobileMenuOpen} 
        onOpenChange={setMobileMenuOpen}
      >
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/65 backdrop-blur-md z-[80] transition-opacity" />
          <Drawer.Content className="fixed right-0 top-0 bottom-0 z-[90] w-[86vw] max-w-sm bg-white dark:bg-[#0c0e15] border-l border-zinc-200/80 dark:border-white/[0.08] shadow-[0_0_50px_rgba(0,0,0,0.6)] flex flex-col focus:outline-none overflow-hidden">
            
            {/* Left Edge Drag Handle Pill */}
            <div className="w-1.5 h-12 rounded-full bg-zinc-300 dark:bg-zinc-700 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />

            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 pl-6 border-b border-zinc-200/80 dark:border-white/[0.08] bg-zinc-50/50 dark:bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <img
                  src="/idokon_logo.png"
                  alt="IDO'KON"
                  className="h-7 w-auto object-contain"
                />
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  by sales doctor
                </span>
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-white/[0.06] text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Yopish"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Controls Bar: Language & Theme Segmented Controls */}
            <div className="p-3.5 pl-6 border-b border-zinc-200/80 dark:border-white/[0.08] flex items-center justify-between gap-3 bg-zinc-100/50 dark:bg-white/[0.01]">
              
              {/* Segmented Language Switcher */}
              <div className="flex items-center p-1 rounded-xl bg-zinc-200/80 dark:bg-white/[0.05] border border-zinc-200 dark:border-white/[0.06]">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => setLang(l.code)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold font-mono transition-all cursor-pointer ${
                      lang === l.code
                        ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                    }`}
                  >
                    {l.short}
                  </button>
                ))}
              </div>

              {/* Theme Toggle Button */}
              <button
                type="button"
                onClick={toggleTheme}
                className="h-8 px-3 flex items-center gap-2 rounded-xl bg-zinc-200/80 dark:bg-white/[0.05] border border-zinc-200 dark:border-white/[0.06] text-xs font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer transition-colors"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>Yorug'</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-zinc-700" />
                    <span>Tungi</span>
                  </>
                )}
              </button>
            </div>

            {/* Scrollable Navigation Links List */}
            <div className="flex-1 overflow-y-auto p-4 pl-6 space-y-1">
              <div className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest px-3 py-1 mb-1">
                Bo'limlar
              </div>
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
                    className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20'
                        : 'text-zinc-700 dark:text-zinc-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-zinc-100 dark:hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-600">
                        {link.num}
                      </span>
                      <span>{link.label}</span>
                    </div>
                    {isActive ? (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 pl-6 border-t border-zinc-200/80 dark:border-white/[0.08] space-y-3 bg-zinc-50/70 dark:bg-white/[0.02]">
              
              {/* Primary Demo Action Button */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDemo();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/25 active:scale-98 transition-transform cursor-pointer"
              >
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>{t.nav.tryDemo || "Demoni Boshlash"}</span>
              </button>

              {/* Phone Hotlines */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <a 
                  href="tel:+998991130999" 
                  className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-zinc-100 dark:bg-white/[0.04] border border-zinc-200 dark:border-white/[0.06] text-zinc-700 dark:text-zinc-300 text-[11px] font-semibold font-mono tabular-nums hover:text-emerald-500 transition-colors"
                >
                  <Phone className="w-3 h-3 text-emerald-500" />
                  <span>99 113 09 99</span>
                </a>

                <a 
                  href="tel:+998953600999" 
                  className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-zinc-100 dark:bg-white/[0.04] border border-zinc-200 dark:border-white/[0.06] text-zinc-700 dark:text-zinc-300 text-[11px] font-semibold font-mono tabular-nums hover:text-emerald-500 transition-colors"
                >
                  <Phone className="w-3 h-3 text-emerald-500" />
                  <span>95 360 09 99</span>
                </a>
              </div>

              {/* Status footer note */}
              <div className="text-center pt-1 text-[10px] font-mono text-zinc-400 flex items-center justify-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>I-DO'KON Bulutli Platforma · 24/7 Qo'llab-quvvatlash</span>
              </div>
            </div>

          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
};
