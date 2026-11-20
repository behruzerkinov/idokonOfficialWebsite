import { useCallback, useState } from 'react';

const KEY = 'idokon_theme';
const root = document.documentElement;

/** Light/dark only. index.html sets the class before paint; this keeps React in sync. */
export function useDark() {
  const [dark, setDark] = useState(() => root.classList.contains('dark'));
  const toggle = useCallback(() => {
    const next = !root.classList.contains('dark');
    root.classList.toggle('dark', next);
    try { localStorage.setItem(KEY, next ? 'dark' : 'light'); } catch { /* storage unavailable */ }
    setDark(next);
  }, []);
  return [dark, toggle];
}
