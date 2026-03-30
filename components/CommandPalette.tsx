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
  Compass,
  Zap,
  BookOpen,
  Users,
  Command,
  CornerDownLeft,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLocale(window.location.pathname.startsWith('/en') ? 'en' : 'de');
    }
  }, [isOpen]);

  const commands = useMemo<CommandItem[]>(() => [
    {
      id: 'home',
      title: 'Startseite',
      titleEN: 'Home',
      description: 'Zur Hauptseite gehen',
      descriptionEN: 'Go to homepage',
      icon: <Home className="w-4 h-4" />,
      action: () => {
        window.location.href = locale === 'de' ? '/de' : '/en';
      },
      category: 'navigation',
      keywords: ['start', 'home', 'hauptseite', 'anfang'],
    },
    {
      id: 'mora',
      title: 'Môra Dashboard',
      description: 'Môra kennenlernen und ausprobieren',
      descriptionEN: 'Discover and try Môra',
      icon: <Sparkles className="w-4 h-4" />,
      action: () => {
        window.location.href = locale === 'de' ? '/mora' : '/en/mora';
      },
      category: 'navigation',
      keywords: ['mora', 'dashboard', 'os', 'semantic', 'ai'],
    },
    {
      id: 'portal',
      title: 'Portal Demo',
      description: 'Live-Demo des Portals ansehen',
      descriptionEN: 'View portal live demo',
      icon: <Zap className="w-4 h-4" />,
      action: () => {
        window.location.href = locale === 'de' ? '/de/portal' : '/en/portal';
      },
      category: 'navigation',
      keywords: ['portal', 'demo', 'live', 'preview'],
    },
    {
      id: 'trust',
      title: 'Sicherheit & Trust',
      titleEN: 'Security & Trust',
      description: 'Alles über Datenschutz und Sicherheit',
      descriptionEN: 'Everything about privacy and security',
      icon: <Shield className="w-4 h-4" />,
      action: () => {
        window.location.href = locale === 'de' ? '/de/trust' : '/en/trust';
      },
      category: 'navigation',
      keywords: ['trust', 'security', 'sicherheit', 'dsgvo', 'gdpr', 'privacy'],
    },
    {
      id: 'docs',
      title: 'Dokumentation',
      titleEN: 'Documentation',
      description: 'Technische Details und Anleitungen',
      descriptionEN: 'Technical details and guides',
      icon: <BookOpen className="w-4 h-4" />,
      action: () => {
        window.location.href = '/docs';
      },
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
      action: () => {
        window.location.href = locale === 'de' ? '/de/rechtliches/impressum' : '/en/legal/imprint';
      },
      category: 'navigation',
      keywords: ['impressum', 'imprint', 'legal', 'rechtlich'],
    },
    {
      id: 'privacy',
      title: 'Datenschutz',
      titleEN: 'Privacy Policy',
      description: 'Datenschutzerklärung lesen',
      descriptionEN: 'Read privacy policy',
      icon: <FileText className="w-4 h-4" />,
      action: () => {
        window.location.href = locale === 'de' ? '/de/rechtliches/datenschutz' : '/en/legal/privacy';
      },
      category: 'navigation',
      keywords: ['datenschutz', 'privacy', 'dsgvo'],
    },
    {
      id: 'contact',
      title: 'Kontakt aufnehmen',
      titleEN: 'Get in touch',
      description: 'Zum Kontaktformular scrollen',
      descriptionEN: 'Scroll to contact form',
      icon: <Mail className="w-4 h-4" />,
      action: () => {
        const element = document.getElementById('kontakt');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          return;
        }

        router.push(locale === 'de' ? '/de#kontakt' : '/en#kontakt');
      },
      category: 'action',
      keywords: ['kontakt', 'contact', 'email', 'nachricht', 'message'],
    },
    {
      id: 'achievements',
      title: 'Entdeckungen öffnen',
      titleEN: 'Open discoveries',
      description: 'Das Entdeckungslog mit allen Signalen',
      descriptionEN: 'Open the discovery log with all logged signals',
      icon: <Compass className="w-4 h-4" />,
      action: () => {
        window.dispatchEvent(new CustomEvent('saimor-achievement-menu-open'));
      },
      category: 'action',
      keywords: ['achievements', 'discoveries', 'erfolge', 'entdeckungen', 'archive'],
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
          return;
        }

        router.push(currentPath.replace(/^\/en/, '/de') || '/de');
      },
      category: 'action',
      keywords: ['language', 'sprache', 'english', 'deutsch', 'german'],
    },
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
    return commands.filter((command) => {
      const title = locale === 'en' && command.titleEN ? command.titleEN : command.title;
      const description = locale === 'en' && command.descriptionEN
        ? command.descriptionEN
        : command.description;

      return (
        title.toLowerCase().includes(searchLower) ||
        description.toLowerCase().includes(searchLower) ||
        command.keywords.some((keyword) => keyword.includes(searchLower))
      );
    });
  }, [search, commands, locale]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredCommands.length]);

  const runCommand = useCallback((command: CommandItem) => {
    command.action();
    setIsOpen(false);
    setSearch('');
    window.dispatchEvent(new CustomEvent('saimor-command-palette-used'));
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setIsOpen((current) => !current);
        return;
      }

      if (!isOpen) return;

      if (event.key === 'Escape') {
        setIsOpen(false);
        return;
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setSelectedIndex((current) => current < filteredCommands.length - 1 ? current + 1 : 0);
        return;
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setSelectedIndex((current) => current > 0 ? current - 1 : filteredCommands.length - 1);
        return;
      }

      if (event.key === 'Enter') {
        event.preventDefault();
        const command = filteredCommands[selectedIndex];
        if (command) {
          runCommand(command);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredCommands, isOpen, runCommand, selectedIndex]);

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

  const groupedCommands = useMemo(() => {
    const groups: Record<string, CommandItem[]> = {};

    filteredCommands.forEach((command) => {
      if (!groups[command.category]) {
        groups[command.category] = [];
      }

      groups[command.category].push(command);
    });

    return groups;
  }, [filteredCommands]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[10003] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />

          <motion.div
            className="fixed left-1/2 top-[20%] z-[10004] w-full max-w-xl -translate-x-1/2"
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
              <div className="flex items-center gap-3 border-b border-white/10 px-4 py-4">
                <Search className="h-5 w-5 text-emerald-400/60" />
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={locale === 'de' ? 'Suchen oder Befehl eingeben...' : 'Search or type a command...'}
                  className="flex-1 bg-transparent text-white placeholder-white/40 focus:outline-none"
                />
                <kbd className="hidden items-center gap-1 rounded border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-white/40 sm:flex">
                  ESC
                </kbd>
              </div>

              <div className="custom-scrollbar max-h-80 overflow-y-auto p-2">
                {filteredCommands.length === 0 ? (
                  <div className="py-8 text-center text-sm text-white/40">
                    {locale === 'de' ? 'Keine Ergebnisse gefunden' : 'No results found'}
                  </div>
                ) : (
                  Object.entries(groupedCommands).map(([category, items]) => (
                    <div key={category} className="mb-2">
                      <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white/30">
                        {getCategoryLabel(category)}
                      </div>
                      {items.map((command) => {
                        const globalIndex = filteredCommands.findIndex((entry) => entry.id === command.id);
                        const isSelected = globalIndex === selectedIndex;
                        const title = locale === 'en' && command.titleEN ? command.titleEN : command.title;
                        const description = locale === 'en' && command.descriptionEN
                          ? command.descriptionEN
                          : command.description;

                        return (
                          <motion.button
                            key={command.id}
                            onClick={() => runCommand(command)}
                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                            className={`w-full rounded-xl border px-3 py-3 text-left transition-all ${
                              isSelected
                                ? 'border-emerald-500/30 bg-emerald-500/20'
                                : 'border-transparent hover:bg-white/5'
                            }`}
                            layout
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                                  isSelected
                                    ? 'bg-emerald-500/30 text-emerald-300'
                                    : 'bg-white/5 text-white/50'
                                }`}
                              >
                                {command.icon}
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className={`truncate font-medium ${isSelected ? 'text-white' : 'text-white/80'}`}>
                                  {title}
                                </div>
                                <div className="truncate text-xs text-white/40">
                                  {description}
                                </div>
                              </div>
                              {isSelected && (
                                <div className="flex items-center gap-1 text-emerald-400/60">
                                  <CornerDownLeft className="h-4 w-4" />
                                </div>
                              )}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 text-[10px] text-white/30">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5">↑</kbd>
                    <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5">↓</kbd>
                    <span className="ml-1">{locale === 'de' ? 'Navigieren' : 'Navigate'}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5">↵</kbd>
                    <span className="ml-1">{locale === 'de' ? 'Auswählen' : 'Select'}</span>
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Command className="h-3 w-3" />
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
