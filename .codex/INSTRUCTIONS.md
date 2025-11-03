# 🪶 Saimôr Website – Arbeitsanweisung für Agents (Next.js + Tailwind + shadcn/ui)

## Ziel
Saimôr ist ein digitaler Ort für das, was bleibt, wenn alles andere laut wird.
Diese Website soll technisch klar, visuell ruhig und inhaltlich präzise sein.
Arbeite ausschließlich im **Frontend** dieses Repos.

## Designsystem
- Farben: Navy `#0E1526`, Gold `#FFCE45`, Off‑White `#F8F7F3`, Grau `#A7AFBC`
- Typografie: Headlines – *Cormorant Garamond* oder *Clash Display*; Fließtext – *Inter*
- Bilder/Icons: keine Fotos; abstrakte Orbits/Frequenzlinien, Logo „ô“
- Bewegung: minimal (Fade‑ins), keine Spielereien

## Performance & Technik
- LCP < **1.8s**, initial JS < **150 KB**
- SSR/Hydration: keine Warnungen; Browser‑Only in `useEffect` oder `dynamic(...,{ssr:false})`
- Fonts lokal; Preload der Headings‑Font
- shadcn/ui: selektive Imports; keine Full‑bundle‑Reexports
- Datenschutz: nur Matomo (anonymisiert), keine Profile/3rd‑Party‑Tracking

## Arbeitsbereich
Nur diese Pfade verändern: `app/**`, `components/**`, `content/**`, `lib/**`, `styles/**`, `.codex/**`

## Git & Commits
- Branch: `feat/auto-frontend`
- Kleine, thematisch klare Commits
- Konvention: `feat(ui): …`, `fix(ssr): …`, `chore(perf): …`

## Unklarheiten
- Fragen in `.codex/QUESTIONS.md` kurz eintragen (Stichpunkte)
- Status‑Updates optional in `knowledge/SHARED_CONTEXT.md` unter „From: Backup‑Agent“
