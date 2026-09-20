'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, LockKeyhole } from 'lucide-react';

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
    <main className="min-h-[100svh] bg-[#0a110e] text-[#f2efe6]">
      <div className="mx-auto flex min-h-[100svh] w-full max-w-[1180px] flex-col px-5 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between border-b border-white/[.08] py-5">
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-lg tracking-[.12em]">SAIMÔR</span>
            <span className="hidden text-xs text-white/30 sm:inline">Private World</span>
          </div>
          <span className="text-sm text-white/52">{clientName}</span>
        </header>

        <div className="grid flex-1 items-center gap-8 py-12 lg:grid-cols-[1.12fr_.88fr]">
          <section>
            <p className="text-xs font-medium uppercase tracking-[.18em] text-[#d4b466]/70">Gemeinsamer Projektraum</p>
            <h1 className="mt-5 max-w-2xl font-serif text-[clamp(3rem,7vw,6.2rem)] font-light leading-[.93] tracking-[-.045em]">
              Hallo {clientName}.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/48">
              Hier findest du den aktuellen Stand, unsere Arbeitsvorschläge und die Entscheidungen, bei denen wir deinen Blick brauchen.
            </p>
          </section>

          <section className="rounded-[1.8rem] border border-white/[.08] bg-[#0f1915] p-6 shadow-[0_24px_80px_rgba(0,0,0,.25)] sm:p-8">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl border border-[#d4b466]/20 bg-[#d4b466]/[.06]">
                <LockKeyhole className="h-4 w-4 text-[#d4b466]/80" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white/82">Zugangscode</p>
                <p className="mt-1 text-xs text-white/30">Nur für diese World</p>
              </div>
            </div>

            <form onSubmit={submit} className="mt-7">
              <label htmlFor="world-code" className="text-[10px] uppercase tracking-[.16em] text-white/28">
                Code
              </label>
              <input
                id="world-code"
                type="password"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                autoComplete="one-time-code"
                spellCheck={false}
                placeholder="••••••••••••"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/15 px-4 py-4 text-base tracking-[.08em] text-white outline-none transition placeholder:text-white/18 focus:border-[#d4b466]/35 focus:ring-2 focus:ring-[#d4b466]/10"
              />

              <button
                type="submit"
                disabled={busy || !code.trim()}
                className="mt-4 flex w-full items-center justify-between rounded-2xl bg-[#eee8d7] px-5 py-4 text-sm font-semibold text-[#173529] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-45"
              >
                <span>{busy ? 'Wird geprüft …' : 'World öffnen'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            {error ? (
              <p role="status" className="mt-4 rounded-xl border border-red-300/10 bg-red-300/[.04] px-4 py-3 text-sm text-red-100/72">
                {error}
              </p>
            ) : null}

            <p className="mt-5 text-xs leading-5 text-white/24">
              Nach der Anmeldung bleibt dieses Gerät angemeldet. Der Code selbst wird nicht im Browser gespeichert.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
