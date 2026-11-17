import { useEffect } from 'react';

// One delegated, frame-batched interaction layer (no per-component listeners, no scroll listener):
//  .spot glow  .tilt 3D tilt  .btn-primary/.btn-deep magnetic pull  .btn ripple  + the background grid.
// Pointer events only store coordinates; all reads and writes happen once per frame in tick().
// Scroll progress is pure CSS (animation-timeline: scroll()), so it costs no JS at all.

const root = document.documentElement;
const grid = document.querySelector('.bg-grid');
const still = () => root.dataset.motion !== 'full' || matchMedia('(prefers-reduced-motion: reduce)').matches;
const lerp = (a, b, k) => a + (b - a) * k;
const OVERSCAN = 96; // .bg-grid pseudo-elements extend 96px past the viewport on every side

export function initInteractions() {
  // Chromium can refract the backdrop through an SVG filter; others keep the plain blur
  if (CSS.supports('backdrop-filter', 'url(#liquid)') && navigator.userAgent.includes('Chrom')) root.dataset.liquid = '';

  const p = { x: 0, y: 0, el: null, inside: false };
  const g = { x: 0, y: 0, tx: 0, ty: 0, i: 0 }; // eased grid state
  let raf = 0, tilt = null, mag = null;

  const release = (el) => el && ['--rx', '--ry', '--tx', '--ty'].forEach((k) => el.style.removeProperty(k));

  const tick = () => {
    raf = 0;
    const calm = still();

    // Grid: lit spot follows the pointer with easing, whole grid drifts a few px against it
    const tx = calm ? 0 : (0.5 - p.x / innerWidth) * 14;
    const ty = calm ? 0 : (0.5 - p.y / innerHeight) * 14;
    g.x = lerp(g.x, p.x, 0.14); g.y = lerp(g.y, p.y, 0.14);
    g.tx = lerp(g.tx, tx, 0.1); g.ty = lerp(g.ty, ty, 0.1);
    g.i = lerp(g.i, p.inside && !calm ? 1 : 0, 0.1);
    if (grid) {
      const s = grid.style;
      s.setProperty('--gx', `${g.x + OVERSCAN - g.tx}px`);
      s.setProperty('--gy', `${g.y + OVERSCAN - g.ty}px`);
      s.setProperty('--tx', `${g.tx}px`);
      s.setProperty('--ty', `${g.ty}px`);
      s.setProperty('--gi', g.i.toFixed(3));
    }

    const el = p.el;
    const spot = el?.closest?.('.spot');
    if (spot) {
      const r = spot.getBoundingClientRect();
      spot.style.setProperty('--mx', p.x - r.left + 'px');
      spot.style.setProperty('--my', p.y - r.top + 'px');
    }
    const t = !calm && el?.closest?.('.tilt');
    if (tilt && tilt !== t) release(tilt);
    if ((tilt = t || null)) {
      const r = t.getBoundingClientRect();
      t.style.setProperty('--ry', ((p.x - r.left) / r.width - 0.5) * 7 + 'deg');
      t.style.setProperty('--rx', (0.5 - (p.y - r.top) / r.height) * 7 + 'deg');
    }
    const m = !calm && el?.closest?.('.btn-primary, .btn-deep');
    if (mag && mag !== m) release(mag);
    if ((mag = m || null)) {
      const r = m.getBoundingClientRect();
      m.style.setProperty('--tx', ((p.x - r.left) / r.width - 0.5) * 8 + 'px');
      m.style.setProperty('--ty', ((p.y - r.top) / r.height - 0.5) * 6 + 'px');
    }

    // keep easing until the grid has settled
    if (Math.abs(g.x - p.x) > 0.3 || Math.abs(g.y - p.y) > 0.3 || Math.abs(g.i - (p.inside && !calm ? 1 : 0)) > 0.01) schedule();
  };
  const schedule = () => { raf ||= requestAnimationFrame(tick); };

  const move = (e) => {
    if (e.pointerType !== 'mouse') return;
    if (!p.inside) { g.x = p.x = e.clientX; g.y = p.y = e.clientY; } // first entry: no fly-in from the corner
    p.x = e.clientX; p.y = e.clientY; p.el = e.target; p.inside = true;
    schedule();
  };
  const leave = () => { p.inside = false; p.el = null; schedule(); };

  const down = (e) => {
    const btn = e.target.closest?.('.btn');
    if (!btn || btn.disabled || still()) return;
    const r = btn.getBoundingClientRect();
    const d = Math.max(r.width, r.height) * 2;
    const dot = document.createElement('span');
    dot.className = 'ripple';
    dot.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - r.left - d / 2}px;top:${e.clientY - r.top - d / 2}px`;
    btn.append(dot);
    dot.addEventListener('animationend', () => dot.remove(), { once: true });
  };

  const opts = { passive: true };
  addEventListener('pointermove', move, opts);
  addEventListener('pointerdown', down, opts);
  root.addEventListener('pointerleave', leave);
  return () => {
    removeEventListener('pointermove', move);
    removeEventListener('pointerdown', down);
    root.removeEventListener('pointerleave', leave);
    cancelAnimationFrame(raf);
  };
}

export const useInteractions = () => useEffect(initInteractions, []);

/** Drag-to-scroll with inertia for a horizontal scroller (mouse only; touch already scrolls natively). */
export function dragScroll(el) {
  let down = false, moved = false, startX = 0, startLeft = 0, last = 0, lastT = 0, v = 0, raf = 0;

  const glide = () => {
    el.scrollLeft -= v;
    v *= 0.94;
    if (Math.abs(v) > 0.4) raf = requestAnimationFrame(glide);
    else delete el.dataset.dragging;
  };
  const onDown = (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0 || el.scrollWidth <= el.clientWidth) return;
    cancelAnimationFrame(raf);
    down = true; moved = false; startX = last = e.clientX; startLeft = el.scrollLeft; v = 0; lastT = performance.now();
  };
  const onMove = (e) => {
    if (!down) return;
    const dx = e.clientX - startX;
    if (!moved && Math.abs(dx) > 5) { moved = true; el.dataset.dragging = '1'; el.setPointerCapture?.(e.pointerId); }
    if (!moved) return;
    el.scrollLeft = startLeft - dx;
    const now = performance.now();
    v = (e.clientX - last) / Math.max(now - lastT, 1) * 16;
    last = e.clientX; lastT = now;
  };
  const onUp = () => {
    if (!down) return;
    down = false;
    if (moved) raf = requestAnimationFrame(glide);
  };
  // A drag must not count as a click on the card under the pointer
  const onClick = (e) => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } };

  const on = [['pointerdown', onDown], ['pointermove', onMove], ['pointerup', onUp], ['pointercancel', onUp]];
  on.forEach(([k, f]) => el.addEventListener(k, f));
  el.addEventListener('click', onClick, true);
  return () => {
    cancelAnimationFrame(raf);
    on.forEach(([k, f]) => el.removeEventListener(k, f));
    el.removeEventListener('click', onClick, true);
  };
}
