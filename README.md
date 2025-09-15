# Saimôr – Klarheit im Wandel

Moderne, professionelle Website für Saimôr mit Fokus auf Klarheit, Ruhe und menschzentrierte Beratung.

## 🎯 Features

- **Tesla/Apple-Level Design**: Minimalistisch, ikonisch, ruhig
- **KI-Agent Integration**: Floating Chat-Interface für Benutzerinteraktion
- **Funnel-Logik**: Optimiert für Cal.com-Integration (Lichtgespräche)
- **User Stories**: Gezieltes Marketing für Kommunen, KMU und Einzelpersonen
- **Responsive Design**: Perfekt auf allen Geräten
- **Performance**: Lighthouse >90, Security Headers, DSGVO-konform
- **Microinteractions**: Magnetic hover, parallax effects, scroll reveals

## 🚀 Schnellstart

```bash
# Projekt klonen
git clone <repository-url>
cd saimor-live

# Dependencies installieren
npm install

# Development Server starten
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000) im Browser.

## 🛠 Tech Stack

- **Next.js 14** (App Router, TypeScript)
- **TailwindCSS** (Custom Design System)
- **Framer Motion** (Animationen)
- **Lucide React** (Icons)

## 🎨 Design System

### Farben
- **Navy**: `#0E1526` (Primary Dark)
- **Navy Light**: `#1A2332` (Secondary Dark)
- **Gold**: `#FFCE45` (Accent/CTAs)
- **Paper**: `#F9F9F6` (Primary Light)
- **Bone**: `#F7F5F3` (Secondary Light)
- **Bone Dark**: `#F0EDE8` (Tertiary Light)

### Typography
- **Headings**: Cormorant Garamond (Serif)
- **Body**: Inter (Sans-serif)

## 📱 Sektionen

### 1. **Hero** (`components/Hero.tsx`)
- Fullscreen mit Parallax-Effekten
- BrandSun + Orbital Background
- Dual-CTA: "Lichtgespräch buchen" + "Angebot entdecken"

### 2. **User Stories** (`components/UserStories.tsx`)
- 3 Zielgruppen: Kommunen, KMU, Einzelpersonen
- Alternating Background (Bone)
- Magnetic Hover Cards

### 3. **Angebot** (`components/Sections.tsx`)
- 3 Services: Pulse, Systems, Orbit
- Navy Background mit enhanced Glows
- Human-centered Copywriting

### 4. **Mission**
- Bone Background für Kontrast
- Poetische Sprache, BrandSun rechts

### 5. **Kontakt**
- Navy-Light Background
- Dual-CTA Funnel: Formular + Cal.com

## 🤖 KI-Agent (`components/AIAgent.tsx`)

Der floating Chat-Agent bietet:

- **Welcome Flow**: Angebot zeigen, Lichtgespräch buchen, Frage stellen
- **Smart Routing**: Verschiedene CTAs führen zu optimalen Actions
- **Chat Interface**: Stub für spätere API-Integration
- **Modern UX**: Everlast AI-inspired Design

### Integration
```tsx
import AIAgent from '@/components/AIAgent';

<AIAgent locale="de" />
```

## 🔗 Funnel-Logik

### Primärer CTA-Flow
1. **Hero CTA** → Cal.com/saimor/30min
2. **User Stories CTAs** → Cal.com/saimor/30min
3. **Service CTAs** → Cal.com/saimor/30min
4. **KI-Agent "Lichtgespräch"** → Cal.com/saimor/30min

### Sekundärer Lead-Flow
1. **Kontaktformular** → `/api/contact` → E-Mail Lead
2. **KI-Agent Chat** → Qualifizierung → Weiterleitung

## 🔧 Development

### Scripts
```bash
npm run dev         # Development Server
npm run build       # Production Build
npm run start       # Production Server
npm run lint        # ESLint Check
npx tsc --noEmit    # TypeScript Check
```

### Komponenten-Struktur
```
components/
├── Hero.tsx          # Main Hero Section
├── UserStories.tsx   # Target Group Stories
├── Sections.tsx      # Offers + Mission + Contact
├── AIAgent.tsx       # Floating Chat Agent
├── BrandSun.tsx      # Brand Logo/Icon
├── Orbits.tsx        # Background Animations
├── Navbar.tsx        # Navigation
└── Footer.tsx        # Footer with Animations
```

## 📊 Performance

- **Lighthouse Score**: >90 (Performance, Accessibility, SEO)
- **Security Headers**: CSP, X-Frame-Options, etc.
- **DSGVO-Konform**: Transparente Datenschutzhinweise
- **Cal.com Integration**: Externe Buchungslogik

## 🚢 Deployment

### Vercel (Empfohlen)
1. Repository zu Vercel verbinden
2. Build Command: `npm run build`
3. Environment Variables setzen (falls nötig)

### Andere Anbieter
- Build: `npm run build`
- Output: `.next` Ordner
- Node.js Runtime erforderlich

## 🔒 Security

- Content Security Policy (CSP) für Cal.com
- X-Frame-Options: DENY
- DSGVO-konforme Datenverarbeitung
- Keine Client-seitigen Secrets

## 📝 Lizenz

Proprietary - Alle Rechte vorbehalten Saimôr 2025.