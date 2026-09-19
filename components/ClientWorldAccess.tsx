'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, KeyRound, ShieldCheck } from 'lucide-react';

export default function ClientWorldAccess({
  slug,
  clientName,
}: {
  slug: string;
  clientName: string;
}) {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!code.trim() || busy) return;

    setBusy(true);
    setError('');

    try {
      const response = await fetch(`/api/world/${encodeURIComponent(slug)}/access`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.trim() }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        setError(
          response.status === 401
            ? 'Der Code stimmt nicht.'
            : payload?.error || 'Der Zugang ist gerade nicht verfügbar.'
        );
        return;
      }

      setCode('');
      router.refresh();
    } catch {
      setError('Der Zugang ist gerade nicht verfügbar.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-[#07100d] text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_73%_18%,rgba(77,137,104,.18),transparent_30%),radial-gradient(circle_at_18%_78%,rgba(214,168,72,.09),transparent_28%),linear-gradient(180deg,#07100d_0%,#0a1712_58%,#07100d_100%)]"
      />
      <div aria-hidden="true" className="absolute -right-28 top-20 h-[420px] w-[420px] rounded-full border border-emerald-100/[.06]" />
      <div aria-hidden="true" className="absolute -right-12 top-36 h-[300px] w-[300px] rounded-full border border-emerald-100/[.05]" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-6xl items-center px-6 py-12 sm:px-10 lg:px-14">
        <div className="grid w-full gap-14 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
          <section className="max-w-2xl">
            <div className="mb-9 flex items-center gap-3 text-[10px] uppercase tracking-[.28em] text-emerald-100/45">
              <ShieldCheck className="h-4 w-4" />
              Private Saimôr World
            </div>

            <p className="font-mono text-[9px] uppercase tracking-[.32em] text-[#d6a848]/70">
              {clientName} × SAIMÔR
            </p>
            <h1 className="mt-5 max-w-xl font-serif text-[clamp(4rem,9vw,7.4rem)] font-light leading-[.86] tracking-[-.055em] text-[#f2efe4]">
              Dein Raum ist vorbereitet.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/50 sm:text-lg sm:leading-8">
              Keine öffentliche Demo. Hier liegen unsere Gedanken, Richtungen und die ersten Verbindungen in deine persönliche Saimôr-Welt.
            </p>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/[.04] p-6 shadow-[0_36px_90px_rgba(0,0,0,.35)] backdrop-blur-2xl sm:p-8">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl border border-[#d6a848]/20 bg-[#d6a848]/[.07]">
                <KeyRound className="h-5 w-5 text-[#e2c77e]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white/90">Persönlicher Zugang</p>
                <p className="mt-1 text-xs text-white/35">Ein Code für diese World</p>
              </div>
            </div>

            <form onSubmit={submit} className="mt-7 space-y-4">
              <label htmlFor="world-code" className="block text-[9px] uppercase tracking-[.22em] text-white/35">
                Access Code
              </label>
              <input
                id="world-code"
                type="password"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                autoComplete="one-time-code"
                spellCheck={false}
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-base tracking-[.08em] text-white outline-none transition focus:border-[#d6a848]/45 focus:ring-2 focus:ring-[#d6a848]/10"
                placeholder="••••••••••••"
              />
              <button
                type="submit"
                disabled={busy || !code.trim()}
                className="group flex w-full items-center justify-between rounded-2xl bg-[#eee8d7] px-5 py-4 text-sm font-semibold text-[#0a2118] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-45"
              >
                <span>{busy ? 'Wird geprüft …' : 'World öffnen'}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>

            {error ? (
              <p role="status" className="mt-4 rounded-2xl border border-red-300/10 bg-red-300/[.05] px-4 py-3 text-sm text-red-100/75">
                {error}
              </p>
            ) : null}

            <p className="mt-6 text-xs leading-5 text-white/28">
              Nach der ersten Anmeldung bleibt dieses Gerät angemeldet. Der Code selbst wird nicht im Browser gespeichert.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
