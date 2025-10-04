# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development
npm run dev          # Start development server on http://localhost:3000
npm run build        # Build production version
npm run start        # Start production server
npm run lint         # Run ESLint checks

# Alternative package managers (as noted in README)
pnpm dev             # Preferred package manager for development
```

## Architecture Overview

This is a **Next.js 14 multilingual one-page website** for saimor.world using the App Router with TypeScript.

### Key Architecture Patterns

**Internationalization (i18n):**
- Uses `next-intl` middleware for DE/EN localization
- Routes structure: `/de` (default) and `/en`
- Middleware automatically redirects root `/` to `/de`
- Localized page structures in `app/de/` and `app/en/` directories

**Security Headers:**
- Custom middleware sets comprehensive CSP headers
- Includes Cal.com integration permissions for booking functionality
- Security headers: X-Frame-Options, X-Content-Type-Options, Referrer-Policy

**Component Structure:**
- `components/`: Reusable UI components (Hero, Navbar, Footer, Sections, Logo)
- App Router pages in locale-specific directories
- Single API route at `app/api/contact/route.ts` (email functionality not yet connected)

**Styling & Animation:**
- TailwindCSS for styling with Navy/Gold theme
- Framer Motion for animations
- Typography-focused design

### Tech Stack
- Next.js 14 (App Router, TypeScript)
- next-intl (internationalization middleware)
- TailwindCSS (styling)
- Framer Motion (animations)
- Lucide React (icons)

### Development Notes
- Default locale is German (`de`)
- Server actions are configured with `allowedOrigins: ["*"]` in next.config.js
- Contact form exists but email sending is not yet implemented
- SEO basics included: `sitemap.ts`, `robots.ts`
- merk dir alles, und ja mach das 1) Trust-&-Proof-Sektion – Position

Ja: Nach Services (Pulse/Systems/Orbit), vor Values.
Begründung: Erst zeigst du Angebot → Beweis → Haltung. Das stärkt den Funnel und nimmt Skepsis raus, bevor’s „philosophischer“ wird.

Copy (final, kurz & wirksam):

Headline: Warum Saimôr

Bullets (3 Cards):

Klar statt komplex – verständliche Ergebnisse in kurzer Zeit.

Datensouveränität – EU-Hosting & DSGVO-Guardrails, keine Profile.

Begleitung statt Hype – Rhythmus, der Entscheidungen ermöglicht.

Leises Zitat unten: „Saimôr ist kein Tool, sondern ein Resonanzraum.“

Minimal JSX (reuse deiner Card/Section/Icons):

<Section id="trust" title="Warum Saimôr">
  <Grid cols={3}>
    <Card icon="CheckCircle">Klar statt komplex – verständliche Ergebnisse in kurzer Zeit.</Card>
    <Card icon="Shield">Datensouveränität – EU-Hosting & DSGVO-Guardrails, keine Profile.</Card>
    <Card icon="Activity">Begleitung statt Hype – Rhythmus, der Entscheidungen ermöglicht.</Card>
  </Grid>
  <MutedQuote>„Saimôr ist kein Tool, sondern ein Resonanzraum.“</MutedQuote>
</Section>

2) Farben – behalten oder wechseln?

Behalten.
Eure aktuellen Töne #4A6741 (green) & #D4B483 (gold) passen super zum Natur-Branding. Wir machen nur Token-Harmonisierung, kein Umschwenken auf neue Werte.

Bitte diese Tokens anlegen/angleichen (keine Optik brechen):

:root{
  --saimor-green-700: #4A6741; /* Header/Foot/Flächen dunkel */
  --saimor-green-600: #557351; /* Hover/grad-Stop */
  --saimor-green-200: #EAF1EC; /* helle Cards/Background */
  --saimor-gold-500:  #D4B483; /* Primary CTA/Icon */
  --saimor-gold-600:  #C6A36C; /* CTA Hover/Focus */
  --saimor-ink-900:   #0E1A1B; /* dunkle Tiefen (Vision-Block) */
  --saimor-cream:     #F8F5F0; /* Off-White */
}


Buttons: Primary = --saimor-gold-500, Hover = --saimor-gold-600.

Kontrast kurz prüfen (AA) – bei Bedarf Text auf Buttons leicht abdunkeln (#1B1B1B).

3) Vercel-Deployment

Erst Preview, dann Prod.

npx vercel (Preview)

Checkliste: Routing (CTAs gehen erst auf /orbit|/pulse|/systems), Trust-Block sichtbar, SEO-Head gesetzt, Lighthouse ok, mobile Spacing.

Danach: npx vercel --prod.

Ergänzungen, damit Claude direkt baut
A) Drei Zwischenseiten (finale Texte)

/orbit

Titel: Orbit – Rhythmus statt Meetings

Lead: Orbit ist die systematische Begleitung für wiederkehrende Transformation. Wir ersetzen starre Meetings durch einen natürlichen Rhythmus, der Klarheit und Resonanz schafft.

Nutzen:

Regelmäßige Orientierung statt Meeting-Overload

Tiefe statt Hektik

Kontinuität im Wandel

Format: Dauer: 1–6 Monate · Regelmäßige Sessions · klarer Takt

Zielgruppe: Teams, Organisationen, Führungskreise

Callout: Erst verstehen, dann verändern – Orbit schafft einen verlässlichen Resonanzraum für Entscheidungen.

Primary CTA: Klarheitsgespräch zu Orbit buchen → https://cal.com/saimor/30min

Secondary: Zurück zur Startseite → /

/pulse

Titel: Pulse – Impulse für Klarheit im Moment

Lead: Pulse sind gezielte Impulsformate: Workshops, Keynotes oder stille Räume. Sie bringen Klarheit genau dorthin, wo sie gebraucht wird.

Nutzen:

Energie & Fokus in Veränderungssituationen

Punktuelle Klärung statt Dauerbelastung

Resonanzräume für Teams & Regionen

Beispiele:

Workshop „Klarheit im Wandel“ (3h)

Keynote „Resonanz statt Rauschen“ (30–45 min)

Stilles Format „Die stille Sprache der Tiefe“ (60–90 min)

Callout: Pulse setzt Impulse – spürbar, verständlich, wirksam.

Primary CTA: Pulse-Format anfragen → https://cal.com/saimor/30min

Secondary: Zurück zur Startseite → /

/systems

Titel: Systems – Daten, die Klarheit schaffen

Lead: Systems verbindet Daten, Dashboards & KI – immer menschenzentriert. Ziel ist nicht Kontrolle, sondern Orientierung.

Nutzen:

Verständliche Datenlösungen

Aggregierte Insights statt Überforderung

Entscheidungen mit Vertrauen

Packages:

Nova – 3 KPIs, Monatsreport

Horizon – 6 KPIs, Wochenreport

Solara – 12+ KPIs, tägliche Insights mit Handlungsempfehlungen

Datenschutz: DSGVO-Guardrails: ausschließlich aggregierte Geschäftsdaten, EU-Hosting, Mindestgruppengröße 5, keine personenbezogenen Profile.

Primary CTA: Einblick in Systems erhalten → https://cal.com/saimor/30min

Secondary: Zurück zur Startseite → /

B) Startseite – CTA-Routing vereinheitlichen

Orbit-Card: Mehr erfahren → /orbit

Pulse-Card: Mehr erfahren → /pulse

Systems-Card: Mehr erfahren → /systems

Kontakt-Block darf weiterhin direkt zu Cal.com gehen.

C) SEO-Head (kurz)
export const metadata = {
  title: 'Saimôr – Klarheit im Wandel',
  description: 'Saimôr begleitet Kommunen, Unternehmen und Menschen im Wandel – mit Beratung, Dashboards & Workshops. Klar statt komplex. DSGVO-konform, EU-basiert.',
  openGraph: {
    title: 'Saimôr – Klarheit im Wandel',
    description: 'Beratung, Dashboards & Workshops. Klar statt komplex. DSGVO-konform, EU-basiert.',
    images: ['/og-saimor.png'],
  },
};

Kurzantwort an Claude (wenn du’s inline zurückspielen willst)

Trust & Proof: nach Services, vor Values einfügen (Copy siehe oben).

Farben: aktuelle Grün/Gold-Werte beibehalten, nur Tokens vereinheitlichen (siehe CSS-Variablen).

Deploy: erst npx vercel (Preview), QA, dann npx vercel --prod.

CTAs: Startseite → Zwischenseiten; Zwischenseiten → Cal.com.

SEO: Title/Description/OG setzen.