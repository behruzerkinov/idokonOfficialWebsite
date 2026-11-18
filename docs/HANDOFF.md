# iDokon website: handoff note

Repo: github.com/behruzerkinov/idokonOfficialWebsite (branch `main`). Stack: React 19, Vite 6, Tailwind 3, bun.

## Goal
Marketing site for shop owners in Uzbekistan. It must prove: easy to use, we stay with you (setup, training,
data migration from 1C/Excel, support, free course), clear prices, honest claims. Languages: uz (default), ru, en.

## What is built (all merged to main)
- Page follows the owner's live reference (https://idokom-uz.netlify.app): hero with product window, partners strip, 4 feature cards, dark software section with 4 screen tabs, sectors, hardware carousel with a running total (no cart), integrations (each company its own card), care (migration, training, support), how it starts, pricing with 1/6/12 month switch and rolling digits (Premium highlighted), course, FAQ, contact, closing line, dark footer. Mobile sticky call/Telegram bar.
- One facts file: `src/data/site.js` (phones, Telegram, Instagram, plans, claims, brand assets, flags).
  Claims (10 min setup, phone/Telegram support) render only while `verified: true`. The 4.9 rating was removed at the owner's request; the hero shows an Uzbek proverb instead.
- Copy lives in `src/data/translations.js` (3 languages, same keys). Check with `bun run check:i18n`.
- Visual style: one token set using CSS `light-dark()`, dark by default (index.html sets the class before paint), light/dark toggle only. Motion is CSS: scroll-driven reveals and parallax, `@starting-style` dialogs, View Transition theme switch. No animation library.
- Offline mode: `SITE.leadsEnabled = false`. Forms are hidden; visitors see call and Telegram buttons.
- Lead API is ready but off: `api/lead.js` (Vercel function, posts to a Telegram group), with tests.
  Turn on: set `leadsEnabled: true`, add `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` on Vercel.
  Local test of the API needs `vercel dev` (plain `bun run dev` has no /api).
- Brand assets: `SITE.brand` (logo, heroImage). `heroImage` is the Higgsfield line doodle (`public/brand/hero-shop.webp`, made with Nano Banana 2). The old grid and loop slots were dropped.
- No Theme Studio, no preloader, no cart: removed on the owner's request (2026-11-19).

## Commands
- `bun run build`, `bun run check:i18n`, `bun run test` (8 API tests), `bun run test:e2e` (17 browser tests, 1 skipped while leads are off)

## Open items
1. Done: hero doodle (Higgsfield, Nano Banana 2, 0.25 credits). Optional later: a hero loop or more doodles for the care and closing sections. The free plan blocks the GPT image models; Nano Banana 2 works.
2. Done: `public/og.png` (1200x630), built from the logo and the doodle.
3. Review fixes not applied yet (matter once leads are on):
   - rate limit `/api/lead` (Vercel Firewall rule)
   - reject names over 80 chars in `api/lead.js` (currently cut to 80), with a test
   - phone mask: backspacing into `+998` re-inserts digits (`src/lib/submitLead.js`)
   - (fixed) Modal is a native <dialog> now
   - one e2e test for Esc / focus trap
   - JSON-LD prices in `index.html` duplicate `SITE.plans`
   - (fixed) dead translation keys removed; `contact.storeTypeOptions` restored (the form crashed without it)
4. Not verified: Lighthouse scores (targets: Perf 90, A11y/BP/SEO 95), real phone check, dark-mode logo look.
5. Owner inputs still unknown: which claims are true, support hours (`SITE.supportHours`), whether setup and
   training are free on all plans, Telegram bot token and chat id, production domain (default https://idokon.uz).

## Notes
- Git identity is not configured on this machine; commits used the repo's existing author via `-c` flags.
- Initial JS is about 94 KB gzip (React + copy); everything below the hero is one lazy chunk (~13 KB gzip). Measured on a throttled phone: LCP 1.2 s, CLS 0.00.
- Working copy has CRLF line endings; edit scripts should normalise them.
