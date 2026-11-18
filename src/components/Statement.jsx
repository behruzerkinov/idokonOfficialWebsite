import { useEffect, useRef, useState } from 'react';
import { SITE } from '../data/site';

/** Closing band: the doodle, then two lines whose words fade in once when scrolled into view. */
export const Statement = ({ t, onOpenDemo }) => {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const lines = [t.closing.w1, t.closing.w2];
  let i = 0;
  return (
    <section className="section section-alt">
      <div ref={ref} className={`container-page text-center ${seen ? 'words-in' : ''}`}>
        <img src={SITE.brand.heroImage} alt="" width="757" height="558" loading="lazy" decoding="async" className="doodle mx-auto h-auto w-[220px]" />
        <p className="h2 mx-auto mt-4 max-w-[22ch]">
          <span className="sr-only">{lines.join(' ')}</span>
          {lines.map((line, l) => (
            <span key={l} aria-hidden="true" className={`block ${l ? 'mt-2' : ''}`} style={l ? { color: 'var(--accent)' } : undefined}>
              {line.split(' ').map((w) => <span key={i} className="word" style={{ '--i': i++ }}>{w}&nbsp;</span>)}
            </span>
          ))}
        </p>
        <button type="button" onClick={onOpenDemo} className="btn-primary mt-9 !min-h-[48px] !px-8">{t.hero.ctaPrimary}</button>
      </div>
    </section>
  );
};
