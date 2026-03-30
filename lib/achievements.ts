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
    'Ueberlagerung',
    'Overlay',
    'Die verborgene Resonanzschicht aktiviert und die Oberflaeche kurz in ihren zweiten Zustand versetzt.',
    'You activated the hidden resonance layer and briefly shifted the interface into its second state.',
    '◈',
    false
  ),
  achievement(
    'quad_logo',
    'hidden',
    'Zeichenstudie',
    'Mark Study',
    'Das Zeichen genau genug gelesen, um die zweite Ebene darunter zu finden.',
    'You studied the mark closely enough to find the second layer beneath it.',
    '◌',
    true
  ),
  achievement(
    'silent-observer',
    'signal',
    'Stille',
    'Stillness',
    'Nicht sofort weitergegangen, sondern erst wahrgenommen.',
    'You took a moment before moving on.',
    '◐',
    true
  ),
  achievement(
    'clarity-navigator',
    'path',
    'Orientierung',
    'Orientation',
    'Home, Trust und Legal gelesen. Erst Kontext, dann Richtung.',
    'You read Home, Trust, and Legal. Context first, decision second.',
    '△',
    true
  ),
  achievement(
    'secret-klarheit',
    'hidden',
    'Signalwort',
    'Signal Word',
    'Das richtige Wort an der richtigen Stelle hinterlassen.',
    'You left the right word in the right place.',
    '∴',
    true
  ),
  achievement(
    'secret-menu',
    'hidden',
    'Archivzugang',
    'Archive Access',
    'Das verborgene Log geoeffnet, ohne dass es dir gezeigt wurde.',
    'You opened the hidden log without being shown where it was.',
    '⋄',
    true
  ),
  achievement(
    'scroll-champion',
    'signal',
    'Durchgang',
    'Full Pass',
    'Bis fast zum Ende gegangen und den Zusammenhang komplett mitgenommen.',
    'You went almost all the way through and took in the full context.',
    '↧',
    true
  ),
  achievement(
    'field-explorer',
    'depth',
    'Mehrfachansicht',
    'Multi View',
    'Alle drei Perspektiven im Môra-Dashboard aktiviert.',
    'You activated all three perspectives in the Môra dashboard.',
    '◫',
    true
  ),
  achievement(
    'return-visitor',
    'signal',
    'Wiederkehr',
    'Return',
    'Nicht nur vorbeigekommen, sondern bewusst zurueckgekehrt.',
    'You did not just stop by, you deliberately returned.',
    '↺',
    true
  ),
  achievement(
    'mora-explorer',
    'depth',
    'Semantische Ebene',
    'Semantic Layer',
    'Môra geoeffnet und in die semantische Ebene eingetreten.',
    'You opened Môra and stepped into the semantic layer.',
    '◎',
    false
  ),
  achievement(
    'deep-diver',
    'depth',
    'Tiefenansicht',
    'Depth View',
    'Von der Uebersicht in eine tiefere Ansicht gewechselt.',
    'You moved from the overview into a deeper view.',
    '⊙',
    true
  ),
  achievement(
    'pattern-recognizer',
    'depth',
    'Musterkarte',
    'Pattern Map',
    'Genug Signale verbunden, um ein Muster lesbar zu machen.',
    'You connected enough signals to make a pattern readable.',
    '◬',
    true
  ),
  achievement(
    'curiosity-driven',
    'path',
    'Schnellzugang',
    'Command Access',
    'Die direkte Navigation statt des offensichtlichen Wegs genutzt.',
    'You chose the direct route instead of the obvious one.',
    '⌘',
    false
  ),
  achievement(
    'first-contact',
    'path',
    'Offener Kanal',
    'Open Channel',
    'Den Dialog nicht nur gelesen, sondern geoeffnet.',
    'You did not just read the dialogue, you opened it.',
    '↗',
    false
  ),
  achievement(
    'demo-explorer',
    'path',
    'Vorschau',
    'Preview',
    'Die Vorschau geoeffnet, statt nur ueber Moeglichkeiten zu lesen.',
    'You opened the preview instead of only reading about the possibilities.',
    '□',
    false
  ),
  achievement(
    'documentation-reader',
    'path',
    'Referenz',
    'Reference',
    'Die Referenz geprueft, statt an der Oberflaeche stehenzubleiben.',
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
