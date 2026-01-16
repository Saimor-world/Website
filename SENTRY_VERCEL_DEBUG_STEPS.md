# 🔍 Sentry DSN "missing" - Debug Steps

## ❌ **Problem:**
DSNs sind immer noch "missing" auch nach neuem Build.

---

## 🎯 **Mögliche Ursachen:**

### **1. Environment Variables nicht für Production gesetzt**
- DSNs sind nur für Preview/Development gesetzt
- Aber Production läuft ohne DSNs

### **2. Vercel Build Cache**
- Vercel cached alte Builds
- Environment Variables werden nicht neu geladen

### **3. NEXT_PUBLIC_* zur Build-Zeit**
- `NEXT_PUBLIC_SENTRY_DSN` wird beim Build eingebunden
- Wenn beim Build nicht vorhanden → `undefined` im Code

### **4. Vercel Environment Variable Sync**
- Manchmal müssen Environment Variables explizit gesynct werden
- Neue Variablen werden nicht automatisch geladen

---

## ✅ **Debug Steps:**

### **Step 1: Prüfe Debug-Endpoint**
```
https://saimor.world/api/debug-env
```

**Was zeigt es?**
- Sind `SENTRY_DSN` oder `NEXT_PUBLIC_SENTRY_DSN` sichtbar?
- Welche Environment Keys sind vorhanden?

---

### **Step 2: Prüfe Vercel Environment Variables**

**In Vercel Dashboard:**
1. **Settings → Environment Variables**
2. **Für `NEXT_PUBLIC_SENTRY_DSN`:**
   - [ ] Ist es für **Production** gesetzt? (nicht nur Preview!)
   - [ ] Value beginnt mit `https://`?
   - [ ] Keine Leerzeichen?

3. **Für `SENTRY_DSN`:**
   - [ ] Gleicher Value wie `NEXT_PUBLIC_SENTRY_DSN`?
   - [ ] Für **Production** gesetzt?

---

### **Step 3: Vercel Redeploy OHNE Cache**

**Wichtig:** Build Cache muss deaktiviert werden!

**Option A - Vercel Dashboard:**
1. **Deployments → Letztes Deployment**
2. **"..." → "Redeploy"**
3. **"Use existing Build Cache" = ❌ NEIN**
4. **"Redeploy"**

**Option B - Vercel CLI:**
```bash
vercel --prod --force
```

**Option C - Empty Commit (aber mit Build Cache Clearing):**
```bash
git commit --allow-empty -m "Force rebuild without cache"
git push
```
→ Dann in Vercel: Redeploy OHNE Cache

---

### **Step 4: Prüfe Build-Logs**

**Nach Redeploy:**
1. **Vercel → Deployments → Neuester Deployment**
2. **"Build Logs" öffnen**
3. **Suche nach:**
   - `NEXT_PUBLIC_SENTRY_DSN`
   - `SENTRY_DSN`
   - `Environment variables`

**Erwartet:**
- DSN sollte in Build-Logs sichtbar sein (nicht `undefined`)

---

### **Step 5: Prüfe Runtime Environment**

**Test-Endpoint nach Deployment:**
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
  }
}
```

---

## ⚠️ **Häufige Fehler:**

### **Fehler 1: Nur Preview/Development gesetzt**
- **Problem:** DSN ist nur für Preview gesetzt
- **Fix:** Auch für **Production** setzen!

### **Fehler 2: Build Cache aktiviert**
- **Problem:** Vercel nutzt alten Build (ohne DSN)
- **Fix:** Redeploy **OHNE** Build Cache!

### **Fehler 3: Leerzeichen in Value**
- **Problem:** `https://... ` (Leerzeichen am Ende)
- **Fix:** Value nochmal kopieren (ohne Leerzeichen)

### **Fehler 4: Environment Variable erst nach Build gesetzt**
- **Problem:** DSN wurde nach Build gesetzt
- **Fix:** **NEUER Build nötig** (mit DSN bereits vorhanden)

---

## 🚀 **Final Solution:**

1. ✅ **Prüfe:** DSNs für Production gesetzt? (nicht nur Preview!)
2. ✅ **Redeploy:** OHNE Build Cache
3. ✅ **Warte:** 2-3 Minuten
4. ✅ **Teste:** `/api/debug-env` Endpoint
5. ✅ **Prüfe:** Build-Logs (DSN sichtbar?)

---

## 💡 **Wenn es immer noch nicht funktioniert:**

**Fallback: Hardcode für Testing (nur kurz!)**

1. **Temporär in `next.config.js`:**
   ```javascript
   env: {
     NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN || 'https://0287484514575ed20ba4b22bf03512fa@o4510719412273152.ingest.de.sentry.io/4510719418433',
   },
   ```

2. **Testen ob es funktioniert**
3. **Dann wieder entfernen und Environment Variable fixen**

---

**Nach Debug-Endpoint Test sehen wir weiter! 🔍**

