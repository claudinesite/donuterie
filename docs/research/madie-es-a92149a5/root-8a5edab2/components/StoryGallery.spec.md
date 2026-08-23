# StoryGallery Specification

## Overview
- Target: `src/components/sites/madie-es-a92149a5/root-8a5edab2/StoryGallery.tsx`
- Screenshots: `original-desktop-story-gallery.png`, `original-desktop-story-gallery-next.png`
- Interaction model: previous/next click plus horizontal drag/swipe.

## Styles
- Teal→deep-teal (`#0A3D45`) gradient, cream text, grain 40% and pattern 5% overlays.
- Desktop measured height 736.5px, padding 64px top/80px bottom. Mobile height 788.5px, padding 64px/96px.
- Desktop grid: narrative/controls left and 440px card stack right. Mobile stacks cards first and copy beneath.
- Card top image about 347×464; stack card width 78% of 550px stage with 3:4 ratio, radius about 18px, overflow hidden.
- Stack positions: z50 `none`, z40 `translate(14px,6px) rotate(5deg)`, z30 `28px,12px,8deg`, z20 `42px,18px,11deg`; rear brightness .85.
- Controls are 44px coral circular buttons with deep-teal arrows; hover coral-light.
- Counter is JetBrains Mono, compact cream text. Copy fades/raises 8px when state changes.

## States and content
1. `MADIE también nace de la idea de reinterpretar lo clásico. De mezclar tradición con creatividad, París con Madrid, lo artesanal con lo inesperado.` — image `dbf2832577ec8d08`.
2. `Por eso hemos transformado la receta tradicional en una colección de más de 15 variedades únicas que cambian, evolucionan y sorprenden constantemente.` — video `story-ig.mp4` (fallback to poster/image if unavailable).
3. `Cada pieza se hornea a diario con ingredientes seleccionados, buscando siempre el equilibrio entre textura, aroma y estética.` — image `a91c3e23425caf55`.
4. `Porque MADIE no es solo una cafetería. Es un lugar donde la tradición se reinventa.` — image `c6c18df4fa64c020`.
- Desktop left-side decorative dog video: `8cb64c4b2cd18888.webm`.

## Behavior
- Buttons wrap 4→1 and 1→4.
- Drag top card horizontally; on release beyond ~60px advance/reverse, otherwise spring back.
- `touch-action:none`, `user-select:none` on top card.
