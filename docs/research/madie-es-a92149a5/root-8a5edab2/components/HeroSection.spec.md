# Hecoralction Specification

## Overview
- Target: `src/components/sites/madie-es-a92149a5/root-8a5edab2/Hecoralction.tsx`
- Screenshots: `original-desktop-hero-1440.png`, `original-mobile-hero-390.png`
- Interaction model: static hero with hover CTA and looping scroll-cue animation.

## Structure and styles
- Section `#inicio`, height `100svh`, minimum 720px desktop, cream fallback.
- Background image fills inset 0 with `object-fit:cover`; desktop uses 1440×855 image, mobile uses 843×1540 image. Add a teal/black overlay dense enough to match the reference.
- Main content is positioned near the lower-left: desktop x 68px, headline y 429.7px; mobile x 32px, headline y 392.5px.
- Desktop heading max-width 768px, Dazzle, 60px/72px, cream outlined uppercase; bold second line is cream-filled. Tablet 48px/57.6px. Mobile width 320px and 36px/43.2px.
- Desktop visible copy is 576px wide, 16.8px/25.2px, 80% cream. Mobile copy is 320px, 16px/24px.
- CTA desktop: x68, y785, coral background, 12.48px Dazzle, 1.248px tracking, 28×14px padding, 46.7px high, pill radius.
- Language pills appear top-right within hero on desktop/mobile, active ES cream with teal text.
- Google rating row: logo, five gold stars, `5,0`, and desktop `83 reseñas`.

## Text
- Headline: `Madeleines francesas.` / `Mañanas de Madrid.`
- Desktop paragraph: `Algo nuevo se hornea en Chamberí. Madeleines recién horneadas cada día, maridadas con cafés de especialidad. Un sabor nuevo cada semana, los clásicos de siempre y un pequeño capricho para los peludos.`
- Mobile paragraph: `Nuevo en Chamberí. Madeleines horneadas cada día, maridadas con cafés de especialidad — un sabor nuevo cada semana, los clásicos de siempre y caprichos para los peludos.`
- CTA: `Encuentra tu favorita` → `#menu`; secondary: `Sobre el café` → `#story`.

## Assets
- Desktop background: `17ca35115ce152ea.jpg`; mobile: `9163e53a5bad6b60.jpg`.

## Hover
- CTA coral → cream; translate Y -2px; gap 12→16px; 150ms.
- Scroll cue scales 1→1.05 over 700ms and its circular text continuously rotates.
