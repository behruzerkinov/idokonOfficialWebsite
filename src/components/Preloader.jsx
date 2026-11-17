import React, { useEffect, useState } from 'react';
import { SITE } from '../data/site';

const KEY = 'idokon_preloader_seen';
const seen = () => {
  try { return sessionStorage.getItem(KEY) === '1' || window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch { return true; }
};

/** First visit per tab only: logo, a counter and a thin bar, about 0.7 s. Never blocks clicks (pointer-events none). */
export const Preloader = () => {
  const [skip] = useState(seen);
  const [n, setN] = useState(0);
  const [out, setOut] = useState(false);
  const [gone, setGone] = useState(skip);

  useEffect(() => {
    if (skip) return;
    const t0 = performance.now();
    let id;
    const tick = (now) => {
      const p = Math.min((now - t0) / 600, 1);
      setN(Math.round(100 * (1 - (1 - p) ** 3)));
      if (p < 1) id = requestAnimationFrame(tick);
      else {
        setOut(true);
        try { sessionStorage.setItem(KEY, '1'); } catch { /* ignore */ }
        setTimeout(() => setGone(true), 450);
      }
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [skip]);

  if (gone) return null;
  return (
    <div className="preloader" data-out={out} aria-hidden="true">
      <div className="w-56 text-center">
        <img src={SITE.brand.logo} alt="" width="140" height="43" className="mx-auto h-10 w-auto" />
        <div className="mt-6 h-[3px] overflow-hidden rounded-full" style={{ background: 'var(--line)' }}>
          <div className="h-full bg-emerald-500" style={{ width: `${n}%` }} />
        </div>
        <p className="mt-3 font-mono text-xs tabular-nums" style={{ color: 'var(--muted)' }}>{n}%</p>
      </div>
    </div>
  );
};
