# Saimor 30-Day Demo Flow — Astra-ready

Status: implementation branch `feat/30d-demo-onboarding-astra6`

## Product flow

1. Visitor lands on the German homepage.
2. Hero leads with the forest identity and the primary CTA `Security Check starten`.
3. Visitor runs a real Security Check without an account.
4. The completed audit is persisted with the supplied email address.
5. Requesting the demo access link may create a `trial` user only when a completed Security Audit exists for that email.
6. The trial starts at account creation and expires after 30 days.
7. Existing unclaimed Security Audits for that email are attached to the trial user.
8. The access email contains the one-click login link and states the 30-day demo period.
9. After login, the existing account bridge claims the audit and leads into the account/HQ flow.
10. Expired trial users are denied magic-token authorization.

## Trial fields

`User` contains:

- `trialStartedAt`
- `trialEndsAt`
- `trialSource`
- `role = trial`

The trial lifecycle is server-side state. It must never depend on a browser-only timer or marketing copy.

## Security boundary

- A random email address must not be enough to create a trial account.
- Trial creation requires a persisted Security Audit for the email.
- Magic tokens stay single-use and short-lived.
- Existing owner/pro accounts are never converted to trial accounts.

## Hero contract

The demo hero should communicate one path instead of the full product universe:

`Security Check -> Demo-Account -> 30 Tage -> persoenlicher Einstieg`

The forest image is an identity layer, not decorative filler. Before merge, remote preview imagery should be vendored into `public/images` so the production hero does not depend on a third-party image host.

## Astra-ready contract

The UI must not hard-code a future model implementation.

Astra integration should sit behind a small server-side agent/model configuration boundary so that the onboarding and demo UI depend on capabilities, not a specific model identifier. The demo should be able to move from the current provider/model path to Astra without rewriting the user-facing flow.

Suggested capability boundary:

- `onboarding_summary`
- `security_explanation`
- `workspace_orientation`
- `next_action`
- `contextual_help`

The model/provider mapping belongs in server configuration, not in Hero or account components.

## Preview infrastructure guardrail

The Vercel project uses a Neon integration that creates a database branch for Preview deployments. Neon Free has a finite branch limit, so stale `preview/...` branches can block a deployment before the application build even starts.

When Vercel reports `Resource provisioning failed` and the provisioning step says `Branch limit reached`:

- keep `main` / the default production branch;
- remove stale `preview/...` database branches from completed feature or fix work;
- keep several free branch slots instead of deleting only one;
- re-trigger the Preview deployment after cleanup;
- treat this as infrastructure provisioning, not an application compile failure, when GitHub CI remains green.

## Before merge

- Preview deployment must be READY.
- Prisma migration for trial fields must be created and reviewed.
- Trial creation / expiry must have automated tests.
- Access email wording must be visually reviewed.
- Forest hero must be reviewed on iPhone Safari and desktop.
- Remote forest asset must be vendored locally.
- End-to-end QA: Security Check -> email -> magic login -> claimed audit -> HQ entry.
