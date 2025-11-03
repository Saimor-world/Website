# Agent: QA
Ziel: Nach Änderungen kurz prüfen.
- `pnpm build` (keine Hydration‑Warnings)
- `node scripts/lighthouse-ci.mjs` (Home: Performance & A11y ≥ 90)
- Falls unter Zielwert → minimalen Fix vorschlagen oder als Ticket in `.codex/QUESTIONS.md` notieren.
