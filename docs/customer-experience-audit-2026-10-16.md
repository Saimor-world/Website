# SAIMÔR Website — kritische Kundensicht (16.10.2026)

Status: **heuristisches Code-, Text- und Navigationsreview**, keine Nutzerinterviews und **keine visuelle Freigabe** für iPhone/Browser. Bewertet wurde der Branch `design/home-light-journey-20261016`. Diese Datei dokumentiert sowohl bereits im Draft ausgeführte Entscheidungen als auch Punkte, für die eine reale Quelle, Produktfreigabe oder visueller Test nötig ist.

## Grundsatz

Die kosmisch-natürliche Ästhetik ist ein Markenzeichen. Sie darf aber nicht verlangen, dass jede Interessentin das Portal versteht, bevor sie den praktischen Nutzen erkennt. Deshalb führen **die primäre Hero-Aktion und die Navigation unmittelbar zu den Produkten**, während der Wald eine freiwillig entdeckbare Marken-Erfahrung bleibt.

### A. Inhaber/in eines kleinen Unternehmens (5–50 Personen)
**Was wird gesucht?** Weniger verlorene Informationen zwischen E-Mail, Kalender, Dateien und Aufgaben. Ein Anfang ohne Enterprise-Projekt.

**Kritische Befunde:**
- **Hoch · erledigt im Draft:** Der bisherige Haupt-CTA `#system` landete in einer geheimnisvollen Waldszene statt in einem konkret bewertbaren Angebot. Jetzt `Produkte entdecken` → `#products`.
- **Hoch · erledigt im Draft:** Die Waldszene enthielt vier Erklärungskarten und führte anschließend in *noch einmal* denselben Erklärungsraum. Sie ist jetzt ein Teaser; das eigentliche MÔRA-Angebot steht auf `/mora`.
- **Mittel · offen:** Ein konkreter, öffentlich belegbarer End-to-End-Fall mit Vorher/Nachher oder gemessener Entlastung fehlt. Keine Referenz, Zahl, ROI-Prognose oder Kundengeschichte erfinden. Erst nach Freigabe und Nachweis ergänzen.
- **Mittel · offen:** `/de/kontakt` startet sinnvoll mit E-Mail und einem dreistufigen Vorgehen; es fehlt noch die Messung, wie viele Besucher den Kontaktweg tatsächlich nutzen. `mailto:` kann ohne lokales Mailprogramm stocken; vor einem alternativen Formular Datenschutz und Zustellung klären.

### B. Selbstständige Creator, Coaches und kleine Creator-Teams
**Was wird gesucht?** Ein gut geführter Kunden-/Content-Alltag, ohne das bisherige Kalender-, Community- und Zahlungsökosystem auszutauschen.

**Kritische Befunde:**
- **Hoch · erledigt im Draft:** YORI war im Header nicht als eigener Pfad sichtbar. Jetzt führt Desktop- und Mobilnavigation direkt zu `/yori` bzw. `/en/yori`; die Startseite besitzt außerdem die eigenständige YORI-Produktwelt.
- **Hoch · bewusst zurückgestellt:** `/yori` ist derzeit `noindex` und zeigt einen Pilot-/Vorschaustand. Nicht ohne Freigabe als voll verfügbares Live-Kundenprodukt, allgemeine Buchungsplattform oder reale Integrationsabdeckung ausgeben. Der bereits geteilte Pilotzugang wird nicht verändert.
- **Mittel · offen:** Die Raumdarstellung wirkt stark, aber die öffentliche Seite muss künftig explizit zwischen Demo, freigegebenem Pilot und echter Calendly-/Skool-/Zahlungsquelle unterscheiden. Keine Nutzerzahlen und keine Pilotergebnisse behaupten.

### C. Weiterbildungs-/Teamleitung und Workshop-Einkauf
**Was wird gesucht?** Praktische KI-Kompetenz, klare Zielgruppen und konkrete Formate, nicht ein Software-Abo.

**Kritische Befunde:**
- **Hoch · bereits behoben:** `Studio` führte ursprünglich nur zurück in einen Startseitenanker. Es gibt jetzt `/studio` und `/en/studio` mit Beratung, Workshops und Umsetzung, Anwendungsfällen, möglichen Ergebnissen und kontaktfähigen CTAs.
- **Mittel · erledigt im Draft:** Die Startseite und das Menü verlinken das Studio direkt; Nutzer müssen die Wald-Tür nicht entdecken.
- **Mittel · offen:** Für tatsächliche Buchungsentscheidungen fehlen publizierbare Eckdaten zu Teamgröße, Präsenz/Remote, Dauer, Sprache, Vorbereitung und grobem Ablauf. Diese Daten erst mit realem Angebotsrahmen bestätigen; nicht künstlich mit Standardpreisen und Liefergarantien füllen.

### D. IT-/Operations-Verantwortliche und skeptische Entscheider
**Was wird gesucht?** Reale Produktreife, Datengrenzen, nachvollziehbare Quellen, Freigaben, Sicherheit, sowie eine risikoarme Erprobung.

