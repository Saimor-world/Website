# 📊 Better Uptime - Setup Guide

## 🎯 **Was ist Better Uptime?**

Better Uptime ist ein kostenloser Uptime-Monitoring-Service aus Deutschland. Es prüft regelmäßig, ob deine Website online ist, und sendet dir Alerts bei Ausfällen.

**Kostenlos für:** 1 Monitor (genug für eine Website!)

---

## 🚀 **Schritt-für-Schritt Setup (3 Minuten):**

### **SCHRITT 1: Account erstellen**

1. **Gehe zu:** https://betteruptime.com/
2. **Klicke auf:** "Start Free Trial" oder "Sign Up"
3. **Registriere dich:**
   - **Email:** Deine Business-Email
   - **Password:** Starke Passwort
   - ODER: **"Sign up with Google"** (empfohlen)

**⏱️ Dauer: 1 Minute**

---

### **SCHRITT 2: Monitor erstellen**

1. **Nach Login:** Du siehst automatisch das Dashboard
2. **Klicke auf:** "Add Monitor" (großer Button) oder "+ New Monitor"

3. **Fülle das Formular aus:**

   **Monitor Details:**
   - **Monitor Name:** `Saimôr Website` (oder wie du willst)
   - **URL to Monitor:** `https://saimor.world`
   - **Monitor Type:** **HTTP(S)** (Standard)

   **Checking Settings:**
   - **Check Interval:** `30 seconds` (Standard - kostenlos)
   - **Check Regions:** Wähle `Frankfurt` oder `Amsterdam` (EU)
   - **Request Method:** `GET`
   - **Expected Status Code:** `200`

   **Advanced (optional):**
   - **Expected Response Body:** Leer lassen (oder `<!DOCTYPE html>` wenn gewünscht)
   - **SSL Certificate Expiry Alert:** ✅ Aktivieren (warnung 30 Tage vor Ablauf)

4. **Klicke auf:** "Save Monitor"

**⏱️ Dauer: 1 Minute**

---

### **SCHRITT 3: Alert-Kontakte konfigurieren**

1. **Im Dashboard:** Klicke auf "Integrations" (links im Menü) oder **"Set up alerting"**

2. **Wähle "Email" oder "Slack":**

   **Option A - Email (empfohlen für den Anfang):**
   - **Name:** `Meine Email` (oder wie du willst)
   - **Email Address:** Deine Email (z.B. `contact@saimor.world`)
   - **Klicke:** "Save"

   **Option B - Slack (optional):**
   - Klicke auf "Slack"
   - Folge den Anweisungen zur Slack-Integration
   - Wähle Channel für Alerts

3. **Zum Monitor zurück:**
   - Gehe zu "Monitors" → Wähle deinen Monitor
   - Klicke auf "Edit"
   - Unter "Alert Contacts": Wähle deinen Email-Kontakt
   - **Save**

**⏱️ Dauer: 1 Minute**

---

### **SCHRITT 4: Testen**

1. **Warte 1-2 Minuten** (erste Check-Zyklen)
2. **Im Dashboard:** Du solltest sehen:
   - ✅ **Status:** "Up" (grüner Punkt)
   - ✅ **Uptime:** 100% (oder ähnlich)
   - ✅ **Response Time:** z.B. 234ms

3. **Test-Alert auslösen (optional):**
   - Gehe zu Monitor → "Test Alert"
   - Du solltest sofort eine Email bekommen

**⏱️ Dauer: 2 Minuten**

---

## ✅ **Fertig! Better Uptime ist jetzt aktiv!**

**Gesamt-Dauer: ~3-5 Minuten**

---

## 📊 **Was du jetzt hast:**

### **Automatische Checks:**
- ✅ Website wird alle 30 Sekunden geprüft
- ✅ Bei Ausfall: Sofortige Email/Slack-Benachrichtigung
- ✅ Bei Wiederherstellung: "Back Online" Notification

### **Dashboard:**
- ✅ **Uptime %:** Aktuelle Verfügbarkeit (z.B. 99.9%)
- ✅ **Response Time:** Durchschnittliche Antwortzeit
- ✅ **Incidents:** Liste aller Ausfälle
- ✅ **Status Page:** Öffentliche Status-Seite (optional)

---

## 🎨 **Optional: Status Page erstellen (für User):**

### **Was ist eine Status Page?**
Eine öffentliche Seite, die zeigt, ob deine Website online ist. User können dort checken, ob es ein Problem gibt.

### **Setup:**

