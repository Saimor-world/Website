'use client';

import { useEffect, useMemo, useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function MagicLinkPage() {
  const [status, setStatus] = useState<'loading' | 'error'>('loading');
  const [errorText, setErrorText] = useState('Ungueltiger Magic Link.');

  const params = useMemo(() => {
    if (typeof window === 'undefined') {
      return { email: '', token: '', callbackUrl: '/account/bridge' };
    }
    const query = new URLSearchParams(window.location.search);
    return {
      email: query.get('email') || '',
      token: query.get('token') || '',
      callbackUrl: query.get('callbackUrl') || '/account/bridge',
    };
  }, []);

  useEffect(() => {
    const run = async () => {
      if (!params.email || !params.token) {
        setErrorText('Link ist unvollstaendig oder bereits verbraucht.');
        setStatus('error');
        return;
      }

      const result = await signIn('magic-token', {
        email: params.email,
        token: params.token,
        callbackUrl: params.callbackUrl,
        redirect: false,
      });

      if (result?.error) {
        setErrorText('Magic Link ist abgelaufen oder ungueltig.');
        setStatus('error');
      } else if (result?.url) {
        window.location.href = result.url;
      } else {
        window.location.href = params.callbackUrl;
      }
    };

    run();
  }, [params.callbackUrl, params.email, params.token]);

  return (
    <main className="min-h-screen bg-[#060d0b] text-white flex items-center justify-center px-6">
      <div className="max-w-lg w-full rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center space-y-4">
        {status === 'loading' ? (
          <>
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">Magic Link</p>
            <h1 className="text-3xl" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Anmeldung wird abgeschlossen
            </h1>
            <p className="text-white/70">Du wirst automatisch weitergeleitet.</p>
          </>
        ) : (
          <>
            <p className="text-xs uppercase tracking-[0.3em] text-red-300">Fehler</p>
            <h1 className="text-3xl" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Link nicht gueltig
            </h1>
            <p className="text-white/70">{errorText}</p>
            <Link
              href="/login"
              className="inline-flex items-center rounded-xl bg-white text-black px-5 py-3 font-bold hover:bg-emerald-300 transition-colors"
            >
              Zur Login-Seite
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
