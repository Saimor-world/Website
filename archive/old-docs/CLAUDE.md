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
- merk dir alles, und ja mach das 1) Trust-&-Proof-Sektion â€“ Position

Ja: Nach Services (Pulse/Systems/Orbit), vor Values.
BegrÃ¼ndung: Erst zeigst du Angebot â†’ Beweis â†’ Haltung. Das stÃ¤rkt den Funnel und nimmt Skepsis raus, bevorâ€™s â€žphilosophischerâ€œ wird.

Copy (final, kurz & wirksam):

Headline: Warum SaimÃ´r

Bullets (3 Cards):

Klar statt komplex â€“ verstÃ¤ndliche Ergebnisse in kurzer Zeit.

DatensouverÃ¤nitÃ¤t â€“ EU-Hosting & DSGVO-Guardrails, keine Profile.

Begleitung statt Hype â€“ Rhythmus, der Entscheidungen ermÃ¶glicht.

Leises Zitat unten: â€žSaimÃ´r ist kein Tool, sondern ein Resonanzraum.â€œ

Minimal JSX (reuse deiner Card/Section/Icons):

<Section id="trust" title="Warum SaimÃ´r">
  <Grid cols={3}>
    <Card icon="CheckCircle">Klar statt komplex â€“ verstÃ¤ndliche Ergebnisse in kurzer Zeit.</Card>
    <Card icon="Shield">DatensouverÃ¤nitÃ¤t â€“ EU-Hosting & DSGVO-Guardrails, keine Profile.</Card>
    <Card icon="Activity">Begleitung statt Hype â€“ Rhythmus, der Entscheidungen ermÃ¶glicht.</Card>
  </Grid>
  <MutedQuote>â€žSaimÃ´r ist kein Tool, sondern ein Resonanzraum.â€œ</MutedQuote>
</Section>

2) Farben â€“ behalten oder wechseln?

Behalten.
Eure aktuellen TÃ¶ne #4A6741 (green) & #D4A857 (gold) passen super zum Natur-Branding. Wir machen nur Token-Harmonisierung, kein Umschwenken auf neue Werte.

Bitte diese Tokens anlegen/angleichen (keine Optik brechen):

:root{
  --saimor-green-700: #4A6741; /* Header/Foot/FlÃ¤chen dunkel */
  --saimor-green-600: #557351; /* Hover/grad-Stop */
  --saimor-green-200: #EAF1EC; /* helle Cards/Background */
  --saimor-gold-500:  #D4A857; /* Primary CTA/Icon */
  --saimor-gold-600:  #C6A36C; /* CTA Hover/Focus */
  --saimor-ink-900:   #0E1A1B; /* dunkle Tiefen (Vision-Block) */
  --saimor-cream:     #F8F5F0; /* Off-White */
}


Buttons: Primary = --saimor-gold-500, Hover = --saimor-gold-600.

Kontrast kurz prÃ¼fen (AA) â€“ bei Bedarf Text auf Buttons leicht abdunkeln (#1B1B1B).

3) Vercel-Deployment

Erst Preview, dann Prod.

npx vercel (Preview)

Checkliste: Routing (CTAs gehen erst auf /orbit|/pulse|/systems), Trust-Block sichtbar, SEO-Head gesetzt, Lighthouse ok, mobile Spacing.

Danach: npx vercel --prod.

ErgÃ¤nzungen, damit Claude direkt baut
A) Drei Zwischenseiten (finale Texte)

/orbit

Titel: Orbit â€“ Rhythmus statt Meetings

Lead: Orbit ist die systematische Begleitung fÃ¼r wiederkehrende Transformation. Wir ersetzen starre Meetings durch einen natÃ¼rlichen Rhythmus, der Klarheit und Resonanz schafft.

Nutzen:

RegelmÃ¤ÃŸige Orientierung statt Meeting-Overload

Tiefe statt Hektik

KontinuitÃ¤t im Wandel

Format: Dauer: 1â€“6 Monate Â· RegelmÃ¤ÃŸige Sessions Â· klarer Takt

