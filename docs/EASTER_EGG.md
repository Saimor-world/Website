# SAIMOR Discovery Layer

## Überblick

Die spielerische Schicht ist jetzt als zurückhaltende Discovery-Layer gedacht, nicht als lautes Gimmick-System.

- Zentrale Runtime: `components/EasterEggs.tsx`
- Zentrale Definitionen: `lib/achievements.ts`
- Sichtbare Oberfläche: kompakter Log-Button, Toast und Log-Menü
- Speicherung: lokal im Browser über `localStorage` und `sessionStorage`

## Konami-Code

Sequenz:

```text
↑ ↑ ↓ ↓ ← → ← → B A
```

Wirkung:

- schaltet den Eintrag `konami` / **Ueberlagerung** frei
- aktiviert für rund 14 Sekunden die Resonanzschicht
- blendet ein reduziertes Overlay mit Pulsringen, Glyphen und leichten globalen Akzenten ein
- öffnet beim ersten Fund automatisch das Entdeckungslog

## Weitere Trigger

- `AAA` öffnet das Log direkt und schaltet `Archivzugang` frei
- `klarheit` triggert `Signalwort`
- 4x Klick auf das Logo triggert `Zeichenstudie`
- längere Aufmerksamkeit, Scrolltiefe und Wiederkehr erzeugen Signal-Einträge
- Môra-Interaktionen erzeugen Depth-Einträge
- Nutzung der Command Palette erzeugt `Schnellzugang`

## Gestaltungsprinzip

- weniger Trophy-/Retro-Gamification und weniger Selbstinszenierung im Overlay
- neutralere, hochwertigere Begriffe
- echte Interaktion statt Zufall oder reine Sammelmechanik
- `prefers-reduced-motion` wird respektiert

## Relevante Dateien

- `components/EasterEggs.tsx`
- `components/AchievementButton.tsx`
- `components/AchievementMenu.tsx`
- `components/AchievementToast.tsx`
- `components/CommandPalette.tsx`
- `lib/achievements.ts`
