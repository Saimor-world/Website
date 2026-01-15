'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Shield, Eye, EyeOff, ChevronDown, Check, X } from 'lucide-react';

export default function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setTimeout(() => setIsVisible(true), 2500);
    }
  }, [mounted]);

  const acceptAll = () => {
    localStorage.setItem('cookie_consent', 'all');
    localStorage.setItem('analytics_enabled', 'true');
    setIsVisible(false);
    window._paq?.push(['rememberCookieConsentGiven']);
  };

  const acceptSelected = () => {
    localStorage.setItem('cookie_consent', analyticsEnabled ? 'analytics' : 'essential');
    localStorage.setItem('analytics_enabled', String(analyticsEnabled));
    setIsVisible(false);
    
    if (analyticsEnabled) {
      window._paq?.push(['rememberCookieConsentGiven']);
    } else {
      window._paq?.push(['forgetCookieConsentGiven']);
    }
  };

  const rejectAll = () => {
    localStorage.setItem('cookie_consent', 'rejected');
    localStorage.setItem('analytics_enabled', 'false');
    setIsVisible(false);
    window._paq?.push(['forgetCookieConsentGiven']);
    window._paq?.push(['optUserOut']);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 35 }}
          className="fixed bottom-4 left-4 right-4 md:right-auto md:left-6 md:bottom-6 md:max-w-[420px] z-[10000]"
        >
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(8, 20, 16, 0.98) 0%, rgba(5, 18, 8, 0.95) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(16, 185, 129, 0.1), inset 0 1px 0 rgba(255,255,255,0.05)'
            }}
          >
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

            {/* Header */}
            <div className="relative p-5 pb-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/20">
                    <Shield className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">
                      Datenschutz-Präferenzen
                    </h3>
                    <p className="text-[11px] text-white/50">DSGVO-konform · EU-Hosting</p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={rejectAll}
                  className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white/70 transition-colors"
                >
                  <X size={14} />
                </motion.button>
              </div>

              <p className="text-[13px] text-white/70 leading-relaxed mb-4">
                Wir nutzen <span className="text-emerald-400 font-medium">Matomo Analytics</span> auf 
                EU-Servern für anonyme Nutzungsstatistiken. Keine Weitergabe an Dritte.
              </p>

              {/* Cookie Options */}
              <div className="space-y-2 mb-4">
                {/* Essential - Always On */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                      <Check className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Essenziell</p>
                      <p className="text-[11px] text-white/50">Immer aktiv</p>
                    </div>
                  </div>
                  <div className="w-10 h-5 rounded-full bg-emerald-500/30 flex items-center justify-end px-0.5">
                    <div className="w-4 h-4 rounded-full bg-emerald-400 shadow-lg shadow-emerald-500/30" />
                  </div>
                </div>

                {/* Analytics - Toggle */}
                <button
                  onClick={() => setAnalyticsEnabled(!analyticsEnabled)}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/[0.07] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                      {analyticsEnabled ? (
                        <Eye className="w-4 h-4 text-cyan-400" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-white/40" />
                      )}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-white">Analytics</p>
                      <p className="text-[11px] text-white/50">Anonyme Statistiken</p>
                    </div>
                  </div>
                  <motion.div
                    className={`w-10 h-5 rounded-full flex items-center px-0.5 transition-colors ${
                      analyticsEnabled ? 'bg-cyan-500/30 justify-end' : 'bg-white/10 justify-start'
                    }`}
                    layout
                  >
                    <motion.div
                      className={`w-4 h-4 rounded-full shadow-lg ${
                        analyticsEnabled ? 'bg-cyan-400 shadow-cyan-500/30' : 'bg-white/40'
                      }`}
                      layout
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  </motion.div>
                </button>
              </div>

              {/* Details Toggle */}
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-1 text-[11px] text-white/50 hover:text-white/70 transition-colors mb-1"
              >
                <motion.div
                  animate={{ rotate: showDetails ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={12} />
                </motion.div>
                {showDetails ? 'Weniger Details' : 'Mehr Details'}
              </button>

              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 pb-1 text-[11px] text-white/50 space-y-2">
                      <p>
                        <strong className="text-white/70">Essenziell:</strong> Session-Management, 
                        Spracheinstellungen, Cookie-Präferenzen. Technisch notwendig.
                      </p>
                      <p>
                        <strong className="text-white/70">Analytics (Matomo):</strong> Anonyme 
                        Besucherstatistiken. Keine IP-Speicherung, keine Weitergabe, 
                        EU-Server (Hetzner, Deutschland).
                      </p>
                      <p className="pt-1 border-t border-white/10">
                        <span className="text-emerald-400/80">Wir nutzen keine:</span> Social Media Tracker, 
                        Werbe-Cookies, Google Analytics, oder Drittanbieter-Scripts.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Actions */}
            <div className="relative p-5 pt-0 space-y-2">
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={acceptAll}
                className="w-full px-5 py-3 rounded-xl font-semibold text-sm text-white transition-all"
                style={{
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 50%, #06B6D4 100%)',
                  boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)'
                }}
              >
                Alle akzeptieren
              </motion.button>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={acceptSelected}
                  className="flex-1 px-4 py-2.5 rounded-xl text-[13px] font-medium text-white/80 border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all"
                >
                  Auswahl speichern
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={rejectAll}
                  className="flex-1 px-4 py-2.5 rounded-xl text-[13px] font-medium text-white/50 border border-white/5 hover:bg-white/5 hover:text-white/70 transition-all"
                >
                  Nur Essenziell
                </motion.button>
              </div>

              <p className="text-[10px] text-center text-white/30 pt-1">
                Mehr in unserer{' '}
                <a href="/de/rechtliches/datenschutz" className="text-emerald-400/60 hover:text-emerald-400 hover:underline transition-colors">
                  Datenschutzerklärung
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
