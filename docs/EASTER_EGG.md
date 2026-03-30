# SAIMOR Easter Eggs

## Überblick

Die spielerischen Features liegen zentral in `components/EasterEggs.tsx`.
Sie sind absichtlich subtil gehalten:

- Konami-Code aktiviert einen ruhigen Resonanzmodus statt eines lauten Vollbild-Gimmicks.
- Achievements werden zentral über `lib/achievements.ts` verwaltet.
- Freischaltungen werden lokal im Browser gespeichert.
- Das Achievements-Menü lässt sich über `AAA` oder die Command Palette öffnen.

## Wichtige Trigger

### Konami-Code

Reihenfolge:

```text
↑ ↑ ↓ ↓ ← → ← → B A
```

Effekt:

- Achievement `konami`
- temporärer Resonanz-Overlay
- dezente Partikel- und Glyphen-Animation

### Weitere spielerische Trigger

- `AAA` öffnet das versteckte Achievements-Menü
- 4x Klick auf das Logo löst `quad_logo` aus
- bestimmte Begriffe wie `klarheit`, `saimor`, `wandel`
- längere Aufmerksamkeit, Scrolltiefe und wiederkehrende Besuche
- Môra-Interaktionen wie Karten öffnen oder View-Modi wechseln

## Technische Struktur

- `components/EasterEggs.tsx`
  Zentrale Trigger, UI-Feedback, Resonanzmodus
- `lib/achievements.ts`
  Definitionen, Speicherung, Fortschritt, Unlock-Logik
- `components/AchievementToast.tsx`
  Toast für neue Freischaltungen
- `components/AchievementMenu.tsx`
  Übersicht aller sichtbaren und versteckten Achievements

## Hinweise

- Das System respektiert `prefers-reduced-motion`.
- Es gibt keine serverseitige Persistenz, nur `localStorage` und `sessionStorage`.
- Die Môra-bezogenen Achievements reagieren auf echte UI-Events aus `components/MoraDashboard.tsx`.
- Bewusst entfernt wurden zufällige Trigger wie Uhrzeit, Device-Shake oder rein quantitative Sammel-Mechaniken.
