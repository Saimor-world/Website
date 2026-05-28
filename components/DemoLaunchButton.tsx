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
}

/**
 * Calls /api/demo-launch to generate a signed OS entry token,
 * then navigates to hq.saimor.world/entry — no account needed.
 */
export function DemoLaunchButton({
  label = 'OS-Demo starten',
  className,
  companyName,
}: Props) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch('/api/demo-launch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyName }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('[DemoLaunchButton] No URL in response', data);
        setLoading(false);
      }
    } catch (err) {
      console.error('[DemoLaunchButton] Error:', err);
      setLoading(false);
    }
  }

  return (
    <button
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
      {loading ? 'Workspace wird vorbereitet…' : label}
    </button>
  );
}
