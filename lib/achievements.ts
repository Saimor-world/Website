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
    name: 'Resonance Unlocked',
    nameDE: 'Resonanz Freigeschaltet',
    description: 'You discovered the ancient path. The system resonates with your curiosity.',
    descriptionDE: 'Du hast den uralten Pfad entdeckt. Das System schwingt mit deiner Neugier.',
    icon: '🌟',
    unlocked: false,
    secret: false
  },
  {
    id: 'quad_logo',
    name: 'Clarity Spark',
    nameDE: 'Klarheitsfunke',
    description: 'Four clicks reveal hidden light. Attention creates clarity.',
    descriptionDE: 'Vier Klicks enthüllen verborgenes Licht. Aufmerksamkeit schafft Klarheit.',
    icon: '✨',
    unlocked: false,
    secret: true
  },
  {
    id: 'silent-observer',
    name: 'Silent Observer',
    nameDE: 'Stiller Beobachter',
    description: 'You paused to truly see. This is where understanding begins.',
    descriptionDE: 'Du hast innegehalten, um wirklich zu sehen. Hier beginnt Verstehen.',
    icon: '👁️',
    unlocked: false,
    secret: true
  },
  {
    id: 'clarity-navigator',
    name: 'Clarity Navigator',
    nameDE: 'Klarheitsnavigator',
    description: 'You explored the foundations. Transparency builds trust.',
    descriptionDE: 'Du hast die Grundlagen erkundet. Transparenz schafft Vertrauen.',
    icon: '🧭',
    unlocked: false,
    secret: true
  },
  {
    id: 'shake',
    name: 'Reality Shaker',
    nameDE: 'Realitätserschütterer',
    description: 'You shook the device. The system felt it. Motion creates change.',
    descriptionDE: 'Du hast das Gerät geschüttelt. Das System hat es gespürt. Bewegung schafft Wandel.',
    icon: '🌍',
    unlocked: false,
    secret: true
  },
  {
    id: 'secret-klarheit',
    name: 'Clarity Seeker',
    nameDE: 'Klarheitssucher',
    description: 'You typed the word that matters. Clarity was always here.',
    descriptionDE: 'Du hast das Wort getippt, das zählt. Klarheit war immer da.',
    icon: '💎',
    unlocked: false,
    secret: true
  },
  {
    id: 'secret-saimor',
    name: 'Saimôr Awakened',
    nameDE: 'Saimôr Erwacht',
    description: 'You spoke the name. The system awakens to your presence.',
    descriptionDE: 'Du hast den Namen gesprochen. Das System erwacht zu deiner Präsenz.',
    icon: '🌿',
    unlocked: false,
    secret: true
  },
  {
    id: 'secret-wandel',
    name: 'Change Agent',
    nameDE: 'Wandel-Agent',
    description: 'You found the word for transformation. Change begins with awareness.',
    descriptionDE: 'Du hast das Wort für Transformation gefunden. Wandel beginnt mit Bewusstsein.',
    icon: '🔄',
    unlocked: false,
    secret: true
  },
  {
    id: 'all-unlocked',
    name: 'Master Explorer',
    nameDE: 'Meister-Entdecker',
    description: 'Every secret revealed. You see the complete picture.',
    descriptionDE: 'Jedes Geheimnis enthüllt. Du siehst das vollständige Bild.',
    icon: '👑',
    unlocked: false,
    secret: true
  },
  {
    id: 'secret-menu',
    name: 'Secret Keeper',
    nameDE: 'Geheimnishüter',
    description: 'Three keys unlock the vault. You know the way.',
    descriptionDE: 'Drei Tasten öffnen das Gewölbe. Du kennst den Weg.',
    icon: '🔐',
    unlocked: false,
    secret: true
  },
  {
    id: 'night-owl',
    name: 'Night Owl',
    nameDE: 'Nachteule',
    description: 'Clarity knows no time. The night reveals what day conceals.',
    descriptionDE: 'Klarheit kennt keine Zeit. Die Nacht offenbart, was der Tag verbirgt.',
    icon: '🦉',
    unlocked: false,
    secret: true
  },
  {
    id: 'early-bird',
    name: 'Dawn Seeker',
    nameDE: 'Morgensucher',
    description: 'You greet the dawn. Fresh perspectives emerge with first light.',
    descriptionDE: 'Du begrüßt die Morgendämmerung. Frische Perspektiven mit dem ersten Licht.',
    icon: '🌅',
    unlocked: false,
    secret: true
  },
  {
    id: 'patient-visitor',
    name: 'Patient Explorer',
    nameDE: 'Geduldiger Entdecker',
    description: 'Time is attention. You gave both generously.',
    descriptionDE: 'Zeit ist Aufmerksamkeit. Du hast beides großzügig gegeben.',
    icon: '⏰',
    unlocked: false,
    secret: true
  },
  {
    id: 'scroll-champion',
    name: 'Journey Completer',
    nameDE: 'Reise-Vollender',
    description: 'From beginning to end. The full story reveals itself.',
    descriptionDE: 'Von Anfang bis Ende. Die ganze Geschichte offenbart sich.',
    icon: '🎯',
    unlocked: false,
    secret: true
  },
  {
    id: 'field-explorer',
    name: 'Field Researcher',
    nameDE: 'Feldforscher',
    description: 'Multiple views create depth. You see beyond the surface.',
    descriptionDE: 'Mehrere Ansichten schaffen Tiefe. Du siehst über die Oberfläche hinaus.',
    icon: '🔭',
    unlocked: false,
    secret: true
  },
  {
    id: 'speed-reader',
    name: 'Lightning Mind',
    nameDE: 'Blitzdenker',
    description: 'Fast but thorough. You absorb knowledge at light speed.',
    descriptionDE: 'Schnell aber gründlich. Du absorbierst Wissen in Lichtgeschwindigkeit.',
    icon: '⚡',
    unlocked: false,
    secret: true
  },
  {
    id: 'return-visitor',
    name: 'Returning Wanderer',
    nameDE: 'Wiederkehrender Wanderer',
    description: 'You came back. Patterns emerge through repetition.',
    descriptionDE: 'Du bist zurückgekehrt. Muster entstehen durch Wiederholung.',
    icon: '🔁',
    unlocked: false,
    secret: true
  },
  {
    id: 'mora-explorer',
    name: 'Môra Explorer',
    nameDE: 'Môra-Entdecker',
    description: 'You explored the Môra dashboard. Patterns reveal themselves to the curious.',
    descriptionDE: 'Du hast das Môra-Dashboard erkundet. Muster offenbaren sich den Neugierigen.',
    icon: '🔮',
    unlocked: false,
    secret: false
  },
  {
    id: 'deep-diver',
    name: 'Deep Diver',
    nameDE: 'Tiefentaucher',
    description: 'You went beyond the surface. Depth rewards the persistent.',
    descriptionDE: 'Du bist über die Oberfläche hinausgegangen. Tiefe belohnt die Beharrlichen.',
    icon: '🌊',
    unlocked: false,
    secret: true
  },
  {
    id: 'pattern-recognizer',
    name: 'Pattern Recognizer',
    nameDE: 'Muster-Erkenner',
    description: 'You see connections others miss. Clarity emerges from observation.',
    descriptionDE: 'Du siehst Verbindungen, die andere übersehen. Klarheit entsteht durch Beobachtung.',
    icon: '🔗',
    unlocked: false,
    secret: true
  },
  {
    id: 'curiosity-driven',
    name: 'Curiosity Driven',
    nameDE: 'Neugiergetrieben',
    description: 'You clicked, explored, questioned. Curiosity is the engine of discovery.',
    descriptionDE: 'Du hast geklickt, erkundet, gefragt. Neugier ist der Motor der Entdeckung.',
    icon: '❓',
    unlocked: false,
    secret: false
  },
  {
    id: 'completionist',
    name: 'Completionist',
    nameDE: 'Vollendungssucher',
    description: 'You unlocked 75% of achievements. Mastery comes through dedication.',
    descriptionDE: 'Du hast 75% der Erfolge freigeschaltet. Meisterschaft kommt durch Hingabe.',
    icon: '🏆',
    unlocked: false,
    secret: false
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
