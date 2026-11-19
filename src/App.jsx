import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { translations } from './data/translations';
import { Navbar } from './components/Navbar';
import { CustomCursor } from './components/CustomCursor';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { StickyBar } from './components/StickyBar';
import { useDark } from './lib/theme';
import { useSpotlight } from './lib/interactions';
import { scrollToId } from './lib/scroll';

const BelowFold = lazy(() => import('./components/BelowFold'));
const DemoModal = lazy(() => import('./components/DemoModal'));
const HardwareSpecsModal = lazy(() => import('./components/HardwareSpecsModal'));
const LightboxModal = lazy(() => import('./components/LightboxModal'));

const readLang = () => {
  try { const l = localStorage.getItem('site_lang'); return translations[l] ? l : 'uz'; } catch { return 'uz'; }
};

export default function App() {
  const [lang, setLang] = useState(readLang);
  const [isDark, toggleTheme] = useDark();
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [specs, setSpecs] = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const [prefill, setPrefill] = useState({});
  const [picked, setPicked] = useState(() => new Set());
  useSpotlight();
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description);
    try { localStorage.setItem('site_lang', lang); } catch { /* storage unavailable */ }
  }, [lang, t]);

  const openDemo = useCallback(() => setIsDemoOpen(true), []);
  const openLightbox = useCallback((url, title) => setLightbox({ url, title }), []);
  const togglePick = useCallback((id) => setPicked((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; }), []);
  const clearPicked = useCallback(() => setPicked(new Set()), []);
  const contactWith = useCallback((p) => { setPrefill(p); scrollToId('contact'); }, []);

  return (
    <>
      <CustomCursor />
      <Navbar lang={lang} setLang={setLang} t={t} isDark={isDark} toggleTheme={toggleTheme} onOpenDemo={openDemo} />
      <main id="main">
        <Hero t={t} onOpenDemo={openDemo} onOpenLightbox={openLightbox} />
        <Suspense fallback={<div className="min-h-[150vh]" />}>
          <BelowFold t={t} lang={lang} picked={picked} onTogglePick={togglePick} onClearPicked={clearPicked} onOpenSpecs={setSpecs} onContact={contactWith} onOpenLightbox={openLightbox} onOpenDemo={openDemo} prefill={prefill} />
        </Suspense>
      </main>
      <Footer t={t} onOpenDemo={openDemo} />
      <StickyBar t={t} />
      <Suspense fallback={null}>
        {isDemoOpen && <DemoModal onClose={() => setIsDemoOpen(false)} t={t} lang={lang} />}
        {specs && <HardwareSpecsModal onClose={() => setSpecs(null)} product={specs} lang={lang} t={t} picked={picked.has(specs.id)} onTogglePick={togglePick} />}
        {lightbox && <LightboxModal onClose={() => setLightbox(null)} image={lightbox.url} title={lightbox.title} closeLabel={t.lightbox.close} />}
      </Suspense>
    </>
  );
}
