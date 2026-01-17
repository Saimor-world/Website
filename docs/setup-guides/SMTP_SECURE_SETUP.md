# 📧 SMTP_SECURE Setup Guide

## 🎯 **Was ist SMTP_SECURE?**

`SMTP_SECURE` bestimmt, ob eine verschlüsselte SSL/TLS-Verbindung verwendet wird.

---

## ⚙️ **Wann brauchst du es?**

### **Port 465 (SMTPS):**
- ✅ **SMTP_SECURE = `true`**
- Port: `465`
- Verwendet: Direkte SSL/TLS-Verbindung

### **Port 587 (STARTTLS):**
- ✅ **SMTP_SECURE = `false`** (oder Variable weglassen)
- Port: `587`
- Verwendet: STARTTLS (Upgrade von unverschlüsselt zu verschlüsselt)

### **Port 25 (nicht empfohlen):**
- ❌ **Nicht verwenden** (meist blockiert)

---

## 🚀 **Setup in Vercel (2 Minuten):**

### **1. Vercel Dashboard öffnen:**
- Gehe zu: https://vercel.com/dashboard
- Wähle dein Projekt
- Settings → Environment Variables

### **2. Neue Variable hinzufügen:**

**Key:** `SMTP_SECURE`  
**Value:** 
- `true` → Wenn Port 465
- `false` → Wenn Port 587 (Standard)

**Environment:** ✅ Production, ✅ Preview, ✅ Development (alle 3!)

### **3. Save & Redeploy**

---

## 📋 **Checkliste:**

**Prüfe deine aktuellen SMTP-Einstellungen:**

1. **SMTP_PORT:**
   - Wenn `465` → `SMTP_SECURE=true`
   - Wenn `587` → `SMTP_SECURE=false` (oder weglassen)

2. **SMTP_HOST:**
   - Gmail: `smtp.gmail.com` (Port 587)
   - Outlook: `smtp-mail.outlook.com` (Port 587)
   - Custom: Prüfe deine Provider-Dokumentation

3. **Testen:**
   - Kontaktformular auf Website testen
   - Email sollte ankommen

---

## 🔍 **Aktuelle Konfiguration prüfen:**

In Vercel → Environment Variables:

- [ ] `SMTP_HOST` vorhanden?
- [ ] `SMTP_PORT` vorhanden? (sollte `587` oder `465` sein)
- [ ] `SMTP_USER` vorhanden?
- [ ] `SMTP_PASS` vorhanden?
- [ ] `SMTP_FROM` vorhanden?
- [ ] `SMTP_SECURE` vorhanden? ← **FEHLT!**

---

## 💡 **Beispiel-Konfigurationen:**

### **Gmail (Port 587):**
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=deine-email@gmail.com
SMTP_PASS=dein-app-passwort
SMTP_FROM="Saimor <deine-email@gmail.com>"
```

### **Custom SMTP mit Port 465:**
```
SMTP_HOST=mail.example.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=contact@example.com
SMTP_PASS=dein-passwort
SMTP_FROM="Saimor <contact@example.com>"
```

---

## ⚠️ **Wichtig:**

- **Port 465** = `SMTP_SECURE=true` (MUSS gesetzt sein!)
- **Port 587** = `SMTP_SECURE=false` (kann weggelassen werden, Standard ist `false`)
- **Ohne SMTP_SECURE** bei Port 465 = Fehler!
- **SMTP_SECURE=true** bei Port 587 = Funktioniert meist auch, aber nicht optimal

---

## ✅ **Nach dem Setup:**

1. Variable in Vercel gesetzt
2. Redeploy warten
3. Kontaktformular testen
4. Email sollte ankommen

---

**Fertig! 🎉**

