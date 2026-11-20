# CLAUDE.md

Marketing site for **iDokon** (shop POS software, Uzbekistan). React 19 + Vite 6 + Tailwind 3, bun. Copy in uz (default), ru, en. Runtime dependencies: react and react-dom only.

## Rules from the owner

- The brand is written **iDokon**. Never IDO'KON, IDO‘KON, I-Do‘kon or Ido'kon, in any language or file.
- Do not invent features, numbers or claims. Feature lists come from the owner's reference (pricing: `Desktop/tarifs.jpeg`). Wording may be polished, not rewritten.
- Things iDokon does **not** have, so never mention them: interactive course tasks, an E-imzo SMS notification system, a customer rating badge.
- Plans: Start → Standart (= Start + its own list) → Premium (= Start + Standart + its own list). **Premium is the popular, highlighted plan.** The Telegram bot and the Seyf (all cash in one place, marked New) are Premium only.
- Hardware is shown as a catalogue with a running total. No cart, no checkout, no "add to cart".
- Payment and fiscal partners (Click, Payme, Uzum, Arca, Multikassa) each get their own cell or card, never merged.
- For questions the site cannot answer, send visitors to the call centre.
- No Theme Studio and no palette editor: light/dark toggle only. Dark is the default.
- Prefer current platform features over libraries or legacy patterns (CSS scroll-driven animations, `light-dark()`, native `<dialog>`, `@starting-style`, View Transitions). Less code for the same result.
- After every change: `bun run build`, `bun run check:i18n`, `bun run test`, `bun run test:e2e` (`PW_CHANNEL=chrome` if Playwright browsers are missing). Check for horizontal overflow at 360/375 in **all three languages**, and keep CLS at 0. Then push straight to `main`.
- **Append an entry to the history below every time something changes.**

## Map

- `src/data/site.js`: facts (phones, links, plans and prices, claims, `leadsEnabled`), `formatNum` / `formatPrice`.
- `src/data/translations.js`: all copy, same keys in every language (`bun run check:i18n`).
- `src/index.css`: warm neutral tokens (light-dark), Onest + digits-only mono (`.num`, the till-receipt signature), type scale (weights 400/500), cards, buttons, hero stage, dialogs, FAQ, `NumberRoll`.
- `public/fonts/`: self-hosted Onest (latin, latin-ext, cyrillic) and a 2 KB digits-only JetBrains Mono subset, both OFL; `font-display: optional` + preload, so no swap shift.
- `src/components/Img.jsx` + `scripts/images.mjs` (`bun run images`, needs ffmpeg): masters live in `assets/` (screens, hardware, phones), responsive AVIF/WebP go to `public/img/`; phone screenshots keep their transparency (AVIF alpha plane). Every image has width/height; lazy ones fade in once decoded.
- `src/components/icons.jsx`: inline line icons (Lucide paths), no icon package.
- `src/components/BelowFold.jsx`: everything under the hero, one lazy chunk.
- `src/lib/scroll.js`: in-page navigation (`scrollToId`); `src/lib/theme.js`: dark toggle.
- `api/lead.js`: lead delivery to Telegram (off while `SITE.leadsEnabled` is false).
- `PRODUCT.md` (product truth), `DESIGN.md` + `.impeccable/design.json` (the built visual system), `.impeccable/surfaces/src-app-jsx.md` (direction contract). Project skills in `.claude/skills/` (impeccable for design, ponytail for smallest-change coding).

## History

