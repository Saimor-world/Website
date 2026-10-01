'use client';

import { useState } from 'react';
import YoriMark from '@/components/YoriMark';
import { yoriOrigin } from '@/lib/product-origins';

type Props = { locale: 'de' | 'en' };
type RoomKey = 'desk' | 'workshop' | 'cash';

const YORI_ORIGIN = yoriOrigin() || 'https://yori.saimor.world';

const ROOM_ASSETS: Record<RoomKey, string> = {
  desk: '/world/luana/room-desk.webp',
  workshop: '/world/luana/room-workshop.webp',
  cash: '/world/luana/room-cash.webp',
};

const COPY = {
  de: {
    back: '← SAIMÔR',
    brandSub: '縁 · CREATIVE HOUSE BY SAIMÔR',
    eyebrow: 'YORI · CREATIVE HOUSE',
    title: 'Ein Haus für deine Arbeit.\nNicht noch ein Dashboard.',
    lead: 'YORI ist ein ruhiger, räumlicher Arbeitsort für Creator. Drei klare Räume — Schreibtisch, Werkstatt und Cash — halten Ideen, Schnitte, Verträge und verbundene Werkzeuge im selben Zusammenhang.',
    ruleBadge: 'Produktregel · Der Schreibtisch zeigt Arbeit, keine Kennzahlen',
    enterDemo: 'In den Raum eintreten',
    loginLabel: 'Mit Konto anmelden',
    profileLabel: 'Oder direkt mit deinem öffentlichen Handle eintreten',
    placeholder: 'deinusername',
    openHandle: 'Raum öffnen',
    stageCaption: 'Echte Produktansicht · Klicke links auf Schreibtisch, Werkstatt oder Cash, um durch das Haus zu gehen',
    railStatus: 'YORI bereit',
    railStatusSub: 'CORE-Kontinuität · 3 Räume im Haus',
    rooms: {
      desk: {
        id: 'desk' as const,
        nav: 'Schreibtisch',
        code: '01 / SCHREIBTISCH',
        kicker: 'FREITAG · ABENDDÄMMERUNG · 3 SACHEN WARTEN AUF DICH',
        greeting: 'Guten Abend.',
        lead: 'Hier liegt nur, was deine Aufmerksamkeit oder Entscheidung braucht.',
        purpose: 'Was heute entschieden werden muss.',
        body: 'Auf dem Holz liegen keine lauten Kurven oder erfundenen Follower-Zähler, sondern echte Vorgänge als greifbare Blätter: Verträge, Freigaben und der nächste kreative Schritt.',
        noteTitle: 'Notizen & Fäden',
        noteText: 'Nordlicht-Freigabe hängt mit dem Q4-Vertrag und dem morgigen Drehtermin um 11:00 Uhr zusammen.',
        papers: [
          {
            kind: 'FREIGABE · WARTE AUF DICH',
            title: 'Studio Nordlicht — Rohschnitt Reel #04',
            meta: 'YORI Cut · 00:42 min · Untertitel & Hook bereit zur Abnahme',
            action: 'Schnitt prüfen →',
          },
          {
            kind: 'VERTRAG · ENTSCHEIDUNG',
            title: 'Lumi Skin Q4 — Exklusivitätsklausel',
            meta: 'Mail + Drive · 4.800 € · Rückfrage zu 30 Tagen Sperrfrist',
            action: 'Antwort freigeben →',
          },
          {
            kind: 'TERMIN · MORGEN 11:00',
            title: 'Briefing-Call & Shotlist-Abgleich',
            meta: 'Google Kalender · Verknüpft mit Kampagne Herbst-Drop',
            action: 'Vorbereitung öffnen →',
          },
        ],
      },
      workshop: {
        id: 'workshop' as const,
        nav: 'Werkstatt',
        code: '02 / WERKSTATT',
        kicker: 'WERKSTATT · BLICK IN DEN GARTEN · IN ARBEIT',
        greeting: 'Woran gerade gebaut wird.',
        lead: 'Ideen, Hooks, Shotlists und Schnitte in YORI Cut — direkt vor dem großen Fenster.',
        purpose: 'Woran gerade gearbeitet wird.',
        body: 'In der Werkstatt entstehen Formate, Skripte und Schnitte. Statt zwischen sechs offenen Tabs zu springen, liegen Rohmaterial, Hook-Varianten und YORI Cut im selben Raum.',
        noteTitle: 'Aktiver Produktionsfaden',
        noteText: '3 Hook-Varianten aus Sprachnotiz extrahiert · Rohschnitt in YORI Cut vorgemerkt.',
        papers: [
          {
            kind: 'YORI CUT · TIMELINE',
            title: 'Herbst-Routine — 9:16 Master Cut',
            meta: '3 Takes synchronisiert · Stille-Schnitte vorbereitet',
            action: 'In YORI Cut öffnen →',
          },
          {
            kind: 'SKRIPT & HOOK',
            title: '„Warum leise Räume bessere Ideen bauen“',
            meta: 'Entwurf #03 · Aus Sprachnotiz vom Dienstag verdichtet',
            action: 'Faden weiterführen →',
          },
          {
            kind: 'QUELLEN & MATERIAL',
            title: 'B-Roll Ordner · Kyoto & Studio-Licht',
            meta: 'Google Drive · 14 Clips zugeordnet',
            action: 'Assets ansehen →',
          },
        ],
      },
      cash: {
        id: 'cash' as const,
        nav: 'Cash',
        code: '03 / CASH',
        kicker: 'CASH · RUHIGE ECKE · ECHTE BELEGE',
        greeting: 'Was hereinkommt und was bleibt.',
        lead: 'Kooperationen, offene Rechnungen und Steuerrücklagen ohne geschönte Zahlen.',
        purpose: 'Was hereinkommt und was zurückgelegt ist.',
        body: 'Abgewandt vom Fenster, in der ruhigen Ecke des Hauses, liegen die Bücher: bezahlte Kooperationen, offene Honorare und reale Rücklagen — strikt getrennt von Schätzungen.',
        noteTitle: 'Kassenbuch-Wahrheit',
        noteText: 'Keine erfundenen Umsätze: Jede Position zeigt ihre echte Herkunft (Beleg, Vertrag oder Entwurf).',
        papers: [
          {
            kind: 'RECHNUNG · OFFEN',
            title: 'Atelier Vara — Kampagne Oktober',
            meta: '3.200 € netto · Fällig in 6 Tagen · Beleg verknüpft',
            action: 'Status prüfen →',
          },
          {
            kind: 'RÜCKLAGE · STEUER & FIX',
            title: 'Quartalsrücklage Q4 gesichert',
            meta: 'Aus bestätigten Eingängen berechnet · Keine Schätzwerte',
            action: 'Buchung einsehen →',
          },
          {
            kind: 'KOOPERATION · ANGEBOT',
            title: 'Lumi Skin — Paketpreis 2 Reels + Usage',
            meta: '4.800 € · Wartet auf Freigabe am Schreibtisch',
            action: 'Zum Vorgang →',
          },
        ],
      },
    },
    houseEyebrow: 'DIE ARCHITEKTUR DES HAUSES',
    houseTitle: 'Drei Räume statt zwanzig Menüs.',
    houseLead: 'Jeder Raum in YORI ist dasselbe Gebäude: gleiches Holz, gleiches Shoji-Licht, gleiche Ruhe. Was sich ändert, ist der Blickwinkel auf deine Arbeit.',
    continuityEyebrow: 'EHRLICHE VERBINDUNGEN · CORE',
    continuityTitle: 'Zusammenhang aus echten Quellen — nie erfunden.',
    continuityLead: 'Solange du keine Quelle verbindest, bleibt der Schreibtisch ehrlich leer oder zeigt eine klar markierte Beispielsituation. Wenn du Quellen freigibst, hält YORI den Faden über deine bestehenden Werkzeuge hinweg.',
    sources: [
      ['TikTok OAuth', 'Echte Profil- und Videodaten direkt aus deinem Kanal'],
      ['E-Mail (IMAP / SMTP)', 'Kooperationsanfragen landen als Vorgang statt als Postfach-Lärm'],
      ['Google Kalender', 'Drehtage, Calls und Deadlines im selben Raum sichtbar'],
      ['Drive · SharePoint · Nextcloud', 'Rohmaterial, Verträge und Briefings direkt am Projekt'],
      ['YORI Cut', 'Schnitt und Freigabe als ruhiges Arbeitsblatt im Raum'],
      ['Saimôr CORE', 'Jede vorgeschlagene Aktion wartet auf deine explizite Bestätigung'],
    ],
    closingEyebrow: '縁 · YORI · CREATIVE HOUSE',
    closingTitle: 'Tritt ein und sieh deinen Raum von innen.',
    closingSub: 'Ohne Anmeldung im interaktiven Demo-Haus erkunden — oder direkt mit deinem öffentlichen Handle starten.',
  },
  en: {
    back: '← SAIMÔR',
    brandSub: '縁 · CREATIVE HOUSE BY SAIMÔR',
    eyebrow: 'YORI · CREATIVE HOUSE',
    title: 'A house for your work.\nNot another dashboard.',
    lead: 'YORI is a calm, spatial workspace for creators. Three clear rooms — Desk, Workshop and Cash — keep ideas, edits, contracts and connected tools in one shared context.',
    ruleBadge: 'Product rule · The desk shows work, not vanity metrics',
    enterDemo: 'Step inside the room',
    loginLabel: 'Sign in with account',
    profileLabel: 'Or enter directly with your public handle',
    placeholder: 'yourusername',
    openHandle: 'Open room',
    stageCaption: 'Real product view · Click Desk, Workshop or Cash on the left rail to walk through the house',
    railStatus: 'YORI ready',
    railStatusSub: 'CORE continuity · 3 rooms in the house',
    rooms: {
      desk: {
        id: 'desk' as const,
        nav: 'Desk',
        code: '01 / DESK (SCHREIBTISCH)',
        kicker: 'FRIDAY · DUSK · 3 ITEMS WAITING FOR YOU',
        greeting: 'Good evening.',
        lead: 'Only what requires your attention or decision lies here.',
        purpose: 'What needs a decision today.',
        body: 'No noisy charts or inflated follower counters sit on the wood — only tangible sheets of real work: approvals, contracts and the next creative step.',
        noteTitle: 'Notes & Threads',
        noteText: 'Nordlicht approval connects to the Q4 contract and tomorrow’s 11:00 shoot briefing.',
        papers: [
          {
            kind: 'APPROVAL · WAITING ON YOU',
            title: 'Studio Nordlicht — Rough Cut Reel #04',
            meta: 'YORI Cut · 00:42 min · Captions & hook ready for review',
            action: 'Review cut →',
          },
          {
            kind: 'CONTRACT · DECISION',
            title: 'Lumi Skin Q4 — Exclusivity Clause',
            meta: 'Mail + Drive · €4,800 · Question on 30-day exclusivity window',
            action: 'Approve reply →',
          },
          {
            kind: 'MEETING · TOMORROW 11:00',
            title: 'Briefing Call & Shotlist Sync',
            meta: 'Google Calendar · Linked to Autumn Drop campaign',
            action: 'Open prep →',
          },
        ],
      },
      workshop: {
        id: 'workshop' as const,
        nav: 'Workshop',
        code: '02 / WORKSHOP (WERKSTATT)',
        kicker: 'WORKSHOP · GARDEN VIEW · IN PROGRESS',
        greeting: 'What is being shaped right now.',
        lead: 'Ideas, hooks, shotlists and edits in YORI Cut — right in front of the wide window.',
        purpose: 'What is actively being built.',
        body: 'The Workshop is where formats, scripts and edits take shape. Instead of jumping across six browser tabs, raw footage, hook variations and YORI Cut live in one room.',
        noteTitle: 'Active Production Thread',
        noteText: '3 hook variations distilled from Tuesday’s voice note · Rough cut staged in YORI Cut.',
        papers: [
          {
            kind: 'YORI CUT · TIMELINE',
            title: 'Autumn Routine — 9:16 Master Cut',
            meta: '3 takes synced · Silence trims prepared',
            action: 'Open in YORI Cut →',
          },
          {
            kind: 'SCRIPT & HOOK',
            title: '“Why quiet rooms build better ideas”',
            meta: 'Draft #03 · Distilled from Tuesday voice note',
            action: 'Continue thread →',
          },
          {
            kind: 'SOURCES & FOOTAGE',
            title: 'B-Roll Folder · Kyoto & Studio Light',
            meta: 'Google Drive · 14 clips linked',
            action: 'Inspect assets →',
          },
        ],
      },
      cash: {
        id: 'cash' as const,
        nav: 'Cash',
        code: '03 / CASH',
        kicker: 'CASH · QUIET CORNER · VERIFIED LEDGER',
        greeting: 'What comes in and what stays.',
        lead: 'Collaborations, open invoices and tax reserves without invented numbers.',
        purpose: 'What comes in and what is set aside.',
        body: 'Turned away from the window in the quiet corner of the house sit the books: paid collaborations, open invoices and real reserves — strictly separated from estimates.',
        noteTitle: 'Ledger Honesty',
        noteText: 'No fabricated revenue: every line shows its exact provenance (invoice, contract or draft).',
        papers: [
          {
            kind: 'INVOICE · OPEN',
            title: 'Atelier Vara — October Campaign',
            meta: '€3,200 net · Due in 6 days · Invoice attached',
            action: 'Check status →',
          },
          {
            kind: 'RESERVE · TAX & FIXED',
            title: 'Q4 Tax Reserve Set Aside',
            meta: 'Calculated from confirmed payouts · Zero guesswork',
            action: 'View entry →',
          },
          {
            kind: 'COLLABORATION · OFFER',
            title: 'Lumi Skin — 2 Reels + Usage Bundle',
            meta: '€4,800 · Waiting for approval on the Desk',
            action: 'Open thread →',
          },
        ],
      },
    },
    houseEyebrow: 'THE ARCHITECTURE OF THE HOUSE',
    houseTitle: 'Three rooms instead of twenty menus.',
    houseLead: 'Every room in YORI is the same building: same timber, same shoji light, same calm. What changes is which corner you stand in and what work lies before you.',
    continuityEyebrow: 'HONEST CONNECTIONS · CORE',
    continuityTitle: 'Continuity from real sources — never fabricated.',
    continuityLead: 'Until you connect a source, the desk stays honestly empty or shows a clearly labeled sandbox story. When you grant access, YORI holds the thread across the tools you already use.',
    sources: [
      ['TikTok OAuth', 'Real profile and video data directly from your channel'],
      ['Email (IMAP / SMTP)', 'Brand inquiries arrive as structured work items, not inbox noise'],
      ['Google Calendar', 'Shoot days, calls and deadlines visible inside the same room'],
      ['Drive · SharePoint · Nextcloud', 'Raw footage, contracts and briefs attached to the work'],
      ['YORI Cut', 'Video editing and review as a calm surface inside the house'],
      ['Saimôr CORE', 'Every proposed action waits for your explicit confirmation'],
    ],
    closingEyebrow: '縁 · YORI · CREATIVE HOUSE',
    closingTitle: 'Step inside and see your workspace from within.',
    closingSub: 'Explore the interactive demo house without signing up — or enter directly with your public handle.',
  },
} as const;

