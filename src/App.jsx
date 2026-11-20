import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { translations } from './data/translations';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { StickyBar } from './components/StickyBar';
import { useDark } from './lib/theme';
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
  const t = translations[lang];

  // The line ends at the Aloqa terminus: keep the rail's bottom at that roundel as content above it changes height
  useEffect(() => {
    const main = document.getElementById('main');
    const place = () => {
      const end = document.querySelector('#contact .terminus');
      if (end) main.style.setProperty('--rail-end', `${main.getBoundingClientRect().bottom - end.getBoundingClientRect().top - 17}px`);
    };
    const ro = new ResizeObserver(place);
    ro.observe(main);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description);
    try { localStorage.setItem('site_lang', lang); } catch { /* storage unavailable */ }
  }, [lang, t]);

  const openDemo = useCallback(() => setIsDemoOpen(true), []);
  const openLightbox = useCallback((name, title) => setLightbox({ name, title }), []);
  const togglePick = useCallback((id) => setPicked((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; }), []);
  const clearPicked = useCallback(() => setPicked(new Set()), []);
  const contactWith = useCallback((p) => { setPrefill(p); scrollToId('contact'); }, []);

  return (
    <>
      <Navbar lang={lang} setLang={setLang} t={t} isDark={isDark} toggleTheme={toggleTheme} onOpenDemo={openDemo} />
      <main id="main">
        <div className="rail" aria-hidden="true"><span className="train" /></div>
        <Hero t={t} onOpenDemo={openDemo} onOpenLightbox={openLightbox} />
        <Suspense fallback={<div className="min-h-[200vh]" />}>
          <BelowFold t={t} lang={lang} picked={picked} onTogglePick={togglePick} onClearPicked={clearPicked} onOpenSpecs={setSpecs} onContact={contactWith} onOpenLightbox={openLightbox} onOpenDemo={openDemo} prefill={prefill} />
        </Suspense>
      </main>
      <Footer t={t} onOpenDemo={openDemo} />
      <StickyBar t={t} />
      <Suspense fallback={null}>
        {isDemoOpen && <DemoModal onClose={() => setIsDemoOpen(false)} t={t} lang={lang} />}
        {specs && <HardwareSpecsModal onClose={() => setSpecs(null)} product={specs} lang={lang} t={t} picked={picked.has(specs.id)} onTogglePick={togglePick} />}
        {lightbox && <LightboxModal onClose={() => setLightbox(null)} image={lightbox.name} title={lightbox.title} closeLabel={t.lightbox.close} />}
      </Suspense>
    </>
  );
}
