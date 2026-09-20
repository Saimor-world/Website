'use client';

import { useMemo, useState } from 'react';
import YoriMark from '@/components/YoriMark';
import type { ClientWorldConfig } from '@/lib/client-world';

type Decision = 'yes' | 'change';
type Platform = 'instagram' | 'tiktok';

type Props = {
  world: ClientWorldConfig;
  initialDecision?: Decision | null;
};

const DEFAULT_HANDLE = 'luanalumiina';
const YORI_ORIGIN = 'https://yori-pm0i.onrender.com';
const TAGLINE = 'Bewusstseinstraining · Identitätsshift · Energiearbeit';

export default function LuanaYoriPreview({ world }: Props) {
  const [platform, setPlatform] = useState<Platform>('instagram');
  const [handle, setHandle] = useState(DEFAULT_HANDLE);

  const cleanHandle = useMemo(
    () => handle.trim().replace(/^@+/, '').toLowerCase().replace(/[^a-z0-9._]/g, '').slice(0, 64),
    [handle],
  );

  const yoriHref = useMemo(() => {
    const params = new URLSearchParams({
      platform,
      creator: cleanHandle || DEFAULT_HANDLE,
    });
    return `${YORI_ORIGIN}/demo?${params.toString()}`;
  }, [platform, cleanHandle]);

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-[#182019] text-[#f8f2e5]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url("${YORI_ORIGIN}/scene/rooms/room-desk.png")` }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,20,16,.83)_0%,rgba(15,20,16,.52)_46%,rgba(15,20,16,.18)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,15,12,.12),rgba(10,15,12,.46))]" />

      <section className="relative z-10 mx-auto flex min-h-[100svh] w-[calc(100%-32px)] max-w-[1180px] flex-col py-5 sm:w-[calc(100%-56px)] sm:py-7">
        <header className="flex items-start justify-between gap-4 border-b border-[#d4af68]/30 pb-4">
          <div>
            <div className="flex items-center gap-3">
              <YoriMark className="h-8 w-8 text-[#77aaa4]" title="YORI" />
              <Wordmark />
            </div>
            <p className="mt-2 text-[8px] uppercase tracking-[.18em] text-[#efe4d0]/60">{TAGLINE}</p>
          </div>
          <span className="pt-1 text-[8px] uppercase tracking-[.18em] text-[#d4af68]">DEIN YORI</span>
        </header>

        <div className="grid flex-1 items-center gap-8 py-8 lg:grid-cols-[.82fr_1.18fr] lg:gap-14">
          <div className="max-w-xl">
            <p className="font-mono text-[9px] font-bold uppercase tracking-[.20em] text-[#77aaa4]">
              Das Haus ist vorbereitet
            </p>
            <h1 className="mt-4 max-w-[11ch] font-serif text-[clamp(2.7rem,7vw,5.2rem)] font-light leading-[.94] tracking-[-.035em]">
              Luana, hier liegt schon etwas von dir.
            </h1>
            <p className="mt-5 max-w-lg text-[15px] leading-7 text-[#f3eadb]/75">
              Nicht als Analyse. Als Anfang: das, was wir wirklich kennen, liegt im Haus. Alles andere bleibt leer, bis du es selbst verbindest.
            </p>

            <div className="mt-7 border-y border-[#d4af68]/30 py-5">
              <TruthRow label="Instagram" value="@luanalumiina" state="bekannt · nicht verifiziert" />
              <TruthRow label="Sprache" value="Bewusstseinstraining · Identitätsshift · Energiearbeit" state="bekannt" />
              <TruthRow label="Website" value="aktueller Entwurf bekannt" state="Produktions-Domain offen" />
            </div>
          </div>

          <div className="lg:justify-self-end lg:w-full lg:max-w-[520px]">
            <section className="border border-[#d4af68]/28 bg-[#f7f0df]/[.94] p-5 text-[#1d2a20] shadow-[0_30px_90px_rgba(0,0,0,.28)] backdrop-blur-sm sm:p-7">
              <p className="text-[9px] uppercase tracking-[.20em] text-[#8c6224]">VORAB-SCAN</p>
              <h2 className="mt-3 font-serif text-[28px] font-light leading-tight">Mit welchem öffentlichen Handle soll YORI starten?</h2>
              <p className="mt-3 text-[13px] leading-6 text-[#506356]">
                Der Handle füllt nur den ersten Kontext. Echte Zahlen kommen erst nach einer bestätigten Verbindung vom Anbieter.
              </p>

              <div className="mt-6 flex border-b border-[#a8752c]/30">
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
                href={yoriHref}
                className="mt-7 flex min-h-14 items-center justify-between gap-4 border-y border-[#a8752c]/40 py-4 text-left"
              >
                <span>
                  <small className="block text-[9px] uppercase tracking-[.18em] text-[#8c6224]">ECHTES YORI ÖFFNEN</small>
                  <b className="mt-1 block font-serif text-[22px] font-light">
                    Haus mit @{cleanHandle || DEFAULT_HANDLE} betreten
                  </b>
                </span>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#3E8F8B] text-[#f7f0df]" aria-hidden="true">→</span>
              </a>

              <p className="mt-4 text-[10px] leading-5 text-[#66766b]">
                Keine Social-Zahl wird geraten. Der öffentliche Handle ist nur Kontext; verifizierte Daten ersetzen ihn erst nach OAuth.
              </p>
            </section>
          </div>
        </div>

        <section className="border-t border-[#d4af68]/30 pt-5">
          <div className="grid gap-4 sm:grid-cols-3">
            <Connector
              eyebrow="JETZT SCHON ECHT"
              title="TikTok verbinden"
              detail="Nach OAuth: Profil, Follower, Likes, Videoanzahl und bis zu 20 aktuelle Videos."
            />
            <Connector
              eyebrow="ECHTE ARBEIT"
              title="Kalender verbinden"
              detail="YORI kann kommende Termine prüfen und private Vorbereitungsfäden vorschlagen. Erst nach deiner Bestätigung wird etwas angelegt."
            />
            <Connector
              eyebrow="ALS NÄCHSTES"
              title="Website bestätigen"
              detail="Eine Produktions-Domain wird erst nach deiner Bestätigung als Quelle verarbeitet. Ein Preview-Link zählt nicht als Website-Identität."
            />
          </div>
        </section>

        <footer className="mt-5 flex items-center justify-between gap-4 text-[7px] uppercase tracking-[.18em] text-[#efe4d0]/45">
          <span>YORI · A SAIMÔR CREATION</span>
          <span>bekannt ≠ verifiziert</span>
        </footer>
      </section>
    </main>
  );
}

