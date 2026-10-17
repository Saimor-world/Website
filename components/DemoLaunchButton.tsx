'use client';

import { useState } from 'react';
import { Loader2, ExternalLink } from 'lucide-react';

interface Props {
  /** Text shown on the button */
  label?: string;
  /** Tailwind class overrides */
  className?: string;
  /** Optional company name pre-fill (e.g. from a form) */
  companyName?: string;
  locale?: 'de' | 'en';
}

/**
 * Calls /api/demo-launch to generate a signed OS entry token,
 * then navigates to hq.saimor.world/entry — no account needed.
 */
export function DemoLaunchButton({
  label = 'OS-Demo starten',
  className,
  companyName,
  locale = 'de',
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleClick() {
    if (loading) return;
    setLoading(true);
    setError(false);
    try {
      const res = await fetch('/api/demo-launch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyName, locale }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        console.error('[DemoLaunchButton] No URL in response', data);
        setLoading(false);
        setError(true);
      }
    } catch (err) {
      console.error('[DemoLaunchButton] Error:', err);
      setLoading(false);
      setError(true);
    }
  }

  return (
    <><button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className={
        className ??
        'inline-flex items-center gap-2 rounded-xl border border-violet-400/30 bg-violet-600/20 px-6 py-3 text-sm font-semibold text-violet-100 transition-all hover:bg-violet-600/35 disabled:opacity-60'
      }
    >
      {loading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <ExternalLink size={16} />
      )}
      {loading ? (locale === 'de' ? 'Workspace wird vorbereitet…' : 'Preparing workspace…') : label}
    </button>
    {error ? <span role="alert" className="self-center text-sm leading-6 text-[#e9cfa7]">{locale === 'de' ? 'Die Demo ist gerade nicht erreichbar. Bitte versuche es erneut.' : 'The demo is currently unavailable. Please try again.'}</span> : null}
    </>
  );
}
