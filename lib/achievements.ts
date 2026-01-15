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
    name: 'Retro Gamer',
    nameDE: 'Retro-Gamer',
    description: 'Du hast den berühmten Konami-Code entdeckt. Die 80er Jahre grüßen!',
    descriptionDE: 'You discovered the famous Konami code. The 80s say hello!',
    icon: '🕹️',
    unlocked: false,
    secret: false
  },
  {
    id: 'quad_logo',
    name: 'Logo-Detektiv',
    nameDE: 'Logo Detective',
    description: 'Vier Mal das Logo angeklickt? Du siehst wirklich genau hin!',
    descriptionDE: 'Clicked the logo four times? You really pay attention!',
    icon: '🕵️',
    unlocked: false,
    secret: true
  },
  {
    id: 'silent-observer',
    name: 'Geduldiger Betrachter',
    nameDE: 'Patient Observer',
    description: 'Du hast dir 12 Sekunden Zeit genommen, die Hero-Section zu betrachten. Schön langsam.',
    descriptionDE: 'You took 12 seconds to look at the hero section. Nice and slow.',
    icon: '🧘',
    unlocked: false,
    secret: true
  },
  {
    id: 'clarity-navigator',
    name: 'Explorer',
    nameDE: 'Explorer',
    description: 'Du hast dir alle wichtigen Seiten angeschaut: Home, Trust und Legal. Gründlich!',
    descriptionDE: 'You visited all important pages: Home, Trust and Legal. Thorough!',
    icon: '🗺️',
    unlocked: false,
    secret: true
  },
  {
    id: 'shake',
    name: 'Shake It!',
    nameDE: 'Shake It!',
    description: 'Du hast dein Gerät geschüttelt und das System hat\'s bemerkt. Cool!',
    descriptionDE: 'You shook your device and the system noticed. Cool!',
    icon: '📱',
    unlocked: false,
    secret: true
  },
  {
    id: 'secret-klarheit',
    name: 'Wortspiel',
    nameDE: 'Word Game',
    description: 'Du hast "Klarheit" getippt. Wortspiele sind unser Ding!',
    descriptionDE: 'You typed "Klarheit". Word games are our thing!',
    icon: '🎯',
    unlocked: false,
    secret: true
  },
  {
    id: 'secret-saimor',
    name: 'Namensgeber',
    nameDE: 'Name Dropper',
    description: 'Du hast "Saimôr" getippt. Unser Name klingt gut, oder?',
    descriptionDE: 'You typed "Saimôr". Our name sounds good, right?',
    icon: '🎤',
    unlocked: false,
    secret: true
  },
  {
    id: 'secret-wandel',
    name: 'Change Agent',
    nameDE: 'Change Agent',
    description: 'Du hast "Wandel" getippt. Du weißt, worum es geht!',
    descriptionDE: 'You typed "Wandel". You know what it\'s about!',
    icon: '🔄',
    unlocked: false,
    secret: true
  },
  {
    id: 'all-unlocked',
    name: 'Meisterspieler',
    nameDE: 'Master Player',
    description: 'Du hast ALLE Achievements freigeschaltet. Wow, du bist echt dabei!',
    descriptionDE: 'You unlocked ALL achievements. Wow, you\'re really into it!',
    icon: '👑',
    unlocked: false,
    secret: true
  },
  {
    id: 'secret-menu',
    name: 'Tastenakrobat',
    nameDE: 'Key Acrobat',
    description: 'Du hast AAA getippt und das geheime Menü gefunden. Geschickt!',
    descriptionDE: 'You typed AAA and found the secret menu. Clever!',
    icon: '🎪',
    unlocked: false,
    secret: true
  },
  {
    id: 'night-owl',
    name: 'Nachteule',
    nameDE: 'Night Owl',
    description: 'Du bist zwischen 00:00 und 06:00 hier. Gute Nacht, oder was?',
    descriptionDE: 'You\'re here between 00:00 and 06:00. Good night, or what?',
    icon: '🦉',
    unlocked: false,
    secret: true
  },
  {
    id: 'early-bird',
    name: 'Früher Vogel',
    nameDE: 'Early Bird',
    description: 'Du bist zwischen 05:00 und 07:00 hier. Frühaufsteher!',
    descriptionDE: 'You\'re here between 05:00 and 07:00. Early riser!',
    icon: '🐦',
    unlocked: false,
    secret: true
  },
  {
    id: 'patient-visitor',
    name: 'Treuer Begleiter',
    nameDE: 'Loyal Companion',
    description: 'Du bist seit 5 Minuten hier. Das ist echtes Interesse!',
    descriptionDE: 'You\'ve been here for 5 minutes. That\'s real interest!',
    icon: '🤝',
    unlocked: false,
    secret: true
  },
  {
    id: 'scroll-champion',
    name: 'Leseratte',
    nameDE: 'Bookworm',
    description: 'Du hast die Seite zu 95% gescrollt. Du liest wirklich alles!',
    descriptionDE: 'You scrolled 95% of the page. You really read everything!',
    icon: '📖',
    unlocked: false,
    secret: true
  },
  {
    id: 'field-explorer',
    name: 'Vielseitig',
    nameDE: 'Versatile',
    description: 'Du hast 3 verschiedene Dashboard-Ansichten ausprobiert. Neugierig!',
    descriptionDE: 'You tried 3 different dashboard views. Curious!',
    icon: '🔭',
    unlocked: false,
    secret: true
  },
  {
    id: 'speed-reader',
    name: 'Schnell-Leser',
    nameDE: 'Speed Reader',
    description: 'Du hast die Seite extrem schnell gelesen. Beeindruckend!',
    descriptionDE: 'You read the page extremely fast. Impressive!',
    icon: '💨',
    unlocked: false,
    secret: true
  },
  {
    id: 'return-visitor',
    name: 'Wiederholungstäter',
    nameDE: 'Repeat Offender',
    description: 'Du bist schon einmal hier gewesen. Schön, dich wiederzusehen!',
    descriptionDE: 'You\'ve been here before. Nice to see you again!',
    icon: '🔄',
    unlocked: false,
    secret: true
  },
  {
    id: 'mora-explorer',
    name: 'Môra-Fan',
    nameDE: 'Môra Fan',
    description: 'Du hast Môra besucht und ausprobiert. Willkommen im Club!',
    descriptionDE: 'You visited Môra and tried it out. Welcome to the club!',
    icon: '🌟',
    unlocked: false,
    secret: false
  },
  {
    id: 'deep-diver',
    name: 'Tiefgang',
    nameDE: 'Deep Diver',
    description: 'Du hast die Deep View in Môra aktiviert. Du gehst tief!',
    descriptionDE: 'You activated the Deep View in Môra. You go deep!',
    icon: '🌊',
    unlocked: false,
    secret: true
  },
  {
    id: 'pattern-recognizer',
    name: 'Muster-Experte',
    nameDE: 'Pattern Expert',
    description: 'Du hast mehrere Dashboard-Karten erkundet. Du siehst Muster!',
    descriptionDE: 'You explored multiple dashboard cards. You see patterns!',
    icon: '🧩',
    unlocked: false,
    secret: true
  },
  {
    id: 'curiosity-driven',
    name: 'Neugierig',
    nameDE: 'Curious',
    description: 'Du hast den Command Palette ausprobiert. Techie!',
    descriptionDE: 'You tried the Command Palette. Techie!',
    icon: '🧐',
    unlocked: false,
    secret: false
  },
  {
    id: 'completionist',
    name: 'Perfektionist',
    nameDE: 'Perfectionist',
    description: 'Du hast über 75% aller Achievements freigeschaltet. Unglaublich!',
    descriptionDE: 'You unlocked over 75% of all achievements. Incredible!',
    icon: '🎖️',
    unlocked: false,
    secret: false
  },
  {
    id: 'first-contact',
    name: 'Erster Kontakt',
    nameDE: 'First Contact',
    description: 'Du hast dich über das Kontaktformular gemeldet. Wir freuen uns!',
    descriptionDE: 'You contacted us via the contact form. We\'re excited!',
    icon: '📞',
    unlocked: false,
    secret: false
  },
  {
    id: 'demo-explorer',
    name: 'Demo-Liebhaber',
    nameDE: 'Demo Lover',
    description: 'Du hast die Demo-Page besucht. Du willst es wirklich wissen!',
    descriptionDE: 'You visited the demo page. You really want to know!',
    icon: '🎥',
    unlocked: false,
    secret: false
  },
  {
    id: 'documentation-reader',
    name: 'Gründlich',
    nameDE: 'Thorough',
    description: 'Du hast die Dokumentation gelesen. Ernsthaft interessiert!',
    descriptionDE: 'You read the documentation. Seriously interested!',
    icon: '📋',
    unlocked: false,
    secret: true
  },
  {
    id: 'network-builder',
    name: 'Netzwerker',
    nameDE: 'Networker',
    description: 'Du hast 5 verschiedene Seiten besucht. Du erkundest fleißig!',
    descriptionDE: 'You visited 5 different pages. You explore diligently!',
    icon: '🌐',
    unlocked: false,
    secret: true
  },
  {
    id: 'strategic-thinker',
    name: 'Strategisch',
    nameDE: 'Strategic',
    description: 'Du bist seit über 3 Minuten hier und denkst strategisch. Beeindruckend!',
    descriptionDE: 'You\'ve been here for over 3 minutes thinking strategically. Impressive!',
    icon: '🧠',
    unlocked: false,
    secret: true
  },
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
