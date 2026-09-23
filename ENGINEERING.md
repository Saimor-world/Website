# Engineering Contract — SAIMÔR Website

This repository follows the canonical **SAIMÔR Engineering Constitution** in `Saimor-world/saimor-workspace/ENGINEERING.md`.

## Risk class

**Tier 1 — public production surface.**

## Product boundary

- The public site may explain and open SAIMÔR; it does not become a second source of product/account truth.
- Public previews/demos clearly label simulated, inferred, unavailable and connected/verified states.
- Authentication, billing, contact, webhook and database paths are security-sensitive.
- Metadata, canonical URLs, robots/noindex and social previews are part of release correctness.
- Server-only secrets never cross into browser bundles or public environment variables.
- Database migrations are explicit and production-safe; build-time migration behavior requires special review.

## Required verification

For relevant changes:

- lint/static/type checks;
- Vitest tests;
- production Next.js build;
- auth/go-live preflight and smoke checks for affected flows;
- database migration validation;
- metadata/SEO verification for route or preview changes;
- mobile/responsive, keyboard/focus and reduced-motion checks for UI changes;
- dependency/security scan.

Public-facing copy or UI must not imply a capability/integration is live when it is not verified.

Completion status is one of: **VERIFIED_COMPLETE**, **PARTIAL**, **BLOCKED**.
