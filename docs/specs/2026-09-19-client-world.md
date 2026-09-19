# Client World — Luana pilot

**Status:** implementation spec for the first private client-facing Saimôr World.
**Date:** 2026-09-19
**Surface:** `Saimor-world/Website`
**Pilot route:** `/world/luana`

## Product intent

Client World is not a generic customer portal and not a second Saimôr OS.

It is a private, personalized front page inside the Saimôr universe that explains what Saimôr currently sees in a client's business, shows concrete directions and previews, and lets the client react before a full project or integration exists.

The Luana pilot must already feel like a preview of the wider Saimôr world:

- current focus and proactive suggestions,
- SAIMÔR perspective on the business,
- website redesign direction rather than a copy of the current website,
- digital presence cards for domain / TikTok / Instagram,
- a visible bridge into YORI, Saimôr OS and MÔRA,
- idea reactions and free-form feedback,
- a very small set of next questions.

No prices, invoices or contract UI in this pilot.

## Truth contract

Every module carries an explicit truth state:

- `live`: backed by a real connected source or real persisted client input,
- `preview`: a Saimôr concept/demo, not connected truth,
- `not_connected`: the source is missing; absence must never be presented as a negative finding.

The pilot must not invent social metrics, bookings, revenue, connected accounts, website audit results or completed work.

## Architecture

```text
Client World (Website)
  ├─ personalized editorial layer
  ├─ access-code session
  ├─ reactions / feedback
  └─ bridges
      ├─ YORI
      ├─ Saimôr OS
      └─ MÔRA / Deep View

CORE remains truth for real integrations and actions.
YORI remains its own product.
Saimôr OS remains its own product.
```

The Website surface is therefore an arrival/orchestration layer, not a second backend.

## V1 access

The pilot uses a per-world server-side access code stored only in the deployment environment.

For Luana:

`CLIENT_WORLD_LUANA_CODE`

The code is never embedded in HTML or client JavaScript.

Successful access creates a signed HttpOnly cookie scoped by world slug. The cookie contains only:

- world slug,
- random session id,
- expiry.

Signing uses the existing `NEXTAUTH_SECRET`. No user password is created.

This is intentionally a pilot access mechanism. A later multi-client admin flow can replace environment-backed codes without changing the URL or page model.

## V1 interaction persistence

To avoid a premature second schema, pilot reactions are persisted through the existing generic `WebsiteEvent` store with explicit event names:

- `client_world.idea_reaction`
- `client_world.feedback`
- `client_world.module_interest`

Payloads include the world slug and only the submitted value. The signed world session id is used as the visitor id.

If Client World becomes a durable client workspace, these interactions move behind a canonical CORE/client contract.

## Luana V1 sections

### 1. Today

Personal greeting and a short current-state editorial note.

Three focus items maximum.

### 2. Perspective

What already feels strong, what Saimôr would clarify, and where there is potential.

These are editorial observations, not fabricated analytics.

### 3. Website direction

Show the direction Saimôr would take:

- clearer arrival,
- offer hierarchy,
- stronger personal presence,
- one obvious next action.

A later dedicated clickable redesign can be attached as the module's deep link.

### 4. Presence

Cards for:

- domain / website,
- TikTok,
- Instagram.

Until sources are connected, show `not_connected` and explain what will become possible after connection.

### 5. World preview

Show the wider world already now:

- YORI: creator/content operating space,
- Saimôr OS: business operating space,
- MÔRA: context and proactive intelligence.

These are `preview` unless a real integration is attached.

Deep links may point to existing product previews, but they must not claim Luana's data is already present there.

### 6. Proactive suggestions

Curated suggestions from Saimôr, each with:

- title,
- rationale,
- impact hypothesis,
- truth state,
- reaction controls.

Reaction choices:

- interesting,
- later,
- not for me.

### 7. Feedback

One short free-text field for wishes / corrections / constraints.

### 8. Next

At most three current questions.

## Design

Client World is visually related to Saimôr but more intimate and editorial than the public homepage.

Requirements:

- mobile-first,
- quiet, warm, premium,
- dark forest / paper / jade / gold palette already present in the Website,
- no dashboard tile wall,
- visible transitions between Saimôr, YORI and OS,
- reduced-motion support,
- noindex / nofollow.

## Acceptance for the first slice

1. `/world/luana` cannot be opened without the configured code.
2. The code itself never reaches browser source.
3. A successful code entry persists a signed session.
4. Luana sees Today, Perspective, Website Direction, Presence, World Preview, Suggestions, Feedback and Next.
5. Preview and missing-source states are visibly distinguished.
6. Idea reactions and feedback persist as `WebsiteEvent` records.
7. The surface contains bridges to YORI, OS and MÔRA without pretending they are already connected to Luana.
8. Public Saimôr navigation/footer are not wrapped around the private world.
9. The page is noindex.
10. No production deploy is part of this implementation slice.