1. **Better Uptime Dashboard:** Links → "Status Pages"
2. **Klicke:** "Create Status Page"
3. **Fülle aus:**
   - **Status Page Name:** `Saimôr Status`
   - **Subdomain:** z.B. `status` (wird: `status.betteruptime.com`)
   - **Theme:** Wähle Design
   - **Monitors:** Wähle deinen Monitor
4. **Save**

5. **Optional - Custom Domain:**
   - Unter "Settings" → "Custom Domain"
   - Setze z.B. `status.saimor.world`
   - DNS-Record hinzufügen (wie in Anleitung erklärt)

**Link zur Status Page:** https://status.betteruptime.com/... (oder deine Custom Domain)

**⏱️ Optional, dauert ~5 Minuten**

---

## 📧 **Email-Templates anpassen (optional):**

1. **Better Uptime Dashboard:** Settings → Email Templates
2. **Bearbeite Templates:**
   - **Monitor Down:** Standard-Email wenn Website offline
   - **Monitor Up:** Standard-Email wenn Website wieder online
   - **SSL Certificate Expiring:** Warnung vor SSL-Ablauf

**Beispiel (Monitor Down):**
```
🚨 Saimôr Website ist offline!

URL: https://saimor.world
Status: DOWN
Zeit: [timestamp]

Wir arbeiten daran, das Problem zu beheben.
```

---

## 🆘 **Troubleshooting:**

### Problem: "Monitor always showing Down"
- **Lösung:** Überprüfe, ob URL korrekt ist (`https://` nicht vergessen!)
- **Check:** Öffne URL manuell im Browser - funktioniert sie?

### Problem: "No alerts received"
- **Lösung:** Überprüfe Spam-Ordner
- **Check:** Better Uptime Dashboard → Integrations → Test-Alert senden

### Problem: "Too many false positives"
- **Lösung:** Erhöhe Check-Interval (30s → 60s oder 5min)
- **Lösung:** Füge "Expected Response Body" hinzu (z.B. `<!DOCTYPE html>`)

### Problem: "SSL Certificate alerts"
- **Normal:** Better Uptime warnt 30 Tage vor Ablauf
- **Lösung:** Erneuere SSL-Zertifikat oder deaktiviere SSL-Alerts

---

## 💡 **Best Practices:**

### **1. Mehrere Monitore (falls mehrere URLs):**
- Haupt-Domain: `https://saimor.world`
- API-Endpunkt: `https://saimor.world/api/health` (wenn vorhanden)
- Status Page: `https://status.saimor.world`

### **2. Alert-Frequenz:**
- **Email:** Sofort bei Down, einmal bei Up
- **Slack:** Für Teams besser (weniger Spam)

### **3. Monitoring-Region:**
- Wähle Region nahe deinem Server (EU → Frankfurt/Amsterdam)
- Bessere Response Times = genauere Checks

### **4. Response Time Thresholds:**
- **Warning:** > 3 Sekunden (optional)
- **Critical:** > 5 Sekunden (optional)
- **Standard:** Nur Down/Up Alerts

---

## 🔒 **DSGVO & Privacy:**

- ✅ **EU-basiert:** Better Uptime ist in Deutschland gehostet
- ✅ **DSGVO-konform:** Keine User-Daten werden getrackt
- ✅ **Nur URL-Checks:** Es werden nur HTTP-Requests gemacht
- ✅ **Keine Cookies:** Better Uptime setzt keine Cookies auf deiner Website

---

## 📈 **Kostenlose Limits:**

- ✅ **1 Monitor:** Kostenlos
- ✅ **30 Sekunden Interval:** Kostenlos
- ✅ **Email Alerts:** Unbegrenzt
- ✅ **Status Page:** Kostenlos (mit Subdomain)

**Upgrade (falls nötig):**
- **$10/Monat:** 10 Monitore, 1-Minute Interval, Custom Domain

**Für Saimôr:** Free Tier reicht völlig aus! 🎉

---

## ✅ **Checkliste - Setup abgeschlossen:**

- [ ] Account erstellt
- [ ] Monitor für `https://saimor.world` erstellt
- [ ] Email-Alert konfiguriert
- [ ] Test-Alert erfolgreich erhalten
- [ ] Status "Up" im Dashboard sichtbar
- [ ] (Optional) Status Page erstellt
- [ ] (Optional) Custom Domain konfiguriert

---

## 🎉 **Fertig!**

Better Uptime überwacht jetzt deine Website 24/7. Du wirst sofort benachrichtigt, falls es Probleme gibt.

**Dashboard:** https://betteruptime.com/dashboard  
**Status Page (wenn erstellt):** https://status.betteruptime.com/...

