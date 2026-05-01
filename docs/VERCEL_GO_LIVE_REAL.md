# SAIMOR WORLD Go-Live Checklist

This is the minimal production setup for making WORLD real on Vercel.

## 1. Vercel Environment Variables

Set these in Vercel Project Settings -> Environment Variables for Production.

```env
NEXTAUTH_URL=https://www.saimor.world
NEXTAUTH_SECRET=<new-long-random-secret>

DATABASE_URL=<production-postgres-url>

OWNER_EMAILS=nextchaptergermany@gmail.com
OWNER_PASSWORD=<new-long-random-owner-password>

SAIMOR_ENTRY_SECRET=<new-long-random-secret>
SAIMOR_WALL_SECRET=<new-long-random-secret>

SMTP_HOST=smtp.strato.de
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=contact@saimor.world
SMTP_PASS=<production-smtp-password>
SMTP_FROM=Saimor <contact@saimor.world>

ANTHROPIC_API_KEY=<production-anthropic-key>
GEMINI_API_KEY=<production-gemini-key-if-used>

OS_HOME_URL=https://hq.saimor.world
NEXT_PUBLIC_OS_HOME_URL=https://hq.saimor.world

OWNER_CONSOLE_CORE_TOKEN=<optional-core-owner-bridge-token>
SAIMOR_CORE_BASE_URL=https://api.saimor.world

NEXT_PUBLIC_ENABLE_SPEED_INSIGHTS=true
SENTRY_DSN=<optional-production-sentry-dsn>
```

Do not use `localhost` values in Vercel.

Run the local/predeploy preflight before launch:

```bash
npm run preflight:go-live
```

The command prints only variable names, status, and safe metadata. It does not print secret values.

## 1.1 Current Vercel Cleanup Notes

Based on the current SAIMOR WORLD code paths, these are required for the public business flow:

- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `DATABASE_URL`
- `OWNER_EMAILS`
- `OWNER_PASSWORD`
- `SAIMOR_ENTRY_SECRET`
- `SAIMOR_WALL_SECRET`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
- `NEXT_PUBLIC_OS_HOME_URL`

These are recommended for a real launch, but the site can boot without them:

- `OS_HOME_URL`
- `GEMINI_API_KEY`
- `ANTHROPIC_API_KEY`
- `SAIMOR_CORE_BASE_URL`
- `OWNER_CONSOLE_CORE_TOKEN`
- `NEXT_PUBLIC_ENABLE_SPEED_INSIGHTS`
- `SENTRY_DSN`
- `NEXT_PUBLIC_SENTRY_DSN`
- `NEXT_PUBLIC_CAL_URL`

These can stay if you use Sentry build uploads and environment labels:

- `SENTRY_AUTH_TOKEN`
- `SENTRY_ORG`
- `SENTRY_PROJECT`
- `SENTRY_ENVIRONMENT`
- `NEXT_PUBLIC_SENTRY_ENVIRONMENT`

## 2. Production Database

`DATABASE_URL` must point to a production Postgres database. After setting it, run the production schema deploy from CI or locally against the production DB:

```bash
npx prisma migrate deploy
```

For the current local prototype, `prisma db push` was used locally. For live use, keep migrations explicit before launch.

## 3. Owner Console

Production owner console:

- `https://www.saimor.world/owner/login`
- Uses `OWNER_EMAILS` and `OWNER_PASSWORD`
- After login: `https://www.saimor.world/owner`

The Owner page now shows:

- Go-live readiness
- Security leads
- Wall review count
- Wall moderation buttons
- Audit detail link
- HQ link
- Mail draft link
- Protected CSV export

## 4. Real User Flow

1. Visitor runs Security Check without account.
2. Audit is persisted.
3. Visitor can request HQ link.
4. Visitor can request Wall entry.
5. Wall entry requires email verification.
6. Verified Wall entries start as `pending_review`.
7. Owner publishes, keeps private, or returns to review.
8. Owner can open HQ context or export leads.

## 5. Before Public Launch

- Rotate all local secrets.
- Confirm `OWNER_PASSWORD` is not copied from local dev.
- Confirm `NEXTAUTH_URL` is the public domain.
- Confirm SMTP sends from the production domain.
- Confirm `/api/health` is green.
- Confirm `/owner/login` works.
- Confirm `/api/owner/leads/export` returns CSV only after owner login.
- Confirm `/wall` only shows approved public entries.
