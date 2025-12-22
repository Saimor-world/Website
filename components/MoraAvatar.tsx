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
  const [dashboardHover, setDashboardHover] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showInfoPopup, setShowInfoPopup] = useState(false);

  // Hydration fix: only run client-side code after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const sendOrbHoverEvent = useCallback((state: boolean) => {
    if (typeof window === 'undefined') return;
    window.dispatchEvent(new CustomEvent('mora-orb-hover', { detail: state }));
  }, []);

  useEffect(() => () => sendOrbHoverEvent(false), [sendOrbHoverEvent]);

  const content = {
    de: {
      hover: 'Klick mich! (Long-press für Menü)',
      greeting: 'Hallo! Ich bin Môra ðŸŒ±',
      subtitle: 'Deine KI-Begleiterin für Klarheit',
      infoTitle: 'Môra erwacht bald!',
      infoText: 'Ich bin deine KI-Assistentin für Business-Klarheit. Momentan wird der MVP-Prototyp entwickelt. Bald kann ich dir helfen mit:',
      infoFeatures: [
        'ðŸ“Š Echtzeit-Analysen deiner Business-Daten',
        'ðŸŽ¯ Klare Antworten statt Datenflut',
        'ðŸ” DSGVO-konform, EU-Hosting',
        'ðŸŒ€ Cross-Channel (Web, Voice, Dashboard)'
      ],
      infoCTA: 'Komm auf die Warteliste',
      infoChatCTA: 'Mit MA\'ra chatten',
      quickActions: {
        title: 'Quick Actions',
        chat: 'ðŸ’¬ Mit Môra chatten',
        about: 'ðŸ“š Über Saimôr',
        services: 'ðŸŽ¯ Services',
        close: 'âœ• Schließen'
      }
    },
    en: {
      hover: 'Click me! (Long-press for menu)',
      greeting: 'Hello! I\'m Môra ðŸŒ±',
      subtitle: 'Your AI companion for clarity',
      infoTitle: 'Môra is waking up soon!',
      infoText: 'I\'m your AI assistant for business clarity. The MVP prototype is currently in development. Soon I can help you with:',
      infoFeatures: [
        'ðŸ“Š Real-time analysis of your business data',
        'ðŸŽ¯ Clear answers instead of data overload',
        'ðŸ” GDPR-compliant, EU hosting',
        'ðŸŒ€ Cross-channel (Web, Voice, Dashboard)'
      ],
      infoCTA: 'Join the waitlist',
      infoChatCTA: 'Chat with MA\'ra',
      quickActions: {
        title: 'Quick Actions',
        chat: 'ðŸ’¬ Chat with Môra',
        about: 'ðŸ“š About Saimôr',
        services: 'ðŸŽ¯ Services',
        close: 'âœ• Close'
      }
    }
  }[locale];

  const orbAriaLabel = locale === 'de' ? 'Môra – verbunden mit dem Dashboard' : 'Môra – connected to the dashboard';

  const openChatOverlay = useCallback(() => {
    if (typeof window === 'undefined') return;
    window.dispatchEvent(new Event('openMoraChat'));
  }, []);

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

  useEffect(() => {
    if (!mounted) return;
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<boolean>).detail;
      setDashboardHover(Boolean(detail));
    };
    window.addEventListener('mora-dashboard-card-hover', handler as EventListener);
    return () => window.removeEventListener('mora-dashboard-card-hover', handler as EventListener);
  }, [mounted]);

  const updateHoverState = useCallback(
    (state: boolean) => {
      setIsHovered(state);
      sendOrbHoverEvent(state);
    },
    [sendOrbHoverEvent]
  );

  const handleClick = () => {
    // Open info popup
    setShowInfoPopup(true);
    setShowQuickActions(false);
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'chat':
        openChatOverlay();
        setShowInfoPopup(false);
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
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5, type: 'spring' }}
      >
        <div className="relative">
          {/* Avatar Container */}
          <motion.div
            id="mora-avatar"
            className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full cursor-pointer group"
            data-mora-orb="true"
            style={{
              background: 'linear-gradient(135deg, #4A6741 0%, #5D7C54 50%, #D4A857 100%)',
              boxShadow: '0 8px 32px rgba(74, 103, 65, 0.3)'
            }}
            onMouseEnter={() => updateHoverState(true)}
            onMouseLeave={() => updateHoverState(false)}
            onFocus={() => updateHoverState(true)}
            onBlur={() => updateHoverState(false)}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onClick={handleClick}
            aria-label={orbAriaLabel}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: isHovered
                ? '0 12px 48px rgba(212, 180, 131, 0.5)'
                : dashboardHover
                  ? '0 10px 40px rgba(212, 180, 131, 0.35)'
                  : '0 8px 32px rgba(74, 103, 65, 0.3)',
              scale: dashboardHover && !isHovered ? 1.02 : 1
            }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full opacity-50"
              style={{
                background: 'radial-gradient(circle, rgba(212, 180, 131, 0.4) 0%, transparent 70%)',
                filter: 'blur(8px)'
              }}
              animate={{
                scale: (isHovered || dashboardHover) ? [1, 1.25, 1] : [1, 1.1, 1],
                opacity: (isHovered || dashboardHover) ? [0.4, 0.7, 0.4] : [0.25, 0.5, 0.25]
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
              className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#D4A857] flex items-center justify-center shadow-lg"
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
                <div className="bg-[#1a1f16] text-[#D4A857] px-4 py-2 rounded-lg text-sm font-medium shadow-xl border border-[#D4A857]/20">
                  {content.hover}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1a1f16] rotate-45 border-r border-b border-[#D4A857]/20" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Info Popup */}
          <AnimatePresence>
            {showInfoPopup && (
              <motion.div
                className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowInfoPopup(false)}
              >
                {/* Backdrop */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

                {/* Popup */}
                <motion.div
                  className="relative bg-gradient-to-br from-white to-[#F8F5F0] rounded-3xl shadow-2xl max-w-md w-full border-2 border-[#D4A857]/30 overflow-hidden"
                  initial={{ scale: 0.8, y: 50 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.8, y: 50 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Header with Môra */}
                  <div className="relative bg-gradient-to-br from-[#4A6741] to-[#D4A857] p-8 text-white text-center overflow-hidden">
                    {/* Animated sparkles */}
                    <motion.div
                      className="absolute top-4 right-4"
                      animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Sparkles className="w-6 h-6" />
                    </motion.div>

                    <motion.div
                      className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(255,255,255,0.2)' }}
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      {/* Môra Face */}
                      <div className="relative">
                        <div className="flex gap-3">
                          <div className="w-3 h-4 bg-white rounded-full" />
                          <div className="w-3 h-4 bg-white rounded-full" />
                        </div>
                      </div>
                    </motion.div>

                    <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                      {content.infoTitle}
                    </h3>
                    <p className="text-white/90 text-sm">
                      {content.infoText}
                    </p>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="space-y-3 mb-6">
                      {content.infoFeatures.map((feature, i) => (
                        <motion.div
                          key={i}
                          className="flex items-start gap-3 text-sm text-slate-700"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <span className="text-lg">{feature.split(' ')[0]}</span>
                          <span>{feature.substring(feature.indexOf(' ') + 1)}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Progress */}
                    <div className="bg-[#4A6741]/10 rounded-xl p-4 mb-6">
                      <div className="flex justify-between text-xs mb-2 text-slate-600">
                        <span>MVP-Entwicklung</span>
                        <span>In Arbeit</span>
                      </div>
                      <div className="w-full bg-white rounded-full h-2 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#4A6741] to-[#D4A857]"
                          initial={{ width: 0 }}
                          animate={{ width: '60%' }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="space-y-3">
                      <motion.button
                        onClick={() => {
                          setShowInfoPopup(false);
                          setTimeout(() => window.location.hash = '#waitlist', 300);
                        }}
                        className="w-full py-4 rounded-2xl font-bold text-white shadow-lg"
                        style={{
                          background: 'linear-gradient(135deg, #4A6741 0%, #D4A857 100%)'
                        }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {content.infoCTA}
                      </motion.button>

                      <motion.button
                        onClick={() => {
                          setShowInfoPopup(false);
                          openChatOverlay();
                        }}
                        className="w-full py-4 rounded-2xl font-semibold text-[#4A6741] border border-[#D4A857]/40 bg-white/95 shadow-lg"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {content.infoChatCTA}
                      </motion.button>
                    </div>
                  </div>

                  {/* Close button */}
                  <button
                    onClick={() => setShowInfoPopup(false)}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition"
                  >
                    <X size={16} />
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Actions Menu */}
          <AnimatePresence>
            {showQuickActions && (
              <motion.div
                className="absolute bottom-full right-0 mb-3 bg-[#1a1f16] border-2 border-[#D4A857]/30 rounded-xl shadow-2xl p-4 min-w-[200px]"
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-[#D4A857] font-semibold mb-3 text-sm">
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
