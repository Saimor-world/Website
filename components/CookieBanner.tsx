'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Cookie, Shield, X } from 'lucide-react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user already accepted/rejected cookies
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      // Show banner after 2 seconds
      setTimeout(() => setIsVisible(true), 2000);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('cookie_consent', 'all');
    setIsVisible(false);

    // Enable Matomo
    window._paq?.push(['rememberCookieConsentGiven']);
  };

  const acceptEssential = () => {
    localStorage.setItem('cookie_consent', 'essential');
    setIsVisible(false);

    // Disable Matomo tracking
    window._paq?.push(['forgetCookieConsentGiven']);
  };

  const reject = () => {
    localStorage.setItem('cookie_consent', 'rejected');
    setIsVisible(false);

    // Disable all tracking
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
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-[10000]"
        >
          <div
            className="relative rounded-3xl overflow-hidden shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 245, 240, 0.95) 100%)',
              backdropFilter: 'blur(20px)',
              border: '2px solid rgba(212, 180, 131, 0.4)',
              boxShadow: '0 20px 60px rgba(74, 103, 65, 0.3)'
            }}
          >
            {/* Header */}
            <div className="p-6 pb-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(74, 103, 65, 0.15) 0%, rgba(212, 180, 131, 0.2) 100%)',
                      border: '1px solid rgba(212, 180, 131, 0.3)'
                    }}
                  >
                    <Cookie className="w-6 h-6 text-saimor-green" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                      Datensouveränität
                    </h3>
                    <p className="text-xs text-slate-600">Ihre Entscheidung</p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={reject}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  <X size={16} />
                </motion.button>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed mb-4">
                Wir nutzen <strong>Matomo</strong> (EU-Hosting, DSGVO-konform) für anonyme Analytics.
                Keine Profile, keine Weitergabe. Ihre Wahl.
              </p>

              {/* Details Toggle */}
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-200"
                >
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Shield size={14} className="text-saimor-green" />
                        <span className="text-xs font-semibold text-slate-900">Essenziell</span>
                      </div>
                      <p className="text-xs text-slate-600 pl-5">
                        Technisch notwendig: Session, Einstellungen. Immer aktiv.
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Cookie size={14} className="text-saimor-gold" />
                        <span className="text-xs font-semibold text-slate-900">Analytics (Matomo)</span>
                      </div>
                      <p className="text-xs text-slate-600 pl-5">
                        Anonyme Nutzungsstatistiken. EU-Server, keine IP-Speicherung,
                        keine Weitergabe. DSGVO-konform.
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-200">
                      <p className="text-xs text-slate-500">
                        <strong>Keine:</strong> Tracking-Pixel, Social-Media-Cookies,
                        Werbe-Tracker, Drittanbieter-Scripts
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-xs text-saimor-green hover:text-saimor-gold transition-colors font-semibold"
              >
                {showDetails ? '↑ Weniger anzeigen' : '↓ Details anzeigen'}
              </button>
            </div>

            {/* Actions */}
            <div className="p-6 pt-0 space-y-3">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={acceptAll}
                className="w-full px-6 py-4 rounded-2xl font-bold text-white transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #4A6741 0%, #5D7C54 50%, #D4B483 100%)',
                  boxShadow: '0 8px 20px rgba(74, 103, 65, 0.3)'
                }}
              >
                ✓ Alle akzeptieren
              </motion.button>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={acceptEssential}
                  className="flex-1 px-4 py-3 rounded-2xl text-sm font-semibold text-saimor-green border-2 border-saimor-green/30 hover:bg-saimor-green/5 transition-colors"
                >
                  Nur Essenziell
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={reject}
                  className="flex-1 px-4 py-3 rounded-2xl text-sm font-semibold text-slate-600 border-2 border-slate-300 hover:bg-slate-100 transition-colors"
                >
                  Ablehnen
                </motion.button>
              </div>

              <p className="text-[10px] text-center text-slate-500">
                Mehr in unserer{' '}
                <a href="/de/rechtliches/datenschutz" className="text-saimor-green hover:underline">
                  Datenschutzerklärung
                </a>
              </p>
            </div>

            {/* Decorative Element */}
            <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none opacity-10">
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <Cookie className="w-full h-full text-saimor-green" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
