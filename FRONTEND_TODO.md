## o. Session 7C - Polish II (13.11.2025)

- o. **Achievements:** Feldforscher triggert nach 3 Cards oder 2 View-Switches, Texte bleiben im Silent Mode.
- o. **Lint & Semantik:** useEffect-Dependencies geschlossen, Haptics/Particles via useCallback, Showcase-BG via <Image>.
- o. **Trust Copy:** Neue Demo-Erklaerung auf /trust und /en/trust inkl. Link zu DATA_FLOW_EXPLAINED.
- o. **Hero Panel:** Glass-Panel enger am Logo (blur 18px, softer shadow), CTA unveraendert.
- o. **Mora Bridge:** Hover-Throttling (100ms) + Intersection 0.25, Orb reagiert smoother, Reduced-Motion respektiert.
- o. **Mora Avatar:** Hover-Dispatcher registriert bevor Cleanup laeuft, keine TDZ-Warnungen.

**Files touched:** components/EasterEggs.tsx, lib/achievements.ts, components/KonamiCode.tsx, components/Lichtgespraech.tsx, components/MoraShowcase.tsx, components/MoraAvatar.tsx, app/trust/page.tsx, app/en/trust/page.tsx, components/Hero.tsx, components/MoraDashboardConnection.tsx.

