/**
 * Smooth-scroll to a section. If the section has not mounted yet (lazy chunk), set the hash and
 * BelowFold scrolls to it on mount. Content that loads during the scroll can move the target,
 * so when the scroll ends we settle on it once more (no-op if already there).
 * Lingering scroll listeners from previous clicks are properly aborted so rapid switching never glitches.
 */
let currentScrollAbort = null;

export function scrollToId(id) {
  if (currentScrollAbort) {
    currentScrollAbort.abort();
    currentScrollAbort = null;
  }
  if (id === 'home') return scrollTo({ top: 0, behavior: 'smooth' });
  const el = document.getElementById(id);
  if (!el) return void (location.hash = id);
  el.scrollIntoView({ behavior: 'smooth' });
  const stop = new AbortController();
  currentScrollAbort = stop;
  addEventListener('scrollend', () => el.scrollIntoView({ behavior: 'smooth' }), { once: true, signal: stop.signal });
  setTimeout(() => stop.abort(), 3000); // never hijack a later, user-initiated scroll
}
