---
name: iDokon
description: Shop POS software for Uzbekistan, presented as one Tashkent Metro line through a shop's day.
colors:
  accent: "#2fbf6b"
  accent-light: "#0b7a3e"
  accent-hover: "#3fcc7a"
  accent-hover-light: "#096834"
  accent-ink: "#0b1a10"
  accent-ink-light: "#ffffff"
  cobalt: "#1c3d8f"
  on-cobalt: "#f2f5fb"
  on-cobalt-2: "#c3cfeb"
  cobalt-grout: "rgb(6 16 46 / 0.45)"
  tunnel-ink: "#0e1114"
  tunnel-ink-alt: "#12161a"
  tunnel-card: "#181d21"
  tunnel-raised: "#20272c"
  platform-marble: "#f3f1ec"
  platform-marble-alt: "#ebe8e1"
  platform-card: "#fdfcf9"
  platform-raised: "#e3dfd6"
  marble-white: "#eef0ec"
  fg-2: "#a8b0b2"
  fg-3: "#8a9396"
  ink: "#15191c"
  fg-2-light: "#4f575b"
  fg-3-light: "#5c6468"
  hairline: "rgb(238 240 236 / 0.09)"
  hairline-light: "rgb(21 25 28 / 0.11)"
  screen-white: "#ffffff"
typography:
  display:
    fontFamily: "Unbounded, Onest, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif"
    fontSize: "clamp(1.875rem, 1.1rem + 3.2vw, 3.5rem)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Unbounded, Onest, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif"
    fontSize: "clamp(1.5rem, 1.15rem + 1.5vw, 2.375rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Onest, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif"
    fontSize: "clamp(1.1875rem, 1.1rem + 0.35vw, 1.375rem)"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  lead:
    fontFamily: "Onest, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.3vw, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Onest, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Onest, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  nav-stop:
    fontFamily: "Onest, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.2
  till:
    fontFamily: "'Till Digits', ui-monospace, 'SF Mono', Menlo, Consolas, monospace"
    fontSize: "36px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontFeature: "tnum"
rounded:
  focus: "6px"
  seg: "7px"
  sm: "8px"
  md: "10px"
  shot: "12px"
  card: "16px"
  modal: "20px"
  roundel: "50%"
spacing:
  gutter: "20px"
  gutter-sm: "32px"
  rail-gutter: "36px"
  rail-gutter-lg: "96px"
  tile: "64px"
  section: "clamp(4.5rem, 9vw, 7.5rem)"
  container: "1200px"
  header: "60px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.md}"
    padding: "10px 18px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
    textColor: "{colors.accent-ink}"
  button-secondary:
    backgroundColor: "{colors.tunnel-raised}"
    textColor: "{colors.marble-white}"
    rounded: "{rounded.md}"
    padding: "10px 18px"
    height: "44px"
  button-small:
    rounded: "{rounded.sm}"
    padding: "6px 14px"
    height: "36px"
  segmented:
    backgroundColor: "{colors.tunnel-raised}"
    rounded: "{rounded.md}"
    padding: "3px"
  segment-selected:
    backgroundColor: "{colors.tunnel-card}"
    textColor: "{colors.marble-white}"
    rounded: "{rounded.seg}"
    height: "34px"
  field:
    backgroundColor: "{colors.tunnel-ink}"
    textColor: "{colors.marble-white}"
    rounded: "{rounded.md}"
    padding: "10px 14px"
    height: "44px"
  card:
    backgroundColor: "{colors.tunnel-card}"
    rounded: "{rounded.card}"
  shot:
    backgroundColor: "{colors.screen-white}"
    rounded: "{rounded.shot}"
  modal:
    backgroundColor: "{colors.tunnel-card}"
    rounded: "{rounded.modal}"
  hall:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.on-cobalt}"
    padding: "64px 0"
  site-header:
    backgroundColor: "{colors.tunnel-ink}"
    height: "60px"
---

# Design System: iDokon

## Overview

**Creative North Star: "The Night Line"**

The landing page is one Tashkent Metro line through a shop's day. A single green rail runs from a terminus roundel beside the hero headline to a second terminus at Aloqa (contact); every section heading is a stop on it, and a "you are here" train rides the rail at mid-viewport. The ground is tunnel ink at night (dark is the default), type is marble white, and the two quiet moments of the page, the proverb and the closing, are glazed cobalt tile halls that show their grout grid. Light mode is the same station by day: platform marble ground, dark ink type, a deeper green line.

