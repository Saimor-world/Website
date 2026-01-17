# 📸 Screenshot Guide für Social Media

## Was screenshoten? (Social Media Posts brauchen Visuals!)

### **Screenshot 1: Community Banner (Desktop)**

**Was zeigen:**
- Hero-Section ODER direkt Community Banner
- "Werde Teil der Saimôr-Community" Überschrift sichtbar
- 4 Benefit-Cards sichtbar
- Transparenz-Badge: "Im Aufbau: Backend 85% · Frontend 70%"

**Wie machen:**
1. https://saimor.world/de öffnen
2. Runterscrollen bis Community Banner
3. Browser Vollbild (F11)
4. Screenshot: Windows-Taste + Shift + S
5. Bereich auswählen: Banner komplett
6. Speichern als: `community-banner-desktop.png`

**Optimale Größe:** 1200x630px (LinkedIn/Twitter Standard)

---

### **Screenshot 2: Warteliste-Formular (Desktop)**

**Was zeigen:**
- Formular-Header: "Warteliste für Early Access"
- Input-Felder sichtbar (Name + Email)
- Interest-Tags sichtbar (Môra AI, Dashboards, etc.)
- Submit-Button: "Auf Warteliste setzen"

**Wie machen:**
1. https://saimor.world/de#waitlist öffnen
2. Etwas runterscrollen, sodass Formular mittig
3. Screenshot-Tool (Win+Shift+S)
4. Formular komplett auswählen
5. Speichern als: `waitlist-form-desktop.png`

---

### **Screenshot 3: Success State (nach Signup)**

**Was zeigen:**
- Grüner Haken + "Willkommen in der Community!"
- Success-Message
- Heart-Icon

**Wie machen:**
1. Warteliste-Formular ausfüllen (mit Test-Email)
2. Absenden
3. Success-Screen erscheint
4. Screenshot machen
5. Speichern als: `waitlist-success.png`

**WICHTIG:** Das geht erst wenn n8n Webhook gesetzt ist! Sonst Error.

---

### **Screenshot 4: Mobile Version (optional)**

**Was zeigen:**
- Community Banner auf Mobile
- Zeigt: Mobile-first Design funktioniert

**Wie machen:**
1. Browser DevTools öffnen (F12)
2. Device Toolbar (Ctrl+Shift+M)
3. iPhone 12 Pro auswählen
4. https://saimor.world/de öffnen
5. Zu Community Banner scrollen
6. Screenshot der DevTools-Ansicht
7. Speichern als: `community-banner-mobile.png`

---

### **Screenshot 5: MoraAvatar Interaction (GIF/Video)**

**Was zeigen:**
- Floating Avatar bottom-right
- Augen folgen Cursor (Eye-Tracking)
- Hover → Tooltip erscheint

**Wie machen:**
**Option A: GIF mit ScreenToGif (kostenlos)**
1. ScreenToGif downloaden: https://www.screentogif.com/
2. Website öffnen: https://saimor.world/de
3. ScreenToGif → Record
4. Maus über Avatar bewegen (Augen folgen zeigen)
5. Avatar anklicken (Chat öffnet)
6. Stop → Save as GIF
7. Speichern als: `mora-avatar-interaction.gif`

**Option B: Video mit OBS (kostenlos)**
1. OBS Studio downloaden
2. Screen-Capture einrichten
3. 10 Sekunden aufnehmen (Avatar interaction)
4. Export als MP4
5. In Instagram/Twitter hochladen

---

## 📐 Bildgrößen für Social Media

### **LinkedIn:**
- Post Image: 1200 x 627 px
- Profil-Banner: 1584 x 396 px

### **Twitter/X:**
- Post Image: 1200 x 675 px
- Header: 1500 x 500 px

### **Instagram:**
- Feed Post: 1080 x 1080 px (quadratisch)
- Story: 1080 x 1920 px (vertikal)

**Tool zum Resizen:** https://www.canva.com (kostenlos)

---

## 🎨 Bildbearbeitung (optional)

### **Annotations hinzufügen:**

**Tool:** Greenshot (kostenlos) oder Snagit

**Was annotieren:**
1. **Pfeile:** Auf wichtige Features zeigen
   - "Transparenz-Badge"
   - "Interest-Tags"
   - "Eye-Tracking"

2. **Text-Overlays:**
   - "85% Backend Ready"
   - "Jetzt Early Access!"

3. **Blur:** Vertrauliche Daten (falls im Screenshot)

---

## 📦 Screenshot-Paket (alles in einem Ordner)

**Datei-Struktur:**
```
screenshots/
├── 01-community-banner-desktop.png     (1200x630)
├── 02-waitlist-form-desktop.png        (1200x630)
├── 03-waitlist-success.png             (1200x630)
├── 04-community-banner-mobile.png      (375x812)
├── 05-mora-avatar-interaction.gif      (600x400)
├── 06-hero-section.png                 (1920x1080)
└── 07-full-page-desktop.png            (1920x4000)
```

---

## ⏰ Wann screenshoten?

**Beste Zeit:**
- **Nachdem Vercel Deploy fertig** (sonst alte Version)
- **Nachdem n8n Webhook gesetzt** (sonst Success-State geht nicht)

**Reihenfolge:**
1. Vercel Deploy checken (✅ Ready)
2. Website öffnen
3. Screenshots 1, 2, 4, 6, 7 machen (gehen immer)
4. n8n Webhook setzen
5. Screenshot 3 machen (Success State)
6. Optional: GIF/Video für Avatar

---

## 🚀 Quick-Version (10 Min):

**Minimum für Social Media:**
1. Screenshot 1: Community Banner (Desktop)
2. Screenshot 2: Warteliste-Formular
3. Optional: Screenshot 5 (Mora GIF)

**Das reicht für erste LinkedIn/Twitter Posts!**

---

## 🎬 Video-Alternative (für Instagram/TikTok):

**30-Sekunden-Demo:**
1. Website öffnen (saimor.world)
2. Hero-Section zeigen (2 Sek)
3. Runterscrollen zu Community Banner (3 Sek)
4. Benefit-Cards zeigen (5 Sek)
5. Warteliste-Formular ausfüllen (10 Sek)
6. Submit → Success (5 Sek)
7. Mora-Avatar anklicken → Chat öffnet (5 Sek)

**Tool:** Handy-Kamera (horizontal) oder OBS Studio

---

## 📤 Wo hochladen?

**Social Media Posts direkt:**
- LinkedIn → Post erstellen → Bild anhängen
- Twitter → Tweet → Media hochladen
- Instagram → Post/Story → Bild wählen

**Oder vorbereiten in:**
- Buffer (Social Media Scheduler)
- Later (Instagram-fokussiert)
- Hootsuite (All-in-One)

---

## ✅ Checklist vor dem Posten:

- [ ] Screenshots sind scharf (keine Blur)
- [ ] Richtige Größe (1200x630 für LinkedIn/Twitter)
- [ ] Keine vertraulichen Daten sichtbar
- [ ] Farben passen zur Brand (Grün/Gold)
- [ ] Call-to-Action sichtbar (z.B. "saimor.world/#waitlist")

---

**Du brauchst Hilfe beim Screenshoten? Sag Bescheid!** 📸

**Keine Zeit? → Ich kann auch mit CLI-Tools Screenshots machen!**
