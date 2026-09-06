'use client';

import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { Mail, ArrowLeft, ShieldCheck, KeyRound, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { safeInternalPath } from '@/lib/safe-redirect';

export default function LoginPage() {
  const [callbackUrl, setCallbackUrl] = useState('/account/bridge');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageKind, setMessageKind] = useState<'success' | 'error' | ''>('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const next = new URLSearchParams(window.location.search).get('callbackUrl');
    setCallbackUrl(safeInternalPath(next, '/account/bridge'));
  }, []);

  const requestMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setMessageKind('error');
      setMessage('Bitte gib deine E-Mail-Adresse ein.');
      return;
    }

    setIsLoading(true);
    setMessage('');
    setMessageKind('');

    try {
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
        setMessageKind('error');
        if (response.status === 429) {
          setMessage('Zu viele Versuche. Bitte warte kurz und versuche es erneut.');
        } else if (response.status === 503) {
          setMessage('Der E-Mail-Versand ist gerade nicht verfügbar.');
        } else {
          setMessage(payload?.error || 'Der Anmeldelink konnte nicht versendet werden.');
        }
        return;
      }

      if (payload?.debugUrl) {
        window.location.href = payload.debugUrl;
        return;
      }

      setMessageKind('success');
      setMessage('Wenn zu dieser E-Mail ein Saimôr-Zugang oder ein frischer Security Check gehört, ist dein Anmeldelink jetzt unterwegs.');
    } catch {
      setMessageKind('error');
      setMessage('Ein unerwarteter Fehler ist aufgetreten.');
    } finally {
      setIsLoading(false);
    }
  };

  const passwordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setPasswordLoading(true);
    setMessage('');
    setMessageKind('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        setMessageKind('error');
        setMessage('Interner Login fehlgeschlagen.');
      } else if (result?.url) {
        window.location.href = result.url;
      } else {
        window.location.href = callbackUrl;
      }
    } catch {
      setMessageKind('error');
      setMessage('Interner Login fehlgeschlagen.');
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050b09] text-white px-5 py-10 sm:px-8 flex items-center">
      <div className="mx-auto w-full max-w-5xl grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
        <section className="space-y-7 max-w-xl">
          <Link href="/de" className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Zurück zu Saimôr
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/[0.05] px-3 py-1.5 text-[10px] uppercase tracking-[0.24em] text-emerald-100/60">
            <ShieldCheck className="w-3.5 h-3.5" />
            Persönlicher Zugang
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl font-light tracking-[-0.035em] leading-[0.95]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Dein Saimôr Zugang.
            </h1>
            <p className="max-w-lg text-base sm:text-lg leading-7 text-white/55">
              Kein Passwort für die Demo. Gib dieselbe E-Mail ein, die du beim Security Check verwendet hast. Du bekommst einen einmaligen Link direkt in deinen Workspace.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-4">
              <p className="text-white/85 font-medium">30 Tage</p>
              <p className="mt-1 text-xs leading-5 text-white/38">Dein Demo-Zeitraum bleibt mit deinem Report verbunden.</p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-4">
              <p className="text-white/85 font-medium">Magic Link</p>
              <p className="mt-1 text-xs leading-5 text-white/38">Kurz gültig, einmalig verwendbar, kein Demo-Passwort.</p>
            </div>
          </div>

          <Link
            href="/de/einstieg/security-check"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-emerald-200/80 hover:text-emerald-100 transition-colors"
          >
            Noch keinen Zugang? Security Check starten
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 sm:p-8 shadow-[0_28px_90px_rgba(0,0,0,.35)] backdrop-blur-xl">
          <div className="mb-7 flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl border border-emerald-300/15 bg-emerald-300/[0.07] flex items-center justify-center">
              <Mail className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white/90">Anmeldelink anfordern</p>
              <p className="text-xs text-white/35">Für Demo- und bestehende Konten</p>
            </div>
          </div>

          <form onSubmit={requestMagicLink} className="space-y-5">
            <label className="block space-y-2" htmlFor="email">
              <span className="block text-[10px] uppercase tracking-[0.22em] text-white/35">E-Mail-Adresse</span>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="du@beispiel.de"
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-white outline-none transition focus:border-emerald-300/45 focus:ring-2 focus:ring-emerald-300/10"
              />
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-2xl bg-[#d8f5e8] px-5 py-4 font-bold text-[#062019] transition hover:bg-white disabled:opacity-50"
            >
              {isLoading ? 'Link wird vorbereitet…' : 'Magic Link senden'}
            </button>

            {message && (
              <div className={`rounded-2xl border p-4 text-sm leading-6 ${
                messageKind === 'success'
                  ? 'border-emerald-300/15 bg-emerald-300/[0.06] text-emerald-100/80'
                  : 'border-red-300/15 bg-red-300/[0.06] text-red-100/80'
              }`}>
                {message}
              </div>
            )}
          </form>

          <details className="mt-7 border-t border-white/8 pt-5 group">
            <summary className="cursor-pointer list-none inline-flex items-center gap-2 text-xs text-white/28 hover:text-white/50 transition-colors">
              <KeyRound className="w-3.5 h-3.5" />
              Interner Zugang
            </summary>
            <form onSubmit={passwordLogin} className="mt-4 space-y-3">
              <p className="text-xs leading-5 text-white/28">Nur für interne Konten mit gesetztem Passwort.</p>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Passwort"
                autoComplete="current-password"
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-white/25"
              />
              <button
                type="submit"
                disabled={passwordLoading || !email}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-white/60 hover:bg-white/[0.08] disabled:opacity-40 transition-colors"
              >
                {passwordLoading ? 'Prüfe…' : 'Intern anmelden'}
              </button>
            </form>
          </details>
        </section>
      </div>
    </main>
  );
}