**Offen:** Lighthouse Mobile >= 90 erneut pruefen nach Deployment; API /api/dashboard/* meldet weiter Dynamic-Server-Warning.

---

## o. Session 7B � Polish (12.11.2025)

- o. **Hero:** Logo-Kontrast via neues Glass-Panel + CTA-Kopie �Ruhigen Erstkontakt starten� mit Subtext.
- o. **Dashboard:** Badge jetzt �Demo-Dashboard (simulierte Daten)� inkl. Tooltip + Hover-Events f�r Orb-Br�cke.
- o. **FAQ:** Vier neue Antworten (Demo-Fokus) und Accordion mit gr��eren Touch-Zielen & ARIA.
- o. **Footer:** Tote Links entfernt/auf Anker gesetzt, nur Trust & Legal bleiben.
- o. **Achievements:** Silent-Mode finalisiert (Texte, Timer 3,5s, aria-live, Feldforscher-Achievement vorbereitet).
- o. **M�ra ? Dashboard:** Orb sendet Hover-Events, neues SVG-Liane/Observer respektiert Reduced-Motion.
- o. **FundingSection:** Komplett neutralisiert (�F�rderoptionen werden gepr�ft��), keine Prozentclaims mehr.
- o. **A11y/Mobile:** Focus-Styles & 44px Targets (FAQ, CTA, Cards), `loading="lazy"` f�rs Hero-BG, Orb `aria-label`.

**Offen:** Feldforscher-Achievement wird aktiviert, sobald Dashboard View Switch Event implementiert ist; FundingSection bleibt deaktiviert bis CEO-Freigabe.

---

**End of Document** - Ready for next Claude Code session! 🎯
# 🎯 Frontend TODO - Für nächsten Claude Code

**Last Update:** 2025-11-12 (Session 7)
**Status:** 🟢 PRODUCTION READY - Weitere Features geplant

---

## o. Was heute erledigt wurde (Session 7 - 12.11.2025)

### 1. M�ra Disney Intro (First-Visit Animation)
- o. **Neue Component:** `components/MoraIntroAnimation.tsx` (Framer Motion Sequenzen + localStorage Guard)
- o. **Ablauf:** Fade-In Overlay ? Orb Awakening ? Daten-Lianen ? Exit zum Avatar (10s gesamt)
- o. **Skip:** ESC oder Click auf Overlay + Button (��berspringen�)
- o. **Storage:** Flag `mora-intro-seen` verhindert Wiederholung, respektiert Reduced Motion
- o. **Integration:** Bereits in `app/de/page.tsx` & `app/en/page.tsx` aktiv (SSR off)

**Next:** Optional Sound/Timing-Polish nach User-Feedback.

---

## ✅ Was heute erledigt wurde (Session 6 - 11.11.2025)

### 1. Easter Eggs komplett refactored (Silent Mode)
- ✅ **Laute Effekte entfernt:** Triple-click Explosions, Fireworks, Matrix Rain, Rainbow
- ✅ **Stille Achievements hinzugefügt:**
  - Klarheitsfunke (4x Click auf Hero Logo)
  - Leiser Beobachter (12s in Hero Section)
  - Klarheitsnavigator (Trust/Legal/Home besucht)
- ✅ **Konami Code → Resonanzmodus:** Subtile goldene Shimmer statt lautem Effekt
- ✅ **TypeScript Set Bug gefixt:** `Array.from(prev).concat(item)` statt spread
- ✅ **Deutsche poetische Messages:** "Du hast einen stillen Moment entdeckt..."

**Files Changed:**
- `components/EasterEggs.tsx` - Komplette Refactoring zu stillen, poetischen Achievements
- `lib/achievements.ts` - Neue Achievement Definitionen

### 2. Radikale Content-Bereinigung
- ✅ **Pre-Seed Funding Section:** Auskommentiert in DE/EN pages (TODO für CEO)
- ✅ **Horizon/Solara/Nova Packages:** Komplett aus MoraShowcase entfernt (89 lines)
- ✅ **SystemsSection.tsx:** Komplette Datei gelöscht (317 lines)
- ✅ **Testimonials:** "Horizon-Paket" → "Môra Dashboard" aktualisiert
- ✅ **FAQ:** Konkrete Preise & Launch-Daten entfernt, MVP-Kontext hinzugefügt

**Reason:** User forderte "radikales Denken - alle veralteten Inhalte raus"

**Files Changed:**
- `app/de/page.tsx` & `app/en/page.tsx` - FundingSection commented out
- `components/MoraShowcase.tsx` - Packages entfernt, nur Môra Features
- `components/SystemsSection.tsx` - DELETED
- `components/Testimonials.tsx` - Horizon → Môra
- `components/FAQ.tsx` - Preise/Daten raus

### 3. MoraShowcase Lesbarkeit Fix
- ✅ **Text Colors:** white → gray-700/800/900 (besser lesbar)
- ✅ **Glass Panels:** Höhere Opazität für besseren Kontrast
- ✅ **Demo Responses:** "Systems Dashboard" → "Môra" aktualisiert

**Problem:** User sagte "kann man nicht gut lesen weil weiße Schrift"
**Solution:** Dunkle Grautöne auf hellen Liquid Glass Panels

**Files Changed:**
- `components/MoraShowcase.tsx` - Text colors & glass panel opacity

### 4. InteractiveMoraDashboard MVP-Kontext
- ✅ **Demo Label:** "Demo-Dashboard (simulierte Daten)" hinzugefügt
- ✅ **Info Tooltip:** Erklärt dass es lokale Demo-Daten sind
- ✅ **Hover State:** Tooltip erscheint on hover auf Info Icon

**Files Changed:**
- `components/InteractiveMoraDashboard.tsx` - MVP Context Banner

### 5. Hero Logo Visibility verbessert
- ✅ **Dunklerer Hintergrund:** Besserer Kontrast für Logo
- ✅ **Stärkerer Border:** 2px solid rgba gold
- ✅ **Enhanced Shadows:** Tiefere Schatten für 3D-Effekt
- ✅ **Golden Glow:** Subtiles Leuchten um Logo

**Files Changed:**
- `components/Hero.tsx` - Logo panel styling

### 6. Môra ↔ Dashboard Visual Connection (NEW)
- ✅ **Component erstellt:** `MoraDashboardConnection.tsx`
- ✅ **Floating Particles:** 5 goldene Partikel fliegen von Orb zu Dashboard
- ✅ **Subtle Glow:** Pulsierender Glow um Môra Orb
- ✅ **Tooltip:** "Mit Dashboard verbunden" wenn Dashboard in View
- ✅ **IntersectionObserver:** Trigger nur wenn Dashboard sichtbar

**Reason:** User wollte visuelle Verbindung zwischen Môra Chat Orb und Dashboard

**Files Added:**
- `components/MoraDashboardConnection.tsx` (133 lines)

**Files Changed:**
- `app/de/page.tsx` & `app/en/page.tsx` - Component integriert

### 7. TrustProof Liquid Glass Polish ✅
- ✅ **Card Backgrounds:** White-based liquid glass statt gold/green tint
- ✅ **Backdrop Blur:** 24px → 32px für stärkeren Effekt
- ✅ **Icon Containers:** Liquid glass mit backdrop blur
- ✅ **Box Shadows:** Konsistente Schatten mit Rest der Site

**Files Changed:**
- `components/TrustProof.tsx` - Liquid glass polish

**Build Status:** Alle Commits pushed ✅

---

## ✅ Was erledigt wurde (Session 5 - 04.11.2025)

### 1. Hero modernisiert (Epiminds-Style)
- ✅ **NUR 1 CTA Button** ("Môra kennenlernen") statt 2
- ✅ **Scroll-Indicator** statt zweitem Button
- ✅ **Dunkler Hintergrund** (moderne Overlay wie Epiminds)
- ✅ **Dschungel-Bild** subtil integriert mit multiply blend
- ✅ **Saimor Logo** prominent sichtbar
- ✅ **Môra Badge** "Backend 85% · Jetzt verfügbar" mit Animation
- ✅ **Liquid Glass Effects** überall
- ✅ **MyceliumNetwork** Hintergrund läuft perfekt

**Files Changed:**
- `components/Hero.tsx` - Modernized with 1 CTA + dark Epiminds-style overlay

### 2. Services Section aktualisiert (3 statt 4)
- ✅ **Systems entfernt** - Nova/Horizon/Solara sind jetzt Môra integriert
- ✅ **Môra Vision aktualisiert:**
  - Dual Mode (Ordner ↔ Feld) erwähnt
  - Dashboard Intelligence betont
  - Web, Voice, Workflow-Runner Integration
- ✅ **Grid-Layout:** `lg:grid-cols-3` (war 4)
- ✅ **Orbit & Pulse:** "Môra-unterstützt" betont

**Files Changed:**
- `components/Services.tsx` - Removed Systems, updated Môra vision, 3-column grid

### 3. Balance: SAIMOR + Môra
- ✅ **Saimor Logo** im Hero prominent
- ✅ **Môra Badge** im Hero für Early Access
- ✅ **Services:** Menschen (Saimor) machen Workshops, Môra ist Tool
- ✅ **MyceliumNetwork:** Organischer Hintergrund für "Universum" Feeling

**Build Status:** Exit Code 0 ✅ (31 pages, 177 kB)

---

## 📋 NEXT STEPS - Prioritized

### 🔴 HIGH PRIORITY (Nächste Session)

#### 1. Môra Disney Intro implementieren
**Warum:** First-visit Animation für "Universum" Feeling
**Plan:** Bereits vollständig in `MORA_DISNEY_INTRO_PLAN.md` dokumentiert
**Aufwand:** 2-3 Stunden
**Files:**
- Create: `components/MoraIntroAnimation.tsx`
- Update: `app/de/page.tsx` & `app/en/page.tsx`

**Implementation Guide:**
```typescript
// 1. Create MoraIntroAnimation.tsx (see MORA_DISNEY_INTRO_PLAN.md)
// 2. Add to pages:
import MoraIntroAnimation from '@/components/MoraIntroAnimation';

export default function Page() {
  return (
    <>
      <MoraIntroAnimation locale="de" />
      {/* rest of page */}
    </>
  )
}
```

#### 2. Liquid Glass Effects auf restlichen Sections
**Warum:** User wollte "radikalen Politur über die ganze Website"
**✅ Bereits erledigt:**
- `components/MoraShowcase.tsx` - Session 6 ✅
- `components/TrustProof.tsx` - Session 6 ✅

**Noch zu polieren:**
- `components/CommunityBanner.tsx` - Backdrop blur verbessern
- `components/WaitlistForm.tsx` - Form inputs mit glass effect
- `components/FAQ.tsx` - Accordion items mit glass

**Aufwand:** ~45 min (3 Components à 15 min)

**Pattern:**
```tsx
// Liquid Glass Style (White-based für bessere Lesbarkeit)
style={{
  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 249, 0.85) 100%)',
  backdropFilter: 'blur(32px)',
  border: '1px solid rgba(212, 180, 131, 0.35)',
  boxShadow: '0 20px 60px rgba(74, 103, 65, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
}}
```

#### 3. /systems Page entfernen oder umleiten
**Problem:** Services.tsx hat Systems entfernt, aber `/systems` Page existiert noch
**Options:**
- A) Delete `app/systems/page.tsx` komplett
- B) Redirect zu Môra Showcase: `redirect('/de#mora-showcase')`
- C) Umbauen zu "Môra Dashboard" Demo-Page

**Recommendation:** Option B (Redirect)

---

### 🟡 MEDIUM PRIORITY (Diese Woche)

#### 4. Dashboard Login Integration vorbereiten
**Context:** Shared Auth zwischen Website & Dashboard (siehe SHARED_CONTEXT.md)
**Backend Status:** Dashboard API @ voice.saimor.world hat Bearer Token Auth
**Tasks:**
- [ ] NextAuth Config erweitern (Custom Provider für Dashboard API)
- [ ] Protected Routes Setup (`/dashboard/*`)
- [ ] User Context Provider erstellen
- [ ] Login Flow UI (Modal oder separate /login page)

**Reference:** Backend-Claude #1 hat Auth System (ADMIN_TOKEN in .env)

#### 5. Môra Intelligence Layer
**Vision:** Môra auf Website wird "intelligent" (echte AI, nicht Demo)
**Requirements:**
- Dashboard API Integration (voice.saimor.world)
- Real-time KPI Updates
- Chat mit echter Claude AI
- User-spezifische Empfehlungen

**Tasks:**
- [ ] API Client für Dashboard Endpoints erstellen
- [ ] Môra Chat Component mit real API anbinden
- [ ] KPI Display Component (real data)
- [ ] WebSocket Integration für Real-time Updates

---

### 🟢 LOW PRIORITY (Später)

#### 6. Mobile Optimization Pass
**Current Status:** Responsive, aber könnte besser sein
**Focus Areas:**
- Hero CTA: Touch-optimiert? (aktuell schon gut)
- Services Cards: Swipe gesture für mobile?
- MyceliumNetwork: Performance auf Mobile (Canvas heavy)

#### 7. Performance Optimization
**Current:** 177 kB First Load JS - sehr gut!
**Potential Wins:**
- Image optimization (Dschungel-Bild von Unsplash)
- Code splitting für Easter Eggs (nicht critical path)
- MyceliumNetwork: RequestAnimationFrame throttling

#### 8. A11y Audit
**Status:** Basics sind da (aria-labels), aber nicht komplett
**Tasks:**
- [ ] Keyboard Navigation testen
- [ ] Screen Reader Test
- [ ] Color Contrast Check (WCAG AA)
- [ ] Focus States überall

---

## 🎨 Design System Tokens (Für Konsistenz)

### Colors (bereits im Einsatz)
```css
--saimor-green-700: #4A6741;  /* Header/Footer/Dark surfaces */
--saimor-green-600: #557351;  /* Hover states */
--saimor-green-200: #EAF1EC;  /* Light cards/backgrounds */
--saimor-gold-500:  #D4B483;  /* Primary CTA/Icons */
--saimor-gold-600:  #C6A36C;  /* CTA Hover */
--saimor-ink-900:   #0E1A1B;  /* Deep dark (Vision blocks) */
--saimor-cream:     #F8F5F0;  /* Off-white */
```

### Typography
```css
/* Headlines */
font-family: 'Cormorant Garamond', serif;
font-size: clamp(2.5rem, 5vw, 4rem); /* Responsive */

