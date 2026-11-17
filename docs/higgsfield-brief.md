# IDO'KON brand assets: Higgsfield brief

> Status: the site now uses one Higgsfield doodle (`SITE.brand.heroImage`, Notion-style line art). The grid (section 2) and loop (section 3) below are no longer wired in. Use this file only as a style guide for new images.

Higgsfield is not connected to the coding session, so generate these in Higgsfield yourself,
drop the files into `public/brand/`, then set the paths in `SITE.brand` (`src/data/site.js`).
Anything left `null` falls back to the built-in version, so nothing breaks while assets are missing.

## Brand rules (give these to every prompt)
- Audience: shop owners in Uzbekistan, often on cheap phones. Feeling: calm, simple, trustworthy.
- Colour: emerald `#059669` on near-white `#ffffff` (light) or black `#000000` (dark). No other accent.
- Style: Apple-calm, minimal, lots of empty space. No people, no stock cash registers, no text in the image.
- Never put letters or numbers inside generated images (AI text is unreliable). Text stays in HTML.

## 1. Logo mark and wordmark -> `public/brand/logo.svg` (or `.webp`)
Current mark: a plus made of five emerald dots. Keep the idea, make it sharper.

Prompt:
> Minimal app-icon logo mark: five emerald green (#059669) round dots arranged in a plus shape,
> soft rounded squircle container, subtle inner highlight, flat vector look, centred, plain
> transparent-style white background, no text, no gradients beyond a faint emerald sheen.

Deliver: square mark 1024x1024 and a horizontal lockup (mark + "idokon" wordmark added in Figma, not generated).
Export a white version for the dark pill navbar. Then set `brand.logo`.
Size budget: SVG preferred; WebP under 20 KB.

## 2. Grid behind the hero -> `public/brand/grid.webp`
Prompt (light):
> Ultra-minimal perspective grid of thin light-grey lines fading into white at the edges,
> a soft emerald (#059669) glow near the top centre, very faint dot intersections, clean,
> airy, top-down architectural feel, no objects, no text, transparent or pure white background.

Prompt (dark): same, "on pure black, lines dark grey, glow emerald". Name it `grid-dark.webp`.

Deliver: 2400x1200, WebP, under 120 KB, subject kept in the top 60% so the headline stays readable.
Set `brand.gridImage`. (Dark variant: tell me and I will add a `dark:` swap.)

## 3. Hero loop animation -> `public/brand/hero-loop.mp4` + `hero-loop.webp` (poster)
Use the grid image as the first frame, then image-to-video.

Prompt:
> Slow seamless loop: thin emerald light pulses travel along the grid lines from the centre
> outward, intersections softly glow and fade, camera locked, no motion blur, 6 seconds, loopable.

Deliver: 1600x800 MP4 (H.264), muted, under 1.5 MB, plus the first frame as `hero-loop.webp` (poster).
Set `brand.heroVideo = { src: '/brand/hero-loop.mp4', poster: '/brand/hero-loop.webp' }`.
The site shows the poster only (no video) for visitors with reduced-motion turned on, and loads the video with `preload="metadata"`.

## Checklist before shipping an asset
- Contrast: headline text stays readable on top of it (AA).
- Weight: logo < 20 KB, grid < 120 KB, video < 1.5 MB.
- Looks right on a 360 px wide phone and in dark mode.
