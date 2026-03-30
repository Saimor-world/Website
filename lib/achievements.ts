export type AchievementLocale = 'de' | 'en';
export type AchievementCategory = 'signal' | 'path' | 'depth' | 'hidden';

interface LocalizedAchievementCopy {
  de: string;
  en: string;
}

export interface AchievementDefinition {
  id: string;
  category: AchievementCategory;
  title: LocalizedAchievementCopy;
  description: LocalizedAchievementCopy;
  icon: string;
  secret: boolean;
}

export interface Achievement extends AchievementDefinition {
  unlocked: boolean;
  unlockedAt?: number;
}

interface SavedAchievementState {
  id: string;
  unlocked?: boolean;
  unlockedAt?: number;
}

const STORAGE_KEY = 'saimor-achievements';

const CATEGORY_LABELS: Record<AchievementCategory, LocalizedAchievementCopy> = {
  signal: { de: 'Signal', en: 'Signal' },
  path: { de: 'Pfad', en: 'Path' },
  depth: { de: 'Tiefe', en: 'Depth' },
  hidden: { de: 'Verborgen', en: 'Hidden' },
};

export const ACHIEVEMENT_CATEGORY_ORDER: AchievementCategory[] = [
  'signal',
  'path',
  'depth',
  'hidden',
];

function achievement(
  id: string,
  category: AchievementCategory,
  titleDE: string,
  titleEN: string,
  descriptionDE: string,
  descriptionEN: string,
  icon: string,
  secret: boolean
): AchievementDefinition {
  return {
    id,
    category,
    title: {
      de: titleDE,
      en: titleEN,
    },
    description: {
      de: descriptionDE,
      en: descriptionEN,
    },
    icon,
    secret,
  };
}

export const ACHIEVEMENTS: AchievementDefinition[] = [
  achievement(
    'konami',
    'hidden',
    'Override',
    'Override',
    'Du hast die verborgene Resonanzschicht aktiviert und die Oberfläche kurz in einen anderen Zustand versetzt.',
    'You activated the hidden resonance layer and briefly shifted the interface into a different state.',
    '◈',
    false
  ),
  achievement(
    'quad_logo',
    'hidden',
    'Mark Study',
    'Mark Study',
    'Das Zeichen oft genug geprüft, um die zweite Ebene darunter zu finden.',
    'You studied the mark closely enough to find the second layer beneath it.',
    '◌',
    true
  ),
  achievement(
    'silent-observer',
    'signal',
    'Stillness',
    'Stillness',
    'Du hast dir Zeit genommen, bevor du weitergegangen bist.',
    'You took a moment before moving on.',
    '◐',
    true
  ),
  achievement(
    'clarity-navigator',
    'path',
    'Orientation',
    'Orientation',
    'Home, Trust und Legal gelesen. Erst Kontext, dann Entscheidung.',
    'You read Home, Trust, and Legal. Context first, decision second.',
    '△',
    true
  ),
  achievement(
    'secret-klarheit',
    'hidden',
    'Signal Phrase',
    'Signal Phrase',
    'Das richtige Wort am richtigen Ort.',
    'The right word in the right place.',
    '∴',
    true
  ),
  achievement(
    'secret-menu',
    'hidden',
    'Archive Access',
    'Archive Access',
    'Das verborgene Log geöffnet, ohne dass es dir gezeigt wurde.',
    'You opened the hidden log without being shown where it was.',
    '⋄',
    true
  ),
  achievement(
    'scroll-champion',
    'signal',
    'Full Pass',
    'Full Pass',
    'Du bist bis fast zum Ende gegangen und hast den Kontext vollständig mitgenommen.',
    'You went almost all the way through and took in the full context.',
    '↧',
    true
  ),
  achievement(
    'field-explorer',
    'depth',
    'Multi-View',
    'Multi-View',
    'Alle drei Perspektiven im Môra-Dashboard aktiviert.',
    'You activated all three perspectives in the Môra dashboard.',
    '◫',
    true
  ),
  achievement(
    'return-visitor',
    'signal',
    'Re-entry',
    'Re-entry',
    'Du bist nicht nur vorbeigekommen, sondern zurückgekehrt.',
    'You did not just stop by, you returned.',
    '↺',
    true
  ),
  achievement(
    'mora-explorer',
    'depth',
    'Semantic Layer',
    'Semantic Layer',
    'Môra geöffnet und den semantischen Layer betreten.',
    'You opened Môra and stepped into the semantic layer.',
    '◎',
    false
  ),
  achievement(
    'deep-diver',
    'depth',
    'Detail Layer',
    'Detail Layer',
    'Von der Übersicht in eine tiefe Ansicht gewechselt.',
    'You moved from the overview into a deeper view.',
    '⊙',
    true
  ),
  achievement(
    'pattern-recognizer',
    'depth',
    'Pattern Map',
    'Pattern Map',
    'Genug Signale verbunden, um Muster sichtbar zu machen.',
    'You connected enough signals to make patterns visible.',
    '◬',
    true
  ),
  achievement(
    'curiosity-driven',
    'path',
    'Command Access',
    'Command Access',
    'Die schnelle Navigation statt des offensichtlichen Wegs gewählt.',
    'You chose the fast route instead of the obvious one.',
    '⌘',
    false
  ),
  achievement(
    'first-contact',
    'path',
    'Open Channel',
    'Open Channel',
    'Den Dialog nicht nur gelesen, sondern begonnen.',
    'You did not just read the dialogue, you started it.',
    '↗',
    false
  ),
  achievement(
    'demo-explorer',
    'path',
    'Live Preview',
    'Live Preview',
    'Die Vorschau geöffnet, statt nur über Möglichkeiten zu lesen.',
    'You opened the preview instead of only reading about the possibilities.',
    '□',
    false
  ),
  achievement(
    'documentation-reader',
    'path',
    'Reference Check',
    'Reference Check',
    'Die Referenz geprüft, statt an der Oberfläche stehenzubleiben.',
    'You checked the reference instead of staying at the surface.',
    '▣',
    true
  ),
];

