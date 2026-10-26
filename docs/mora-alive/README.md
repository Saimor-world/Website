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

V04 exports the canonical light form, cambered membranes, jade material, transparent HDR bloom and articulated night-rest pose from OS source `93fec95c25c79b494897ac771343c4a208789ad6`. The same engine and body serve both previews. V04 divides the continuous head mesh into face/crest draw groups: the face keeps orbit occlusion, while the translucent crest reveals the surrounding membranes. Its shader uses a broad internal cream light source and a separate gold crest response rather than the previous shell-like directional highlight. The last captured upstream source passed all six browser checks, including GPU readback of finite HDR targets and actual night-rest images. Current source checks are linked on OS draft #163. Website check results are linked on this draft; this route never reports live CORE work.

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
