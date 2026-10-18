# Static YORI preview: optional visit insights

Status: prepared and tested; **not installed or enabled on the live pilot**.

The actual `yori-raum.vercel.app` publication is CLI deployment `dpl_D8aMRzHHHA6PaGgDtFz8cVKYZFkJ`, with no Git source attached. Its source manifest has `index.html`, `journey.html`, `js/house.js`, `js/r23.js` and the existing artwork. Do not replace it with the different Next.js YORI application or an older R22 prototype.

After a real Matomo instance and a separate YORI site ID are confirmed, place `visit-insights.js` beside the static preview's JS and import `mountVisitInsights({ endpoint, siteId })` once from each HTML entry. No default host, ID or fabricated telemetry is supplied. Install only through the existing reviewed preview release; production remains separate.

The visible consent panel explains timestamps, active duration and visited rooms. Rejecting keeps all statistics requests off. Revocation stops tracking. URLs exclude invite parameters, names, arbitrary object IDs and page content; only an allowlist of room names is recorded. No User ID, replay, cross-site linking or form tracking is configured. Matomo server IP anonymization and retention must be confirmed on the actual instance before activation.

Read reports in Matomo under Visitors → Visits Log. Heartbeats improve active-duration estimates, including the last page. This is consented visit analytics; it does not prove a particular visitor was Luana, and historical visits cannot be reconstructed retroactively.

Verification: `npx vitest run integrations/yori-raum/visit-insights.test.ts`. Live ingestion and YORI browser acceptance remain blocked on the confirmed analytics destination and actual static release integration.