function cloneAchievement(achievement: Achievement): Achievement {
  return {
    ...achievement,
    title: { ...achievement.title },
    description: { ...achievement.description },
  };
}

function hydrateAchievements(savedStates: SavedAchievementState[] = []): Achievement[] {
  return ACHIEVEMENTS.map((definition) => {
    const savedState = savedStates.find((entry) => entry.id === definition.id);

    return {
      ...definition,
      title: { ...definition.title },
      description: { ...definition.description },
      unlocked: savedState?.unlocked === true,
      unlockedAt: savedState?.unlockedAt,
    };
  });
}

function serializeAchievements(achievements: Achievement[]): SavedAchievementState[] {
  return achievements.map(({ id, unlocked, unlockedAt }) => ({
    id,
    unlocked,
    unlockedAt,
  }));
}

export function getAchievementTitle(
  achievement: Achievement,
  locale: AchievementLocale = 'de'
): string {
  return achievement.title[locale];
}

export function getAchievementDescription(
  achievement: Achievement,
  locale: AchievementLocale = 'de'
): string {
  return achievement.description[locale];
}

export function getAchievementCategoryLabel(
  category: AchievementCategory,
  locale: AchievementLocale = 'de'
): string {
  return CATEGORY_LABELS[category][locale];
}

export class AchievementManager {
  private achievements: Achievement[] = [];
  private listeners: Set<(achievements: Achievement[]) => void> = new Set();

  constructor() {
    this.load();
  }

  private load() {
    if (typeof window === 'undefined') return;

    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (!saved) {
        this.achievements = hydrateAchievements();
        return;
      }

      const savedAchievements = JSON.parse(saved) as SavedAchievementState[];
      this.achievements = hydrateAchievements(savedAchievements);
    } catch (error) {
      console.error('Failed to load achievements:', error);
      this.achievements = hydrateAchievements();
    }
  }

  private save() {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(serializeAchievements(this.achievements)));
    } catch (error) {
      console.error('Failed to save achievements:', error);
    }
  }

  unlock(id: string): Achievement | null {
    const achievement = this.achievements.find((entry) => entry.id === id);
    if (!achievement || achievement.unlocked) return null;

    achievement.unlocked = true;
    achievement.unlockedAt = Date.now();

    this.save();
    this.notifyListeners();
    return cloneAchievement(achievement);
  }

  getAll(): Achievement[] {
    return this.achievements.map(cloneAchievement);
  }

  getUnlocked(): Achievement[] {
    return this.achievements.filter((achievement) => achievement.unlocked).map(cloneAchievement);
  }

  getProgress(): { unlocked: number; total: number; percentage: number } {
    const total = this.achievements.length;
    const unlocked = this.achievements.filter((achievement) => achievement.unlocked).length;

    return {
      unlocked,
      total,
      percentage: total === 0 ? 0 : Math.round((unlocked / total) * 100),
    };
  }

  subscribe(listener: (achievements: Achievement[]) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners() {
    const snapshot = this.getAll();
    this.listeners.forEach((listener) => listener(snapshot));
  }

  reset() {
    this.achievements = hydrateAchievements();
    this.save();
    this.notifyListeners();
  }
}

let instance: AchievementManager | null = null;

export function getAchievementManager(): AchievementManager {
  if (!instance) {
    instance = new AchievementManager();
  }

  return instance;
}
