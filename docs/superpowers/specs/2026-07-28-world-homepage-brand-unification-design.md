# WORLD homepage — brand unification (Hero → contact form)

**Datum:** 2026-07-28
**Status:** Approved, ready for implementation
**Scope:** `saimor.world` homepage, Hero through the contact form section. Footer is explicitly out of scope for this pass.

---

## 1. Why

A live-site audit (this session, screenshots + source read of `Hero.tsx`, `Navbar.tsx`, `Footer.tsx`, `app/globals.css`) found the homepage currently stacks **three unrelated visual languages** in one scroll, and ships **two different logo marks simultaneously**:

| Section | What's actually there |
|---|---|
| Hero | Warm gold (`--world-gold`) + near-black (`--world-ink`), Cormorant Garamond serif, italic tagline. `saimor-seal-master.png` (gold cosmic "S" crescent-and-constellation seal). |
| Trust badges / pricing-waitlist / contact form (the sections directly below Hero) | Saturated neon-mint green, bold sans-serif headlines, generic SaaS-security-badge iconography (shield/lock/code in green squares). No relation to Hero's palette or type. |
| Footer (out of scope here) | Muted sage green, serif small-caps wordmark, and a **second, different logo file** — `saimor-logo-new.png`, a botanical branch/bud mark — live on the same page as the gold seal. |

This was not a subtle mismatch. Scrolling past the Hero drops into what reads as a different product's marketing page. A prior narrower fix in this session (removing a flat white box behind the navbar seal, adding `mix-blend-screen`) was correct but insufficient — it fixed one boxed instance of the logo, not the section-to-section language change, which is the dominant thing a visitor actually notices.

Confirmed already fixed and NOT part of this spec's remaining work:
- Navbar + mobile-menu logo: no longer boxed in flat white, uses `--world-ink`/`--world-gold` + `mix-blend-screen` (matches Hero's own treatment).
- Hero subheadline no longer hard-codes a product count ("Ein System. Drei Formen von Intelligenz." → "Ein wachsendes Ökosystem bewusster Intelligenz.", DE+EN), since that count already went stale once (see `[[project_vicini_pivot]]`).

## 2. Decisions

| Question | Decision |
|---|---|
| Keep the logo shape? | Yes — the gold cosmic seal stays as-is. This spec is about consistency, not a new mark. |
| What replaces the neon-mint green? | Gold (`--world-gold`) becomes the leading color for headlines, primary CTAs, icon accents, and card borders — matching Hero. Green is **not removed**, but is re-tuned to the Footer's existing muted sage tone and demoted to a secondary "certified/trust" accent (EU/DSGVO/Open-Source badges only) — not the section's dominant color. |
| Typography | Cormorant Garamond (serif) for **every section headline**, Hero through the contact form — not just Hero. Body copy, form labels, and input fields stay sans-serif for legibility. |
| Background | The trust/waitlist/contact sections currently sit on their own slightly-different dark green background. They move to the same `--world-ink` base Hero uses, so the page reads as one continuous surface instead of a page-within-a-page. |
| Scope boundary | Footer is deliberately excluded from this pass (its own spec later) — the user judged the footer-logo mismatch as the less urgent problem compared to the green/gold section clash. |

## 3. Color mapping (concrete token changes)

Existing tokens in `app/globals.css` (`:root`) already cover most of this — no new hex values needed:

- `--world-gold: #D6A848` — becomes the primary accent for headlines, CTA buttons/gradients, icon badges, card borders, in the sections below Hero (currently unused there).
- `--world-ink: #070B0C` — becomes the section background for trust/waitlist/contact (currently they use a different, greener dark tone not drawn from this token).
- **No new token needed.** `--world-emerald: #2F8C88` already exists in `app/globals.css` and is currently unused by anything — it's the muted, non-neon green this spec needs for the secondary "certified/trust" accent. (Checked: Footer itself doesn't use this token either — it hard-codes Tailwind's generic `emerald-400`/`emerald-500` utility classes instead. Migrating Footer onto `--world-emerald` properly is a natural follow-up for the deferred Footer pass, not part of this one, but it's why this spec reuses the token rather than inventing a fourth green.)
- The bright neon-mint currently in use (visually ~`#00ff88`-class saturation) is retired from these sections entirely — replace its every usage with `--world-gold` (primary) or `--world-emerald` (secondary, trust badges only).

## 4. Section-by-section scope

