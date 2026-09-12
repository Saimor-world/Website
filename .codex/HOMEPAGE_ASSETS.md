# Homepage artwork — 2026-09-12

Generated with the built-in image generation tool for the explicitly requested
green/gold website redesign. Decorative artwork, never a product screenshot or NFT.
The existing seal, all text, links and interactive states are separate HTML/assets.
Sources were converted to WebP (quality 83) for delivery.

- `public/images/saimor-forest-threshold.webp`: wide cinematic forest sanctuary,
  blackened emerald, champagne-gold doorway right of centre, wet basalt, moss,
  reflections, atmospheric depth, quiet left region for text, subtle light threads;
  no lettering, logos, interface, cards or people.
- `public/images/saimor-cosmos.webp`: wide emerald cosmos, low planetary horizon,
  warm golden atmospheric rim, sparse stars and delicate celestial arcs on the
  right, quiet dark left region for text, subtle forest framing; no lettering,
  logos, interface or cards. Original brand seal overlaid separately.

The user's current reference and explicit request supersede the older abstract-only
navy design brief for this homepage. Existing remote `feat/auto-frontend` is preserved;
this work is published on a dated sibling branch.

## Layered revision

User feedback: retina softness and baked-in planets/orbits. New atmosphere-only
assets are `saimor-cosmos-layer.webp` and `saimor-forest-layer.webp`. The built-in
generator returned 1672 × 941 pixels, despite a larger requested size: these are
not 4K. Converted at WebP quality 94, served by Next Image at quality 95. No
upscaling is presented as new detail. Hero moons/orbits and the portal frame,
reflection and MÔRA light are now separate browser-rendered layers. The existing
`saimor-sigil.svg` replaces the black raster seal in hero/navigation/footer.
Animation is slow, pausable and disabled for reduced-motion preferences.

Prompts: emerald cosmic landscape with quiet sky and planetary horizon, explicitly
without orbit lines, moons or logo; emerald forest clearing and water with golden
light, explicitly without portal, light threads, typography or UI. Built-in image
generation, not the CLI fallback. Previous assets remain available for rollback.

Raster display is capped at 836 CSS px (557 above DPR 2.5), avoiding full-viewport
Retina enlargement. CSS/SVG fills the rest of the world; this is not a 4K bitmap.
