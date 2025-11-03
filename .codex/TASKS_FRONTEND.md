# 🎯 Frontend Tasks – Saimôr (Backup-Agent)

- [ ] **Hydration-Errors eliminieren**
  - Ursachen finden (Logs), Browser‑Only in `useEffect`, ggf. `dynamic()` ohne SSR
- [ ] **Hero aktualisieren**
  - Text: „Saimôr ist ein digitaler Ort für das, was bleibt, wenn alles andere laut wird.“
  - Claim/Unterzeile: „Klarheit im Wandel – Begleitung …“
  - CTA: „Lichtgespräch“ (Cal.com)
- [ ] **Community‑Note (CTA)**
  - Block unter Hero: „Teil von Saimôr werden – stille Updates, Einladungen, Impulse“
  - Buttons: `Lichtgespräch` → Cal.com; `Community beitreten` → /community
- [ ] **MôraAvatarPublic**
  - Floating bottom‑right; sanftes Hover; Klick feuert `mora:open`
  - Für Public‑Seiten; keine Auth nötig
- [ ] **Lighthouse**
  - Desktop auf Home ≥ **90** Performance & A11y; Fonts preload, Bilder lazy

## Definition of Done
✅ Build ohne Hydration‑Warnings  
✅ Lighthouse OK  
✅ Designsystem eingehalten  
✅ Kleine, klare Commits auf `feat/auto-frontend`