/* Body */
font-size: 1rem (16px) base
line-height: 1.5 (24px)

/* Section Headlines */
text-4xl md:text-5xl lg:text-6xl (konsistent!)
```

### Spacing
```css
/* Section Padding */
py-20 sm:py-24 (konsistent überall!)

/* Container Max Width */
max-w-7xl (Services, FAQ, etc.)
max-w-5xl (Hero content)
max-w-3xl (Intro texts)
```

### Animations
```typescript
// Framer Motion Variants (Standard)
initial: { opacity: 0, y: 30 }
animate: { opacity: 1, y: 0 }
transition: { duration: 0.8, ease: "easeOut" }

// Hover States
whileHover: { scale: 1.05, y: -8 }
whileTap: { scale: 0.98 }
```

---

## 🔗 Integration Points (Backend Koordination)

### 1. Dashboard API (Backend-Claude #1)
**Base URL:** `https://voice.saimor.world/api/v1/dashboard/`
**Auth:** Bearer Token (ADMIN_TOKEN in .env)
**Endpoints Ready:**
- `/status` - System health
- `/overview` - Dashboard KPIs
- `/costs` - Cost tracking
- `/activity` - Recent activity
- `/chat/message` - Môra chat (POST)

**CORS:** Backend needs to whitelist `saimor.world` origin!

