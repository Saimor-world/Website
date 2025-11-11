# DATA_FLOW_EXPLAINED

## Überblick
- **Phase:** MVP / Demo – alle Abläufe laufen mit simulierten Unternehmensdaten (Mock KPIs, fiktive Events), damit Môra OS end-to-end gezeigt werden kann, ohne produktive Kundendaten zu berühren.
- **Datenhoheit:** Alles bleibt lokal in der Saimôr-Umgebung. Keine externen Clouds, keine Synchronisation mit Produktivsystemen.

## Flow (Mock → Adapter → Core → UI → Website)
```
[Mock Company Streams] --(Simulierte KPIs & Events)--> [Adapter Layer]
      (grau)                                          (gelb)
                           --sanitisierte Payloads--> [Core API (Môra OS)] --Realtime KPIs--> [Môra UI Widgets] --> [Website Sections]
                                                         (grün)                                  (grün)               (grün)
```

1. **Mock Company Streams (grau)**  
   - Generierte Datensätze (Voice Calls, Kosten, Klarheitsindex) spiegeln typische Organisationsflüsse.  
   - Keine Verbindung zu realen Kundensystemen; Seeds werden lokal gepflegt.

2. **Adapter Layer (gelb)**  
   - Transformiert die Mock-Daten in das gleiche Schema, das später echte Integrationen nutzen werden.  
   - Stellt sicher, dass Validation, Rate Limits und Event-Trigger bereits getestet werden können.

3. **Core API / Môra OS (grün)**  
   - Endpunkte laut `CORE_MASTER.md` (z. B. `/api/dashboard/stats/overview`, `/v1/actions/execute`).  
   - Läuft mit denselben Auth-, Logging- und Audit-Hooks wie in Produktion geplant, nur dass Inputs aus dem Adapter kommen.

4. **Môra UI Widgets (grün)**  
   - Komponenten wie DataDashboard, ScrollProgress, MoraAvatar lesen ausschließlich aus der Core-API (Demo-Modus).  
   - Kein direkter Zugriff auf Mock-Daten – die UI testet die echte Schnittstelle.

5. **Website Sections (grün)**  
   - Startseite/Tech/About zeigen die Core-Werte, kennzeichnen sie als Simulation und verhindern Missverständnisse über Live-Status.

## Kommunikation
- Website-Kopiervorlage: „Saimôr verarbeitet aktuell ausschließlich simulierte Datenflüsse. Keine echten Unternehmensdaten, keine externen Clouds – Ziel ist es, Prozesse souverän zu demonstrieren.“
- Status-Badges behalten den Hinweis „MVP / Demo-Phase“.  
- Bei Visualisierungen Mock-Quellen in **grau/gelb** darstellen, produktionsnahe Teile in **grün**.

## Nächste Schritte
- Optionales Diagramm (SVG/GIF) in `public/assets/info/` ablegen, das die obige Kette animiert.  
- Sobald echte Kundendaten angebunden werden, muss dieses Dokument aktualisiert werden (Quelle + Freigabe notwendig).
