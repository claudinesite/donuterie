# MenuSection Specification

## Overview
- Target: `src/components/sites/madie-es-a92149a5/root-8a5edab2/MenuSection.tsx`
- Screenshots: `original-desktop-y-3157.png`, `original-desktop-menu-cafe.png`, `original-desktop-menu-takeaway-settled.png`
- Interaction model: click-driven tabs with horizontal slide and animated height.

## Styles
- `#menu`, cream, burgundy text, overflow hidden. Desktop 128px vertical padding, initial height 2160.5px. Mobile 80px padding and about 2887.5px.
- Header max-width 1200px, desktop px48; grid `1.2fr 1fr`, 64px gap, 48px bottom margin.
- H2 Dazzle burgundy outlined/filled, 96px/96px desktop; 48px mobile. Intro body about 17px/1.6.
- Pills: 12px Dazzle, 1.2px tracking, 20×10px padding, 38px high. Active rose; inactive transparent with 30% burgundy border.
- Sliding wrapper transition: transform and height `650ms cubic-bezier(.34,1.15,.64,1)`; transform 0/-100%/-200%.
- Group headings: Dazzle outlined, 24px/32px, 1.2px tracking. Product grids 2 columns desktop, 1 mobile.
- Product row: 140×140 object-contain art, title/body to the right; subtle bottom rule; art shadow `0 6px 14px rgba(99,0,30,.18)`.

## Content
- Madeleines/Clásicos: Vainilla, Chocolate, Marmoleada with the exact descriptions from the live page.
- Madeleines/Especiales: White Pistacho (Best seller), Rosa, Matcha (Best seller), Arándanos, Limón, Coco Con Carbón Activo (Frutos de cáscara), Chai, Fresa, Naranja, Mango, Spirulina Azul.
- Café/Café de especialidad: Latte, Capuchino, Expresso, Americano.
- Café/Bebidas premium: Coco Matcha, Chai Latte, Ube Matcha Latte, Matcha, Thai Tea Latte, Ube Latte.
- Para llevar/Madie Packs: Madie's Vainilla, Madie's Chocolate, Mix Mini Madie's Chocolate & Vainilla, Mix Madie's Chocolate Y Vainilla, MADIE Box, Madies for Doggies.
- Para llevar/Café & té en bolsa: MADIE Guatemala Café Nica.
- Use verbatim descriptions captured in the DOM snapshot/BEHAVIORS research.

## Assets
- Madeleines: `a141bf8a7536a154`, `e7e2d6c9b7c5cbd1`, `01d642bf49256cd4`, `9e09fc284006ddbd`, `7daeb867e3fc2cde`, `9432c0cb28480de0`, `fbaf039fb9decc77`, `26100ef699035982`, `22918087e8b1a3f8`, `0b29af24c9ebd195`, `398ac48acc24b977`, `2b4bd6eb8b03786e`, `aeef5a80884f14cb`, `43fcfc4ca22de4c3` (all `.png`).
- Café: `9fa05e7aac8e3863`, `aeea95e2935f849e`, `9f516bc2485e6c75`, `e2d3114a5a42a1fb`, `a8541c71504da466`, `31cebb4682e01ce7`, `d3cff6c5c4973034`, `5c974c6dd9c9e6bb`, `52d9734e7feb3b8f`, `9b7dced6e9e5190d`.
- Takeaway: `c5352357afa3358d`, `b39844ef0a1136eb`, `adb9edd773e0c191`, `35d703f4e04e7407`, `1e6de299a4c8261a`, `304158a5505a1cf5`, `eb255236e2f9e81a`.
