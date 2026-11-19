import { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import { ArrowRight, Check, Globe, Menu, Moon, Sun, X } from 'lucide-react';
import { SITE } from '../data/site';
import { scrollToId } from '../lib/scroll';

const LANGS = [
  { code: 'uz', short: 'UZ', name: 'O‘zbekcha' },
  { code: 'ru', short: 'RU', name: 'Русский' },
  { code: 'en', short: 'EN', name: 'English' },
];
const LINKS = ['features', 'equipment', 'integrations', 'pricing', 'course', 'contact'];


/** Language picker: compact trigger, small menu. Closes on pick, outside click and Escape. */
export const LangMenu = ({ lang, setLang, label, up = false, full = false }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const off = (e) => !ref.current?.contains(e.target) && setOpen(false);
    const key = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', off);
    document.addEventListener('keydown', key);
    return () => { document.removeEventListener('pointerdown', off); document.removeEventListener('keydown', key); };
  }, [open]);
  const current = LANGS.find((l) => l.code === lang) || LANGS[0];
  return (
    <div ref={ref} className="relative">
      <button type="button" aria-haspopup="true" aria-expanded={open} aria-label={label} onClick={() => setOpen((o) => !o)} className="icon-btn !w-auto gap-1.5 px-2.5 text-[13px] font-semibold">
        <Globe size={16} strokeWidth={1.75} aria-hidden="true" />{full ? current.name : current.short}
      </button>
      {open && (
        <ul className={`pop-in absolute z-10 w-44 rounded-xl p-1 ${up ? 'bottom-full left-0 mb-2' : 'right-0 top-full mt-2'}`} style={{ background: 'var(--surface)', boxShadow: 'var(--ring), var(--shadow-pop)' }}>
          {LANGS.map((l) => (
            <li key={l.code}>
              <button type="button" aria-pressed={lang === l.code} onClick={() => { setLang(l.code); setOpen(false); }} className="flex min-h-[38px] w-full items-center justify-between rounded-lg px-3 text-left text-sm font-medium hover:bg-[var(--surface-2)]">
                {l.name}{lang === l.code && <Check size={15} strokeWidth={2.25} style={{ color: 'var(--accent)' }} aria-hidden="true" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

/** Scroll spy: the section crossing the upper-middle of the viewport is current.
 * When a nav link is clicked, lockActive locks to the target link immediately
 * so the pill glides smoothly without pausing at intermediate sections.
 */
const useActive = () => {
  const [active, setActive] = useState(null);
  const lockedRef = useRef(null);
  const timerRef = useRef(null);

  const lockActive = useCallback((id) => {
    lockedRef.current = id;
    setActive(id);
    if (timerRef.current) clearTimeout(timerRef.current);

    const unlock = () => {
      lockedRef.current = null;
      window.removeEventListener('scrollend', unlock);
      window.removeEventListener('wheel', unlock);
      window.removeEventListener('touchstart', unlock);
    };

    window.addEventListener('scrollend', unlock, { once: true });
    window.addEventListener('wheel', unlock, { once: true, passive: true });
    window.addEventListener('touchstart', unlock, { once: true, passive: true });
    timerRef.current = setTimeout(unlock, 1200);
  }, []);

  useEffect(() => {
    const seen = new Map();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => seen.set(e.target.id, e.isIntersecting));
      if (!lockedRef.current) {
        setActive(LINKS.findLast((id) => seen.get(id)) ?? null);
      }
    }, { rootMargin: '-35% 0px -60% 0px' });
    // Sections below the hero are lazy; observe them as they appear
    const watch = () => LINKS.forEach((id) => {
      const el = document.getElementById(id);
      if (el && !seen.has(id)) {
        seen.set(id, false);
        io.observe(el);
      }
    });
    watch();
    const mo = new MutationObserver(watch);
    const mainEl = document.getElementById('main');
    if (mainEl) mo.observe(mainEl, { childList: true });
    return () => {
      io.disconnect();
      mo.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return [active, lockActive];
};

export const Navbar = ({ lang, setLang, t, isDark, toggleTheme, onOpenDemo }) => {
  const [active, lockActive] = useActive();
  const track = useRef(null);
  const sheet = useRef(null);

  // Move the pill under the active link (measured, then animated by CSS). Re-measure when the
  // links change size: language switch, web font arriving, window resize.
  useLayoutEffect(() => {
    const tr = track.current;
    if (!tr) return;
    const place = () => {
      const el = tr.querySelector('[aria-current="true"]');
      if (!el) return void tr.style.setProperty('--o', 0);
      tr.style.setProperty('--x', `${el.offsetLeft}px`);
      tr.style.setProperty('--w', `${el.offsetWidth}px`);
      tr.style.setProperty('--o', 1);
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(tr);
    return () => ro.disconnect();
  }, [active]);

  const nav = (id) => (e) => {
    e.preventDefault();
    sheet.current?.close();
    lockActive(id);
    scrollToId(id);
  };
  const Theme = (
    <button type="button" onClick={toggleTheme} className="icon-btn" aria-label={t.nav.theme}>
      {isDark ? <Sun size={18} strokeWidth={1.75} /> : <Moon size={18} strokeWidth={1.75} />}
    </button>
  );

  return (
    <header className="site-header">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-lg focus:bg-[var(--surface)] focus:px-3 focus:py-2">{t.skip}</a>
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#home" onClick={nav("home")} aria-label="iDokon" className="flex shrink-0 items-center">
          <img src={SITE.brand.logo} alt="iDokon" width="98" height="30" className="h-8 w-auto" />
        </a>

        <nav aria-label="Main" className="mx-auto hidden lg:block">
          <div ref={track} className="nav-track">
            <span className="nav-ind" aria-hidden="true" />
            {LINKS.map((id) => (
              <a key={id} href={`#${id}`} aria-current={active === id ? 'true' : undefined} onClick={nav(id)} className="nav-link">{t.nav[id]}</a>
            ))}
          </div>
        </nav>

        <div className="flex shrink-0 items-center gap-1">
          <div className="hidden items-center gap-1 md:flex">
            <LangMenu lang={lang} setLang={setLang} label={t.nav.language} />
            {Theme}
            <span className="mx-1.5 h-5 w-px" style={{ background: 'var(--line-strong)' }} aria-hidden="true" />
          </div>
          <button type="button" onClick={onOpenDemo} className="btn-primary hidden !min-h-[36px] !px-4 sm:inline-flex">{t.nav.tryDemo}<ArrowRight size={16} strokeWidth={2} aria-hidden="true" /></button>
          <button type="button" className="icon-btn lg:hidden" aria-label={t.menu.open} onClick={() => sheet.current?.showModal()}><Menu size={20} strokeWidth={1.75} /></button>
        </div>
      </div>
      <span className="scroll-progress" aria-hidden="true" />

      <dialog ref={sheet} className="sheet" aria-label={t.menu.open} onClick={(e) => e.target === sheet.current && sheet.current.close()}>
        <div className="flex h-full flex-col p-5">
          <div className="mb-4 flex items-center justify-between">
            <img src={SITE.brand.logo} alt="" width="98" height="30" className="h-7 w-auto" />
            <button type="button" onClick={() => sheet.current?.close()} className="icon-btn" aria-label={t.menu.close}><X size={20} strokeWidth={1.75} /></button>
          </div>
          <nav className="flex flex-col" aria-label="Mobile">
            {LINKS.map((id) => (
              <a key={id} href={`#${id}`} onClick={nav(id)} className="flex min-h-[52px] items-center border-b text-lg font-semibold tracking-tight" style={{ borderColor: 'var(--line)' }}>{t.nav[id]}</a>
            ))}
          </nav>
          <button type="button" onClick={() => { sheet.current?.close(); onOpenDemo(); }} className="btn-primary mt-6 w-full">{t.nav.tryDemo}</button>
          <div className="mt-auto flex items-center justify-between gap-3 pt-6">
            <LangMenu lang={lang} setLang={setLang} label={t.nav.language} up full />
            {Theme}
          </div>
        </div>
      </dialog>
    </header>
  );
};
