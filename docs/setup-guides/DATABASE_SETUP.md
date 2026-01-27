# Database Setup (PostgreSQL + Prisma)

This project uses PostgreSQL with Prisma. The API routes in `app/api/*` expect `DATABASE_URL` to be set.

## Local (Docker)

1. Start Postgres:

```bash
docker compose -f docker-compose.db.yml up -d
```

By default, this compose file exposes Postgres on port `5433` (to avoid conflicts with a locally installed Postgres on `5432`).
You can override this by setting `POSTGRES_PORT` when starting Docker, e.g. `POSTGRES_PORT=5432`.

2. Set `DATABASE_URL` (pick one):

- `.env.local` (recommended for local dev), or
- `.env`

Example:

```bash
DATABASE_URL=postgresql://saimor_user:pass@localhost:5433/saimor_ai
```

If you use a provider with a pooler (common for serverless), you can also set:

```bash
DIRECT_URL=postgresql://... (direct connection, usually port 5432)
```

3. Create tables via Prisma:

```bash
pnpm prisma generate
pnpm prisma db push
```

4. Quick verification (optional):

- Start the app: `pnpm dev`
- Call the endpoints once (they will create initial rows where needed):
  - `GET /api/dashboard/overview` (auto-seeds `DashboardStats` if empty)
  - `POST /api/waitlist`
  - `POST /api/contact`
  - `POST /api/chat`

## Owner (Admin) Login (Optional)

There is an optional owner area at `GET /owner` to view basic database content.

### Option A: Owner password (no SMTP required)

Set these env vars (e.g. in `.env.local` / Vercel):

```bash
OWNER_EMAILS=you@example.com,other@example.com
OWNER_PASSWORD=choose-a-long-random-password
```

Then open `GET /owner/login` and sign in with email + password.

### Option B: Email magic link (SMTP required)

If the NextAuth Email provider is configured (see `.env.example`), you can also sign in via `GET /login`.
If your email is listed in `OWNER_EMAILS`, your role becomes `owner`.

## Production (Vercel)

1. Provision a managed Postgres (Neon/Supabase/Railway/etc.).
2. Set `DATABASE_URL` in Vercel for Production + Preview.
3. Prefer migrations (not `db push`) during deployment:

```bash
pnpm prisma migrate deploy
```
