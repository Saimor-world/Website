// Achievement System für Easter Eggs
export interface Achievement {
  id: string;
  name: string;
  nameDE: string;
  description: string;
  descriptionDE: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: number;
  secret: boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'konami',
    name: 'Old School Gamer',
    nameDE: 'Klassischer Spieler',
    description: 'Entered the legendary Konami Code',
    descriptionDE: 'Konami Code eingegeben',
    icon: '🎮',
    unlocked: false,
    secret: false
  },
  {
    id: 'triple-click',
    name: 'Click Master',
    nameDE: 'Klick-Meister',
    description: 'Triple clicked for explosion',
    descriptionDE: 'Dreifach-Klick Explosion ausgelöst',
    icon: '💥',
    unlocked: false,
    secret: true
  },
  {
    id: 'shake',
    name: 'Earthquake',
    nameDE: 'Erdbeben',
    description: 'Shook your device',
    descriptionDE: 'Gerät geschüttelt',
    icon: '🌍',
    unlocked: false,
    secret: true
  },
  {
    id: 'secret-klarheit',
    name: 'Clarity Seeker',
    nameDE: 'Klarheitssucher',
    description: 'Found the word "klarheit"',
    descriptionDE: 'Das Wort "klarheit" gefunden',
    icon: '✨',
    unlocked: false,
    secret: true
  },
  {
    id: 'secret-saimor',
    name: 'Saimôr Awakened',
    nameDE: 'Saimôr Erwacht',
    description: 'Typed "saimor" to awaken',
    descriptionDE: '"saimor" getippt zum Erwachen',
    icon: '🌿',
    unlocked: false,
    secret: true
  },
  {
    id: 'secret-wandel',
    name: 'Change Agent',
    nameDE: 'Wandel-Agent',
    description: 'Discovered "wandel"',
    descriptionDE: '"wandel" entdeckt',
    icon: '🔄',
    unlocked: false,
    secret: true
  },
  {
    id: 'click-combo',
    name: 'Speed Clicker',
    nameDE: 'Schnell-Klicker',
    description: '5 rapid clicks - Fireworks!',
    descriptionDE: '5 schnelle Klicks - Feuerwerk!',
    icon: '🎆',
    unlocked: false,
    secret: true
  },
  {
    id: 'all-unlocked',
    name: 'Achievement Hunter',
    nameDE: 'Erfolgs-Jäger',
    description: 'Unlocked all achievements',
    descriptionDE: 'Alle Erfolge freigeschaltet',
    icon: '👑',
    unlocked: false,
    secret: true
  },
  {
    id: 'secret-menu',
    name: 'Secret Keeper',
    nameDE: 'Geheimnishüter',
    description: 'Opened the secret menu (AAA)',
    descriptionDE: 'Geheimmenü geöffnet (AAA)',
    icon: '🔐',
    unlocked: false,
    secret: true
  }
];

const STORAGE_KEY = 'saimor-achievements';

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
      if (saved) {
        const savedAchievements = JSON.parse(saved) as Achievement[];
        this.achievements = ACHIEVEMENTS.map(a => {
          const saved = savedAchievements.find(s => s.id === a.id);
          return saved ? { ...a, unlocked: saved.unlocked, unlockedAt: saved.unlockedAt } : a;
        });
      } else {
        this.achievements = [...ACHIEVEMENTS];
      }
    } catch (e) {
      console.error('Failed to load achievements:', e);
      this.achievements = [...ACHIEVEMENTS];
    }
  }

  private save() {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.achievements));
    } catch (e) {
      console.error('Failed to save achievements:', e);
    }
  }

  unlock(id: string): Achievement | null {
    const achievement = this.achievements.find(a => a.id === id);
    if (!achievement || achievement.unlocked) return null;

    achievement.unlocked = true;
    achievement.unlockedAt = Date.now();

    // Check if all main achievements are unlocked
    const mainAchievements = this.achievements.filter(a => a.id !== 'all-unlocked');
    const allUnlocked = mainAchievements.every(a => a.unlocked);
    if (allUnlocked) {
      const allAchievement = this.achievements.find(a => a.id === 'all-unlocked');
      if (allAchievement && !allAchievement.unlocked) {
        allAchievement.unlocked = true;
        allAchievement.unlockedAt = Date.now();
      }
    }

    this.save();
    this.notifyListeners();
    return achievement;
  }

  getAll(): Achievement[] {
    return [...this.achievements];
  }

  getUnlocked(): Achievement[] {
    return this.achievements.filter(a => a.unlocked);
  }

  getProgress(): { unlocked: number; total: number; percentage: number } {
    const total = this.achievements.length;
    const unlocked = this.achievements.filter(a => a.unlocked).length;
    return {
      unlocked,
      total,
      percentage: Math.round((unlocked / total) * 100)
    };
  }

  subscribe(listener: (achievements: Achievement[]) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener([...this.achievements]));
  }

  reset() {
    this.achievements = ACHIEVEMENTS.map(a => ({ ...a, unlocked: false, unlockedAt: undefined }));
    this.save();
    this.notifyListeners();
  }
}

// Singleton instance
let instance: AchievementManager | null = null;

export function getAchievementManager(): AchievementManager {
  if (!instance) {
    instance = new AchievementManager();
  }
  return instance;
}
