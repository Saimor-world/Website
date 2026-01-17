# 📧 SMTP Port - Welcher Port brauchst du?

## 🎯 **Standard: Port 587 (empfohlen)**

**99% der Fälle:** Verwende **Port 587** mit `SMTP_SECURE=false`

Das ist der Standard und funktioniert mit:
- ✅ Gmail
- ✅ Outlook/Office365
- ✅ Fast alle anderen Provider
- ✅ Die meisten Custom SMTP-Server

---

## 🔍 **Wie findest du heraus, welchen Port du brauchst?**

### **Option 1: Schau in Vercel nach deinem SMTP_HOST**

1. **Vercel Dashboard → Environment Variables**
2. **Öffne `SMTP_HOST`**
3. **Welcher Host steht da?**

**Dann schau hier:**

| SMTP_HOST | Port | SMTP_SECURE |
|-----------|------|-------------|
| `smtp.gmail.com` | **587** | `false` |
| `smtp-mail.outlook.com` | **587** | `false` |
| `smtp.office365.com` | **587** | `false` |
| `mail.example.com` | **587** (meist) | `false` |
| Custom Server | **587** (Standard) | `false` |

**Ausnahme:**
- Wenn dein Provider explizit **Port 465** verlangt → `SMTP_SECURE=true`

---

### **Option 2: Prüfe deine Email-Provider-Dokumentation**

**Gmail:**
- Port: **587**
- SMTP_SECURE: `false`

**Outlook/Office365:**
- Port: **587**
- SMTP_SECURE: `false`

**Custom Provider:**
- Meist: **587**
- Selten: **465** (dann `SMTP_SECURE=true`)

---

## ✅ **Empfehlung: Standard-Konfiguration**

**Wenn du unsicher bist, verwende diese Standard-Werte:**

```
SMTP_PORT=587
SMTP_SECURE=false
```

**Das funktioniert in 99% der Fälle!**

---

## 🚀 **Schnell-Setup in Vercel:**

### **1. SMTP_PORT:**
- **Key:** `SMTP_PORT`
- **Value:** `587`
- **Environment:** Production, Preview, Development

### **2. SMTP_SECURE:**
- **Key:** `SMTP_SECURE`
- **Value:** `false`
- **Environment:** Production, Preview, Development

---

## ⚠️ **Nur wenn Port 465:**

**Falls dein Provider explizit Port 465 verlangt:**

```
SMTP_PORT=465
SMTP_SECURE=true
```

**Aber:** Das ist selten! Meist reicht Port 587.

---

## 🧪 **Testen:**

Nach dem Setup:
1. Kontaktformular auf Website testen
2. Email sollte ankommen
3. Falls Fehler: Prüfe Vercel Logs

---

## 💡 **Tipp:**

**Wenn du keinen SMTP-Provider hast:**

Du kannst auch einen Email-Service nutzen:
- **SendGrid** (kostenlos bis 100 Emails/Tag)
- **Mailgun** (kostenlos bis 5.000 Emails/Monat)
- **Resend** (kostenlos bis 3.000 Emails/Monat)

Diese haben meist auch Port 587! 🎉

---

## ✅ **Zusammenfassung:**

**Standard (empfohlen):**
- `SMTP_PORT=587`
- `SMTP_SECURE=false`

**Nur wenn Provider Port 465 verlangt:**
- `SMTP_PORT=465`
- `SMTP_SECURE=true`

**Fertig! 🚀**

