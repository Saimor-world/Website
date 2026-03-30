# SAIMOR Discovery Log

Die spielerische Ebene ist kein klassisches Achievement-Brett mehr, sondern ein kuratiertes Entdeckungslog: weniger Gimmick, mehr beobachtete Interaktion.

| Kategorie | Zeichen | Eintrag | Auslöser | Verborgen |
| :--- | :--- | :--- | :--- | :--- |
| `Hidden` | `◈` | **Override** | Konami-Code eingeben. Aktiviert für kurze Zeit die Resonanzschicht und öffnet beim ersten Fund automatisch das Log. | Nein |
| `Hidden` | `◌` | **Mark Study** | Das Logo viermal schnell hintereinander anklicken. | Ja |
| `Signal` | `◐` | **Stillness** | Rund 12 Sekunden in der Hero-Section verweilen. | Ja |
| `Path` | `△` | **Orientation** | Home, Trust und Legal besuchen. | Ja |
| `Hidden` | `∴` | **Signal Phrase** | `klarheit` auf der Seite tippen, ohne in ein Feld zu schreiben. | Ja |
| `Hidden` | `⋄` | **Archive Access** | `AAA` eingeben und das Log direkt öffnen. | Ja |
| `Signal` | `↧` | **Full Pass** | Etwa 95% der Seite scrollen. | Ja |
| `Depth` | `◫` | **Multi-View** | Im Môra-Dashboard alle drei View-Modi nutzen. | Ja |
| `Signal` | `↺` | **Re-entry** | Die Website erneut besuchen. | Ja |
| `Depth` | `◎` | **Semantic Layer** | Môra öffnen. | Nein |
| `Depth` | `⊙` | **Detail Layer** | In Môra eine tiefe Ansicht bzw. Detailansicht öffnen. | Ja |
| `Depth` | `◬` | **Pattern Map** | Mehrere unterschiedliche Môra-Karten erkunden. | Ja |
| `Path` | `⌘` | **Command Access** | Die Command Palette nutzen. | Nein |
| `Path` | `↗` | **Open Channel** | Kontaktformular erfolgreich absenden. | Nein |
| `Path` | `□` | **Live Preview** | Die Demo-Seite besuchen. | Nein |
| `Path` | `▣` | **Reference Check** | Die Dokumentation besuchen. | Ja |

## Prinzip

- Weniger Gamification, mehr Discovery-Log
- Namen und Texte bewusst neutraler, systemischer und markenkompatibler
- Konami ist jetzt ein echter temporärer Modus statt nur ein kurzer Effekt

## Technische Hinweise

- Speicherung: `localStorage` unter `saimor-achievements`
- Zentrale Definitionen: `lib/achievements.ts`
- Trigger, Resonanzmodus und UI-Feedback: `components/EasterEggs.tsx`
- Visuelle Oberfläche des Logs: `components/AchievementButton.tsx`, `components/AchievementMenu.tsx`, `components/AchievementToast.tsx`
