'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Sparkles, Star, type LucideIcon } from 'lucide-react';
import {
  getAchievementManager,
  type Achievement,
  type AchievementLocale,
} from '@/lib/achievements';
import { MatomoEvents } from '@/lib/matomo';
import AchievementButton from './AchievementButton';
import AchievementToast from './AchievementToast';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  icon: LucideIcon;
}

interface ResonanceGlyph {
  id: number;
  symbol: string;
  left: number;
  delay: number;
  duration: number;
  size: number;
  drift: number;
}

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

const SECRET_WORDS = ['klarheit'] as const;

const PAGES_VISITED_KEY = 'saimor-pages-visited';
const CORE_PAGES_KEY = 'saimor-core-pages';
const LAST_VISIT_KEY = 'saimor-last-visit';
const RETURN_VISITOR_KEY = 'saimor-return-checked';

function isInteractiveTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;

  return target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
}

function normalizePath(pathname: string): string {
  const normalized = pathname.replace(/^\/(de|en)(?=\/|$)/, '');
  return normalized === '' ? '/' : normalized;
}

function getCorePageBucket(pathname: string): 'home' | 'trust' | 'legal' | null {
  if (pathname === '/') return 'home';
  if (pathname.startsWith('/trust')) return 'trust';
  if (pathname.startsWith('/legal') || pathname.startsWith('/rechtliches')) return 'legal';
  return null;
}

function readStoredSet(key: string): Set<string> {
  if (typeof window === 'undefined') return new Set();

  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
}

function writeStoredSet(key: string, values: Set<string>) {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(key, JSON.stringify(Array.from(values)));
}