export default function YoriLanding({ locale }: Props) {
  const de = locale === 'de';
  const c = COPY[locale];
  const homeHref = de ? '/de' : '/en';
  const [activeRoom, setActiveRoom] = useState<RoomKey>('desk');
  const [handle, setHandle] = useState('');

  const room = c.rooms[activeRoom];
  const cleanHandle = handle.trim().replace(/^@+/, '').toLowerCase().replace(/[^a-z0-9._]/g, '').slice(0, 64);
  const demoHref = `${YORI_ORIGIN}/demo`;
  const loginHref = `${YORI_ORIGIN}/login`;

  return (
    <main className="min-h-[100svh] overflow-hidden bg-[#0c0a08] text-[#f4ecdf]">
      {/* HERO + INTERACTIVE ROOM-FIRST HOUSE STAGE */}
      <section className="relative border-b border-[#f4ecdf]/10 pb-20 pt-6 sm:pb-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(62,143,139,.14),transparent_38%),radial-gradient(circle_at_22%_38%,rgba(214,173,109,.10),transparent_42%),linear-gradient(180deg,#0c0a08_0%,#111617_52%,#0c0a08_100%)]"
        />

        <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-14">
          <header className="flex items-center justify-between border-b border-[#f4ecdf]/10 pb-5">
            <a href={homeHref} className="group flex items-center gap-3.5 text-[#f4ecdf]">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-[#d6ad6d]/30 bg-[#17130f] text-[#63aba6] shadow-[0_10px_30px_rgba(0,0,0,.45)]">
                <YoriMark className="h-6 w-6" />
              </span>
              <div>
                <div className="font-serif text-[18px] tracking-[.22em] text-[#f4ecdf]">YORI</div>
                <div className="mt-0.5 font-mono text-[8px] tracking-[.2em] text-[#d6ad6d]/80">{c.brandSub}</div>
              </div>
            </a>

            <div className="flex items-center gap-5">
              <a
                href={loginHref}
                className="hidden font-mono text-[10px] uppercase tracking-[.18em] text-[#f4ecdf]/68 transition hover:text-[#f4ecdf] sm:inline-block"
              >
                {c.loginLabel}
              </a>
              <a
                href={homeHref}
                className="font-mono text-[10px] uppercase tracking-[.2em] text-[#d6ad6d]/85 transition hover:text-[#f4ecdf]"
              >
                {c.back}
              </a>
            </div>
          </header>

          {/* Top Editorial Intro */}
          <div className="mt-12 grid items-end gap-10 lg:grid-cols-[1.08fr_.92fr] lg:gap-14">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-[#63aba6]/30 bg-[#132123]/80 px-3.5 py-1.5 font-mono text-[9px] uppercase tracking-[.22em] text-[#63aba6]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#65d49a]" />
                {c.eyebrow}
              </div>
              <h1 className="mt-6 whitespace-pre-line font-serif text-[clamp(2.85rem,5.6vw,5.6rem)] font-light leading-[.92] tracking-[-.04em] text-[#f4ecdf]">
                {c.title}
              </h1>
            </div>

            <div className="lg:pb-2">
              <p className="max-w-xl text-[16px] leading-7 text-[#f4ecdf]/76 sm:text-[17px] sm:leading-8">
                {c.lead}
              </p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[.18em] text-[#d6ad6d]">
                {c.ruleBadge}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3.5">
                <a
                  href={demoHref}
                  className="inline-flex min-h-[48px] items-center gap-2.5 rounded-full bg-[#3e8f8b] px-6 py-3 text-sm font-semibold text-[#f4ecdf] shadow-[0_16px_40px_rgba(14,77,100,.4)] transition hover:bg-[#327874]"
                >
                  {c.enterDemo} →
                </a>
                <a
                  href={loginHref}
                  className="inline-flex min-h-[48px] items-center rounded-full border border-[#f4ecdf]/20 bg-[#17130f]/80 px-6 py-3 text-sm font-medium text-[#f4ecdf]/88 transition hover:border-[#d6ad6d]/55 hover:text-[#f4ecdf]"
                >
                  {c.loginLabel}
                </a>
              </div>

              <form action={`${YORI_ORIGIN}/demo`} method="get" className="mt-6 max-w-[490px]">
                <input type="hidden" name="platform" value="instagram" />
                <label className="block font-mono text-[9px] uppercase tracking-[.18em] text-[#f4ecdf]/52">
                  {c.profileLabel}
                </label>
                <div className="mt-2 flex items-stretch rounded-xl border border-[#f4ecdf]/16 bg-[#16120e]/90 px-3.5 transition focus-within:border-[#63aba6]">
                  <span className="flex items-center pr-1.5 font-serif text-lg text-[#d6ad6d]">@</span>
                  <input
                    aria-label={c.placeholder}
                    name="creator"
                    value={handle}
                    onChange={(event) => setHandle(event.target.value)}
                    required
                    maxLength={64}
                    autoComplete="off"
                    placeholder={c.placeholder}
                    className="min-w-0 flex-1 bg-transparent py-3 text-sm text-[#f4ecdf] outline-none placeholder:text-[#f4ecdf]/32"
                  />
                  <button
                    type="submit"
                    className="pl-3 font-mono text-[10px] uppercase tracking-[.18em] text-[#63aba6] transition hover:text-[#f4ecdf]"
                  >
                    {cleanHandle ? `@${cleanHandle}` : c.openHandle} →
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* ACTUAL YORI SPATIAL HOUSE STAGE */}
          <div className="mt-12">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[.16em] text-[#f4ecdf]/58">
              <span>{c.stageCaption}</span>
              <span className="text-[#d6ad6d]">{room.code}</span>
            </div>

            <div className="relative overflow-hidden rounded-[26px] border border-[#f4ecdf]/16 bg-[#0d0b09] shadow-[0_40px_120px_rgba(0,0,0,.78)]">
              {/* Background Room Plate (with composited Zen garden window + lantern + teacup) */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-cover bg-center transition-all duration-700"
                style={{ backgroundImage: `url("${ROOM_ASSETS[activeRoom]}")` }}
              />
              {/* Authentic YoriWorkspaceScene vignette & warm lantern wash */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(8,6,5,.86)_0%,rgba(8,6,5,.42)_18%,transparent_44%),linear-gradient(270deg,rgba(8,6,5,.78)_0%,rgba(8,6,5,.32)_16%,transparent_38%),linear-gradient(180deg,rgba(8,6,5,.55)_0%,transparent_22%,rgba(6,5,4,.84)_100%)]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(36%_32%_at_82%_72%,rgba(255,198,112,.22),transparent_70%)]"
              />

              {/* Stage Interior Layout matching YORIApp + YoriTodayRoom */}
              <div className="relative z-10 grid min-h-[620px] lg:min-h-[680px] lg:grid-cols-[210px_1fr_280px]">
                {/* Left Compact Room Rail (matches yori-app.tsx desktopRail) */}
                <aside
                  aria-label="YORI Hauptnavigation"
                  className="flex flex-col justify-between border-b border-[#f4ecdf]/10 bg-[#100d0a]/82 p-4 backdrop-blur-xl lg:border-b-0 lg:border-r"
                >
                  <div>
                    <div className="flex items-center gap-2.5 px-2 py-1.5">
                      <span className="h-5 w-5 rounded-full border-2 border-[#63aba6]" />
                      <div>
                        <b className="block text-xs tracking-[.14em] text-[#f4ecdf]">YORI</b>
                        <small className="block text-[9px] text-[#d6ad6d]">より · Haus</small>
                      </div>
                    </div>

                    <nav className="mt-5 flex gap-2 lg:flex-col">
                      {(['desk', 'workshop', 'cash'] as RoomKey[]).map((key) => {
                        const item = c.rooms[key];
                        const isCurrent = activeRoom === key;
                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() => setActiveRoom(key)}
                            className={`flex flex-1 items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs transition lg:flex-initial ${
                              isCurrent
                                ? 'border border-[#d6ad6d]/40 bg-[#241d17]/90 font-semibold text-[#f4ecdf] shadow-[0_8px_24px_rgba(0,0,0,.35)]'
                                : 'border border-transparent text-[#f4ecdf]/62 hover:bg-[#f4ecdf]/[0.06] hover:text-[#f4ecdf]'
                            }`}
                          >
                            <span>{item.nav}</span>
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                isCurrent ? 'bg-[#d6ad6d]' : 'bg-transparent'
                              }`}
                            />
                          </button>
                        );
                      })}
                    </nav>
                  </div>

                  <div className="mt-4 hidden rounded-xl border border-[#f4ecdf]/10 bg-[#16120e]/80 p-3 lg:block">
                    <div className="flex items-center gap-2 text-[11px] font-medium text-[#f4ecdf]">
                      <span className="h-2 w-2 rounded-full bg-[#65d49a] shadow-[0_0_10px_rgba(101,212,154,.8)]" />
                      {c.railStatus}
                    </div>
                    <p className="mt-1 text-[10px] leading-4 text-[#f4ecdf]/58">{c.railStatusSub}</p>
                  </div>
                </aside>

                {/* Center Room Scene: Greeting at Top-Left + DeskPapers at Bottom */}
                <div className="flex flex-col justify-between p-6 sm:p-8">
                  <div className="max-w-md rounded-3xl bg-[#0b0907]/68 p-5 backdrop-blur-md">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-[#d6ad6d]">
                      {room.kicker}
                    </p>
                    <h2 className="mt-2 font-serif text-3xl font-light tracking-[-.03em] text-[#f4ecdf] sm:text-4xl">
                      {room.greeting}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-[#f4ecdf]/82">{room.lead}</p>
                  </div>

                  {/* DeskPapers on the wooden surface */}
                  <div className="mt-36 sm:mt-44">
                    <div className="grid gap-3.5 md:grid-cols-3">
                      {room.papers.map((paper, idx) => {
                        const rotations = ['md:-rotate-1', 'md:rotate-[0.6deg]', 'md:-rotate-[0.5deg]'];
                        return (
                          <a
                            key={paper.title}
                            href={demoHref}
                            className={`group flex flex-col justify-between rounded-[16px] border border-[#e6dac3]/35 bg-[#f4ecdf]/[0.94] p-4 text-[#1e1914] shadow-[0_22px_48px_rgba(0,0,0,.55)] transition duration-300 hover:-translate-y-1 hover:bg-[#fbf6ec] ${rotations[idx]}`}
                          >
                            <div>
                              <span className="font-mono text-[8px] font-bold uppercase tracking-[.16em] text-[#0e4d64]">
                                {paper.kind}
                              </span>
                              <h3 className="mt-1.5 font-serif text-[17px] font-medium leading-snug text-[#1a1612]">
                                {paper.title}
                              </h3>
                              <p className="mt-1.5 text-[11px] leading-4 text-[#4c4339]">{paper.meta}</p>
                            </div>
                            <span className="mt-3.5 inline-flex items-center font-mono text-[9px] font-bold uppercase tracking-[.14em] text-[#0e4d64] group-hover:text-[#3e8f8b]">
                              {paper.action}
                            </span>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right Floating Room Glass Rail (Notes & Continuity) */}
                <div className="flex flex-col justify-between border-t border-[#f4ecdf]/10 bg-[#120e0b]/60 p-5 backdrop-blur-md lg:border-l lg:border-t-0">
                  <div className="rounded-2xl border border-[#f4ecdf]/12 bg-[#16120e]/88 p-4 shadow-[0_20px_46px_rgba(0,0,0,.4)]">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-xs text-[#d6ad6d]">{room.noteTitle}</span>
                      <span className="font-mono text-[8px] uppercase tracking-[.16em] text-[#63aba6]">CORE</span>
                    </div>
                    <p className="mt-2.5 text-xs leading-5 text-[#f4ecdf]/78">{room.noteText}</p>
                  </div>

                  <div className="mt-4 rounded-2xl border border-[#f4ecdf]/12 bg-[#16120e]/88 p-4">
                    <p className="font-mono text-[9px] uppercase tracking-[.16em] text-[#d6ad6d]">
                      {room.nav}
                    </p>
                    <p className="mt-1.5 text-xs leading-5 text-[#f4ecdf]/72">{room.body}</p>
                    <a
                      href={demoHref}
                      className="mt-3 inline-block font-mono text-[9px] uppercase tracking-[.16em] text-[#63aba6] underline decoration-[#63aba6]/45 underline-offset-4 hover:text-[#f4ecdf]"
                    >
                      {c.enterDemo} →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THREE ROOMS OF THE HOUSE */}
      <section className="relative border-b border-[#f4ecdf]/10 bg-[#101517] px-5 py-20 sm:px-10 lg:px-14 md:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="max-w-2xl">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[.22em] text-[#63aba6]">
              {c.houseEyebrow}
            </p>
            <h2 className="mt-4 font-serif text-[clamp(2.4rem,4.5vw,4.25rem)] font-light leading-[.96] tracking-[-.035em] text-[#f4ecdf]">
              {c.houseTitle}
            </h2>
            <p className="mt-5 text-base leading-7 text-[#f4ecdf]/70">{c.houseLead}</p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {(['desk', 'workshop', 'cash'] as RoomKey[]).map((key) => {
              const item = c.rooms[key];
              return (
                <article
                  key={key}
                  onClick={() => setActiveRoom(key)}
                  className="group cursor-pointer overflow-hidden rounded-[22px] border border-[#f4ecdf]/12 bg-[#151c1e] transition hover:border-[#63aba6]/50"
                >
                  <div className="relative h-52 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url("${ROOM_ASSETS[key]}")` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#151c1e] via-[#151c1e]/25 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full border border-[#f4ecdf]/16 bg-[#0e0b09]/80 px-3 py-1 font-mono text-[9px] uppercase tracking-[.16em] text-[#d6ad6d] backdrop-blur-md">
                      {item.code}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-2xl font-light text-[#f4ecdf]">{item.nav}</h3>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[.14em] text-[#63aba6]">
                      {item.purpose}
                    </p>
                    <p className="mt-3.5 text-sm leading-6 text-[#f4ecdf]/72">{item.body}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: REAL CONNECTIONS & CORE CONTINUITY */}
      <section className="relative border-b border-[#f4ecdf]/10 bg-[#0c0a08] px-5 py-20 sm:px-10 lg:px-14 md:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="max-w-2xl">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[.22em] text-[#d6ad6d]">
              {c.continuityEyebrow}
            </p>
            <h2 className="mt-4 font-serif text-[clamp(2.2rem,4.2vw,3.9rem)] font-light leading-[.98] tracking-[-.03em] text-[#f4ecdf]">
              {c.continuityTitle}
            </h2>
            <p className="mt-5 text-base leading-7 text-[#f4ecdf]/70">{c.continuityLead}</p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.sources.map(([name, desc]) => (
              <div
                key={name}
                className="rounded-2xl border border-[#f4ecdf]/10 bg-[#15120e] p-6 transition hover:border-[#d6ad6d]/35"
              >
                <p className="font-serif text-xl font-light text-[#f4ecdf]">{name}</p>
                <p className="mt-2.5 text-sm leading-6 text-[#f4ecdf]/65">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="relative overflow-hidden bg-[#101517] px-5 py-24 text-center sm:px-10 lg:px-14">
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center">
          <YoriMark className="h-12 w-12 text-[#63aba6]" />
          <p className="mt-5 font-mono text-[10px] uppercase tracking-[.22em] text-[#d6ad6d]">
            {c.closingEyebrow}
          </p>
          <h2 className="mt-4 font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-[.95] tracking-[-.035em] text-[#f4ecdf]">
            {c.closingTitle}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-[#f4ecdf]/68">{c.closingSub}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={demoHref}
              className="inline-flex min-h-[50px] items-center rounded-full bg-[#3e8f8b] px-7 py-3 text-sm font-semibold text-[#f4ecdf] transition hover:bg-[#327874]"
            >
              {c.enterDemo} →
            </a>
            <a
              href={loginHref}
              className="inline-flex min-h-[50px] items-center rounded-full border border-[#f4ecdf]/20 bg-[#0c0a08]/60 px-7 py-3 text-sm font-medium text-[#f4ecdf]/85 transition hover:border-[#d6ad6d]/50 hover:text-[#f4ecdf]"
            >
              {c.loginLabel}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
