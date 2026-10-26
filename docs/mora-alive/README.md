# Website integration — MÔRA Alive v04

Status: PREPARED, draft only, no production publication. Visual fidelity remains work in progress; this is not a claimed 1:1 finished character asset.

`/mora/alive` mounts the **same** mesh body, state vocabulary, controls and accessibility behavior
as the OS. It is explicitly a public character preview; it does not load OS authentication,
subscribe to CORE, call agents or report real work. The draft also integrates it into the existing `/mora` product page, described below.
Production remains unchanged until a separate release is approved.

## Canonical source
`SOURCE.json` pins the exact `Saimor-world/mora-ui` commit and SHA-256 hashes. Renderer, View,
CSS, state engine and derived approved sigil are exported from that commit, not independently
implemented. Run `node scripts/verify-mora-alive-source.mjs` to detect downstream changes.
To update, run the upstream `scripts/export-mora-alive.mjs` against this checkout at a new
reviewed immutable commit. Do not modify mirrored character sources here.

V04 exports the canonical light form, cambered membranes, jade material, transparent HDR bloom and articulated night-rest pose from OS source `bdef1aced365b52ada55f907db49d8651560da77`. The same engine and body serve both previews. V04 divides the continuous head mesh into face/crest draw groups: the face keeps orbit occlusion, while the translucent crest reveals the surrounding membranes. Its shader uses a broad internal cream light source and a separate gold crest response rather than the previous shell-like directional highlight. The last captured upstream source passed all six browser checks, including GPU readback of finite HDR targets and actual night-rest images. Current source checks are linked on OS draft #163. Website check results are linked on this draft; this route never reports live CORE work.

Added dependencies: exact Three.js 0.181.0 and matching type definitions, as already used by OS.
No React upgrade or React Three Fiber dependency is required.

The existing Vercel migration script now skips only the `feat/mora-alive-v1` Preview branch.
This visual-only preview must not apply any database migration. Production migration behavior
is unchanged. The route has `noindex`; primary navigation and domains are unchanged. The existing language switch resolves `/en/mora/alive` and `/de/mora/alive` to the same first preview. The shared renderer’s `/home` link reuses the existing account bridge without changing authentication or navigation behavior.

Risk A: optional preview presentation; no forms, accounts, billing or data changes.
Rollback: revert this feature commit. Merge and production deployment require Marius's approval.
Local typecheck and focused lint PASS (one existing unused-disable warning). Canonical source and preview migration-skip checks PASS. OS renderer browser matrix: 6/6 PASS, including iPhone WebKit. Website build/CI results are linked on draft PR #122. Physical iPhone performance and authenticated CORE character journeys are not claimed.

The existing ambient-particle test uses the canvas getContext return type for its mock, accommodating the added WebGPU overload supplied by Three.js types; runtime behavior is unchanged.

A focused browser workflow runs `npx playwright test --config=playwright.alive.config.ts` on Desktop Chromium and iPhone Chromium/WebKit. It verifies the actual canvas inside the Website layout, essential-only consent, preview provenance, pause and both language-switch destinations without the unrelated historic before/after benchmark.

## Existing MÔRA product page

The draft now integrates the canonical 3D body into the real `/mora` and `/en/mora` landing
hero. `MoraHeroPresence` is a thin Website lifecycle/input adapter around the same exported
`CharacterScene`, not another renderer or character engine. It replaces the old hero stone
image and face overlay. Exactly one MÔRA presence remains on the page.

The original product headline, OS demo launch, context examples, trust section and Deep View
links remain part of the page. The hero pause controls both the body and the decorative
background; existing site Lite mode, system reduced motion, offscreen/background suspension,
keyboard invitation,
touch and localized WebGL fallback are supported. Mobile places the headline, character and
OS entry in one scrollable flow. The feature section uses a brighter cream/jade surface.

The hero is a public development preview in idle, with local gaze/invitation reactions.
It does not represent an authenticated CORE session or execute agent work. `/mora/alive`
remains the separate character inspection route. Focused browser checks cover both purposes.

The first actual-page integration (`2e66b6bb`) passed all nine focused browser checks in
run 40237124914. Actual desktop and iPhone WebKit hero frames were reviewed. The checks
cover one character, keyboard/touch, shared pause with stable canvas pixels, reduced motion,
DE/EN product routes, context interaction, OS/Deep View destinations and WebGL fallback.
The follow-up uses the existing `isLiteMode` / `saimor-lite` signal to stop the body on weak
hardware and adds a direct frozen-canvas assertion for that transition.

## Motion preference consistency (2026-10-26)

Both Website adapters now use `useSiteLiteMode`, which subscribes to the existing site
preference with a still server snapshot. The inspection view receives this as an additional
motion limit; manual pause and system reduced motion continue to take precedence.
No new setting, storage key, engine or renderer is introduced.