export default function EasterEggs() {
  const pathname = usePathname() ?? '/';
  const locale: AchievementLocale = pathname.startsWith('/en') ? 'en' : 'de';
  const achievementManager = useRef(getAchievementManager());
  const prefersReducedMotionRef = useRef(false);
  const keySequenceRef = useRef<string[]>([]);
  const typedCharsRef = useRef('');
  const secretMenuSequenceRef = useRef<string[]>([]);
  const dashboardCardIdsRef = useRef<Set<string>>(new Set());
  const dashboardViewModesRef = useRef<Set<string>>(new Set());
  const heroObserverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const messageTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const achievementTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const konamiTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const logoResetRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const logoClickCountRef = useRef(0);

  const [mounted, setMounted] = useState(false);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);
  const [showMessage, setShowMessage] = useState('');
  const [particles, setParticles] = useState<Particle[]>([]);
  const [resonanceModeActive, setResonanceModeActive] = useState(false);
  const [resonanceGlyphs, setResonanceGlyphs] = useState<ResonanceGlyph[]>([]);

  const copy = locale === 'de'
    ? {
        konami: 'Resonanzmodus aktiviert. Der Code bleibt geheim, die Wirkung nicht.',
        logo: 'Klarheitsfunke freigesetzt.',
        secretMenu: 'Geheimes Archiv geöffnet.',
        clarity: 'Klarheit gefunden. Sie war die ganze Zeit da.',
        hero: 'Du nimmst dir Zeit zum Hinschauen. Genau hier beginnt Klarheit.',
        navigator: 'Du prüfst die Basis. Gute Entscheidungen beginnen mit Transparenz.',
        mora: 'Môra entdeckt. Das semantische Gedächtnis ist offen.',
        demo: 'Demo-Pionier. Erst verstehen, dann entscheiden.',
        docs: 'Sorgfalt zahlt sich aus. Du liest die Details.',
        contact: 'Erstkontakt hergestellt. Der Dialog ist eröffnet.',
        scroll: 'Du hast bis fast zum Ende gelesen.',
        returning: 'Willkommen zurück.',
        field: 'Alle Perspektiven geprüft. Gute Entscheidungen mögen Vielfalt.',
        pattern: 'Muster erkannt. Du verbindest Punkte.',
        diver: 'Tiefe Ansicht geöffnet. Jetzt wird es interessant.',
      }
    : {
        konami: 'Resonance mode activated. The code stays secret, the effect does not.',
        logo: 'Clarity spark released.',
        secretMenu: 'Hidden archive opened.',
        clarity: 'Clarity found. It was there all along.',
        hero: 'You take time to really look. That is where clarity starts.',
        navigator: 'You checked the fundamentals. Good decisions begin with transparency.',
        mora: 'Môra discovered. The semantic memory is open.',
        demo: 'Demo pioneer. Understand first, decide second.',
        docs: 'Thorough work pays off. You read the details.',
        contact: 'First contact made. The conversation is open.',
        scroll: 'You read almost all the way through.',
        returning: 'Welcome back.',
        field: 'All perspectives explored. Good decisions like range.',
        pattern: 'Patterns recognized. You connect the dots.',
        diver: 'Deep view opened. Now it gets interesting.',
      };

  const dismissAchievement = useCallback(() => {
    setNewAchievement(null);
    if (achievementTimeoutRef.current) {
      clearTimeout(achievementTimeoutRef.current);
      achievementTimeoutRef.current = null;
    }
  }, []);

  const showTransientMessage = useCallback((message: string, duration = 3200) => {
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }

    setShowMessage(message);
    messageTimeoutRef.current = setTimeout(() => {
      setShowMessage('');
      messageTimeoutRef.current = null;
    }, duration);
  }, []);

  const triggerHapticFeedback = useCallback(() => {
    if (typeof window === 'undefined' || !('vibrate' in navigator)) return;
    navigator.vibrate([40, 20, 40]);
  }, []);

  const hasAchievementUnlocked = useCallback((id: string) => {
    return achievementManager.current.getAll().some((achievement) => achievement.id === id && achievement.unlocked);
  }, []);

  const unlockAchievement = useCallback((id: string) => {
    const achievement = achievementManager.current.unlock(id);
    if (!achievement) return null;

    triggerHapticFeedback();
    setNewAchievement(achievement);
    MatomoEvents.achievementUnlock(id);

    if (achievementTimeoutRef.current) {
      clearTimeout(achievementTimeoutRef.current);
    }

    achievementTimeoutRef.current = setTimeout(() => {
      setNewAchievement(null);
      achievementTimeoutRef.current = null;
    }, 3600);

    return achievement;
  }, [triggerHapticFeedback]);

  const createParticleBatch = useCallback((nextParticles: Particle[], lifetime = 2600) => {
    setParticles((current) => [...current, ...nextParticles]);

    setTimeout(() => {
      setParticles((current) => current.filter(
        (particle) => !nextParticles.some((nextParticle) => nextParticle.id === particle.id)
      ));
    }, lifetime);
  }, []);

  const createSubtleParticles = useCallback((x: number, y: number, count = 14) => {
    const nextParticles: Particle[] = Array.from({ length: count }, (_, index) => {
      const angle = (index / count) * Math.PI * 2;
      const velocity = 1.8 + Math.random() * 2.2;

      return {
        id: Date.now() + index,
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        color: ['#D4A857', '#E6C897', '#7CBF95'][index % 3],
        size: 4 + Math.random() * 4,
        icon: index % 2 === 0 ? Sparkles : Star,
      };
    });

    createParticleBatch(nextParticles, 2400);
  }, [createParticleBatch]);

  const createGoldenRain = useCallback((count = 16) => {
    if (typeof window === 'undefined') return;

    const nextParticles: Particle[] = Array.from({ length: count }, (_, index) => ({
      id: Date.now() + index + 1000,
      x: Math.random() * window.innerWidth,
      y: -24 - Math.random() * 40,
      vx: (Math.random() - 0.5) * 0.5,
      vy: 1.8 + Math.random() * 2.4,
      color: index % 2 === 0 ? '#D4A857' : '#E6C897',
      size: 4 + Math.random() * 4,
      icon: Crown,
    }));

    createParticleBatch(nextParticles, 3200);
  }, [createParticleBatch]);

  const createSubtleFireworks = useCallback(() => {
    if (typeof window === 'undefined') return;

    for (let index = 0; index < 2; index += 1) {
      setTimeout(() => {
        const x = window.innerWidth * (0.35 + Math.random() * 0.3);
        const y = window.innerHeight * (0.3 + Math.random() * 0.25);
        createSubtleParticles(x, y, 12);
      }, index * 280);
    }
  }, [createSubtleParticles]);

  const buildResonanceGlyphs = useCallback((): ResonanceGlyph[] => {
    const symbols = ['↑', '↓', '←', '→', 'B', 'A', '✦', '◌', '◇', '◦'];

    return Array.from({ length: 14 }, (_, index) => ({
      id: Date.now() + index,
      symbol: symbols[index % symbols.length],
      left: 8 + Math.random() * 84,
      delay: index * 0.12,
      duration: 3.8 + Math.random() * 1.8,
      size: 16 + Math.random() * 14,
      drift: (Math.random() - 0.5) * 36,
    }));
  }, []);

  const activateResonanceMode = useCallback(() => {
    if (resonanceModeActive) return;

    setResonanceModeActive(true);
    setResonanceGlyphs(buildResonanceGlyphs());
    unlockAchievement('konami');
    showTransientMessage(copy.konami, 3600);

    if (!prefersReducedMotionRef.current) {
      createSubtleFireworks();
      createGoldenRain(20);
    }

    if (konamiTimeoutRef.current) {
      clearTimeout(konamiTimeoutRef.current);
    }

    konamiTimeoutRef.current = setTimeout(() => {
      setResonanceModeActive(false);
      setResonanceGlyphs([]);
      konamiTimeoutRef.current = null;
    }, 10000);
  }, [buildResonanceGlyphs, copy.konami, createGoldenRain, createSubtleFireworks, resonanceModeActive, showTransientMessage, unlockAchievement]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = (matches: boolean) => {
      prefersReducedMotionRef.current = matches;
    };

    updatePreference(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      updatePreference(event.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (messageTimeoutRef.current) clearTimeout(messageTimeoutRef.current);
      if (achievementTimeoutRef.current) clearTimeout(achievementTimeoutRef.current);
      if (konamiTimeoutRef.current) clearTimeout(konamiTimeoutRef.current);
      if (logoResetRef.current) clearTimeout(logoResetRef.current);
      if (heroObserverTimerRef.current) clearTimeout(heroObserverTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (isInteractiveTarget(event.target)) return;

      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      keySequenceRef.current = [...keySequenceRef.current, key].slice(-KONAMI_CODE.length);

      if (JSON.stringify(keySequenceRef.current) === JSON.stringify(KONAMI_CODE)) {
        keySequenceRef.current = [];
        activateResonanceMode();
      }

      if (key.length === 1) {
        typedCharsRef.current = `${typedCharsRef.current}${key}`.slice(-24);

        SECRET_WORDS.forEach((word) => {
          if (!typedCharsRef.current.includes(word)) return;

          typedCharsRef.current = '';

          if (word === 'klarheit') {
            unlockAchievement('secret-klarheit');
            showTransientMessage(copy.clarity);
          }

        });
      }

      secretMenuSequenceRef.current = [...secretMenuSequenceRef.current, key].slice(-3);
      if (secretMenuSequenceRef.current.join('') === 'aaa') {
        secretMenuSequenceRef.current = [];
        unlockAchievement('secret-menu');
        showTransientMessage(copy.secretMenu);
        window.dispatchEvent(new CustomEvent('saimor-achievement-menu-open'));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activateResonanceMode, copy.clarity, copy.secretMenu, mounted, showTransientMessage, unlockAchievement]);

  useEffect(() => {
    if (!mounted) return;

    const handleLogoClick = (event: Event) => {
      if (hasAchievementUnlocked('quad_logo')) return;

      logoClickCountRef.current += 1;

      if (logoResetRef.current) {
        clearTimeout(logoResetRef.current);
      }

      logoResetRef.current = setTimeout(() => {
        logoClickCountRef.current = 0;
        logoResetRef.current = null;
      }, 1400);

      if (logoClickCountRef.current < 4) return;

      logoClickCountRef.current = 0;

      const detail = (event as CustomEvent<{ x?: number; y?: number }>).detail;
      const x = detail?.x ?? (typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
      const y = detail?.y ?? (typeof window !== 'undefined' ? window.innerHeight / 3 : 0);

      if (!prefersReducedMotionRef.current) {
        createSubtleParticles(x, y, 16);
      }

      unlockAchievement('quad_logo');
      showTransientMessage(copy.logo);
    };

    window.addEventListener('saimor-logo-click', handleLogoClick as EventListener);
    return () => window.removeEventListener('saimor-logo-click', handleLogoClick as EventListener);
  }, [copy.logo, createSubtleParticles, hasAchievementUnlocked, mounted, showTransientMessage, unlockAchievement]);

  useEffect(() => {
    if (!mounted) return;

    const heroSection = document.querySelector('section[role="banner"]');
    if (!heroSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!heroObserverTimerRef.current && !hasAchievementUnlocked('silent-observer')) {
            heroObserverTimerRef.current = setTimeout(() => {
              unlockAchievement('silent-observer');
              showTransientMessage(copy.hero);
              heroObserverTimerRef.current = null;
            }, 12000);
          }
          return;
        }

        if (heroObserverTimerRef.current) {
          clearTimeout(heroObserverTimerRef.current);
          heroObserverTimerRef.current = null;
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(heroSection);

    return () => {
      observer.disconnect();
      if (heroObserverTimerRef.current) {
        clearTimeout(heroObserverTimerRef.current);
        heroObserverTimerRef.current = null;
      }
    };
  }, [copy.hero, hasAchievementUnlocked, mounted, showTransientMessage, unlockAchievement]);

  useEffect(() => {
    if (!mounted) return;

    const normalizedPath = normalizePath(pathname);
    const visitedPages = readStoredSet(PAGES_VISITED_KEY);
    visitedPages.add(normalizedPath);
    writeStoredSet(PAGES_VISITED_KEY, visitedPages);

    const bucket = getCorePageBucket(normalizedPath);
    if (bucket) {
      const corePages = readStoredSet(CORE_PAGES_KEY);
      corePages.add(bucket);
      writeStoredSet(CORE_PAGES_KEY, corePages);

      if (
        ['home', 'trust', 'legal'].every((page) => corePages.has(page)) &&
        !hasAchievementUnlocked('clarity-navigator')
      ) {
        unlockAchievement('clarity-navigator');
        showTransientMessage(copy.navigator);
      }
    }

    if (normalizedPath.startsWith('/mora') && !hasAchievementUnlocked('mora-explorer')) {
      unlockAchievement('mora-explorer');
      showTransientMessage(copy.mora);
    }

    if (normalizedPath.startsWith('/demo') && !hasAchievementUnlocked('demo-explorer')) {
      unlockAchievement('demo-explorer');
      showTransientMessage(copy.demo);
    }

    if (normalizedPath.startsWith('/docs') && !hasAchievementUnlocked('documentation-reader')) {
      unlockAchievement('documentation-reader');
      showTransientMessage(copy.docs);
    }
  }, [
    copy.demo,
    copy.docs,
    copy.mora,
    copy.navigator,
    hasAchievementUnlocked,
    mounted,
    pathname,
    showTransientMessage,
    unlockAchievement,
  ]);

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

    const now = Date.now();
    const previousVisit = localStorage.getItem(LAST_VISIT_KEY);
    const returnVisitorChecked = sessionStorage.getItem(RETURN_VISITOR_KEY);

    if (previousVisit && !returnVisitorChecked && !hasAchievementUnlocked('return-visitor')) {
      unlockAchievement('return-visitor');
      showTransientMessage(copy.returning);
      sessionStorage.setItem(RETURN_VISITOR_KEY, '1');
    }

    localStorage.setItem(LAST_VISIT_KEY, now.toString());
  }, [copy.returning, hasAchievementUnlocked, mounted, showTransientMessage, unlockAchievement]);

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

    let handled = false;

    const handleScroll = () => {
      if (handled || hasAchievementUnlocked('scroll-champion')) return;

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight < scrollHeight * 0.95) return;

      handled = true;
      unlockAchievement('scroll-champion');
      showTransientMessage(copy.scroll);

      if (!prefersReducedMotionRef.current) {
        createGoldenRain(14);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [
    copy.scroll,
    createGoldenRain,
    hasAchievementUnlocked,
    mounted,
    showTransientMessage,
    unlockAchievement,
  ]);

  useEffect(() => {
    if (!mounted) return;

    const handleContactSubmitted = () => {
      if (hasAchievementUnlocked('first-contact')) return;

      unlockAchievement('first-contact');
      showTransientMessage(copy.contact);

      if (!prefersReducedMotionRef.current) {
        createSubtleFireworks();
      }
    };

    window.addEventListener('saimor-contact-submitted', handleContactSubmitted);
    return () => window.removeEventListener('saimor-contact-submitted', handleContactSubmitted);
  }, [copy.contact, createSubtleFireworks, hasAchievementUnlocked, mounted, showTransientMessage, unlockAchievement]);

  useEffect(() => {
    if (!mounted) return;

    const handleCardVisited = (event: Event) => {
      const metricId = (event as CustomEvent<string>).detail;
      if (!metricId) return;

      dashboardCardIdsRef.current.add(metricId);
      unlockAchievement('mora-explorer');

      if (dashboardCardIdsRef.current.size >= 4 && !hasAchievementUnlocked('pattern-recognizer')) {
        unlockAchievement('pattern-recognizer');
        showTransientMessage(copy.pattern);
      }
    };

    const handleViewSwitch = (event: Event) => {
      const viewMode = (event as CustomEvent<string>).detail;
      if (!viewMode) return;

      dashboardViewModesRef.current.add(viewMode);
      unlockAchievement('mora-explorer');

      if (dashboardViewModesRef.current.size >= 3 && !hasAchievementUnlocked('field-explorer')) {
        unlockAchievement('field-explorer');
        showTransientMessage(copy.field);
      }
    };

    const handleNodeSelect = () => {
      if (hasAchievementUnlocked('deep-diver')) return;
      unlockAchievement('deep-diver');
      showTransientMessage(copy.diver);
    };

    window.addEventListener('mora-dashboard-card-visited', handleCardVisited as EventListener);
    window.addEventListener('mora-dashboard-view-switch', handleViewSwitch as EventListener);
    window.addEventListener('mora-node-select', handleNodeSelect);

    return () => {
      window.removeEventListener('mora-dashboard-card-visited', handleCardVisited as EventListener);
      window.removeEventListener('mora-dashboard-view-switch', handleViewSwitch as EventListener);
      window.removeEventListener('mora-node-select', handleNodeSelect);
    };
  }, [
    copy.diver,
    copy.field,
    copy.pattern,
    hasAchievementUnlocked,
    mounted,
    showTransientMessage,
    unlockAchievement,
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((current) => {
        if (current.length === 0) return current;

        return current.map((particle) => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          vy: particle.vy + 0.15,
        }));
      });
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <AchievementToast achievement={newAchievement} onClose={dismissAchievement} locale={locale} />
      <AchievementButton />

      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="pointer-events-none fixed bottom-24 left-1/2 z-[10000] -translate-x-1/2"
          >
            <motion.div
              className="max-w-md rounded-2xl px-6 py-4 text-center text-sm font-medium md:text-base"
              style={{
                background: 'linear-gradient(135deg, rgba(24, 48, 33, 0.95) 0%, rgba(92, 126, 88, 0.92) 100%)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(212, 180, 131, 0.45)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.28)',
                color: '#fff',
              }}
              animate={{ scale: [1, 1.015, 1] }}
              transition={{ duration: 1.8 }}
            >
              {showMessage}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {particles.map((particle) => {
        const Icon = particle.icon;

        return (
          <motion.div
            key={particle.id}
            className="fixed z-[9999] pointer-events-none"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
            }}
            initial={{ opacity: 0.9, scale: 1 }}
            animate={{ opacity: 0, scale: 0.2 }}
            transition={{ duration: 2.6, ease: 'easeOut' }}
          >
            <Icon
              className="h-full w-full"
              style={{
                color: particle.color,
                filter: `drop-shadow(0 0 ${particle.size * 0.5}px ${particle.color})`,
              }}
            />
          </motion.div>
        );
      })}

      <AnimatePresence>
        {resonanceModeActive && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-[9998] overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle at 50% 45%, rgba(212, 180, 131, 0.12) 0%, rgba(16, 24, 20, 0.08) 45%, transparent 72%)',
              }}
              animate={{ opacity: [0.45, 0.7, 0.45] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />

            <motion.div
              className="absolute inset-x-[12%] top-16 h-px"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(212, 180, 131, 0.55), transparent)',
              }}
              animate={{ opacity: [0.2, 0.8, 0.2], scaleX: [0.92, 1, 0.92] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />

            <motion.div
              className="absolute inset-x-[12%] bottom-16 h-px"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(124, 191, 149, 0.45), transparent)',
              }}
              animate={{ opacity: [0.15, 0.5, 0.15], scaleX: [1, 0.94, 1] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            />

            {resonanceGlyphs.map((glyph) => (
              <motion.div
                key={glyph.id}
                className="absolute top-[-10%] text-[#D4A857]/70"
                style={{
                  left: `${glyph.left}%`,
                  fontSize: glyph.size,
                  textShadow: '0 0 12px rgba(212, 180, 131, 0.35)',
                }}
                initial={{ opacity: 0, y: '-10vh', x: 0 }}
                animate={{
                  opacity: [0, 0.65, 0],
                  y: ['0vh', '120vh'],
                  x: [0, glyph.drift, glyph.drift * 0.4],
                }}
                transition={{
                  duration: glyph.duration,
                  delay: glyph.delay,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                {glyph.symbol}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
