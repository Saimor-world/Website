'use client';

import { useMemo, useState } from 'react';
import YoriMark from '@/components/YoriMark';
import { yoriOrigin } from '@/lib/product-origins';

type Platform = 'instagram' | 'tiktok';

const DEFAULT_HANDLE = 'luanalumiina';
const YORI_ORIGIN = yoriOrigin();

const KNOWN_TOOLS = [
  'Claude',
  'Notion',
  'Canva',
  'Calendly',
  'MailerLite',
  'CapCut',
] as const;

const LIVE_YORI = [
  ['TikTok', 'OAuth · Profil & Videos'],
  ['Kalender', 'Google'],
  ['E-Mail', 'IMAP / SMTP'],
  ['Dateien', 'Drive · SharePoint · Nextcloud'],
  ['Schnitt', 'YORI Cut'],
] as const;

export default function LuanaYoriPreview() {
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
    <main className="min-h-[100svh] overflow-hidden bg-[#f4edde] text-[#203128]">
      <section className="relative min-h-[100svh]">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[46svh] bg-cover bg-center sm:h-[50svh] lg:inset-y-0 lg:left-auto lg:right-0 lg:h-auto lg:w-[58%]"
          style={{ backgroundImage: 'url("/world/luana/room-desk.webp")' }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[46svh] bg-[linear-gradient(180deg,rgba(244,237,222,.02)_0%,rgba(244,237,222,.20)_58%,#f4edde_100%)] sm:h-[50svh] lg:inset-y-0 lg:left-auto lg:right-0 lg:h-auto lg:w-[64%] lg:bg-[linear-gradient(90deg,#f4edde_0%,rgba(244,237,222,.78)_14%,rgba(244,237,222,.18)_50%,rgba(244,237,222,.06)_100%)]"
        />

        <div className="relative z-10 mx-auto flex min-h-[100svh] w-[calc(100%-32px)] max-w-[1240px] flex-col sm:w-[calc(100%-56px)]">
          <header className="flex items-center justify-between border-b border-[#9d8657]/20 py-5 sm:py-6">
            <div className="flex items-center gap-3">
              <YoriMark className="h-8 w-8 text-[#6f8d7a]" title="YORI" />
              <div>
                <p className="font-serif text-[17px] tracking-[.11em] text-[#203128]">
                  LUANA <span className="text-[#9f7634]">LUMINA</span>
                </p>
                <p className="mt-0.5 text-[8px] uppercase tracking-[.16em] text-[#5f7467]">deine World</p>
              </div>
            </div>
            <span className="whitespace-nowrap text-[8px] uppercase tracking-[.17em] text-[#8d7445]">Luana × YORI</span>
          </header>

          <div className="grid flex-1 items-end gap-8 pb-7 pt-[29svh] sm:pt-[32svh] lg:grid-cols-[.92fr_1.08fr] lg:items-center lg:gap-16 lg:pb-10 lg:pt-10">
            <div className="min-w-0 max-w-[650px] lg:py-10">
              <p className="text-[10px] font-medium uppercase tracking-[.18em] text-[#7a8d80]">
                Ein erster Blick in deinen eigenen Arbeitsraum
              </p>

              <h1 className="mt-4 max-w-[12ch] font-serif text-[clamp(2.65rem,6vw,5.5rem)] font-light leading-[.93] tracking-[-.04em] text-[#1f3028]">
                Nicht noch ein Tool. Ein Ort, der den Zusammenhang hält.
              </h1>

              <p className="mt-5 max-w-[590px] text-[15px] leading-7 text-[#42594c] sm:text-[16px]">
                Deine Arbeit lebt heute in mehreren guten Werkzeugen. YORI soll sie nicht ersetzen. Es soll erinnern, was zusammengehört, und dir den nächsten Faden zurückgeben, ohne dass du alles neu erklären musst.
              </p>

              <div className="mt-7 max-w-[610px]">
                <p className="text-[9px] uppercase tracking-[.16em] text-[#9a7540]">Schon Teil deines Alltags</p>
                <p className="mt-2 font-serif text-[17px] leading-7 text-[#2d4337]">
                  {KNOWN_TOOLS.join(' · ')}
                </p>
                <p className="mt-2 text-[10px] leading-5 text-[#63756a]">
                  Genannt heißt nicht verbunden. Eine Quelle wird erst aktiv, wenn du sie in YORI selbst freigibst.
                </p>
              </div>
            </div>

            <div className="min-w-0 lg:justify-self-end lg:w-full lg:max-w-[480px]">
              <section className="relative overflow-hidden border border-[#b49a66]/30 bg-[#fffaf0]/95 p-5 shadow-[0_24px_70px_rgba(63,48,24,.12)] backdrop-blur-md sm:p-7">
                <div aria-hidden="true" className="absolute right-5 top-5 h-10 w-10 rounded-full border border-[#b59a64]/25" />

                <p className="text-[9px] uppercase tracking-[.18em] text-[#9b7336]">Der erste Faden</p>
                <h2 className="mt-3 max-w-[12ch] font-serif text-[31px] font-light leading-[1.02] tracking-[-.025em] text-[#24382d]">
                  Dein öffentlicher Handle ist schon da.
                </h2>
                <p className="mt-3 max-w-sm text-[12px] leading-5 text-[#607267]">
                  Mehr behauptet diese Vorschau nicht. Echte Konten bleiben geschützt und werden erst in deinem YORI verbunden.
                </p>

                <div className="mt-6 flex gap-5 border-b border-[#b49a66]/25">
                  {(['instagram', 'tiktok'] as Platform[]).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setPlatform(item)}
                      className={`border-b-2 pb-2 text-[10px] uppercase tracking-[.14em] transition ${
                        platform === item
                          ? 'border-[#9a7337] text-[#25392e]'
                          : 'border-transparent text-[#7a897f]'
                      }`}
                    >
                      {item === 'instagram' ? 'Instagram' : 'TikTok'}
                    </button>
                  ))}
                </div>

                <label className="mt-5 flex min-w-0 items-center border-b border-[#b49a66]/32 pb-2">
                  <span className="mr-1 font-serif text-[24px] text-[#a57b3d]">@</span>
                  <input
                    value={handle}
                    onChange={(event) => setHandle(event.target.value)}
                    aria-label="Social Media Username"
                    className="min-w-0 flex-1 bg-transparent font-serif text-[27px] text-[#22362b] outline-none placeholder:text-[#7b8a80]/35"
                    placeholder="username"
                  />
                </label>

                <a
                  href={creatorPreviewHref}
                  className="group mt-7 flex min-h-14 items-center justify-between gap-4 border-y border-[#b49a66]/28 py-4"
                >
                  <span className="min-w-0">
                    <small className="block text-[9px] uppercase tracking-[.17em] text-[#9b7336]">YORI ÖFFNEN</small>
                    <b className="mt-1 block break-words font-serif text-[22px] font-light text-[#263a2f]">
                      Weiter mit @{cleanHandle || DEFAULT_HANDLE}
                    </b>
                  </span>
                  <span
                    aria-hidden="true"
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#668c7b] text-[#fffaf0] transition-transform group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </a>

                <a
                  href={liveConnectionsHref}
                  className="mt-4 inline-block text-[9px] uppercase tracking-[.14em] text-[#6e8175] underline decoration-[#9a7540]/40 underline-offset-4"
                >
                  Echte Konten in YORI verbinden
                </a>
              </section>
            </div>
          </div>

          <section className="border-t border-[#9d8657]/20 py-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {LIVE_YORI.map(([label, state]) => (
                  <span key={label} className="inline-flex items-baseline gap-1.5">
                    <strong className="font-serif text-[14px] font-light text-[#2d4337]">{label}</strong>
                    <small className="text-[8px] text-[#74857a]">{state}</small>
                  </span>
                ))}
              </div>
              <p className="text-[8px] uppercase tracking-[.16em] text-[#8d7445]">
                bekannt ≠ verbunden · YORI · a SAIMÔR creation
              </p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