Density is calm and editorial: generous section padding, one accent, hairlines instead of borders, flat surfaces. Proof is the product itself: real desktop till and report screenshots on white, real phone screenshots in their device frames, real hardware photos on white canvases. Headlines and stop names speak in station signage (Unbounded 500); everything you read is Onest; money is printed in till digits that roll to their value.

The build replaced an earlier warm-neutral look. It refuses the category's stacked hero plus rows of equal feature cards: sections are stops, not tiles.

**Key Characteristics:**
- One green line, one accent: the rail, stop roundels, nav line map, primary buttons and selection states all use the same green.
- Tunnel ink ground by default, platform marble in light mode, every token switched with `light-dark()`.
- Cobalt tile halls (64px tiles, 2px grout) for exactly two moments: the proverb and the closing statement.
- Station signage type for headlines and stop names only; Onest for reading; till digits for every price and total.
- Flat surfaces with inset hairlines; the only real shadows lift screenshots and floating totals off the page.
- Motion is CSS-only and scroll-driven where possible: stops fill as they pass, the mobile call bar rises after the hero.

## Colors

A near-black tunnel with one signal green and one ceramic blue; everything else is a step of ink or marble.

All theme colors are defined once on `:root` with `light-dark(light, dark)`; `:root.dark` sets `color-scheme: dark`, and `index.html` applies the `dark` class before paint as the default. In the frontmatter, the unsuffixed key is the dark (default) value and the `-light` key is its light-mode partner. Cobalt and its text colors do not change between modes.

### Primary
- **Line Green** (accent; dark `#2fbf6b`, light `#0b7a3e`): the metro line itself. The rail, every stop roundel ring and fill, the nav line map, primary buttons, the 2px outline on the highlighted Premium plan and on picked hardware, the "New" and "popular" markers, period badges, links, focus rings, caret, selection tint (28% mix). 8.1:1 on the dark ground, 5.0:1 on the light ground.
- **Line Green, lit** (accent-hover; dark `#3fcc7a`, light `#096834`): primary button hover only.
- **Ticket Ink** (accent-ink; dark `#0b1a10`, light `#ffffff`): text on green buttons.

### Secondary
- **Glazed Cobalt** (cobalt `#1c3d8f`): the tile halls. Never used as a text color or a button fill.
- **Cobalt Grout** (`rgb(6 16 46 / 0.45)`): the 2px grout lines of the 64px tile grid.
- **Hall White** (on-cobalt `#f2f5fb`) and **Hall Mist** (on-cobalt-2 `#c3cfeb`, 6.3:1 on cobalt): primary and secondary text inside a hall; `.fg-2`, `.t-lead` and `.t-small` switch to Hall Mist there.

### Neutral
- **Tunnel Ink / Platform Marble** (bg; `#0e1114` / `#f3f1ec`): page ground, header, mobile menu, call bar, field fill.
- **Tunnel Ink Alt / Marble Alt** (bg-alt; `#12161a` / `#ebe8e1`): alternating sections (features, pricing).
- **Card** (`#181d21` / `#fdfcf9`): cards, modals, the floating hardware total.
- **Raised** (`#20272c` / `#e3dfd6`): secondary buttons, segmented-control track, icon-button hover.
- **Marble White / Ink** (fg; `#eef0ec` / `#15191c`): headings and body text; also the train body.
- **Fog** (fg-2; `#a8b0b2` / `#4f575b`, 7.9:1 / 7.6:1): leads, descriptions, nav labels at rest.
- **Ash** (fg-3; `#8a9396` / `#5c6468`, 5.6:1 / 4.9:1 on bg-alt): small print, currency labels, check icons.
- **Hairline** (line; `rgb(238 240 236 / 0.09)` / `rgb(21 25 28 / 0.11)`): every border, rule and card edge, always drawn as an inset 1px shadow or a 1px top border.
- **Screen White** (`#ffffff`): only behind product screenshots and hardware photos, because the app and the photos are white.

### Named Rules
**The One Line Rule.** Green is the line. If an element is green, it is on the line, it is the action, or it marks the current or chosen thing. No second accent color exists.

**The Two Halls Rule.** Cobalt appears only as a full-bleed tile hall, and the page has two: the proverb and the closing. A third hall dilutes the pause.

