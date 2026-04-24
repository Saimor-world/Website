export type EntryLocale = 'de' | 'en';

export type EntryPillar = 'digital-self' | 'security' | 'ai-business';
export type EntryActionKind = 'digital-self-form' | 'security-check-form' | 'demo-track';

export type EntryArticle = {
  slug: string;
  pillar: EntryPillar;
  category: string;
  readTime: string;
  title: string;
  excerpt: string;
  intro: string;
  tags: string[];
  sections: Array<{
    title: string;
    body: string;
  }>;
  ctaLabel: string;
  ctaHref: string;
  actionKind?: EntryActionKind;
};

const deArticles: EntryArticle[] = [
  // ─── Security ────────────────────────────────────────────────────────────────
  {
    slug: 'security-check',
    pillar: 'security',
    category: 'Security',
    readTime: '5 min',
    title: 'Was jemand in 60 Sekunden über dein Unternehmen herausfindet',
    excerpt:
      'DNS, TLS, offene Subdomains, fehlende Header — ein externer Angreifer braucht dafür keine Hacking-Tools. Nur Geduld und ein Browser.',
    intro:
      'Bevor du über Firewalls und Passwortrichtlinien redest: Was sieht jemand, der deinen Firmennamen googelt, dein Impressum liest und dann deine Domain durch crt.sh jagt? Mehr als du denkst.',
    tags: ['Recon', 'Angriffsfläche', 'Domain-Security'],
    sections: [
      {
        title: 'Passive Aufklärung ist kostenlos und legal',
        body:
          'crt.sh zeigt alle SSL-Zertifikate, die je für deine Domain ausgestellt wurden — und damit oft Subdomains, die längst hätten abgeschaltet werden sollen. Staging.firma.de, dev.firma.de, old.firma.de: jeder kann die sehen. Viele laufen ohne Patches.',
      },
      {
        title: 'Fehlende Security-Header sind ein sofort sichtbares Signal',
        body:
          'HSTS, CSP und X-Frame-Options fehlen bei über 60% der KMU-Websites (Bericht: securityheaders.com, 2024). Ein gesetzter HSTS-Header kostet fünf Minuten. Sein Fehlen signalisiert, dass Security nicht priorisiert wird — das lesen Angreifer genauso wie Kunden.',
      },
      {
        title: 'TLS-Protokollversion verrät dein Patch-Niveau',
        body:
          'TLSv1.0 und TLSv1.1 sind seit 2020 als unsicher eingestuft. Wenn dein Server noch damit antwortet, zeigt das, dass Updates nicht regelmäßig eingespielt werden. Das ist eine Einladung für Brute-Force und Protocol-Downgrade-Angriffe.',
      },
      {
        title: 'Was der Audit macht — und was er nicht macht',
        body:
          'Der Saimor-Instant-Audit schaut von außen: DNS, TLS, Header, Subdomains. Er ersetzt kein Penetrationtesting, gibt aber in unter 10 Sekunden ein ehrliches Bild der Angriffsfläche. Die meisten Befunde sind mit Bordmitteln in einem Nachmittag behebbar.',
      },
    ],
    ctaLabel: 'Eigene Domain jetzt prüfen',
    ctaHref: '/de/einstieg/security-check',
    actionKind: 'security-check-form',
  },
  {
    slug: 'security-basics-2026',
    pillar: 'security',
    category: 'Security',
    readTime: '6 min',
    title: 'Die fünf Security-Fehler, die 80% der KMU-Vorfälle verursachen',
    excerpt:
      '94% aller Cyberangriffe auf KMUs starten mit Phishing oder schwachen Zugangsdaten. Die Lösung ist nicht teuer — sie wird nur konsequent ignoriert.',
    intro:
      'Laut Bundeslagebericht IT-Sicherheit 2023 sind Ransomware und Phishing weiterhin die häufigsten Angriffsvektoren auf kleine und mittlere Unternehmen. Was auffällt: Die meisten erfolgreichen Angriffe nutzen keine Zero-Days — sie nutzen fehlende Grundlagen.',
    tags: ['KMU', 'Phishing', 'MFA', 'Grundlagen'],
    sections: [
      {
        title: '1. Kein MFA auf kritischen Konten',
        body:
          'Microsoft-Daten zeigen: 99,9% der kompromittierten Konten hatten kein MFA aktiviert. Privilegierte Accounts ohne zweiten Faktor sind die häufigste Eingangspforte. Kostenpunkt MFA: 0 € bei Google Authenticator oder Bitwarden Authenticator.',
      },
      {
        title: '2. Backups, die nie getestet wurden',
        body:
          'Ein Backup, dessen Restore nie geprobt wurde, ist kein Backup — es ist eine Hoffnung. Bei 40% der Ransomware-Vorfälle scheitert die Wiederherstellung, weil Backups korrumpiert, unvollständig oder nicht aktuell sind. Teste Restore mindestens vierteljährlich.',
      },
      {
        title: '3. Updates nach Gefühl statt nach Prozess',
        body:
          'Die meisten Schwachstellen, über die KMUs angegriffen werden, haben zum Zeitpunkt des Angriffs bereits seit Wochen einen Patch. Der Unterschied ist nicht Wissen, sondern Prozess: Ein fester Patch-Tag pro Monat reicht als Mindeststandard.',
      },
      {
        title: '4. E-Mail als ungefilterte Eingangspforte',
        body:
          'SPF, DKIM und DMARC sind kostenlose DNS-Einträge, die E-Mail-Spoofing deutlich erschweren. Ohne sie kann jeder eine E-Mail mit eurer Absenderdomain verschicken. Konfiguration dauert eine Stunde. Ohne Konfiguration landet ihr als Domain auf Phishing-Blocklisten anderer.',
      },
      {
        title: '5. Keine Sicherheitsrichtlinie, die jemand kennt',
        body:
          'Richtlinien, die nur als PDF im Intranet liegen, schützen nichts. Ein 30-minütiges jährliches Briefing mit drei konkreten Regeln (kein fremdes USB, kein öffentliches WLAN für Unternehmensaccounts, verdächtige Mails melden) hat messbar mehr Wirkung als ein 50-seitiges Regelwerk.',
      },
    ],
    ctaLabel: 'Eigene Schwachstellen prüfen',
    ctaHref: '/de/einstieg/security-check',
  },
  {
    slug: 'supply-chain-security',
    pillar: 'security',
    category: 'Security',
    readTime: '5 min',
    title: 'Supply-Chain-Angriffe: Warum deine Software dich gefährdet',
    excerpt:
      'Der SolarWinds-Hack, XZ Utils, npm-Trojaner — Angreifer kompromittieren heute nicht dich, sondern die Werkzeuge, die du täglich nutzt.',
    intro:
      'Du updatest regelmäßig. Du nutzt bekannte Bibliotheken. Du hostest auf einem großen Cloud-Anbieter. Und trotzdem bist du angreifbar — weil Angreifer gelernt haben, genau dort anzusetzen, wo du am wenigsten hinschaust: in den Werkzeugen, die du vertraust.',
    tags: ['Supply Chain', 'Open Source', 'Risikobewertung'],
    sections: [
      {
        title: 'Der Angriff über den Dienstleister',
        body:
          'Beim SolarWinds-Angriff 2020 wurden 18.000 Organisationen — darunter US-Behörden — kompromittiert, indem Angreifer Schadcode direkt in ein legitimes Software-Update einschleusten. Niemand hat etwas Verdächtiges installiert. Alle haben nur ihre regulären Updates gemacht.',
      },
      {
        title: 'Das npm-Problem: Millionen Abhängigkeiten, wenig Kontrolle',
        body:
          'Ein durchschnittliches Node.js-Projekt hat über 1.000 transitive Abhängigkeiten — Pakete, die deine Pakete nutzen. Die wenigsten werden aktiv gewartet. 2023 waren 18% aller npm-Pakete verwaist. Jedes verwaiste Paket ist ein potenzieller Einstiegspunkt nach Typosquatting oder Account-Übernahme.',
      },
      {
        title: 'Was KMUs konkret tun können',
        body:
          'Kein Unternehmen kann alle Abhängigkeiten prüfen. Aber: regelmäßige `npm audit`- oder `pip-audit`-Läufe in der CI/CD-Pipeline, Software Composition Analysis (SCA) für kritische Dienste und eine klare Liste explizit freigegebener externer Dienste pro Team kosten wenig und reduzieren das Risiko deutlich.',
      },
    ],
    ctaLabel: 'Angriffsfläche analysieren',
    ctaHref: '/de/einstieg/security-check',
  },

  // ─── Digital Self ─────────────────────────────────────────────────────────
  {
    slug: 'digital-self',
    pillar: 'digital-self',
    category: 'Digital Self',
    readTime: '6 min',
    title: 'Digital AI Self: Dein erstes digitales Gegenüber',
    excerpt:
      'Vom Konzept zur ersten Nutzung: wie ein persönliches AI-Self dich im Alltag entlastet — ohne Persona-Kopie und ohne Vertrauensverlust.',
    intro:
      'Digital AI Self bedeutet nicht Persona-Kopie. Es bedeutet, wiederkehrende Muster und Entscheidungen so abzubilden, dass daraus konkrete Entlastung entsteht — bei klaren Grenzen, die das Team sieht.',
    tags: ['AI Self', 'Produktivität', 'Einstieg'],
    sections: [
      {
        title: 'Warum das jetzt relevant ist',
        body:
          'AI wird in Teams zum Standardwerkzeug. Wer früh ein klares digitales Gegenüber aufbaut, gewinnt Geschwindigkeit, Konsistenz und bessere Übergaben — ohne in die Falle komplexer Integrationen zu tappen.',
      },
      {
        title: 'Mini-Setup statt Großprojekt',
        body:
          'Du startest mit Rolle, Grenzen und zwei bis drei Kernaufgaben. Danach testest du einen klaren Alltagscase und bewertest nur den realen Nutzen — kein monatelanger Rollout.',
      },
      {
        title: 'Systemgrenzen bleiben klar',
        body:
          'Das Standbein ist Einstieg, nicht Hauptsystem. Es schafft Interaktion und Vertrauen und führt später in tiefere Systeme, wenn wirklich Bedarf besteht.',
      },
    ],
    ctaLabel: 'Digital AI Self starten',
    ctaHref: '/de/einstieg/digital-self',
    actionKind: 'digital-self-form',
  },
  {
    slug: 'digital-self-boundaries',
    pillar: 'digital-self',
    category: 'Digital Self',
    readTime: '4 min',
    title: 'Grenzen für ein gutes Digital AI Self',
    excerpt:
      'Was dein digitales Gegenüber darf und was bewusst menschlich bleibt — und warum klare Grenzen Vertrauen schaffen, keine Limitierung.',
    intro:
      'Ein gutes Self hat klare Aufgaben und klare Grenzen. Das schafft Vertrauen und reduziert Fehler — besonders in frühen Phasen, wo das Team das System erst einschätzen lernt.',
    tags: ['Governance', 'Trust', 'Grenzen'],
    sections: [
      { title: 'Aufgabenraum', body: 'Nur repetitive, klar definierbare Aufgaben werden automatisiert. Kreative, emotionale oder komplexe Entscheidungen bleiben beim Menschen.' },
      { title: 'Freigaben', body: 'Wichtige Outputs haben explizite Review-Punkte. Die AI schlägt vor, der Mensch entscheidet. Diese Zweiteilung ist keine Schwäche — sie ist das Sicherheitsnetz.' },
      { title: 'Transparenz', body: 'Jede Automation muss nachvollziehbar sein. Wenn niemand im Team erklären kann, warum etwas automatisiert ist, sinkt das Vertrauen — zu Recht.' },
    ],
    ctaLabel: 'Digital Self Einstieg',
    ctaHref: '/de/einstieg/digital-self',
  },

  // ─── AI Business ─────────────────────────────────────────────────────────
  {
    slug: 'ai-local-business',
    pillar: 'ai-business',
    category: 'AI für lokale Businesses',
    readTime: '7 min',
    title: 'AI Quick Wins für lokale Unternehmen',
    excerpt:
      'Kleine Automationen mit direkter Entlastung statt monatelanger Implementierung — die drei Workflows, die sofort Wirkung zeigen.',
    intro:
      'Viele lokale Unternehmen brauchen zuerst keine komplexe Plattform. Sie brauchen drei bis vier Workflows, die sofort Zeit sparen — und zeigbar sind, ohne Vertrauen zu missbrauchen.',
    tags: ['Automationen', 'Local Business', 'ROI'],
    sections: [
      { title: 'Typische erste Workflows', body: 'Lead-Vorsortierung, Angebotsentwurf, Follow-up Ablauf und internes Wissensrouting. Kleine Use Cases mit messbarer Wirkung — unter 2 Stunden Einrichtung.' },
      { title: 'Starter-Pack Logik', body: 'Demo, Einführung und erster Live-Workflow in einem Paket. Ziel ist nicht Theorie, sondern ein funktionierender Einstieg innerhalb der ersten Woche.' },
      { title: 'Verbindung zur Lab-Software', body: 'Die Demo zeigt je nach Wunsch den passenden Pfad: Security, Digital Self oder Business Automation — als echter Live-Durchlauf, nicht als Slideshow.' },
    ],
    ctaLabel: 'Passenden Demo-Track starten',
    ctaHref: '/demo?track=ai-business',
    actionKind: 'demo-track',
  },
  {
    slug: 'local-ai-roadmap-90-days',
    pillar: 'ai-business',
    category: 'AI für lokale Businesses',
    readTime: '5 min',
    title: '90-Tage-Roadmap für lokale AI-Einführung',
    excerpt:
      'In drei Phasen von erstem Test zu stabilem Mini-System — ohne Beratervertrag und ohne Projektstruktur.',
    intro:
      'Klein starten, sichtbar machen, iterativ erweitern. Dieses Prinzip lässt sich in 90 Tagen praktisch umsetzen — wenn der erste Schritt klein genug ist, um wirklich gemacht zu werden.',
    tags: ['Roadmap', 'Implementation', '90 Tage'],
    sections: [
      { title: 'Phase 1 — Woche 1–3', body: 'Ein Problem, ein Workflow, ein messbarer KPI. Nicht drei Probleme gleichzeitig. Wer mit einem Ziel startet, weiß nach Woche 3, ob es funktioniert.' },
      { title: 'Phase 2 — Woche 4–8', body: 'Stabilisieren, Team einbinden und Wiederholbarkeit sichern. Erst wenn Phase 1 läuft ohne manuelle Eingriffe, kommt Phase 2.' },
      { title: 'Phase 3 — Woche 9–13', body: 'Auf zweiten und dritten Workflow erweitern, ohne Systembruch. Das Ziel ist nicht maximale Automation — es ist maximale Vorhersehbarkeit.' },
    ],
    ctaLabel: 'Demo-Track ansehen',
    ctaHref: '/demo?track=ai-business',
  },
];

