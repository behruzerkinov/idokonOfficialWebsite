import React, { useRef, useState, useEffect, useCallback } from 'react';

const CHARS = 'abcdefghklmnorstuxz0123456789';

/** Letters resolve left to right on hover (kept from the first build, pointer devices only, 350 ms). */
export const ScrambleText = ({ text }) => {
  const [shown, setShown] = useState(text);
  const raf = useRef(0);
  useEffect(() => { setShown(text); return () => cancelAnimationFrame(raf.current); }, [text]);

  const run = useCallback(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    cancelAnimationFrame(raf.current);
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / 350, 1);
      const done = Math.floor(p * text.length);
      setShown([...text].map((ch, i) => (ch === ' ' || i < done ? ch : CHARS[(Math.random() * CHARS.length) | 0])).join(''));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, [text]);

  return (
    <span onPointerEnter={(e) => e.pointerType === 'mouse' && run()}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{shown}</span>
    </span>
  );
};
