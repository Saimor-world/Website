# SAIMÔR — Experience recovery (#84)

Based on PR #83, immutable source commit `ec4ce00ab14692e4de617e088271dcc8f6d8485a`.
PR #83 is retained. Work takes place on a separate branch. No production promotion, main merge, private OS change, or YORI pilot change.

## Art direction

Night → threshold → uncertainty → encounter → distinction. Near-black `#020605`, restrained jade, warm brass, warm paper for product details. Cormorant for expressive headlines; sans-serif for practical copy; monospace only for short orientation. One scale and gutter system, generous line heights, no diagram masquerading as live data.

The hero retains the original cosmos and orbital signature. The forest uses one original photograph, including the actual photographed doorway. Mobile gives the photograph a 340 px scenic area instead of stretching a landscape across a 900 px tall backdrop. The cut from forest to Reality Check stays dark; daylight begins deliberately at the products. The nonfunctional dotted connector and 1,000+ lines of accumulated homepage cascade are replaced by one stylesheet.

## The new encounter

1. Ambiguous light paths and three drifting words introduce uncertainty. The opening is readable for 4.8 seconds; it is manually skippable and does not advance in a hidden tab, when paused, or with reduced motion.
2. MÔRA is revealed from near-black. The original 504 px brand stone is not repainted. The website adapter retains the OS A4 geometry from `mora-ui/components/mora/MoraFace.tsx` and `app/mora-stone.css`: R=43, ex=.34R, rx=.165R, greeting arcs, warm core, luminance vein mask, catchlights and original smile. Face and stone share the exact responsive coordinate box. No pointer tracking or separate pupils.
3. A voluntary 1.15 second passage moves through her gaze. The field resolves into distinctions: evidence, inference, human decision. This is an artistic principle, explicitly disclosed as staged, never an AI truth-detection claim. The technical lab remains separate and unchanged.

Deep View owns its complete viewport, including minimal back/language/motion controls. It does not inherit public navigation, discovery overlays, progress or the marketing footer. Browser Back retraces deliberate choices; replay resets the story; keyboard actions focus the incoming heading. Reduced motion bypasses the passage entirely.

## Observed baseline and concrete defects

- Live Vercel baseline was READY at the original SHA. Cloud-browser desktop screenshots were taken before edits.
- Browser confirmed ordinary public navigation and discovery controls inside Deep View.
- Source confirmed that the old clarity phase activated `MoraOrb`'s `speak` ripple, contradicting the no-rings direction. The encounter now uses the original stone directly, with A4 light only.
- Source confirmed mutually overriding homepage geometry, plus a mobile forest bitmap 730–890 CSS px tall. The replacement uses a bounded scenic composition.
- Footer Studio led to the homepage anchor; now it opens the dedicated bilingual Studio route.
- Contact language switch previously produced a nonexistent `/en/kontakt` or `/de/contact`; exact route pairs are now provided.
- Mobile menu lacked Escape/focus containment and could retain a body lock after desktop resize. These interactions are now explicit.
- Demo launch failures were console-only. They now produce a visible localized retry message.
- EN Security Check rendered the article/inline form while DE rendered the full scanner. Both now use the same scanner and API flow, with localized static interface text. Backend findings retain their source language.

## Verification contract

Local lint/typecheck/unit tests are run separately. The local production build is blocked by the execution image (`uv_resident_set_memory`), so successful production build evidence must come from CI/Vercel.

The PR CI builds first, then runs Playwright in Chromium at 375/390/430/1440 and WebKit with iPhone 13 parameters. It retains before/after screenshots from the immutable baseline and current commit, failures/traces and HTML reports. Tests cover all requested public routes, visible image loading, horizontal overflow, portal/Escape/focus return, product → Studio → contact, original face alignment, deliberate passage/history/replay, short viewport, reduced motion, and mobile navigation.

WebKit emulation is not a physical iPhone Safari test. Screenshots must be inspected, not merely generated. CI and preview results are recorded after the actual runs; this document alone is not a visual sign-off.
