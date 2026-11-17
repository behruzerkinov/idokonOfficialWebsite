import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { Toaster } from 'sonner';
import { MotionConfig } from 'motion/react';
import { translations } from './data/translations';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Partners } from './components/Partners';
import { HowItWorks } from './components/HowItWorks';
import { PosInteractiveShowcase } from './components/PosInteractiveShowcase';
import { SectorSolutions } from './components/SectorSolutions';
import { CareSection } from './components/CareSection';
import { HardwareMarketplace } from './components/HardwareMarketplace';
import { PricingCalculator } from './components/PricingCalculator';
import { FaqAccordion } from './components/FaqAccordion';
import { ContactConfigurator } from './components/ContactConfigurator';
import { Footer } from './components/Footer';
import { StickyBar } from './components/StickyBar';
import { Statement } from './components/Statement';

const DemoModal = lazy(() => import('./components/DemoModal').then((m) => ({ default: m.DemoModal })));
const CartDrawer = lazy(() => import('./components/CartDrawer').then((m) => ({ default: m.CartDrawer })));
const HardwareSpecsModal = lazy(() => import('./components/HardwareSpecsModal').then((m) => ({ default: m.HardwareSpecsModal })));
const LightboxModal = lazy(() => import('./components/LightboxModal').then((m) => ({ default: m.LightboxModal })));

const read = (key, fallback) => {
  try { return localStorage.getItem(key) || fallback; } catch { return fallback; }
};
const write = (key, value) => {
  try { localStorage.setItem(key, value); } catch { /* storage unavailable */ }
};
const readCart = () => {
  try { return JSON.parse(localStorage.getItem('idokon_cart')) || []; } catch { return []; }
};
const scrollToSection = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export function App() {
  const [lang, setLang] = useState(() => (translations[read('site_lang', 'uz')] ? read('site_lang', 'uz') : 'uz'));
  const [theme, setTheme] = useState(() => (read('site_theme', 'light') === 'dark' ? 'dark' : 'light'));
  const [cart, setCart] = useState(readCart);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [specs, setSpecs] = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const [prefill, setPrefill] = useState({});

  const t = translations[lang];

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    write('site_theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description);
    write('site_lang', lang);
  }, [lang, t]);

  useEffect(() => {
    write('idokon_cart', JSON.stringify(cart.map(({ id, title, price, image, qty }) => ({ id, title, price, image, qty }))));
  }, [cart]);

  const openDemo = useCallback(() => setIsDemoOpen(true), []);
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const openLightbox = useCallback((url, title) => setLightbox({ url, title }), []);
  const toggleTheme = useCallback(() => setTheme((p) => (p === 'dark' ? 'light' : 'dark')), []);

  const addToCart = useCallback((product) => {
    setCart((prev) =>
      prev.some((i) => i.id === product.id)
        ? prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { ...product, qty: 1 }]
    );
  }, []);
  const updateQty = useCallback((id, d) => {
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: i.qty + d } : i)).filter((i) => i.qty > 0));
  }, []);
  const removeItem = useCallback((id) => setCart((prev) => prev.filter((i) => i.id !== id)), []);
  const clearCart = useCallback(() => setCart([]), []);

  const selectPlan = (id) => {
    setPrefill({ plan: t.pricing[id].name });
    scrollToSection('contact');
  };
  const requestKit = () => {
    setPrefill({ message: t.equipment.kitMessage });
    scrollToSection('contact');
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <MotionConfig reducedMotion="user">
      <Toaster theme={theme} position="top-center" richColors closeButton />
      <Navbar lang={lang} setLang={setLang} t={t} theme={theme} toggleTheme={toggleTheme} cartCount={cartCount} onOpenCart={openCart} onOpenDemo={openDemo} />

      <main id="main">
        <Hero t={t} lang={lang} onOpenDemo={openDemo} onOpenLightbox={openLightbox} />
        <Partners t={t} />
        <HowItWorks t={t} />
        <PosInteractiveShowcase t={t} onOpenLightbox={openLightbox} />
        <SectorSolutions t={t} />
        <CareSection t={t} lang={lang} onOpenLightbox={openLightbox} />
        <HardwareMarketplace lang={lang} t={t} cart={cart} onAddToCart={addToCart} onOpenSpecsModal={setSpecs} onOpenCart={openCart} onRequestKit={requestKit} />
        <PricingCalculator t={t} lang={lang} onSelectPlan={selectPlan} />
        <FaqAccordion t={t} onScrollToContact={() => scrollToSection('contact')} />
        <ContactConfigurator t={t} lang={lang} prefill={prefill} />
        <Statement t={t} onOpenDemo={openDemo} />
      </main>

      <Footer t={t} lang={lang} setLang={setLang} />
      <StickyBar t={t} />

      <Suspense fallback={null}>
        {isDemoOpen && <DemoModal isOpen onClose={() => setIsDemoOpen(false)} t={t} lang={lang} />}
        {(isCartOpen || cart.length > 0) && (
          <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} onUpdateQty={updateQty} onRemoveItem={removeItem} onClearCart={clearCart} lang={lang} t={t} />
        )}
        {specs && (
          <HardwareSpecsModal isOpen onClose={() => setSpecs(null)} product={specs} lang={lang} t={t} onAddToCart={addToCart} isInCart={cart.some((i) => i.id === specs.id)} />
        )}
        {lightbox && <LightboxModal isOpen onClose={() => setLightbox(null)} image={lightbox.url} title={lightbox.title} closeLabel={t.lightbox.close} />}
      </Suspense>
    </MotionConfig>
  );
}

export default App;
