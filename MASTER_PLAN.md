# 🎯 MASTER PLAN - Saimôr Website & Web-01

**Status:** 2025-10-28, 21:00 Uhr
**Owner:** Frontend-Claude
**Koordination:** Backend-Claude #3 (n8n), User (Marius)

---

## 🚨 KRITISCH - Production Errors (JETZT)

### **Problem 1: React Hydration Errors (#418, #423)**

**Fehler:**
```
Uncaught Error: Minified React error #418
Uncaught Error: Minified React error #423
```

**Ursache:**
- Client/Server Render-Mismatch
- Wahrscheinlich in client-only Components mit window/document Access

**Betroffene Components (Vermutung):**
- EasterEggs.tsx (window access, localStorage)
- MoraAvatar.tsx (window.addEventListener)
- DataJungle.tsx (window access)
- CookieBanner.tsx (localStorage)

**Fix-Strategie:**
1. ✅ Alle `useEffect` mit window/document wrappen
2. ✅ Initial State auf `null` setzen, dann in useEffect füllen
3. ✅ Conditional Rendering: `{mounted && <Component />}`

**Aufwand:** 30-45 Min
**Priorität:** 🔥 KRITISCH

---

### **Problem 2: NextAuth 500 Error**

**Fehler:**
```
api/auth/session:1 Failed to load resource: 500
[next-auth][error][CLIENT_FETCH_ERROR]
There is a problem with the server configuration
```

**Ursache:**
- `NEXTAUTH_SECRET` fehlt in Vercel Production
- ODER: `NEXTAUTH_URL` falsch gesetzt

**Fix:**
1. Vercel Dashboard → Environment Variables
2. `NEXTAUTH_SECRET` setzen (falls fehlt)
3. `NEXTAUTH_URL=https://saimor.world` prüfen
4. Redeploy

**Aufwand:** 5 Min (Marius muss in Vercel)
**Priorität:** 🔥 KRITISCH

---

### **Problem 3: SVG Circle Error**

**Fehler:**
```
Error: <circle> attribute r: Expected length, "undefined"
```

**Ursache:**
- Irgendwo ein dynamischer radius-Wert = undefined
- Wahrscheinlich in Services.tsx Orbit-Decoration

**Fix:**
- Default-Wert für radius setzen
- Optional chaining verwenden

**Aufwand:** 10 Min
**Priorität:** ⚠️ Mittel (nicht blockierend)

---

### **Problem 4: Matomo Blocked**

**Fehler:**
```
cdn.matomo.cloud/.../matomo.js: ERR_BLOCKED_BY_CLIENT
Tracking Prevention blocked Script
```

**Ursache:**
- Ad-Blocker
- Tracking Protection

**Fix:**
- Nicht nötig! Das ist normal.
- Matomo funktioniert für User ohne Ad-Blocker.

**Aufwand:** 0 Min
**Priorität:** ℹ️ Ignorieren

---

## 📋 AUFGABE: n8n Webhook (HEUTE)

### **Status:** Backend-Claude #3 hat Info geliefert

**Was wir wissen:**
- ✅ n8n Flow existiert bereits
- ✅ Webhook-Endpoint vorhanden
- ❓ URL unklar: `https://n8n.voice.saimor.world/webhook/waitlist`?

**To-Do:**
1. **Webhook URL verifizieren:**
   - Backend-Claude #3 fragen ODER
   - Marius fragen

2. **Testen:**
   ```bash
   curl -X POST https://n8n.voice.saimor.world/webhook/waitlist \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","name":"Test"}'
   ```

3. **In Vercel setzen:**
   - Key: `N8N_WAITLIST_WEBHOOK_URL`
   - Value: `<verified-url>`
   - Environments: Production, Preview, Development

**Aufwand:** 10-15 Min (+ Marius Input)
**Priorität:** 🔥 KRITISCH (für Warteliste)

---

## 🆕 AUFTRAG: WEB-01 – R1 Frontend mit Guided-Mode

### **Scope-Analyse:**

