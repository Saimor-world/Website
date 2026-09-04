export type AchievementLocale = 'de' | 'en';
export type AchievementCategory = 'signal' | 'path' | 'depth' | 'hidden';

interface LocalizedAchievementCopy { de: string; en: string }

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

interface SavedAchievementState { id: string; unlocked?: boolean; unlockedAt?: number }

const STORAGE_KEY = 'saimor-achievements';

const CATEGORY_LABELS: Record<AchievementCategory, LocalizedAchievementCopy> = {
  signal: { de: 'Besuch', en: 'Visit' },
  path: { de: 'Orientierung', en: 'Orientation' },
  depth: { de: 'Produkt', en: 'Product' },
  hidden: { de: 'Extra', en: 'Extra' },
};

export const ACHIEVEMENT_CATEGORY_ORDER: AchievementCategory[] = ['signal', 'path', 'depth', 'hidden'];

function achievement(
  id: string,
  category: AchievementCategory,
  titleDE: string,
  titleEN: string,
  descriptionDE: string,
  descriptionEN: string,
  icon: string,
  secret = false,
): AchievementDefinition {
  return { id, category, title: { de: titleDE, en: titleEN }, description: { de: descriptionDE, en: descriptionEN }, icon, secret };
}

export const ACHIEVEMENTS: AchievementDefinition[] = [
  achievement('silent-observer', 'signal', 'Erst einmal ankommen', 'Take a moment', 'Du hast dir Zeit für den Einstieg genommen, statt sofort weiterzuklicken.', 'You took time to read the introduction instead of clicking away.', '◐'),
  achievement('scroll-champion', 'signal', 'Das ganze Bild', 'The full picture', 'Du hast die Seite bis zum Ende angesehen und den Zusammenhang mitgenommen.', 'You reached the end of the page and took in the full picture.', '↧'),
  achievement('return-visitor', 'signal', 'Willkommen zurück', 'Welcome back', 'Du warst schon einmal hier und bist wiedergekommen.', 'You have been here before and came back.', '↺'),
  achievement('mora-explorer', 'depth', 'Môra angesehen', 'Met Môra', 'Du hast dir angesehen, wie Môra Kontext, Wissen und nächste Schritte verbindet.', 'You explored how Môra connects context, knowledge, and next steps.', '◎'),
  achievement('demo-explorer', 'depth', 'Demo ausprobiert', 'Tried the demo', 'Du hast die Produktbeschreibung verlassen und die Demo selbst geöffnet.', 'You moved beyond the product copy and opened the demo yourself.', '□'),
  achievement('clarity-navigator', 'path', 'Vertrauen geprüft', 'Checked the foundations', 'Du hast dir Sicherheit, Datenschutz oder die rechtlichen Grundlagen angesehen.', 'You checked the security, privacy, or legal foundations.', '△'),
  achievement('first-contact', 'path', 'Kontakt aufgenommen', 'Got in touch', 'Du hast aus dem Anschauen ein echtes Gespräch gemacht.', 'You turned browsing into a real conversation.', '↗'),
  achievement('quad_logo', 'hidden', 'Das Zeichen lebt', 'The mark is alive', 'Du hast das Saimôr-Zeichen nicht nur gesehen, sondern genauer untersucht.', 'You did not just see the Saimôr mark — you looked a little closer.', '◌', true),
];

export function getAchievementTitle(item: Achievement, locale: AchievementLocale = 'de') { return item.title[locale] }
export function getAchievementDescription(item: Achievement, locale: AchievementLocale = 'de') { return item.description[locale] }
export function getAchievementCategoryLabel(category: AchievementCategory, locale: AchievementLocale = 'de') { return CATEGORY_LABELS[category][locale] }

function hydrateAchievements(savedStates: SavedAchievementState[] = []): Achievement[] {
  return ACHIEVEMENTS.map((definition) => {
    const saved = savedStates.find((entry) => entry.id === definition.id);
    return { ...definition, title: { ...definition.title }, description: { ...definition.description }, unlocked: saved?.unlocked === true, unlockedAt: saved?.unlockedAt };
  });
}

function cloneAchievement(item: Achievement): Achievement {
  return { ...item, title: { ...item.title }, description: { ...item.description } };
}

export class AchievementManager {
  private achievements: Achievement[] = [];
  private listeners = new Set<(achievements: Achievement[]) => void>();

  constructor() {
    try {
      const raw = typeof window === 'undefined' ? null : localStorage.getItem(STORAGE_KEY);
      this.achievements = hydrateAchievements(raw ? JSON.parse(raw) as SavedAchievementState[] : []);
    } catch {
      this.achievements = hydrateAchievements();
    }
  }

  unlock(id: string): Achievement | null {
    const item = this.achievements.find((entry) => entry.id === id);
    if (!item || item.unlocked) return null;
    item.unlocked = true;
    item.unlockedAt = Date.now();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.achievements.map(({ id: savedId, unlocked, unlockedAt }) => ({ id: savedId, unlocked, unlockedAt }))));
    } catch { /* Optional experience; storage may be unavailable. */ }
    const snapshot = this.getAll();
    this.listeners.forEach((listener) => listener(snapshot));
    return cloneAchievement(item);
  }

  getAll() { return this.achievements.map(cloneAchievement) }
  getUnlocked() { return this.achievements.filter((item) => item.unlocked).map(cloneAchievement) }
  getProgress() {
    const total = this.achievements.length;
    const unlocked = this.achievements.filter((item) => item.unlocked).length;
    return { unlocked, total, percentage: total === 0 ? 0 : Math.round((unlocked / total) * 100) };
  }
  subscribe(listener: (achievements: Achievement[]) => void) { this.listeners.add(listener); return () => this.listeners.delete(listener) }
  reset() {
    this.achievements = hydrateAchievements();
    try { localStorage.removeItem(STORAGE_KEY) } catch { /* Optional state. */ }
    const snapshot = this.getAll();
    this.listeners.forEach((listener) => listener(snapshot));
  }
}

let instance: AchievementManager | null = null;
export function getAchievementManager() { if (!instance) instance = new AchievementManager(); return instance }
