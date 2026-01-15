'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Home, 
  Sparkles, 
  Shield, 
  FileText, 
  Mail, 
  Globe, 
  Trophy,
  Zap,
  BookOpen,
  Users,
  ArrowRight,
  Command,
  CornerDownLeft
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getAchievementManager } from '@/lib/achievements';

interface CommandItem {
  id: string;
  title: string;
  titleEN?: string;
  description: string;
  descriptionEN?: string;
  icon: React.ReactNode;
  action: () => void;
  category: 'navigation' | 'action' | 'external';
  keywords: string[];
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [locale, setLocale] = useState<'de' | 'en'>('de');

  // Detect locale from URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLocale(window.location.pathname.startsWith('/en') ? 'en' : 'de');
    }
  }, [isOpen]);

  const commands = useMemo<CommandItem[]>(() => [
    // Navigation
    {
      id: 'home',
      title: 'Startseite',
      titleEN: 'Home',
      description: 'Zur Hauptseite navigieren',
      descriptionEN: 'Navigate to homepage',
      icon: <Home className="w-4 h-4" />,
      action: () => router.push(locale === 'de' ? '/de' : '/en'),
      category: 'navigation',
      keywords: ['start', 'home', 'hauptseite', 'anfang'],
    },
    {
      id: 'mora',
      title: 'Môra Dashboard',
      description: 'Semantisches OS entdecken',
      descriptionEN: 'Explore semantic OS',
      icon: <Sparkles className="w-4 h-4" />,
      action: () => router.push(locale === 'de' ? '/mora' : '/en/mora'),
      category: 'navigation',
      keywords: ['mora', 'dashboard', 'os', 'semantic', 'ai'],
    },
    {
      id: 'portal',
      title: 'Portal Demo',
      description: 'Live-Demo des Portals ansehen',
      descriptionEN: 'View portal live demo',
      icon: <Zap className="w-4 h-4" />,
      action: () => router.push(locale === 'de' ? '/de/portal' : '/en/portal'),
      category: 'navigation',
      keywords: ['portal', 'demo', 'live', 'preview'],
    },
    {
      id: 'trust',
      title: 'Sicherheit & Trust',
      titleEN: 'Security & Trust',
      description: 'DSGVO, Datenschutz & Sicherheit',
      descriptionEN: 'GDPR, Privacy & Security',
      icon: <Shield className="w-4 h-4" />,
      action: () => router.push(locale === 'de' ? '/de/trust' : '/en/trust'),
      category: 'navigation',
      keywords: ['trust', 'security', 'sicherheit', 'dsgvo', 'gdpr', 'privacy'],
    },
    {
      id: 'docs',
      title: 'Dokumentation',
      titleEN: 'Documentation',
      description: 'Technische Details & Guides',
      descriptionEN: 'Technical details & guides',
      icon: <BookOpen className="w-4 h-4" />,
      action: () => router.push('/docs'),
      category: 'navigation',
      keywords: ['docs', 'documentation', 'api', 'technical'],
    },
    {
      id: 'imprint',
      title: 'Impressum',
      titleEN: 'Imprint',
      description: 'Rechtliche Informationen',
      descriptionEN: 'Legal information',
      icon: <FileText className="w-4 h-4" />,
      action: () => router.push(locale === 'de' ? '/de/rechtliches/impressum' : '/en/legal/imprint'),
      category: 'navigation',
      keywords: ['impressum', 'imprint', 'legal', 'rechtlich'],
    },
    {
      id: 'privacy',
      title: 'Datenschutz',
      titleEN: 'Privacy Policy',
      description: 'Datenschutzerklärung',
      descriptionEN: 'Privacy policy',
      icon: <FileText className="w-4 h-4" />,
      action: () => router.push(locale === 'de' ? '/de/rechtliches/datenschutz' : '/en/legal/privacy'),
      category: 'navigation',
      keywords: ['datenschutz', 'privacy', 'dsgvo'],
    },
    // Actions
    {
      id: 'contact',
      title: 'Kontakt aufnehmen',
      titleEN: 'Get in touch',
      description: 'Zum Kontaktformular scrollen',
      descriptionEN: 'Scroll to contact form',
      icon: <Mail className="w-4 h-4" />,
      action: () => {
        const el = document.getElementById('kontakt');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          router.push(locale === 'de' ? '/de#kontakt' : '/en#kontakt');
        }
      },
      category: 'action',
      keywords: ['kontakt', 'contact', 'email', 'nachricht', 'message'],
    },
    {
      id: 'achievements',
      title: 'Erfolge anzeigen',
      titleEN: 'Show achievements',
      description: 'Deine freigeschalteten Erfolge',
      descriptionEN: 'Your unlocked achievements',
      icon: <Trophy className="w-4 h-4" />,
      action: () => {
        // Trigger achievement menu via keyboard event
        const event = new KeyboardEvent('keydown', { key: 'a' });
        window.dispatchEvent(event);
        window.dispatchEvent(event);
        window.dispatchEvent(event);
      },
      category: 'action',
      keywords: ['achievements', 'erfolge', 'trophy', 'gamification'],
    },
    {
      id: 'language',
      title: locale === 'de' ? 'Switch to English' : 'Zur deutschen Seite',
      description: locale === 'de' ? 'Change language to English' : 'Sprache auf Deutsch wechseln',
      icon: <Globe className="w-4 h-4" />,
      action: () => {
        const currentPath = window.location.pathname;
        if (locale === 'de') {
          router.push(currentPath.replace(/^\/de/, '/en').replace(/^\/mora/, '/en/mora') || '/en');
        } else {
          router.push(currentPath.replace(/^\/en/, '/de') || '/de');
        }
      },
      category: 'action',
      keywords: ['language', 'sprache', 'english', 'deutsch', 'german'],
    },
    // External
    {
      id: 'cal',
      title: 'Gespräch buchen',
      titleEN: 'Book a call',
      description: 'Strategiegespräch vereinbaren',
      descriptionEN: 'Schedule a strategy call',
      icon: <Users className="w-4 h-4" />,
      action: () => {
        window.open(process.env.NEXT_PUBLIC_CAL_URL || 'https://cal.com', '_blank');
      },
      category: 'external',
      keywords: ['call', 'gespräch', 'meeting', 'termin', 'buchen', 'book'],
    },
  ], [locale, router]);

  const filteredCommands = useMemo(() => {
    if (!search.trim()) return commands;
    
    const searchLower = search.toLowerCase();
    return commands.filter(cmd => {
      const title = (locale === 'en' && cmd.titleEN) ? cmd.titleEN : cmd.title;
      const desc = (locale === 'en' && cmd.descriptionEN) ? cmd.descriptionEN : cmd.description;
      
      return (
        title.toLowerCase().includes(searchLower) ||
        desc.toLowerCase().includes(searchLower) ||
        cmd.keywords.some(k => k.includes(searchLower))
      );
    });
  }, [search, commands, locale]);

  // Reset selection when filtered results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredCommands.length]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open with Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
        return;
      }

      if (!isOpen) return;

      // Close with Escape
      if (e.key === 'Escape') {
        setIsOpen(false);
        return;
      }

      // Navigate with arrows
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredCommands.length - 1 ? prev + 1 : 0
        );
        return;
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : filteredCommands.length - 1
        );
        return;
      }

      // Execute with Enter
      if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
          setIsOpen(false);
          setSearch('');
          
          // Unlock achievement for using command palette
          const manager = getAchievementManager();
          manager.unlock('curiosity-driven');
        }
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex]);

  // Focus input when opening
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    if (!isOpen) {
      setSearch('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const getCategoryLabel = (category: string) => {
    const labels = {
      navigation: locale === 'de' ? 'Navigation' : 'Navigation',
      action: locale === 'de' ? 'Aktionen' : 'Actions',
      external: locale === 'de' ? 'Extern' : 'External',
    };
    return labels[category as keyof typeof labels] || category;
  };

  // Group commands by category
  const groupedCommands = useMemo(() => {
    const groups: Record<string, CommandItem[]> = {};
    filteredCommands.forEach(cmd => {
      if (!groups[cmd.category]) {
        groups[cmd.category] = [];
      }
      groups[cmd.category].push(cmd);
    });
    return groups;
  }, [filteredCommands]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[10003] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />

          {/* Palette */}
          <motion.div
            className="fixed top-[20%] left-1/2 z-[10004] w-full max-w-xl -translate-x-1/2"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div
              className="mx-4 overflow-hidden rounded-2xl shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(8, 20, 16, 0.98) 0%, rgba(16, 32, 24, 0.95) 100%)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(16, 185, 129, 0.1)',
              }}
            >
              {/* Search Input */}
              <div className="flex items-center gap-3 border-b border-white/10 px-4 py-4">
                <Search className="w-5 h-5 text-emerald-400/60" />
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={locale === 'de' ? 'Suchen oder Befehl eingeben...' : 'Search or type a command...'}
                  className="flex-1 bg-transparent text-white placeholder-white/40 focus:outline-none"
                />
                <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-white/40">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-80 overflow-y-auto custom-scrollbar p-2">
                {filteredCommands.length === 0 ? (
                  <div className="py-8 text-center text-white/40 text-sm">
                    {locale === 'de' ? 'Keine Ergebnisse gefunden' : 'No results found'}
                  </div>
                ) : (
                  Object.entries(groupedCommands).map(([category, items]) => (
                    <div key={category} className="mb-2">
                      <div className="px-3 py-2 text-[10px] uppercase tracking-wider text-white/30 font-bold">
                        {getCategoryLabel(category)}
                      </div>
                      {items.map((cmd) => {
                        const globalIndex = filteredCommands.findIndex(c => c.id === cmd.id);
                        const isSelected = globalIndex === selectedIndex;
                        const title = (locale === 'en' && cmd.titleEN) ? cmd.titleEN : cmd.title;
                        const description = (locale === 'en' && cmd.descriptionEN) ? cmd.descriptionEN : cmd.description;

                        return (
                          <motion.button
                            key={cmd.id}
                            onClick={() => {
                              cmd.action();
                              setIsOpen(false);
                              setSearch('');
                            }}
                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all ${
                              isSelected 
                                ? 'bg-emerald-500/20 border border-emerald-500/30' 
                                : 'hover:bg-white/5 border border-transparent'
                            }`}
                            layout
                          >
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                              isSelected 
                                ? 'bg-emerald-500/30 text-emerald-300' 
                                : 'bg-white/5 text-white/50'
                            }`}>
                              {cmd.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className={`font-medium truncate ${
                                isSelected ? 'text-white' : 'text-white/80'
                              }`}>
                                {title}
                              </div>
                              <div className="text-xs text-white/40 truncate">
                                {description}
                              </div>
                            </div>
                            {isSelected && (
                              <div className="flex items-center gap-1 text-emerald-400/60">
                                <CornerDownLeft className="w-4 h-4" />
                              </div>
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 text-[10px] text-white/30">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">↑</kbd>
                    <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">↓</kbd>
                    <span className="ml-1">{locale === 'de' ? 'Navigieren' : 'Navigate'}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">↵</kbd>
                    <span className="ml-1">{locale === 'de' ? 'Auswählen' : 'Select'}</span>
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Command className="w-3 h-3" />
                  <span>K</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