**Was wird gebaut:**
- Neues Next.js Frontend in `/web/`
- Dashboard mit Guided-Mode (3-Schritte-Flow)
- Action Panel (Trigger Actions)
- API-Integration zu Môra Core
- Session-Resume (Cross-Channel)
- Tests (AT-03, AT-09)

**Struktur:**
```
web/
├── app/
│   ├── page.tsx                    # Dashboard
│   └── my-mora/page.tsx            # Chat
├── components/
│   ├── GuidedMode.tsx              # 3-Schritte-Flow
│   └── ActionPanel.tsx             # Trigger Actions
├── lib/
│   ├── api.ts                      # API zu Core
│   └── session.ts                  # Session-Resume
├── __tests__/
│   └── acceptance.spec.ts          # AT-03, AT-09
└── .env.local.example              # ENV Template
```

---

### **Feature 1: Guided-Mode (3 Steps)**

**Step 1: Zeitraum wählen**
- User wählt: "letzter Monat" (Dropdown)
- Button: "Bestätigen"
- API: POST `/v1/actions/execute`

**Step 2: Visualisierung & Snapshot**
- Môra zeigt Chart (KPI Visualization)
- Snapshot wird gespeichert
- Fortschritt-Anzeige

**Step 3: XLSX Export (verschlüsselt)**
- Frage: "Sende verschlüsseltes XLSX?"
- User: PIN eingeben ODER Button klicken
- API: POST `/v1/actions/confirm`

**Microcopy (fixiert):**
```
Step 1: "Wähle Zeitraum (letzter Monat) und bestätige."
Step 2: "Ich visualisiere die Kennzahl und speichere den Snapshot."
Step 3: "Sende verschlüsseltes XLSX? Bestätige mit PIN/Button."
```

**Aufwand:** 3-4h
**Priorität:** 🟡 MITTEL (nach Production-Fixes)

---

### **Feature 2: Action Panel**

**Trigger Actions:**
- Button: "Kosten analysieren"
- Button: "Dashboard generieren"
- Button: "Bericht erstellen"

**API:**
```typescript
POST {CORE_URL}/v1/actions/execute
Body: { action: "analyze_costs", params: {...} }
```

**Aufwand:** 1-2h
**Priorität:** 🟡 MITTEL

---

### **Feature 3: Session Resume**

**Cross-Channel:**
- Session-ID in localStorage
- Resume auf anderem Channel (Web → Voice)

**API:**
```typescript
GET {CORE_URL}/v1/session/{id}
```

**Aufwand:** 1h
**Priorität:** 🟢 NIEDRIG (Nice-to-have)

---

### **Feature 4: Tests (AT-03, AT-09)**

**AT-03: Guided-Mode komplett**
- User durchläuft alle 3 Steps
- < 60s (mit Mock-Data)

**AT-09: Cross-Channel Resume**
- Session wird resumed
- State bleibt erhalten

**Test-Framework:** Playwright oder Jest + Testing Library

**Aufwand:** 2h
**Priorität:** 🟡 MITTEL

---

### **Gesamt-Aufwand WEB-01:**

| Feature | Aufwand | Priorität |
|---------|---------|-----------|
| **Guided-Mode** | 3-4h | 🟡 Mittel |
| **Action Panel** | 1-2h | 🟡 Mittel |
| **Session Resume** | 1h | 🟢 Niedrig |
| **Tests** | 2h | 🟡 Mittel |
| **GESAMT** | **7-9h** | 1-2 Arbeitstage |

---

## 🎯 ZEITPLAN & PRIORITÄTEN

### **HEUTE (28.10, Abend):**

**Phase 1: Production Fixes (1-2h)**
- [ ] React Hydration Errors fixen
- [ ] NextAuth Check (Marius: Vercel ENV setzen)
- [ ] SVG Circle Error fixen
- [ ] Build & Deploy
- [ ] Production testen

