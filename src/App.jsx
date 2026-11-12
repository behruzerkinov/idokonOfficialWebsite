import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { Toaster, toast } from 'sonner';
import { translations } from './data/translations';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PartnerMarquee } from './components/PartnerMarquee';
import { TechMarquee } from './components/TechMarquee';
import { TechPreloader } from './components/TechPreloader';
import { EditorialStatement } from './components/EditorialStatement';
import { ValueGrid } from './components/ValueGrid';
import { PosInteractiveShowcase } from './components/PosInteractiveShowcase';
import { SectorSolutions } from './components/SectorSolutions';
import { HardwareMarketplace } from './components/HardwareMarketplace';
import { IntegrationMigration } from './components/IntegrationMigration';
import { PricingCalculator } from './components/PricingCalculator';
import { CourseAcademy } from './components/CourseAcademy';
import { FaqAccordion } from './components/FaqAccordion';
import { ContactConfigurator } from './components/ContactConfigurator';
import { HugeBrandTextSection } from './components/HugeBrandTextSection';
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

  // Windows 10 Settings App Luminous Light Effect
  const [globalMousePos, setGlobalMousePos] = useState({ x: -1000, y: -1000 });
  const [isPointerActive, setIsPointerActive] = useState(false);
  
  useEffect(() => {
    let rafMoveId = null;

    const handlePointerMove = (e) => {
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

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
      if (rafMoveId) cancelAnimationFrame(rafMoveId);
    };
  }, []);

  // Lenis Smooth Scroll Integration (ChainGPT Labs style delayed gentle touch)
  useEffect(() => {
    let lenis;
    try {
      lenis = new Lenis({
        duration: 1.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.8,
        touchMultiplier: 1.5,
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
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''} bg-zinc-50 dark:bg-[#07080a] text-zinc-900 dark:text-zinc-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white transition-colors duration-150 relative overflow-x-hidden`}>
      
      {/* Tech Preloader */}
      <TechPreloader />

      {/* Global Subtle Architectural Grid Background */}
      <div className="pointer-events-none fixed inset-0 z-0 global-grid-bg opacity-40 dark:opacity-20" aria-hidden="true" />

      {/* Ultra-subtle, neutral ambient spotlight (Zero murky green AI slop) */}
      <div
        className="pointer-events-none fixed inset-0 z-20 transition-opacity duration-500"
        style={{
          opacity: isPointerActive ? 1 : 0,
          background: theme === 'dark'
            ? `radial-gradient(600px circle at ${globalMousePos.x}px ${globalMousePos.y}px, rgba(255, 255, 255, 0.03), transparent 65%)`
            : `radial-gradient(500px circle at ${globalMousePos.x}px ${globalMousePos.y}px, rgba(0, 0, 0, 0.02), transparent 60%)`,
        }}
        aria-hidden="true"
      />

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
        
        {/* Section 1: Hero & Tickers */}
        <div className="relative z-10 bg-zinc-50 dark:bg-[#090a0f]">
          <Hero
            t={t}
            onOpenDemo={() => setIsDemoOpen(true)}
            onScrollToTerminal={scrollToTerminal}
            onOpenLightbox={(url, title) => setLightboxData({ url, title })}
          />

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

          <PartnerMarquee t={t} />

          {/* Twain AI Editorial Statement Block (Pain Story) */}
          <EditorialStatement t={t} />
        </div>

        {/* Section 2: Twain AI Pinned Scroll-Driven Storytelling Stage (#features-and-benefits) */}
        <div className="relative z-20 bg-zinc-50/50 dark:bg-[#090a0f]/50">
          <PosInteractiveShowcase
            t={t}
            onOpenLightbox={(url, title) => setLightboxData({ url, title })}
          />
        </div>

        {/* Section 3: Values Bento Grid */}
        <div className="relative z-30 bg-zinc-50 dark:bg-[#090a0f] border-t border-zinc-200/80 dark:border-zinc-800/80">
          <ValueGrid t={t} />
        </div>

        {/* Section 4: Overlapping Sector Solutions */}
        <div className="stack-section z-40">
          <SectorSolutions
            t={t}
            onOpenDemo={() => setIsDemoOpen(true)}
          />
        </div>

        {/* Section 5: Overlapping Hardware Marketplace */}
        <div className="stack-section z-50">
          <HardwareMarketplace
            lang={lang}
            t={t}
            cart={cart}
            onAddToCart={handleAddToCart}
            onOpenSpecsModal={(prod) => setSelectedSpecsProduct(prod)}
            onOpenCart={() => setIsCartOpen(true)}
          />
        </div>

        {/* Section 6: Overlapping Frictionless Migration */}
        <div className="stack-section z-[60]">
          <IntegrationMigration
            t={t}
            onOpenContact={scrollToContact}
          />
        </div>

        {/* Section 7: Overlapping Transparent Pricing */}
        <div className="stack-section z-[70]">
          <PricingCalculator
            t={t}
            lang={lang}
            onSelectPlan={handleSelectPlan}
          />
        </div>

        {/* Section 8: Overlapping Academy Course */}
        <div className="stack-section z-[80]">
          <CourseAcademy
            lang={lang}
            t={t}
            onOpenLightbox={(url, title) => setLightboxData({ url, title })}
          />
        </div>

        {/* Section 9: Overlapping FAQ */}
        <div className="stack-section z-[90]">
          <FaqAccordion
            t={t}
            onScrollToContact={scrollToContact}
          />
        </div>

        {/* Section 10: Contact Configurator */}
        <div className="relative z-[100] bg-zinc-50 dark:bg-[#07080a]">
          <ContactConfigurator
            t={t}
            lang={lang}
          />
        </div>

        {/* Section 11: Monumental Twain-style Huge Text Animation Stage */}
        <div className="relative z-[110]">
          <HugeBrandTextSection
            t={t}
            onOpenDemo={() => setIsDemoOpen(true)}
          />
        </div>

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
