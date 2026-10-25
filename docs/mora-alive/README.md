# Website integration — MÔRA Alive v01

Status: PREPARED, draft only, no production publication.

`/mora/alive` mounts the **same** mesh body, state vocabulary, controls and accessibility behavior
as the OS. It is explicitly a public character preview; it does not load OS authentication,
subscribe to CORE, call agents or report real work. Existing `/mora`, portal, landing page and
production character remain intact until a separate release is approved.

## Canonical source
`SOURCE.json` pins the exact `Saimor-world/mora-ui` commit and SHA-256 hashes. Renderer, View,
CSS, state engine and derived approved sigil are exported from that commit, not independently
implemented. Run `node scripts/verify-mora-alive-source.mjs` to detect downstream changes.
To update, run the upstream `scripts/export-mora-alive.mjs` against this checkout at a new
reviewed immutable commit. Do not modify mirrored character sources here.

Added dependencies: exact Three.js 0.181.0 and matching type definitions, as already used by OS.
No React upgrade or React Three Fiber dependency is required.

The existing Vercel migration script now skips only the `feat/mora-alive-v1` Preview branch.
This visual-only preview must not apply any database migration. Production migration behavior
is unchanged. The route has `noindex`; no navigation or domain is added.

Risk A: optional preview presentation; no forms, accounts, billing or data changes.
Rollback: revert this feature commit. Merge and production deployment require Marius's approval.
Physical iPhone performance and authenticated CORE character journeys are not claimed.
