# 🔒 Sentry Error Tracking - Setup Guide

## ✅ **Installation abgeschlossen!**

Sentry wurde erfolgreich integriert. Die Konfiguration ist vollständig. **Jetzt nur noch DSN setzen!**

---

## 🚀 **Schritt-für-Schritt Aktivierung (5 Minuten):**

### **SCHRITT 1: Sentry Account erstellen**

1. **Gehe zu:** https://sentry.io/signup/
2. **Wähle Sign-up Option:**
   - Mit GitHub Account (empfohlen) ODER
   - Mit Email & Password
3. **Erstelle Organisation:**
   - Name: z.B. `saimor` oder `saimor-world`
   - Region: **EU** (wichtig für DSGVO!)
4. **Erstelle neues Projekt:**
   - Platform: **Next.js** auswählen
   - Project Name: z.B. `saimor-website` oder `website`
   - Team: Standard Team (oder neues erstellen)

**⏱️ Dauer: 2-3 Minuten**

---

### **SCHRITT 2: DSN kopieren**

Nach der Projekt-Erstellung siehst du automatisch die **Setup Instructions**.

1. **Suche nach "DSN"** (Data Source Name)
2. **Kopiere den DSN** - sieht so aus:
   ```
   https://abc123def456@o1234567.ingest.sentry.io/1234567
   ```
3. **Wichtig:** Kopiere die **komplette URL** (beginnt mit `https://`)

**💡 Tipp:** Falls du den DSN später brauchst:
- Sentry Dashboard → Project Settings → Client Keys (DSN)

**⏱️ Dauer: 30 Sekunden**

---

### **SCHRITT 3: Environment Variables in Vercel setzen**

1. **Öffne Vercel Dashboard:**
   - Gehe zu: https://vercel.com/dashboard
   - Wähle dein Projekt: `saimor-live` (oder wie es heißt)

2. **Navigiere zu Settings:**
   - Klicke auf dein Projekt
   - Tab: **Settings** (oben in der Navigation)
   - Links: **Environment Variables** (unter "General")

3. **Füge die folgenden Variablen hinzu:**

   **a) Für Client-Side (Browser):**
   - **Key:** `NEXT_PUBLIC_SENTRY_DSN`
   - **Value:** `https://abc123def456@o1234567.ingest.sentry.io/1234567` (dein DSN)
   - **Environment:** ✅ Production ✅ Preview ✅ Development (alle ankreuzen)

   **b) Für Server-Side (API Routes):**
   - **Key:** `SENTRY_DSN`
   - **Value:** `https://abc123def456@o1234567.ingest.sentry.io/1234567` (gleicher DSN)
   - **Environment:** ✅ Production ✅ Preview ✅ Development

   **c) Environment Name (optional, aber empfohlen):**
   - **Key:** `NEXT_PUBLIC_SENTRY_ENVIRONMENT`
   - **Value:** `production`
   - **Environment:** ✅ Production

   - **Key:** `SENTRY_ENVIRONMENT`
   - **Value:** `production`
   - **Environment:** ✅ Production

4. **Für jedes Variable:**
   - Klicke auf **"Add"** oder **"Add Another"**
   - Fülle Key, Value, Environment aus
   - Klicke **"Save"**

**⏱️ Dauer: 2-3 Minuten**

---

### **SCHRITT 4: Redeploy**

Vercel erkennt automatisch neue Environment Variables:

1. **Option A - Automatisch (empfohlen):**
   - Nach dem Speichern der letzten Variable
   - Vercel startet automatisch einen neuen Deployment
   - Warte 1-2 Minuten

2. **Option B - Manuell:**
   - Vercel Dashboard → Deployments Tab
   - Klicke auf die **drei Punkte** (...) beim letzten Deployment
   - Wähle **"Redeploy"**
   - Bestätige

**⏱️ Dauer: 2-3 Minuten**

---

### **SCHRITT 5: Testen**

1. **Warte bis Deployment fertig ist:**
   - Status sollte "Ready" sein (grüner Haken)

2. **Besuche deine Website:**
   - Öffne: https://saimor.world (oder deine Domain)
   - Öffne Browser DevTools (F12) → Console Tab

3. **Sentry sollte geladen sein:**
   - Keine Errors in der Console
   - (Du wirst "Sentry Client initialized" nicht sehen - das ist normal)

4. **Test Error auslösen (optional):**
   - Gehe zu: https://saimor.world/api/test-error (falls vorhanden)
   - Oder warte auf echten Error
   - Check Sentry Dashboard → Issues Tab
   - Error sollte innerhalb von 1-2 Minuten erscheinen

**⏱️ Dauer: 2 Minuten**

---

## ✅ **Fertig! Sentry ist jetzt live!**

**Gesamt-Dauer: ~5-10 Minuten**

Nach dem Setup siehst du in Sentry:
- ✅ **Issues Tab:** Alle Errors in Echtzeit
- ✅ **Performance Tab:** API Response Times
- ✅ **Releases Tab:** Welche Git-Version welche Errors hat

---

## 📸 **Visuelle Hilfe (Vercel Dashboard Navigation):**

```
Vercel Dashboard
  └── Dein Projekt (z.B. "saimor-live")
      └── Settings (oben in Tabs)
          └── Environment Variables (links im Menü)
              └── Add New → Key + Value + Environment → Save
```

---

## 🆘 **Troubleshooting:**

