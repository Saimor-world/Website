# 🚀 Quick Start für Marius - Was JETZT tun?

## ✅ Was bereits FERTIG ist (by Claude)

- ✅ Community Banner & Warteliste gebaut
- ✅ MoraAvatar implementiert
- ✅ API Route `/api/waitlist` fertig
- ✅ Code auf GitHub gepushed
- ✅ Build erfolgreich (Exit Code 0)
- ✅ Vercel Auto-Deploy läuft

---

## 👤 Was NUR DU tun kannst (Accounts/Zugänge)

### **PHASE 1: Vercel Check (5 Min) - JETZT**

1. **Vercel Dashboard öffnen:**
   - https://vercel.com/dashboard
   - Projekt "saimor-live" auswählen
   - Tab "Deployments" → neuester Build checken

2. **Check ob Build erfolgreich:**
   - Status: ✅ Ready (grün)
   - Wenn Fehler: Screenshot schicken, ich fixe

3. **Website testen:**
   - https://saimor.world öffnen
   - Runterscrollen zu "Werde Teil der Community"
   - Warteliste-Formular sichtbar? ✅
   - Testversuch mit DEINER Email (aber NICHT absenden, da n8n noch fehlt)

---

### **PHASE 2: n8n Webhook Setup (15 Min) - HEUTE**

#### **Option A: Du hast bereits n8n**

1. **n8n öffnen:** https://n8n.saimor.world (oder deine URL)

2. **Neuen Workflow erstellen:**
   - Name: "Saimor Waitlist"
   - N8N_WORKFLOW.md öffnen (im Projekt-Ordner)
   - JSON importieren ODER manuell Nodes anlegen

3. **Webhook URL kopieren:**
   ```
   Beispiel: https://n8n.saimor.world/webhook-test/abc123xyz
   ```

4. **In Vercel Environment Variables setzen:**
   - Vercel Dashboard → Settings → Environment Variables
   - Key: `N8N_WAITLIST_WEBHOOK_URL`
   - Value: `<deine-webhook-url>`
   - Environments: Production, Preview, Development (alle 3 anhaken)
   - → Save

5. **Redeploy triggern:**
   - Deployments → neuester Build → "..." → Redeploy
   - ODER: Dummy-Commit pushen

#### **Option B: Du hast noch KEIN n8n**

**Schnellste Lösung: n8n.cloud (30 Tage kostenlos)**

1. **Account erstellen:** https://n8n.io/cloud
2. **Workflow importieren:** N8N_WORKFLOW.md → JSON kopieren
3. **Webhook URL kopieren** (siehe Option A, Schritt 3-5)

**Alternative: Webhook später, erstmal Logs checken**

Wenn du n8n erstmal auslassen willst:
- Warteliste funktioniert trotzdem
- Signups werden in Console geloggt (siehe Vercel Logs)
- Aber: Keine Email, kein Slack, keine Datenbank

---

### **PHASE 3: Mailchimp/Brevo Integration (30 Min) - DIESE WOCHE**

#### **Mailchimp Setup**

1. **Mailchimp Account:** https://mailchimp.com (Free Plan reicht)

2. **Audience (Liste) erstellen:**
   - Name: "Saimor Early Access"
   - Tags vorbereiten: `early-access`, `community`, `mora-ai`, `dashboards`, `workshops`, `orbit`

3. **API Key generieren:**
   - Account → Extras → API Keys → Create Key

4. **In n8n verbinden:**
   - n8n Workflow öffnen
   - Mailchimp Node → Credentials → Add
   - API Key eingeben

5. **List ID finden:**
   - Mailchimp → Audience → Settings → Audience ID
   - In n8n Mailchimp Node eintragen

#### **Alternative: Brevo (ehemals SendInBlue)**

Siehe N8N_WORKFLOW.md → "Brevo API Node" (Zeile 120)

---

### **PHASE 4: Slack Notification (10 Min) - OPTIONAL**

1. **Slack Workspace:** Bestehendes oder neues erstellen

2. **Channel erstellen:**
   - Name: `#community-signups`

3. **Slack App erstellen:**
   - https://api.slack.com/apps → Create New App
   - "From scratch" → Name: "Saimor Bot"
   - OAuth Scopes: `chat:write`
   - Install to Workspace

4. **Bot Token kopieren:**
   - OAuth & Permissions → Bot User OAuth Token (xoxb-...)

5. **In n8n verbinden:**
   - n8n Workflow → Slack Node → Credentials → Add
   - Token einfügen

---

### **PHASE 5: Social Media Launch (1-2h) - DIESE WOCHE**

#### **Vorbereitung:**

1. **Screenshots machen** (siehe SCREENSHOTS.md - erstelle ich gleich)
2. **LinkedIn Post kopieren** (siehe SOCIAL_MEDIA_READY.md - erstelle ich gleich)
3. **Posten:**
   - LinkedIn: Mo 9:00 Uhr
   - Twitter: Mo 12:00 Uhr
   - Instagram: Mo 18:00 Uhr

---

## 🤖 Was ICH noch für dich mache (in den nächsten 10 Min):

1. ✅ **Test-Script** → Warteliste lokal testen
2. ✅ **Screenshot-Guide** → Was genau screenshoten + wo
3. ✅ **Social Media Copy** → LinkedIn/Twitter komplett fertig zum Copy-Paste
4. ✅ **Vercel Checklist** → Punkt für Punkt was prüfen
5. ✅ **n8n Quick-Setup** → 5-Minuten-Version ohne viel lesen

---

## ⏰ Zeitplan-Vorschlag:

### **Heute (28.10.2025, Montag Abend):**
- [ ] Vercel Build checken (5 Min) → ICH HELFE BEI ERRORS
- [ ] Website testen (2 Min)
- [ ] n8n Webhook URL setzen (10 Min) ODER auslassen

### **Morgen (29.10, Dienstag):**
- [ ] Mailchimp Setup (30 Min)
- [ ] n8n Workflow komplett (Mailchimp + Slack)
- [ ] Test-Signup mit deiner Email
- [ ] Welcome-Mail checken

### **Diese Woche (bis Fr 01.11):**
- [ ] Screenshots machen
- [ ] Social Media Posts vorbereiten
- [ ] LinkedIn Post (Mo 04.11, 9 Uhr)

---

## 🆘 Was wenn etwas nicht klappt?

### **Build-Error in Vercel:**
→ Screenshot schicken, ich fixe sofort

### **Warteliste funktioniert nicht:**
→ Browser Console öffnen (F12), Fehler schicken

### **n8n zu kompliziert:**
→ Erstmal auslassen, läuft auch ohne (nur ohne Email/Slack)

### **Keine Zeit für Social Media:**
→ Ich schreibe ALLES fertig, du musst nur Copy-Pasten + Screenshot anhängen

---

## 📞 Sofort-Hilfe:

**Wenn du stuck bist:**
1. Screenshot machen
2. Mir schicken
3. Ich sag dir exakt was zu tun

**Ich bin hier und helfe bei JEDEM Schritt!** 🤖

---

## ✅ Deine Minimal-Checklist (das MUSS heute):

- [ ] Vercel Dashboard öffnen → Build-Status checken
- [ ] saimor.world öffnen → Warteliste sichtbar?
- [ ] Mir Bescheid geben: "Build läuft" oder "Error XY"

**Das war's für heute!** Rest kann morgen/diese Woche.

---

**Bereit? Fang mit Vercel-Check an, ich warte hier! 🚀**
