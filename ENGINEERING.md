# Engineering profile — SAIMÔR Website

Canonical policy: `Saimor-world/saimor-workspace/docs/ENGINEERING_STANDARD.md`.

## Role
Public product/sales surface and entry point. It may explain and initiate flows; it must not become a privileged business backend.

## Non-negotiable invariants
- Public routes expose only intended public data.
- Authentication/session logic remains server-verified.
- Forms/API routes validate input and do not leak internal errors or secrets.
- Metadata/canonical/robots behavior is intentional for public vs preview pages.
- No demo claim such as “connected”, “live” or “remembered” unless the underlying state is real and verified.
- Database changes use Prisma migrations/deploy semantics; no manual production schema drift.
- AI/provider integrations remain bounded and must not expose private context in public pages.

## Required verification
`npm ci`
`npm run lint`
`npx tsc --noEmit`
`npm test -- --run`
`npm run build`

Run applicable auth/go-live preflight scripts for changes that touch access or deployment.