function Wordmark() {
  return (
    <span className="font-serif text-[18px] font-medium tracking-[.13em] text-[#f5ecdd]">
      LUANA <span className="text-[#d4af68]">LUMINA</span>
    </span>
  );
}

function TruthRow({ label, value, state }: { label: string; value: string; state: string }) {
  return (
    <div className="grid gap-1 border-b border-[#f2d39a]/[.10] py-3 last:border-b-0 sm:grid-cols-[92px_1fr_auto] sm:items-center sm:gap-4">
      <span className="text-[8px] uppercase tracking-[.17em] text-[#d4af68]">{label}</span>
      <strong className="text-[12px] font-medium leading-5 text-[#f7f0e3]">{value}</strong>
      <small className="text-[9px] text-[#b7c0b7] sm:text-right">{state}</small>
    </div>
  );
}

function Connector({ eyebrow, title, detail }: { eyebrow: string; title: string; detail: string }) {
  return (
    <article className="border-l border-[#d4af68]/30 pl-4">
      <p className="font-mono text-[8px] font-bold tracking-[.17em] text-[#77aaa4]">{eyebrow}</p>
      <h3 className="mt-2 font-serif text-[19px] font-light text-[#f6ecdd]">{title}</h3>
      <p className="mt-2 max-w-sm text-[11px] leading-5 text-[#e8dece]/60">{detail}</p>
    </article>
  );
}
