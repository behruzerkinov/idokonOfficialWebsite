import { useEffect } from 'react';

/** Spotlight glow: one delegated pointer listener, one style write per frame, only on the hovered .spot. */
export function useSpotlight() {
  useEffect(() => {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    let raf = 0, x = 0, y = 0, el = null;
    const tick = () => {
      raf = 0;
      const spot = el?.closest?.('.spot');
      if (!spot) return;
      const r = spot.getBoundingClientRect();
      spot.style.setProperty('--mx', `${x - r.left}px`);
      spot.style.setProperty('--my', `${y - r.top}px`);
    };
    const move = (e) => { x = e.clientX; y = e.clientY; el = e.target; raf ||= requestAnimationFrame(tick); };
    addEventListener('pointermove', move, { passive: true });
    return () => { removeEventListener('pointermove', move); cancelAnimationFrame(raf); };
  }, []);
}

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
    v = ((e.clientX - last) / Math.max(now - lastT, 1)) * 16;
    last = e.clientX; lastT = now;
  };
  const onUp = () => {
    if (!down) return;
    down = false;
    if (moved) raf = requestAnimationFrame(glide);
    else delete el.dataset.dragging;
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
