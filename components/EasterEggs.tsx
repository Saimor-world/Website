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
const RESONANCE_DURATION = 14000;

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
  const konamiMenuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const logoResetRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const logoClickCountRef = useRef(0);

  const [mounted, setMounted] = useState(false);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);
  const [showMessage, setShowMessage] = useState('');
  const [particles, setParticles] = useState<Particle[]>([]);
  const [resonanceModeActive, setResonanceModeActive] = useState(false);
  const [resonanceGlyphs, setResonanceGlyphs] = useState<ResonanceGlyph[]>([]);
  const [resonancePulseSeed, setResonancePulseSeed] = useState(0);
  const [discoveryProgress, setDiscoveryProgress] = useState(() => achievementManager.current.getProgress());
  const [explorationStats, setExplorationStats] = useState({ pages: 0, views: 0, cards: 0 });

  const copy = locale === 'de'
    ? {
        konami: 'Resonanzschicht aktiv. Die Oberfläche zeigt für einen Moment ihre zweite Ebene.',
        logo: 'Markierung erkannt. Zweite Ebene freigelegt.',
        secretMenu: 'Archivzugang geöffnet.',
        clarity: 'Signalphrase erkannt.',
        hero: 'Aufmerksamkeit registriert.',
        navigator: 'Orientierung vollständig.',
        mora: 'Semantik-Layer geöffnet.',
        demo: 'Live-Vorschau geladen.',
        docs: 'Referenzpfad geöffnet.',
        contact: 'Kanal geöffnet.',
        command: 'Schnellzugang erkannt.',
        scroll: 'Vollständiger Durchgang erkannt.',
        returning: 'Wiederkehr erkannt.',
        field: 'Mehrfachansicht vollständig.',
        pattern: 'Musterverdichtung erkannt.',
        diver: 'Tiefe Ansicht aktiv.',
        resonanceLabel: 'Resonanzschicht',
        resonanceTitle: 'Override aktiv',
        resonanceBody: 'Die Seite blendet kurz ihre zweite Ebene ein. Das Entdeckungslog wird erweitert und die Signale werden sichtbarer.',
        resonanceCode: 'Sequenz erkannt',
        resonancePrompt: 'AAA öffnet das Log sofort.',
        metrics: {
          log: 'Log',
          pages: 'Seiten',
          depth: 'Tiefe',
          window: 'Fenster',
          windowValue: '14s',
        },
      }
    : {
        konami: 'Resonance layer active. The interface is showing its second state for a moment.',
        logo: 'Mark detected. Second layer revealed.',
        secretMenu: 'Archive access opened.',
        clarity: 'Signal phrase detected.',
        hero: 'Attention registered.',
        navigator: 'Orientation complete.',
        mora: 'Semantic layer opened.',
        demo: 'Live preview loaded.',
        docs: 'Reference path opened.',
        contact: 'Channel opened.',
        command: 'Command access detected.',
        scroll: 'Full pass registered.',
        returning: 'Return visit detected.',
        field: 'Multi-view complete.',
        pattern: 'Pattern density detected.',
        diver: 'Deep view active.',
        resonanceLabel: 'Resonance Layer',
        resonanceTitle: 'Override Active',
        resonanceBody: 'The site briefly exposes its second layer. The discovery log expands and signals become easier to spot.',
        resonanceCode: 'Sequence detected',
        resonancePrompt: 'AAA opens the log instantly.',
        metrics: {
          log: 'Log',
          pages: 'Pages',
          depth: 'Depth',
          window: 'Window',
          windowValue: '14s',
        },
      };

  const dismissAchievement = useCallback(() => {
    setNewAchievement(null);
    if (achievementTimeoutRef.current) {
      clearTimeout(achievementTimeoutRef.current);
      achievementTimeoutRef.current = null;
    }
  }, []);

  const updateDiscoveryProgress = useCallback(() => {
    setDiscoveryProgress(achievementManager.current.getProgress());
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

    updateDiscoveryProgress();
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
  }, [triggerHapticFeedback, updateDiscoveryProgress]);

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
        color: ['#D6A848', '#75C6A0', '#689EFF'][index % 3],
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
      color: index % 2 === 0 ? '#D6A848' : '#E2C88D',
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
    const symbols = ['↑', '↓', '←', '→', 'A', 'B', '◈', '◎', '⊙', '△'];

    return Array.from({ length: 18 }, (_, index) => ({
      id: Date.now() + index,
      symbol: symbols[index % symbols.length],
      left: 6 + Math.random() * 88,
      delay: index * 0.1,
      duration: 4.2 + Math.random() * 2.4,
      size: 15 + Math.random() * 18,
      drift: (Math.random() - 0.5) * 42,
    }));
  }, []);

  const activateResonanceMode = useCallback(() => {
    const firstUnlock = unlockAchievement('konami');

    setResonanceModeActive(true);
    setResonancePulseSeed((current) => current + 1);
    setResonanceGlyphs(buildResonanceGlyphs());
    showTransientMessage(copy.konami, 4200);

    if (!prefersReducedMotionRef.current && typeof window !== 'undefined') {
      createSubtleFireworks();
      createGoldenRain(24);
      createSubtleParticles(window.innerWidth / 2, window.innerHeight * 0.42, 18);
    }

    if (firstUnlock && typeof window !== 'undefined') {
      if (konamiMenuTimeoutRef.current) {
        clearTimeout(konamiMenuTimeoutRef.current);
      }

      konamiMenuTimeoutRef.current = setTimeout(() => {
        window.dispatchEvent(new CustomEvent('saimor-achievement-menu-open'));
        konamiMenuTimeoutRef.current = null;
      }, 900);
    }

    if (konamiTimeoutRef.current) {
      clearTimeout(konamiTimeoutRef.current);
    }

    konamiTimeoutRef.current = setTimeout(() => {
      setResonanceModeActive(false);
      setResonanceGlyphs([]);
      konamiTimeoutRef.current = null;
    }, RESONANCE_DURATION);
  }, [
    buildResonanceGlyphs,
    copy.konami,
    createGoldenRain,
    createSubtleFireworks,
    createSubtleParticles,
    showTransientMessage,
    unlockAchievement,
  ]);

  useEffect(() => {
    setMounted(true);
    updateDiscoveryProgress();
  }, [updateDiscoveryProgress]);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    if (resonanceModeActive) {
      document.documentElement.dataset.saimorResonance = 'active';
      return () => {
        delete document.documentElement.dataset.saimorResonance;
      };
    }

    delete document.documentElement.dataset.saimorResonance;
    return undefined;
  }, [resonanceModeActive]);

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
      if (konamiMenuTimeoutRef.current) clearTimeout(konamiMenuTimeoutRef.current);
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

    const handleCommandPaletteUsed = () => {
      if (hasAchievementUnlocked('curiosity-driven')) return;

      unlockAchievement('curiosity-driven');
      showTransientMessage(copy.command);
    };

    window.addEventListener('saimor-command-palette-used', handleCommandPaletteUsed);
    return () => window.removeEventListener('saimor-command-palette-used', handleCommandPaletteUsed);
  }, [copy.command, hasAchievementUnlocked, mounted, showTransientMessage, unlockAchievement]);

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
    setExplorationStats((current) => ({ ...current, pages: visitedPages.size }));

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
      setExplorationStats((current) => ({ ...current, cards: dashboardCardIdsRef.current.size }));
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
      setExplorationStats((current) => ({ ...current, views: dashboardViewModesRef.current.size }));
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

  const resonanceMetrics = [
    { label: copy.metrics.log, value: `${discoveryProgress.unlocked}/${discoveryProgress.total}` },
    { label: copy.metrics.pages, value: `${explorationStats.pages}` },
    { label: copy.metrics.depth, value: `${Math.max(explorationStats.views, explorationStats.cards)}` },
    { label: copy.metrics.window, value: copy.metrics.windowValue },
  ];

  return (
    <>
      <style jsx global>{`
        html[data-saimor-resonance='active'] body {
          background-image:
            radial-gradient(circle at 20% 10%, rgba(214, 168, 72, 0.08), transparent 26%),
            radial-gradient(circle at 82% 2%, rgba(104, 158, 255, 0.07), transparent 28%);
        }

        html[data-saimor-resonance='active'] ::selection {
          background: rgba(214, 168, 72, 0.26);
          color: #ffffff;
        }

        html[data-saimor-resonance='active'] a,
        html[data-saimor-resonance='active'] button {
          transition:
            box-shadow 220ms ease,
            border-color 220ms ease,
            transform 220ms ease;
        }

        html[data-saimor-resonance='active'] a:hover,
        html[data-saimor-resonance='active'] button:hover {
          box-shadow:
            0 0 0 1px rgba(214, 168, 72, 0.18),
            0 0 34px rgba(104, 158, 255, 0.1);
        }
      `}</style>

      <AchievementToast achievement={newAchievement} onClose={dismissAchievement} locale={locale} />
      <AchievementButton />

      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="pointer-events-none fixed bottom-24 left-1/2 z-[10000] -translate-x-1/2"
          >
            <motion.div
              className="max-w-md rounded-[22px] px-6 py-4 text-center text-sm font-medium md:text-base"
              style={{
                background: 'linear-gradient(180deg, rgba(9, 16, 27, 0.96) 0%, rgba(14, 24, 38, 0.94) 100%)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 12px 36px rgba(0, 0, 0, 0.28)',
                color: '#fff',
              }}
              animate={{ scale: [1, 1.012, 1] }}
              transition={{ duration: 1.6 }}
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
            className="pointer-events-none fixed z-[9999]"
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
            className="pointer-events-none fixed inset-0 z-[9997] overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle at 50% 45%, rgba(214, 168, 72, 0.12) 0%, rgba(30, 42, 68, 0.1) 36%, transparent 72%)',
              }}
              animate={{ opacity: [0.42, 0.72, 0.42] }}
              transition={{ duration: 2.3, repeat: Infinity, ease: 'easeInOut' }}
            />

            <motion.div
              key={`ring-${resonancePulseSeed}`}
              className="absolute left-1/2 top-[44%] h-[42vmin] w-[42vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border"
              style={{ borderColor: 'rgba(214, 168, 72, 0.2)' }}
              initial={{ opacity: 0.65, scale: 0.72 }}
              animate={{ opacity: 0, scale: 1.45 }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeOut' }}
            />

            <motion.div
              className="absolute left-1/2 top-[44%] h-[52vmin] w-[52vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border"
              style={{ borderColor: 'rgba(117, 198, 160, 0.14)' }}
              animate={{ opacity: [0.1, 0.32, 0.1], scale: [0.96, 1.04, 0.96] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
            />

            <motion.div
              className="absolute inset-x-[10%] top-16 h-px"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(214, 168, 72, 0.55), transparent)',
              }}
              animate={{ opacity: [0.18, 0.82, 0.18], scaleX: [0.92, 1, 0.92] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />

            <motion.div
              className="absolute inset-x-[10%] bottom-16 h-px"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(104, 158, 255, 0.4), transparent)',
              }}
              animate={{ opacity: [0.14, 0.48, 0.14], scaleX: [1, 0.95, 1] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            />

            <motion.div
              key={`panel-${resonancePulseSeed}`}
              className="absolute left-4 top-4 w-[min(24rem,calc(100vw-2rem))] rounded-[28px] border px-5 py-5 md:left-6 md:top-6"
              style={{
                background: 'linear-gradient(180deg, rgba(7, 12, 20, 0.9) 0%, rgba(13, 22, 36, 0.78) 100%)',
                borderColor: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(22px)',
                boxShadow: '0 18px 48px rgba(0, 0, 0, 0.28)',
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32, ease: 'easeOut' }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/46">
                {copy.resonanceLabel}
              </p>
              <div className="mt-3 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold text-white">
                    {copy.resonanceTitle}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/62">
                    {copy.resonanceBody}
                  </p>
                </div>
                <div
                  className="flex h-12 min-w-[3rem] items-center justify-center rounded-full px-3 text-lg font-semibold text-white"
                  style={{
                    background: 'rgba(214, 168, 72, 0.14)',
                    border: '1px solid rgba(214, 168, 72, 0.2)',
                  }}
                >
                  {discoveryProgress.unlocked}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                {resonanceMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-[18px] border border-white/8 bg-white/5 px-3 py-3"
                  >
                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/38">{metric.label}</p>
                    <p className="mt-1 text-lg font-semibold text-white">{metric.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="absolute right-6 top-6 hidden rounded-[24px] border border-white/10 bg-[#090f19]/70 px-4 py-4 md:block"
              style={{ backdropFilter: 'blur(18px)' }}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.28, ease: 'easeOut', delay: 0.1 }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/42">
                {copy.resonanceCode}
              </p>
              <p className="mt-2 font-mono text-sm tracking-[0.34em] text-white/78">
                ↑ ↑ ↓ ↓ ← → ← → B A
              </p>
              <p className="mt-3 text-xs text-white/42">
                {copy.resonancePrompt}
              </p>
            </motion.div>

            {resonanceGlyphs.map((glyph) => (
              <motion.div
                key={glyph.id}
                className="absolute top-[-10%] text-[#D6A848]/70"
                style={{
                  left: `${glyph.left}%`,
                  fontSize: glyph.size,
                  textShadow: '0 0 12px rgba(214, 168, 72, 0.35)',
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
