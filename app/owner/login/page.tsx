'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

export default function OwnerLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage('Bitte E-Mail und Passwort eingeben.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        callbackUrl: '/owner',
        redirect: false,
      });

      if (result?.error) {
        setMessage('Login fehlgeschlagen. Prüfe OWNER_EMAILS / OWNER_PASSWORD.');
      } else if (result?.url) {
        window.location.href = result.url;
      }
    } catch {
      setMessage('Ein unerwarteter Fehler ist aufgetreten.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-serif text-slate-800" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Owner Login
          </h1>
          <p className="text-slate-600 mt-2">Passwort-Login für Admin/Owner Bereich.</p>
        </div>

        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                E-Mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                placeholder="owner@saimor.world"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Passwort
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                placeholder="••••••••••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-yellow-500 text-slate-900 px-6 py-3 rounded-xl hover:bg-yellow-400 transition-colors font-medium disabled:opacity-50"
            >
              {isLoading ? 'Login...' : 'Anmelden'}
            </button>

            {message && (
              <div className="p-4 rounded-xl text-sm bg-red-50 text-red-800 border border-red-200">
                {message}
              </div>
            )}

            <div className="text-xs text-slate-600">
              Kein Owner-Passwort gesetzt? Dann konfiguriere SMTP und nutze den Magic-Link Login unter{' '}
              <Link href="/login" className="text-yellow-700 hover:underline">
                /login
              </Link>
              .
            </div>
          </form>
        </div>

        <div className="text-center">
          <Link href="/de" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Zurück zur Startseite
          </Link>
        </div>
      </div>
    </main>
  );
}

