# Behaviors

## Global

- Native document scroll with `scroll-behavior: smooth`; no Lenis or Locomotive wrapper was present.
- Reveal elements use IntersectionObserver-style `.reveal` → `.reveal.vis`: `opacity 0 → 1`, `translateY(14px) → none`, `0.9s cubic-bezier(.2,.7,.3,1)`. Delays step by 80ms.
- Desktop breakpoint behavior begins around 1024px; the site also changes key hero/media choices at 640px.

## Header and menu overlay

- The menu button opens a fixed full-viewport overlay, locks `body` overflow, and animates `clip-path` over `1.1s cubic-bezier(.83,0,.17,1)`.
- Closed clip-path: `polygon(0% 0%,100% 0%,100% 0%,0% 0%)`. Open state fills the viewport with a translucent teal-to-deep-teal gradient and subtle backdrop blur.
- Desktop overlay is a two-column composition: rotating 374×500-ish image card on the left; huge three-line navigation and contact columns on the right. Mobile removes the image/social column and keeps the compact navigation/contact stack.
- Hovering the three navigation choices changes the image card among the store, catering, and visit assets. Link and pill hover transitions are 150–300ms.

## Hero

- Static image backgrounds swap at 640px: portrait mobile image and 1440×855 desktop image.
- Hero always equals the viewport height (`100svh`, measured 900px desktop and 844px mobile).
- CTA hover: coral → cream, `translateY(-2px)`, gap `12px → 16px`, 150ms.
- Circular scroll cue rotates continuously; the icon nudges horizontally.

## Story

- Story intro is static content with the global reveal animation.
- Gallery interaction model: click plus drag/swipe. Previous and next buttons advance or reverse the stack; dragging the top card should also advance when horizontal displacement passes a small threshold.
- Four exact narrative states are paired with four assets. Stack transforms are: top `none`, then `translateX(14px) translateY(6px) rotate(5deg)`, `28px/12px/8deg`, `42px/18px/11deg`; rear cards use `brightness(.85)`.
- Copy changes with the active card using a short fade-up. Counter cycles `01 / 04` through `04 / 04`.

## Product menu

- Click-driven tabs. State order: Madeleines, Café, Para llevar.
- Track transitions horizontally by `0`, `-100%`, and `-200%` over `650ms cubic-bezier(.34,1.15,.64,1)`; wrapper height animates with the same timing.
- Active pill is coral with dark teal text. Inactive pills are transparent with 30%-opacity teal border; hover applies a 20%-opacity coral fill.
- Desktop products use two columns within groups. Mobile uses one column, while product art shrinks and descriptions wrap below.

## Catering and Instagram

- Catering image is scroll-parallaxed inside a 116%-height wrapper; desktop observed `translateY(-64.99px)` near the section. The black overlay is 40% desktop and 60% mobile.
- Instagram cards scale their image slightly on hover and show a coral tint/Instagram mark.

## Contact map

- Map controls are click-driven. Zoom buttons adjust the background scale; reset returns to the initial pan/zoom.
- The Madie marker has a repeating coral pulse. Station labels and Metro icons move with the map canvas.

## Responsive sweep

- 1440px: hero content max 768px; story gallery is two-column; menu groups are two-column; contact map/details are `1.4fr 1fr`.
- 768px: hero headline 48px/57.6px; sections stack; gallery becomes tall (1316.5px); menu measured 3094.5px; contact measured 1446.75px.
- 390px: hero headline 36px/43.2px; hero copy 320px wide; story gallery is 788.5px; menu is 2887.5px; contact is 1330.94px. Header inset is 8px and top padding 28px.
