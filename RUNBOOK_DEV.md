# Saimor Dev Runbook

## Quick Start
1. `npm install`
2. `npm run db:push`
3. `npm run dev:auto`

Default URL: `http://localhost:3001`  
If `3001` is busy, `dev:auto` falls back to next free port and injects matching `NEXTAUTH_URL`.

## Stable Commands
- Start dev with cleanup + port recovery: `npm run dev:auto`
- Start dev on fixed `3001`: `npm run dev:clean`
- Kill port 3001 manually: `npm run kill:3001`
- Build with retries and clean cache: `npm run build:auto`
- Run auth/db preflight checks: `npm run preflight:auth`
- Cleanup magic-link tokens: `npm run auth:cleanup:magic`
- Smoke test auth and health: `npm run smoke:auth`

## Login Troubleshooting
1. Verify auth providers:
   `GET /api/auth/providers` should include `credentials` and `magic-token`.
2. Verify health:
   `GET /api/health` should return `ok: true`.
3. Credentials fallback:
   Ensure `.env.local` has `OWNER_EMAILS` and `OWNER_PASSWORD`.
4. Magic link delivery:
   - In production: SMTP must be valid.
   - In development: API returns `debugUrl` fallback if SMTP fails.

## Common Failure Recovery
### `EADDRINUSE: 3001`
Run:
1. `npm run kill:3001`
2. `npm run dev:auto`

### `.next` chunk/module missing errors
Run:
1. `npm run clean:next`
2. `npm run build:auto`
3. `npm run dev:auto`

### Auth callback returns `CredentialsSignin`
1. Re-check `OWNER_PASSWORD` in `.env.local`.
2. Ensure login email is in `OWNER_EMAILS` (or list is intentionally empty).
3. Re-run `npm run smoke:auth`.

## Health Contract
`GET /api/health` returns:
- `ok`: global status
- `runtime`: node/env info
- `auth.providers`: active provider ids
- `auth.nextAuthUrl`: active callback base
- `smtp.configured`: mail readiness for magic links
- `db.ok`: database reachability

Use this endpoint as first check before deeper debugging.

## Current QA Scope

For the website-to-account-to-HQ flow, use:

`docs/QA_LOW_ENTRY_OWNER_HQ.md`

It covers:
- Security Check before login
- Digital Self before login
- Magic-Link claim
- Account dashboard
- Owner Command website visitor/lead overview
- HQ `/entry` handoff
- OS Admin bridge to Owner Command
