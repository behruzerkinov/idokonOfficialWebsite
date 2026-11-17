// Theme presets. Every colour on the site reads one of these CSS variables, so adding a preset
// here (or pasting an exported theme from the Studio) restyles the whole site. No component edits.
//
// vars: --bg page, --alt tinted band, --surface cards, --fg text, --muted secondary text,
// --line hairlines, --deep / --deep-2 dark feature blocks, --on-deep(-muted) text on them,
// --accent brand colour, --sh shadow tint (r,g,b), --glow-a / --glow-b ambient background blobs.

export const PRESETS = [
  {
    id: 'cloud', name: 'Cloud', dark: false, pair: 'dusk',
    vars: {
      '--bg': '#f7f6f2', '--alt': '#efede6', '--surface': '#ffffff', '--fg': '#1b2220', '--muted': '#68716c',
      '--line': 'rgba(27, 34, 32, 0.09)', '--deep': '#17302c', '--deep-2': '#1f3d38', '--on-deep': '#f1f6f3', '--on-deep-muted': '#a3b8b0',
      '--accent': '#2f8f6b', '--sh': '27, 34, 32', '--glow-a': '#9be3c4', '--glow-b': '#f6dcb4',
    },
  },
  {
    id: 'dusk', name: 'Dusk', dark: true, pair: 'cloud',
    vars: {
      '--bg': '#0f1412', '--alt': '#131a17', '--surface': '#18211e', '--fg': '#eef3f0', '--muted': '#93a39b',
      '--line': 'rgba(238, 243, 240, 0.09)', '--deep': '#1c2925', '--deep-2': '#24352f', '--on-deep': '#f1f6f3', '--on-deep-muted': '#9db3aa',
      '--accent': '#5fd3a4', '--sh': '0, 0, 0', '--glow-a': '#1f6a50', '--glow-b': '#3a3a1f',
    },
  },
  {
    id: 'blush', name: 'Blush', dark: false, pair: 'plum',
    vars: {
      '--bg': '#fbf4f2', '--alt': '#f6e9e6', '--surface': '#ffffff', '--fg': '#2a1d20', '--muted': '#7a6a6d',
      '--line': 'rgba(42, 29, 32, 0.09)', '--deep': '#3a2530', '--deep-2': '#4a2f3c', '--on-deep': '#fbeff2', '--on-deep-muted': '#c9aab4',
      '--accent': '#d0586f', '--sh': '90, 40, 55', '--glow-a': '#ffc4cf', '--glow-b': '#ffe2b8',
    },
  },
  {
    id: 'lilac', name: 'Lilac', dark: false, pair: 'plum',
    vars: {
      '--bg': '#f6f4fb', '--alt': '#ece8f6', '--surface': '#ffffff', '--fg': '#1f1b2e', '--muted': '#6c6882',
      '--line': 'rgba(31, 27, 46, 0.09)', '--deep': '#26214a', '--deep-2': '#322b5e', '--on-deep': '#f1eefc', '--on-deep-muted': '#b1abd6',
      '--accent': '#6f5ce6', '--sh': '50, 40, 110', '--glow-a': '#cfc6ff', '--glow-b': '#ffd3e6',
    },
  },
  {
    id: 'sand', name: 'Sand', dark: false, pair: 'plum',
    vars: {
      '--bg': '#faf6ee', '--alt': '#f2ead9', '--surface': '#fffdf8', '--fg': '#2a2318', '--muted': '#7b7260',
      '--line': 'rgba(42, 35, 24, 0.1)', '--deep': '#3a2f1c', '--deep-2': '#4a3d26', '--on-deep': '#faf3e3', '--on-deep-muted': '#c4b697',
      '--accent': '#b9672a', '--sh': '80, 55, 20', '--glow-a': '#ffd9a8', '--glow-b': '#e6f0c2',
    },
  },
  {
    id: 'plum', name: 'Midnight', dark: true, pair: 'cloud',
    vars: {
      '--bg': '#0d0f1a', '--alt': '#11141f', '--surface': '#171a29', '--fg': '#eceefb', '--muted': '#8f94b3',
      '--line': 'rgba(236, 238, 251, 0.09)', '--deep': '#1b1f36', '--deep-2': '#252a48', '--on-deep': '#eceefb', '--on-deep-muted': '#9aa0c4',
      '--accent': '#8aa4ff', '--sh': '0, 0, 0', '--glow-a': '#2b3a8f', '--glow-b': '#4a2a6a',
    },
  },
];

export const ACCENTS = ['#2f8f6b', '#3b82f6', '#6f5ce6', '#d0586f', '#e0822c', '#14a3a8'];

export const DEFAULTS = { preset: 'cloud', accent: null, radius: 16, density: 'cozy', motion: 'full', glass: true };
export const DENSITY = { compact: 0.78, cozy: 1, airy: 1.28 };

export const byId = (id) => PRESETS.find((p) => p.id === id) || PRESETS[0];

/** Readable text colour (dark or white) for a given background hex. */
export const inkFor = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [n >> 16, (n >> 8) & 255, n & 255].map((c) => { const s = c / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.42 ? '#10201a' : '#ffffff';
};

const KEY = 'idokon_theme_v2';
export const load = () => {
  try {
    const s = { ...DEFAULTS, ...JSON.parse(localStorage.getItem(KEY)) };
    return PRESETS.some((p) => p.id === s.preset) ? s : DEFAULTS;
  } catch { return DEFAULTS; }
};
export const save = (s) => { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* storage unavailable */ } };

/** Write a settings object onto <html>. Pure DOM, safe to call before React mounts. */
export const apply = (s) => {
  const root = document.documentElement;
  const p = byId(s.preset);
  Object.entries(p.vars).forEach(([k, v]) => root.style.setProperty(k, v));
  const accent = s.accent || p.vars['--accent'];
  root.style.setProperty('--accent', accent);
  root.style.setProperty('--accent-ink', inkFor(accent));
  root.style.setProperty('--r', `${s.radius}px`);
  root.style.setProperty('--dens', DENSITY[s.density] ?? 1);
  root.classList.toggle('dark', p.dark);
  root.dataset.theme = p.id;
  root.dataset.motion = s.motion;
  root.dataset.glass = s.glass ? 'on' : 'off';
  root.style.colorScheme = p.dark ? 'dark' : 'light';
};
