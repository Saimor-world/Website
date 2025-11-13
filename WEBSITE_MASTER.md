# WEBSITE_MASTER

## Purpose & Scope
- Legt fest, welche Inhalte die öffentliche Website (saimor.world) transportiert.
- Fokussiert auf Môra OS als MVP: Next.js Website, angebundene Core-APIs, UI-Demos, Early-Access-Warteliste.
- Dient als Referenz für neue Seiteninhalte und verhindert Abweichungen von CORE_MASTER.md, UI_MASTER.md und dem übergeordneten Single-Source-Dossier.

## Zielgruppen
1. CEO & Team – brauchen einen konsistenten Überblick für Kommunikation und interne Prioritäten.
2. Förderstellen & Partner – erwarten prüfbare Aussagen zu Technologie-Stand, Datenschutz, gesellschaftlichem Nutzen.
3. Pilotkund:innen & Interessent:innen – möchten verstehen, was heute nutzbar ist (Orbit/Pulse/Môra Demo, Early-Access).

## IST (MVP, heute verfügbar)
- **Core** (lt. CORE_MASTER.md): stabile API-Schicht mit KPI-Feeds (Klarheitsindex, Voice Calls, Kosten), Voice-Line + Chat-Endpunkte, Learning-Brain Review-Queue, n8n Webhook-Anbindung. Voice/Chat laufen über produktive Endpunkte mit Logging, jedoch ausschließlich für Pilot:innen.
- **UI** (lt. UI_MASTER.md): Next.js 14 App Router, DE/EN via next-intl, responsive Sections, MoraAvatar, Scroll Progress, Trust/Community Sections, Warteliste-Formular mit n8n-Handoff. Demo-ready, aber bewusst als MVP gekennzeichnet.
- **Voice & Automation**: Telefon-Entry über Twilio-Nummer, n8n-Workflows für Waitlist und Chatbot-Lichtgespräch; alle Interaktionen auditierbar, EU-Hosting (n8n, API, Matomo).
- **Datenbasis (Simulation)**: Alle aktuell sichtbaren Flüsse basieren auf lokal generierten Demo-Datasets, die reale Unternehmensabläufe imitieren (Mock KPIs, Adapter-Inputs). Es werden keinerlei Kundendaten verarbeitet; keine externen Clouds angebunden. Adapter Layer + Core API laufen in der MVP-Umgebung, um die End-to-End Experience transparent zu zeigen.
- **Website Content Status**: Fokus auf Orbit/Pulse/Môra (Systems wird als Backend-Funktion erklärt, kein vollwertiger Produkt-Track). Transparente Status-Badges („Backend 85 %“, „Frontend 70 %“) bleiben Pflicht bis neue Zahlen vorliegen.
- **Môra-Demo-Sektion**: Die Startseite bündelt Chat-Interface und Dashboard-Grid jetzt in einer einheitlichen `MoraDashboard`-Section (Header mit Demo-Badge, Chat oben, Folder↔Field Ansicht unten, Orb-Verbindung sichtbar). Die früheren Einzelkomponenten `MoraShowcase` und `InteractiveMoraDashboard` existieren nur noch als `.old`-Referenzen bis zur Archivierung.
- **UI Feature Highlights**: ScrollProgress (animierte Daten-Progress-Bar am Seitenkopf), DataDashboard Preview (4 KPIs mit Counter/Trend-Animationen), JungleElements Overlay (Hero-Lianen + Partikel) und KonamiCode Easter Egg sind live, genauso wie das LiveChat Dual-Mode Setup mit optionalem Hetzner-Agent (`NEXT_PUBLIC_HETZNER_AGENT_URL`). Alle Effekte bleiben opt-in per dynamic imports, Reduced-Motion wird respektiert.

## PLAN / VISION (geplant, nicht live)
- **Môra Disney Intro & Orb Narrative**: cinematic first-visit Animation mit Orbs, Daten-Lianen, Avatar-Relocation (siehe MORA_DISNEY_INTRO_PLAN.md). Erst einsetzen, wenn Performance + Skip-Funktion abgestimmt sind.
- **Clarity Loop & MCP Mesh**: Erweiterte Darstellung der Mensch↔Môra-Kollaboration, inklusive lokalen LLM-Knoten, Offline-MCP-Bridges, Adaptive Orbits. Informationen ausschließlich aus dem Single-Source-Dossier ableiten.
- **Regionale Infrastruktur & Local LLMs**: Zukunftsplanung für souveräne Deployments (Edge Nodes, On-Prem n8n, lokale Sprachmodelle). Bis zur Umsetzung klar als „Vision“ labeln.
- **Produkt-Landings**: Dedizierte Seiten für Tech/Architecture und Use Cases erst schreiben, wenn Messwerte + Referenzen aus CORE/UI abgesichert sind.
- **Community Launch Kampagne**: Dreiphasiger Social-Rollout (Ankündigung, Behind-the-Scenes, Early-Supporter Spotlight) inklusive Early-Supporter-Benefits (Beta-Vorabzugang, Lifetime-Rabatt, Feature-Voting), transparenzgetriebener Copy (Backend 85 %, Frontend 70 %, DSGVO-Hinweise) und geplanter E-Mail-Sequenz. Aktivieren, sobald CEO/Comms grünes Licht geben und Wartelisten-Automation stabil ist; Posting-Cadence (LinkedIn 09 Uhr, Twitter 12 Uhr, Instagram 18 Uhr) bleibt Referenz.