### 2. Core API (Backend-Claude #3)
**Base URL:** `http://localhost:8081/v1/`
**Status:** 100% deployed, Docker containers healthy
**Use Case:** Business actions (later phase)
**Endpoints:**
- `/actions/execute` - Execute business action
- `/actions/confirm` - 2FA confirmation
- `/actions/undo` - 5-min undo window

### 3. Môra UI (neue separate App)
**Location:** `C:/mora-ui`
**Status:** Kickoff läuft (andere Claude Instance)
**Vision:** Dual Mode (Ordner ↔ Feld), Workflow-Runner, Broadcast
**Integration:** Später als Demo-Widget auf Website einbetten?

---

## 📦 Current Website Architecture

### Pages
```
/de                  → Main page (Hero, Services, Môra Showcase, etc.)
/en                  → English version
/orbit               → Orbit service page
/pulse               → Pulse service page
/systems             → ⚠️ DEPRECATED - needs redirect or removal
/de/kontakt          → Contact page
/de/rechtliches/*    → Legal pages
```

### Key Components
```
components/
├── Hero.tsx                 ✅ Modernized (Epiminds-style, 1 CTA)
├── Services.tsx             ✅ Updated (3 services, Môra vision)
├── MoraShowcase.tsx         🔄 Needs liquid glass polish
├── TrustProof.tsx           🔄 Needs liquid glass polish
├── CommunityBanner.tsx      🔄 Needs backdrop blur improve
├── WaitlistForm.tsx         🔄 Needs glass effect on inputs
├── FAQ.tsx                  🔄 Needs glass on accordion
├── MoraAvatar.tsx           ✅ Working (popup on click)
├── MyceliumNetwork.tsx      ✅ Perfect (organic background)
├── DataJungle.tsx           ✅ Working (jungle elements)
├── ScrollProgress.tsx       ✅ Working
├── EasterEggs.tsx           ✅ Working (achievement system)
└── CookieBanner.tsx         ✅ Working (GDPR compliant)
```

