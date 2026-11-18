# iDokon website

React 19, Vite 6, Tailwind 3. Languages: uz, ru, en. Contributor notes: [docs/HANDOFF.md](docs/HANDOFF.md), agent rules and change history: [CLAUDE.md](CLAUDE.md).

```bash
bun install && bun run dev
bun run build · bun run check:i18n · bun run test · bun run test:e2e
```

`bun run test:e2e` uses Playwright's own browsers; without them run `PW_CHANNEL=chrome bun run test:e2e`.

## Theming and motion

Colours are CSS tokens in `src/index.css`, written once with `light-dark()`; `<html class="dark">` switches the scheme (set before paint in `index.html`). Animation is CSS only: scroll-driven reveals (`.reveal`), parallax (`.drift`), rolling numbers (`NumberRoll`), native `<dialog>` with `@starting-style`.
