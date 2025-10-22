'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Heart, Star, Crown, Rocket } from 'lucide-react';
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
  // Achievement System
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);
  const [showAchievementMenu, setShowAchievementMenu] = useState(false);
  const [secretMenuSequence, setSecretMenuSequence] = useState<string[]>([]);
  const achievementManager = useRef(getAchievementManager());

  // Easter Egg States
  const [konamiActivated, setKonamiActivated] = useState(false);
  const [showMessage, setShowMessage] = useState('');
  const [particles, setParticles] = useState<Particle[]>([]);

  // Tracking
  const [konamiSequence, setKonamiSequence] = useState<string[]>([]);
  const [clickTimes, setClickTimes] = useState<number[]>([]);
  const [typedChars, setTypedChars] = useState('');

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
      triggerHapticFeedback(); // 📳 Vibration für Mobile!
      setNewAchievement(achievement);
      setTimeout(() => setNewAchievement(null), 5000);
    }
  };

  // === KONAMI CODE & SECRET WORDS ===
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Konami Code
      const newSequence = [...konamiSequence, e.key].slice(-konamiCode.length);
      setKonamiSequence(newSequence);

      if (JSON.stringify(newSequence) === JSON.stringify(konamiCode)) {
        activateKonami();
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
  }, [konamiSequence, typedChars, secretMenuSequence]);

  // === TRIPLE CLICK ===
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const now = Date.now();
      const newClickTimes = [...clickTimes, now].slice(-5);
      setClickTimes(newClickTimes);

      // Triple click
      if (newClickTimes.length >= 3) {
        const timeDiff = now - newClickTimes[newClickTimes.length - 3];
        if (timeDiff < 1000) {
          activateTripleClick(e.clientX, e.clientY);
          unlockAchievement('triple-click');
        }
      }

      // Click Combo (5 rapid)
      if (newClickTimes.length >= 5) {
        const rapidWindow = now - newClickTimes[0];
        if (rapidWindow < 800) {
          activateClickCombo(e.clientX, e.clientY);
          unlockAchievement('click-combo');
          setClickTimes([]);
        }
      }
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [clickTimes]);

  // === SHAKE DETECTION ===
  useEffect(() => {
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
  }, []);

  // === TIME-BASED ACHIEVEMENTS (Nachteule/Frühaufsteher) ===
  useEffect(() => {
    // Client-only check to prevent hydration mismatch
    if (typeof window === 'undefined') return;

    const checkTimeAchievements = () => {
      const hour = new Date().getHours();

      // Nachteule: 00:00 - 06:00
      if (hour >= 0 && hour < 6) {
        setTimeout(() => {
          unlockAchievement('night-owl');
          setShowMessage('🦉 NACHTEULE ENTDECKT! 🦉');
          setTimeout(() => setShowMessage(''), 3000);
        }, 2000);
      }

      // Frühaufsteher: 05:00 - 07:00
      if (hour >= 5 && hour < 7) {
        setTimeout(() => {
          unlockAchievement('early-bird');
          setShowMessage('🌅 FRÜHAUFSTEHER! 🌅');
          setTimeout(() => setShowMessage(''), 3000);
        }, 2500);
      }
    };

    // Run after hydration
    const timer = setTimeout(checkTimeAchievements, 1000);
    return () => clearTimeout(timer);
  }, []);

  // === LOGO-CLICK TRACKING ===
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let clickCount = 0;
    let resetTimer: NodeJS.Timeout;

    const handleLogoClick = () => {
      clickCount++;
      clearTimeout(resetTimer);

      if (clickCount === 3) {
        unlockAchievement('logo-lover');
        setShowMessage('🎯 LOGO-LIEBHABER! 🎯');
        createParticleExplosion(window.innerWidth / 2, 100, 25);
        setTimeout(() => setShowMessage(''), 3000);
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
  }, []); // No dependencies - use local counter

  // === SCROLL TRACKING ===
  useEffect(() => {
    if (typeof window === 'undefined') return;

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
        setShowMessage('🔄 SCROLL-CHAMPION! 🔄');
        createGoldenRain();
        setTimeout(() => setShowMessage(''), 3000);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // No dependencies - use local flag

  // === DURATION TRACKING (5 Minuten) ===
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const timer = setTimeout(() => {
      unlockAchievement('patient-visitor');
      setShowMessage('⏰ GEDULDIGER ENTDECKER! ⏰');
      if (typeof window !== 'undefined') {
        createFireworks(window.innerWidth / 2, window.innerHeight / 2);
      }
      setTimeout(() => setShowMessage(''), 3000);
    }, 5 * 60 * 1000); // 5 Minuten

    return () => clearTimeout(timer);
  }, []);

  // === ACTIVATION FUNCTIONS ===

  const activateKonami = () => {
    setKonamiActivated(true);
    setShowMessage('🎮 KONAMI CODE ACTIVATED! 🎮');
    document.body.style.animation = 'rainbow 5s linear infinite';
    createMatrixRain();
    createParticleExplosion(window.innerWidth / 2, window.innerHeight / 2, 50);
    setTimeout(() => setShowMessage(''), 4000);
  };

  const activateTripleClick = (x: number, y: number) => {
    setShowMessage('💥 TRIPLE CLICK EXPLOSION! 💥');
    createParticleExplosion(x, y, 30);
    createShockwave(x, y);
    setTimeout(() => setShowMessage(''), 3000);
  };

  const activateShake = () => {
    setShowMessage('🌍 EARTHQUAKE MODE! 🌍');
    document.body.style.animation = 'shake 0.5s ease-in-out 3';
    setTimeout(() => {
      setShowMessage('');
      document.body.style.animation = '';
    }, 2000);
  };

  const activateSecretWord = (word: string) => {
    const messages: {[key: string]: string} = {
      'klarheit': '✨ KLARHEIT GEFUNDEN! ✨',
      'saimor': '🌿 SAIMÔR ERWACHT! 🌿',
      'wandel': '🔄 WANDEL BEGINNT! 🔄'
    };
    setShowMessage(messages[word] || '🎉 SECRET UNLOCKED! 🎉');
    createGoldenRain();
    setTimeout(() => setShowMessage(''), 3000);
  };

  const activateClickCombo = (x: number, y: number) => {
    setShowMessage('🎆 FIREWORKS COMBO! 🎆');
    createFireworks(x, y);
    setTimeout(() => setShowMessage(''), 3000);
  };

  // === PARTICLE EFFECTS ===

  const createParticleExplosion = (x: number, y: number, count: number) => {
    const newParticles: Particle[] = Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const velocity = 5 + Math.random() * 5;
      return {
        id: Date.now() + i,
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        color: ['#D4B483', '#E6C897', '#6B8E5F', '#4A6741'][Math.floor(Math.random() * 4)],
        size: 4 + Math.random() * 8,
        icon: [Sparkles, Star, Heart, Zap][Math.floor(Math.random() * 4)]
      };
    });

    setParticles(prev => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.some(np => np.id === p.id)));
    }, 2000);
  };

  const createFireworks = (x: number, y: number) => {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const randomX = x + (Math.random() - 0.5) * 400;
        const randomY = y + (Math.random() - 0.5) * 300;
        createParticleExplosion(randomX, randomY, 20);
      }, i * 200);
    }
  };

  const createGoldenRain = () => {
    const count = 40;
    const newParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i + 1000,
      x: Math.random() * window.innerWidth,
      y: -20,
      vx: (Math.random() - 0.5) * 2,
      vy: 3 + Math.random() * 4,
      color: '#D4B483',
      size: 6 + Math.random() * 6,
      icon: Crown
    }));

    setParticles(prev => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.some(np => np.id === p.id)));
    }, 3000);
  };

  const createMatrixRain = () => {
    const style = document.createElement('style');
    style.id = 'matrix-rain-style';
    style.textContent = `
      @keyframes matrixDrop {
        0% { transform: translateY(-100%); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(100vh); opacity: 0; }
      }
    `;
    if (!document.getElementById('matrix-rain-style')) {
      document.head.appendChild(style);
    }
  };

  const createShockwave = (x: number, y: number) => {
    const shockwave = document.createElement('div');
    shockwave.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: 0;
      height: 0;
      border: 3px solid #D4B483;
      border-radius: 50%;
      pointer-events: none;
      z-index: 10000;
      animation: shockwaveExpand 1s ease-out forwards;
    `;

    const shockwaveStyle = document.createElement('style');
    shockwaveStyle.textContent = `
      @keyframes shockwaveExpand {
        0% { width: 0; height: 0; margin-left: 0; margin-top: 0; opacity: 1; }
        100% { width: 600px; height: 600px; margin-left: -300px; margin-top: -300px; opacity: 0; }
      }
    `;
    if (!document.querySelector('#shockwave-style')) {
      shockwaveStyle.id = 'shockwave-style';
      document.head.appendChild(shockwaveStyle);
    }

    document.body.appendChild(shockwave);
    setTimeout(() => shockwave.remove(), 1000);
  };

  // Inject animations
  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'easter-egg-animations';
    style.textContent = `
      @keyframes rainbow {
        0% { filter: hue-rotate(0deg) brightness(1.1); }
        100% { filter: hue-rotate(360deg) brightness(1.1); }
      }

      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
      }
    `;
    if (!document.getElementById('easter-egg-animations')) {
      document.head.appendChild(style);
    }
  }, []);

  // Animate particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev =>
        prev.map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy + 0.2 // gravity
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

      {/* Activation Message */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 100 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[10000] pointer-events-none"
          >
            <motion.div
              className="px-8 py-6 rounded-3xl text-center text-2xl md:text-4xl font-bold"
              style={{
                background: 'linear-gradient(135deg, rgba(26, 46, 26, 0.98) 0%, rgba(74, 103, 65, 0.95) 50%, rgba(212, 180, 131, 0.9) 100%)',
                backdropFilter: 'blur(24px)',
                border: '3px solid #D4B483',
                boxShadow: '0 20px 60px rgba(212, 180, 131, 0.5), inset 0 0 40px rgba(255, 255, 255, 0.1)',
                color: '#fff',
                textShadow: '0 2px 8px rgba(0,0,0,0.5), 0 0 20px rgba(212, 180, 131, 0.8)'
              }}
              animate={{
                rotate: [0, -3, 3, -3, 0],
                scale: [1, 1.05, 1, 1.05, 1]
              }}
              transition={{
                duration: 0.6,
                repeat: 2
              }}
            >
              {showMessage}

              {/* Sparkle particles around message */}
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i / 8) * Math.PI * 2;
                const distance = 60;
                return (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      left: `calc(50% + ${Math.cos(angle) * distance}px)`,
                      top: `calc(50% + ${Math.sin(angle) * distance}px)`
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      rotate: [0, 360],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.1
                    }}
                  >
                    <Sparkles className="w-4 h-4 text-[#D4B483]" />
                  </motion.div>
                );
              })}
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
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            transition={{ duration: 2 }}
          >
            <Icon
              className="w-full h-full"
              style={{
                color: particle.color,
                filter: `drop-shadow(0 0 ${particle.size}px ${particle.color})`
              }}
            />
          </motion.div>
        );
      })}

      {/* Matrix Rain Effect (when Konami activated) */}
      {konamiActivated && (
        <div className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-[#D4B483] font-mono text-xs"
              style={{
                left: `${(i / 30) * 100}%`,
                top: -20
              }}
              animate={{
                y: ['0vh', '110vh']
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'linear'
              }}
            >
              {Array.from({ length: 20 }).map((_, j) => (
                <div key={j} style={{ opacity: 0.3 + Math.random() * 0.7 }}>
                  {String.fromCharCode(0x30A0 + Math.random() * 96)}
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      )}

      {/* Secret Hint - AAA for achievements */}
      <motion.div
        className="fixed bottom-20 left-4 z-40 px-3 py-1.5 rounded-full text-xs font-medium bg-black/60 text-white/60 backdrop-blur-sm"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 0.5, x: 0 }}
        transition={{ delay: 5 }}
        whileHover={{ opacity: 1, scale: 1.05 }}
      >
        💡 Press AAA for achievements
      </motion.div>
    </>
  );
}
