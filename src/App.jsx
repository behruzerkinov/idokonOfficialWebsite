import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import { translations } from './data/translations';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PartnerMarquee } from './components/PartnerMarquee';
import { TechMarquee } from './components/TechMarquee';
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

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''} bg-[#fbfbfd] dark:bg-[#000000] text-[#1d1d1f] dark:text-[#f5f5f7] flex flex-col font-sans selection:bg-emerald-500 selection:text-white transition-colors duration-200 relative overflow-x-clip`}>
      
      {/* Sonner Toaster */}
      <Toaster 
        theme={theme} 
        position="top-right" 
        richColors 
        closeButton 
      />

      {/* Sticky Apple-style Header */}
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
        <div className="relative z-10 bg-transparent">
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
              "900+ ACTIVE ENTERPRISES"
            ]}
          />

          <PartnerMarquee t={t} />

          {/* Editorial Statement Block */}
          <EditorialStatement t={t} />
        </div>

        {/* Section 2: Pinned Showcase Stage */}
        <div className="relative z-20 bg-zinc-50/50 dark:bg-[#0a0a0c]/60 border-t border-black/[0.04] dark:border-white/[0.06]">
          <PosInteractiveShowcase
            t={t}
            onOpenLightbox={(url, title) => setLightboxData({ url, title })}
          />
        </div>

        {/* Section 3: Values Bento Grid */}
        <div className="relative z-30 bg-[#fbfbfd] dark:bg-[#000000] border-t border-black/[0.04] dark:border-white/[0.06]">
          <ValueGrid t={t} />
        </div>

        {/* Section 4: Sector Solutions */}
        <div className="relative z-40 bg-zinc-50/40 dark:bg-[#0a0a0c]/50 border-t border-black/[0.04] dark:border-white/[0.06]">
          <SectorSolutions
            t={t}
            onOpenDemo={() => setIsDemoOpen(true)}
          />
        </div>

        {/* Section 5: Hardware Marketplace */}
        <div className="relative z-50 bg-[#fbfbfd] dark:bg-[#000000] border-t border-black/[0.04] dark:border-white/[0.06]">
          <HardwareMarketplace
            lang={lang}
            t={t}
            cart={cart}
            onAddToCart={handleAddToCart}
            onOpenSpecsModal={(prod) => setSelectedSpecsProduct(prod)}
            onOpenCart={() => setIsCartOpen(true)}
          />
        </div>

        {/* Section 6: Frictionless Migration */}
        <div className="relative z-[60] bg-zinc-50/40 dark:bg-[#0a0a0c]/50 border-t border-black/[0.04] dark:border-white/[0.06]">
          <IntegrationMigration
            t={t}
            onOpenContact={scrollToContact}
          />
        </div>

        {/* Section 7: Transparent Pricing */}
        <div className="relative z-[70] bg-[#fbfbfd] dark:bg-[#000000] border-t border-black/[0.04] dark:border-white/[0.06]">
          <PricingCalculator
            t={t}
            lang={lang}
            onSelectPlan={handleSelectPlan}
          />
        </div>

        {/* Section 8: Academy Course */}
        <div className="relative z-[80] bg-zinc-50/40 dark:bg-[#0a0a0c]/50 border-t border-black/[0.04] dark:border-white/[0.06]">
          <CourseAcademy
            lang={lang}
            t={t}
            onOpenLightbox={(url, title) => setLightboxData({ url, title })}
          />
        </div>

        {/* Section 9: FAQ */}
        <div className="relative z-[90] bg-[#fbfbfd] dark:bg-[#000000] border-t border-black/[0.04] dark:border-white/[0.06]">
          <FaqAccordion
            t={t}
            onScrollToContact={scrollToContact}
          />
        </div>

        {/* Section 10: Contact Configurator */}
        <div className="relative z-[100] bg-zinc-50/40 dark:bg-[#0a0a0c]/50 border-t border-black/[0.04] dark:border-white/[0.06]">
          <ContactConfigurator
            t={t}
            lang={lang}
          />
        </div>

      </main>

      {/* Rich Footer with Back to Top Button */}
      <Footer
        t={t}
        onOpenDemo={() => setIsDemoOpen(true)}
      />

      {/* Monumental Brand Finale - Overlap Cover Slide after Footer */}
      <HugeBrandTextSection
        lang={lang}
        t={t}
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