The prior broad CI 40237703242 passed build, typecheck and 229 unit tests, but four Chromium
inspection journeys exceeded their total 60-second budget. Trace review showed multi-second
DOM actions while several continuous software-GPU scenes ran in parallel. The provenance
and locale journey now uses reduced motion, retains both actual language-switch clicks,
and checks the live Lite transition with identical canvas frames. The separate product-page
journey still exercises normal motion, manual pause, reduced motion and Lite mode.

## Deep View integration (2026-10-26)

The same immutable `CharacterScene` now replaces both old jade portraits in `/mora/deep-view`
and `/en/mora/deep-view`: the large hold-to-enter encounter and the small flying guide above
the star river. The product hero, encounter and water guide share `MoraCharacterBody` for
renderer lifecycle, reduced motion, site Lite preference, visibility and WebGL fallback.
The guide retains its bounded flight path and fading trail; chapter interaction selects the
local listening expression. This is a staged reaction, never a CORE job or simulated success.

The existing hold controller, star/mycelium field, dawn, keyboard exploration, history,
replay, origin-aware back links and product links remain connected. Exactly one body is
mounted in each phase. The old face overlay and jade portrait are not layered under it.
The guide is larger so the light body's silhouette remains legible on mobile.

Unit tests cover the shared lifecycle and existing hold/scene navigation. Focused browser
checks exercise both body placements, DE/EN, reduced-motion stable pixels, contextual
expression, replay/unmount and no-WebGL navigation. The broader cinematic journey now
checks the actual canonical canvas instead of obsolete SVG-eye/image alignment assertions.
Physical-device thermal/performance measurements and final 1:1 sculpt/material fidelity
remain open. No production release or merge.

The first Deep View source `74fd1ba7` passed 12 focused browser checks (40296105717),
but actual mobile captures exposed intrinsic canvas width expanding the encounter grid.
The follow-up uses explicit zero-minimum grid tracks and button minimum sizes, and adds
browser assertions that canvas/button/frame widths and centers agree. Functional tests
alone are not treated as visual acceptance.

The corrected mobile grid source `b4a904a3` passed all character journeys in the full matrix,
including iPhone WebKit (run 40297155890). Actual corrected mobile encounter images were
reviewed: the body is centered and the jade stays inside the frame. That broad run passed
67 checks and timed out in the English WebKit journey. Trace inspection isolated 74 seconds
waiting for the autonomously moving guide button to become stable before a pointer click;
transition, dawn, heading focus and the final product destination were otherwise reached.
The English journey now uses keyboard activation of the guide (focus already holds flight),
while the German cinematic journey retains the real pointer/hold path. No forced click,
retry, reduced-motion substitution or removed destination assertion is used.

## Reviewed light-material refinement

The new immutable body source `bdef1ace` passes full OS CI 40342567006 and all six renderer
checks 40342566902. Actual idle and curled night-rest frames were reviewed on iPhone WebKit
and compared with V04: the face now has a softer inner-to-edge gradient, the core tail is
more transparent, and jade veins are less contrasty. This is a measured visual iteration,
not an accepted 1:1 match or physically traced volumetric light. No geometry, scene timings
or event mappings were changed. The same material is exported to all Website placements.

The English normal-motion keyboard journey is extracted into `mora-english-motion.spec.ts`
so both the full Website matrix and the focused character workflow run it. The focused
workflow therefore covers 15 cases (five journeys across three browser/device projects),
including the exact previously timed-out path, without waiting for the historic baseline
comparison. It retains normal motion, real focus/Enter activation and all product assertions.

The new material/source passed all 15 focused Website checks (40344025701). Actual mobile
captures exposed a remaining presentation issue in the expanded product story: the larger
guide's caption could overlap the footer. The guide now parks beside the story, hides its
decorative passive caption, and reserves room above the footer. Mode changes update the
position even under reduced motion. Both reduced-motion and English normal-motion browser
journeys assert that the body stays above the footer; the body is not duplicated or removed.

The expanded story reserves an actual layout dock: beside the copy on desktop and above
it on mobile. The existing guide moves to that measured dock, including during scrolling
and reduced motion. It is the same mounted canvas, with no second decorative portrait.
Browser checks verify containment inside this slot as well as separation from the footer.

The first dock-source focused run (40346669889) hit its 15-minute limit before browser
execution. Logs show the Azure Ubuntu mirror downloading the 119 MB dependency set at
roughly tens of kB/s, not a test assertion failure. Both Website workflows now replace that
mirror hostname with Ubuntu's official archive host before installing the same signed
packages. Browser engines, assertions and the 15-minute focused budget are unchanged.
