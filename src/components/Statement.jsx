import React, { useEffect, useRef, useState } from 'react';
import { SITE } from '../data/site';

/** Closing band: the Higgsfield doodle, then a line whose words fade in once when scrolled into view. */
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
    <section className="section section-alt">
      <div ref={ref} className={`container-page text-center ${seen ? 'words-in' : ''}`}>
        <img src={SITE.brand.heroImage} alt="" width="757" height="558" loading="lazy" decoding="async" className="doodle mx-auto h-auto w-[220px]" />
        <p className="h2 mx-auto mt-4 max-w-[20ch]">
          <span className="sr-only">{words.join(' ')}</span>
          {words.map((w, i) => (
            <span key={i} aria-hidden="true" className="word" style={{ '--i': i }}>{w}&nbsp;</span>
          ))}
        </p>
        <button type="button" onClick={onOpenDemo} className="btn-primary mt-9 !px-8">{t.hero.ctaPrimary}</button>
      </div>
    </section>
  );
};
