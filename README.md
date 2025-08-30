<<<<<<< HEAD
# Saimôr – Onepager (Next.js 14, Tailwind)

Minimaler, stabiler Onepager für **saimor.world** mit DE/EN, starker Typo, Navy/Gold, leichter Bewegung und SEO-Basics.

## Stack
- Next.js 14 (App Router, TypeScript)
- TailwindCSS
- next-intl (Middleware; Routen `/de`, `/en`)
- framer-motion
- SEO: `sitemap.ts`, `robots.ts`, OG-Image Platzhalter

## Lokal starten
```bash
pnpm i # oder npm i / yarn
pnpm dev
# dann auf http://localhost:3000/de
```

## Deploy (Vercel)
- Neues Projekt → dieses Repo importieren
- Build Command: `next build`
- Output: `.next`
- Redirect Root auf `/de` via Middleware (bereits gesetzt)

## To‑dos (Optional)
- E-Mail-Versand in `app/api/contact/route.ts` anbinden (z.B. SMTP, Resend).
- OG-Image generator hinzufügen.
- Inhalte modularisieren (MDX/Contentlayer), falls gewünscht.
- shadcn/ui hinzufügen, wenn Komponenten-Bibliothek benötigt wird.
=======
# saimor-world
>>>>>>> 19e15b1b90de8eb0d58ea64355caf823e4dac8c9