### Problem: "Sentry DSN is missing"
- **Lösung:** Überprüfe, ob `NEXT_PUBLIC_SENTRY_DSN` gesetzt ist
- **Check:** Vercel → Settings → Environment Variables → Suche nach "SENTRY"

### Problem: "Sentry not sending errors"
- **Lösung:** Überprüfe, ob DSN korrekt kopiert wurde (vollständige URL)
- **Check:** DSN sollte mit `https://` beginnen und mit Zahlen enden

### Problem: "No errors in Sentry but errors in console"
- **Normal:** Development Errors werden nicht gesendet (außer `SENTRY_DEBUG=true`)
- **Check:** Fehler passiert in Production? → Warte 1-2 Minuten

### Problem: "Rate limit exceeded"
- **Normal:** Kostenloser Plan = 5.000 Events/Monat
- **Check:** Sample Rate ist auf 10% gesetzt (reicht für die meisten Fälle)

---

## 📊 **Optional: Source Maps (für bessere Stack Traces):**

**Nur wenn du detaillierte Stack Traces willst:**

1. **Sentry Dashboard → Settings → Auth Tokens**
2. **Erstelle neuen Token:**
   - Scopes: `project:releases`, `org:read`
   - Kopiere Token

3. **Vercel Environment Variables:**
   - **Key:** `SENTRY_AUTH_TOKEN`
   - **Value:** Dein Token
   - **Environment:** ✅ Production

4. **Redeploy** → Source Maps werden automatisch hochgeladen

**⏱️ Optional, dauert ~3 Minuten**

---

## 📊 **Was wird getrackt:**

### **Automatisch:**
- ✅ JavaScript Errors (Client-Side)
- ✅ Server Errors (API Routes)
- ✅ React Error Boundaries
- ✅ Unhandled Promise Rejections
- ✅ Performance Metrics (10% Sample Rate in Production)

### **Via Code:**
- ✅ API Errors (`captureApiError()`)
- ✅ Custom Messages (`captureMessage()`)
- ✅ Custom Exceptions (`captureException()`)
- ✅ Performance Tracking (`trackPerformance()`)

---

## 🔒 **Privacy & Security:**

### **Was wird NICHT getrackt:**
- ❌ Keine User IPs (anonymisiert)
- ❌ Keine Browser Extensions Errors
- ❌ Keine ResizeObserver Warnings
- ❌ Keine Health Check Endpoints
- ❌ Keine Development Errors (außer `SENTRY_DEBUG=true`)

### **Konfiguriert:**
- ✅ Session Replay nur bei Errors (10% Sample Rate)
- ✅ Alle Texte in Replays maskiert
- ✅ Alle Medien in Replays blockiert
- ✅ Privacy-First Configuration

---

## 📝 **Verwendung im Code:**

```typescript
import { captureException, captureMessage, captureApiError } from '@/lib/analytics';

// Exception tracking
try {
  // ... code ...
} catch (error) {
  captureException(error, {
    component: 'ContactForm',
    userId: user?.id,
  });
}

// API Error tracking
catch (error) {
  captureApiError('/api/contact', error, {
    method: 'POST',
    userId: user?.id,
  });
}

// Custom messages
captureMessage('User completed onboarding', 'info', {
  userId: user.id,
  steps: 5,
});
```

---

## 🎯 **Features:**

### **1. Error Boundaries**
- Automatisch im `app/layout.tsx` integriert
- Fängt alle unerwarteten React Errors ab
- Zeigt User-freundliche Error-Seite

### **2. Performance Monitoring**
- Web Vitals Tracking
- API Response Times
- Custom Metrics

### **3. Release Tracking**
- Automatisch via Vercel Git Commit SHA
- Siehst genau welche Version welchen Error hat

---

## 🔧 **Development:**

### **Sentry in Development deaktivieren:**
Sentry läuft standardmäßig **nicht** in Development, außer:
- `NEXT_PUBLIC_SENTRY_DEBUG=true` gesetzt

### **Lokales Testen:**
```bash
NEXT_PUBLIC_SENTRY_DSN=your-dsn \
NEXT_PUBLIC_SENTRY_DEBUG=true \
pnpm dev
```

---

## 📈 **Sentry Dashboard:**

Nach dem Setup siehst du:
- **Issues:** Alle Errors mit Stack Traces
- **Releases:** Welche Version hat welche Errors
- **Performance:** API Response Times, Web Vitals
- **Alerts:** Email/Slack Notifications bei neuen Errors

---

## ⚠️ **Wichtig:**

1. **Source Maps:** Optional - nur wenn du detaillierte Stack Traces willst
   - Setze `SENTRY_AUTH_TOKEN` für automatischen Upload
   - Oder lade manuell hoch

2. **Rate Limits:** Kostenloser Plan = 5.000 Events/Monat
   - Sample Rate ist auf 10% gesetzt (Production)
   - Reicht für die meisten Use Cases

3. **DSN Security:**
   - DSN ist öffentlich (ok, da nur für Client-Side)
   - Für Server-Side: Nutze `SENTRY_DSN` (nicht `NEXT_PUBLIC_`)

---

## ✅ **Status:**

- ✅ Sentry Package installiert
- ✅ Konfiguration erstellt (client, server, edge)
- ✅ Error Boundary integriert
- ✅ Analytics Helper erweitert
- ✅ API Error Tracking vorbereitet
- ⏳ DSN in Vercel setzen (du musst das machen)

**Nach DSN-Setup: Sentry ist live! 🎉**

