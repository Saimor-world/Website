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
    name: 'Advanced Navigation',
    nameDE: 'Erweiterte Navigation',
    description: 'You discovered the hidden control path. The system responds to your direct input.',
    descriptionDE: 'Du hast den direkten Steuerungspfad entdeckt. Das System reagiert auf deine Eingabe.',
    icon: '🚀',
    unlocked: false,
    secret: false
  },
  {
    id: 'quad_logo',
    name: 'Precision Access',
    nameDE: 'Präzisionszugriff',
    description: 'Targeted interaction revealed system layers. Focus improves efficiency.',
    descriptionDE: 'Gezielte Interaktion hat Systemebenen freigeschaltet. Fokus steigert Effizienz.',
    icon: '🎯',
    unlocked: false,
    secret: true
  },
  {
    id: 'silent-observer',
    name: 'Deep Analysis',
    nameDE: 'Tiefenanalyse',
    description: 'Intentional observation completed. Quality of insight depends on focus.',
    descriptionDE: 'Bewusste Beobachtung abgeschlossen. Die Qualität der Erkenntnis folgt dem Fokus.',
    icon: '🔍',
    unlocked: false,
    secret: true
  },
  {
    id: 'clarity-navigator',
    name: 'System Auditor',
    nameDE: 'System-Auditor',
    description: 'Full exploration of core structures. Transparency is the basis for optimization.',
    descriptionDE: 'Vollständige Erkundung der Kernstrukturen. Transparenz ist die Basis für Optimierung.',
    icon: '📋',
    unlocked: false,
    secret: true
  },
  {
    id: 'shake',
    name: 'Stress Test',
    nameDE: 'Belastungstest',
    description: 'Physical interaction detected. The system maintains stability under movement.',
    descriptionDE: 'Physische Interaktion erkannt. Das System hält Stabilität bei Bewegung.',
    icon: '🛡️',
    unlocked: false,
    secret: true
  },
  {
    id: 'secret-klarheit',
    name: 'Clarity Identified',
    nameDE: 'Klarheit Identifiziert',
    description: 'Key semantic concept defined. Strategic alignment successful.',
    descriptionDE: 'Semantisches Kernkonzept definiert. Strategische Ausrichtung erfolgreich.',
    icon: '💎',
    unlocked: false,
    secret: true
  },
  {
    id: 'secret-saimor',
    name: 'Interface Synchronized',
    nameDE: 'Schnittstelle Synchronisiert',
    description: 'Core protocol initiated. Saimôr system is fully operational.',
    descriptionDE: 'Kernprotokoll initiiert. Saimôr System ist vollständig einsatzbereit.',
    icon: '⚙️',
    unlocked: false,
    secret: true
  },
  {
    id: 'secret-wandel',
    name: 'Transformation Catalyst',
    nameDE: 'Transformations-Katalysator',
    description: 'Process change identified. Awareness is the first step of implementation.',
    descriptionDE: 'Prozesswandel identifiziert. Bewusstsein ist der erste Schritt der Umsetzung.',
    icon: '📈',
    unlocked: false,
    secret: true
  },
  {
    id: 'all-unlocked',
    name: 'Director Level',
    nameDE: 'Direktoren-Ebene',
    description: 'Full system overview achieved. All operational parameters accessible.',
    descriptionDE: 'Vollständige Systemübersicht erreicht. Alle operativen Parameter zugänglich.',
    icon: '🎩',
    unlocked: false,
    secret: true
  },
  {
    id: 'secret-menu',
    name: 'Administrative Access',
    nameDE: 'Administrativer Zugriff',
    description: 'The administrative vault is open. Advanced settings authorized.',
    descriptionDE: 'Das administrative Archiv ist offen. Erweiterte Einstellungen autorisiert.',
    icon: '🔑',
    unlocked: false,
    secret: true
  },
  {
    id: 'night-owl',
    name: 'Late Shift Efficiency',
    nameDE: 'Spätschicht-Effizienz',
    description: 'Strategic planning continued after hours. Focus remains high.',
    descriptionDE: 'Strategische Planung nach Dienstschluss. Fokus bleibt hoch.',
    icon: '🌙',
    unlocked: false,
    secret: true
  },
  {
    id: 'early-bird',
    name: 'Strategic Start',
    nameDE: 'Strategischer Start',
    description: 'Operational readiness before first light. Early analysis provides lead.',
    descriptionDE: 'Operative Einsatzbereitschaft vor Tagesanbruch. Frühe Analyse schafft Vorsprung.',
    icon: '☀️',
    unlocked: false,
    secret: true
  },
  {
    id: 'patient-visitor',
    name: 'Long-Term Commitment',
    nameDE: 'Langfristiges Commitment',
    description: 'Sustained interaction verified. Consistency leads to sustainable results.',
    descriptionDE: 'Anhaltende Interaktion verifiziert. Kontinuität führt zu nachhaltigen Ergebnissen.',
    icon: '⏳',
    unlocked: false,
    secret: true
  },
  {
    id: 'scroll-champion',
    name: 'Structure Review',
    nameDE: 'Struktur-Review',
    description: 'Complete documentation processed. Information integrity confirmed.',
    descriptionDE: 'Vollständige Dokumentation durchlaufen. Informationsintegrität bestätigt.',
    icon: '✅',
    unlocked: false,
    secret: true
  },
  {
    id: 'field-explorer',
    name: 'Multi-Perspective Audit',
    nameDE: 'Multiperspektiv-Audit',
    description: 'Divergent views correlated. Depth of information confirmed.',
    descriptionDE: 'Divergente Ansichten korreliert. Informationstiefe bestätigt.',
    icon: '🛰️',
    unlocked: false,
    secret: true
  },
  {
    id: 'speed-reader',
    name: 'Rapid Data Absorption',
    nameDE: 'Schnelle Datenaufnahme',
    description: 'Information density handled efficiently. Fast processing of core concepts.',
    descriptionDE: 'Informationsdichte effizient bewältigt. Schnelle Verarbeitung von Kernkonzepten.',
    icon: '⚡',
    unlocked: false,
    secret: true
  },
  {
    id: 'return-visitor',
    name: 'Customer Loyalty',
    nameDE: 'Kundenloyalität',
    description: 'System re-entry confirmed. Iteration improves the model.',
    descriptionDE: 'System-Wiedereinstieg bestätigt. Iteration verbessert das Modell.',
    icon: '🔄',
    unlocked: false,
    secret: true
  },
  {
    id: 'mora-explorer',
    name: 'Dashboard Mastery',
    nameDE: 'Dashboard-Meisterschaft',
    description: 'Semantic metrics analyzed. Visual intelligence utilized.',
    descriptionDE: 'Semantische Metriken analysiert. Visuelle Intelligenz genutzt.',
    icon: '📊',
    unlocked: false,
    secret: false
  },
  {
    id: 'deep-diver',
    name: 'Technical Depth',
    nameDE: 'Technische Tiefe',
    description: 'Deep view activated. Exploration of sub-surface parameters.',
    descriptionDE: 'Deep View aktiviert. Erkundung tieferliegender Parameter.',
    icon: '⚓',
    unlocked: false,
    secret: true
  },
  {
    id: 'pattern-recognizer',
    name: 'Semantic Correlation',
    nameDE: 'Semantische Korrelation',
    description: 'Logical connections identified. Clarity through correlation.',
    descriptionDE: 'Logische Verknüpfungen identifiziert. Klarheit durch Korrelation.',
    icon: '🧠',
    unlocked: false,
    secret: true
  },
  {
    id: 'curiosity-driven',
    name: 'Innovation Driven',
    nameDE: 'Innovationsgetrieben',
    description: 'Active exploration of new features. Progress through inquiry.',
    descriptionDE: 'Aktive Erkundung neuer Funktionen. Fortschritt durch Hinterfragen.',
    icon: '💡',
    unlocked: false,
    secret: false
  },
  {
    id: 'completionist',
    name: 'Operational Excellence',
    nameDE: 'Operational Excellence',
    description: '75% system mastery achieved. High performance through dedication.',
    descriptionDE: '75% Systemmeisterschaft erreicht. High Performance durch Hingabe.',
    icon: '🏆',
    unlocked: false,
    secret: false
  },
  {
    id: 'first-contact',
    name: 'First Contact',
    nameDE: 'Erstkontakt',
    description: 'Initial consultation request submitted. Strategic dialogue initiated.',
    descriptionDE: 'Erste Kontaktanfrage gesendet. Strategischer Dialog initiiert.',
    icon: '🤝',
    unlocked: false,
    secret: false
  },
  {
    id: 'demo-explorer',
    name: 'Demo Pioneer',
    nameDE: 'Demo-Pionier',
    description: 'Live demonstration accessed. Hands-on evaluation mode activated.',
    descriptionDE: 'Live-Demo gestartet. Praxisorientierte Evaluation aktiviert.',
    icon: '🎮',
    unlocked: false,
    secret: false
  },
  {
    id: 'documentation-reader',
    name: 'Due Diligence',
    nameDE: 'Sorgfaltsprüfung',
    description: 'Technical documentation reviewed. Informed decision-making in progress.',
    descriptionDE: 'Technische Dokumentation geprüft. Informierte Entscheidungsfindung aktiv.',
    icon: '📚',
    unlocked: false,
    secret: true
  },
  {
    id: 'network-builder',
    name: 'Network Effect',
    nameDE: 'Netzwerk-Effekt',
    description: 'Multiple system touchpoints explored. Ecosystem understanding expanding.',
    descriptionDE: 'Mehrere System-Touchpoints erkundet. Ökosystem-Verständnis wächst.',
    icon: '🕸️',
    unlocked: false,
    secret: true
  },
  {
    id: 'strategic-thinker',
    name: 'Strategic Mindset',
    nameDE: 'Strategisches Denken',
    description: 'Deep engagement with transformation concepts. Long-term vision aligned.',
    descriptionDE: 'Tiefes Engagement mit Transformationskonzepten. Langfristige Vision ausgerichtet.',
    icon: '♟️',
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
