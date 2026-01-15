# 🔒 Sentry Error Tracking - Setup Guide

## ✅ **Installation abgeschlossen!**

Sentry wurde erfolgreich integriert. Die Konfiguration ist vollständig.

---

## 🚀 **Aktivierung:**

### **1. Sentry Account erstellen (kostenlos)**
1. Gehe zu https://sentry.io/signup/
2. Erstelle einen Account (kostenlos für bis zu 5.000 Events/Monat)
3. Erstelle ein neues Projekt: **Next.js**

### **2. DSN (Data Source Name) kopieren**
Nach Projekt-Erstellung bekommst du einen DSN wie:
```
https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
```

### **3. Environment Variables in Vercel setzen**
Im Vercel Dashboard → Project Settings → Environment Variables:

**Für Production:**
```
NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
NEXT_PUBLIC_SENTRY_ENVIRONMENT=production
SENTRY_ENVIRONMENT=production
```

**Optional (für Sentry Webpack Plugin):**
```
SENTRY_ORG=deine-org
SENTRY_PROJECT=dein-projekt
SENTRY_AUTH_TOKEN=dein-token (für Source Maps Upload)
```

### **4. Redeploy**
Nach dem Setzen der Environment Variables:
- Vercel wird automatisch neu deployen
- Oder: Manuell in Vercel Dashboard → Deployments → Redeploy

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

