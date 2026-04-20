# 🚀 Deployment Guide - Saimôr Website

## Was ist neu? 🎉

### 1. **Interaktive Dschungel-Elemente** 🌿
- Animierte Lianen mit Daten-Partikeln
- Organische Visualisierung im Hero-Bereich
- Hover-Effekte für interaktive Experience
- SVG-basierte Animationen mit Framer Motion

### 2. **Hetzner-Agent Integration** 🤖
- Chat-Widget kann zwischen lokalem API und Hetzner-Server wechseln
- Iframe-Integration für deinen Hetzner-Agenten
- Toggle-Button im Chat-Header (🌐/🖥️)
- Environment Variable: `NEXT_PUBLIC_HETZNER_AGENT_URL`

### 3. **Verbesserte SEO-Metadata** 📊
- Title, Description, OpenGraph Tags
- Twitter Card Support
- Optimiert für Social Media Sharing

### 4. **Trust & Proof Sektion** ✅
- Bereits integriert zwischen Services und Values
- 3 Trust-Points mit Icons
- Responsive Design mit Hover-Animationen

## Setup für Hetzner-Agent

1. **Environment Variable setzen:**
```bash
# In .env.local oder Vercel Environment Variables:
NEXT_PUBLIC_HETZNER_AGENT_URL=https://dein-hetzner-server.com/chat
```

2. **Hetzner-Server vorbereiten:**
- Der Server sollte eine Chat-Interface Route bereitstellen
- PostMessage API für Cross-Origin Communication
- CORS Headers richtig konfigurieren

3. **Chat-Widget nutzen:**
- Automatisch aktiviert wenn `NEXT_PUBLIC_HETZNER_AGENT_URL` gesetzt ist
- Toggle zwischen Local und Hetzner im Chat-Header
- Fallback auf lokalen API bei Fehler

## Vercel Deployment

### Preview Deployment:
```bash
npx vercel
```

**Checkliste vor Preview:**
- [x] Trust-Block sichtbar (nach Services, vor Values)
- [x] Routing funktioniert (/orbit, /pulse, /systems)
- [x] Jungle Elements animieren
- [x] Chat-Widget hat Toggle (wenn Hetzner-URL gesetzt)
- [ ] SEO-Head korrekt (Title, Description, OG-Tags)
- [ ] Mobile Spacing ok
- [ ] Lighthouse Score >90

### Production Deployment:
```bash
npx vercel --prod
```

## Environment Variables (Vercel)

Stelle sicher, dass folgende Variables gesetzt sind:

```env
# Required
NEXTAUTH_URL=https://saimor.world
NEXTAUTH_SECRET=your-secret
ANTHROPIC_API_KEY=your-key

# Optional - Hetzner Agent
NEXT_PUBLIC_HETZNER_AGENT_URL=https://your-server.com/chat

# Optional - Cal.com
NEXT_PUBLIC_CAL_URL=https://cal.com/saimor/30min
```

## Testing

1. **Local Development:**
```bash
npm run dev
```

2. **Test Jungle Elements:**
- Hovere über Hero-Bereich
- Prüfe animierte Lianen
- Schau nach Daten-Partikeln

3. **Test Chat-Widget:**
- Öffne Chat (💬 Button)
- Toggle zwischen Modi (wenn Hetzner-URL gesetzt)
- Teste Local-Mode
- Teste Hetzner-Iframe (wenn Server läuft)

4. **Test Routing:**
- Klick auf Service-Cards
- Prüfe /orbit, /pulse, /systems
- Zurück-Button funktioniert
- CTAs zu Cal.com funktionieren

## Lighthouse Performance Tips

- Bilder sind bereits optimiert (Next Image)
- Animations nutzen will-change
- Dynamic imports für Chat & JungleElements
- CSS ist minimiert

## Troubleshooting

**Jungle Elements nicht sichtbar?**
- Check Browser-Konsole
- SVG-Support prüfen
- Framer Motion installiert?

**Hetzner-Chat funktioniert nicht?**
- Environment Variable gesetzt?
- CORS auf Hetzner-Server konfiguriert?
- PostMessage API implementiert?
- Fallback auf Local-Mode funktioniert?

**Build-Fehler?**
```bash
npm run build
# Prüfe Fehler und fixe TypeScript/Syntax
```

## Nächste Schritte

1. ✅ Preview Deploy → QA
2. ✅ Hetzner-Server URL hinzufügen (optional)
3. ✅ OG-Image erstellen (`/public/og-saimor.png`)
4. ✅ Production Deploy
5. 🎉 Launch!

---

**Viel Erfolg beim Launch! 🚀**

Bei Fragen → Check die Component-Kommentare oder CLAUDE.md
