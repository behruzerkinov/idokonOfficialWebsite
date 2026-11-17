import { useEffect } from 'react';

// One delegated interaction layer for the whole page (no per-component listeners):
//  .spot   pointer-tracked glow         .tilt     3D tilt toward the pointer
//  .btn    magnetic pull + press ripple  progress  --p on <html> + data-scrolled
// Magnetic, tilt and ripple switch off when motion is "calm"/"off" or the OS asks for reduced motion.

const root = document.documentElement;
const still = () => root.dataset.motion !== 'full' || matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initInteractions() {
  let tiltEl = null;
  let magEl = null;

  const release = (el) => el && ['--rx', '--ry', '--tx', '--ty'].forEach((k) => el.style.removeProperty(k));

  const move = (e) => {
    if (e.pointerType !== 'mouse') return;
    const spot = e.target.closest?.('.spot');
    if (spot) {
      const r = spot.getBoundingClientRect();
      spot.style.setProperty('--mx', e.clientX - r.left + 'px');
      spot.style.setProperty('--my', e.clientY - r.top + 'px');
    }
    if (still()) return;

    const tilt = e.target.closest?.('.tilt');
    if (tiltEl && tiltEl !== tilt) release(tiltEl);
    tiltEl = tilt;
    if (tilt) {
      const r = tilt.getBoundingClientRect();
      tilt.style.setProperty('--ry', ((e.clientX - r.left) / r.width - 0.5) * 7 + 'deg');
      tilt.style.setProperty('--rx', (0.5 - (e.clientY - r.top) / r.height) * 7 + 'deg');
    }

    const mag = e.target.closest?.('.btn-primary, .btn-deep');
    if (magEl && magEl !== mag) release(magEl);
    magEl = mag;
    if (mag) {
      const r = mag.getBoundingClientRect();
      mag.style.setProperty('--tx', ((e.clientX - r.left) / r.width - 0.5) * 8 + 'px');
      mag.style.setProperty('--ty', ((e.clientY - r.top) / r.height - 0.5) * 6 + 'px');
    }
  };

  const leave = () => { release(tiltEl); release(magEl); tiltEl = magEl = null; };

  const down = (e) => {
    const btn = e.target.closest?.('.btn');
    if (!btn || still() || btn.disabled) return;
    const r = btn.getBoundingClientRect();
    const d = Math.max(r.width, r.height) * 2;
    const dot = document.createElement('span');
    dot.className = 'ripple';
    dot.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - r.left - d / 2}px;top:${e.clientY - r.top - d / 2}px`;
    btn.appendChild(dot);
    dot.addEventListener('animationend', () => dot.remove(), { once: true });
  };

  let raf = 0;
  const scroll = () => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      const max = root.scrollHeight - innerHeight;
      root.style.setProperty('--p', max > 0 ? (scrollY / max).toFixed(4) : 0);
      root.dataset.scrolled = scrollY > 8 ? 'true' : 'false';
    });
  };

  document.addEventListener('pointermove', move, { passive: true });
  document.addEventListener('pointerdown', down, { passive: true });
  document.documentElement.addEventListener('pointerleave', leave);
  addEventListener('scroll', scroll, { passive: true });
  scroll();
  return () => {
    document.removeEventListener('pointermove', move);
    document.removeEventListener('pointerdown', down);
    document.documentElement.removeEventListener('pointerleave', leave);
    removeEventListener('scroll', scroll);
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

  el.addEventListener('pointerdown', onDown);
  el.addEventListener('pointermove', onMove);
  el.addEventListener('pointerup', onUp);
  el.addEventListener('pointercancel', onUp);
  el.addEventListener('click', onClick, true);
  return () => {
    cancelAnimationFrame(raf);
    el.removeEventListener('pointerdown', onDown);
    el.removeEventListener('pointermove', onMove);
    el.removeEventListener('pointerup', onUp);
    el.removeEventListener('pointercancel', onUp);
    el.removeEventListener('click', onClick, true);
  };
}
