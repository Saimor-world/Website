# ✅ Vercel Deployment Checklist

## 🎯 Was MUSS gecheckt werden?

### **1. Build Status (JETZT - 2 Min)**

1. **Vercel Dashboard öffnen:**
   - https://vercel.com/dashboard
   - Login mit GitHub-Account

2. **Projekt finden:**
   - Suche: "saimor" oder "website"
   - Oder direkt: https://vercel.com/[dein-username]/saimor-live

3. **Latest Deployment checken:**
   - Tab "Deployments" öffnen
   - Oberster Eintrag = neuester Build

4. **Status prüfen:**
   ```
   ✅ Ready (grün) = Alles gut!
   🟡 Building (gelb) = Warte noch
   ❌ Error (rot) = Ich helfe fixen!
   ```

5. **Falls Error:**
   - Click auf Deployment → "Build Logs" öffnen
   - Screenshot vom Error machen
   - Mir schicken → ich fixe sofort

---

### **2. Website Live Check (3 Min)**

1. **Production URL öffnen:**
   - https://saimor.world (falls Custom Domain)
   - ODER: https://saimor-live.vercel.app

2. **Diese Dinge checken:**

   **Homepage lädt?**
   - [ ] Hero-Section sichtbar
   - [ ] Logo lädt
   - [ ] Keine Error-Messages

   **Sprachen funktionieren?**
   - [ ] Deutsch: https://saimor.world/de
   - [ ] Englisch: https://saimor.world/en
   - [ ] Automatischer Redirect von / zu /de

   **Community-Section sichtbar?**
   - [ ] Runterscrollen zu "Werde Teil der Community"
   - [ ] Banner mit 4 Benefits sichtbar
   - [ ] Transparenz-Badge: "Im Aufbau: Backend 85%..."

   **Warteliste sichtbar?**
   - [ ] Formular sichtbar (Name, Email, Interessen)
   - [ ] Submit-Button: "Auf Warteliste setzen"

   **Mobile-Check (optional):**
   - [ ] Handy rausholen → saimor.world öffnen
   - [ ] Alles responsive?
   - [ ] Buttons klickbar?

---

### **3. API Route Check (5 Min)**

**Warteliste API testen:**

1. **Browser-Console öffnen:**
   - Rechtsklick → "Untersuchen" → Tab "Console"

2. **Test-Request senden:**
   ```javascript
   fetch('/api/waitlist', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       email: 'test@example.com',
       name: 'Test User',
       interests: ['mora-ai'],
       locale: 'de'
     })
   }).then(r => r.json()).then(console.log);
   ```

3. **Erwartetes Ergebnis:**
   ```json
   {
     "success": true,
     "position": 73,
     "email": "test@example.com"
   }
   ```

4. **Falls Error:**
   - Error-Message kopieren
   - Mir schicken

**Alternative: Test-HTML nutzen:**
- `test-waitlist.html` im Browser öffnen (lokal)
- Formular ausfüllen & absenden
- Zeigt detailliertes Ergebnis

---

### **4. Environment Variables Check (10 Min)**

**Diese müssen in Vercel gesetzt sein:**

1. **Vercel Dashboard → Projekt → Settings → Environment Variables**

2. **Required (MUSS gesetzt sein):**
   ```
   NEXTAUTH_URL = https://saimor.world
   NEXTAUTH_SECRET = <dein-secret>
   ```

3. **Optional (kann später):**
   ```
   N8N_WAITLIST_WEBHOOK_URL = https://n8n.saimor.world/webhook/waitlist
   NEXT_PUBLIC_CAL_URL = https://cal.com/saimor/30min
   ```

4. **Checken ob gesetzt:**
   - [ ] NEXTAUTH_URL vorhanden?
   - [ ] NEXTAUTH_SECRET vorhanden? (muss NICHT leer sein)

5. **Falls NEXTAUTH_SECRET fehlt:**
   - Lokal generieren: `openssl rand -base64 32`
   - In Vercel einfügen:
     - Key: `NEXTAUTH_SECRET`
     - Value: [generierter String]
     - Environments: Production, Preview, Development (alle 3!)
   - → Save
   - → Redeploy triggern

---

### **5. Performance Check (optional, 5 Min)**

**Lighthouse Score:**

1. **Chrome DevTools öffnen:**
   - F12 → Tab "Lighthouse"

