'use client';

import { useMemo, useState } from 'react';
import { yoriOrigin } from '@/lib/product-origins';
import YoriMark from '@/components/YoriMark';
import type { ClientWorldConfig } from '@/lib/client-world';

type Platform = 'instagram' | 'tiktok';

type Props = {
  world: ClientWorldConfig;
};

const DEFAULT_HANDLE = 'luanalumiina';
const YORI_ORIGIN = yoriOrigin();

const KNOWN_TOOLS = [
  'Claude',
  'Notion',
  'Canva',
  'Calendly',
  'MailerLite',
  'Instagram',
  'TikTok',
  'Stripe',
  'PayPal',
  'Zoom',
  'CapCut',
];

const LIVE_YORI = [
  ['TikTok', 'OAuth · Profil & Videos'],
  ['Kalender', 'Google OAuth'],
  ['E-Mail', 'IMAP / SMTP'],
  ['Dateien', 'Drive · SharePoint · Nextcloud'],
  ['Schnitt', 'YORI Cut · nativ'],
] as const;

export default function LuanaYoriPreview({ world }: Props) {
  const [platform, setPlatform] = useState<Platform>('instagram');
  const [handle, setHandle] = useState(DEFAULT_HANDLE);

  const cleanHandle = useMemo(
    () => handle.trim().replace(/^@+/, '').toLowerCase().replace(/[^a-z0-9._]/g, '').slice(0, 64),
    [handle],
  );

  const creatorPreviewHref = useMemo(() => {
    const params = new URLSearchParams({
      platform,
      creator: cleanHandle || DEFAULT_HANDLE,
    });
    return `${YORI_ORIGIN}/demo?${params.toString()}`;
  }, [platform, cleanHandle]);

  const liveConnectionsHref = `${YORI_ORIGIN}/login?next=%2F%3Fconnections%3D1`;

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-[#182019] text-[#f8f2e5]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("/world/luana/room-desk.webp")' }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,20,16,.76)_0%,rgba(14,20,16,.46)_48%,rgba(14,20,16,.2)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,12,9,.08),rgba(8,12,9,.5))]" />

      <section className="relative z-10 mx-auto flex min-h-[100svh] w-[calc(100%-32px)] max-w-[1180px] flex-col py-5 sm:w-[calc(100%-56px)] sm:py-7">
        <header className="flex items-start justify-between gap-4 border-b border-[#d4af68]/30 pb-4">
          <div className="flex items-center gap-3">
            <YoriMark className="h-8 w-8 text-[#77aaa4]" title="YORI" />
            <span className="font-serif text-[18px] font-medium tracking-[.13em] text-[#f5ecdd]">
              LUANA <span className="text-[#d4af68]">LUMINA</span>
            </span>
          </div>
          <span className="whitespace-nowrap pt-1 text-[8px] uppercase tracking-[.18em] text-[#d4af68]">DEINE WORLD · {world.clientName}</span>
        </header>

        <div className="grid flex-1 items-center gap-7 py-7 lg:grid-cols-[.86fr_1.14fr] lg:gap-14">
          <div className="max-w-xl">
            <p className="font-mono text-[9px] font-bold uppercase tracking-[.20em] text-[#77aaa4]">
              YORI hält den Zusammenhang
            </p>
            <h1 className="mt-4 max-w-[11ch] font-serif text-[clamp(2.6rem,6.4vw,4.9rem)] font-light leading-[.96] tracking-[-.035em]">
              Nicht noch ein Chat. Ein Ort für deine ganze Arbeit.
            </h1>
            <p className="mt-5 max-w-lg text-[15px] leading-7 text-[#f3eadb]/78">
              Du arbeitest schon mit vielen guten Tools. YORI soll nicht noch eins daneben stellen, sondern Kontext dazwischen halten.
            </p>

            <div className="mt-7">
              <p className="text-[8px] uppercase tracking-[.18em] text-[#d4af68]">Von dir genannt</p>
              <div className="mt-3 flex max-w-xl flex-wrap gap-2">
                {KNOWN_TOOLS.map((tool) => (
                  <span
                    key={tool}
                    className="border border-[#efe4d0]/18 bg-[#182019]/35 px-2.5 py-1.5 text-[9px] tracking-[.06em] text-[#efe4d0]/78 backdrop-blur-sm"
                  >
                    {tool}
                  </span>
                ))}
              </div>
              <p className="mt-3 max-w-lg text-[10px] leading-5 text-[#d9d2c4]/58">
                Genannt heißt nicht verbunden. YORI zeigt eine Quelle erst als aktiv, wenn eine echte Provider-Verbindung steht.
              </p>
            </div>
          </div>

          <div className="lg:justify-self-end lg:w-full lg:max-w-[520px]">
            <section className="border border-[#d4af68]/28 bg-[#f7f0df]/[.95] p-5 text-[#1d2a20] shadow-[0_30px_90px_rgba(0,0,0,.28)] backdrop-blur-sm sm:p-7">
              <p className="text-[9px] uppercase tracking-[.20em] text-[#8c6224]">ERSTER ECHTER FADEN</p>
              <h2 className="mt-3 font-serif text-[28px] font-light leading-tight">
                Dein öffentlicher Handle ist schon vorgefüllt.
              </h2>

              <div className="mt-5 flex border-b border-[#a8752c]/30">
                {(['instagram', 'tiktok'] as Platform[]).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setPlatform(item)}
                    className={`border-b-2 px-3 py-2 text-[10px] uppercase tracking-[.16em] transition ${
                      platform === item
                        ? 'border-[#a8752c] text-[#1d2a20]'
                        : 'border-transparent text-[#66766b]'
                    }`}
                  >
                    {item === 'instagram' ? 'Instagram' : 'TikTok'}
                  </button>
                ))}
              </div>

              <label className="mt-5 flex items-center border-b border-[#a8752c]/40 pb-2">
                <span className="mr-1 font-serif text-xl text-[#a8752c]">@</span>
                <input
                  value={handle}
                  onChange={(event) => setHandle(event.target.value)}
                  aria-label="Social Media Username"
                  className="min-w-0 flex-1 bg-transparent font-serif text-2xl text-[#1d2a20] outline-none placeholder:text-[#6b786e]/35"
                  placeholder="username"
                />
              </label>

              <a
                href={creatorPreviewHref}
                className="mt-7 flex min-h-14 items-center justify-between gap-4 border-y border-[#a8752c]/40 py-4 text-left"
              >
                <span>
                  <small className="block text-[9px] uppercase tracking-[.18em] text-[#8c6224]">HAUS BETRETEN</small>
                  <b className="mt-1 block font-serif text-[22px] font-light">
                    YORI mit @{cleanHandle || DEFAULT_HANDLE} öffnen
                  </b>
                </span>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#3E8F8B] text-[#f7f0df]" aria-hidden="true">→</span>
              </a>

              <p className="mt-4 text-[10px] leading-5 text-[#66766b]">
                In dieser öffentlichen Vorschau bleibt der Handle nur Kontext. Echte Konten werden ausschließlich im geschützten YORI verbunden.
              </p>
            </section>
          </div>
        </div>

        <section className="border-t border-[#d4af68]/30 pt-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[8px] uppercase tracking-[.18em] text-[#efe4d0]/45">Heute schon real in YORI</p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                {LIVE_YORI.map(([label, state]) => (
                  <span key={label} className="inline-flex items-baseline gap-2">
                    <strong className="font-serif text-[15px] font-light text-[#f6ecdd]">{label}</strong>
                    <small className="text-[8px] text-[#b7c0b7]">{state}</small>
                  </span>
                ))}
              </div>
            </div>

            <a
              href={liveConnectionsHref}
              className="shrink-0 border-b border-[#77aaa4]/70 pb-1 text-[9px] uppercase tracking-[.16em] text-[#b8d2cd]"
            >
              Geschützte Konten verbinden →
            </a>
          </div>
        </section>

        <footer className="mt-5 flex items-center justify-between gap-4 text-[7px] uppercase tracking-[.18em] text-[#efe4d0]/45">
          <span>YORI · A SAIMÔR CREATION</span>
          <span>erkannt ≠ verbunden</span>
        </footer>
      </section>
    </main>
  );
}