### API Routes
```
/api/waitlist         ✅ Working (ready for n8n)
/api/contact          ⚠️ Email not connected yet
/api/auth/*           ⚠️ NextAuth needs NEXTAUTH_SECRET in Vercel
/api/dashboard/*      🔄 Proxies to Dashboard API (needs implementation)
/api/mora             🔄 Future: Môra Intelligence Layer
```

---

## 🐛 Known Issues

### 1. NextAuth 500 Error (Vercel)
**Problem:** Missing `NEXTAUTH_SECRET` in Vercel ENV
**Fix:** Add to Vercel ENV vars
**Impact:** Auth routes fail in production

### 2. n8n Webhook not connected
**Problem:** Waitlist form doesn't trigger n8n workflow
**Status:** API route works, webhook URL needs Marius setup
**URL (probable):** `https://n8n.voice.saimor.world/webhook/waitlist`

### 3. ESLint Warnings (non-critical)
**Files:** DataDashboard.tsx, EasterEggs.tsx, MoraShowcase.tsx
**Issue:** React Hook dependencies, img tag instead of Image
**Impact:** None (best practices only)

---

## 🎯 Vision: "Das wird kein Landing Page - ein kleines Universum"

### Current Progress (85% ready)
- ✅ **Organic Background:** MyceliumNetwork + DataJungle
- ✅ **Modern Hero:** Epiminds-inspired, 1 CTA, liquid glass
- ✅ **Services:** 3 clear offerings (Môra, Orbit, Pulse)
- ✅ **Môra Prominent:** Badge, featured card, avatar
- ✅ **Early Access:** Waitlist form ready
- 🔄 **Intelligence:** Dashboard integration pending
- 🔄 **Disney Intro:** Plan ready, implementation pending

