'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Link2, Check, Twitter, Linkedin, Mail, Copy } from 'lucide-react';

interface ShareButtonProps {
  title?: string;
  description?: string;
  url?: string;
}

export default function ShareButton({ 
  title = 'Saimôr – Klarheit im Wandel',
  description = 'Das semantische Betriebssystem für zukunftsfähige Organisationen.',
  url 
}: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentUrl(url || window.location.href);
  }, [url]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: currentUrl,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      setIsOpen(true);
    }
  };

  const shareLinks = [
    {
      name: 'Link kopieren',
      icon: copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Link2 className="w-4 h-4" />,
      action: copyToClipboard,
      highlight: copied,
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-4 h-4" />,
      action: () => {
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
          '_blank',
          'width=600,height=400'
        );
      },
    },
    {
      name: 'Twitter / X',
      icon: <Twitter className="w-4 h-4" />,
      action: () => {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`,
          '_blank',
          'width=600,height=400'
        );
      },
    },
    {
      name: 'Email',
      icon: <Mail className="w-4 h-4" />,
      action: () => {
        window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${description}\n\n${currentUrl}`)}`;
      },
    },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <motion.button
        onClick={shareNative}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Share2 className="w-4 h-4" />
        <span className="text-sm font-medium">Teilen</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-full mb-2 right-0 w-48"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            <div
              className="rounded-xl overflow-hidden shadow-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(8, 20, 16, 0.98) 0%, rgba(16, 32, 24, 0.95) 100%)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {shareLinks.map((link, i) => (
                <motion.button
                  key={link.name}
                  onClick={() => {
                    link.action();
                    if (link.name !== 'Link kopieren') {
                      setIsOpen(false);
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                    link.highlight 
                      ? 'bg-emerald-500/20 text-emerald-300' 
                      : 'hover:bg-white/5 text-white/70 hover:text-white'
                  } ${i !== shareLinks.length - 1 ? 'border-b border-white/5' : ''}`}
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

// Floating share button for pages
export function FloatingShareButton(props: ShareButtonProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 300);
    };

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

