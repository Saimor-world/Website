'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';

interface MoraAvatarProps {
  locale?: 'de' | 'en';
}

export default function MoraAvatar({ locale = 'de' }: MoraAvatarProps) {
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Hydration fix: only run client-side code after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const content = {
    de: {
      hover: 'Hey! Klick mich an 👋',
      greeting: 'Hallo! Ich bin Môra',
      subtitle: 'Deine KI-Begleiterin für Klarheit',
      quickActions: {
        title: 'Quick Actions',
        chat: '💬 Chat starten',
        about: '📚 Über Saimôr',
        services: '🎯 Services',
        close: '✕ Schließen'
      }
    },
    en: {
      hover: 'Hey! Click me 👋',
      greeting: 'Hello! I\'m Môra',
      subtitle: 'Your AI companion for clarity',
      quickActions: {
        title: 'Quick Actions',
        chat: '💬 Start chat',
        about: '📚 About Saimôr',
        services: '🎯 Services',
        close: '✕ Close'
      }
    }
  }[locale];

  // Track mouse for eye movement
  useEffect(() => {
    if (!mounted) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mounted]);

  // Calculate eye rotation based on mouse position
  const calculateEyePosition = useCallback(() => {
    if (typeof window === 'undefined') return { x: 0, y: 0 };

    const avatar = document.getElementById('mora-avatar');
    if (!avatar) return { x: 0, y: 0 };

    const rect = avatar.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const angle = Math.atan2(mousePos.y - centerY, mousePos.x - centerX);
    const distance = Math.min(
      Math.sqrt(
        Math.pow(mousePos.x - centerX, 2) +
        Math.pow(mousePos.y - centerY, 2)
      ) / 100,
      1
    );

    return {
      x: Math.cos(angle) * distance * 8,
      y: Math.sin(angle) * distance * 8
    };
  }, [mousePos]);

  const eyePos = calculateEyePosition();

  const handleClick = () => {
    // Scroll to waitlist
    window.location.hash = '#waitlist';
    setShowQuickActions(false);
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'chat':
        window.location.hash = '#waitlist';
        break;
      case 'about':
        window.location.hash = '#angebot';
        break;
      case 'services':
        window.location.hash = '#angebot';
        break;
    }
    setShowQuickActions(false);
  };

  // Long-press detection
  let pressTimer: NodeJS.Timeout;
  const handleMouseDown = () => {
    pressTimer = setTimeout(() => {
      setShowQuickActions(true);
    }, 800);
  };
  const handleMouseUp = () => {
    clearTimeout(pressTimer);
  };

  return (
    <>
      {/* Floating Avatar - Bottom Right */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5, type: 'spring' }}
      >
        <div className="relative">
          {/* Avatar Container */}
          <motion.div
            id="mora-avatar"
            className="relative w-20 h-20 rounded-full cursor-pointer group"
            style={{
              background: 'linear-gradient(135deg, #4A6741 0%, #5D7C54 50%, #D4B483 100%)',
              boxShadow: '0 8px 32px rgba(74, 103, 65, 0.3)'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onClick={handleClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: isHovered
                ? '0 12px 48px rgba(212, 180, 131, 0.5)'
                : '0 8px 32px rgba(74, 103, 65, 0.3)'
            }}
          >
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full opacity-50"
              style={{
                background: 'radial-gradient(circle, rgba(212, 180, 131, 0.4) 0%, transparent 70%)',
                filter: 'blur(8px)'
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Face */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Eyes */}
              <div className="flex gap-5">
                {/* Left Eye */}
                <div className="w-4 h-5 bg-white rounded-full relative overflow-hidden">
                  <motion.div
                    className="absolute w-3 h-3 bg-[#1a1f16] rounded-full"
                    style={{
                      left: '50%',
                      top: '50%',
                      x: eyePos.x,
                      y: eyePos.y,
                      translateX: '-50%',
                      translateY: '-50%'
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  />
                </div>
                {/* Right Eye */}
                <div className="w-4 h-5 bg-white rounded-full relative overflow-hidden">
                  <motion.div
                    className="absolute w-3 h-3 bg-[#1a1f16] rounded-full"
                    style={{
                      left: '50%',
                      top: '50%',
                      x: eyePos.x,
                      y: eyePos.y,
                      translateX: '-50%',
                      translateY: '-50%'
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  />
                </div>
              </div>
            </div>

            {/* Sparkles icon overlay */}
            <motion.div
              className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#D4B483] flex items-center justify-center shadow-lg"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                scale: { duration: 2, repeat: Infinity }
              }}
            >
              <Sparkles className="w-3 h-3 text-white" />
            </motion.div>
          </motion.div>

          {/* Hover Tooltip */}
          <AnimatePresence>
            {isHovered && !showQuickActions && (
              <motion.div
                className="absolute bottom-full left-1/2 mb-3 whitespace-nowrap"
                initial={{ opacity: 0, y: 10, x: '-50%' }}
                animate={{ opacity: 1, y: 0, x: '-50%' }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-[#1a1f16] text-[#D4B483] px-4 py-2 rounded-lg text-sm font-medium shadow-xl border border-[#D4B483]/20">
                  {content.hover}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1a1f16] rotate-45 border-r border-b border-[#D4B483]/20" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Actions Menu */}
          <AnimatePresence>
            {showQuickActions && (
              <motion.div
                className="absolute bottom-full right-0 mb-3 bg-[#1a1f16] border-2 border-[#D4B483]/30 rounded-xl shadow-2xl p-4 min-w-[200px]"
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-[#D4B483] font-semibold mb-3 text-sm">
                  {content.quickActions.title}
                </div>
                <div className="space-y-2">
                  <button
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#4A6741]/20 text-white text-sm transition flex items-center gap-2"
                    onClick={() => handleQuickAction('chat')}
                  >
                    {content.quickActions.chat}
                  </button>
                  <button
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#4A6741]/20 text-white text-sm transition flex items-center gap-2"
                    onClick={() => handleQuickAction('about')}
                  >
                    {content.quickActions.about}
                  </button>
                  <button
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#4A6741]/20 text-white text-sm transition flex items-center gap-2"
                    onClick={() => handleQuickAction('services')}
                  >
                    {content.quickActions.services}
                  </button>
                  <button
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-500/20 text-red-400 text-sm transition mt-2 flex items-center gap-2"
                    onClick={() => setShowQuickActions(false)}
                  >
                    {content.quickActions.close}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Idle Blink Animation */}
      <style jsx global>{`
        @keyframes mora-blink {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.1); }
        }
        #mora-avatar:not(:hover) .eye-pupil {
          animation: mora-blink 4s infinite;
        }
      `}</style>
    </>
  );
}
