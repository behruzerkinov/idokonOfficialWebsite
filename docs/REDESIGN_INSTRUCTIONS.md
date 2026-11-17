# IDO'KON website redesign: instructions

Audience: any coding agent or developer continuing this work in `idokonOfficialWebsite`.
Read `CLAUDE_PROJECT_OVERVIEW.md` and `docs/HANDOFF.md` first. Where they disagree with this file about the repo's current state, trust the code.

## 1. Premise

Every shop owner ends the day counting the till. IDO'KON is the day already counted.
Every section serves that idea: sell, stock, profit, done. A section that does not serve it does not belong.

Signature element: a sample till receipt that prints line by line (`src/components/ReceiptTape.jsx`). Spend the boldness budget there. Keep everything else quiet.

## 2. Design rules (do not break)

- Brand colour is emerald (`--accent`, `#059669` light, `#34d399` dark). No second accent. The logo is five emerald dots.
- The accent appears in rare doses: the call to action, focus states, one or two emphasis moments.
- The canvas is never pure white or pure black. Tokens in `src/index.css`:
  - light: `--bg #f6f8f7`, `--stage #e9eeec`, `--surface #ffffff`
  - dark: `--bg #09130f`, `--stage #13211b`, `--surface #1a2a23`
  - receipt paper: `--paper #f3f4ee`, `--paper-ink #1d2421`, `--paper-muted #6b746f`
- Fonts: Onest (variable, self-hosted in `public/fonts`, Latin, Latin ext, Cyrillic) for all text. Roboto Mono (self-hosted) only for receipt lines and small labels. Never Inter or Roboto as display.
- No two neighbouring sections share the same layout skeleton (kicker, headline, lede over the same grid). Reshape one.
- Motion: strong ease-out (`--ease-out`), press scale 0.97, hover effects only under `@media (hover: hover)`. Every animation has a `prefers-reduced-motion` fallback that shows the final state.
- Never put letters or numbers inside generated images. Text stays in HTML.
- Copy is plain, short, human. Zero em dashes. None of these words: leverage, seamless, empower, unlock, robust, actionable, data-driven, solutions.

## 3. Trust rules (these override design)

- Marketing claims render only when `verified: true` in `SITE.claims` (`src/data/site.js`). Never add or strengthen a number, rating, guarantee, uptime, response time or integration claim.
- Do not claim stock updates automatically, profit is calculated automatically, setup takes N minutes, or training is free on every plan until the owner confirms it.
- The receipt shows sample items. It must keep its "Namuna / Пример / Sample" label. Do not present its prices as real.
- Forms stay hidden while `SITE.leadsEnabled === false`. Never show a fake success state. When leads are turned on, the success text must match where the message really goes (Telegram group via `api/lead.js`).
- Prices live in `SITE.plans` and are duplicated in the JSON-LD in `index.html`. Change both together, and only after the owner confirms.

## 4. What is already done

| Item | Where |
|---|---|
| Tinted canvas tokens, receipt styles, Onest and Roboto Mono `@font-face` | `src/index.css` |
| `sans` set to Onest first, new `mono` family | `tailwind.config.js` |
| Preload of the main Latin font file | `index.html` |
| Receipt component | `src/components/ReceiptTape.jsx` |
| Hero headline and sample receipt, `lang` prop passed from `App.jsx` | `src/components/Hero.jsx`, `src/App.jsx` |
| `hero.title` rewritten, `hero.receipt` block added (uz, ru, en) | `src/data/translations.js` |
| Font files | `public/fonts/onest-*-wght-normal.woff2` |

Hero copy now:

| | Uzbek (default) | Russian | English |
|---|---|---|---|
| Title | Butun do'kon, bitta chekda | Весь магазин на одном чеке | Your whole shop, on one receipt |

## 5. What to do next, in order

1. **How it works** (`HowItWorks.jsx`): turn the three steps into three printed receipt lines on one tape. Keep the existing copy keys. Reduced motion shows all lines.
2. **Pricing** (`PricingCalculator.jsx`): print each plan as a receipt total. Keep `SITE.plans` as the only price source. Keep the period switch.
3. **Features and sectors** (`PosInteractiveShowcase.jsx`, `SectorSolutions.jsx`): make sure these two do not share a layout skeleton. Real screenshots stay as they are.
4. **Hardware** (`HardwareMarketplace.jsx`): add a "your checkout setup" total at the bottom of the cart summary. No new claims about stock or delivery.
5. **Page environment**: add one fixed background layer behind the page (slow drift or grain in emerald tint, 60 seconds or longer cycle). It must not cause layout shift.
6. **Brand assets** (`docs/higgsfield-brief.md`): optional hero loop. Generate only after the owner approves the credit cost. Site must stay complete without it.
7. **Open items from `docs/HANDOFF.md`** that matter once leads go live: rate limit on `/api/lead`, reject names over 80 characters with a test, phone mask backspace bug, Modal re-focus bug, `public/og.png` (1200x630).

## 6. Adding copy

- Every user-visible string needs a key in `src/data/translations.js` in all three languages (uz, ru, en) with identical key paths.
- Uzbek is the default and must read naturally in Latin script, not as a translation.
- Run `npm run check:i18n` after every copy change. It must print `i18n OK`.

## 7. Verification checklist (run before calling anything done)

1. `npm run build` passes. Initial JS must stay at or under 180 KB gzip. Current build is about 180.7 KB, so trim something when you add code.
2. `npm run check:i18n` passes.
3. `node --test api/lead.test.mjs` passes (8 tests).
4. `npm run test:e2e` passes (13 tests, 1 skipped while leads are off).
5. Screenshot at 1440x900, 1280x800, 375x812 and 360x740, in light and dark, in uz, ru and en. No sideways scroll. No text overflow. Check Russian headlines first, they are the longest.
6. Compute contrast, do not guess: 4.5 to 1 for body text, 3 to 1 for large text and interactive borders, in both themes, including text over the hero image.
7. Keyboard: tab through the page, focus ring visible on every control, skip link works, modals trap and restore focus.
8. Reduced motion on: final states visible, no animation running. Toggle it while the page is open too.
9. Browser console has zero errors at desktop and phone sizes.
10. Run Lighthouse. Targets: Performance 90, Accessibility, Best Practices and SEO 95.
11. Test on a real phone on a mobile connection. Most visitors arrive this way.

## 8. Environment gotchas

- `node_modules` in the Windows working copy is Windows-only (no Linux `.bin`). To build on Linux, copy the source elsewhere and run `npm install --no-package-lock` there.
- The repo's committed files use LF line endings. Keep LF when editing, or `git diff` fills with whole-file changes.
- `npm test` runs `node --test api/`, which fails on Node 22 (it cannot take a directory). Use `node --test api/lead.test.mjs`.
- Git identity is not configured on this machine. Commit with the repo's existing author via `-c user.name=... -c user.email=...`.
- Dev server: `npm run dev`. The `/api` route only works under `vercel dev`.

## 9. Questions the owner must answer before the related change ships

1. Which claims in `SITE.claims` are true and provable? Until then they stay `verified: false`.
2. Is setup free, and is training free, on every plan? The hero fact line currently says free training.
3. Support hours (`SITE.supportHours`).
4. Telegram bot token and chat id, to turn `leadsEnabled` on.
5. Production domain. Default is `https://idokon.uz`.
6. Whether to generate the Higgsfield hero loop, given the credit cost.