Zielgruppe: Teams, Organisationen, FÃ¼hrungskreise

Callout: Erst verstehen, dann verÃ¤ndern â€“ Orbit schafft einen verlÃ¤sslichen Resonanzraum fÃ¼r Entscheidungen.

Primary CTA: KlarheitsgesprÃ¤ch zu Orbit buchen â†’ https://cal.com/saimor/30min

Secondary: ZurÃ¼ck zur Startseite â†’ /

/pulse

Titel: Pulse â€“ Impulse fÃ¼r Klarheit im Moment

Lead: Pulse sind gezielte Impulsformate: Workshops, Keynotes oder stille RÃ¤ume. Sie bringen Klarheit genau dorthin, wo sie gebraucht wird.

Nutzen:

Energie & Fokus in VerÃ¤nderungssituationen

Punktuelle KlÃ¤rung statt Dauerbelastung

ResonanzrÃ¤ume fÃ¼r Teams & Regionen

Beispiele:

Workshop â€žKlarheit im Wandelâ€œ (3h)

Keynote â€žResonanz statt Rauschenâ€œ (30â€“45 min)

Stilles Format â€žDie stille Sprache der Tiefeâ€œ (60â€“90 min)

Callout: Pulse setzt Impulse â€“ spÃ¼rbar, verstÃ¤ndlich, wirksam.

Primary CTA: Pulse-Format anfragen â†’ https://cal.com/saimor/30min

Secondary: ZurÃ¼ck zur Startseite â†’ /

/systems

Titel: Systems â€“ Daten, die Klarheit schaffen

Lead: Systems verbindet Daten, Dashboards & KI â€“ immer menschenzentriert. Ziel ist nicht Kontrolle, sondern Orientierung.

Nutzen:

VerstÃ¤ndliche DatenlÃ¶sungen

Aggregierte Insights statt Ãœberforderung

Entscheidungen mit Vertrauen

Packages:

Nova â€“ 3 KPIs, Monatsreport

Horizon â€“ 6 KPIs, Wochenreport

Solara â€“ 12+ KPIs, tÃ¤gliche Insights mit Handlungsempfehlungen

Datenschutz: DSGVO-Guardrails: ausschlieÃŸlich aggregierte GeschÃ¤ftsdaten, EU-Hosting, MindestgruppengrÃ¶ÃŸe 5, keine personenbezogenen Profile.

Primary CTA: Einblick in Systems erhalten â†’ https://cal.com/saimor/30min

Secondary: ZurÃ¼ck zur Startseite â†’ /

B) Startseite â€“ CTA-Routing vereinheitlichen

Orbit-Card: Mehr erfahren â†’ /orbit

Pulse-Card: Mehr erfahren â†’ /pulse

Systems-Card: Mehr erfahren â†’ /systems

Kontakt-Block darf weiterhin direkt zu Cal.com gehen.

C) SEO-Head (kurz)
export const metadata = {
  title: 'SaimÃ´r â€“ Klarheit im Wandel',
  description: 'SaimÃ´r begleitet Kommunen, Unternehmen und Menschen im Wandel â€“ mit Beratung, Dashboards & Workshops. Klar statt komplex. DSGVO-konform, EU-basiert.',
  openGraph: {
    title: 'SaimÃ´r â€“ Klarheit im Wandel',
    description: 'Beratung, Dashboards & Workshops. Klar statt komplex. DSGVO-konform, EU-basiert.',
    images: ['/og-saimor.png'],
  },
};

Kurzantwort an Claude (wenn duâ€™s inline zurÃ¼ckspielen willst)

Trust & Proof: nach Services, vor Values einfÃ¼gen (Copy siehe oben).

Farben: aktuelle GrÃ¼n/Gold-Werte beibehalten, nur Tokens vereinheitlichen (siehe CSS-Variablen).

Deploy: erst npx vercel (Preview), QA, dann npx vercel --prod.

CTAs: Startseite â†’ Zwischenseiten; Zwischenseiten â†’ Cal.com.

SEO: Title/Description/OG setzen.
