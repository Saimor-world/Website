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
    <main className="min-h-[100svh] overflow-hidden bg-[#0e0b09] text-[#f4ecdf]">
      <section className="relative min-h-[100svh]">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[27svh] bg-cover bg-[center_38%] sm:h-[38svh] lg:inset-y-0 lg:left-auto lg:right-0 lg:h-auto lg:w-[64%] lg:bg-center"
          style={{ backgroundImage: 'url("/world/luana/room-desk.webp")' }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[27svh] bg-[linear-gradient(180deg,rgba(14,11,9,.22)_0%,rgba(14,11,9,.36)_52%,rgba(14,11,9,.92)_80%,#0e0b09_92%)] sm:h-[38svh] lg:inset-y-0 lg:left-auto lg:right-0 lg:h-auto lg:w-[66%] lg:bg-[linear-gradient(90deg,#0e0b09_0%,rgba(14,11,9,.86)_18%,rgba(14,11,9,.28)_54%,rgba(14,11,9,.18)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[112px] bg-[linear-gradient(180deg,rgba(14,11,9,.94)_0%,rgba(14,11,9,.72)_56%,rgba(14,11,9,0)_100%)] sm:h-[124px]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[128px] bg-[linear-gradient(0deg,rgba(14,11,9,.96)_0%,rgba(14,11,9,.82)_48%,rgba(14,11,9,0)_100%)]"
        />

        <div
          className="relative z-10 mx-auto flex min-h-[100svh] w-[calc(100%-32px)] max-w-[1240px] flex-col sm:w-[calc(100%-56px)]"
          style={{ paddingBottom: 'var(--consent-banner-height, 0px)' }}
        >
          <header className="flex items-center justify-between border-b border-[#f4ecdf]/12 py-5 sm:py-6">
            <div className="flex items-center gap-3">
              <YoriMark className="h-8 w-8 text-[#63aba6]" title="YORI" />
              <div>
                <p className="font-serif text-[17px] tracking-[.11em] text-[#f4ecdf]">
                  LUANA <span className="text-[#d6ad6d]">LUMINA</span>
                </p>
                <p className="mt-0.5 text-[8px] uppercase tracking-[.16em] text-[#f4ecdf]/68">deine World</p>
              </div>
            </div>
            <span className="whitespace-nowrap text-[8px] uppercase tracking-[.17em] text-[#d6ad6d]/90">Luana × YORI</span>
          </header>

          {/*
            Mobil stand die Handlung erst nach anderthalb Bildschirmen
            Argumentation. Jetzt: Satz, dann Knopf, dann Begruendung -- wer
            ueberzeugt ist, klickt sofort, wer zweifelt, liest weiter. Am
            Desktop bleibt die Zweispaltigkeit, deshalb die drei Bloecke per
            col-start/row-start wieder auf die alten Plaetze.
          */}
          <div className="flex flex-1 flex-col gap-6 pb-7 pt-[14svh] sm:pt-[22svh] lg:grid lg:grid-cols-[.92fr_1.08fr] lg:items-center lg:gap-x-16 lg:gap-y-5 lg:pb-10 lg:pt-10">
            <div className="order-1 min-w-0 max-w-[650px] lg:col-start-1 lg:row-start-1 lg:pt-10">
              <p className="text-[10px] font-medium uppercase tracking-[.18em] text-[#d6ad6d]">
                Ein erster Blick in deinen eigenen Arbeitsraum
              </p>

              <h1 className="mt-4 max-w-[12ch] font-serif text-[clamp(2.4rem,6vw,5.5rem)] font-light leading-[.93] tracking-[-.04em] text-[#f4ecdf]">
                Nicht noch ein Tool. Ein Ort, der den Zusammenhang hält.
              </h1>
            </div>

            <div className="order-3 min-w-0 max-w-[650px] lg:col-start-1 lg:row-start-2 lg:pb-10">
              <p className="max-w-[590px] text-[15px] leading-7 text-[#f4ecdf]/78 sm:text-[16px]">
                Deine Arbeit lebt in mehreren guten Werkzeugen. YORI ersetzt keines davon — es erinnert, was zusammengehört, damit du nicht jedes Mal von vorn erklären musst.
              </p>

              <div className="mt-6 max-w-[610px]">
                <p className="text-[9px] uppercase tracking-[.16em] text-[#63aba6]">Die Werkzeuge, die du selbst genannt hast</p>
                <p className="mt-2 font-serif text-[17px] leading-7 text-[#f4ecdf]/92">
                  {KNOWN_TOOLS.join(' · ')}
                </p>
                <p className="mt-2 text-[10px] leading-5 text-[#f4ecdf]/65">
                  Genannt heißt nicht verbunden. Eine Quelle wird erst aktiv, wenn du sie in YORI selbst freigibst.
                </p>
              </div>
            </div>

            <div className="order-2 min-w-0 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:justify-self-end lg:w-full lg:max-w-[480px]">
              <section className="relative overflow-hidden rounded-[22px] border border-[#f4ecdf]/14 bg-[#18130f]/92 p-4 shadow-[0_32px_90px_rgba(0,0,0,.58)] backdrop-blur-xl sm:p-7">
                <div aria-hidden="true" className="absolute right-5 top-5 h-10 w-10 rounded-full border border-[#d6ad6d]/25" />

                <p className="text-[9px] uppercase tracking-[.18em] text-[#d6ad6d]">Der erste Faden</p>
                <h2 className="mt-2.5 max-w-[16ch] font-serif text-[23px] font-light leading-[1.08] tracking-[-.02em] text-[#f4ecdf] sm:mt-3 sm:max-w-[12ch] sm:text-[31px] sm:leading-[1.02]">
                  Dein öffentlicher Handle ist schon da.
                </h2>
                <p className="mt-3 max-w-sm text-[12px] leading-5 text-[#f4ecdf]/72">
                  YORI zeigt sich mit deinem Handle, ohne Anmeldung. Der Rest bleibt leer, bis du ihn freigibst — was gefüllt aussieht, ist ein Beispiel.
                </p>

                <div className="mt-5 flex gap-5 border-b border-[#f4ecdf]/14 sm:mt-6">
                  {(['instagram', 'tiktok'] as Platform[]).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setPlatform(item)}
                      className={`border-b-2 pb-2 text-[10px] uppercase tracking-[.14em] transition ${
                        platform === item
                          ? 'border-[#63aba6] text-[#f4ecdf]'
                          : 'border-transparent text-[#f4ecdf]/65'
                      }`}
                    >
                      {item === 'instagram' ? 'Instagram' : 'TikTok'}
                    </button>
                  ))}
                </div>

                <label className="mt-5 flex min-w-0 items-center border-b border-[#f4ecdf]/20 pb-2">
                  <span className="mr-1 font-serif text-[24px] text-[#d6ad6d]">@</span>
                  <input
                    value={handle}
                    onChange={(event) => setHandle(event.target.value)}
                    aria-label="Social Media Username"
                    className="min-w-0 flex-1 bg-transparent font-serif text-[27px] text-[#f4ecdf] outline-none placeholder:text-[#f4ecdf]/45"
                    placeholder="username"
                  />
                </label>

                <a
                  href={creatorPreviewHref}
                  className="group mt-4 flex min-h-14 items-center justify-between gap-4 border-b border-[#f4ecdf]/14 py-4 sm:mt-5"
                >
                  <span className="min-w-0">
                    <small className="block text-[9px] uppercase tracking-[.17em] text-[#63aba6]">YORI ÖFFNEN</small>
                    <b className="mt-1 block break-words font-serif text-[22px] font-light text-[#f4ecdf]">
                      Weiter mit @{cleanHandle || DEFAULT_HANDLE}
                    </b>
                  </span>
                  <span
                    aria-hidden="true"
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#3e8f8b] text-[#0e0b09] transition-transform group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </a>

                <a
                  href={liveConnectionsHref}
                  className="mt-4 inline-block text-[9px] uppercase tracking-[.14em] text-[#f4ecdf]/72 underline decoration-[#63aba6]/55 underline-offset-4 transition hover:text-[#f4ecdf]"
                >
                  Echte Konten in YORI verbinden
                </a>
              </section>
            </div>
          </div>

          <section className="border-t border-[#f4ecdf]/12 py-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {LIVE_YORI.map(([label, state]) => (
                  <span key={label} className="inline-flex items-baseline gap-1.5">
                    <strong className="font-serif text-[14px] font-light text-[#f4ecdf]/90">{label}</strong>
                    <small className="text-[8px] text-[#f4ecdf]/65">{state}</small>
                  </span>
                ))}
              </div>
              <p className="text-[8px] uppercase tracking-[.16em] text-[#d6ad6d]/85">
                YORI · a SAIMÔR creation
              </p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
