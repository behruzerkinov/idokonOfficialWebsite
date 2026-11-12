import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import { translations } from './data/translations';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PartnerMarquee } from './components/PartnerMarquee';
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

  // Windows 10 Settings App Luminous Light Effect (Reveal Highlight)
  const [globalMousePos, setGlobalMousePos] = useState({ x: -1000, y: -1000 });
  const [isPointerActive, setIsPointerActive] = useState(false);

  useEffect(() => {
    let rafId = null;
    const handlePointerMove = (e) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setGlobalMousePos({ x: e.clientX, y: e.clientY });
        setIsPointerActive(true);
      });
    };

    const handlePointerLeave = () => {
      setIsPointerActive(false);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''} bg-zinc-50 dark:bg-[#090a0f] text-zinc-900 dark:text-zinc-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white transition-colors duration-150 relative overflow-x-hidden`}>
      
      {/* Global Architectural Grid Background (aligned across the whole site) */}
      <div className="pointer-events-none fixed inset-0 z-0 global-grid-bg" aria-hidden="true" />

      {/* Windows 10 Settings App Luminous Light Effect (Global Reveal Spotlight) */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          opacity: isPointerActive ? 1 : 0,
          background: theme === 'dark'
            ? `radial-gradient(650px circle at ${globalMousePos.x}px ${globalMousePos.y}px, rgba(16, 185, 129, 0.08), rgba(16, 185, 129, 0.02) 40%, transparent 70%)`
            : `radial-gradient(550px circle at ${globalMousePos.x}px ${globalMousePos.y}px, rgba(16, 185, 129, 0.06), rgba(16, 185, 129, 0.015) 45%, transparent 70%)`,
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
        
        {/* Hero Section */}
        <Hero
          t={t}
          onOpenDemo={() => setIsDemoOpen(true)}
          onScrollToTerminal={scrollToTerminal}
          onOpenLightbox={(url, title) => setLightboxData({ url, title })}
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