1. **Trust section** ("Technologie, der man vertrauen kann.") — headline to Cormorant serif, background to `--world-ink`, the three feature cards' icon badges and borders to gold, the EU/DSGVO/0-cookies/Open-Source stat row to `--world-emerald` (these specifically are the "certified" badges the emerald accent is for).
2. **Waitlist / pricing section** ("Strategischer Vorabzugang") — headline to serif, background to `--world-ink`, the interest-area buttons and the "PLATZ SICHERN" CTA to solid `--world-gold` (correction: no gold CTA gradient actually exists elsewhere on the page to match — Hero's own primary CTA intentionally uses YORI's own jade/teal accent via the shared `AnimatedButton` `gradient` variant, since it's promoting YORI specifically, not SAIMÔR; that shared component is out of scope here and not to be changed, since it's used for YORI-branded CTAs sitewide), form inputs keep sans-serif but restyle borders/focus states to gold instead of green.
3. **Contact form section** — headline to serif, background to `--world-ink`, input field borders/focus rings to gold, submit button to the same solid-gold treatment as the waitlist section (one CTA visual language, not two).

## 5. Testing

Following this session's established TDD pattern for WORLD (see `__tests__/Hero.test.tsx`, `__tests__/Navbar.test.tsx` from this session): for each touched component, a test asserting the new `--world-gold`/`--world-emerald`/`--world-ink` token usage is present and the old neon-green hard-coded classes/values are gone — mirroring how the Navbar tests asserted `bg-white` was absent rather than asserting a specific pixel color. Full suite (`npx vitest run`) must stay green; no snapshot tests should be blindly updated without checking the visual diff makes sense.

Visual verification: browser preview (`world-dev`, already configured in `.claude/launch.json`) after each section, screenshot compared against the current live site, checked with the user before commit/push — this touches live public copy and styling on a branch that auto-deploys on push to `main` (see `[[project_world_deploy_gotcha]]`), so push requires explicit go-ahead per section or at the end, not assumed.

## 5a. Found during implementation — scope corrections

The live-browser verification pass (after §4's three components were done) found this spec's original page audit had missed several sections, since the actual homepage composition (`app/de/page.tsx`) is longer than assumed:

- **`CommunityBanner.tsx`** — a second waitlist-style CTA (also linking to `#waitlist`) sitting between the knowledge-base teaser and SocialProof. Used Tailwind emerald/cyan/amber classes AND raw hex/rgba green values in inline gradient `style` objects in two places — a plain class-name grep missed those. Fixed the same way (gold leads).
- **`EntryTeaser.tsx`** ("Wissensbasis") — its four track tiles (Security-Check/Digital AI Self/Demo-Tracks/Konzepte) intentionally color-code four distinct categories; that's a legend, not a brand mismatch, and was left as-is. Its own section identity (background, top accent line, headline gradient, CTA button) had the same one-color-for-everything problem as the other sections and was fixed the same way.
- **`WaitlistForm.tsx`'s own submit button** was initially left as a white resting state with only a gold hover, since no gold CTA existed elsewhere to match against. Once `CommunityBanner`'s identical-purpose "Platz sichern" button (same anchor target, similar copy) was fixed to solid gold, having one white and one gold button for the same action nearby was itself a mismatch — the WaitlistForm button was moved to the same solid gold treatment.
- **`YoriSection.tsx`** — flagged directly by the user mid-implementation as the single most visible break on the page: a light cream (`--yori-paper`) section sandwiched between every other section's dark/gold treatment. This was originally treated as intentionally separate YORI sub-branding (matching Hero's own "Discover YORI" CTA, which deliberately borrows YORI's jade/teal identity) — the user corrected this read. Fixed: the section's base mode moves to `--world-ink` like everything else; YORI's jade/indigo tokens are kept, but only as accents (icon circle, eyebrow label, secondary link), the same role `--world-emerald` plays for SocialProof's trust badges.

`MoraTeaser.tsx` was also checked and found already consistent (gold-accented, dark background) — no changes needed there.

## 6. Out of scope (explicitly deferred)

- Footer redesign (logo unification, migrating its hard-coded Tailwind `emerald-400/500` classes onto the `--world-emerald` token) — separate future pass.
- `/mora`, `/yori`, and other non-homepage pages — not audited yet, not part of this spec.
- Any change to the Hero section itself beyond what's already shipped (subheadline copy, navbar logo treatment).
