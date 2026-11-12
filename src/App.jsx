import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { Toaster, toast } from 'sonner';
import { translations } from './data/translations';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PartnerMarquee } from './components/PartnerMarquee';
import { TechMarquee } from './components/TechMarquee';
import { TechPreloader } from './components/TechPreloader';
import { ValueGrid } from './components/ValueGrid';
import { PosInteractiveShowcase } from './components/PosInteractiveShowcase';
import { SectorSolutions } from './components/SectorSolutions';
import { HardwareMarketplace } from './components/HardwareMarketplace';
import { IntegrationMigration } from './components/IntegrationMigration';
import { PricingCalculator } from './components/PricingCalculator';
import { CourseAcademy } from './components/CourseAcademy';
import { FaqAccordion } from './components/FaqAccordion';
import { ContactConfigurator } from './components/ContactConfigurator';
import { Footer } from './components/Footer';

// Modals & Drawers
import { DemoModal } from './components/DemoModal';
import { CartDrawer } from './components/CartDrawer';
import { HardwareSpecsModal } from './components/HardwareSpecsModal';
import { LightboxModal } from './components/LightboxModal';

export function App() {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('site_lang') || 'uz';
    } catch (_) {
      return 'uz';
    }
  });

  const t = translations[lang] || translations.uz;

  const handleSetLang = (newLang) => {
    setLang(newLang);
    try {
      localStorage.setItem('site_lang', newLang);
    } catch (_) {}
  };

  // Theme State (Dark / Light)
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('site_theme') || 'dark';
    } catch (_) {
      return 'dark';
    }
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('site_theme', theme);
    } catch (_) {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Hardware Cart State
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Modals State
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [selectedSpecsProduct, setSelectedSpecsProduct] = useState(null);
  const [lightboxData, setLightboxData] = useState(null);

  // Cart Handlers
  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const handleUpdateCartQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleRemoveFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => setCart([]);

  // Navigation scroll triggers
  const scrollToTerminal = () => {
    document.getElementById('terminal')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectPlan = (plan, cycle) => {
    toast.info(`${plan.name} tarifi tanlandi`, {
      description: "Bepul demo yoki konsultatsiya olishingiz mumkin."
    });
    setIsDemoOpen(true);
  };

  const cartTotalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  // Windows 10 Settings App Luminous Light Effect & Smooth Trailing Follower
  const [globalMousePos, setGlobalMousePos] = useState({ x: -1000, y: -1000 });
  const [isPointerActive, setIsPointerActive] = useState(false);
  
  const targetMouseRef = useRef({ x: -1000, y: -1000 });
  const trailPosRef = useRef({ x: -1000, y: -1000 });
  const trailCircleRef = useRef(null);

  useEffect(() => {
    let rafMoveId = null;
    let rafLoopId = null;

    const handlePointerMove = (e) => {
      targetMouseRef.current = { x: e.clientX, y: e.clientY };
      if (!rafMoveId) {
        rafMoveId = requestAnimationFrame(() => {
          setGlobalMousePos({ x: e.clientX, y: e.clientY });
          setIsPointerActive(true);
          rafMoveId = null;
        });
      }
    };

    const handlePointerLeave = () => {
      setIsPointerActive(false);
    };

    // Smooth inertia interpolation loop for the trailing circle
    const lerp = (start, end, factor) => start + (end - start) * factor;
    const animateTrail = () => {
      trailPosRef.current.x = lerp(trailPosRef.current.x, targetMouseRef.current.x, 0.12);
      trailPosRef.current.y = lerp(trailPosRef.current.y, targetMouseRef.current.y, 0.12);

      if (trailCircleRef.current) {
        trailCircleRef.current.style.transform = `translate3d(${trailPosRef.current.x}px, ${trailPosRef.current.y}px, 0)`;
      }
      rafLoopId = requestAnimationFrame(animateTrail);
    };
    rafLoopId = requestAnimationFrame(animateTrail);

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
      if (rafMoveId) cancelAnimationFrame(rafMoveId);
      if (rafLoopId) cancelAnimationFrame(rafLoopId);
    };
  }, []);

  // Lenis Smooth Scroll Integration (ChainGPT Labs style fluid inertia)
  useEffect(() => {
    let lenis;
    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.8,
      });

      let rafId;
      function raf(time) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);

      return () => {
        if (rafId) cancelAnimationFrame(rafId);
        lenis?.destroy();
      };
    } catch (_) {}
  }, []);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''} bg-zinc-50 dark:bg-[#090a0f] text-zinc-900 dark:text-zinc-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white transition-colors duration-150 relative overflow-x-hidden`}>
      
      {/* ChainGPT Labs Style Cybernetic Preloader */}
      <TechPreloader />

      {/* Global Architectural Grid Background (aligned across the whole site) */}
      <div className="pointer-events-none fixed inset-0 z-0 global-grid-bg" aria-hidden="true" />

      {/* Windows 10 Settings App Luminous Light Effect (Vibrant Global Reveal Spotlight) */}
      <div
        className="pointer-events-none fixed inset-0 z-20 transition-opacity duration-300"
        style={{
          opacity: isPointerActive ? 1 : 0,
          background: theme === 'dark'
            ? `radial-gradient(750px circle at ${globalMousePos.x}px ${globalMousePos.y}px, rgba(16, 185, 129, 0.22), rgba(16, 185, 129, 0.08) 35%, rgba(16, 185, 129, 0.015) 65%, transparent 75%)`
            : `radial-gradient(650px circle at ${globalMousePos.x}px ${globalMousePos.y}px, rgba(16, 185, 129, 0.18), rgba(16, 185, 129, 0.05) 35%, rgba(16, 185, 129, 0.01) 60%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Smooth Trailing Follower Circle */}
      <div
        ref={trailCircleRef}
        className="pointer-events-none fixed top-0 left-0 z-40 transition-opacity duration-300 hidden md:block"
        style={{
          opacity: isPointerActive ? 1 : 0,
          willChange: 'transform',
          marginLeft: '-18px',
          marginTop: '-18px',
        }}
        aria-hidden="true"
      >
        <div className="w-9 h-9 rounded-full border border-emerald-400/80 dark:border-emerald-400/90 bg-emerald-500/15 dark:bg-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.45)] flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,1)]" />
        </div>
      </div>

      {/* Emil Kowalski Sonner Toaster */}
      <Toaster 
        theme={theme} 
        position="top-right" 
        richColors 
        closeButton 
      />

      {/* Sticky Foundation Header */}
      <Navbar
        lang={lang}
        setLang={handleSetLang}
        t={t}
        theme={theme}
        toggleTheme={toggleTheme}
        cartCount={cartTotalItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenDemo={() => setIsDemoOpen(true)}
      />

      <main className="flex-1 relative z-10">
        
        {/* Hero Section */}
        <Hero
          t={t}
          onOpenDemo={() => setIsDemoOpen(true)}
          onScrollToTerminal={scrollToTerminal}
          onOpenLightbox={(url, title) => setLightboxData({ url, title })}
        />

        {/* ChainGPT Labs Style High-Contrast Running Marquee Ticker */}
        <TechMarquee
          items={[
            "NEXT-GEN RETAIL OS",
            "WINDOWS & WEB TERMINAL",
            "1C & EXCEL 1-DAY MIGRATION",
            "REAL-TIME FISCAL SOLIQ INTEGRATION",
            "INSTANT CARD & QR CHECKOUT",
            "250+ ACTIVE ENTERPRISES"
          ]}
        />

        {/* Integration Partners Marquee with Real Vector Logos */}
        <PartnerMarquee t={t} />

        {/* 2x2 Bento Grid Values */}
        <ValueGrid t={t} />

        {/* Software Showcase with Real I-Do'kon Screenshots */}
        <PosInteractiveShowcase
          t={t}
          onOpenLightbox={(url, title) => setLightboxData({ url, title })}
        />

        {/* Target Sectors Solutions Switcher (Physical retail shops only) */}
        <SectorSolutions
          t={t}
          onOpenDemo={() => setIsDemoOpen(true)}
        />

        {/* Hardware Catalog with Carousel Controls & Add to Cart */}
        <HardwareMarketplace
          lang={lang}
          t={t}
          cart={cart}
          onAddToCart={handleAddToCart}
          onOpenSpecsModal={(prod) => setSelectedSpecsProduct(prod)}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* Frictionless Migration & Partner Integrations */}
        <IntegrationMigration
          t={t}
          onOpenContact={scrollToContact}
        />

        {/* Transparent Pricing Matrix with 1m, 6m (5+1), 12m (10+2) */}
        <PricingCalculator
          t={t}
          lang={lang}
          onSelectPlan={handleSelectPlan}
        />

        {/* I-Do'kon Academy & Course with Authentic Screenshots */}
        <CourseAcademy
          lang={lang}
          t={t}
          onOpenLightbox={(url, title) => setLightboxData({ url, title })}
        />

        {/* Interactive FAQ Accordion with Instant Search */}
        <FaqAccordion
          t={t}
          onScrollToContact={scrollToContact}
        />

        {/* Minimalist High-Taste Contact Configurator (No filiallar soni) */}
        <ContactConfigurator
          t={t}
          lang={lang}
        />

        {/* ChainGPT Labs Style Lower Marquee Banner */}
        <TechMarquee
          items={[
            "250+ SHOPS AUTOMATED",
            "0.8s TRANSACTION SPEED",
            "100% SOLIQ COMPLIANT",
            "OFFICIAL HARDWARE & MONOBLOCKS",
            "FREE MIGRATION SERVICE",
            "START IN 10 MINUTES"
          ]}
          speed={45}
        />

      </main>

      {/* Rich Footer with Back to Top Button */}
      <Footer
        t={t}
        onOpenDemo={() => setIsDemoOpen(true)}
      />

      {/* Global Interactive Modals and Drawers */}
      <DemoModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
        t={t}
        lang={lang}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        lang={lang}
        t={t}
      />

      <HardwareSpecsModal
        isOpen={!!selectedSpecsProduct}
        onClose={() => setSelectedSpecsProduct(null)}
        product={selectedSpecsProduct}
        lang={lang}
        t={t}
        onAddToCart={handleAddToCart}
        isInCart={selectedSpecsProduct ? cart.some((i) => i.id === selectedSpecsProduct.id) : false}
      />

      <LightboxModal
        isOpen={!!lightboxData}
        onClose={() => setLightboxData(null)}
        image={lightboxData?.url}
        title={lightboxData?.title}
      />

    </div>
  );
}

export default App;
