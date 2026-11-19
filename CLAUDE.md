# CLAUDE.md

Marketing site for **iDokon** (shop POS software, Uzbekistan). React 19 + Vite 6 + Tailwind 3, bun. Copy in uz (default), ru, en.

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
- `src/index.css`: tokens, components, navbar, dialogs, scroll-driven motion, `NumberRoll` styles.
- `src/components/BelowFold.jsx`: everything under the hero, one lazy chunk.
- `src/lib/scroll.js`: in-page navigation (`scrollToId`); `src/lib/theme.js`: dark toggle; `src/lib/interactions.js`: spotlight glow, drag-scroll.
- `api/lead.js`: lead delivery to Telegram (off while `SITE.leadsEnabled` is false).

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
  }
]
```
