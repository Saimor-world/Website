# 🎬 Môra Disney Intro - First-Visit Animation

**Ziel:** Môra stellt sich beim ersten Besuch vor - verspielt, animiert, unvergesslich

**Inspiration:** Disney Intros, Obsidian Tool, Orbs, vernetzt

---

## 🎨 Konzept

**First-Visit Experience:**
1. User landet auf Website
2. Dunkler Screen fade-in
3. Goldener Orb fliegt vom Zentrum ein (Môra)
4. Orb pulsiert, "erwacht"
5. Text erscheint: "Hallo, ich bin Môra"
6. Kurze Animation: Orb verbindet sich mit Daten-Lianen
7. Orb fliegt zu finaler Position (unten rechts als Avatar)
8. Website fade-in

**Duration:** 3-4 Sekunden (nicht zu lang!)

---

## 🎯 Technische Umsetzung

### **1. localStorage Flag**
```typescript
const hasSeenIntro = localStorage.getItem('mora-intro-seen');
if (!hasSeenIntro) {
  showIntro();
  localStorage.setItem('mora-intro-seen', 'true');
}
```

### **2. Component: MoraIntroAnimation.tsx**

**Phase 1 - Orb Enter (0-1s):**
- Schwarzer Fullscreen Overlay
- Goldener Orb (200px) erscheint in Bildmitte
- Scale: 0 → 1, Opacity: 0 → 1
- Glow-Effect

**Phase 2 - Awakening (1-2s):**
- Orb pulsiert (Scale: 1 → 1.3 → 1)
- Text fade-in: "Hallo, ich bin Môra 🌱"
- Subtext: "Deine KI-Begleiterin für Klarheit"
- Sparkles um Orb herum

**Phase 3 - Connection (2-3s):**
- Lianen/Verbindungen wachsen aus Orb
- 3-4 Linien zu verschiedenen Richtungen
- Gradient-Animation (gold → grün)
- Kurzer "Netzwerk"-Effekt

**Phase 4 - Exit (3-4s):**
- Orb verkleinert sich
- Fliegt smooth nach unten rechts (finale Avatar-Position)
- Text fade-out
- Overlay fade-out
- Website fade-in

### **3. Framer Motion Code-Skeleton**

```typescript
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

export default function MoraIntroAnimation({ locale = 'de' }) {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const seen = localStorage.getItem('mora-intro-seen');
    if (!seen) {
      setShow(true);

      // Phase timings
      setTimeout(() => setPhase(1), 1000);  // Awakening
      setTimeout(() => setPhase(2), 2000);  // Connection
      setTimeout(() => setPhase(3), 3000);  // Exit
      setTimeout(() => {
        setShow(false);
        localStorage.setItem('mora-intro-seen', 'true');
      }, 4000);
    }
  }, []);

  const content = {
    de: {
      greeting: 'Hallo, ich bin Môra 🌱',
      subtitle: 'Deine KI-Begleiterin für Klarheit'
    },
    en: {
      greeting: 'Hello, I\'m Môra 🌱',
      subtitle: 'Your AI companion for clarity'
    }
  }[locale];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center"
          style={{ background: '#0A1612' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Orb */}
          <motion.div
            className="relative"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: phase === 0 ? 1 : phase === 1 ? [1, 1.3, 1] : phase === 3 ? 0.3 : 1,
              x: phase === 3 ? window.innerWidth * 0.4 : 0,
              y: phase === 3 ? window.innerHeight * 0.4 : 0,
            }}
            transition={{ duration: 0.8 }}
          >
            {/* Glow */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                width: 200,
                height: 200,
                background: 'radial-gradient(circle, rgba(212, 180, 131, 0.6) 0%, transparent 70%)',
                filter: 'blur(40px)'
              }}
            />

            {/* Core Orb */}
            <div
              className="relative w-[200px] h-[200px] rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #4A6741 0%, #D4B483 100%)'
              }}
            >
              {/* Eyes */}
              <div className="flex gap-6">
                <div className="w-6 h-8 bg-white rounded-full" />
                <div className="w-6 h-8 bg-white rounded-full" />
              </div>

              {/* Sparkles */}
              {phase >= 1 && (
                <motion.div
                  className="absolute top-4 right-4"
                  animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-8 h-8 text-white" />
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Text */}
          {phase >= 1 && phase < 3 && (
            <motion.div
              className="absolute top-2/3 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2
                className="text-4xl font-bold text-white mb-2"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                {content.greeting}
              </h2>
              <p className="text-lg text-[#D4B483]/80">
                {content.subtitle}
              </p>
            </motion.div>
          )}

          {/* Connection Lines */}
          {phase === 2 && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {[0, 90, 180, 270].map((angle, i) => (
                <motion.line
                  key={i}
                  x1="50%"
                  y1="50%"
                  x2={`${50 + Math.cos(angle * Math.PI / 180) * 30}%`}
                  y2={`${50 + Math.sin(angle * Math.PI / 180) * 30}%`}
                  stroke="url(#connectionGradient)"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                />
              ))}
              <defs>
                <linearGradient id="connectionGradient">
                  <stop offset="0%" stopColor="#D4B483" />
                  <stop offset="100%" stopColor="#4A6741" />
                </linearGradient>
              </defs>
            </svg>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

---

## 🎬 Integration

**In pages (de/page.tsx, en/page.tsx):**
```typescript
const MoraIntro = dynamic(() => import('@/components/MoraIntroAnimation'), { ssr: false });

export default function Page() {
  return (
    <>
      <MoraIntro locale="de" />
      {/* Rest of page */}
    </>
  );
}
```

---

## 🎨 Design Details

**Colors:**
- Background: `#0A1612` (dunkelgrün, fast schwarz)
- Orb: Gradient `#4A6741` → `#D4B483`
- Glow: `rgba(212, 180, 131, 0.6)`
- Text: White + Gold accent

**Typography:**
- Headline: Cormorant Garamond (wie Hero)
- Subtext: System font

**Animations:**
- Easing: `ease-in-out`, `spring`
- Duration: Schnell (max 4s total)
- Smooth, nicht hektisch

---

## 🎯 User Experience

**Good:**
- ✅ Nur beim ersten Besuch
- ✅ Skipable (ESC oder Click → localStorage setzen)
- ✅ Kurz (3-4s)
- ✅ Memorabel
- ✅ Erklärt Môra's Charakter

**Avoid:**
- ❌ Zu lang (>5s nervt)
- ❌ Bei jedem Page Load
- ❌ Unskipable

---

## 📋 Next Steps (für nächste Session)

1. **Component erstellen:** `MoraIntroAnimation.tsx`
2. **In Pages integrieren:** de/page, en/page
3. **Skip-Button:** ESC oder Click → localStorage setzen
4. **Test:** First-visit vs. Repeat-visit
5. **Polish:** Easing, Timing, Sparkles
6. **Optional:** Sound effect (subtil)

---

**Aufwand:** 2-3h
**Priorität:** 🟡 Nice-to-have (nach WEB-01)
**Impact:** 🔥 High (WOW-Faktor!)
