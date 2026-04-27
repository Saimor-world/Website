# Security-Check Investigation — 2026-04-26

> Research deliverable. No code changed. Read this before redesigning the scan.

## A. What the current scan actually does

Source: `C:/saimor/WORLD/lib/recon.ts` (lines 25–95). Only four signals are collected; everything else is LLM narrative wrapped around them.

- **DNS A-record lookup** (`dns.resolve4`, line 37) — credible signal. Records first IPv4 only. No IPv6, no failover detection.
- **TLS handshake** (`tls.connect` on :443, lines 42–58) — credible *if* it succeeds, but has a race condition (see B). Captures `authorized`, issuer O/CN, `valid_to`, protocol. No key size, no SAN list, no chain validation, no OCSP/CT.
- **Subdomain enumeration via crt.sh** (lines 64–78) — credible passive CT-log lookup. Capped at 15. No error handling.
- **HTTP HEAD against `https://${domain}`** for three header booleans (lines 82–88): `strict-transport-security`, `content-security-policy`, `x-frame-options`. Pure presence check. No parsing of `max-age`, no CSP strictness analysis. Missing entirely: `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-*`, cookie flags.

The score itself (`route.ts:53`) is **not derived from these signals at all** — it's whatever number Claude Haiku puts in JSON, with a fallback of `70`. The "scan" is effectively a four-data-point prompt for an LLM. There is no deterministic rubric.

`lib/scanner.ts` (`runLiveRecon`, with the brute-force `commonPrefixes`) is **dead code** — nothing imports it. Can be deleted.

## B. Why amazon.de scores badly — specific bug diagnosis

Three concrete bugs, in priority order:

1. **TLS scan often never populates `sslInfo` on amazon.de.** `recon.ts:42-58` has a fatal race: the `connect()` callback writes to `result.sslInfo`, but the awaited Promise resolves on `secureConnect`/`error`/`timeout` *without* waiting for the callback to finish. For high-traffic CDN hosts that negotiate TLS quickly, the resolve from `'secureConnect'` can race ahead of the synchronous `getPeerCertificate()` write. Result: `sslInfo` is often `null`, which the LLM interprets as "TLS broken."

2. **HEAD request to amazon.de gets redirected/blocked, leaving all three header booleans false.** Line 82 calls `fetch(\`https://${domain}\`, { method: 'HEAD' })`. amazon.de issues a `301` to `www.amazon.de`; Amazon's edge frequently rejects HEAD with `405` or returns minimal headers. No `redirect: 'manual'`, no GET fallback, no `www.` retry. Net: HSTS=false, CSP=false, XFO=false fed to the LLM, which writes "kritische Header fehlen" — objectively false about Amazon.

3. **Score has no floor; fully delegated to a small LLM.** `route.ts:53` (`aiResult?.score ?? 70`) means Claude Haiku, looking at `headers: {}` (line 48: `headers: (recon as any).rawHeaders || {}` is a known TODO; rawHeaders is never populated), writes whatever score fits its narrative. **The headers field passed to the AI is always `{}`** because the recon module never returns the raw header map.

Headline: amazon.de's score is wrong because (a) raw headers are never forwarded to the LLM, (b) HEAD without redirect handling produces empty headers anyway, and (c) the TLS read races. The LLM is asked to score a domain it has effectively no data about and writes "unsicher" because that's the safer-sounding hedge.

## C. What "real" looks like — minimum credible product

**Must-have (the line that makes "Security-Check" honest):**

- **TLS deep-read**: full chain, key size, signature algorithm, validity, SAN coverage, hostname match, protocol versions offered. SSL Labs-equivalent letter grade.
- **DNS hygiene**: SPF (parse `v=spf1`, count lookups, detect `+all`), DKIM (probe common selectors `default._domainkey`, `google._domainkey`, `selector1._domainkey`), DMARC (parse policy `p=none|quarantine|reject`), DNSSEC (`dns.resolveAny` + AD flag via DoH), MX records + reverse lookup of MTAs.
- **HTTP headers, properly**: GET with redirect chain capture; parse HSTS `max-age`/`includeSubDomains`/`preload`; CSP weakness detection (`unsafe-inline`, `*`); `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-*`. Cookie `Secure`/`HttpOnly`/`SameSite` flags from `Set-Cookie`.
- **Email-derived signals**: when an email is supplied, check apex MX/SPF/DMARC of that domain and run **HIBP breach check on the address** (separate consent toggle).
- **Information disclosure probes (passive, GET-only, common paths)**: `/.well-known/security.txt`, `/robots.txt` (flag suspicious `Disallow:` leaks), `/.git/HEAD`, `/.env`, `/.DS_Store`, `/sitemap.xml`. These are public URLs — fetching them is not "active testing."
- **Tech fingerprint + CVE match**: parse `Server`, `X-Powered-By`, framework signatures from HTML; cross-reference against a local snapshot of known-vulnerable versions.

**Stretch (paid-tier worthy):**

