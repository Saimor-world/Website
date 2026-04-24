'use client';

import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, X, Lock, Sparkles, Loader2, ArrowRight } from 'lucide-react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'magic' | 'password';
};

export default function LoginOverlay({ isOpen, onClose, initialMode = 'magic' }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMode, setLoginMode] = useState<'magic' | 'password'>(initialMode);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Reset state on close
  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setPassword('');
      setMessage('');
      setIsLoading(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      if (loginMode === 'magic') {
        const result = await signIn('email', {
          email,
          redirect: false,
          callbackUrl: '/account/bridge'
        });

        if (result?.error) {
          setMessage(result.error === 'EmailSignin' ? 'E-Mail Versand fehlgeschlagen.' : 'Fehler beim Login.');
        } else {
          setMessage('Anmeldelink gesendet! Bitte Postfach pruefen.');
        }
      } else {
        const result = await signIn('credentials', {
          email,
          password,
          redirect: false,
          callbackUrl: '/account/bridge',
        });

        if (result?.error) {
          setMessage('Login fehlgeschlagen. Daten pruefen.');
        } else if (result?.url) {
          window.location.href = result.url;
        } else {
          window.location.href = '/account/bridge';
        }
      }
    } catch (error) {
      setMessage('Ein unerwarteter Fehler ist aufgetreten.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-[440px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#081410]/80 shadow-2xl backdrop-blur-2xl"
          >
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 blur-[80px]" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-500/10 blur-[80px]" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-8 sm:p-10 space-y-8">
              <header className="text-center space-y-3">
                <div className="inline-flex p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-2">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h2 className="text-3xl text-white font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  Willkommen zurück
                </h2>
                <p className="text-white/40 text-sm">Betrete dein persönliches Mora Interface.</p>
              </header>

              {/* Mode Switcher */}
              <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                <button
                  onClick={() => setLoginMode('magic')}
                  className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${loginMode === 'magic' ? 'bg-white/10 text-white shadow-lg' : 'text-white/30 hover:text-white/50'}`}
                >
                  Magic Link
                </button>
                <button
                  onClick={() => setLoginMode('password')}
                  className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${loginMode === 'password' ? 'bg-white/10 text-white shadow-lg' : 'text-white/30 hover:text-white/50'}`}
                >
                  Passwort
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold ml-1">E-Mail Adresse</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/40 outline-none text-white transition-all"
                    />
                  </div>
                </div>

                {loginMode === 'password' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-1.5"
                  >
                    <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold ml-1">Passwort</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                      <input
                        required
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/40 outline-none text-white transition-all"
                      />
                    </div>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full group relative flex items-center justify-center gap-3 px-6 py-4 bg-white text-black font-bold rounded-2xl hover:bg-emerald-300 transition-all disabled:opacity-50 overflow-hidden"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span>{loginMode === 'magic' ? 'Anmeldelink anfordern' : 'Interface betreten'}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                {message && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-4 rounded-2xl text-xs text-center border ${
                      message.includes('gesendet') ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}
                  >
                    {message}
                  </motion.div>
                )}
              </form>

              <footer className="text-center pt-2">
                <p className="text-[10px] text-white/20 uppercase tracking-widest">
                  Secure Access via Mora CORE Protocol
                </p>
              </footer>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
