# SAIMOR Discovery Log

Die spielerische Ebene ist kein klassisches Achievement-Brett mehr, sondern ein kuratiertes Entdeckungslog: weniger Gimmick, mehr beobachtete Interaktion.

| Kategorie | Zeichen | Eintrag | Auslöser | Verborgen |
| :--- | :--- | :--- | :--- | :--- |
| `Hidden` | `◈` | **Ueberlagerung** | Konami-Code eingeben. Aktiviert kurz die Resonanzschicht und öffnet beim ersten Fund automatisch das Log. | Nein |
| `Hidden` | `◌` | **Zeichenstudie** | Das Logo viermal schnell hintereinander anklicken. | Ja |
| `Signal` | `◐` | **Stille** | Rund 12 Sekunden in der Hero-Section verweilen. | Ja |
| `Path` | `△` | **Orientierung** | Home, Trust und Legal besuchen. | Ja |
| `Hidden` | `∴` | **Signalwort** | `klarheit` auf der Seite tippen, ohne in ein Feld zu schreiben. | Ja |
| `Hidden` | `⋄` | **Archivzugang** | `AAA` eingeben und das Log direkt öffnen. | Ja |
| `Signal` | `↧` | **Durchgang** | Etwa 95% der Seite scrollen. | Ja |
| `Depth` | `◫` | **Mehrfachansicht** | Im Môra-Dashboard alle drei View-Modi nutzen. | Ja |
| `Signal` | `↺` | **Wiederkehr** | Die Website erneut besuchen. | Ja |
| `Depth` | `◎` | **Semantische Ebene** | Môra öffnen. | Nein |
| `Depth` | `⊙` | **Tiefenansicht** | In Môra eine tiefe Ansicht bzw. Detailansicht öffnen. | Ja |
| `Depth` | `◬` | **Musterkarte** | Mehrere unterschiedliche Môra-Karten erkunden. | Ja |
| `Path` | `⌘` | **Schnellzugang** | Die Command Palette nutzen. | Nein |
| `Path` | `↗` | **Offener Kanal** | Kontaktformular erfolgreich absenden. | Nein |
| `Path` | `□` | **Vorschau** | Die Demo-Seite besuchen. | Nein |
| `Path` | `▣` | **Referenz** | Die Dokumentation besuchen. | Ja |

## Prinzip

- Weniger Gamification, mehr Discovery-Log
- Namen und Texte bewusst neutraler, systemischer und markenkompatibler
- Konami ist jetzt ein echter temporärer Modus, aber visuell kontrollierter

## Technische Hinweise

- Speicherung: `localStorage` unter `saimor-achievements`
- Zentrale Definitionen: `lib/achievements.ts`
- Trigger, Resonanzmodus und UI-Feedback: `components/EasterEggs.tsx`
- Visuelle Oberfläche des Logs: `components/AchievementButton.tsx`, `components/AchievementMenu.tsx`, `components/AchievementToast.tsx`