const enArticles: EntryArticle[] = [
  // ─── Security ────────────────────────────────────────────────────────────────
  {
    slug: 'security-check',
    pillar: 'security',
    category: 'Security',
    readTime: '5 min',
    title: 'What someone finds out about your company in 60 seconds',
    excerpt:
      'DNS, TLS, open subdomains, missing headers — an attacker needs no hacking tools for this. Just patience and a browser.',
    intro:
      'Before discussing firewalls and password policies: what does someone see if they Google your company name, read your legal notice, and then run your domain through crt.sh? More than you expect.',
    tags: ['Recon', 'Attack Surface', 'Domain Security'],
    sections: [
      {
        title: 'Passive reconnaissance is free and legal',
        body:
          'crt.sh shows every SSL certificate ever issued for your domain — and with it, subdomains that should have been decommissioned long ago. staging.company.com, dev.company.com, old.company.com: anyone can see them. Many run without patches.',
      },
      {
        title: 'Missing security headers are an instantly visible signal',
        body:
          'HSTS, CSP and X-Frame-Options are absent from over 60% of SME websites (securityheaders.com report, 2024). Setting an HSTS header takes five minutes. Its absence signals that security is not prioritized — attackers read that the same way customers do.',
      },
      {
        title: 'TLS protocol version reveals your patch level',
        body:
          'TLSv1.0 and TLSv1.1 have been classified as insecure since 2020. If your server still responds with them, it shows that updates are not being applied regularly — an invitation for brute force and protocol downgrade attacks.',
      },
      {
        title: 'What the audit does — and what it does not',
        body:
          'The Saimor instant audit looks from the outside: DNS, TLS, headers, subdomains. It does not replace penetration testing, but gives an honest picture of attack surface in under 10 seconds. Most findings are fixable in an afternoon with built-in tools.',
      },
    ],
    ctaLabel: 'Check your domain now',
    ctaHref: '/en/entry/security-check',
    actionKind: 'security-check-form',
  },
  {
    slug: 'security-basics-2026',
    pillar: 'security',
    category: 'Security',
    readTime: '6 min',
    title: 'The five security mistakes behind 80% of SME incidents',
    excerpt:
      '94% of all cyberattacks on SMEs start with phishing or weak credentials. The solution is not expensive — it is consistently ignored.',
    intro:
      'According to the BSI IT Security Report 2023, ransomware and phishing remain the most common attack vectors against small and medium businesses. What stands out: most successful attacks exploit no zero-days — they exploit missing basics.',
    tags: ['SME', 'Phishing', 'MFA', 'Basics'],
    sections: [
      { title: '1. No MFA on critical accounts', body: 'Microsoft data shows: 99.9% of compromised accounts had no MFA enabled. Privileged accounts without a second factor are the most common entry point. Cost of MFA: €0 with Google Authenticator or Bitwarden Authenticator.' },
      { title: '2. Backups that were never tested', body: 'A backup whose restore was never rehearsed is not a backup — it is a hope. In 40% of ransomware incidents, recovery fails because backups were corrupted, incomplete or outdated. Test restore at least quarterly.' },
      { title: '3. Updates by feeling rather than process', body: 'Most vulnerabilities exploited against SMEs already had a patch available for weeks by the time of the attack. The difference is not knowledge — it is process: one fixed patch day per month is a sufficient minimum standard.' },
      { title: '4. Email as an unfiltered entry point', body: 'SPF, DKIM and DMARC are free DNS records that make email spoofing significantly harder. Without them, anyone can send email appearing to be from your domain. Configuration takes one hour. Without it, your domain ends up on phishing blocklists others use.' },
      { title: '5. Security policies nobody knows', body: 'Policies living only as PDFs on the intranet protect nothing. A 30-minute annual briefing with three concrete rules (no external USB, no public WiFi for company accounts, report suspicious emails) has measurably more impact than a 50-page rulebook.' },
    ],
    ctaLabel: 'Check your vulnerabilities',
    ctaHref: '/en/entry/security-check',
  },
  {
    slug: 'supply-chain-security',
    pillar: 'security',
    category: 'Security',
    readTime: '5 min',
    title: 'Supply chain attacks: why your software is putting you at risk',
    excerpt:
      'SolarWinds, XZ Utils, npm trojans — attackers now target not you, but the tools you use every day.',
    intro:
      'You update regularly. You use well-known libraries. You host on a major cloud provider. And yet you are still vulnerable — because attackers have learned to strike exactly where you are least watchful: in the tools you trust.',
    tags: ['Supply Chain', 'Open Source', 'Risk'],
    sections: [
      { title: 'Attack via the service provider', body: 'In the SolarWinds attack of 2020, 18,000 organizations — including US agencies — were compromised because attackers injected malicious code directly into a legitimate software update. Nobody installed anything suspicious. Everyone just ran their regular updates.' },
      { title: 'The npm problem: millions of dependencies, little control', body: 'An average Node.js project has over 1,000 transitive dependencies. Few are actively maintained. In 2023, 18% of npm packages were abandoned. Every abandoned package is a potential entry point via typosquatting or account takeover.' },
      { title: 'What SMEs can do concretely', body: 'No company can audit all dependencies. But: running `npm audit` or `pip-audit` in CI/CD pipelines, Software Composition Analysis for critical services, and a clear list of explicitly approved external services per team cost little and meaningfully reduce risk.' },
    ],
    ctaLabel: 'Analyze attack surface',
    ctaHref: '/en/entry/security-check',
  },

  // ─── Digital Self ─────────────────────────────────────────────────────────
  {
    slug: 'digital-self',
    pillar: 'digital-self',
    category: 'Digital Self',
    readTime: '6 min',
    title: 'Digital AI Self: your first practical counterpart',
    excerpt: 'From concept to first value: how a personal AI self supports daily work — without persona copies and without loss of trust.',
    intro: 'A Digital AI Self is not a clone. It maps recurring context and decisions into practical support — with clear boundaries the whole team can see.',
    tags: ['AI Self', 'Productivity', 'Entry'],
    sections: [
      { title: 'Why this matters now', body: 'AI is becoming standard tooling for teams. Building a clear digital counterpart early means speed, consistency and better handoffs — without falling into complex integration traps.' },
      { title: 'Start small', body: 'Define role, boundaries and 2-3 repeatable tasks first. Then test one real workflow and evaluate only tangible value — no multi-month rollout.' },
      { title: 'Keep architecture clean', body: 'The entry layer stays separate from the core system. It builds interaction and trust, and leads into deeper systems only when genuine need is proven.' },
    ],
    ctaLabel: 'Start Digital AI Self',
    ctaHref: '/en/entry/digital-self',
    actionKind: 'digital-self-form',
  },
  {
    slug: 'digital-self-boundaries',
    pillar: 'digital-self',
    category: 'Digital Self',
    readTime: '4 min',
    title: 'Boundaries for a reliable Digital AI Self',
    excerpt: 'What your digital counterpart should and should not do — and why clear limits create trust, not limitation.',
    intro: 'Clear boundaries reduce risk and increase trust — especially in early stages when the team is still learning to calibrate the system.',
    tags: ['Governance', 'Trust', 'Boundaries'],
    sections: [
      { title: 'Task scope', body: 'Only clearly repeatable tasks get automated. Creative, emotional or high-stakes decisions stay with humans. The line is drawn by outcome risk, not by task complexity.' },
      { title: 'Human checkpoints', body: 'Critical outputs have explicit review points. The AI proposes, the human decides. This split is not a weakness — it is the safety net that makes adoption sustainable.' },
      { title: 'Transparency', body: 'Every automation must be traceable. If no one on the team can explain why something is automated, trust erodes — rightfully so.' },
    ],
    ctaLabel: 'Open Digital Self entry',
    ctaHref: '/en/entry/digital-self',
  },

  // ─── AI Business ─────────────────────────────────────────────────────────
  {
    slug: 'ai-local-business',
    pillar: 'ai-business',
    category: 'AI for Local Businesses',
    readTime: '7 min',
    title: 'AI quick wins for local businesses',
    excerpt: 'Small automations with immediate relief — the three workflows that show results from week one.',
    intro: 'Most local businesses need no complex platform first. They need three to four workflows that save time immediately — and can be demonstrated without overpromising.',
    tags: ['Automation', 'Local', 'ROI'],
    sections: [
      { title: 'First workflows', body: 'Lead triage, quote drafts, follow-up and internal knowledge routing. Small use cases with measurable impact — setup under two hours.' },
      { title: 'Starter pack', body: 'Demo, onboarding and first live workflow in one package. Goal is not theory — it is a working entry point within the first week.' },
      { title: 'Lab connection', body: 'The demo shows the right track for your situation: security, digital self or business automation — as a real live run, not a slideshow.' },
    ],
    ctaLabel: 'Open matching demo track',
    ctaHref: '/demo?track=ai-business',
    actionKind: 'demo-track',
  },
  {
    slug: 'local-ai-roadmap-90-days',
    pillar: 'ai-business',
    category: 'AI for Local Businesses',
    readTime: '5 min',
    title: '90-day roadmap for local AI rollout',
    excerpt: 'Three phases from first test to stable mini-system — no consulting contract, no project structure.',
    intro: 'Start small, show value, iterate while keeping focus. This principle works in 90 days when the first step is small enough to actually happen.',
    tags: ['Roadmap', 'Implementation', '90 days'],
    sections: [
      { title: 'Phase 1 — Weeks 1–3', body: 'One problem, one workflow, one KPI. Not three problems at once. Starting with a single goal means knowing after week 3 whether it works.' },
      { title: 'Phase 2 — Weeks 4–8', body: 'Stabilize and train team usage. Phase 2 only starts when Phase 1 runs without manual intervention.' },
      { title: 'Phase 3 — Weeks 9–13', body: 'Expand to second and third workflow without complexity jump. The goal is not maximum automation — it is maximum predictability.' },
    ],
    ctaLabel: 'Open demo track',
    ctaHref: '/demo?track=ai-business',
  },
];

export const entryContent: Record<EntryLocale, EntryArticle[]> = {
  de: deArticles,
  en: enArticles,
};
