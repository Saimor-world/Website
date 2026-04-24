# Vercel Deployment Checklist - SAIMÔR WORLD

Damit die Website (WORLD) auf Vercel mit dem neuen **Real-Security-Scan** und dem **Owner Dashboard** funktioniert, müssen folgende Umgebungsvariablen gesetzt sein:

### 1. Core Services (Echte Analyse)
- `GOOGLE_API_KEY`: Dein Gemini API Key (für die Greyzone-Analyse).
- `NEXT_PUBLIC_CORE_API_URL`: Die URL deines Backends (z.B. `https://api.saimor.world`).

### 2. Database (Prisma)
- `DATABASE_URL`: Deine PostgreSQL Connection URL.
- **Wichtig:** Führe lokal `npx prisma db push` aus, bevor du deployst, damit die neuen Felder (`attackerPath`, `reconData`) in der Cloud-Datenbank existieren.

### 3. Owner Access
- `OWNER_EMAILS`: Kommagetrennte Liste (z.B. `dein@email.de,admin@saimor.world`).
- `OWNER_PASSWORD`: Dein Master-Passwort für den ersten Login.
- `NEXTAUTH_SECRET`: Ein langer, zufälliger String.
- `NEXTAUTH_URL`: Die URL deiner Website (z.B. `https://www.saimor.world`).

### 4. Mail (Optional für Report-Versand)
- `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, `SMTP_PORT`.

---
**Status:** Alles ist lokal verifiziert und "green". Sobald die Variablen in Vercel sind, ist das System live.
