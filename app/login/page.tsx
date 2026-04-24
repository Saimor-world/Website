'use client';

import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { Mail, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { safeInternalPath } from '@/lib/safe-redirect';

export default function LoginPage() {
  const [callbackUrl, setCallbackUrl] = useState('/account/bridge');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMode, setLoginMode] = useState<'magic' | 'password'>('magic');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const next = new URLSearchParams(window.location.search).get('callbackUrl');
    setCallbackUrl(safeInternalPath(next, '/account/bridge'));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setMessage('Bitte geben Sie eine E-Mail-Adresse ein.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      if (loginMode === 'magic') {
        const response = await fetch('/api/auth/magic-link', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            callbackUrl,
            locale: 'de',
          }),
        });

        const payload = await response.json().catch(() => ({} as any));
        if (!response.ok) {
          if (response.status === 429) {
            setMessage('Zu viele Versuche. Bitte warte kurz und versuche es erneut.');
          } else if (response.status === 503) {
            setMessage('Magic-Link-Mail ist aktuell nicht konfiguriert.');
          } else {
            setMessage(payload?.error || 'Fehler beim Versenden der E-Mail. Bitte versuchen Sie es erneut.');
          }
        } else {
          if (payload?.debugUrl) {
            window.location.href = payload.debugUrl;
            return;
          }
          setMessage('Ein Anmeldelink wurde an Ihre E-Mail-Adresse gesendet. Bitte pruefen Sie Ihr Postfach.');
        }
      } else {
        const result = await signIn('credentials', {
          email,
          password,
          redirect: false,
          callbackUrl,
        });

        if (result?.error) {
          if (result.error === 'CredentialsSignin') {
            setMessage('Login fehlgeschlagen. Bitte E-Mail/Passwort pruefen.');
          } else {
            setMessage(`Login fehlgeschlagen (${result.error}).`);
          }
        } else if (result?.url) {
          window.location.href = result.url;
        } else {
          window.location.href = callbackUrl;
        }
      }
    } catch (error) {
      setMessage('Ein unerwarteter Fehler ist aufgetreten.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060d0b] flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-4xl text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Mora CORE Login
          </h1>
          <p className="text-white/50 mt-2">Waehlen Sie Ihre bevorzugte Login-Methode.</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setLoginMode('magic')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${loginMode === 'magic' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60'}`}
          >
            Magic Link
          </button>
          <button
            onClick={() => setLoginMode('password')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${loginMode === 'password' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60'}`}
          >
            Passwort
          </button>
        </div>

        {/* Form */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-xs uppercase tracking-widest text-white/40 font-bold ml-1">
                E-Mail-Adresse
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ihre@email.de"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white outline-none"
              />
            </div>

            {loginMode === 'password' && (
              <div className="space-y-2">
                <label htmlFor="password" className="block text-xs uppercase tracking-widest text-white/40 font-bold ml-1">
                  Passwort
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white outline-none"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-black px-6 py-3 rounded-xl hover:bg-emerald-300 transition-colors font-bold disabled:opacity-50"
            >
              {isLoading ? 'Verarbeitung...' : loginMode === 'magic' ? 'Anmeldelink senden' : 'Anmelden'}
            </button>

            {message && (
              <div className={`p-4 rounded-xl text-sm border ${
                message.includes('gesendet') ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
              }`}>
                {message}
              </div>
            )}
          </form>
        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link href="/de" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Zurueck zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}