## Roadmap (WEB-01 Snapshot)
- **Ziel**: WEB-01 R1 liefert Guided-Mode Frontend inkl. Action Panel + Tests (AT-03/AT-09) auf Basis eines separaten `/web/` Next.js-App-Routers. Gesamtaufwand 7–9 h laut MASTER_PLAN.md.
- **Milestone 1**: Production-Fixes + n8n Webhook Klärung (React Hydration, NextAuth Env-Variablen, SVG Fix) – abgeschlossen bis auf NEXTAUTH_SECRET (Warten auf CEO).
- **Milestone 2**: Projekt-Setup (Ordner `/web/`, App Router Grundlayout, GuidedMode Skeleton, API/lib/session Utilities). Status: geplant, Start sobald Phase 1 abgeschlossen.
- **Milestone 3**: Features umsetzen – Guided-Mode Dreischritt (Zeitraum wählen, KPI Snapshot, verschlüsselter XLSX), Action Panel Trigger (analyze_costs, generate_dashboard, report), Session Resume (Cross-Channel), Tests für Guided Flow und Resume.
- **Abhängigkeiten**: CORE API (`/v1/actions/execute`, `/v1/session/{id}`), sichere Session-IDs, PIN-Handling, sowie NextAuth/n8n Konfiguration auf Vercel. Launch kommunizieren erst nach erfolgreichem QA.

## Page Map (Vorschlag)
1. **Startseite**  
   - Hero mit klares Value Statement („Klarheit im Wandel“), Status-Badge, primäre CTA (Early Access).  
   - Kurzüberblick Orbit/Pulse/Môra inkl. Transparenz-Box (Backend/UI Status).  
   - Community & Warteliste-Callout mit klarer DSGVO-Hinweisführung.
2. **Produkt / Wege**  
   - Orbit, Pulse, Môra (Systems-Funktionen werden hier als Teil der OS-Dienste erklärt).  
   - Für jeden Weg: Ergebnisversprechen, Rhythmus, aktueller MVP-Funktionsumfang, „Pilotfähig heute“ Hinweis.  
   - Zukünftige Module (Orbs, Clarity Loop) nur unter „Vision“ Subsection.
3. **Tech & Architecture**  
   - High-level Stack (Next.js, Core APIs, n8n, Voice, Matomo).  
   - Sicherheits- und Hosting-Setup (EU, CSP, Logging) inklusive klarer Aussage: Demo-Phase mit simulierten Daten, keinerlei externe Kundendaten.  
   - Schnittstellenübersicht mit Verweis auf CORE_MASTER.md für Details.
4. **Use Cases**  
   - Kommunen, Organisationen, Bildung (aus bestehenden Referenzen).  
   - Für jeden Case: Problem heute, MVP-Fähigkeit, Beispiel wie Orbit/Pulse oder Demo eingesetzt wird.  
   - Vision-Block für spätere Clarity Loop / MCP Mesh Szenarien.
5. **About / Team**  
   - Mission, Werte („Klar statt komplex“, „Datensouveränität“) plus Hinweis: „Saimôr verarbeitet in der aktuellen MVP-Phase ausschließlich simulierte Datenflüsse – lokale Datenhoheit, keine externen Clouds.“  
   - Kurzprofil Team/Partner, Kontaktwege (Cal.com, Formular, Voice-Pilot).  
   - Verweis auf Förder-Story oder Single-Source-Dossier ohne Details zu duplizieren.
6. **Legal & Trust**  
   - Datenschutz, Impressum, Sicherheitsleitlinien (aus docs/security.md).  
   - Offenlegung Auditierbarkeit, Warteliste-Verarbeitung, Matomo-Konfiguration.
7. **Updates / Blog (optional)**  
   - Build-in-public Updates, Status Logs (z. B. STATUS_UPDATE_*).  
   - Nur veröffentlichen, wenn Inhalte auf MVP-Realität basieren; Roadmap-Teile in Vision markieren.

## Messaging Guardrails
- „MVP, pilotfähig, transparent, auditierbar“ ist Kernbotschaft; keine Claims wie „Production-ready AI Cloud“ oder „vollautonomes OS“.
- IMMER klarstellen, was heute nutzbar ist (Orbit/Pulse Begleitung, Môra Demo, Early-Access Voice/Chat) vs. was in Arbeit ist (Clarity Loop, MCP Mesh, Orbs).
- Datensouveränität betonen: EU-Hosting, DSGVO-Guardrails, kein Shadow-Profiling. Keine globalen Cloud-Versprechen ohne Absicherung.
- Nutzen-Statements auf Ergebnisse stützen („Klarheit statt Komplexität“, „Begleitung statt Hype“) – keine übertriebenen ROI- oder Automationsversprechen.
- Jede Seite muss auf CORE_MASTER, UI_MASTER oder das Single-Source-Dossier rückführbar sein; nichts „Neues“ ohne Quelle formulieren.

## References
- `CORE_MASTER.md` – Backend/Core Wahrheit (KPIs, APIs, Voice, Learning Brain).  
- `UI_MASTER.md` – UI Wahrheit (Komponenten, Interaktionen, Animationen).  
- `Single Source of Truth Dossier` – Strategie & Roadmap für CEO/Förderung.  
- `docs/security.md` – Technische Guardrails für CSP, Hosting, Tracking.  
- Deployment & Infrastruktur: siehe `CORE_MASTER.md` (führt Infrastruktur, Docker, API-Gateway und Betriebsprozesse; ersetzt Inhalte aus DEPLOYMENT.md).  
- Dieses WEBSITE_MASTER.md – einzige Referenz für Website-Inhalte; jede neue Sektion muss hier rückbestätigt werden.
