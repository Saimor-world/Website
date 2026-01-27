# 🚀 Vercel Deployment Guide - SAIMÔR

Diese Anleitung hilft dir dabei, das SAIMOR-Website-Projekt auf Vercel zu deployen, inklusive Datenbank-Anbindung und Authentifizierung.

## 📋 Voraussetzungen

1.  **Vercel Account**: Ein Account auf [vercel.com](https://vercel.com).
2.  **Externe Datenbank**: Da Vercel serverless ist, benötigst du eine öffentlich erreichbare PostgreSQL-Datenbank.
    *   **Empfehlung**: [Supabase](https://supabase.com), [Neon.tech](https://neon.tech) oder [Vercel Postgres](https://vercel.com/storage/postgres).
    *   Du erhälst dort eine Connection-String (z.B. `postgresql://user:pass@ep-hostname.aws.neon.tech/neondb?sslmode=require`).

## 🛠️ Schritt-für-Schritt Setup

### 1. Projekt in Vercel importieren
*   Verbinde dein GitHub/GitLab Repository mit Vercel.
*   Wähle das Projekt aus.

### 2. Environment Variables konfigurieren
Gib in Vercel unter **Settings > Environment Variables** die folgenden Werte ein. Nutze deine `.env` Datei als Vorlage.

| Variable | Beispiel / Beschreibung |
| :--- | :--- |
| `DATABASE_URL` | Deine externe Postgres URL (wichtig!) |
| `DIRECT_URL` | (Empfohlen) Direct Connection String fÃ¼r Prisma CLI. `DATABASE_URL` kann Pooler sein. |
| `NEXTAUTH_URL` | `https://deine-domain.com` (oder die Vercel URL) |
| `NEXTAUTH_SECRET` | Ein zufälliger langer String (z.B. per `openssl rand -base64 32`) |
| `OWNER_EMAILS` | `deine@email.de` (getrennt durch Komma) |
| `OWNER_PASSWORD` | Ein sicheres Passwort für den /owner/login |
| `ANTHROPIC_API_KEY` | Dein Claude API Key (für den Chat) |
| `NEXT_PUBLIC_SENTRY_DSN` | Dein Sentry DSN für Error-Tracking (optional) |
| `BACKEND_BASE_URL` | `https://api.saimor.world` (Saimôr Brain API) |

### 3. Build & Development Settings
Vercel erkennt Next.js automatisch. Dank des `postinstall` Skripts in der `package.json` wird der Prisma-Client bei jedem Deployment automatisch generiert.

*   **Framework Preset**: Next.js
*   **Build Command**: `next build`
*   **Install Command**: `npm install` oder `pnpm install`

### 4. Datenbank initialisieren
Sobald das erste Deployment durchgelaufen ist (oder lokal, wenn du die `DATABASE_URL` auf die Produktions-DB umstellst):

```bash
# Schema in die Cloud-DB pushen
npx prisma db push
```

## 🔐 Sicherheitshinweise

*   **SSL**: Achte darauf, dass deine `DATABASE_URL` am Ende `?sslmode=require` (oder ähnlich) hat, falls dein Anbieter SSL erzwingt.
*   **Secrets**: Teile niemals deine `.env` Datei öffentlich. Vercel verschlüsselt diese Variablen automatisch.

## 🐛 Troubleshooting

*   **Prisma Client Error**: Falls in den Logs steht "PrismaClient is not defined", prüfe ob `postinstall: prisma generate` in der `package.json` steht.
*   **Login funktioniert nicht**: Prüfe ob `NEXTAUTH_URL` exakt mit der Domain übereinstimmt, auf der du surfst (inkl. https).
*   **Database Timeout**: Stelle sicher, dass deine Datenbank-IP-Abfrage (Allowlist) auf "0.0.0.0/0" steht, da Vercel dynamische IPs nutzt.

---
Viel Erfolg beim Deployment! Bei Fragen schau in die `README.md` oder frage deinen KI-Assistenten.
