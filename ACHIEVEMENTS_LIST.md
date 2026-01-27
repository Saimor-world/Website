# SAIMÔR Achievements & Easter Eggs 🏆

Hier ist eine Übersicht aller verfügbaren Achievements im System, wie sie freigeschaltet werden und welche Geheimnisse dahinterstecken.

| Icon | Name (DE) | Beschreibung | Voraussetzung / Fundort | Geheim? |
| :--- | :--- | :--- | :--- | :--- |
| 🕹️ | **Retro-Gamer** | Der berühmte Konami-Code. | `↑ ↑ ↓ ↓ ← → ← → B A` auf der Tastatur eingeben. | Nein |
| 🕵️ | **Logo-Detektiv** | Genau hingeschaut. | Das Saimôr Logo 4x hintereinander anklicken. | Ja |
| 🧘 | **Geduldiger Betrachter** | Slow down. | 12 Sekunden in der Hero-Section verweilen, ohne zu scrollen. | Ja |
| 🗺️ | **Explorer** | Gründliche Erkundung. | Home, Trust und Legal Seiten nacheinander besuchen. | Ja |
| 📱 | **Shake It!** | Bewegung erkannt. | Das Mobilgerät schütteln (verwendet DeviceMotion API). | Ja |
| 🎯 | **Wortspiel** | Klarheit gefunden. | Das Wort "Klarheit" irgendwo auf der Seite tippen. | Ja |
| 🎤 | **Namensgeber** | Den Namen kennen. | Das Wort "Saimôr" (oder "Saimor") tippen. | Ja |
| 🔄 | **Change Agent** | Wandel verstehen. | Das Wort "Wandel" tippen. | Ja |
| 🎪 | **Tastenakrobat** | Geheimes Menü. | `AAA` auf der Tastatur tippen. | Ja |
| 🦉 | **Nachteule** | Späte Stunde. | Die Seite zwischen 00:00 und 06:00 Uhr besuchen. | Ja |
| 🐦 | **Früher Vogel** | Früher Besuch. | Die Seite zwischen 05:00 und 07:00 Uhr besuchen. | Ja |
| 🤝 | **Treuer Begleiter** | Lange Verweildauer. | Insgesamt 5 Minuten auf der Website verbringen. | Ja |
| 📖 | **Leseratte** | Alles gelesen. | Bis ganz nach unten scrollen (95% der Seite). | Ja |
| 🔭 | **Vielseitig** | Dashboard-Profi. | 3 verschiedene Ansichten im Môra-Dashboard ausprobieren. | Ja |
| 💨 | **Schnell-Leser** | High-Speed Konsum. | Die Seite extrem schnell "überfliegen" (schneller Scroll). | Ja |
| 🔄 | **Wiederholungstäter** | Welcome back. | Die Website ein zweites Mal besuchen (Cookie-basiert). | Ja |
| 🌟 | **Môra-Fan** | In die Zukunft blicken. | Die Môra Showcase-Seite besuchen. | Nein |
| 🌊 | **Tiefgang** | Abgetaucht. | Den "Deep View" Effekt im Môra Dashboard aktivieren. | Ja |
| 🧩 | **Muster-Experte** | Zusammenhänge sehen. | Mehrere verschiedene Metrik-Karten im Dashboard anklicken. | Ja |
| 🧐 | **Neugierig** | Tastenkürzel. | Die Command Palette öffnen. | Nein |
| 🎖️ | **Perfektionist** | Fast geschafft. | 75% aller anderen Achievements freigeschaltet. | Nein |
| 📞 | **Erster Kontakt** | Hallo sagen. | Das Kontaktformular erfolgreich absenden. | Nein |
| 🎥 | **Demo-Liebhaber** | Interesse zeigen. | Die allgemeine Demo-Seite besuchen. | Nein |
| 📋 | **Gründlich** | Dokumentations-Fan. | Die technische Dokumentation/Masterbibel aufrufen. | Ja |
| 🌐 | **Netzwerker** | Alles gesehen. | Mindestens 5 verschiedene Unterseiten besuchen. | Ja |
| 🧠 | **Strategisch** | Tiefer Denker. | Länger als 3 Minuten in Môra aktiv sein. | Ja |
| 👑 | **Meisterspieler** | Der Gipfel. | ALLE anderen Achievements freigeschaltet. | Ja |

## Technische Implementierung
Die Achievements werden im `localStorage` unter dem Key `saimor-achievements` gespeichert. Der `AchievementManager` in `lib/achievements.ts` verwaltet das Freischalten und die Benachrichtigungen.

Viel Erfolg beim Sammeln! 🚀
