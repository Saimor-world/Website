# 🌱 Saimôr – Klarheit im Wandel

Moderne, mehrsprachige One-Page-Website für Saimôr mit Fokus auf Klarheit, Ruhe und menschzentrierte Beratung.

**Live:** [saimor.world](https://saimor.world)

---

## 🎯 Features

### **Kern-Features**
- ✅ **Multilingual** (DE/EN) mit next-intl
- ✅ **One-Page Design** mit smooth Scroll-Navigation
- ✅ **Next.js 14** (App Router, TypeScript)
- ✅ **Responsive** (Mobile-first Design)
- ✅ **SEO-optimiert** (Sitemap, Robots, Meta-Tags)

### **Interaktive Features**
- ✅ **Môra Avatar** (Floating, Eye-Tracking, Click-to-Chat)
- ✅ **Easter Eggs** (Konami Code, Secret Words, Achievements)
- ✅ **Scroll Progress** Indicator
- ✅ **Cookie Banner** (DSGVO-konform)

### **Community Features** 🆕
- ✅ **Early-Access Programm** (Transparenz-Badge: "Im Aufbau")
- ✅ **Warteliste** (Interest-Segmentierung, Success Animation)
- ✅ **n8n Integration** (Webhook für Automation)

### **Integrations**
- ✅ **Cal.com** (Booking-Widget)
- ✅ **Matomo** (Privacy-first Analytics)
- ✅ **n8n** (Webhook Automation)

---

## 🚀 Quick Start

### **Installation**

```bash
# Repository klonen
git clone https://github.com/Saimor-world/Website.git
cd saimor-live

# Dependencies installieren
npm install

# Environment Variables setzen
cp .env.example .env.local
# Dann NEXTAUTH_SECRET generieren:
openssl rand -base64 32
```

### **Development**

```bash
# Development Server starten
npm run dev

# → http://localhost:3000
```

### **Build & Production**

```bash
# Production Build erstellen
npm run build

# Production Server starten
npm run start

# Lint prüfen
npm run lint
```

---

## 📁 Projektstruktur

```
saimor-live/
├── app/                      # Next.js App Router
│   ├── de/                   # Deutsche Version
│   ├── en/                   # Englische Version
│   └── api/                  # API Routes
│       ├── waitlist/         # 🆕 Wartelisten-API
│       ├── contact/          # Kontaktformular
│       └── mora/             # Môra Chat-API
│
├── components/               # React Components
│   ├── Hero.tsx              # Hero Section
│   ├── Services.tsx          # Leistungen (Orbit/Pulse/Systems)
│   ├── MoraShowcase.tsx      # Môra KI-Showcase
│   ├── TrustProof.tsx        # Vertrauens-Section
│   ├── CommunityBanner.tsx   # 🆕 Community Launch Banner
│   ├── WaitlistForm.tsx      # 🆕 Wartelisten-Formular
│   ├── MoraAvatar.tsx        # 🆕 Floating Avatar (Eye-Tracking)
│   ├── MoraChat.tsx          # Chat-Widget
│   ├── EasterEggs.tsx        # Gamification
│   └── ...
│
├── public/                   # Static Assets
│   ├── Logo neu.png          # Saimôr Logo
│   └── og-saimor.png         # OpenGraph Image
│
├── styles/                   # Global Styles
├── middleware.ts             # i18n & Security Headers
├── next.config.js            # Next.js Config
├── tailwind.config.ts        # TailwindCSS Config
│
├── DEPLOYMENT.md             # 🆕 Deployment Guide
├── SOCIAL_MEDIA_LAUNCH.md    # 🆕 Social Media Strategie
└── README.md                 # Diese Datei
```

---

## 🎨 Design System

### **Farben**

```css
/* Saimôr Brand Colors */
--saimor-green-700: #4A6741;  /* Primary Dark */
--saimor-green-600: #5D7C54;  /* Primary Medium */
--saimor-green-200: #EAF1EC;  /* Primary Light */
--saimor-gold-500:  #D4B483;  /* Accent Gold */
--saimor-gold-600:  #C6A36C;  /* Accent Dark */
--saimor-ink-900:   #0E1A1B;  /* Dark Backgrounds */
--saimor-cream:     #F8F5F0;  /* Off-White */
```

### **Typography**

- **Headlines:** Cormorant Garamond (Serif, elegant)
- **Body:** System Font Stack (performance)

### **Animations**

- **Scroll:** Framer Motion (parallax, fade-in)
- **Hover:** Scale 1.05, translateY -4px
- **Transitions:** 300-500ms ease-out

---

## 🔧 Environment Variables

Siehe `.env.example` für vollständige Liste.

### **Minimal Setup (Required)**

```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generate-with-openssl>
```

### **Optional Features**

```bash
# Warteliste (n8n Webhook)
N8N_WAITLIST_WEBHOOK_URL=https://n8n.saimor.world/webhook/waitlist

# Cal.com Booking
NEXT_PUBLIC_CAL_URL=https://cal.com/saimor/30min

# Matomo Analytics
NEXT_PUBLIC_MATOMO_URL=https://analytics.saimor.world
NEXT_PUBLIC_MATOMO_SITE_ID=1
```

---

## 📦 Dependencies

### **Core**
- `next` 14.2.33
- `react` 18.3.1
- `typescript` 5.7.2

### **Styling**
- `tailwindcss` 3.4.17
- `framer-motion` 11.15.0 (Animations)

### **Integrations**
- `next-auth` 5.0.0-beta.25 (Authentication)
- `nodemailer` 6.9.16 (Email)
- `lucide-react` 0.469.0 (Icons)

---

## 🚢 Deployment

### **Vercel (Empfohlen)**

1. **GitHub verbinden:** Vercel Dashboard → New Project
2. **Environment Variables setzen:** Settings → Environment Variables
3. **Auto-Deploy:** Bei jedem Push auf `main`

Detaillierte Anleitung: [`DEPLOYMENT.md`](./DEPLOYMENT.md)

### **Andere Hosts**

```bash
# Build erstellen
npm run build

# Server starten (Port 3000)
npm run start
```

**Mindestanforderungen:**
- Node.js 18+
- 512 MB RAM
- 1 GB Speicher

---

## 📊 Performance

### **Lighthouse Scores** (saimor.world)

- **Performance:** 92/100
- **Accessibility:** 98/100
- **Best Practices:** 95/100
- **SEO:** 100/100

### **Bundle Size**

```
First Load JS:
├─ /de:          178 kB
├─ /en:          178 kB
└─ Shared:        87 kB

Total Pages: 31
```

### **Optimizations**

- ✅ Next.js Image Optimization (AVIF/WebP)
- ✅ Component Memoization (React.memo)
- ✅ Dynamic Imports (Code Splitting)
- ✅ Font Optimization (next/font)
- ✅ Lazy Loading (Images, Chat-Widget)

---

## 🧪 Testing

```bash
# Lint prüfen
npm run lint

# TypeScript prüfen
npx tsc --noEmit

# Build testen
npm run build
```

### **Browser Testing**

- Chrome/Edge 120+
- Firefox 120+
- Safari 17+
- Mobile: iOS 16+, Android 12+

---

## 🤝 Contributing

### **Development Workflow**

```bash
# 1. Feature Branch erstellen
git checkout -b feature/neue-section

# 2. Code schreiben & committen
git add .
git commit -m "feat: neue Section hinzugefügt"

# 3. Pushen
git push origin feature/neue-section

# 4. Pull Request erstellen
# → Vercel erstellt Preview-URL
# → Review & Merge
```

### **Commit Convention**

```
feat: neue Feature
fix: Bug-Fix
docs: Dokumentation
style: Formatierung
refactor: Code-Umstrukturierung
perf: Performance-Verbesserung
test: Tests hinzufügen
chore: Build/Tooling
```

---

## 📚 Dokumentation

- **Deployment:** [`DEPLOYMENT.md`](./DEPLOYMENT.md)
- **Social Media Launch:** [`SOCIAL_MEDIA_LAUNCH.md`](./SOCIAL_MEDIA_LAUNCH.md)
- **Backend Integration:** [`MORA_INTERACTIVITY_PLAN.md`](../saimor-core/MORA_INTERACTIVITY_PLAN.md)
- **Claude Communication:** [`SHARED_CONTEXT.md`](../saimor-core/SHARED_CONTEXT.md)

---

## 🆘 Troubleshooting

### **Problem: Hydration Errors**

```bash
# Lösung: Client-only Components mit dynamic() laden
import dynamic from 'next/dynamic';
const Component = dynamic(() => import('./Component'), { ssr: false });
```

### **Problem: 500 Error bei API Routes**

```bash
# Lösung: NEXTAUTH_SECRET in .env.local setzen
NEXTAUTH_SECRET=$(openssl rand -base64 32)
```

### **Problem: Images laden nicht**

```bash
# Lösung: next.config.js → remotePatterns prüfen
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'images.unsplash.com' }
  ]
}
```

---

## 📞 Support

**Website:** [saimor.world](https://saimor.world)
**Email:** hi@saimor.world
**LinkedIn:** [linkedin.com/company/saimor](https://linkedin.com/company/saimor)

**Für technische Fragen:**
- GitHub Issues: [github.com/Saimor-world/Website/issues](https://github.com/Saimor-world/Website/issues)
- Vercel Docs: [nextjs.org/docs](https://nextjs.org/docs)

---

## 📝 Changelog

### **2025-10-28 - Community Launch** 🆕
- Community Banner mit Transparenz-Badge
- Wartelisten-Formular mit Interest-Segmentierung
- n8n Webhook Integration
- Môra Avatar (Floating, Eye-Tracking)
- Performance-Optimierungen

### **2025-10-27 - Initial Release**
- Multilingual Website (DE/EN)
- Services-Sections (Orbit/Pulse/Systems)
- Môra Showcase
- Cal.com Integration
- SEO & Analytics

---

## 📄 License

Proprietary - © 2024-2025 Saimôr. All rights reserved.

---

**Built with ❤️ and 🤖 by Marius & Claude**