- Subdomain takeover detection (CNAME pointing to dangling Heroku/S3/Azure).
- Certificate Transparency monitoring (deltas over time).
- Typosquat / lookalike domain scan via dnstwist.
- Mozilla Observatory + securityheaders.com cross-validation as "second opinion" badge.
- WAF/CDN fingerprinting.
- Mail server STARTTLS test, MTA-STS, DANE.
- Recurring re-scan with diffs ("you regressed last Tuesday").

## D. UX redesign sketch

Replace single ring + AI italic-quote with a **graded report card**, six categories, each A–F: *Encryption*, *Email Authentication*, *Web Hardening*, *Information Hygiene*, *Identity Exposure*, *Infrastructure*. Each category card: one-line headline ("DMARC: monitor only — quarantine recommended"), plain-words tooltip, evidence drawer with raw record/header so technical visitors can verify rather than trust. Overall score is **derived** from category grades, not generated.

Below cards: a **prioritized fix-list**, each item with effort estimate (10 min / 1 h / 1 day), responsibility hint (Hosting-Provider / IT / Marketing), and "Wie behebt Saimor das?" CTA. Keep the attacker-path narrative but explicitly label "Hypothese" and only render it when at least one finding is severity ≥ medium — otherwise it reads as theatre. **Drop the "Mora's kognitive Einschätzung" italic quote** on the result hero: loudest "this is just AI fluff" tell in current design.

## E. Recommended third-party signals

| API | What it adds | Cost | Privacy posture |
|---|---|---|---|
| **Mozilla Observatory** (HTTP API) | Independent grade for headers + CSP + cookies; instant credibility | Free, public | Submits target domain only. DSGVO-clean if disclosed. |
| **SSL Labs API** (Qualys) | Industry-standard TLS grade A+/F + chain analysis | Free, rate-limited (~25/h) | Caches publicly on ssllabs.com — disclose, opt-in. |
| **HIBP — "Pwned Domain"** | Aggregate breach count for whole domain | Paid (~€3.95/mo) | Domain only, not addresses. Domain owner must be verified. |
| **HIBP — k-Anonymity** | Per-address breach lookup | Free (passwords); €3.95/mo (email) | Email API requires the address — needs explicit consent. |
| **securityheaders.com** | Second-opinion header grade | Free, scraped HTML | Logs scans publicly — disclose. |
| **crt.sh** (already used) | CT-log subdomain enumeration | Free | Public CT data, no privacy issue. |
| **Shodan InternetDB** | Free passive port/CVE summary by IP | Free tier (no key) | IP-only lookup. Acceptable. |
| **VirusTotal Domain Report** | Reputation, blocklist hits, passive DNS | Free tier (4 req/min) | Domain-only. Caches. Disclose. |
| **DoH (dns.google / cloudflare-dns.com)** | DNSSEC `AD` flag, structured DNS | Free | Public resolvers. Fine. |
| **Wappalyzer (self-host)** | Tech stack fingerprint locally | Free (LGPL) | Self-hosted — best DSGVO posture. |

For DSGVO: every external API call should be feature-flagged with a clear consent line on the entry form. Default to self-hosted checks; gate third-party calls behind explicit opt-in.

## F. Sequence — most impactful changes, ordered

1. **Fix the recon contract (1 day).** `recon.ts` returns `rawHeaders: Record<string,string>`, full TLS object (chain, key bits, SANs), redirect chain, final URL. Replace racing `tls.connect` Promise with properly-awaited handshake. Fall back HEAD→GET, follow redirects explicitly. **This alone fixes amazon.de.**
2. **Replace the LLM-as-scorer with a deterministic rubric (2 days).** Compute the score from category sub-scores in TypeScript. LLM only for *summary* + *attacker_path*, never the number. Pass the LLM the full structured findings, not raw headers — reduces hallucination AND token cost.
3. **Add the must-have checks from C (3–5 days).** DNS hygiene, full HTTP header parsing, cookie analysis, info-disclosure probes. Each becomes one category in the report card.
4. **Redesign result page to category cards + fix-list (2 days).** Per-category A–F, evidence drawers, prioritized fixes. This is the lever from "free awareness toy" → "paid PDF audit."
5. **Add one third-party validator badge as social proof (1 day, opt-in).** Mozilla Observatory is the obvious first pick: public, free, fast, DSGVO-defensible. "Saimor sagt B+, Mozilla sagt B" beats any internal score.

**Files cited:**
- `WORLD/lib/recon.ts` (the actual scanner — all four checks)
- `WORLD/lib/security-analysis.ts` (LLM prompt, score is delegated here)
- `WORLD/app/api/security-scan/route.ts` (lines 48, 53 — the `rawHeaders || {}` TODO and the score fallback)
- `WORLD/lib/scanner.ts` (dead code, can be deleted)
- `WORLD/components/ScanPage.tsx` (UX target for redesign)

---

**Decision needed from user before this work begins:** approve the "Sequence" in §F, or modify (e.g., elevate the third-party validator earlier, defer email/HIBP entirely for v1). Once approved this becomes a separate spec → plan → implementation cycle.
