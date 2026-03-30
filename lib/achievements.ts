export type AchievementLocale = 'de' | 'en';

interface LocalizedAchievementCopy {
  de: string;
  en: string;
}

export interface AchievementDefinition {
  id: string;
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

function achievement(
  id: string,
  titleDE: string,
  titleEN: string,
  descriptionDE: string,
  descriptionEN: string,
  icon: string,
  secret: boolean
): AchievementDefinition {
  return {
    id,
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
    'Retro-Gamer',
    'Retro Gamer',
    'Du hast den berühmten Konami-Code entdeckt. Die 80er Jahre grüßen!',
    'You discovered the famous Konami code. The 80s say hello!',
    '🕹️',
    false
  ),
  achievement(
    'quad_logo',
    'Logo-Detektiv',
    'Logo Detective',
    'Vier Mal das Logo angeklickt? Du siehst wirklich genau hin!',
    'Clicked the logo four times? You really pay attention!',
    '🕵️',
    true
  ),
  achievement(
    'silent-observer',
    'Geduldiger Betrachter',
    'Patient Observer',
    'Du hast dir 12 Sekunden Zeit genommen, die Hero-Section zu betrachten. Schön langsam.',
    'You took 12 seconds to look at the hero section. Nice and slow.',
    '🧘',
    true
  ),
  achievement(
    'clarity-navigator',
    'Explorer',
    'Explorer',
    'Du hast dir alle wichtigen Seiten angeschaut: Home, Trust und Legal. Gründlich!',
    'You visited all important pages: Home, Trust and Legal. Thorough!',
    '🗺️',
    true
  ),
  achievement(
    'secret-klarheit',
    'Wortspiel',
    'Word Game',
    'Du hast "Klarheit" getippt. Wortspiele sind unser Ding!',
    'You typed "Klarheit". Word games are our thing!',
    '🎯',
    true
  ),
  achievement(
    'secret-menu',
    'Tastenakrobat',
    'Key Acrobat',
    'Du hast AAA getippt und das geheime Menü gefunden. Geschickt!',
    'You typed AAA and found the secret menu. Clever!',
    '🎪',
    true
  ),
  achievement(
    'scroll-champion',
    'Leseratte',
    'Bookworm',
    'Du hast die Seite zu 95% gescrollt. Du liest wirklich alles!',
    'You scrolled 95% of the page. You really read everything!',
    '📖',
    true
  ),
  achievement(
    'field-explorer',
    'Vielseitig',
    'Versatile',
    'Du hast alle drei Dashboard-Ansichten ausprobiert. Neugierig!',
    'You tried all three dashboard views. Curious!',
    '🔭',
    true
  ),
  achievement(
    'return-visitor',
    'Wiederholungstäter',
    'Repeat Visitor',
    'Du bist schon einmal hier gewesen. Schön, dich wiederzusehen!',
    'You have been here before. Nice to see you again!',
    '🔁',
    true
  ),
  achievement(
    'mora-explorer',
    'Môra-Fan',
    'Môra Fan',
    'Du hast Môra besucht und ausprobiert. Willkommen im Club!',
    'You visited Môra and tried it out. Welcome to the club!',
    '🌟',
    false
  ),
  achievement(
    'deep-diver',
    'Tiefgang',
    'Deep Diver',
    'Du hast in die Detailansicht von Môra hineingezoomt. Du gehst tief!',
    'You opened Môra detail views. You go deep!',
    '🌊',
    true
  ),
  achievement(
    'pattern-recognizer',
    'Muster-Experte',
    'Pattern Expert',
    'Du hast mehrere Dashboard-Karten erkundet. Du siehst Muster!',
    'You explored multiple dashboard cards. You see patterns!',
    '🧩',
    true
  ),
  achievement(
    'curiosity-driven',
    'Neugierig',
    'Curious',
    'Du hast die Command Palette ausprobiert. Techie!',
    'You tried the command palette. Techie!',
    '🧐',
    false
  ),
  achievement(
    'first-contact',
    'Erster Kontakt',
    'First Contact',
    'Du hast dich über das Kontaktformular gemeldet. Wir freuen uns!',
    'You contacted us via the contact form. We are excited!',
    '📞',
    false
  ),
  achievement(
    'demo-explorer',
    'Demo-Liebhaber',
    'Demo Lover',
    'Du hast die Demo-Seite besucht. Du willst es wirklich wissen!',
    'You visited the demo page. You really want to know!',
    '🎥',
    false
  ),
  achievement(
    'documentation-reader',
    'Gründlich',
    'Thorough',
    'Du hast die Dokumentation gelesen. Ernsthaft interessiert!',
    'You read the documentation. Seriously interested!',
    '📋',
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
