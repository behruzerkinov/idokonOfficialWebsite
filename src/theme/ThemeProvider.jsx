import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { DEFAULTS, apply, byId, load, save } from './themes';

const Ctx = createContext(null);
export const useTheme = () => useContext(Ctx);

/** Apply before React mounts so a saved dark theme never flashes light. */
export const bootTheme = () => apply(load());

const calm = (s) => s.motion !== 'full' || matchMedia('(prefers-reduced-motion: reduce)').matches;

export function ThemeProvider({ children }) {
  const [settings, setSettings] = useState(load);

  // Change settings. With an origin event on a preset/dark change, the new theme grows out of the click as a circle.
  const current = useRef(settings);
  const update = useCallback((patch, origin) => {
    const prev = current.current;
    const next = { ...prev, ...patch };
    current.current = next;
    const run = () => { apply(next); save(next); };
    const root = document.documentElement;
    if (patch.preset && patch.preset !== prev.preset && origin?.clientX != null && document.startViewTransition && !calm(next)) {
      root.style.setProperty('--vx', `${origin.clientX}px`);
      root.style.setProperty('--vy', `${origin.clientY}px`);
      document.startViewTransition(run);
    } else {
      root.classList.add('theme-fade');
      setTimeout(() => root.classList.remove('theme-fade'), 400);
      run();
    }
    setSettings(next);
  }, []);

  const value = useMemo(() => {
    const preset = byId(settings.preset);
    return {
      settings, preset, isDark: preset.dark, update,
      reset: (e) => update({ ...DEFAULTS }, e),
      toggleDark: (e) => update({ preset: preset.pair }, e),
    };
  }, [settings, update]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
