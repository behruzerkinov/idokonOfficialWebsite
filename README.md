# IDO'KON website

React 19, Vite 6, Tailwind 3, Motion. Languages: uz, ru, en. Contributor notes: [docs/HANDOFF.md](docs/HANDOFF.md).

```bash
bun install && bun run dev
bun run build · bun run check:i18n · bun run test · bun run test:e2e
```

## Theming

All colours, corners and spacing are CSS variables. Presets live in `src/theme/themes.js`; the floating Theme Studio edits them live, and **Copy theme** exports the JSON to paste into `DEFAULTS`. The pointer grid, tilt, magnetic buttons and ripple are one frame-batched layer in `src/lib/interactions.js`.