**Kritische Befunde:**
- **Hoch · positiv:** Der MÔRA-Produktbereich und die Signaldemo unterscheiden Datenquellen, Demo und Freigaben. Die Website sollte diese Ehrlichkeit beibehalten, nicht durch Marketingtexte verwässern.
- **Hoch · offen:** Nachprüfbare Security-/Datenschutz-Details, Status der Connectoren und ein öffentlich verifizierbares Fallbeispiel sind noch nicht auf einer einzigen klaren Käuferseite zusammengeführt. Vor Claims über DSGVO, Zertifikate, Live-Integrationen oder autonomes Handeln Belege prüfen.
- **Mittel · offen:** Die Wege `/de/einstieg/security-check` und `/en/entry/security-check` sind funktional **nicht identisch**: Deutsch rendert `ScanPage`, Englisch `EntryArticle` plus `EntryActionPanel`. Beides zeigt Prüfpfade, aber eine andere Ersterfahrung. Erst Backend-/UX-Parität prüfen, dann vereinheitlichen; nicht ohne Analyse kritische Scan-Flows ersetzen.
- **Mittel · offen:** Claims wie „proaktiv“, „Aktionen“ oder „Arbeit mit Kontext“ müssen an belegte Fähigkeiten und tatsächliche Quellen geknüpft sein. `Demo` nicht wie einen verbundenen Kundentenant behandeln.

## Design-/Qualitätsrisiken (alle Segmente)

1. **Bildschärfe — offenes Asset-Problem:** Das reale Waldportal-WebP (`public/images/saimor-forest-threshold.webp`) ist **1774 × 887 Pixel**. In einer vollflächigen Retina-iPhone-Ansicht reicht die Pixelzahl insbesondere in der Höhe nicht für native 2x–3x-Darstellung. Deshalb wurde der frühere `scale(2.24)`- und `blur(13px)`-Cinematic-Effekt entfernt; v18 nutzt nur einen sehr moderaten Zoom ohne Unschärfefilter. Das vermeidet zusätzliche künstliche Weichzeichnung, ersetzt aber **keine hochwertige größere Quelle**.
2. **Weniger Dopplung — erledigt im Draft:** Portal-Karten und zweite erklärende Modalphase entfernt. Eine mystische Szene, ein kurzer Satz und ein optionaler Produktweg.
3. **Discoverability — erledigt im Draft:** Header-Einstieg heißt jetzt „Produkte“; YORI ist sichtbar; Studio führt zu einer eigenständigen Seite; Hero-CTA leitet zur Produktübersicht.
4. **Visuelle Abnahme — zwingend offen:** Screenshots/Touch-Test bei 375, 390, 430 px sowie Desktop, iPhone-Safari, `prefers-reduced-motion`, Tastaturfokus, Scroll-/Touch-Verhalten, Sprache und Consent. Ein grüner CI-Build beweist kein gutes Layout.
5. **Lieferfreigabe — offen:** Keine Zusammenführung des Draft-PRs und keine Produktion vor Abnahme. Den YORI-Luana-Pilot nicht verändern.

## Reihenfolge vor dem Merge

1. CI und Vercel-Preview der v18.
2. Optische Einzelabnahme von Hero → Wald → Portal → Übergang → Produktwelten → Studio → Kontakt auf echtem iPhone und Desktop.
3. Reale Produkt-/Daten-Claims im Käuferpfad mit nachprüfbaren Belegen abgleichen.
4. Erst dann über Merge und Produktionsdeploy entscheiden.

## Work review for #84 — concrete follow-up

| Customer | Observed friction | Change / verification |
|---|---|---|
| Owner-managed business | Footer “Studio” returned to the home chapter; product maturity was easy to miss. | Dedicated Studio link, explicit MÔRA/OS product-preview label, stronger product-details contrast. Browser journey covers products → Studio → contact. |
| Creator / coach | Scenic entrance competed with explanatory cards; the real pilot must remain stable. | One photographic doorway, one cinematic destination. YORI is labelled pilot in the public gallery; pilot route/assets/repository are untouched. Both YORI public routes are read-only QA targets. |
| Team / workshop buyer | Contact locale switch could lead to a nonexistent route; menu keyboard exit was absent. | Exact contact locale pairs; Escape, focus cycle, resize cleanup; workshop CTA verified through the contact mailto destination without sending mail. |
| IT / operations | Website health was presented as system availability; demo failure disappeared into console; DE/EN check differed. | Website health labelled narrowly; visible localized demo failure; shared scanner and localized static UI. No claim that all external connectors or backend-generated reports are translated. |

The new artistic Reality Check does not assert real-time checking, AI incident monitoring, or established customer outcomes. No invented testimonials, integration states, packages, prices or quantified ROI are added. Physical iPhone Safari and a reference/impact case remain separate evidence gaps until actually available.
