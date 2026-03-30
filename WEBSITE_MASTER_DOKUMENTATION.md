# 📚 SAIMÔR WEBSITE - MASTER DOKUMENTATION

**Version:** 1.5.0  
**Stand:** Januar 2026  
**Status:** ✅ Production-Ready  
**Live:** https://saimor.world

---

## 📋 INHALTSVERZEICHNIS

1. [Übersicht & Status](#übersicht--status)
2. [Wichtige Dateien & Struktur](#wichtige-dateien--struktur)
3. [Discovery Layer](#discovery-layer)
4. [API Routes & Endpoints](#api-routes--endpoints)
5. [Environment Variables](#environment-variables)
6. [Security & Hardening](#security--hardening)
7. [Legal & Compliance](#legal--compliance)
8. [Platzhalter & TODOs](#platzhalter--todos)
9. [Zukünftige Features](#zukünftige-features)
10. [Deployment & Monitoring](#deployment--monitoring)
11. [Troubleshooting](#troubleshooting)

---

## 🎯 ÜBERSICHT & STATUS

### **Was ist diese Website?**
- **Name:** Saimôr – Klarheit im Wandel
- **Typ:** Mehrsprachige (DE/EN) One-Page Website mit Next.js 14
- **Zweck:** Präsentation von Saimôr Services, Môra AI, Early Access Programm
- **Zielgruppe:** Kommunen, Unternehmen, Menschen im Wandel

### **Technologie-Stack**
- **Framework:** Next.js 14.2.7 (App Router, TypeScript)
- **Styling:** TailwindCSS 3.4.10
- **Animations:** Framer Motion 11.3.24
- **Auth:** NextAuth 4.24.11
- **Analytics:** Matomo (Privacy-first)
- **Error Tracking:** Sentry
- **Deployment:** Vercel
- **PWA:** Service Worker, Offline Support

### **Aktueller Status**
- ✅ **Production-Ready:** Website läuft auf saimor.world
- ✅ **Security Hardened:** CSP, HSTS, XSS Protection
- ✅ **SEO Optimiert:** Sitemap, Robots, Meta Tags
- ✅ **Accessibility:** WCAG-konform, ARIA Labels
- ✅ **Performance:** Lighthouse Score >90
- ✅ **PWA:** Offline Support, Service Worker
- ✅ **Analytics:** Matomo Event Tracking
- ✅ **Error Tracking:** Sentry Integration

---

## 📁 WICHTIGE DATEIEN & STRUKTUR

### **Root-Verzeichnis**
```
saimor-live/
├── app/                    # Next.js App Router
│   ├── de/                 # Deutsche Version
│   ├── en/                 # Englische Version
│   ├── api/                # API Routes
│   ├── mora/               # Môra Dashboard Page
│   └── layout.tsx          # Root Layout (Sentry Trace Data)
├── components/             # React Components (78 Files)
├── lib/                    # Utility Libraries
├── public/                 # Static Assets
├── middleware.ts           # Security Headers & i18n
├── next.config.js          # Next.js Configuration
├── sentry.*.config.ts      # Sentry Configuration (Client/Server/Edge)
└── package.json            # Dependencies
```

### **Wichtige Dateien**

#### **Konfiguration**
- `next.config.js` - Next.js Config, Sentry Integration, Image Optimization
- `middleware.ts` - Security Headers, CSP, HSTS, i18n Routing
- `sentry.client.config.ts` - Sentry Client Config (Error Filtering)
- `sentry.server.config.ts` - Sentry Server Config
- `sentry.edge.config.ts` - Sentry Edge Config
- `tailwind.config.ts` - TailwindCSS Configuration
- `tsconfig.json` - TypeScript Configuration

#### **Components (Auszug wichtiger)**
- `app/layout.tsx` - Root Layout mit Sentry Trace Data
- `components/MoraDashboard.tsx` - Môra Dashboard (Real-time API Integration)
- `components/EasterEggs.tsx` - Achievement System
- `components/CookieBanner.tsx` - DSGVO Cookie Consent
- `components/MatomoTracker.tsx` - Analytics Integration
- `components/PWARegistration.tsx` - Service Worker Registration
- `components/ErrorBoundary.tsx` - React Error Boundary

#### **Libraries**
- `lib/achievements.ts` - Discovery Log / Achievement Definitionen (16 Einträge)
- `lib/matomo.ts` - Matomo Analytics Helper
- `lib/analytics.ts` - Sentry Analytics Helper
- `lib/pwa.ts` - PWA Utilities
- `lib/auth.ts` - Authentication Helpers

#### **Public Assets**
- `public/sw.js` - Service Worker (Offline Support)
- `public/manifest.json` - PWA Manifest
- `public/offline.html` - Offline Fallback Page
- `public/saimor-logo-new.png` - Logo (192x192, 512x512)

---

## DISCOVERY LAYER

### **Kuratiertes Discovery-Set**

Das System ist technisch weiter ein Achievement-System, wird sprachlich und visuell aber als Discovery-Log geführt.

#### **Öffentliche Einträge (Secret: false)**
1. **Override** (`konami`) - Konami-Code aktiviert die Resonanzschicht
2. **Semantic Layer** (`mora-explorer`) - Môra geöffnet
3. **Command Access** (`curiosity-driven`) - Command Palette genutzt
4. **Open Channel** (`first-contact`) - Kontaktformular abgeschickt
5. **Live Preview** (`demo-explorer`) - Demo-Seite besucht

#### **Verborgene Einträge (Secret: true)**
- **Mark Study** (`quad_logo`) - Logo 4x geklickt
- **Stillness** (`silent-observer`) - 12s in der Hero-Section verweilt
- **Orientation** (`clarity-navigator`) - Home, Trust und Legal besucht
- **Signal Phrase** (`secret-klarheit`) - `klarheit` getippt
- **Archive Access** (`secret-menu`) - `AAA` getippt
- **Full Pass** (`scroll-champion`) - 95% gescrollt
- **Multi-View** (`field-explorer`) - 3 Dashboard-Views ausprobiert
- **Re-entry** (`return-visitor`) - wiederkehrender Besuch
- **Detail Layer** (`deep-diver`) - tiefe Môra-Ansicht geöffnet
- **Pattern Map** (`pattern-recognizer`) - mehrere Dashboard-Karten erkundet
- **Reference Check** (`documentation-reader`) - Dokumentation gelesen

### **Prinzip**
- Weniger Gamification, mehr Discovery-Log
- Neutralere, systemischere Begriffe statt Trophy-Ton
- Fokus auf Aufmerksamkeit, Produkt-Erkundung und bewusste Interaktion
- Konami ist ein echter temporärer Modus mit HUD und globalen Akzenten

### **Storage**
- Discovery-Einträge werden in `localStorage` gespeichert (Key: `saimor-achievements`)
- Persistenz über Sessions hinweg
- Reset-Funktion vorhanden

### **Tracking**
- Alle Discovery-Unlocks werden zu Matomo gesendet
- Event Category: `Achievements`
- Event Action: `Unlock`

---

## 🔌 API ROUTES & ENDPOINTS

### **Public APIs**

#### **`/api/contact`** - Kontaktformular
- **Method:** POST
- **Body:** `{ name, email, message }`
- **Response:** `{ success: boolean, message: string }`
- **Features:** SMTP Email, Sentry Error Tracking
- **Rate Limit:** Keine (aber SMTP konfiguriert)

#### **`/api/waitlist`** - Warteliste
- **Method:** POST
- **Body:** `{ email, name, interests: string[] }`
- **Response:** `{ success: boolean, position: number }`
- **Features:** n8n Webhook Integration (optional)
- **Fallback:** Vercel Logs wenn n8n nicht verfügbar

#### **`/api/mora`** - Môra Chat API
- **Method:** POST
- **Body:** `{ message, conversationId, sessionId }`
- **Response:** `{ reply: string, error?: boolean }`
- **Features:** Backend API Integration, Rate Limiting

#### **`/api/test-sentry`** - Sentry Test Endpoint
- **Method:** GET
- **Query:** `?type=error|message`
- **Response:** `{ success: boolean, sentry: { dsn, dsnPublic, ... } }`
- **Zweck:** Sentry Integration testen

#### **`/api/debug-env`** - Environment Variables Debug
- **Method:** GET
- **Response:** `{ success: boolean, environment: { ... }, allEnvKeys: string[] }`
- **Zweck:** Debug Environment Variables

### **Protected APIs (Dashboard)**

#### **`/api/dashboard/overview`** - Dashboard Overview
- **Method:** GET
- **Auth:** Bearer Token (optional, Fallback zu Demo-Daten)
- **Response:** `{ today: {...}, week: {...}, month: {...} }`
- **Features:** Real-time Data Fetching (30s Polling), Demo Fallback

#### **`/api/dashboard/status`** - System Status
- **Method:** GET
- **Auth:** Bearer Token
- **Response:** `{ status, health, uptime, services: {...} }`

#### **`/api/dashboard/costs`** - Kosten Tracking
- **Method:** GET
- **Auth:** Bearer Token
- **Response:** `{ today, week, month, currency }`

#### **`/api/dashboard/activity`** - Recent Activity
- **Method:** GET
- **Auth:** Bearer Token
- **Response:** `{ activities: [...] }`

### **Webhooks**

#### **`/api/webhook/n8n`** - n8n Webhook Receiver
- **Method:** POST
- **Body:** `{ event, data }`
- **Zweck:** Webhook Events von n8n empfangen

---

## 🔐 ENVIRONMENT VARIABLES

### **Kritisch (Muss gesetzt sein)**

#### **Sentry (Error Tracking)**
```bash
NEXT_PUBLIC_SENTRY_DSN=https://xxx@o4510719412273152.ingest.de.sentry.io/xxx
SENTRY_DSN=https://xxx@o4510719412273152.ingest.de.sentry.io/xxx
SENTRY_ENVIRONMENT=production  # Muss für Production gesetzt sein!
NEXT_PUBLIC_SENTRY_ENVIRONMENT=production  # Muss für Production gesetzt sein!
```

#### **NextAuth (Authentication)**
```bash
NEXTAUTH_URL=https://saimor.world  # Ohne trailing slash!
NEXTAUTH_SECRET=<generate-with-openssl-rand-base64-32>  # Mindestens 32 Zeichen!
```

### **Optional (Features)**

#### **SMTP (Email)**
```bash
SMTP_HOST=smtp.strato.de
SMTP_PORT=587
SMTP_USER=<username>
SMTP_PASS=<password>
SMTP_FROM="Saimor <no-reply@saimor.world>"
SMTP_SECURE=false  # true für Port 465, false für Port 587
```

#### **Cal.com (Booking)**
```bash
NEXT_PUBLIC_CAL_URL=https://cal.com/saimor/30min
```

#### **Matomo (Analytics)**
```bash
NEXT_PUBLIC_MATOMO_URL=https://saimorworld.matomo.cloud
NEXT_PUBLIC_MATOMO_SITE_ID=1
```

#### **Backend APIs**
```bash
BACKEND_BASE_URL=https://voice.saimor.world  # Für Dashboard API
N8N_WAITLIST_WEBHOOK_URL=https://n8n.voice.saimor.world/webhook/waitlist
```

### **Vercel-spezifisch (Automatisch gesetzt)**
- `VERCEL` - "1" in Vercel
- `VERCEL_ENV` - "production" | "preview" | "development"
- `VERCEL_URL` - Deployment URL

### **⚠️ WICHTIGE HINWEISE**
1. **NEXT_PUBLIC_*** Variablen werden zur Build-Zeit eingebunden - müssen beim Build vorhanden sein!
2. **Redeploy nötig** wenn Environment Variables geändert werden
3. **SENTRY_ENVIRONMENT** muss für Production gesetzt sein (sonst "missing")
4. **NEXTAUTH_SECRET** sollte regelmäßig rotiert werden (Security Best Practice)

---

## 🔒 SECURITY & HARDENING

### **Security Headers (middleware.ts)**

#### **Content Security Policy (CSP)**
- `default-src 'self'`
- `script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.matomo.cloud https://js.hcaptcha.com`
- `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`
- `img-src 'self' data: https: blob:`
- `connect-src 'self' https://*.sentry.io https://api.sentry.io`

#### **XSS Protection**
- `X-XSS-Protection: 1; mode=block`
- `X-Content-Type-Options: nosniff`

#### **Frame Protection**
- `X-Frame-Options: DENY`
- `frame-ancestors 'none'`

#### **HSTS (HTTP Strict Transport Security)**
- `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
- Nur auf HTTPS aktiv

#### **Referrer Policy**
- `Referrer-Policy: strict-origin-when-cross-origin`

#### **Permissions Policy**
- `camera=(), microphone=(), geolocation=(), interest-cohort=()`

### **Sentry Error Filtering**

#### **Ignored Errors (ignoreErrors)**
- Browser Extension Errors
- Network Errors (user-side)
- ResizeObserver Loop Errors
- Service Worker Errors (non-critical)

#### **beforeSend Filter**
- Filtert Browser Extension Errors
- Filtert Service Worker Errors
- Entwickelt Mode: Events nicht senden (außer DEBUG Flag)

### **Rate Limiting**
- **Contact Form:** Kein explizites Rate Limit (aber SMTP Rate Limits)
- **Waitlist:** Kein explizites Rate Limit
- **Môra Chat:** Backend Rate Limiting

### **Input Validation**
- Contact Form: Zod Schema Validation
- Email Validation
- XSS Prevention (Next.js automatisch)

### **Authentication**
- NextAuth mit JWT
- Secure Cookies (httpOnly, secure in production)
- CSRF Protection (NextAuth automatisch)

---

## ⚖️ LEGAL & COMPLIANCE

### **DSGVO-Konformität**

#### **Cookie Banner**
- **Component:** `components/CookieBanner.tsx`
- **Features:**
  - Opt-in für Analytics (Matomo)
  - Opt-out jederzeit möglich
  - Speichert Consent in localStorage
  - Respektiert DNT (Do Not Track)

#### **Matomo Konfiguration**
- **disableCookies:** true (keine Tracking-Cookies)
- **anonymizeIp:** true (IP-Adressen anonymisiert)
- **setDoNotTrack:** true (respektiert DNT)
- **Cookie Consent Integration:** Matomo lädt nur nach Consent

#### **Privacy Policy**
- **DE:** `/de/rechtliches/datenschutz`
- **EN:** `/en/legal/privacy`
- **Content:** DSGVO-konforme Datenschutzerklärung

#### **Imprint**
- **DE:** `/de/rechtliches/impressum`
- **EN:** `/en/legal/imprint`
- **Content:** Impressum nach deutschem Recht

### **Robots & Sitemap**
- **robots.ts:** Dynamic Robots.txt Generation
- **sitemap.ts:** Dynamic Sitemap Generation
- **Allow:** Alle Seiten (außer auth/private)
- **Disallow:** `/api/*` (außer SEO-relevanten)

### **Analytics Opt-Out**
- User kann Tracking jederzeit widerrufen
- Matomo Opt-out Cookie Support
- DNT Header wird respektiert

---

## 📝 PLATZHALTER & TODOs

### **Platzhalter in Code**

#### **Hardcoded Email Adressen**
- `app/api/contact/route.ts` - `'contact@saimor.world'` (hardcoded)
- **TODO:** Sollte `SMTP_TO` Environment Variable verwenden

#### **Demo-Daten**
- `lib/demoMetrics.ts` - Demo Metrics für Dashboard
- **Status:** Wird verwendet wenn Backend API nicht verfügbar
- **TODO:** Kann entfernt werden wenn Backend 100% verfügbar

#### **Placeholder URLs**
- `N8N_WAITLIST_WEBHOOK_URL` - Muss noch konfiguriert werden
- **Status:** Optional, Fallback zu Vercel Logs

### **TODOs in Code**

#### **FRONTEND_TODO.md** (Siehe dort für Details)
- Liquid Glass Effects auf restlichen Sections
- `/systems` Page entfernen oder umleiten
- Dashboard Login Integration vorbereiten
- Môra Intelligence Layer (echte AI, nicht Demo)

#### **Known Issues**
- NextAuth 500 Error (wenn NEXTAUTH_SECRET fehlt) - **GELÖST**
- n8n Webhook nicht verbunden - **OPTIONAL**
- ESLint Warnings (non-critical) - **KANN IGNORIERT WERDEN**

---

## 🚀 ZUKÜNFTIGE FEATURES

### **Geplant (hohe Priorität)**

#### **1. Dashboard Login Integration**
- **Status:** Vorbereitet, nicht implementiert
- **Features:**
  - Shared Auth zwischen Website & Dashboard
  - Protected Routes (`/dashboard/*`)
  - User Context Provider
  - Login Flow UI (Modal oder separate Page)

#### **2. Môra Intelligence Layer**
- **Status:** Demo-Modus aktiv, echte AI geplant
- **Features:**
  - Dashboard API Integration (voice.saimor.world)
  - Real-time KPI Updates
  - Chat mit echter Claude AI
  - User-spezifische Daten

#### **3. Liquid Glass Polish**
- **Status:** Teilweise implementiert (MoraShowcase, TrustProof)
- **TODO:**
  - CommunityBanner - Backdrop blur verbessern
  - WaitlistForm - Form inputs mit glass effect
  - FAQ - Accordion items mit glass

#### **4. `/systems` Page Cleanup**
- **Status:** Page existiert noch, Services.tsx hat Systems entfernt
- **Optionen:**
  - A) Delete `app/systems/page.tsx` komplett
  - B) Redirect zu Môra Showcase
  - C) Umbauen zu "Môra Dashboard" Demo-Page

### **Geplant (mittlere Priorität)**

#### **5. Better Uptime Integration**
- **Status:** Setup-Guide vorhanden, nicht integriert
- **Features:**
  - Website Monitoring
  - Uptime Badges
  - Status Page Integration

#### **6. PWA Verbesserungen**
- **Status:** Basis-PWA implementiert
- **TODO:**
  - Push Notifications
  - App Icon Updates
  - Install Prompt Optimierung

#### **7. Performance Optimierungen**
- **Status:** Lighthouse Score >90
- **TODO:**
  - Code Splitting verbessern
  - Image Optimization weiter optimieren
  - Bundle Size reduzieren

---

## 📊 DEPLOYMENT & MONITORING

### **Vercel Deployment**

#### **Automatisches Deployment**
- **Trigger:** Push auf `main` Branch
- **Build Command:** `pnpm build` (oder `npm run build`)
- **Output Directory:** `.next`
- **Install Command:** `pnpm install` (oder `npm install`)

#### **Environment Variables**
- In Vercel Dashboard → Settings → Environment Variables setzen
- **Wichtig:** NEXT_PUBLIC_* Variablen müssen beim Build vorhanden sein!
- **Redeploy nötig:** Nach Änderung von Environment Variables

#### **Domain**
- **Production:** https://saimor.world
- **Preview:** Automatische Preview-URLs für Pull Requests
- **Development:** Localhost:3000

### **Monitoring**

#### **Sentry (Error Tracking)**
- **Dashboard:** https://sentry.io/organizations/saimor/projects/javascript-nextjs/
- **Features:**
  - Real-time Error Tracking
  - Performance Monitoring
  - Session Replay (10% Sample Rate)
  - Source Maps (für bessere Stack Traces)

#### **Matomo (Analytics)**
- **Dashboard:** https://saimorworld.matomo.cloud
- **Features:**
  - Page Views
  - Event Tracking (Achievements, CTAs, Forms)
  - User Journeys
  - Conversion Tracking

#### **Better Uptime (Optional)**
- **Status:** Setup-Guide vorhanden (`docs/BETTER_UPTIME_SETUP.md`)
- **Features:**
  - Website Monitoring
  - Uptime Tracking
  - Alert Notifications

### **Build & Deployment Status**
- **Build Time:** ~2-3 Minuten (Vercel)
- **Deployment Time:** ~1-2 Minuten (nach Build)
- **Cache:** Vercel Build Cache aktiviert
- **Rollback:** Verfügbar in Vercel Dashboard

---

## 🐛 TROUBLESHOOTING

### **Häufige Probleme**

#### **1. Sentry DSN "missing"**
**Problem:** Environment Variables nicht beim Build verfügbar  
**Lösung:**
1. Prüfe: `NEXT_PUBLIC_SENTRY_DSN` für Production gesetzt?
2. Redeploy OHNE Build Cache in Vercel
3. Teste: `/api/debug-env` Endpoint

#### **2. Service Worker Errors in Sentry**
**Problem:** Service Worker Update Fehler  
**Status:** **IGNORIERT** - Diese Fehler sind non-critical und werden automatisch gefiltert

#### **3. NextAuth 500 Error**
**Problem:** `NEXTAUTH_SECRET` fehlt  
**Lösung:**
1. Generiere Secret: `openssl rand -base64 32`
2. Setze in Vercel: `NEXTAUTH_SECRET=<generated-secret>`
3. Redeploy

#### **4. SMTP Email funktioniert nicht**
**Problem:** SMTP nicht konfiguriert  
**Lösung:**
1. Prüfe: SMTP Environment Variables gesetzt?
2. Prüfe: `SMTP_SECURE` korrekt (true für Port 465, false für Port 587)?
3. Teste: Contact Form senden

#### **5. Environment Variables nicht verfügbar**
**Problem:** NEXT_PUBLIC_* Variablen zur Build-Zeit nicht vorhanden  
**Lösung:**
1. Prüfe: Variablen für Production gesetzt?
2. Redeploy OHNE Build Cache
3. Prüfe Build-Logs in Vercel

---

## 📞 SUPPORT & KONTAKT

### **Technischer Support**
- **GitHub Issues:** https://github.com/Saimor-world/Website/issues
- **Email:** hi@saimor.world

### **Dokumentation**
- **Main README:** `README.md`
- **Deployment Guide:** `DEPLOY.md`
- **Setup Guides:** `docs/` Ordner
- **Environment Variables:** `ENV_VARIABLES_AUDIT.md`

---

## ✅ CHECKLISTE FÜR FREEZE

### **Vor Freeze zu prüfen:**

- [ ] Alle Environment Variables gesetzt (Production)
- [ ] Sentry funktioniert (Test-Endpoint)
- [ ] Matomo Tracking funktioniert
- [ ] Contact Form funktioniert (SMTP)
- [ ] Waitlist funktioniert
- [ ] Alle Links funktionieren
- [ ] Legal Pages (DSGVO, Impressum) vorhanden
- [ ] Robots.txt & Sitemap generiert
- [ ] PWA Manifest korrekt
- [ ] Service Worker funktioniert
- [ ] Mobile Responsive
- [ ] Accessibility (WCAG)
- [ ] Performance (Lighthouse >90)
- [ ] Security Headers aktiv
- [ ] Error Tracking aktiv

### **Nach Freeze:**
- ✅ Website ist production-ready
- ✅ Alle Features funktionieren
- ✅ Monitoring aktiv
- ✅ Dokumentation vollständig

---

**📌 Diese Dokumentation ist die zentrale Quelle für alle wichtigen Informationen über die Saimôr Website. Bei Fragen oder Änderungen: Diese Datei aktualisieren!**

---

**Letzte Aktualisierung:** Januar 2026  
**Version:** 1.5.0  
**Status:** ✅ Production-Ready

