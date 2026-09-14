'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, Pin } from 'lucide-react';

/**
 * Lets a visitor put their own security check on the wall - again.
 *
 * Removed by accident with the website clarity pass on 04.09. (#9); since then new
 * scans had no way onto the wall. Nothing becomes public directly: the visitor
 * consents, gets a verification link at the scan email, and the entry lands in
 * "pending_review" until the owner publishes it.
 */

type WallState = 'idle' | 'saving' | 'verification-sent' | 'error';

function wallErrorMessage(value?: string) {
  if (!value) return 'Der Bestätigungslink konnte nicht gesendet werden. Bitte später erneut versuchen.';
  if (value === 'Email delivery failed') return 'Der Bestätigungslink konnte nicht versendet werden. Bitte erneut versuchen.';
  if (value === 'Email delivery not configured') return 'Der Wall-Mailkanal ist noch nicht konfiguriert.';
  if (value === 'Consent is required before publishing to the wall') {
    return 'Bitte bestätige zuerst die Sichtbarkeit. Ohne deine Zustimmung wird nichts öffentlich.';
  }
  if (value === 'Too many requests') return 'Zu viele Anfragen. Bitte in ein paar Minuten erneut versuchen.';
  return value;
}

export default function WallRequestCard({
  auditId,
  companyName,
  contactName,
  email,
  locale = 'de',
}: {
  auditId?: string | null;
  companyName: string;
  contactName?: string;
  email: string;
  locale?: string;
}) {
  const [state, setState] = useState<WallState>('idle');
  const [error, setError] = useState<string | null>(null);
  const [visibility, setVisibility] = useState('company-anonymous');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);

  if (!auditId) return null;

  const resetError = () => {
    setError(null);
    if (state === 'error') setState('idle');
  };

  const request = async () => {
    if (!consent) {
      setError(wallErrorMessage('Consent is required before publishing to the wall'));
      setState('error');
      return;
    }
    setError(null);
    setState('saving');
    try {
      const res = await fetch('/api/wall-entry/request-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          auditId,
          name: contactName?.trim() || companyName,
          company: companyName,
          kind: 'security-check',
          visibility,
          message: message.trim() || undefined,
          consent: true,
          locale: locale === 'en' ? 'en' : 'de',
        }),
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(payload?.error);
      if (payload?.debugUrl) {
        window.location.href = payload.debugUrl;
        return;
      }
      setState('verification-sent');
    } catch (err: any) {
      setError(wallErrorMessage(err?.message));
      setState('error');
    }
  };

  return (
    <section className="rounded-3xl border border-white/8 bg-white/[0.02] p-6 space-y-5 print:hidden">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-emerald-300/70">Supporter Wall</p>
          <h3 className="mt-1 text-lg font-light text-white/88">Zeig, dass du Sicherheit ernst nimmst</h3>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-white/45">
            Dein Check kann als Signal auf die Wall. Öffentlich wird er erst nach Bestätigung per E-Mail an {email} und nach Freigabe.
          </p>
        </div>
        <Link href="/wall" className="hidden shrink-0 items-center gap-1.5 text-[11px] text-white/45 hover:text-white/75 sm:inline-flex">
          Wall ansehen <ExternalLink size={12} />
        </Link>
      </div>

      <div className="grid gap-3 md:grid-cols-[220px_1fr]">
        <label className="block space-y-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">Sichtbarkeit</span>
          <select
            value={visibility}
            onChange={(e) => { setVisibility(e.target.value); resetError(); }}
            className="w-full rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-sm text-white outline-none focus:border-emerald-300/40"
          >
            <option value="company-anonymous">Firma anonym</option>
            <option value="anonymous">Ganz anonym</option>
            <option value="named">Name sichtbar</option>
          </select>
        </label>
        <label className="block space-y-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">Kurzer Text (optional)</span>
          <input
            value={message}
            onChange={(e) => { setMessage(e.target.value); resetError(); }}
            maxLength={240}
            placeholder="z. B. Wir haben unsere Header nachgezogen."
            className="w-full rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-sm text-white outline-none focus:border-emerald-300/40"
          />
        </label>
      </div>

      <label className="flex items-start gap-3 rounded-2xl border border-white/8 bg-black/18 p-4 text-sm text-white/55">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => { setConsent(e.target.checked); resetError(); }}
          className="mt-1 h-4 w-4 accent-emerald-300"
        />
        <span>Ich stimme zu, dass dieser Security-Check nach E-Mail-Bestätigung mit der gewählten Sichtbarkeit zur Freigabe auf die Wall darf.</span>
      </label>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={request}
          disabled={state === 'saving' || state === 'verification-sent'}
          className="inline-flex items-center gap-2 rounded-xl border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-xs text-emerald-50 hover:bg-emerald-300/15 disabled:opacity-45"
        >
          <Pin size={13} />
          {state === 'saving' ? 'Sende Link…' : state === 'verification-sent' ? 'Link gesendet' : 'Auf die Wall – Link anfordern'}
        </button>
        {state === 'verification-sent' && (
          <p className="text-xs text-emerald-200/72">Check dein Postfach – erst der Link bestätigt den Eintrag.</p>
        )}
      </div>
      {state === 'error' && error && (
        <div className="rounded-2xl border border-red-300/18 bg-red-500/[0.08] px-4 py-3 text-xs text-red-100/86">{error}</div>
      )}
    </section>
  );
}
