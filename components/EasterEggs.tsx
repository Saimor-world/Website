'use client';
import { useEffect, useState, useRef } from 'react';
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

  // Easter Egg States
  const [resonanzModeActive, setResonanzModeActive] = useState(false);
  const [showMessage, setShowMessage] = useState('');
  const [particles, setParticles] = useState<Particle[]>([]);

  // Tracking
  const [konamiSequence, setKonamiSequence] = useState<string[]>([]);
  const [clickTimes, setClickTimes] = useState<number[]>([]);
  const [typedChars, setTypedChars] = useState('');
  const [heroTimeStart, setHeroTimeStart] = useState<number | null>(null);
  const [visitedSections, setVisitedSections] = useState<Set<string>>(new Set());

  // Secret patterns
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  const secretWords = ['klarheit', 'saimor', 'wandel'];

  // Haptic Feedback (Vibration) for mobile
  const triggerHapticFeedback = () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      // Pattern: short-pause-short (celebration pattern)
      navigator.vibrate([50, 30, 50]);
    }
  };

  // Load achievements on mount
  useEffect(() => {
    setAchievements(achievementManager.current.getAll());
    const unsubscribe = achievementManager.current.subscribe(setAchievements);
    return () => { unsubscribe(); };
  }, []);

  // Helper to unlock achievement with haptic feedback
  const unlockAchievement = (id: string) => {
    const achievement = achievementManager.current.unlock(id);
    if (achievement) {
      triggerHapticFeedback();
      setNewAchievement(achievement);
      setTimeout(() => setNewAchievement(null), 5000);
    }
  };

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
  }, [mounted, konamiSequence, typedChars, secretMenuSequence]);

  // === QUADRUPLE CLICK (4x oder mehr - "Klarheitsfunke") ===
  useEffect(() => {
    if (!mounted) return;

    const handleClick = (e: MouseEvent) => {
      const now = Date.now();
      const newClickTimes = [...clickTimes, now].slice(-5);
      setClickTimes(newClickTimes);

      // Quadruple click (4x in 1 second) - "Klarheitsfunke"
      if (newClickTimes.length >= 4) {
        const timeDiff = now - newClickTimes[newClickTimes.length - 4];
        if (timeDiff < 1000) {
          activateKlarheitsfunke(e.clientX, e.clientY);
          unlockAchievement('clarity-spark');
          setClickTimes([]); // Reset
        }
      }
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [mounted, clickTimes]);

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
  }, [mounted]);

  // === TIME-BASED ACHIEVEMENTS (Nachteule/Frühaufsteher) ===
  useEffect(() => {
    if (!mounted) return;

    const checkTimeAchievements = () => {
      const hour = new Date().getHours();

      // Nachteule: 00:00 - 06:00
      if (hour >= 0 && hour < 6) {
        setTimeout(() => {
          unlockAchievement('night-owl');
          setShowMessage('Nachteule entdeckt – Klarheit kennt keine Uhrzeit.');
          setTimeout(() => setShowMessage(''), 4000);
        }, 2000);
      }

      // Frühaufsteher: 05:00 - 07:00
      if (hour >= 5 && hour < 7) {
        setTimeout(() => {
          unlockAchievement('early-bird');
          setShowMessage('Frühaufsteher – der Tag beginnt mit Klarheit.');
          setTimeout(() => setShowMessage(''), 4000);
        }, 2500);
      }
    };

    // Run after hydration
    const timer = setTimeout(checkTimeAchievements, 1000);
    return () => clearTimeout(timer);
  }, [mounted]);

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
              setShowMessage('Du nimmst dir Zeit zum Hinschauen. Genau hier beginnt Klarheit.');
              setTimeout(() => setShowMessage(''), 5000);
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
  }, [mounted, heroTimeStart]);

  // === NEW: "KLARHEITSNAVIGATOR" - Section Visit Tracking ===
  useEffect(() => {
    if (!mounted) return;

    const checkSectionVisits = () => {
      const requiredSections = ['home', 'trust', 'legal'];
      const allVisited = requiredSections.every(s => visitedSections.has(s));

      if (allVisited && !achievementManager.current.getAll().find(a => a.id === 'clarity-navigator' && a.unlocked)) {
        unlockAchievement('clarity-navigator');
        setShowMessage('Du prüfst die Basis. Gute Entscheidungen beginnen mit Transparenz.');
        setTimeout(() => setShowMessage(''), 5000);
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
  }, [mounted, visitedSections]);

  // === TODO: "FELDFORSCHER" - Dashboard View Switch ===
  // Requires Dashboard component integration
  // useEffect(() => {
  //   window.addEventListener('mora-dashboard-view-switch', () => {
  //     unlockAchievement('field-explorer');
  //     setShowMessage('Du betrachtest Systeme aus mehreren Perspektiven. Stark.');
  //     setTimeout(() => setShowMessage(''), 5000);
  //   });
  // }, [mounted]);

  // === LOGO-CLICK TRACKING ===
  useEffect(() => {
    if (!mounted) return;

    let clickCount = 0;
    let resetTimer: NodeJS.Timeout;

    const handleLogoClick = () => {
      clickCount++;
      clearTimeout(resetTimer);

      if (clickCount === 3) {
        unlockAchievement('logo-lover');
        setShowMessage('Logo-Liebhaber – du erkennst die Essenz.');
        createGoldenRain();
        setTimeout(() => setShowMessage(''), 4000);
        clickCount = 0;
      } else {
        // Reset nach 2 Sekunden
        resetTimer = setTimeout(() => {
          clickCount = 0;
        }, 2000);
      }
    };

    window.addEventListener('saimor-logo-click', handleLogoClick);
    return () => {
      window.removeEventListener('saimor-logo-click', handleLogoClick);
      clearTimeout(resetTimer);
    };
  }, [mounted]);

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
        setShowMessage('Scroll-Champion – du hast alles gesehen.');
        createGoldenRain();
        setTimeout(() => setShowMessage(''), 4000);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  // === DURATION TRACKING (5 Minuten) ===
  useEffect(() => {
    if (!mounted) return;

    const timer = setTimeout(() => {
      unlockAchievement('patient-visitor');
      setShowMessage('Geduldiger Entdecker – Zeit ist eine Form von Aufmerksamkeit.');
      createSubtleFireworks();
      setTimeout(() => setShowMessage(''), 5000);
    }, 5 * 60 * 1000); // 5 Minuten

    return () => clearTimeout(timer);
  }, [mounted]);

  // === ACTIVATION FUNCTIONS (REFACTORED) ===

  const activateResonanzMode = () => {
    setResonanzModeActive(true);
    setShowMessage('Du hast einen alten Pfad gefunden. Willkommen im Resonanzmodus.');

    // Subtle golden shimmer effect
    document.body.style.animation = 'goldenShimmer 8s ease-in-out';

    createGoldenRain();

    setTimeout(() => {
      setShowMessage('');
      document.body.style.animation = '';
      setResonanzModeActive(false);
    }, 8000);
  };

  const activateKlarheitsfunke = (x: number, y: number) => {
    setShowMessage('Klarheitsfunke entdeckt.');
    createSubtleParticles(x, y, 15);
    setTimeout(() => setShowMessage(''), 4000);
  };

  const activateShake = () => {
    setShowMessage('Bewegung erkannt – Systeme reagieren.');
    createGoldenRain();
    setTimeout(() => {
      setShowMessage('');
    }, 3000);
  };

  const activateSecretWord = (word: string) => {
    const messages: {[key: string]: string} = {
      'klarheit': 'Klarheit gefunden – sie war immer da.',
      'saimor': 'Saimôr erwacht – Resonanz beginnt.',
      'wandel': 'Wandel beginnt – mit jedem Schritt.'
    };
    setShowMessage(messages[word] || 'Geheimnis entdeckt.');
    createGoldenRain();
    setTimeout(() => setShowMessage(''), 4000);
  };

  // === PARTICLE EFFECTS (REFINED) ===

  const createSubtleParticles = (x: number, y: number, count: number) => {
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
  };

  const createSubtleFireworks = () => {
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const randomX = window.innerWidth * (0.3 + Math.random() * 0.4);
        const randomY = window.innerHeight * (0.3 + Math.random() * 0.4);
        createSubtleParticles(randomX, randomY, 12);
      }, i * 400);
    }
  };

  const createGoldenRain = () => {
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
  };

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
      <AchievementToast
        achievement={newAchievement}
        onClose={() => setNewAchievement(null)}
      />

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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
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
