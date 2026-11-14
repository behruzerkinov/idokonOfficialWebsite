import React, { useState, useEffect, useCallback } from 'react';
import { Toaster, toast } from 'sonner';
import { MotionConfig } from 'motion/react';
import { translations } from './data/translations';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TechMarquee } from './components/TechMarquee';
import { PartnerMarquee } from './components/PartnerMarquee';
import { EditorialStatement } from './components/EditorialStatement';
import { PosInteractiveShowcase } from './components/PosInteractiveShowcase';
import { ValueGrid } from './components/ValueGrid';
import { SectorSolutions } from './components/SectorSolutions';
import { HardwareMarketplace } from './components/HardwareMarketplace';
import { IntegrationMigration } from './components/IntegrationMigration';
import { PricingCalculator } from './components/PricingCalculator';
import { CourseAcademy } from './components/CourseAcademy';
import { FaqAccordion } from './components/FaqAccordion';
import { ContactConfigurator } from './components/ContactConfigurator';
import { HugeBrandTextSection } from './components/HugeBrandTextSection';
import { Footer } from './components/Footer';
import { DemoModal } from './components/DemoModal';
import { CartDrawer } from './components/CartDrawer';
import { HardwareSpecsModal } from './components/HardwareSpecsModal';
import { LightboxModal } from './components/LightboxModal';

const readStorage = (key, fallback) => {
  try {
    return localStorage.getItem(key) || fallback;
  } catch (_) {
    return fallback;
  }
};

const writeStorage = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (_) {}
};

const TECH_ITEMS = [
  'NEXT-GEN RETAIL OS',
  'WINDOWS & WEB TERMINAL',
  '1C & EXCEL 1-DAY MIGRATION',
  'REAL-TIME FISCAL SOLIQ INTEGRATION',
  'INSTANT CARD & QR CHECKOUT',
  '900+ ACTIVE ENTERPRISES',
];

export function App() {
  const [lang, setLang] = useState(() => readStorage('site_lang', 'uz'));
  const [theme, setTheme] = useState(() => readStorage('site_theme', 'dark'));
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [selectedSpecsProduct, setSelectedSpecsProduct] = useState(null);
  const [lightboxData, setLightboxData] = useState(null);

  const t = translations[lang] || translations.uz;

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    writeStorage('site_theme', theme);
  }, [theme]);

  const handleSetLang = useCallback((next) => {
    setLang(next);
    writeStorage('site_lang', next);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const openDemo = useCallback(() => setIsDemoOpen(true), []);
  const openLightbox = useCallback((url, title) => setLightboxData({ url, title }), []);
  const openCart = useCallback(() => setIsCartOpen(true), []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAddToCart = useCallback((product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }, []);

  const handleUpdateCartQty = useCallback((id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id !== id) return item;
          const qty = item.qty + delta;
          return qty > 0 ? { ...item, qty } : null;
        })
        .filter(Boolean)
    );
  }, []);

  const handleRemoveFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const handleSelectPlan = (plan) => {
    toast.info(`${plan.name} tarifi tanlandi`, {
      description: 'Bepul demo yoki konsultatsiya olishingiz mumkin.',
    });
    setIsDemoOpen(true);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <MotionConfig reducedMotion="user">
      <div
        className={`${theme === 'dark' ? 'dark' : ''} flex min-h-screen flex-col bg-[var(--bg)] font-sans text-[var(--fg)] transition-colors duration-300`}
      >
        <Toaster theme={theme} position="top-right" richColors closeButton />

        <Navbar
          lang={lang}
          setLang={handleSetLang}
          t={t}
          theme={theme}
          toggleTheme={toggleTheme}
          cartCount={cartCount}
          onOpenCart={openCart}
          onOpenDemo={openDemo}
        />

        <main className="flex-1">
          <Hero
            t={t}
            onOpenDemo={openDemo}
            onScrollToTerminal={() => scrollToSection('terminal')}
            onOpenLightbox={openLightbox}
          />

          <TechMarquee items={TECH_ITEMS} />
          <PartnerMarquee t={t} />
          <EditorialStatement t={t} />
          <PosInteractiveShowcase t={t} onOpenLightbox={openLightbox} />
          <ValueGrid t={t} />
          <SectorSolutions t={t} onOpenDemo={openDemo} />
          <HardwareMarketplace
            lang={lang}
            t={t}
            cart={cart}
            onAddToCart={handleAddToCart}
            onOpenSpecsModal={setSelectedSpecsProduct}
            onOpenCart={openCart}
          />
          <IntegrationMigration t={t} onOpenContact={() => scrollToSection('contact')} />
          <PricingCalculator t={t} lang={lang} onSelectPlan={handleSelectPlan} />
          <CourseAcademy lang={lang} t={t} onOpenLightbox={openLightbox} />
          <FaqAccordion t={t} onScrollToContact={() => scrollToSection('contact')} />
          <ContactConfigurator t={t} lang={lang} />
        </main>

        <Footer t={t} onOpenDemo={openDemo} />
        <HugeBrandTextSection lang={lang} t={t} />

        <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} t={t} lang={lang} />

        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cart={cart}
          onUpdateQty={handleUpdateCartQty}
          onRemoveItem={handleRemoveFromCart}
          onClearCart={() => setCart([])}
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
    </MotionConfig>
  );
}

export default App;