**The Switch-Once Rule.** A theme color is declared once with `light-dark()` on `:root`; components never branch on the theme.

## Typography

**Display Font:** Unbounded 500 (falls back to Onest, then the system stack)
**Body Font:** Onest 400 to 600 (with -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Arial)
**Numeric Font:** Till Digits, a 2 KB digits-only subset of JetBrains Mono (with ui-monospace, SF Mono, Menlo, Consolas)

**Character:** Wide, rounded station signage over a plain, legible grotesque. The signage voice is loud by shape, not by weight, so everything stays at 400 or 500; prices read like a till printout.

All faces are self-hosted woff2 in `public/fonts`, split by unicode-range (latin, latin-ext, cyrillic) so Uzbek Latin, Russian and English each load only what they use, with `font-display: optional` so nothing swaps after first paint.

### Hierarchy
- **Display** (Unbounded 500, clamp 30px to 56px, line-height 1.08, -0.03em): the hero headline only, capped at 14ch, carries the terminus roundel.
- **Headline** (Unbounded 500, clamp 24px to 38px, 1.15, -0.025em): every section heading (each one is a stop), the proverb and the closing lines in the halls. Sector card titles use the signage face at clamp 20px to 28px.
- **Title** (Onest 500, clamp 19px to 22px, 1.3, -0.01em): plan names, feature rows, card titles.
- **Lead** (Onest 400, clamp 17px to 19px, 1.55, Fog): the line under a headline, max about 46ch in the hero.
- **Body** (Onest 400, 16px, 1.6): reading text, descriptions capped near 52ch. Inputs stay at 16px so phones do not zoom.
- **Label** (Onest 400, 14px, 1.5, Ash): small print, categories, totals. Nav stop labels are 13px; buttons 15px (14px small) at 500.
- **Till** (Till Digits, tabular, -0.02em): every price and total; 36px in plan cards, 28px in the hardware total, 15px inline.

Headings use `text-wrap: balance`, paragraphs `text-wrap: pretty`.

### Named Rules
**The Signage Rule.** Unbounded is for headlines, stop names and the mobile line-map menu (22px). Never for body text, buttons or labels.

**The Two Weights Rule.** Weights are 400 and 500. Size and color carry hierarchy, not bold.

**The Till Rule.** A number that is money is set in Till Digits with tabular figures, and when it changes it rolls digit by digit rather than snapping.

## Layout

- **Container:** max 1200px, side padding 20px on phones and 32px from 640px. Inside `main`, the container's left padding widens to make room for the rail: 36px on phones, 96px from 1024px.
- **Section rhythm:** vertical padding `clamp(4.5rem, 9vw, 7.5rem)`; sections alternate between the ground and `bg-alt`. The hero starts below the 60px header plus `clamp(3rem, 7vw, 6rem)`.
- **Section heads:** left-aligned, max 640px, lead 16px below the heading. Only the two halls are centered.
- **Hero stage:** a container-query composition (`container-type: inline-size`) at aspect 100:45: the desktop till at 82cqw from 5cqw, the phone payment screen at 20cqw straddling its right edge. Below 640px it recomposes to 100:66 with a larger phone (31cqw). Positions are in container units so the pair holds at any width.
- **Tile layout in halls:** hall padding is whole tiles, 64px on phones and 128px from 768px, with minimum heights of 5 and 7 tiles, so the content block starts and ends on a grout line; the grid is anchored at center top.
- **Grids:** features are a sticky heading column beside ruled rows (5:7 from 1024px); pricing is three columns from 1024px; hardware is a snap-scrolling row (78vw cards, max 300px) or a 2/3-column grid when expanded.
- **Breakpoints:** 640px (gutter, hero recomposition), 768px (call bar hides, halls grow), 1024px (desktop rail, line-map nav, multi-column grids).
- **Phones:** a fixed two-button call bar (call, Telegram) sits at the bottom below 768px; the body reserves 72px for it. No horizontal page scroll at 360px in any language (`overflow-x: clip` on body).
- **Anchors:** `scroll-padding-top: 64px` so in-page jumps land under the header.

### Named Rules
**The Whole Tile Rule.** Inside a cobalt hall, spacing is counted in 64px tiles. Content never starts mid-tile.

## Elevation & Depth

