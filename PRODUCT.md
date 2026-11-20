# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: owners of small shops in Uzbekistan (corner shops, mini-markets, grocery stores) who run the till themselves or with a few cashiers, often moving off paper, Excel or 1C. They are evaluating whether iDokon will make daily selling, stock and money easier, usually on a phone, in Uzbek (Latin) first, Russian second, English rarely.

## Product Purpose

iDokon is shop point-of-sale software: a till (kassa) on Windows, web and phone, stock control, reports and ABC analysis, with payment and fiscal integrations. The marketing site exists to make a shop owner confident enough to call the call centre or ask for a demo. Success is a call, a Telegram message or a demo request.

## Positioning

Built in with the systems Uzbek shops already have to use: payments through Click, Payme and Uzum, and fiscal/tax through Arca and Multikassa, plus automatic product selection from the tax product base. A foreign or generic POS cannot truthfully claim this out of the box.

## Operating Context

- A shop counter: barcode scanner, receipt printer, cash drawer, scales, sometimes a monoblock terminal; the site sells and prices this hardware as a catalogue with a running total (no cart, no checkout).
- Selling on a phone too: the mobile app (iOS and Android) covers catalogue, cart and payment (cash, terminal, on credit, discount, customer, loyalty).
- Setup is done by the iDokon team: installation, moving goods from 1C/Excel, cashier training, phone and Telegram support, a free online course.
- Questions the site cannot answer go to the call centre.

## Capabilities and Constraints

- Plans: Start → Standart (Start + its own list) → Premium (Start + Standart + its own list). Premium is the popular, highlighted plan. Telegram bot and Seyf (all cash in one place, marked New) are Premium only. Prices and feature lists come from the owner's reference (`Desktop/tarifs.jpeg`), mirrored in `src/data/site.js` and `src/data/translations.js`.
- Copy in uz (default), ru and en with identical keys (`bun run check:i18n`).
- iDokon does not have: interactive course tasks, an E-imzo SMS notification system, a customer rating badge. Never mention them.
- Lead form is off (`SITE.leadsEnabled = false`): visitors see call and Telegram buttons.
- Light/dark toggle only, dark is the default. No theme studio or palette editor.
- Stack: React 19 + Vite 6 + Tailwind 3, bun; runtime dependencies react and react-dom only. Repo rules and checks live in `CLAUDE.md`.

## Brand Commitments

- The name is written **iDokon**, never IDO'KON, I-Do‘kon or similar.
- Logo: `assets/brand/idokon_logo.webp` (green rounded mark, "idokon", "by sales doctor").
- Each payment or fiscal partner gets its own cell or card, never merged. It is Arca, not Arco.
- Owner copy kept verbatim: the proverb "Hisobli do‘st ayrilmas" and the closing line "Ko‘rdingizmi, hammasi shunchalik oson! Endi siz ham do‘koningizda sinab ko‘ring!".

## Evidence on Hand

- Real product screenshots: desktop till and reports (`assets/screens/`), mobile app catalogue/cart/payment on iOS and Android (`assets/phones/`), course screens.
- Real hardware photos and prices (`src/data/mockData.js`, `assets/hardware/`).
- Usage numbers: the owner has them and will send exact figures later. Until then, no counts of shops, receipts or users appear anywhere.
- No testimonials, customer names, customer logos, ratings or press. Do not fabricate any.

## Product Principles

1. Every so‘m counted: the product's promise is exact accounts, so the site is exact too (real prices, real screens, no vague claims).
2. Local first: lean on what only a local product has (the Uzbek payment and tax integrations, a team that sets it up), in Uzbek first.
3. A person on the line: the next step is always a human (call centre, Telegram), never a dead end.
4. Shown, not described: real screenshots and real hardware over illustrations.
