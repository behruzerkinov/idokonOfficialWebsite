import React, { useEffect, useRef, useState } from 'react';
import { SITE } from '../data/site';

/** Closing line: words fade in one by one once, when scrolled into view. */
export const Statement = ({ t, onOpenDemo }) => {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), { threshold: 0.4 });
    ref.current && io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const words = [t.closing.w1, t.closing.w2, t.closing.w3].join(' ').split(' ');
  return (
    <section className="section">
      <div ref={ref} className={`container-page text-center ${seen ? 'words-in' : ''}`}>
        <p className="h1 mx-auto max-w-[18ch]">
          <span className="sr-only">{words.join(' ')}</span>
          {words.map((w, i) => (
            <span key={i} aria-hidden="true" className="word" style={{ '--i': i }}>{w}&nbsp;</span>
          ))}
        </p>
        <button type="button" onClick={onOpenDemo} className="btn-dark mt-10 !px-7">
          {t.hero.ctaPrimary}
        </button>
      </div>
    </section>
  );
};