**Phase 2: n8n Webhook (30 Min)**
- [ ] Webhook URL klären (Backend-Claude #3 / Marius)
- [ ] Testen
- [ ] In Vercel setzen

**Status-Update:**
- [ ] SHARED_CONTEXT.md Update schreiben
- [ ] Marius informieren: "Production läuft!"

---

### **MORGEN (29.10):**

**Phase 3: WEB-01 Start**
- [ ] Projekt-Setup: `/web/` Ordner erstellen
- [ ] Next.js App Router Setup
- [ ] Basic Dashboard-Layout
- [ ] GuidedMode.tsx Skeleton

**Ziel:** Basic Structure steht

---

### **30.10 - 31.10:**

**Phase 4: WEB-01 Features**
- [ ] Guided-Mode komplett (3 Steps)
- [ ] Action Panel
- [ ] API Integration
- [ ] Tests (AT-03, AT-09)

**Ziel:** WEB-01 R1 fertig & getestet

---

## ❓ OFFENE FRAGEN (MARIUS)

### **n8n Webhook:**
1. Welche URL? `https://n8n.voice.saimor.world/webhook/waitlist`?
2. Funktioniert der Webhook schon?
3. Was macht er mit den Daten? (Mailchimp? Slack? Airtable?)

### **WEB-01 Specs:**
4. Wo soll `/web/` liegen? Im aktuellen Repo oder separates Repo?
5. Core-API URL: `http://localhost:8080` oder Production-URL?
6. Gibt es `/docs/api/openapi.yaml`? (für API-Specs)
7. Gibt es `/docs/checks/acceptance.md`? (für Test-Definitionen)

### **NextAuth:**
8. Ist `NEXTAUTH_SECRET` in Vercel Production gesetzt?
9. Ist `NEXTAUTH_URL=https://saimor.world` gesetzt?

---

## 🤝 KOORDINATION

### **Backend-Claude #3:**
- Frage: n8n Webhook URL?
- Frage: Kann ich `/v1/actions/execute` API nutzen?
- Info: Ich baue `/web/` Frontend

### **Marius:**
- Brauche: Vercel ENV Check (NextAuth)
- Brauche: n8n Webhook URL
- Brauche: WEB-01 Specs (openapi.yaml, acceptance.md)

---

## 📊 STATUS TRACKING

**Production Website:**
- 🔴 React Errors (in Arbeit)
- 🔴 NextAuth 500 (wartet auf Marius)
- 🟢 Build OK
- 🟢 Deployment OK

**Community Features:**
- 🟢 Banner live
- 🟢 Warteliste live
- 🟡 n8n Webhook (in Klärung)

**WEB-01:**
- 🟡 Scope analysiert
- 🟡 Aufwand geschätzt: 7-9h
- 🔴 Noch nicht gestartet

---

## 🚀 LOS GEHT'S!

**Nächster Schritt:** React Hydration Errors fixen

**Nach Fix:** Status-Update an Marius & Backend-Claude #3

**ETA:** Production läuft in 2h, WEB-01 Start morgen

---

## 🔐 SECURITY CHECKLIST

### **Production Website (JETZT):**

**1. Environment Variables:**
- ✅ `NEXTAUTH_SECRET` niemals im Code
- ✅ API Keys nur server-side
- ✅ `NEXT_PUBLIC_*` nur für nicht-sensitive Daten

**2. NextAuth:**
- ✅ Secure session cookies (httpOnly, secure, sameSite)
- ✅ CSRF Protection eingebaut
- ✅ Session expiry: 30 Tage

**3. API Routes:**
- ✅ Input Validation (email, name)
- ✅ Rate Limiting (später: 5 Signups/h pro Email)
- ✅ XSS Prevention (no HTML in inputs)

**4. Client-Side:**
- ✅ Sanitize User Input (DOMPurify bei Bedarf)
- ✅ No inline scripts (CSP Headers in middleware)

---

### **WEB-01 Security (WICHTIG!):**

**1. PIN-Eingabe (XLSX Export):**
```typescript
// PIN Validation
- Min 4 digits, max 10
- Rate Limiting: 3 Versuche, dann 5 Min Timeout
- Keine PIN im localStorage
- Server-side validation

// Implementation:
const validatePIN = (pin: string) => {
  if (!/^\d{4,10}$/.test(pin)) throw new Error('Invalid PIN');
  // Send to server for verification
};
```

**2. Session-IDs:**
```typescript
// Secure Generation
- crypto.randomUUID() (nicht Math.random!)
- HTTP-only cookies (nicht localStorage!)
- SameSite=Strict
- Secure flag in production

// Implementation:
const sessionId = crypto.randomUUID();
document.cookie = `session_id=${sessionId}; HttpOnly; Secure; SameSite=Strict`;
```

**3. API Communication:**
```typescript
// HTTPS Only
- Development: http://localhost OK
- Production: HTTPS enforced

// Token Auth:
const headers = {
  'Authorization': `Bearer ${serverSideToken}`,
  'X-CSRF-Token': csrfToken
};
```

**4. XLSX Encryption:**
```typescript
// Client-Side Encryption BEFORE Upload
import { encrypt } from 'crypto-js';

const encryptedXLSX = encrypt(xlsxData, userPIN);
// Upload encryptedXLSX, NOT plain data
```

**5. Input Validation:**
```typescript
// Server-side validation
- Zeitraum: enum ['last_month', 'last_quarter', 'last_year']
- Action: enum ['analyze_costs', 'generate_dashboard', ...]
- No arbitrary strings!

// Client-side validation (zusätzlich):
const VALID_PERIODS = ['last_month', 'last_quarter', 'last_year'];
if (!VALID_PERIODS.includes(period)) throw new Error('Invalid period');
```

**6. CORS Configuration:**
```typescript
// next.config.js
module.exports = {
  async headers() {
    return [{
      source: '/api/:path*',
      headers: [
        { key: 'Access-Control-Allow-Origin', value: 'https://saimor.world' },
        { key: 'Access-Control-Allow-Methods', value: 'POST, GET' },
        { key: 'Access-Control-Allow-Headers', value: 'Authorization, Content-Type' }
      ]
    }];
  }
};
```

**7. Content Security Policy:**
```typescript
// middleware.ts (bereits vorhanden, prüfen!)
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.matomo.cloud;
  style-src 'self' 'unsafe-inline';
  img-src 'self' https://images.unsplash.com data: blob:;
  connect-src 'self' https://api.saimor.world https://n8n.saimor.world;
  frame-ancestors 'none';
`;
```

**8. XSS Prevention:**
```typescript
// Sanitize User Input
import DOMPurify from 'isomorphic-dompurify';

const sanitizedName = DOMPurify.sanitize(userInput.name);
```

**9. Rate Limiting (API):**
```typescript
// Warteliste-API
const RATE_LIMIT = 5; // Max 5 Signups pro Stunde
const rateLimit = new Map<string, number[]>();

// Check rate limit per email
if (signupsInLastHour >= RATE_LIMIT) {
  return res.status(429).json({ error: 'Rate limit exceeded' });
}
```

**10. Secrets Management:**
```
✅ .env.local (never committed)
✅ .env.example (template only, no secrets)
✅ Vercel Environment Variables (für Production)
❌ NEVER hardcode secrets in code
❌ NEVER commit .env.local to git
```

---

## 🛡️ Security Testing Checklist (WEB-01)

- [ ] XSS: Input `<script>alert('xss')</script>` → sanitized?
- [ ] CSRF: POST ohne Token → blocked?
- [ ] Rate Limiting: 10 Signups in 1 Min → 429 Error?
- [ ] PIN Brute-Force: 100 Versuche → Timeout?
- [ ] Session Hijacking: Stolen Session-ID → no access?
- [ ] SQL Injection (falls DB): `' OR 1=1--` → blocked?
- [ ] Path Traversal: `../../etc/passwd` → blocked?
- [ ] SSL/TLS: HTTPS enforced in Production?
- [ ] Secrets Exposure: No API Keys in browser console?
- [ ] Cookie Flags: httpOnly, secure, sameSite set?

---

**READY TO GO - MIT SECURITY! 🔐💪**

