# SAIMOR Discovery Layer

## Überblick

Die spielerische Schicht ist jetzt als zurückhaltende Discovery-Layer gedacht, nicht als lautes Gimmick-System.

- Zentrale Runtime: `components/EasterEggs.tsx`
- Zentrale Definitionen: `lib/achievements.ts`
- Sichtbare Oberfläche: Discovery-Button, Toast und Log-Menü
- Speicherung: lokal im Browser über `localStorage` und `sessionStorage`

## Konami-Code

Sequenz:

```text
↑ ↑ ↓ ↓ ← → ← → B A
```

Wirkung:

- schaltet den Eintrag `konami` / **Override** frei
- aktiviert für rund 14 Sekunden die Resonanzschicht
- blendet HUD, Pulsringe, Glyphen und globale Hover-/Selection-Akzente ein
- öffnet beim ersten Fund automatisch das Entdeckungslog

## Weitere Trigger

- `AAA` öffnet das Log direkt und schaltet `Archive Access` frei
- `klarheit` triggert `Signal Phrase`
- 4x Klick auf das Logo triggert `Mark Study`
- längere Aufmerksamkeit, Scrolltiefe und Wiederkehr erzeugen Signal-Einträge
- Môra-Interaktionen erzeugen Depth-Einträge
- Nutzung der Command Palette erzeugt `Command Access`

## Gestaltungsprinzip

- weniger Trophy-/Retro-Gamification
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