### Next Phase: "Universum lebendig machen"
1. Môra Disney Intro (first visit magic)
2. Dashboard Login (users can log in)
3. Real-time KPI Display (live data)
4. Intelligent Môra Chat (real AI responses)
5. User Context (personalized experience)

---

## 📚 Documentation References

### Internal Docs
- `CLAUDE.md` - Development commands, architecture overview
- `MORA_DISNEY_INTRO_PLAN.md` - Complete intro animation spec
- `MASTER_PLAN.md` - Original action plan with security
- `VERCEL_CHECKLIST.md` - Deployment verification

### External (saimor-core)
- `C:/Users/mf4hr/saimor-core/SHARED_CONTEXT.md` - Inter-Claude communication
- `MORA_CORE_SYSTEM_MAPPING.json` - Backend API spec (12 KPIs, 15+ APIs)
- `MORA_SYSTEM_OVERVIEW.md` - KPI tables, code examples

---

## ⚠️ Important Notes for Next Claude Code

### Context to Remember
1. **Systems = Môra** - Nova/Horizon/Solara packages are now integrated into Môra
2. **SAIMOR im Fokus** - Menschen (Saimor team) do workshops, Môra is the AI tool
3. **Balance** - Logo + Môra both prominent, not "Môra-lastig"
4. **Epiminds-Style** - Minimalist, modern, motion-first (user's reference)
5. **Liquid Glass** - User wants this aesthetic across ALL components

### Don't Break
- ✅ MyceliumNetwork background (working perfectly)
- ✅ Hero with 1 CTA (user approved)
- ✅ 3 Services layout (Môra, Orbit, Pulse)
- ✅ Saimor Logo in Hero
- ✅ DataJungle elements

### User Preferences
- ❌ NO 2 CTAs in Hero (just 1 + scroll indicator)
- ❌ NO emojis (unless explicitly requested)
- ❌ NO Systems as separate service (it's Môra now)
- ✅ YES minimalist & professional
- ✅ YES liquid glass everywhere
- ✅ YES organic animations

---

## 🚀 Quick Start Commands

```bash
# Development
npm run dev              # http://localhost:3000

# Build & Deploy
npm run build           # Test build
git add -A
git commit -m "..."
git push origin main    # Auto-deploys to Vercel

# Check live site
open https://saimor.world
```

---

**End of Document** - Ready for next Claude Code session! 🎯
