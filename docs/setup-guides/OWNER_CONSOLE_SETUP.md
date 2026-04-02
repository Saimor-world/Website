# Owner Console Setup

Stand: 2. April 2026

## Zielbild

- `https://www.saimor.world` = öffentliche Website
- `https://hq.saimor.world` = Demo-/Portal-/OS-Fläche
- `https://owner.saimor.world` = getrennte Owner Console

Die Owner Console ist eine eigene Sicherheitsfläche und nicht die normale HQ-Anmeldung.

## DNS

Der DNS-Teil ist erledigt, wenn dieser Record existiert:

- `A owner.saimor.world -> 76.76.21.21`

Wenn dieser Record bereits in Porkbun sichtbar ist, muss dort nichts weiter geändert werden.

## Vercel

Im Website-Projekt:

1. `Settings -> Domains`
2. `owner.saimor.world` hinzufügen
3. warten, bis der Status `Valid Configuration` oder `Ready` ist
4. danach prüfen:
   - `https://owner.saimor.world`
   - `https://owner.saimor.world/login`

Wenn die Domain noch nicht sauber per HTTPS lädt, fehlt meistens nur dieser Vercel-Schritt oder das Zertifikat ist noch nicht fertig provisioniert.

## Sichere Env-Variablen

Im Website-Projekt unter `Settings -> Environment Variables` mindestens setzen oder bewusst überschreiben:

- `OWNER_EMAILS`
- `OWNER_PASSWORD`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `SAIMOR_CORE_BASE_URL`
- `OWNER_CONSOLE_CORE_TOKEN`

Empfohlene Werte:

- `OWNER_EMAILS=<deine-owner-mail>`
- `OWNER_PASSWORD=<langes-zufälliges-passwort>`
- `NEXTAUTH_SECRET=<mindestens-32-zufällige-zeichen>`
- `NEXTAUTH_URL=https://www.saimor.world`
- `SAIMOR_CORE_BASE_URL=https://api.saimor.world`
- `OWNER_CONSOLE_CORE_TOKEN=<aktueller-bridge-token>`

Wichtig:

- Vercel zeigt bestehende Secret-Werte nach dem Speichern nicht wieder an.
- Wenn die alten Werte unbekannt sind, ist der sichere Weg: neue Werte setzen und bewusst rotieren.

## So funktioniert der Owner-Login heute wirklich

Der verlässliche Owner-Login ist aktuell:

- `https://www.saimor.world/owner/login`

Er nutzt:

- `OWNER_EMAILS` als Allowlist
- `OWNER_PASSWORD` als Credentials-Login

Wichtig:

- Die normale `/login`-Strecke ist davon getrennt.
- SMTP allein macht den Owner-Login nicht automatisch passwordless.
- Für einen echten Magic-Link-Login braucht die Website eine sauber aktivierte Email-Provider-Strecke in NextAuth inklusive Token-Persistenz.

## Phase 1: sicher und rund

Sofort:

- dedizierte Owner-Mail in `OWNER_EMAILS`
- starkes Owner-Passwort
- frischer `NEXTAUTH_SECRET`
- gesetzter `OWNER_CONSOLE_CORE_TOKEN`
- `owner.saimor.world` als eigene Domain

Danach:

- Bridge-Token regelmäßig rotieren
- später Step-up-Authentifizierung ergänzen
- optional TOTP oder Passkey für Owner-Zugang

## Core-Bridge

Die Owner Console liest geschützte Core-Daten über:

- `SAIMOR_CORE_BASE_URL`
- `OWNER_CONSOLE_CORE_TOKEN`

Der Token kann im Core rotiert werden über:

- `POST /v3/system/owner/rotate-token`

Nach einer Rotation muss der neue Token sofort in Vercel aktualisiert werden.

## Kurzcheck

Wenn alles korrekt steht, müssen diese Ziele funktionieren:

- `https://www.saimor.world/owner/login`
- `https://owner.saimor.world/login`
- `https://api.saimor.world/v3/health`
