'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Link2, Linkedin, Mail, Share2, Twitter } from 'lucide-react';

type Locale = 'de' | 'en';

interface ShareButtonProps {
  title?: string;
  description?: string;
  url?: string;
  locale?: Locale;
}

const SHARE_COPY = {
  de: {
    title: 'Saimôr – OS, Môra und souveräne KI-Systeme',
    description: 'Saimôr verbindet digitalen Arbeitsraum, Daten und KI zu einem System, das Kontext behält.',
    share: 'Teilen',
    copy: 'Link kopieren',
    copied: 'Link kopiert',
    email: 'E-Mail',
  },
  en: {
    title: 'Saimôr – OS, Môra and sovereign AI systems',
    description: 'Saimôr connects digital workspace, data and AI into a system that keeps context.',
    share: 'Share',
    copy: 'Copy link',
    copied: 'Link copied',
    email: 'Email',
  },
} as const;

export default function ShareButton({
  title,
  description,
  url,
  locale = 'de',
}: ShareButtonProps) {
  const copy = SHARE_COPY[locale];
  const shareTitle = title ?? copy.title;
  const shareDescription = description ?? copy.description;
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentUrl(url || window.location.href);
  }, [url]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const shareNative = async () => {
    if (!navigator.share) {
      setIsOpen(true);
      return;
    }

    try {
      await navigator.share({ title: shareTitle, text: shareDescription, url: currentUrl });
    } catch {
      // Native share was cancelled or unavailable for this attempt.
    }
  };

  const shareLinks = [
    {
      id: 'copy',
      name: copied ? copy.copied : copy.copy,
      icon: copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Link2 className="h-4 w-4" />,
      action: copyToClipboard,
      highlight: copied,
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: <Linkedin className="h-4 w-4" />,
      action: () => {
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
          '_blank',
          'width=600,height=400',
        );
      },
    },
    {
      id: 'twitter',
      name: 'Twitter / X',
      icon: <Twitter className="h-4 w-4" />,
      action: () => {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(currentUrl)}`,
          '_blank',
          'width=600,height=400',
        );
      },
    },
    {
      id: 'email',
      name: copy.email,
      icon: <Mail className="h-4 w-4" />,
      action: () => {
        window.location.href = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(`${shareDescription}\n\n${currentUrl}`)}`;
      },
    },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <motion.button
        type="button"
        onClick={shareNative}
        className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white/70 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label={copy.share}
      >
        <Share2 className="h-4 w-4" />
        <span className="text-sm font-medium">{copy.share}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-full right-0 mb-2 w-48"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            <div
              className="overflow-hidden rounded-xl shadow-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(8, 20, 16, 0.98) 0%, rgba(16, 32, 24, 0.95) 100%)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {shareLinks.map((link, index) => (
                <motion.button
                  type="button"
                  key={link.id}
                  onClick={() => {
                    link.action();
                    if (link.id !== 'copy') setIsOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
                    link.highlight
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  } ${index !== shareLinks.length - 1 ? 'border-b border-white/5' : ''}`}
                  whileHover={{ x: 2 }}
                >
                  {link.icon}
                  <span className="text-sm">{link.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FloatingShareButton(props: ShareButtonProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {scrolled && (
        <motion.div
          className="fixed bottom-24 right-6 z-[9995]"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
        >
          <ShareButton {...props} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
