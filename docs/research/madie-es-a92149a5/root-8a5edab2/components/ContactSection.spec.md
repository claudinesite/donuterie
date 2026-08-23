# ContactSection Specification

## Overview
- Target: `src/components/sites/madie-es-a92149a5/root-8a5edab2/ContactSection.tsx`
- Screenshot: `original-desktop-y-6858.png`
- Interaction model: click-driven map zoom/reset; links are standard anchors.

## Styles
- `#contacto`, burgundy→dark-burgundy gradient, cream text, grain 40%.
- Desktop height 908.63px, padding 64px top/0 bottom; mobile about 1330.94px, 48px top/64px bottom.
- Outer max-width 1280px, px40 desktop. Header centered max-width 600px, 64px bottom margin.
- H2 Dazzle outlined/filled cream, 72px/79.2px desktop, 36px mobile.
- Main grid desktop `1.4fr 1fr`, 40px gap; stack on mobile.
- Map is a 568px rounded panel, overflow hidden, dark burgundy border. Background image is centered and can scale/pan; station labels are cream pills and Metro icons.
- Details panel uses eyebrow labels, 17px body, 32px group gaps, fine cream rules.

## Content
- Eyebrow: `Pásate a vernos`; heading `Encuéntranos en Chamberí.`
- Address: C/ de Donoso Cortés, 62 / Chamberí, 28015 Madrid.
- Hours: Lun 11:00–20:30; Mar–Jue Cerrado; Vie 13:00–20:30; Sáb 17:00–20:30; Dom 13:30–20:30.
- Phone +34 603 861 349; info@madie.es; orders@madie.es; Instagram; WhatsApp.

## Assets
- Map background: `2627c1191ccf1fa9` (AVIF payload, extensionless).
- Madie marker: `9133fcfa121b28e4` (AVIF payload, extensionless).
- Metro logo: `2a3b5a08862f1128.svg`.

## Behavior
- Zoom +/− changes scale in small steps; reset returns scale 1 and pan 0. Marker pulse repeats via `madie-map-pulse`.
