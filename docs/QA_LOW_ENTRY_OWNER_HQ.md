# QA: Low Entry, Account, Owner, HQ

## Preconditions

- `WORLD` env has `DATABASE_URL`, `NEXTAUTH_SECRET`, `OWNER_EMAILS`, `OWNER_PASSWORD`, `OS_HOME_URL`, `SSO_SHARED_SECRET`.
- `INTERFACE` env has `NEXT_PUBLIC_SURFACE_MODE=hq` only on the HQ surface.
- Run database sync after schema changes:
  - local/dev: `npm run db:push`
  - production/staging: deploy the Prisma schema with the chosen migration process.

## Start

1. In `WORLD`: `npm run dev:auto`
2. In `INTERFACE`: `npm run dev`
3. In `CORE`: start the local Core/Ollama path if testing real HQ SSO.

## Automated Checks

Run before manual QA:

```powershell
cd C:\saimor\WORLD
npx tsc --noEmit
npm test
npm run build

cd C:\saimor\INTERFACE
npm run verify:types
npm run verify:os:smoke
npm run build
```

## Manual QA

### 1. Security Check Without Login

1. Open `/de/einstieg/security-check`.
2. Submit a real test domain and email.
3. Confirm result appears immediately before login.
4. Confirm score, level, recommendations and recon block are visible.
5. Click Magic Link flow in dev and confirm the debug URL logs in.
6. Confirm the claimed report opens in `/account/dashboard/audit/[id]`.

### 2. Digital Self Without Login

1. Open `/de/einstieg/digital-self`.
2. Submit a blueprint.
3. Confirm result appears immediately before login.
4. Use Magic Link/Login claim.
5. Confirm `/account/dashboard/blueprint/[id]` opens.

### 3. Account Dashboard

1. Open `/account`.
2. Confirm it redirects to `/account/dashboard`.
3. Confirm claimed audits and blueprints are listed.
4. Open detail pages and print/PDF view.

### 4. Owner Command

1. Login at `/owner/login` with owner credentials.
2. Open `/owner`.
3. Confirm Website signal cards show Visitors, Events, Audits, Blueprints, Accounts, Waitlist, Contact, Chats.
4. Trigger a website interaction that calls `logEvent`.
5. Refresh `/owner` and confirm it appears in the Website Visitors event journal.
6. Confirm recent Security Audits show claimed/unclaimed state.
7. Confirm recent Blueprints and Accounts show in Account Conversion.

### 5. HQ Entry

1. From `/account/bridge`, click OS/HQ link.
2. Confirm the URL goes to HQ root with `sso_token`.
3. Confirm HQ processes SSO and lands on `/entry`.
4. Confirm website context is visible when claim context exists.
5. Click “Weiter ins OS” and confirm `/home` opens.
6. With `NEXT_PUBLIC_SURFACE_MODE` unset, open `/entry` and confirm it redirects to `/home`.

### 6. OS Admin Bridge

1. Login to OS as owner/admin.
2. Open Administration.
3. Confirm Owner Command opens `https://owner.saimor.world/owner`.
4. Confirm this is clearly described as separate from OS workspace data.

## Known Non-Blocking Warnings

- `INTERFACE npm run build` currently reports existing `useLocalTruthBridge` hook dependency warnings.
- `INTERFACE verify:os:smoke` can emit existing React `act(...)` warnings for `HomeSurface`.
