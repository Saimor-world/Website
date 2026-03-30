# SAIMOR Achievements

Die spielerische Ebene ist bewusst reduziert: weniger Zufall, mehr echte Entdeckung.

| Icon | Name | Beschreibung | Auslöser | Geheim? |
| :--- | :--- | :--- | :--- | :--- |
| 🕹️ | **Retro-Gamer** | Der klassische Konami-Code. | `↑ ↑ ↓ ↓ ← → ← → B A` eingeben. | Nein |
| 🕵️ | **Logo-Detektiv** | Genau hingeschaut. | Das Logo viermal schnell hintereinander anklicken. | Ja |
| 🧘 | **Geduldiger Betrachter** | Aufmerksamkeit statt Hektik. | Rund 12 Sekunden in der Hero-Section verweilen. | Ja |
| 🗺️ | **Explorer** | Die Grundlagen ernst nehmen. | Home, Trust und Legal besuchen. | Ja |
| 🎯 | **Wortspiel** | Klarheit gefunden. | `klarheit` auf der Seite tippen, ohne in ein Feld zu schreiben. | Ja |
| 🎪 | **Tastenakrobat** | Das versteckte Archiv öffnen. | `AAA` eingeben. | Ja |
| 📖 | **Leseratte** | Fast bis ganz nach unten gelesen. | Etwa 95% der Seite scrollen. | Ja |
| 🔁 | **Wiederholungstäter** | Willkommen zurück. | Die Website erneut besuchen. | Ja |
| 🌟 | **Môra-Fan** | Môra entdeckt. | Die Môra-Seite besuchen. | Nein |
| 🌊 | **Tiefgang** | Die Detailansicht öffnen. | In Môra eine Metrik bzw. tiefe Ansicht anwählen. | Ja |
| 🧩 | **Muster-Experte** | Zusammenhänge erkennen. | Mehrere unterschiedliche Dashboard-Karten erkunden. | Ja |
| 🧐 | **Neugierig** | Versteckte Navigation gefunden. | Die Command Palette nutzen. | Nein |
| 🔭 | **Vielseitig** | Alle Perspektiven geprüft. | Im Môra-Dashboard alle drei View-Modi nutzen. | Ja |
| 📞 | **Erster Kontakt** | Das Gespräch gestartet. | Kontaktformular erfolgreich absenden. | Nein |
| 🎥 | **Demo-Liebhaber** | Mehr sehen wollen. | Die Demo-Seite besuchen. | Nein |
| 📋 | **Gründlich** | Details zählen. | Die Dokumentation besuchen. | Ja |

## Technische Hinweise

- Speicherung: `localStorage` unter `saimor-achievements`
- Zentrale Logik: `lib/achievements.ts`
- Trigger und UI: `components/EasterEggs.tsx`

Bewusst gestrichen wurden rein zufällige oder zu verspielte Trigger wie Uhrzeit-, Shake- oder Speed-Read-Achievements.
