# CateringSection Specification

## Overview
- Target: `src/components/sites/madie-es-a92149a5/root-8a5edab2/CateringSection.tsx`
- Screenshot: `original-desktop-y-5518.png`
- Interaction model: scroll-reveal plus gentle image parallax; CTA click opens email/contact intent.

## Styles
- `#catering`, desktop 933.83px high with 128px vertical padding; tablet/mobile 96px, mobile about 630.72px.
- Full-bleed image in an absolute 116%-height wrapper starting at -8%; object cover.
- Overlay black 40% desktop, 60% mobile, plus desktop radial vignette.
- Centered content max-width 850px (770px inner), px40 desktop, cream text.
- Eyebrow Inter 11px. H2 Dazzle outlined cream, 96px/105.6px desktop, 36–48px mobile.
- Body centered, max 58ch, cream 85%, around 18px/1.6.
- CTA rose pill matching hero CTA.

## Text
- Eyebrow: `Catering`
- Heading: `DÍAS GRANDES, MÁS DULCES CON MADIE`
- `Bodas, inauguraciones, un martes en la oficina que quiere parecer menos un martes. Preparamos pedidos especiales y experiencias personalizadas para cualquier ocasión.`
- CTA: `Pedir ahora`.

## Asset
- Background: `772c78b0d8dee890.jpg`.

## Behavior
- Image transform follows scroll progress by roughly ±65px; use a passive scroll listener/requestAnimationFrame or a restrained CSS approximation.
