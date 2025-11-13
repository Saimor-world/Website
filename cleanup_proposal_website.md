# cleanup_proposal_website.md

| Datei | Rolle | Status-Vorschlag | Begruendung |
| --- | --- | --- | --- |
| `VERCEL_CHECKLIST.md` | Deployment-Checkliste fuer manuelle QA | Aktualisieren | Inhalte ok, aber Encoding-Fehler sowie alte URLs/Status-Texte muessen an aktuellen Build- und Waitlist-Prozess laut WEBSITE_MASTER angepasst werden. |
| `QUICK_START_MARIUS.md` | Onboarding/Task-Liste fuer CEO | Aktualisieren | Gute Struktur, jedoch viele Verweise auf alte Deployments; Workflow an neue Single-Source-Docs angleichen. |
| `FINAL_REPORT.md` | Session-Log/Aenderungshistorie | Archivieren | Dokumentiert abgeschlossene Iteration; nach `/archive/website-legacy/` verschieben sobald CEO freigibt. Nicht automatisch loeschen. |
| `FEATURES.md` | Feature-Beschreibung (marketing-lastig) | Archived ✅ | Inhalte liegen jetzt in WEBSITE_MASTER:IST; Datei am 2025-11-11 nach `/archive/website-legacy/FEATURES.md` verschoben (nur noch Referenz). |
| `EASTER_EGG.md` | Beschreibung Konami-Code | Behalten | Inhalt klar und weiterhin relevant; deckt einziges Easter Egg ohne Over-Promise. |
| `CLAUDE.md` | Dev-Agent Leitfaden | Behalten | Liefert Setup/Architekturhinweise, konform mit aktueller Repo-Nutzung. |
| `MORA_SYSTEM_OVERVIEW.md` | Backend-Doku/Uebergabe | Archivieren | Dupliziert kuenftig CORE_MASTER; zur Vermeidung widerspruechlicher Quellen nach `/archive/website-legacy/` verschieben sobald CEO zustimmt. Nicht automatisch loeschen. |
| `MORA_DISNEY_INTRO_PLAN.md` | Animations-Konzept | Behalten | Praeziser Umsetzungsplan fuer geplantes Feature; bleibt Referenz bis Umsetzung fertig ist. |
| `MASTER_PLAN.md` | Gesamtplan Web-01 | Archived ✅ | Roadmap-Snapshot lebt in WEBSITE_MASTER; Datei am 2025-11-11 nach `/archive/website-legacy/MASTER_PLAN.md` verschoben (nur Referenz, nicht bearbeiten). |
| `N8N_SETUP.md` | n8n Workflow Anleitung | Aktualisieren | Schrittfolge passt, aber Webhook-URLs/Guardrails muessen an heutigen Stack angepasst werden. |
| `N8N_WORKFLOW.md` | Technisches Workflow-Briefing | Aktualisieren | Diagramm & Steps relevant, muessen aber aktuelle Felder/Tags und DSGVO-Hinweise spiegeln. |
| `FRONTEND_TODO.md` | Aufgabenliste naechste Sessions | Aktualisieren | Enthaelt aktive Tasks (Disney Intro, Glass Effects); gegen WEBSITE_MASTER priorisieren und ggf. neu ordnen. |
| `AGENTS.md` | Build/Test/Lint Anweisungen | Behalten | Kurz, aktuell, direkt nutzbar; keine Ueberschneidung mit neuen Richtlinien. |
| `ANALYSE.md` | Website-Audit (Problemliste) | Archivieren | Historisches Gutachten, vieles erledigt; nach `/archive/website-legacy/` verschieben sobald CEO freigibt. Nicht automatisch loeschen. |
| `DEPLOY.md` | Deployment-Guide (Website) | Aktualisieren | Struktur hilfreich, aber Features/Env-Vars an heutigen MVP-Stand koppeln und Guardrails betonen. |
| `DEPLOYMENT.md` | Gesamt-System Deployment (inkl. Backend) | Archived ✅ | Deployment-/Infra-Hinweise wurden auf CORE_MASTER verwiesen; Datei am 2025-11-11 nach `/archive/website-legacy/DEPLOYMENT.md` verschoben. |
| `SOCIAL_MEDIA_READY.md` | Post-Vorlagen | Ready for archive | Kernaussagen (Transparenz-CTA, Plattform-Rhythmus) sind in WEBSITE_MASTER:VISION aufgenommen; Dokument kann nach CEO-Freigabe nach `/archive/website-legacy/` verschoben werden. |
| `SOCIAL_MEDIA_LAUNCH.md` | Launch-Strategie Social | Archived ✅ | Kampagnenstruktur nun in WEBSITE_MASTER:VISION; Datei am 2025-11-11 nach `/archive/website-legacy/SOCIAL_MEDIA_LAUNCH.md` verschoben. |
| `STATUS_UPDATE_2025-10-29.md` | Status-Log | Ready for archive | Nur historische Bugfix-Notizen, keine neuen Anweisungen; Verschiebung nach `/archive/website-legacy/` nach CEO-Freigabe. |
| `SCREENSHOTS.md` | Screenshot-Briefing | Ready for archive | Enthält nur alte Screenshot-Anweisungen ohne Mehrwert für WEBSITE_MASTER; kann nach CEO-Freigabe nach `/archive/website-legacy/` verschoben werden. |
| `README.md` | Repo-Uebersicht | Aktualisieren | Muss auf WEBSITE_MASTER verweisen, pnpm-Workflows und Guardrails aufnehmen. |
| `docs/security.md` | Security Notiz | Aktualisieren | Sehr knapp; um CSP/Matomo/n8n Hinweise erweitern, damit Legal-Page referenzieren kann. |
| `components/MoraShowcase.old.tsx` | Historische Chat-Demo | Ready for archive | Funktional durch `MoraDashboard.tsx` ersetzt; Datei bleibt nur als Referenz bis endgültige Archivierung. |
| `components/InteractiveMoraDashboard.old.tsx` | Historisches Dashboard-Grid | Ready for archive | Ebenfalls durch `MoraDashboard.tsx` ersetzt; keine neuen Änderungen mehr, nach Freigabe archivierbar. |
