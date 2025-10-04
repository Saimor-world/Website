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

### 1. Environment Setup

```bash
# Projekt klonen
git clone <repository-url>
cd saimor-live

# Dependencies installieren
npm install

# Environment konfigurieren
cp .env.example .env.local
```

**Wichtige Environment Variables:**

```bash
# NextAuth (Authentication)
NEXTAUTH_URL=https://saimor.world
NEXTAUTH_SECRET=your-super-secure-nextauth-secret-here-minimum-32-characters

# Email Provider (SMTP)
EMAIL_SERVER_HOST=smtp.your-provider.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@your-domain.com
EMAIL_SERVER_PASSWORD=your-email-password
EMAIL_FROM=noreply@saimor.world

# AI Configuration
ANTHROPIC_API_KEY=sk-ant-your-anthropic-api-key-here

# Backend Integration (Optional)
BACKEND_BASE_URL=https://api.saimor.world
BACKEND_API_KEY=your-backend-api-key-here

# Security (Optional)
HCAPTCHA_SECRET=your-hcaptcha-secret-key
HCAPTCHA_SITEKEY=your-hcaptcha-site-key
```

### 2. Development Server

```bash
npm run dev
# oder
pnpm dev (empfohlen)
```

Öffne [http://localhost:3000](http://localhost:3000) im Browser.

## 🔐 Auth & Chat System

Diese Website implementiert ein **Public vs. Authenticated** Chat-System:

### Public Chat (Nicht angemeldet)
- **Model**: Claude 3 Haiku
- **Limits**: 5 Nachrichten pro Session, 600 max Tokens
- **Rate Limiting**: 5 Anfragen/Minute pro IP
- **Captcha**: Erforderlich ab 3. Nachricht
- **Keine Persistenz**: Nachrichten gehen bei Refresh verloren

### Authenticated Chat (Email Login)
- **Models**: Backend API (primär) → Claude 3.5 Sonnet (fallback)
- **Limits**: 30 Anfragen/Minute pro User
- **Persistenz**: Vollständiger Chat-Verlauf via Backend
- **Pro Features**: Unbegrenzte Nachrichten für `role: 'pro'` User

### Authentication Flow
1. User gibt Email auf `/login` ein
2. Magic Link wird via SMTP versandt
3. User klickt Link → eingeloggt mit JWT Session
4. Chat wechselt automatisch zu authenticated Mode

### Rate Limiting & Abuse Protection
- **IP-basiert**: 5 req/min public, 30 req/min auth
- **Session-basiert**: 5 Nachrichten max für public Users
- **hCaptcha**: Auto-Trigger nach 2 public Nachrichten
- **Backend Integration**: Alle auth Messages zu `BACKEND_BASE_URL/v1/chat`

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