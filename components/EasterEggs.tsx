'use client';
import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, Heart, Crown } from 'lucide-react';
import { getAchievementManager, type Achievement } from '@/lib/achievements';
import AchievementToast from './AchievementToast';
import AchievementMenu from './AchievementMenu';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  icon?: any;
}

export default function EasterEggs() {
  // Hydration fix: only run client-side code after mount
  const [mounted, setMounted] = useState(false);

  // Achievement System
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);
  const [showAchievementMenu, setShowAchievementMenu] = useState(false);
  const [secretMenuSequence, setSecretMenuSequence] = useState<string[]>([]);
  const achievementManager = useRef(getAchievementManager());

  // Mount detection
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = (matches: boolean) => {
      prefersReducedMotionRef.current = matches;
    };
    updatePreference(media.matches);
    const handler = (event: MediaQueryListEvent) => updatePreference(event.matches);
    if (media.addEventListener) {
      media.addEventListener('change', handler);
    } else {
      media.addListener(handler);
    }
    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', handler);
      } else {
        media.removeListener(handler);
      }
    };
  }, []);

  // Easter Egg States
  const [resonanzModeActive, setResonanzModeActive] = useState(false);
  const [showMessage, setShowMessage] = useState('');
  const [particles, setParticles] = useState<Particle[]>([]);

  // Tracking
  const [konamiSequence, setKonamiSequence] = useState<string[]>([]);
  const [typedChars, setTypedChars] = useState('');
  const [heroTimeStart, setHeroTimeStart] = useState<number | null>(null);
  const [visitedSections, setVisitedSections] = useState<Set<string>>(new Set());
  const messageTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const achievementTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dashboardVisitedRef = useRef<Set<string>>(new Set());
  const dashboardViewSwitchRef = useRef(0);
  const feldforscherUnlockedRef = useRef(false);
  const prefersReducedMotionRef = useRef(false);
  const logoClickCounterRef = useRef(0);
  const logoClickResetRef = useRef<number | null>(null);
  const dismissAchievement = useCallback(() => {
    setNewAchievement(null);
    if (achievementTimeoutRef.current) {
      clearTimeout(achievementTimeoutRef.current);
      achievementTimeoutRef.current = null;
    }
  }, []);

  // Secret patterns
  const konamiCode = useMemo(
    () => ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'],
    []
  );
  const secretWords = useMemo(() => ['klarheit', 'saimor', 'wandel'], []);

  useEffect(() => {
    return () => {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
      if (achievementTimeoutRef.current) {
        clearTimeout(achievementTimeoutRef.current);
      }
    };
  }, []);

  // Haptic Feedback (Vibration) for mobile
  const triggerHapticFeedback = useCallback(() => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      // Pattern: short-pause-short (celebration pattern)
      navigator.vibrate([50, 30, 50]);
    }
  }, []);

  // Load achievements on mount
  useEffect(() => {
    setAchievements(achievementManager.current.getAll());
    const unsubscribe = achievementManager.current.subscribe(setAchievements);
    return () => { unsubscribe(); };
  }, []);

  // Helper to unlock achievement with haptic feedback
  const unlockAchievement = useCallback((id: string) => {
    const achievement = achievementManager.current.unlock(id);
    if (achievement) {
      triggerHapticFeedback();
      setNewAchievement(achievement);
      if (achievementTimeoutRef.current) {
        clearTimeout(achievementTimeoutRef.current);
      }
      achievementTimeoutRef.current = setTimeout(() => {
        setNewAchievement(null);
        achievementTimeoutRef.current = null;
      }, 3600);
    }
  }, [triggerHapticFeedback]);
  const showTransientMessage = useCallback((text: string, duration = 3500) => {
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }
    setShowMessage(text);
    if (!text) return;
    messageTimeoutRef.current = setTimeout(() => {
      setShowMessage('');
      messageTimeoutRef.current = null;
    }, duration);
  }, []);

  const tryUnlockFeldforscher = useCallback(() => {
    if (feldforscherUnlockedRef.current) return;
    const alreadyUnlocked = achievementManager
      .current
      .getAll()
      .some((a) => a.id === 'field-explorer' && a.unlocked);
    if (alreadyUnlocked) {
      feldforscherUnlockedRef.current = true;
      return;
    }
    feldforscherUnlockedRef.current = true;
    unlockAchievement('field-explorer');
    showTransientMessage('Mehrere Perspektiven – stark für echte Entscheidungen.');
  }, [showTransientMessage, unlockAchievement]);

  // === PARTICLE & ACTIVATION HELPERS (DECLARE EARLY TO AVOID TDZ) ===

  const createSubtleParticles = useCallback((x: number, y: number, count: number) => {
    const newParticles: Particle[] = Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const velocity = 2 + Math.random() * 3;
      return {
        id: Date.now() + i,
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        color: ['#D4B483', '#E6C897'][Math.floor(Math.random() * 2)],
        size: 4 + Math.random() * 6,
        icon: [Sparkles, Star][Math.floor(Math.random() * 2)]
      };
    });

    setParticles(prev => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.some(np => np.id === p.id)));
    }, 2500);
  }, []);

  const createSubtleFireworks = useCallback(() => {
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const randomX = window.innerWidth * (0.3 + Math.random() * 0.4);
        const randomY = window.innerHeight * (0.3 + Math.random() * 0.4);
        createSubtleParticles(randomX, randomY, 12);
      }, i * 400);
    }
  }, [createSubtleParticles]);

  const createGoldenRain = useCallback(() => {
    const count = 25;
    const newParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i + 1000,
      x: Math.random() * window.innerWidth,
      y: -20,
      vx: (Math.random() - 0.5) * 1,
      vy: 2 + Math.random() * 3,
      color: '#D4B483',
      size: 5 + Math.random() * 5,
      icon: Crown
    }));

    setParticles(prev => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.some(np => np.id === p.id)));
    }, 3000);
  }, []);

  const activateResonanzMode = useCallback(() => {
    setResonanzModeActive(true);
    showTransientMessage('Du hast einen alten Pfad gefunden. Willkommen im Resonanzmodus.', 4000);

    // Subtle golden shimmer effect
    document.body.style.animation = 'goldenShimmer 8s ease-in-out';

    createGoldenRain();

    setTimeout(() => {
      document.body.style.animation = '';
      setResonanzModeActive(false);
    }, 8000);
  }, [createGoldenRain, showTransientMessage]);

  const activateKlarheitsfunke = useCallback(
    (coords?: { x: number; y: number }) => {
      if (!prefersReducedMotionRef.current && coords) {
        createSubtleParticles(coords.x, coords.y, 18);
        createGoldenRain();
      }
      showTransientMessage('Ein Klarheitsfunke – danke fürs aufmerksame Entdecken.', 3200);
    },
    [createSubtleParticles, createGoldenRain, showTransientMessage]
  );

  const activateShake = useCallback(() => {
    showTransientMessage('Bewegung erkannt – Systeme reagieren.');
    createGoldenRain();
  }, [createGoldenRain, showTransientMessage]);

  const activateSecretWord = useCallback((word: string) => {
    const messages: { [key: string]: string } = {
      klarheit: 'Klarheit gefunden – sie war immer da.',
      saimor: 'Saimôr erwacht – Resonanz beginnt.',
      wandel: 'Wandel beginnt – mit jedem Schritt.'
    };
    showTransientMessage(messages[word] || 'Geheimnis entdeckt.');
    createGoldenRain();
  }, [createGoldenRain, showTransientMessage]);

  // === KONAMI CODE & SECRET WORDS ===
  useEffect(() => {
    if (!mounted) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      // Konami Code
      const newSequence = [...konamiSequence, e.key].slice(-konamiCode.length);
      setKonamiSequence(newSequence);

      if (JSON.stringify(newSequence) === JSON.stringify(konamiCode)) {
        activateResonanzMode();
        unlockAchievement('konami');
      }

      // Secret Words
      const newTyped = (typedChars + e.key.toLowerCase()).slice(-20);
      setTypedChars(newTyped);

      secretWords.forEach(word => {
        if (newTyped.includes(word)) {
          activateSecretWord(word);
          if (word === 'klarheit') unlockAchievement('secret-klarheit');
          if (word === 'saimor') unlockAchievement('secret-saimor');
          if (word === 'wandel') unlockAchievement('secret-wandel');
          setTypedChars('');
        }
      });

      // Secret Menu (AAA)
      const menuSequence = [...secretMenuSequence, e.key.toLowerCase()].slice(-3);
      setSecretMenuSequence(menuSequence);

      if (menuSequence.join('') === 'aaa') {
        setShowAchievementMenu(true);
        unlockAchievement('secret-menu');
        setSecretMenuSequence([]);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [
    mounted,
    konamiSequence,
    typedChars,
    secretMenuSequence,
    konamiCode,
    secretWords,
    activateResonanzMode,
    activateSecretWord,
    unlockAchievement
  ]);

  // === KLICK AUF LOGO (4x - "Klarheitsfunke") ===
  useEffect(() => {
    if (!mounted) return;

    const handleLogoSignal = (event: Event) => {
      if (typeof window === 'undefined') return;
      if (sessionStorage.getItem('achv_quad_logo') === '1') return;

      logoClickCounterRef.current += 1;
      if (logoClickResetRef.current) {
        clearTimeout(logoClickResetRef.current);
      }
      logoClickResetRef.current = window.setTimeout(() => {
        logoClickCounterRef.current = 0;
      }, 1200);

      if (logoClickCounterRef.current >= 4) {
        logoClickCounterRef.current = 0;
        sessionStorage.setItem('achv_quad_logo', '1');
        const detail = (event as CustomEvent<{ x: number; y: number }>).detail;
        activateKlarheitsfunke(detail);
        unlockAchievement('quad_logo');
      }
    };

    window.addEventListener('mora-logo-click', handleLogoSignal as EventListener);
    return () => {
      window.removeEventListener('mora-logo-click', handleLogoSignal as EventListener);
      if (logoClickResetRef.current) {
        clearTimeout(logoClickResetRef.current);
        logoClickResetRef.current = null;
      }
    };
  }, [mounted, activateKlarheitsfunke, unlockAchievement]);

  // === SHAKE DETECTION (Mobile) ===
  useEffect(() => {
    if (!mounted) return;

    let shakeTimeout: NodeJS.Timeout;
    let lastX = 0, lastY = 0, lastZ = 0;

    const handleDeviceMotion = (e: DeviceMotionEvent) => {
      const acc = e.accelerationIncludingGravity;
      if (!acc) return;

      const x = acc.x || 0;
      const y = acc.y || 0;
      const z = acc.z || 0;

      const deltaX = Math.abs(x - lastX);
      const deltaY = Math.abs(y - lastY);
      const deltaZ = Math.abs(z - lastZ);

      if (deltaX + deltaY + deltaZ > 30) {
        clearTimeout(shakeTimeout);
        shakeTimeout = setTimeout(() => {
          activateShake();
          unlockAchievement('shake');
        }, 100);
      }

      lastX = x;
      lastY = y;
      lastZ = z;
    };

    window.addEventListener('devicemotion', handleDeviceMotion);
    return () => {
      window.removeEventListener('devicemotion', handleDeviceMotion);
      clearTimeout(shakeTimeout);
    };
  }, [mounted, activateShake, unlockAchievement]);

  // === TIME-BASED ACHIEVEMENTS (Nachteule/Frühaufsteher) ===
  useEffect(() => {
    if (!mounted) return;

    const checkTimeAchievements = () => {
      const hour = new Date().getHours();

      // Nachteule: 00:00 - 06:00
      if (hour >= 0 && hour < 6) {
        setTimeout(() => {
          unlockAchievement('night-owl');
          showTransientMessage('Nachteule entdeckt – Klarheit kennt keine Uhrzeit.');
        }, 2000);
      }

      // Frühaufsteher: 05:00 - 07:00
      if (hour >= 5 && hour < 7) {
        setTimeout(() => {
          unlockAchievement('early-bird');
          showTransientMessage('Frühaufsteher – der Tag beginnt mit Klarheit.');
        }, 2500);
      }
    };

    // Run after hydration
    const timer = setTimeout(checkTimeAchievements, 1000);
    return () => clearTimeout(timer);
  }, [mounted, unlockAchievement, showTransientMessage]);

  // === NEW: "LEISER BEOBACHTER" - Hero Time Tracking ===
  useEffect(() => {
    if (!mounted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.target.id === 'hero-section') {
            if (!heroTimeStart) {
              setHeroTimeStart(Date.now());
            }
          } else if (heroTimeStart && entry.target.id === 'hero-section') {
            const duration = Date.now() - heroTimeStart;
            if (duration >= 12000) { // 12 seconds
              unlockAchievement('silent-observer');
              showTransientMessage('Du nimmst dir Zeit zum Hinschauen. Genau hier beginnt Klarheit.');
            }
            setHeroTimeStart(null);
          }
        });
      },
      { threshold: 0.5 }
    );

    // TODO(Team): Add id="hero-section" to Hero component
    const heroElement = document.querySelector('section[role="banner"]');
    if (heroElement) {
      observer.observe(heroElement);
    }

    return () => observer.disconnect();
  }, [mounted, heroTimeStart, unlockAchievement, showTransientMessage]);

  // === NEW: "KLARHEITSNAVIGATOR" - Section Visit Tracking ===
  useEffect(() => {
    if (!mounted) return;

    const checkSectionVisits = () => {
      const requiredSections = ['home', 'trust', 'legal'];
      const allVisited = requiredSections.every(s => visitedSections.has(s));

      if (allVisited && !achievementManager.current.getAll().find(a => a.id === 'clarity-navigator' && a.unlocked)) {
        unlockAchievement('clarity-navigator');
        showTransientMessage('Du prüfst die Basis. Gute Entscheidungen beginnen mit Transparenz.');
      }
    };

    // Track current page
    const path = window.location.pathname;
    if (path.includes('/trust')) {
      setVisitedSections(prev => new Set(Array.from(prev).concat('trust')));
    } else if (path.includes('/legal')) {
      setVisitedSections(prev => new Set(Array.from(prev).concat('legal')));
    } else if (path === '/' || path.includes('/de') || path.includes('/en')) {
      setVisitedSections(prev => new Set(Array.from(prev).concat('home')));
    }

    checkSectionVisits();
  }, [mounted, visitedSections, unlockAchievement, showTransientMessage]);

  // === "FELDFORSCHER" - Dashboard Exploration Tracking ===
  useEffect(() => {
    if (!mounted) return;

    const handleCardVisited = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      if (!detail) return;
      dashboardVisitedRef.current.add(detail);
      if (dashboardVisitedRef.current.size >= 3) {
        tryUnlockFeldforscher();
      }
    };

    const handleViewSwitch = (event: Event) => {
      const count = Number((event as CustomEvent<number>).detail ?? 0);
      dashboardViewSwitchRef.current = count;
      if (count >= 2) {
        tryUnlockFeldforscher();
      }
    };

    window.addEventListener('mora-dashboard-card-visited', handleCardVisited as EventListener);
    window.addEventListener('mora-dashboard-view-switch', handleViewSwitch as EventListener);

    return () => {
      window.removeEventListener('mora-dashboard-card-visited', handleCardVisited as EventListener);
      window.removeEventListener('mora-dashboard-view-switch', handleViewSwitch as EventListener);
    };
  }, [mounted, tryUnlockFeldforscher]);

  // === SCROLL TRACKING ===
  useEffect(() => {
    if (!mounted) return;

    let hasUnlocked = false;

    const handleScroll = () => {
      if (hasUnlocked) return;

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      // 95% der Seite gescrollt
      if (scrollTop + clientHeight >= scrollHeight * 0.95) {
        hasUnlocked = true;
        unlockAchievement('scroll-champion');
        showTransientMessage('Scroll-Champion – du hast alles gesehen.');
        createGoldenRain();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted, showTransientMessage, unlockAchievement, createGoldenRain]);

  // === DURATION TRACKING (5 Minuten) ===
  useEffect(() => {
    if (!mounted) return;

    const timer = setTimeout(() => {
      unlockAchievement('patient-visitor');
      showTransientMessage('Geduldiger Entdecker – Zeit ist eine Form von Aufmerksamkeit.');
      createSubtleFireworks();
    }, 5 * 60 * 1000); // 5 Minuten

    return () => clearTimeout(timer);
  }, [mounted, unlockAchievement, showTransientMessage, createSubtleFireworks]);

  // Inject animations
  useEffect(() => {
    if (!mounted) return;

    const style = document.createElement('style');
    style.id = 'easter-egg-animations';
    style.textContent = `
      @keyframes goldenShimmer {
        0%, 100% {
          filter: brightness(1) saturate(1);
        }
        50% {
          filter: brightness(1.08) saturate(1.15) hue-rotate(5deg);
        }
      }
    `;
    if (!document.getElementById('easter-egg-animations')) {
      document.head.appendChild(style);
    }
  }, [mounted]);

  // Animate particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev =>
        prev.map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy + 0.15 // gentle gravity
        }))
      );
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Achievement Toast */}
      <AchievementToast achievement={newAchievement} onClose={dismissAchievement} />

      {/* Achievement Menu */}
      <AchievementMenu
        achievements={achievements}
        isOpen={showAchievementMenu}
        onClose={() => setShowAchievementMenu(false)}
      />

      {/* Activation Message (Refined) */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[10000] pointer-events-none"
          >
            <motion.div
              className="px-6 py-4 rounded-2xl text-center text-sm md:text-base font-medium max-w-md"
              style={{
                background: 'linear-gradient(135deg, rgba(74, 103, 65, 0.95) 0%, rgba(212, 180, 131, 0.9) 100%)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(212, 180, 131, 0.6)',
                boxShadow: '0 8px 32px rgba(212, 180, 131, 0.3)',
                color: '#fff',
                textShadow: '0 1px 2px rgba(0,0,0,0.3)'
              }}
              animate={{
                scale: [1, 1.02, 1]
              }}
              transition={{
                duration: 2,
                repeat: 1
              }}
            >
              {showMessage}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Particle System */}
      {particles.map(particle => {
        const Icon = particle.icon || Star;
        return (
          <motion.div
            key={particle.id}
            className="fixed pointer-events-none z-[9999]"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size
            }}
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
          >
            <Icon
              className="w-full h-full"
              style={{
                color: particle.color,
                filter: `drop-shadow(0 0 ${particle.size * 0.5}px ${particle.color})`
              }}
            />
          </motion.div>
        );
      })}

      {/* Resonanzmodus subtle overlay */}
      {resonanzModeActive && (
        <div className="fixed inset-0 pointer-events-none z-[9998]">
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(212, 180, 131, 0.08) 0%, transparent 60%)',
              backdropFilter: 'blur(1px)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
          />
        </div>
      )}

      {/* Secret Hint - AAA for achievements */}
      <motion.div
        className="fixed bottom-20 left-4 z-40 px-3 py-1.5 rounded-full text-xs font-medium bg-black/40 text-white/50 backdrop-blur-sm"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 0.4, x: 0 }}
        transition={{ delay: 8 }}
        whileHover={{ opacity: 0.8, scale: 1.05 }}
      >
        💡 AAA für Achievements
      </motion.div>
    </>
  );
}
