# Client World — Luana pilot

**Status:** implementation spec for the first private client-facing page.
**Surface:** `Saimor-world/Website`
**Pilot route:** `/world/luana`

## Was das ist

Eine private Seite für eine Kundin. Sie enthält das, was wir ihr gerade
konkret zu sagen haben: Antworten auf ihre Fragen, Beobachtungen zu ihrem
Auftritt, und ein Feld, in das sie zurückschreiben kann.

Kein Kundenportal, kein Dashboard, keine Produktführung.

## Was wir beim ersten Versuch falsch gemacht haben

Die erste Fassung hatte acht Abschnitte und hat fast ausschließlich über
uns geredet: YORI, MÔRA, Saimôr OS, Verbindungen zwischen Produkten,
Truth-State-Badges, ein interaktives Website-Konzept aus Platzhaltern.
Über die Kundin selbst stand dort ihr Vorname.

Dazu kam die Sprache. Fast jede Überschrift folgte derselben Formel —
„Nicht mehr zeigen. Klarer verbinden.", „Erst verbinden. Dann urteilen.",
„Nicht Dekoration. Tragende Ebene." Ein Dutzend Headlines, ein Rhythmus.
Das liest sich als maschinell erzeugt, weil es das war.

Beides ist raus. Die Regeln daraus:

- **Konkret vor schön.** Ein echter Satz über ihre Seite schlägt drei
  Absätze über unsere Architektur.
- **Keine Antithesen-Headlines.** Keine zweiteiligen Kurzsätze als
  Überschrift. Normale Sätze, unterschiedliche Länge.
- **Keine Produktnamen ohne Anlass.** YORI, MÔRA und OS gehören erst auf
  die Seite, wenn davon etwas für sie läuft. Ein Test hält das fest.
- **Keine abstrakten Nomen** als Träger (Raum, Welt, Fluss, Ebene,
  Signale). Sie hat ein Business, keine World.

## Inhalt (Luana, Stand September 2026)

Was wir belegen können, steht drin; alles andere nicht.

| Quelle | Was wir daraus verwenden |
|---|---|
| Ihre Website (Screenshot, Handy) | Markenname, Positionierungszeile, Headline, zwei CTAs, fünf konkrete Beobachtungen zum Einstieg |
| Ihre Sprachnachricht | Frage zur E-Mail-Domain, Tatsache dass die Domain bei IONOS liegt |

Nicht verwendet, weil nicht vorhanden: Reichweite, Besucherzahlen,
Buchungen, Umsatz, Inhalte ihrer Angebote. Dafür gibt es einen eigenen
Abschnitt „Was wir nicht wissen", der das offen sagt, statt es zu füllen.

## Zugang

Per-World-Code aus der Server-Umgebung (`CLIENT_WORLD_LUANA_CODE`), nie im
Browser-Quelltext. Erfolgreicher Eintausch setzt ein signiertes HttpOnly-
Cookie (30 Tage, `NEXTAUTH_SECRET` als Schlüssel), das nur Slug, zufällige
Session-Id und Ablauf enthält.

Private Worlds tragen keine öffentliche Navigation, keinen Cookie-Banner,
keine Achievements und kein Cmd+K — und erben auch keine Marketing-
Metadaten (Canonical, OpenGraph, Twitter werden überschrieben).

## Interaktionen

Persistiert über den bestehenden `WebsiteEvent`-Store, kein zweites
Backend:

- `client_world.idea_reaction` — Reaktion auf einen konkreten Vorschlag
  (`interesting` | `later` | `disagree`), `itemId` ist eine Note-Id
- `client_world.feedback` — Freitext

Reaktionen werden beim Aufruf serverseitig zurückgelesen
(`getPriorIdeaReactions`), damit die Seite den Stand behält. Schlägt die
DB fehl, wird leer geladen statt den Zugang zu blockieren.

## Offen

- `CLIENT_WORLD_LUANA_CODE` in Vercel setzen, dann End-to-End-Test des
  Zugangs
- Texte werden derzeit von Saimôr geschrieben; sobald die Kundin selbst
  antwortet, ersetzt ihr Wortlaut unsere Formulierungen
- Kein Production-Deploy im Rahmen dieses Slices