The system is flat. Surfaces separate by tone (ground, alt, card, raised) and by a 1px inset hairline, never by a drop shadow at rest. Real shadows are reserved for things that physically sit on top of the page: product screenshots, phones, the floating hardware total, modals and the train on the rail.

### Shadow Vocabulary
- **Hairline** (`box-shadow: inset 0 0 0 1px var(--line)`): cards, fields, secondary buttons, segmented tracks, modals.
- **Rest** (`light-dark(0 1px 2px rgb(31 27 22 / 0.05), 0 1px 2px rgb(0 0 0 / 0.3))`): the minimal lift token.
- **Float** (`light-dark(0 12px 32px -12px rgb(31 27 22 / 0.18), 0 16px 40px -16px rgb(0 0 0 / 0.6))`): screenshots (with a hairline ring), the sticky hardware total, modals.
- **Phone drop** (`filter: drop-shadow(0 10px 16px rgb(0 0 0 / 0.22))` in the hero, `0 16px 24px` in the gallery): transparent device-framed phone images.
- **Selected segment** (`0 1px 2px rgb(0 0 0 / 0.12), inset 0 0 0 1px var(--line)`).
- **Highlight ring** (`inset 0 0 0 2px var(--accent)`): Premium plan and picked hardware; a state, not elevation.

### Named Rules
**The Flat Platform Rule.** If it is part of the page, it is flat with a hairline. If it is a thing placed on the page (a screen, a phone, a total, a dialog), it may float.

## Shapes

Gently rounded rectangles against perfect circles. Rectangles step up in radius with size: 6px focus rings, 7px segments, 8px small buttons and icon buttons, 10px buttons, fields and segmented tracks, 12px screenshots, 16px cards, 20px modals. Nested radii are concentric (segmented 10px outside, 3px padding, 7px inside; hardware photo 10px inside a 16px card with 8px margin). Circles belong to the line alone: stop roundels, the terminus ring-and-disc, nav and menu stops. The rail has 2px rounded ends; the train is a capsule (10 x 22px, 14 x 30px on desktop). Borders are always hairlines drawn as inset shadows, so they never change layout.

## Components

### The Line (signature)
The rail, its stops and the train are one grammar.
- **Rail:** a solid green bar (3px on phones at 12px from the container edge, 4px at 42px from 1024px), absolutely positioned in `main`, from the hero terminus to the Aloqa terminus. Its end is measured once (`--rail-end`, ResizeObserver in App.jsx).
- **Stop:** every section heading carries a roundel on the rail via `::before`: 14px (20px desktop) circle, a 3px (4px) green inner ring, and a 4px knock-out ring in the surrounding surface color (ground, alt or card) so the rail appears to pass behind it. Centered at 0.58em from the heading top.
- **Stop passing:** with `animation-timeline: view()`, a stop's fill steps from the ground color to green once its heading has passed mid-viewport (`entry 0%` to `cover 50%`, `steps(1)`), animating a registered `--stop` color property. No scroll listener.
- **Terminus:** the hero headline and the contact heading carry a larger roundel, ring plus inner disc (`radial-gradient` 30%): 24px on phones and 64px on desktop in the hero; 24px / 34px at Aloqa.
- **Train:** a capsule in the text color with a 2px (3px) green ring, `position: sticky; top: 50vh` inside the rail, so it rides at mid-viewport.

### Cobalt Tile Hall (signature)
- **Surface:** Glazed Cobalt with a 64px grid of 2px grout lines from two linear gradients; full bleed.
- **Content:** centered, headline type in Hall White, supporting text in Hall Mist; at most one primary button (the closing).
- **Use:** exactly the proverb ("Hisobli do'st ayrilmas") and the closing statement.

### Buttons
- **Shape:** gently rounded (10px), 44px minimum height, 10px 18px padding, 15px Onest 500, 8px icon gap.
- **Primary:** Line Green with Ticket Ink text and a faint top highlight (`inset 0 1px 0 rgb(255 255 255 / 0.14)`).
- **Secondary:** Raised surface, text color, hairline ring.
- **Small:** 36px tall, 6px 14px, 14px text, 8px radius (nav demo button, hardware pick).
- **Hover / Active / Focus:** hover only on hover-capable pointers (lit green; raised mixed 8% toward text); press scales to 0.98; focus is a 2px green outline at 2px offset; 150ms on the house ease. Disabled is 60% opacity with a wait cursor.
- **Link:** green, 500, underline on hover with 3px offset.

