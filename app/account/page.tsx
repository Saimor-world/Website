'use client';

import { useSession, signOut } from 'next-auth/react';
import { motion } from 'framer-motion';
import { User, Mail, LogOut, MessageCircle, Crown } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AccountPage() {
  const { data: session, status } = useSession();
  const [chatStats, setChatStats] = useState({ messagesCount: 0, lastActivity: null });

  useEffect(() => {
    if (session) {
      // Get chat statistics from localStorage or API
      const stats = localStorage.getItem('chatStats');
      if (stats) {
        setChatStats(JSON.parse(stats));
      }
    }
  }, [session]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-2xl font-serif text-slate-800 mb-4">Nicht angemeldet</h1>
          <p className="text-slate-600 mb-6">Sie müssen sich anmelden, um auf Ihr Konto zuzugreifen.</p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 bg-yellow-500 text-slate-900 px-6 py-3 rounded-xl hover:bg-yellow-400 transition-colors"
          >
            Zur Anmeldung
          </Link>
        </motion.div>
      </div>
    );
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: '/de' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-slate-900" />
          </div>
          <h1 className="text-3xl font-serif text-slate-800" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Ihr Konto
          </h1>
          <p className="text-slate-600 mt-2">Verwalten Sie Ihre Saimôr-Erfahrung</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Account Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-yellow-600" />
              <h2 className="text-xl font-semibold text-slate-800">Kontoinformationen</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">E-Mail-Adresse</label>
                <p className="text-slate-800 bg-slate-50 p-3 rounded-lg">{session.user?.email}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Kontotyp</label>
                <div className="flex items-center gap-2">
                  {session.user?.role === 'pro' ? (
                    <>
                      <Crown className="w-5 h-5 text-yellow-600" />
                      <span className="text-yellow-600 font-semibold">Pro-Mitglied</span>
                    </>
                  ) : (
                    <>
                      <User className="w-5 h-5 text-slate-600" />
                      <span className="text-slate-600">Kostenlos</span>
                    </>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Angemeldet seit</label>
                <p className="text-slate-800">Heute</p>
              </div>
            </div>
          </motion.div>

          {/* Chat Statistics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <MessageCircle className="w-6 h-6 text-yellow-600" />
              <h2 className="text-xl font-semibold text-slate-800">Chat-Aktivität</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Nachrichten gesendet</label>
                <p className="text-2xl font-bold text-slate-800">{chatStats.messagesCount}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Chat-Limits</label>
                <div className="space-y-2">
                  {session.user?.role === 'pro' ? (
                    <p className="text-green-600 font-semibold">✓ Unbegrenzte Nachrichten</p>
                  ) : (
                    <p className="text-slate-600">5 Nachrichten pro Session (öffentlich)</p>
                  )}
                  <p className="text-slate-600">
                    {session.user?.role === 'pro' ? '✓ Vollständiger Chat-Verlauf' : '✗ Kein persistenter Verlauf'}
                  </p>
                </div>
              </div>

              {session.user?.role !== 'pro' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-800 mb-2">Upgrade zu Pro</h3>
                  <p className="text-sm text-yellow-700 mb-3">
                    Erhalten Sie unbegrenzten Zugang zu erweiterten Chat-Funktionen und persistentem Verlauf.
                  </p>
                  <button className="text-sm bg-yellow-500 text-slate-900 px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors">
                    Mehr erfahren
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center space-y-4"
        >
          <div className="flex gap-4 justify-center">
            <Link
              href="/de"
              className="bg-slate-200 text-slate-700 px-6 py-3 rounded-xl hover:bg-slate-300 transition-colors"
            >
              Zur Startseite
            </Link>

            <button
              onClick={handleSignOut}
              className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition-colors flex items-center gap-2"
            >
              <LogOut className="w-5 h-5" />
              Abmelden
            </button>
          </div>

          <p className="text-xs text-slate-500">
            Fragen zu Ihrem Konto?{' '}
            <Link href="/de/kontakt" className="text-yellow-600 hover:underline">
              Kontaktieren Sie uns
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}