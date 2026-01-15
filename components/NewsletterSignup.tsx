'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Check, ArrowRight, X } from 'lucide-react';

interface NewsletterSignupProps {
  variant?: 'inline' | 'modal' | 'footer';
  trigger?: React.ReactNode;
  onClose?: () => void;
}

export default function NewsletterSignup({ variant = 'inline', trigger, onClose }: NewsletterSignupProps) {
  const [isOpen, setIsOpen] = useState(variant === 'modal');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');

    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setMessage('Erfolgreich angemeldet! Prüfe dein Email-Postfach.');
      setEmail('');

      // Close modal after success
      if (variant === 'modal') {
        setTimeout(() => {
          setIsOpen(false);
          onClose?.();
        }, 2000);
      }
    }, 1500);
  };

  const handleTriggerClick = () => {
    setIsOpen(true);
  };

  if (variant === 'modal') {
    return (
      <>
        {/* Trigger */}
        {trigger && (
          <div onClick={handleTriggerClick}>
            {trigger}
          </div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 z-[10002] bg-black/60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => {
                  setIsOpen(false);
                  onClose?.();
                }}
              />

              {/* Modal Content */}
              <motion.div
                className="fixed top-1/2 left-1/2 z-[10003] w-full max-w-md -translate-x-1/2 -translate-y-1/2"
                initial={{ opacity: 0, scale: 0.9, y: '50%' }}
                animate={{ opacity: 1, scale: 1, y: '50%' }}
                exit={{ opacity: 0, scale: 0.9, y: '50%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <div
                  className="relative rounded-3xl p-8 shadow-2xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(8, 20, 16, 0.98) 0%, rgba(16, 32, 24, 0.95) 100%)',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(16, 185, 129, 0.1)',
                  }}
                >
                  {/* Close Button */}
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onClose?.();
                    }}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Content */}
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                        <Mail className="w-8 h-8 text-emerald-400" />
                      </div>
                      <h3 className="text-2xl font-semibold text-white mb-2">Bleib informiert</h3>
                      <p className="text-white/70">
                        Erhalte Updates über neue Features, Sicherheit und den Produkt-Launch.
                      </p>
                    </div>

                    <AnimatePresence mode="wait">
                      {status === 'success' ? (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-center space-y-4 py-4"
                        >
                          <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto">
                            <Check className="w-6 h-6 text-emerald-400" />
                          </div>
                          <p className="text-emerald-300 font-medium">{message}</p>
                        </motion.div>
                      ) : (
                        <motion.form
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          onSubmit={handleSubmit}
                          className="space-y-4"
                        >
                          <div>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="deine@email.de"
                              required
                              disabled={status === 'loading'}
                              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-emerald-500/50 focus:bg-white/15 transition-all"
                            />
                          </div>

                          <button
                            type="submit"
                            disabled={status === 'loading' || !email.trim()}
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                          >
                            {status === 'loading' ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                              />
                            ) : (
                              <>
                                <span>Newsletter abonnieren</span>
                                <ArrowRight className="w-4 h-4" />
                              </>
                            )}
                          </button>
                        </motion.form>
                      )}
                    </AnimatePresence>

                    <p className="text-xs text-white/50 text-center">
                      Wir respektieren deine Privatsphäre. Abmeldung jederzeit möglich.
                    </p>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </>
    );
  }

  if (variant === 'footer') {
    return (
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">Newsletter</h4>
        <p className="text-white/70 text-sm">
          Erhalte Updates über neue Features und den Launch.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email-Adresse"
              required
              disabled={status === 'loading'}
              className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-emerald-500/50 text-sm"
            />
            <button
              type="submit"
              disabled={status === 'loading' || !email.trim()}
              className="px-4 py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 hover:text-emerald-200 transition-all disabled:opacity-50 text-sm font-medium flex items-center gap-1"
            >
              {status === 'loading' ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                />
              ) : status === 'success' ? (
                <Check className="w-4 h-4" />
              ) : (
                <Mail className="w-4 h-4" />
              )}
            </button>
          </div>

          {status === 'success' && (
            <p className="text-emerald-300 text-xs">{message}</p>
          )}

          {status === 'error' && (
            <p className="text-red-300 text-xs">{message}</p>
          )}
        </form>
      </div>
    );
  }

  // Inline variant (default)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all"
    >
      <div className="text-center space-y-6">
        <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mx-auto">
          <Mail className="w-6 h-6 text-emerald-400" />
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-white mb-2">Bleib auf dem Laufenden</h3>
          <p className="text-white/70">
            Erhalte Updates über neue Features, Sicherheit und den Produkt-Launch.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="deine@email.de"
            required
            disabled={status === 'loading'}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-emerald-500/50 focus:bg-white/15 transition-all"
          />

          <button
            type="submit"
            disabled={status === 'loading' || !email.trim()}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {status === 'loading' ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
              />
            ) : (
              <>
                <span>Newsletter abonnieren</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          {status === 'success' && (
            <p className="text-emerald-300 text-sm">{message}</p>
          )}

          {status === 'error' && (
            <p className="text-red-300 text-sm">{message}</p>
          )}
        </form>

        <p className="text-xs text-white/50">
          Wir respektieren deine Privatsphäre. Abmeldung jederzeit möglich.
        </p>
      </div>
    </motion.div>
  );
}

// Quick Newsletter CTA Button
export function NewsletterCTA() {
  return (
    <NewsletterSignup
      variant="modal"
      trigger={
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 hover:text-emerald-200 transition-all text-sm font-medium"
        >
          <Mail className="w-4 h-4" />
          <span>Newsletter</span>
        </motion.button>
      }
    />
  );
}

