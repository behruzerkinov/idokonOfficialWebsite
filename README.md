# IDO'KON website

Marketing site for shop owners in Uzbekistan. React 19, Vite 6, Tailwind 3, Motion. Languages: uz (default), ru, en.

```bash
bun install
bun run dev          # local dev
bun run build        # production build
bun run check:i18n   # uz/ru/en keys match
bun run test         # API tests
bun run test:e2e     # browser tests (build first, they run against preview)
```

More notes for contributors: [docs/HANDOFF.md](docs/HANDOFF.md).

## Design system: soft, token-driven, replaceable

Every colour, corner and spacing value on the site reads a CSS variable. Nothing is hard-coded in components, so the whole look can be swapped without touching them.

| Piece | File | What it does |
| --- | --- | --- |
| Presets | `src/theme/themes.js` | Cloud, Dusk, Blush, Lilac, Sand, Midnight. Add a preset by adding one object. |
| Provider | `src/theme/ThemeProvider.jsx` | Applies tokens to `<html>`, saves to localStorage, grows palette changes as a circle from the click (View Transitions). |
| Theme Studio | `src/theme/ThemeStudio.jsx` | Draggable floating dashboard: palette, accent, roundness, density, motion, frosted glass, live preview, copy theme. Pass your own `panels` array to replace any block. |
| Tokens and components | `src/index.css`, `tailwind.config.js` | `--r` (roundness) drives every Tailwind `rounded-*`. `--dens` scales section spacing. |
| Interactions | `src/lib/interactions.js` | One delegated layer: spotlight glow, 3D tilt, magnetic buttons, press ripple, scroll progress. Also `dragScroll` (inertial drag for carousels). |

Motion, by gesture:

- Hover: card lift and glow, tilt toward the pointer, magnetic buttons, arrow nudge, nav pill.
- Press: buttons scale down with a ripple, icon buttons squash with a spring.
- Scroll: header gains depth and a progress line, sections blur-in with stagger, hero window and chips drift at different speeds, ambient aurora moves slowly.
- Drag: hardware carousel scrolls with inertia, Theme Studio moves anywhere on screen.

Motion setting `Calm` drops decorative motion, `Off` removes it. `prefers-reduced-motion` is always respected.

To ship a new look: build it in the Studio, press **Copy theme**, and set it as `DEFAULTS` in `src/theme/themes.js`.
