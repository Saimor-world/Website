# SAIMÔR: ein Arbeitsraum für den ganzen Betrieb

Produktentscheidung aus Marius' Auftrag vom 12. September 2026. Dies ist die
Umsetzungsgrundlage für OS/YORI, keine Behauptung bereits verfügbarer Integrationen.

## Ein Vorgang ist die Verbindung

Die zentrale Einheit ist ein Vorgang, nicht eine App: Kunde → Anfrage → Termin
oder Auftrag → zugehörige Dateien und Aufgaben → Rechnung → Zahlung → Nacharbeit.
Im Café verbindet derselbe Ansatz Lieferant, Bestellung, Lieferung, Beleg und Zahlung.
Im Studio verbindet er Buchung, Dienstleistung, Kundeneinwilligung und Rechnung.
Die Website erklärt zunächst den gemeinsamen Arbeitsraum, ohne Branchenjargon.

## Ein Datenmodell, zwei Ansichten

- **Fokus:** ruhige Typografie, warme helle Flächen, klare Navigation, Tagesübersicht.
- **Immersiv:** räumlicher Kontext, grün-goldene Tiefe, sichtbare Beziehungen, MÔRA.
- Beide verwenden dieselben IDs, Berechtigungen, Suchergebnisse und Aktionen.
  Ansicht wechseln verändert weder Daten noch Freigaben. Beide sind vollständig
  per Tastatur bedienbar und beachten reduzierte Bewegung.
- YORI verwendet später dieselben Kontext- und Integrationsverträge. Keine Kopie
  einer zweiten Kunden-, Zahlungs- oder Dokumentdatenbank.

## Priorität der echten Anbindungen

| Reihenfolge | Bereich | Primäres Objekt | Erster nachweisbarer Ablauf |
| --- | --- | --- | --- |
| 1 | Dateien + E-Mail + Kalender | Dokument, Kontakt, Termin | Echte Anfrage mit Datei einem Termin/Vorgang zuordnen |
| 2 | Aufgaben + Kunden | Vorgang, Aufgabe, Kontakt | Aus der Anfrage eine Aufgabe mit Verantwortlichkeit und Frist vorbereiten |
| 3 | Rechnungen + Bankdaten | Rechnung, Zahlung, Konto | Rechnung und eingegangene Zahlung nachvollziehbar zuordnen |
| 4 | Terminbuchung/Kasse je Betrieb | Buchung, Verkauf, Beleg | Bestehende Fachsoftware anbinden, Quelldaten erhalten |
| 5 | Waren/Lieferanten | Bestellung, Lieferung, Lieferant | Offene Lieferung und zugehörige Rechnung zusammen anzeigen |
| separat | XRP Capital/NFT | Wallet, Position, Transaktion | Verifizierte Ledgerdaten und ausdrückliche Nutzer-Signatur |

Konkrete Anbieter werden anhand tatsächlich verwendeter Konten und vorhandener
APIs gewählt. Keine neuen Abonnements, bevor eine überprüfbare Integrationslücke
feststeht. Bankdaten beginnen lesend; Zahlungen bleiben ausdrücklich freizugebende Aktionen.

## Vertrag für jeden Connector

Jeder importierte Datensatz hat tenant_id, source_connection_id, source_object_id,
source_updated_at, fetched_at und nachvollziehbare Herkunft. Eindeutigkeit über
Quelle + Objekt-ID verhindert doppelte Importe; Webhooks müssen wiederholbar sein.

Jede Verbindung zeigt Zustand (nicht verbunden / verbunden / verzögert / Fehler),
letzten erfolgreichen Abruf, freigegebene Bereiche und Widerrufsmöglichkeit.
Nicht abrufbare Werte sind unbekannt, niemals null Euro oder erfundene Ergebnisse.
OAuth-Zugangsdaten bleiben serverseitig. Rechte gelten auch für Suche und KI.
Änderungen benötigen Auditspur, Konfliktbehandlung und möglichst Rücknahme.

MÔRA schlägt aus belegbarem Kontext nächste Schritte vor. Jede Empfehlung verlinkt
ihre Quellen. Schreiben, Senden, Buchen und Bezahlen haben eigene Aktionsfreigaben;
ein erfolgreicher API-Aufruf allein ist noch kein bestätigtes Geschäftsergebnis.

## Blockchain

Keine Kunden-, Personal-, Termin- oder Rechnungsdaten auf eine öffentliche Chain.
Blockchain ist eine optionale Verbindung für tatsächliche Wallet-/NFT-Vorgänge;
sie ist keine Voraussetzung für Kontext, Datenhaltung oder Vertrauen im OS.

## Nächster OS-Abnahmetest

Mit einem echten freigegebenen Testvorgang eine Datei und einen Termin importieren,
eine Aufgabe zuordnen, zwischen Fokus/Immersiv wechseln und denselben Stand sehen.
Verbindung unterbrechen: Herkunft und letzter Stand bleiben sichtbar, der Fehler
wird angezeigt. Verbindung widerrufen: weitere Abrufe und KI-Zugriffe enden.
Erst danach Rechnung/Zahlung ergänzen. Das ist der erste durchgängige Betriebsablauf.

## Website-Stand dieser Änderung

Hero und Schwellen-Szene wurden neu gestaltet. Der eingebettete Signalabruf benutzt
den bestehenden öffentlichen `/api/mora/pulse`-Endpunkt, zeigt Quellenlinks und
Fehlerzustände. Er ist eine öffentliche Signalansicht, keine Analyse einer Firma
und kein Nachweis der oben geplanten OS-Integrationen. Der vorhandene generische
OS-Demostart enthält einen Beispiel-Score; er wird hier nicht als Echtanalyse beworben.
