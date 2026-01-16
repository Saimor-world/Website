# 🔍 Environment Variables Audit

**Datum:** $(date)  
**Status:** ✅ **Analyse abgeschlossen**

---

## ⚠️ **KRITISCH - Muss sofort gefixt werden:**

### 1. **SENTRY_ENVIRONMENT** ❌
- **Aktuell:** Nur Preview & Development
- **Sollte sein:** ✅ Production, Preview, Development (alle 3!)
- **Warum:** Sentry braucht Environment-Info auch in Production
- **Fix:** In Vercel → Environment Variables → `SENTRY_ENVIRONMENT` → Environment: ✅ Production hinzufügen

### 2. **NEXT_PUBLIC_SENTRY_ENVIRONMENT** ❌
- **Aktuell:** Nur Preview & Development
- **Sollte sein:** ✅ Production, Preview, Development (alle 3!)
- **Warum:** Client-Side Sentry braucht Environment-Info auch in Production
- **Fix:** In Vercel → Environment Variables → `NEXT_PUBLIC_SENTRY_ENVIRONMENT` → Environment: ✅ Production hinzufügen

---

## ✅ **KORREKT - Alles gut:**

### Sentry:
- ✅ `NEXT_PUBLIC_SENTRY_DSN` - Alle Environments (Production, Preview, Development)
- ✅ `SENTRY_DSN` - Alle Environments (Production, Preview, Development)

### Matomo:
- ✅ `NEXT_PUBLIC_MATOMO_URL` - Wird verwendet, sollte OK sein
- ✅ `NEXT_PUBLIC_MATOMO_SITE_ID` - Wird verwendet, sollte OK sein

### SMTP (Email):
- ✅ `SMTP_HOST` - Wird verwendet
- ✅ `SMTP_PORT` - Wird verwendet
- ✅ `SMTP_USER` - Wird verwendet
- ✅ `SMTP_PASS` - Wird verwendet
- ✅ `SMTP_FROM` - Wird verwendet

### Cal.com:
- ✅ `NEXT_PUBLIC_CAL_URL` - Wird verwendet

---

## ⚠️ **MUSS GEPRÜFT WERDEN:**

### 1. **BACKEND_BASE_URL** ⚠️
- **Wird verwendet in:**
  - `app/api/chat/route.ts` (Zeile 251)
  - `app/api/mora/route.ts` (Zeile 16)
- **Sollte sein:** `https://api.saimor.world` (oder deine Backend-URL)
- **Prüfen:** Ist die URL korrekt? Funktioniert das Backend?
- **Letzte Änderung:** 11/8/25 (vor ~2 Monaten)

### 2. **NEXTAUTH_URL** ⚠️
- **Wird verwendet für:** NextAuth Authentication
- **Sollte sein:** `https://saimor.world` (deine Production-Domain)
- **Prüfen:** Ist die URL korrekt? Kein trailing slash!
- **Letzte Änderung:** 10/29/25 (vor ~2 Monaten)

### 3. **NEXTAUTH_SECRET** ⚠️
- **Wird verwendet für:** NextAuth Token-Signing
- **Sollte sein:** Mindestens 32 Zeichen, zufälliger String
- **Prüfen:** Ist der Secret stark genug? Nicht leer?
- **Letzte Änderung:** 10/29/25 (vor ~2 Monaten)
- **⚠️ WICHTIG:** Falls Secret schwach ist, neu generieren!

---

## ❌ **VERALTET / NICHT VERWENDET:**

### 1. **SMTP_TO** ❌
- **Status:** Wird NICHT verwendet!
- **Grund:** In `app/api/contact/route.ts` ist hardcoded `'contact@saimor.world'`
- **Empfehlung:** 
  - **Option A:** Variable löschen (wenn hardcoded OK ist)
  - **Option B:** Code anpassen um `SMTP_TO` zu verwenden (besser für Flexibilität)

---

## 🔍 **FEHLT MÖGLICHERWEISE:**

### 1. **SMTP_SECURE** ❓
- **Wird verwendet in:** `app/api/contact/route.ts` (Zeile 49)
- **Code:** `process.env.SMTP_SECURE === 'true'`
- **Status:** Nicht in deiner Liste!
- **Empfehlung:** 
  - **Wenn Port 465:** `SMTP_SECURE=true`
  - **Wenn Port 587:** `SMTP_SECURE=false` (oder Variable weglassen)
- **Standard:** `false` (wenn nicht gesetzt)

---

## 📋 **ZUSAMMENFASSUNG:**

### **Sofort fixen (2 Min):**
1. ✅ `SENTRY_ENVIRONMENT` → Production hinzufügen
2. ✅ `NEXT_PUBLIC_SENTRY_ENVIRONMENT` → Production hinzufügen

### **Prüfen (5 Min):**
1. ⚠️ `BACKEND_BASE_URL` - Ist URL korrekt? Backend läuft?
2. ⚠️ `NEXTAUTH_URL` - Ist `https://saimor.world` korrekt?
3. ⚠️ `NEXTAUTH_SECRET` - Ist Secret stark genug? Mindestens 32 Zeichen?

### **Optional (später):**
1. ❌ `SMTP_TO` - Löschen oder Code anpassen
2. ❓ `SMTP_SECURE` - Hinzufügen falls Port 465 verwendet wird

---

## 🚀 **SCHNELLFIX (Copy & Paste):**

### In Vercel → Environment Variables:

**1. SENTRY_ENVIRONMENT:**
- Klicke auf Variable
- Unter "Environment" → ✅ Production hinzufügen
- Save

**2. NEXT_PUBLIC_SENTRY_ENVIRONMENT:**
- Klicke auf Variable
- Unter "Environment" → ✅ Production hinzufügen
- Save

**3. NEXTAUTH_SECRET prüfen:**
- Öffne Variable
- Prüfe: Ist Value mindestens 32 Zeichen lang?
- Falls nicht: Neu generieren mit `openssl rand -base64 32`

**4. BACKEND_BASE_URL prüfen:**
- Öffne Variable
- Prüfe: Ist Value `https://api.saimor.world` (oder korrekte URL)?
- Teste: Öffne URL im Browser → sollte funktionieren

**5. NEXTAUTH_URL prüfen:**
- Öffne Variable
- Prüfe: Ist Value `https://saimor.world` (ohne trailing slash)?
- Falls nicht: Korrigieren

---

## ✅ **CHECKLISTE:**

- [ ] `SENTRY_ENVIRONMENT` → Production hinzugefügt
- [ ] `NEXT_PUBLIC_SENTRY_ENVIRONMENT` → Production hinzugefügt
- [ ] `BACKEND_BASE_URL` geprüft (URL korrekt?)
- [ ] `NEXTAUTH_URL` geprüft (`https://saimor.world`?)
- [ ] `NEXTAUTH_SECRET` geprüft (mindestens 32 Zeichen?)
- [ ] `SMTP_TO` gelöscht (optional, wenn nicht verwendet)
- [ ] `SMTP_SECURE` hinzugefügt (optional, wenn Port 465)

---

## 🎯 **PRIORITÄTEN:**

1. **🔴 HOCH:** Sentry Environment Variables fixen (2 Min)
2. **🟡 MITTEL:** NextAuth & Backend URLs prüfen (5 Min)
3. **🟢 NIEDRIG:** SMTP_TO löschen/anpassen (optional)

---

**Nach dem Fix: Redeploy in Vercel!**