### Segmented Control
- **Style:** Raised track with hairline, 3px padding, 10px radius; segments 34px tall, 14px, Fog text.
- **State:** the pressed segment becomes a Card chip in the text color with a small lift. Used for the pricing period and screen tabs.

### Cards / Containers
- **Corner Style:** 16px.
- **Background:** Card.
- **Shadow Strategy:** hairline only at rest; the floating hardware total adds Float.
- **Border:** none beyond the inset hairline; selected or highlighted cards get a 2px inset green ring.
- **Internal Padding:** 24px (28px from 640px) for plan cards; hardware cards use an 8px photo margin and 16px text padding.

### Product Screenshot
- **Style:** a white plate (the app is white) with 12px radius, a hairline ring and Float; opens a lightbox on click (zoom-in cursor). Phones are transparent device-framed images with a drop shadow, never a CSS device frame.

### Inputs / Fields
- **Style:** ground-colored fill, hairline ring, 10px radius, 44px tall, 16px text, Ash placeholder.
- **Focus:** the ring turns green plus a 3px green halo at 22%.

### Navigation
- **Desktop (1024px and up):** a fixed 60px header on the ground with a bottom hairline. The links form a line map: a 2px green line through all items (starting and ending at the centers of the first and last), each link a 10px ring stop over a 13px label. The current section (IntersectionObserver scroll spy) fills its stop and scales it 1.3, label in the text color.
- **Phones:** a full-screen native `<dialog>` menu, the same line vertical: a 3px rail, 17px ring stops, 22px Unbounded labels, 56px rows, the current stop filled. Language menu and the light/dark icon toggle sit at the foot.
- **Call bar:** below 768px, a fixed bottom bar with Call (primary) and Telegram (secondary), rising in with a scroll-driven animation after 380px of scroll and hidden while any dialog is open.

### Dialogs
- Native `<dialog>`; modals are Card-colored, 20px radius, max 90dvh, hairline plus Float, backdrop `rgb(12 11 10 / 0.55)`. They fade and rise 8px over 200ms with `@starting-style` and `allow-discrete` on display and overlay.

### Number Roll
- Each digit is a 0 to 9 column, 1lh tall, translated to its value over 500ms on the house ease. Used for plan prices and the hardware total.

### FAQ
- Native exclusive `<details>`; the plus icon rotates 45deg in 200ms; the panel's block size eases open over 300ms via `::details-content` with `interpolate-size: allow-keywords`.

### Motion
- One easing, `cubic-bezier(0.22, 1, 0.36, 1)`; durations 150ms (controls), 200ms (dialogs, icons), 300ms (FAQ), 400ms (image fade-in), 500ms (digit roll).
- Lazy images fade from 0 to 1 once decoded; the LCP hero image never fades.
- `prefers-reduced-motion: reduce` collapses all transitions and animations to 0.01ms, disables smooth scroll and the call-bar animation.

## Do's and Don'ts

### Do:
- **Do** make every new section heading a stop (`t-h2 stop`) so the line keeps running through it, and keep the Aloqa terminus as the last stop.
- **Do** declare any new theme color once on `:root` with `light-dark()`, and check contrast in both modes against the values in the Colors section.
- **Do** set every price and total in Till Digits, and roll changing amounts with the Number Roll.
- **Do** put product screenshots and hardware photos on Screen White with a 12px radius, hairline and Float.
- **Do** draw borders as 1px inset hairlines (`var(--line)`) and keep surfaces flat at rest.
- **Do** count hall spacing in whole 64px tiles.
- **Do** prefer platform features for motion and state: scroll-driven animations, `@starting-style`, native `<dialog>` and `<details>`.

### Don't:
- **Don't** introduce a second accent color; green is the line and the action.
- **Don't** use cobalt outside the two tile halls, or add a third hall.
- **Don't** set body text, buttons or labels in Unbounded, or use weights above 500.
- **Don't** add drop shadows to page-level cards or sections; only placed objects (screens, phones, totals, dialogs) float.
- **Don't** use circles for anything but the line's stops and roundels.
- **Don't** add eyebrow or kicker labels above headings; the stop roundel already marks the section.
- **Don't** build a CSS device frame around phone screenshots; the screenshots arrive framed.
- **Don't** add a theme editor or palette controls; the only theme control is the light/dark toggle, dark by default.