2. **Audit starten:**
   - Mode: Navigation
   - Device: Desktop
   - Categories: Alle
   - → "Analyze page load"

3. **Ziel-Scores:**
   ```
   Performance:    > 90
   Accessibility:  > 95
   Best Practices: > 95
   SEO:            100
   ```

4. **Falls unter Ziel:**
   - Nicht schlimm! Wir optimieren später
   - Screenshot schicken wenn du willst

---

### **6. Domain Check (falls Custom Domain)**

**Nur relevant wenn saimor.world als Custom Domain gesetzt:**

1. **Vercel → Settings → Domains**

2. **Check:**
   - [ ] saimor.world → Primary Domain?
   - [ ] www.saimor.world → Redirected?
   - [ ] SSL Certificate: ✅ Valid

3. **Falls Domain-Error:**
   - DNS Records beim Provider prüfen
   - Oder mir Bescheid geben

---

## 🚨 Häufige Probleme & Fixes

### **Problem: "This site can't be reached"**

**Ursache:** Domain nicht konfiguriert oder DNS propagiert noch

**Fix:**
- Nutze erstmal Vercel-URL: https://saimor-live.vercel.app
- Domain-Setup: siehe DEPLOYMENT.md

---

### **Problem: "500 Internal Server Error"**

**Ursache:** NEXTAUTH_SECRET fehlt

**Fix:**
1. Vercel → Settings → Environment Variables
2. NEXTAUTH_SECRET hinzufügen (siehe oben)
3. Redeploy

---

### **Problem: Warteliste-Signup gibt Error**

**Ursache:** n8n Webhook URL fehlt (nicht kritisch!)

**Status:**
- Warteliste funktioniert trotzdem
- Signups werden in Vercel Logs gespeichert
- n8n kann später nachgetragen werden

**Fix (später):**
- N8N_WAITLIST_WEBHOOK_URL setzen (siehe QUICK_START_MARIUS.md)

---

### **Problem: Bilder laden nicht**

**Ursache:** remotePatterns nicht konfiguriert (sollte aber sein!)

**Fix:**
- next.config.js checken
- Mir Bescheid geben

---

### **Problem: Build dauert ewig**

**Normal!** Erster Build kann 3-5 Min dauern.

**Falls > 10 Min:**
- Refresh Seite
- Build-Logs anschauen
- Error-Message mir schicken

---

## 📊 Nach Deployment: Monitoring

### **Vercel Analytics (eingebaut):**

1. **Vercel Dashboard → Analytics Tab**

2. **Metriken:**
   - Page Views
   - Unique Visitors
   - Top Pages
   - Real User Monitoring (RUM)

3. **Ziel erste Woche:**
   - 100+ Pageviews
   - 50+ Wartelisten-Signups
   - < 2s Load Time

---

### **Wo Signups checken:**

**Option 1: Vercel Logs**
1. Deployment → "Functions" Tab
2. `/api/waitlist` → Logs anschauen
3. Signups sichtbar (Console Logs)

**Option 2: n8n Dashboard** (wenn konfiguriert)
1. n8n → Executions
2. Jeder Webhook-Call sichtbar

**Option 3: Mailchimp/Airtable** (wenn konfiguriert)
1. Mailchimp → Audience → Members
2. Neue Subscribers sichtbar

---

## ✅ Final Checklist (Zusammenfassung)

Gehe diese Liste durch NACHDEM Vercel deployed hat:

- [ ] Vercel Build Status: ✅ Ready (grün)
- [ ] saimor.world lädt ohne Error
- [ ] /de und /en funktionieren
- [ ] Community Banner sichtbar
- [ ] Warteliste-Formular sichtbar
- [ ] API Test funktioniert (Console oder test-waitlist.html)
- [ ] NEXTAUTH_SECRET ist gesetzt
- [ ] N8N_WAITLIST_WEBHOOK_URL gesetzt (optional, kann später)
- [ ] Mobile funktioniert (kurzer Check auf Handy)

**Falls ALLES ✅:** Bereit für Social Media Launch! 🚀

**Falls Probleme:** Screenshot + Error-Message → ich helfe sofort!

---

## 🎉 Nach erfolgreichem Check:

**Du bist ready für:**
1. Screenshots machen (siehe SCREENSHOTS.md)
2. Social Media Posts (siehe SOCIAL_MEDIA_READY.md)
3. Erste Signups sammeln!

**Gratulation! Website ist live! 🌱**
