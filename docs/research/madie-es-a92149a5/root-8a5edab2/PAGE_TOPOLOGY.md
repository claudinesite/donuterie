# Page Topology

1. `Header` — fixed, transparent navigation at z-index 60. It overlays every section and owns the full-screen navigation drawer.
2. `Hecoralction` (`#inicio`) — viewport-height image hero with a dark overlay, language pills, Google rating, display headline, descriptive copy, CTA, and rotating scroll cue.
3. `StoryIntro` (`#story`) — cream paper-textured editorial introduction with centered copy.
4. Cream-to-teal wave divider — decorative SVG in normal flow.
5. `StoryGallery` (`#historia`) — teal grain/pattern section with a four-card draggable/clickable stack and paired narrative copy.
6. teal-to-cream wave divider.
7. `MenuSection` (`#menu`) — cream product catalog. Click-driven pill tabs switch among Madeleines, Café, and Para llevar with a horizontal 650ms panel slide and animated height.
8. `CateringSection` (`#catering`) — full-bleed photo with parallax offset, dark overlays, centered display copy, and CTA.
9. `InstagramSection` (`#instagram`) — cream split editorial heading/copy plus six-image strip.
10. Cream-to-teal wave divider.
11. `ContactSection` (`#contacto`) — teal grain section with interactive illustrated map and contact details.
12. `Footer` — dark teal logo, copyright, and legal links.

The document uses native vertical scrolling with `scroll-behavior: smooth`. Reveal elements are IntersectionObserver-driven: initial `opacity: 0; transform: translateY(14px)`, becoming fully visible over 900ms. The catering photo has a scroll-driven vertical parallax transform. The product catalog is click-driven, not scroll-driven. The story stack is click/drag-driven, not time-driven.
