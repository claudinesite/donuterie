# Header Specification

## Overview
- Target: `src/components/sites/madie-es-a92149a5/root-8a5edab2/Header.tsx`
- Screenshot: `docs/design-references/madie-es-a92149a5/root-8a5edab2/original-desktop-menu-overlay.png`
- Interaction model: click-driven overlay plus navigation-image hover state.

## DOM and styles
- Fixed nav, z-index 60, width 50%, transparent. Desktop `left:28px; padding-top:48px`; tablet `28px/28px`; mobile `8px/28px`.
- Inner row: 40px circular menu button, 16px gap, 93.7×32px logo.
- Button/icon color is cream over hero and burgundy after hero; use an IntersectionObserver on `#inicio`.
- Overlay: fixed inset 0 z-40, burgundy 95% → dark burgundy 95%, subtle blur, cream text, grain texture.
- Overlay transition: `clip-path 1.1s cubic-bezier(.83,0,.17,1)`; closed clips to top edge, open fills viewport. Body scroll locks while open.
- Desktop content max 824px × 2 columns centered. Left image card about 374×500, radius 18px, dark bottom gradient, eyebrow caption. Right nav display text 72px/0.95; three lines.
- Mobile: one column, 24px horizontal padding; no large image, no social links, smaller display nav around 36px/0.95.

## Content
- Languages: ES, EN, FR.
- Navigation: Carta → `#menu`; Catering → `#catering`; Visítanos → `#contacto`.
- Contact: Instagram, WhatsApp, Email.
- Address: C/ de Donoso Cortés, 62, Chamberí, 28015 Madrid; +34 603 861 349.
- Hours: Lun 11:00–20:30; Mar–Jue Cerrado; Vie 13:00–20:30; Sáb 17:00–20:30; Dom 13:30–20:30.

## Assets
- Logo: `/sites/madie-es-a92149a5/root-8a5edab2/assets/4bc97f9a582e1ac1.png`
- Carta image: `64b30c39412940e3.jpg`; Catering: `5a5fb6ad0c2dff8f.jpg`; Visítanos: `de2e0b19d937fb62.jpg`.

## States
- Hover each navigation label swaps the image and caption with an opacity transition.
- Menu link click closes overlay then smooth-scrolls to target.
- Close icon replaces hamburger while open.

## Responsive
- Desktop ≥1024px: two columns; mobile/tablet: compact text-only overlay.
