# 🚨 Sentry DSN - VERCEL FIX ERFORDERLICH

## ❌ **Problem gefunden:**

**Environment Variables sind NICHT beim Server-Runtime verfügbar!**

Der Debug-Endpoint zeigt:
- ❌ `SENTRY_DSN`: missing
- ❌ `NEXT_PUBLIC_SENTRY_DSN`: missing
- ❌ Keine `SENTRY_*` Keys in `allEnvKeys`

---

## ✅ **WAS DU TUN MUSST (in Vercel):**

### **1. Öffne Vercel Dashboard:**
- https://vercel.com/dashboard
- Projekt: `saimor-live` (oder dein Projektname)

---

### **2. Gehe zu Environment Variables:**
- **Settings → Environment Variables**

---

### **3. Prüfe `NEXT_PUBLIC_SENTRY_DSN`:**

**Öffne die Variable (klick drauf):**

- [ ] **Value:** Sollte sein: `https://0287484514575ed20ba4b22bf03512fa@o4510719412273152.ingest.de.sentry.io/4510719418433`
- [ ] **Environments:** **MUSS "Production" angekreuzt sein!** ✅

**Falls "Production" NICHT angekreuzt ist:**
1. **Klicke auf Variable** → Bearbeiten
2. **Scrolle zu "Environments"**
3. **Kreuze AN:** ✅ Production
4. **Kreuze AN:** ✅ Preview (optional)
5. **Kreuze AN:** ✅ Development (optional)
6. **"Save" klicken**

---

### **4. Prüfe `SENTRY_DSN`:**

**Öffne die Variable:**

- [ ] **Value:** Sollte GLEICH sein wie `NEXT_PUBLIC_SENTRY_DSN`
- [ ] **Environments:** **MUSS "Production" angekreuzt sein!** ✅

**Falls "Production" NICHT angekreuzt ist:**
1. **Klicke auf Variable** → Bearbeiten
2. **Scrolle zu "Environments"**
3. **Kreuze AN:** ✅ Production
4. **"Save" klicken**

---

### **5. WICHTIG: Nach dem Speichern:**

**Vercel sollte automatisch ein neues Deployment triggern.**

**Falls nicht:**
1. **Gehe zu:** Deployments → Latest
2. **Klicke:** "..." → "Redeploy"
3. **WICHTIG:** "Use existing Build Cache" = ❌ **NEIN**
4. **"Redeploy" klicken**

---

### **6. Warte 2-3 Minuten**

**Dann teste:**
```
https://saimor.world/api/debug-env
```

**Erwartetes Ergebnis:**
```json
{
  "environment": {
    "SENTRY_DSN": "configured (https://0287484514...)",
    "NEXT_PUBLIC_SENTRY_DSN": "configured (https://0287484514...)",
    "hasSentryDsn": true,
    "hasPublicDsn": true
  },
  "allEnvKeys": [
    ...
    "SENTRY_DSN",  // ← Sollte sichtbar sein!
    "NEXT_PUBLIC_SENTRY_DSN",  // ← Sollte sichtbar sein!
    ...
  ]
}
```

---

## 🎯 **Das Problem war:**

**Die Environment Variables waren wahrscheinlich nur für "Preview" oder "Development" gesetzt, aber NICHT für "Production"!**

Vercel lädt nur die Environment Variables, die für das jeweilige Environment (Production/Preview/Development) gesetzt sind.

---

## ✅ **Checkliste:**

- [ ] `NEXT_PUBLIC_SENTRY_DSN` für **Production** gesetzt? ✅
- [ ] `SENTRY_DSN` für **Production** gesetzt? ✅
- [ ] Beide haben den **gleichen Value**? ✅
- [ ] **Redeploy** getriggert (ohne Build Cache)? ✅
- [ ] **Debug-Endpoint** zeigt "configured"? ✅

---

## 💡 **Nach dem Fix:**

**Teste nochmal:**
```
https://saimor.world/api/test-sentry?type=message
```

**Sollte jetzt zeigen:**
```json
{
  "sentry": {
    "dsn": "configured",
    "dsnPublic": "configured",
    "debug": {
      "hasSentryDsn": true,
      "hasPublicDsn": true
    }
  }
}
```

---

**Bitte prüfe in Vercel ob "Production" angekreuzt ist! 🚀**

