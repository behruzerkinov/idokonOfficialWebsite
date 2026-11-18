import { useCallback, useState } from 'react';

const KEY = 'idokon_theme';
const root = document.documentElement;

/** Light/dark only. index.html sets the class before paint; this keeps React in sync and animates the switch. */
export function useDark() {
  const [dark, setDark] = useState(() => root.classList.contains('dark'));
  const toggle = useCallback((e) => {
    const next = !root.classList.contains('dark');
    const run = () => {
      root.classList.toggle('dark', next);
      try { localStorage.setItem(KEY, next ? 'dark' : 'light'); } catch { /* storage unavailable */ }
      setDark(next);
    };
    if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) return run();
    root.style.setProperty('--vx', `${e?.clientX ?? innerWidth / 2}px`);
    root.style.setProperty('--vy', `${e?.clientY ?? 0}px`);
    document.startViewTransition(run);
  }, []);
  return [dark, toggle];
}
