import React, { useRef, useState } from 'react';
import { AnimatePresence, m, useDragControls } from 'motion/react';
import { Check, Copy, Palette, RotateCcw, X } from 'lucide-react';
import { toast } from 'sonner';
import { ACCENTS, PRESETS } from './themes';
import { useTheme } from './ThemeProvider';

// ---- Building blocks. Swap any of these (or the whole PANELS list) to re-skin the Studio itself. ----

export const Section = ({ title, children }) => (
  <section className="studio-section">
    <h3>{title}</h3>
    {children}
  </section>
);

export const Segment = ({ value, options, onChange, label }) => (
  <div role="group" aria-label={label} className="segmented flex w-full">
    {options.map(([id, text]) => (
      <button key={id} type="button" aria-pressed={value === id} onClick={() => onChange(id)} className="seg-btn flex-1 !min-h-[36px] !px-2 !text-xs">{text}</button>
    ))}
  </div>
);

export const Switch = ({ checked, onChange, label }) => (
  <button type="button" role="switch" aria-checked={checked} aria-label={label} onClick={() => onChange(!checked)} className="switch">
    <span />
  </button>
);

// ---- Panels ----

const Presets = ({ s, update }) => (
  <Section title="Palette">
    <div className="grid grid-cols-3 gap-2">
      {PRESETS.map((p) => {
        const on = s.preset === p.id;
        return (
          <button key={p.id} type="button" aria-pressed={on} aria-label={p.name} onClick={(e) => update({ preset: p.id, accent: null }, e)} className="preset-tile">
            {on && <m.i layoutId="preset-ring" className="preset-ring" transition={{ type: 'spring', stiffness: 500, damping: 36 }} />}
            <span className="preset-swatch" style={{ background: p.vars['--bg'], borderColor: p.vars['--line'] }}>
              <i style={{ background: p.vars['--surface'] }} />
              <i style={{ background: p.vars['--accent'] }} />
            </span>
            <span className="text-[11px] font-semibold">{p.name}</span>
          </button>
        );
      })}
    </div>
  </Section>
);

const Accent = ({ s, update, preset }) => {
  const current = s.accent || preset.vars['--accent'];
  return (
    <Section title="Accent">
      <div className="flex flex-wrap items-center gap-2">
        {ACCENTS.map((c) => (
          <button key={c} type="button" aria-label={c} aria-pressed={current === c} onClick={() => update({ accent: c })} className="dot" style={{ background: c }}>
            {current === c && <Check size={14} strokeWidth={3} color="#fff" />}
          </button>
        ))}
        <label className="dot dot-custom" aria-label="Custom accent">
          <input type="color" value={current} onChange={(e) => update({ accent: e.target.value })} />
        </label>
      </div>
    </Section>
  );
};

const Shape = ({ s, update }) => (
  <Section title="Shape & space">
    <label className="studio-row">
      <span>Roundness</span>
      <output>{s.radius}px</output>
      <input type="range" min="2" max="28" value={s.radius} onChange={(e) => update({ radius: +e.target.value })} className="range" />
    </label>
    <Segment label="Density" value={s.density} onChange={(density) => update({ density })} options={[['compact', 'Compact'], ['cozy', 'Cozy'], ['airy', 'Airy']]} />
  </Section>
);

const Feel = ({ s, update }) => (
  <Section title="Feel">
    <Segment label="Motion" value={s.motion} onChange={(motion) => update({ motion })} options={[['full', 'Full'], ['calm', 'Calm'], ['off', 'Off']]} />
    <div className="studio-row !mt-3">
      <span>Frosted glass</span>
      <Switch label="Frosted glass" checked={s.glass} onChange={(glass) => update({ glass })} />
    </div>
  </Section>
);

/** A tiny live dashboard: proves every token (surface, accent, radius, shadow) at a glance. */
const Preview = () => (
  <Section title="Live preview">
    <div className="card studio-preview">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold" style={{ color: 'var(--muted)' }}>Today</span>
        <span className="pill !px-2 !py-0.5 !text-[11px]">+12%</span>
      </div>
      <p className="text-2xl font-bold tracking-tight tabular-nums">4 280 000</p>
      <svg viewBox="0 0 120 28" className="h-7 w-full" aria-hidden="true">
        <path d="M0 22 C15 20 20 8 35 12 S60 24 75 14 S100 2 120 6" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <button type="button" className="btn-primary !min-h-[36px] !text-xs">Primary action</button>
    </div>
  </Section>
);

export const PANELS = [Presets, Accent, Shape, Feel, Preview];

// ---- Dock: one draggable shell that is an orb when closed and a panel when open ----

export function ThemeStudio({ panels = PANELS }) {
  const t = useTheme();
  const [open, setOpen] = useState(false);
  const bounds = useRef(null);
  const moved = useRef(false);
  const controls = useDragControls();
  const grab = (e) => { moved.current = false; controls.start(e); };

  const copy = async () => {
    const { settings } = t;
    try { await navigator.clipboard.writeText(JSON.stringify(settings, null, 2)); toast.success('Theme copied'); }
    catch { toast.error('Copy is blocked in this browser'); }
  };

  return (
    <>
      <div ref={bounds} className="pointer-events-none fixed inset-0 z-[80]" />
      <m.div
        drag dragControls={controls} dragListener={false} dragConstraints={bounds} dragMomentum={false} dragElastic={0.12}
        onDragStart={() => { moved.current = true; }}
        whileDrag={{ scale: 1.03 }}
        className="studio fixed bottom-[84px] left-4 z-[81] md:bottom-6"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <m.div
              key="panel" role="dialog" aria-label="Theme Studio"
              initial={{ opacity: 0, scale: 0.9, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94, y: 8 }}
              transition={{ type: 'spring', stiffness: 420, damping: 32 }}
              style={{ transformOrigin: 'bottom left' }}
              className="studio-panel"
              onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
            >
              <header onPointerDown={grab} className="studio-head">
                <span className="flex items-center gap-2 text-sm font-bold"><Palette size={16} strokeWidth={2} aria-hidden="true" />Theme Studio</span>
                <button type="button" onPointerDown={(e) => e.stopPropagation()} onClick={() => setOpen(false)} className="icon-btn !h-8 !w-8" aria-label="Close"><X size={16} strokeWidth={2} /></button>
              </header>
              <div className="studio-body">
                {panels.map((P, i) => <P key={i} s={t.settings} preset={t.preset} update={t.update} />)}
              </div>
              <footer className="studio-foot">
                <button type="button" onClick={(e) => t.reset(e)} className="btn-outline !min-h-[36px] !px-3 !text-xs"><RotateCcw size={14} strokeWidth={2} aria-hidden="true" />Reset</button>
                <button type="button" onClick={copy} className="btn-outline !min-h-[36px] !px-3 !text-xs"><Copy size={14} strokeWidth={2} aria-hidden="true" />Copy theme</button>
              </footer>
            </m.div>
          ) : (
            <m.button
              key="orb" type="button" aria-label="Open Theme Studio"
              initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              whileHover={{ scale: 1.08, rotate: -8 }} whileTap={{ scale: 0.92 }}
              onPointerDown={grab}
              onClick={() => { if (!moved.current) setOpen(true); }}
              className="studio-orb"
            >
              <Palette size={20} strokeWidth={2} aria-hidden="true" />
            </m.button>
          )}
        </AnimatePresence>
      </m.div>
    </>
  );
}

export default ThemeStudio;