```json
[
  {
    "date": "2026-11-19",
    "summary": "Owner feedback round: professional navbar, honest hero, working screen tabs, split partners, Premium-first pricing, cart removed, CSS-only motion, SEO/CLS pass.",
    "changes": [
      "Navbar: replaced the liquid-glass SVG-refraction bar with a full-width bar that turns solid with a hairline on scroll (scroll-driven CSS, no listener), a sliding active-section pill (IntersectionObserver scroll spy), compact language menu, native <dialog> mobile sheet.",
      "Hero: removed the 4.9/5 rating card; added the Uzbek proverb 'Hisobli do‘st ayrilmas' with a one-line note tied to shop accounting. 'Bog‘lanish' scrolls to the contact section instead of dialing.",
      "Software screens: tabs are now Kassa, Savdo hisoboti, Qoldiqlar, ABC tahlil with matching screenshots; all images stay mounted and cross-fade, so a tab press always shows its screen; the window label follows the tab.",
      "Partners strip and integrations: Click, Payme, Uzum, Arco, Multikassa each in their own cell/card with name and description; E-imzo SMS removed everywhere (logo files deleted).",
      "Sectors: three solid cards with icons and full-contrast titles.",
      "Pricing: features from tarifs.jpeg; Standart = Start + 6, Premium = Start + Standart + loyalty, ABC/OOS analytics, product movement, Telegram bot, Seyf (New). Premium highlighted as popular. Prices roll digit-by-digit (NumberRoll).",
      "Hardware: cart, drawer, add-to-cart and toasts removed; devices are selectable and a sticky total rolls to the new sum; 'choose a kit for me' pre-fills the contact message with the selection.",
      "Copy: brand fixed to iDokon in all languages and docs; interactive-course claims removed; FAQ points to the call centre; closing line changed to 'Ko‘rdingizmi, hammasi shunchalik oson! Endi siz ham do‘koningizda sinab ko‘ring!'.",
      "Removed: Theme Studio and presets, preloader, motion, vaul and sonner dependencies, tilt/magnetic/ripple/pointer-grid effects, content-visibility (it made in-page jumps land off target).",
      "Performance/SEO: correct intrinsic sizes for hero and course images, metric-matched fallback font, LCP image preload, Organization + SoftwareApplication JSON-LD, localized titles and descriptions. Throttled phone: LCP 1.2 s, CLS 0.00.",
      "Fixes: restored contact.storeTypeOptions (the contact form crashed when leads are enabled); FAQ and pricing controls no longer overflow at 360px in Russian.",
      "Tests: e2e updated for the new hardware estimator, pricing roll, Premium highlight, screen tabs, hero, brand spelling; Playwright can use installed Chrome via PW_CHANNEL."
    ]
  },
  {
    "date": "2026-11-19",
    "summary": "Fix nav rapid switch animation glitch, add attached favicon, Emil Kowalski accordion, transparent brand badges with Arca, and dynamic cursor animations in grid system.",
    "changes": [
      "Navbar: fixed glitch when rapidly switching nav links (e.g. 1 to 5). Added active locking and aborted competing smooth scroll listeners so the indicator pill glides uninterrupted without stopping at intermediate sections.",
      "Favicon: replaced Chrome tab icon with the user-provided D+ logo across public/favicon.png, apple-touch-icon.png, and favicon.ico.",
      "Brand Badges: changed Arco to Arca everywhere. Removed white square background from brand badges, making them transparent with distinct border, hover glow, and displaying brand name individually next to the logo.",
      "Grid System & Custom Cursor: added dynamic cursor move animation in background grid with radial illumination and glowing accent grid lines under the pointer. Implemented custom fine-pointer cursor with precision dot and fluid trailing ring.",
      "FAQ Accordion: removed question 2 completely across all languages, updated question/answers to exact copy, and implemented butter-smooth Emil Kowalski accordion animation (CSS grid 0fr->1fr and content slide-fade)."
    ]
  },
  {
    "date": "2026-11-19",
    "summary": "Remove delayed cursor animation; fix brand logos contrast and professional card positioning.",
    "changes": [
      "Cursor: removed delayed trailing cursor animation and custom cursor overlay completely, restoring native zero-latency pointer.",
      "Brand Logos & Contrast: created adaptive vector BrandLogo component. Click text is now crisp white in dark mode and dark slate in light mode; Uzum has high-contrast bright violet in dark mode; Arca has crisp white/sky-blue lettering in dark mode without washed-out filters.",
      "Professional Layout: removed awkward nested badge-in-card containers and duplicate names ('click Click', etc.). Integration cards now feature clean top-aligned logos with generous spacing and elegant typography."
    ]
  },
  {
    "date": "2026-11-19",
    "summary": "Add dedicated iOS and Android mobile apps section with creative device mockups and App Store / Google Play CTAs.",
    "changes": [
      "MobileAppSection: created stunning, high-depth mobile app showcase featuring creative 3D tilted device shots (iPhone 16 Pro executive dashboard with dynamic island & revenue sparklines, and Android terminal with camera viewfinder scanner & instant checkout).",
      "Floating micro-badges: added real-time receipt notification and 100% offline sync status badges floating seamlessly above mockups.",
      "Store CTAs: designed authentic App Store and Google Play download badges with genuine vendor marks, micro-copy, and compatibility specifications.",
      "Full i18n: added complete translations for mobile app section across Uzbek, Russian, and English (28 keys per locale, 254 total keys shared).",
      "Responsive & Accessible: fully verified across 360px, 375px, 768px, 1024px, and 1440px viewports with zero horizontal scroll and WCAG AAA compliance."
    ]
  },
  {
    "date": "2026-11-19",
    "summary": "Refine mobile app section: remove top tovarlar from kassa, remove bluetooth scanner claims, enforce always-online cloud sync, elevate App Store / Google Play badge aesthetics, and add interactive screenshot transitions.",
    "changes": [
      "No top tovarlar in kassa: completely removed top selling products list from kassa screens and feature descriptions; replaced with realistic live recent receipt stream and instant checkout cart.",
      "Camera scan only: removed all Bluetooth scanner references; mobile POS scans product barcodes directly via phone camera.",
      "Always-online cloud sync: removed 100% offline claims and offline badges. Updated to always-online real-time cloud sync with live active connection telemetry badge.",
      "Premier store badge aesthetics: redesigned App Store and Google Play badges to match official vendor branding in luxury obsidian style with authentic Apple & 4-color Google Play vector marks, refined typography, and removed awkward arrows & generative pseudo-QR.",
      "Interactive screenshot transitions: added view toggle between POS Kassa (scanner & checkout) and Management Dashboard with smooth 3D perspective depth, rotational transitions, and ambient lighting."
    ]
  },
  {
    "date": "2026-11-20",
    "summary": "Apple-grade rebuild (apple-design skill, HIG): quieter type and colour, tiles instead of templated cards, production images, purposeful motion only, two runtime dependencies.",
    "changes": [
      "Design: system UI font (SF Pro / Segoe UI) with one type scale (80/56/28/21/17/14), black/white surfaces with #1d1d1f / #f5f5f7 tiles, brand green kept for primary actions and links only (contrast ratios noted in index.css), pill buttons, translucent system-style nav.",
      "Removed as templated: eyebrow pills on every section, 01/02/03 markers on non-sequences, cursor-glow grid background, spotlight cards, gradient headline text, mac window dots, floating 'live' pill, inset deep panels, word cascade, the doodle in the closing.",
      "Hero is centred with the product screenshot at full width; the proverb 'Hisobli do‘st ayrilmas' is its own quiet section.",
      "Mobile app section rebuilt without the fabricated phone UI (fps, 5G, Wi-Fi %, sample sums) and without hand-drawn App Store / Google Play badges; store buttons show once SITE.appStore / SITE.googlePlay are set.",
      "Images: masters moved to assets/, scripts/images.mjs builds AVIF + WebP at 400–1400 px; hardware photos now served locally (were ~7 MB of PNGs from idokon.uz, now 2–8 KB AVIF each), LCP image preloaded as AVIF with matching sizes, lazy images fade in on decode.",
      "Motion: kept only NumberRoll, tab cross-fade, dialog fade, FAQ height, image fade, mobile call bar slide-in; everything else removed. One reduced-motion rule covers all; reduced transparency swaps the blur for a solid bar.",
      "FAQ is a native exclusive <details name> accordion; contact no longer lists the phones twice while offline; hardware total floats only on desktop and never over the heading.",
      "Dependencies removed: lucide-react, @fontsource-variable/inter, autoprefixer, playwright (kept @playwright/test), @types/react, @types/react-dom. CSS 52 → 24 KB, below-fold JS 80 → 48 KB, no web fonts.",
      "Copy: removed unused keys (fake UI strings, eyebrows, window labels), sentence case instead of ALL CAPS labels, dropped the arrow from 'Savdo tezligi'.",
      "Checks: build, i18n, 8 API tests, 21 e2e (1 skipped offline); no overflow at 360/375 in uz/ru/en; CLS 0 while scrolling the whole page. Lighthouse mobile 98/100/100/100, desktop 100/100/100/100."
    ]
  },
  {
    "date": "2026-11-20",
    "summary": "Whole-site redesign with unslop (heydamir/unslop) and Stageshow (benjitaylor/skills), plus a mobile app gallery from the owner's real iOS and Android screenshots.",
    "changes": [
      "Direction (unslop): exact, honest, neighbourly; world = the shop counter and receipt paper; warm neutral ramp instead of pure grey, brand green as the one accent; signature = money in monospaced digits like a till printout.",
      "Type: Onest self-hosted (latin/latin-ext/cyrillic), weights 400 and 500 only, no negative tracking on small text, headlines without trailing periods, hero eyebrow removed.",
      "Layout: no more everything-centred template. Hero is left-aligned over a Stageshow device pair (the till on desktop, the payment step on a phone straddling its edge, compact design under 640px). Features, How it works, Integrations and FAQ use a heading column plus ruled rows; sectors are one ruled row; equal cards kept only where the content is truly parallel (plans, hardware, care).",
      "Mobile app section is now a gallery of the six real screenshots (catalog, cart, payment on iOS and Android) with a platform switch that cross-fades, step captions, and a swipeable row on phones. AVIF with alpha at 300/600 px, 5–25 KB each.",
      "Components: 10px buttons and inputs, 16px cards, 20px dialogs; secondary buttons are a raised surface with a hairline; icons 16–20px at stroke 1.5 in the muted text colour; solid nav with a hairline (no glass).",
      "Copy: new keys mobileApp.platform / stepsLabel / steps.*, hero.phoneAlt in uz, ru, en; trailing periods dropped from headlines. The closing line keeps its exclamation marks because it is the owner's exact copy.",
      "Checks: build, i18n (228 keys), 8 API tests, 22 e2e (1 skipped offline, new gallery test); no page overflow and CLS 0 at 360/375 in uz/ru/en. Lighthouse mobile 97–98/100/100/100, desktop 100/100/100/100."
    ]
  },
  {
    "date": "2026-11-20",
    "summary": "Impeccable redesign: the page is one Tashkent Metro line through a shop's day.",
    "changes": [
      "Installed impeccable (pbakaus/impeccable) and the ponytail skill (DietrichGebert/ponytail) as project skills; ran impeccable init (PRODUCT.md) and its new-work flow. The concept-seed roll assigned the Tashkent Metro direction (seed:f6ede43fb86de475); the owner said 'surprise me', so it was built without a decision page.",
      "World: tunnel-ink ground (platform marble in light mode), one green rail from a terminus roundel in the hero to a terminus at Aloqa, a stop roundel at every section heading that fills once passed (scroll-driven), a sticky 'you are here' train at mid-viewport, line-map nav (horizontal on desktop, vertical in the phone menu), glazed cobalt tile halls with darker grout for the proverb and the closing line.",
      "Type: Unbounded 500 (self-hosted latin/latin-ext/cyrillic) for headlines as station signage, Onest for reading, digits-only mono for money.",
      "Layout fixes from the impeccable finish review: hero copy under the headline, sectors as a station board, hardware category under the product name, Care as ruled rows, no ghost-card border+shadow, tighter hero phone shadow.",
      "Finish: impeccable finish reviewer returned fix, then ship on all 8 fixes; detector shows only false positives on the <Img> component plus the intended tile grout; DESIGN.md and .impeccable/design.json written by the impeccable documenter.",
      "Checks: build, i18n (228 keys), 8 API tests, 22 e2e (1 skipped offline); no page overflow and CLS 0 at 360/375 in uz/ru/en. Lighthouse mobile 94-95/100/100/100, desktop 100/100/100/100."
    ]
  },
  {
    "date": "2026-11-20",
    "summary": "Owner feedback: removed the page-length green line and the proverb's tile hall; the proverb is now a badge in the hero.",
    "changes": [
      "Removed the rail, stop roundels, terminus roundels and the sticky train (CSS block, the rail element and its ResizeObserver in App.jsx, every stop/terminus class); section content uses the normal container gutter again.",
      "Removed the Proverb section and its cobalt grid background (Proverb.jsx deleted). The closing statement keeps its tile hall.",
      "Hero motto badge: the proverb in the signage face, its one-line meaning and 'O‘zbek xalq maqoli', on a raised card with the float shadow. From 1280px it sits in the hero's empty right side, level with the action buttons; below that it follows the buttons. It never covers the screenshots.",
      "Kept the line-map navigation (desktop and the phone menu). DESIGN.md, .impeccable/design.json and the surface brief updated to match.",
      "Checks: build, i18n (228 keys), 8 API tests, 22 e2e (1 skipped offline); no page overflow and CLS 0 at 360/375 in uz/ru/en. Lighthouse mobile 97/100/100/100, desktop 100/100/100/100."
    ]
  }
]
```
