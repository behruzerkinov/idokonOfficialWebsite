import { useEffect, useRef, useState } from 'react';

/**
 * Custom beautiful cursor for fine-pointer devices:
 * - Ultra-responsive center precision dot with zero lag
 * - Fluid spring-trailing magnetic follower ring
 * - Dynamic expansion & glow when hovering over clickable elements, cards, and grid items
 * - Snappy micro-bounce scale on click
 * - Non-intrusive: pointer-events: none, auto-hides on mouseleave
 */
export const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only enable on desktop/fine-pointer devices
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    setEnabled(true);

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHover = false;
    let isDown = false;
    let isVisible = false;
    let rafId = 0;

    const interactiveSelector = 'a, button, [role="button"], [role="tab"], input, select, textarea, summary, .spot, .card, .brand-badge, .seg-btn';

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = '1';
      }

      // Check if target or parent matches interactive elements
      const target = e.target;
      isHover = Boolean(target && target.closest?.(interactiveSelector));
      if (ringRef.current) {
        ringRef.current.setAttribute('data-hover', isHover ? 'true' : 'false');
      }

      // Update dot immediately for instantaneous feel
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const onMouseDown = () => {
      isDown = true;
      if (ringRef.current) ringRef.current.setAttribute('data-down', 'true');
    };

    const onMouseUp = () => {
      isDown = false;
      if (ringRef.current) ringRef.current.removeAttribute('data-down');
    };

    const onMouseLeave = () => {
      isVisible = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    const loop = () => {
      // Smooth lerp for trailing ring
      const ease = 0.18;
      ringX += (mouseX - ringX) * ease;
      ringY += (mouseY - ringY) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        aria-hidden="true"
        style={{ opacity: 0 }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        aria-hidden="true"
        style={{ opacity: 0 }}
      />
    </>
  );
};
