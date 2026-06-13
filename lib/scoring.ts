import { ReconResult } from './recon';

export type SecurityGrade = 'A' | 'B' | 'C' | 'D' | 'F';

export interface CategoryScore {
  score: number;
  grade: SecurityGrade;
  findings: { title: string; severity: 'risk' | 'warn' | 'ok'; desc: string }[];
}

// Every finding description is written to be explicit about the *real* attack it
// enables — not to inflate, but because the honest impact of these gaps is what
// a business actually needs to hear. All findings derive from real passive recon.
export function calculateSecurityScore(recon: ReconResult) {
  const categories: Record<string, CategoryScore> = {
    encryption: scoreEncryption(recon),
    headers: scoreHeaders(recon),
    email: scoreEmailSecurity(recon),
    informationHygiene: scoreInformationHygiene(recon),
    infrastructure: scoreInfrastructure(recon),
  };

  const totalScore = Math.round(
    (categories.encryption.score * 0.28) +
    (categories.headers.score * 0.24) +
    (categories.email.score * 0.18) +
    (categories.informationHygiene.score * 0.16) +
    (categories.infrastructure.score * 0.14)
  );

  return {
    totalScore,
    grade: getGrade(totalScore),
    categories
  };
}

function getGrade(score: number): SecurityGrade {
  if (score >= 90) return 'A';
  if (score >= 75) return 'B';
  if (score >= 60) return 'C';
  if (score >= 40) return 'D';
  return 'F';
}

function scoreEncryption(recon: ReconResult): CategoryScore {
  let score = 100;
  const findings: CategoryScore['findings'] = [];

  // When direct TLS socket probe is unavailable (e.g. Vercel serverless blocks raw TCP),
  // fall back to inferring SSL validity from the HTTP probe: if the final URL uses https://
  // and we got response headers, the TLS handshake clearly succeeded in the browser path.
  const httpsConfirmedByFetch =
    recon.finalUrl?.startsWith('https://') && Object.keys(recon.rawHeaders).length > 0;

  if (!recon.sslInfo) {
    if (httpsConfirmedByFetch) {
      findings.push({
        title: 'HTTPS bestätigt',
        severity: 'ok',
        desc: 'Die Website nutzt eine gültige HTTPS-Verbindung. Zertifikatsdetails konnten passiv nicht ausgelesen werden.',
      });
      return { score: 85, grade: getGrade(85), findings };
    }

    return {
      score: 0,
      grade: 'F',
      findings: [{
        title: 'Keine Verschlüsselung erkennbar',
        severity: 'risk',
        desc: 'Die Website nutzt offenbar kein HTTPS oder war während des Checks nicht erreichbar. Ohne Verschlüsselung wird jede Eingabe — Logins, Formulare, Zahlungsdaten — im Klartext übertragen und kann unterwegs mitgelesen werden.',
      }],
    };
  }

  if (!recon.sslInfo.valid) {
    score -= 50;
    findings.push({
      title: 'Ungültiges Zertifikat',
      severity: 'risk',
      desc: 'Das SSL-Zertifikat ist nicht vertrauenswürdig oder abgelaufen. Besucher bekommen eine laute Browser-Warnung — und ein Angreifer kann sich unbemerkt zwischen Nutzer und Server schalten (Man-in-the-Middle).',
    });
  }

  if (recon.sslInfo.protocol === 'TLSv1.0' || recon.sslInfo.protocol === 'TLSv1.1') {
    score -= 30;
    findings.push({
      title: 'Veraltetes Verschlüsselungsprotokoll',
      severity: 'risk',
      desc: `Die Seite nutzt ${recon.sslInfo.protocol}. Dieses Protokoll gilt als gebrochen und wird von modernen Browsern bereits abgelehnt — die Verschlüsselung lässt sich angreifen.`,
    });
  }

  if (recon.sslInfo.bits && recon.sslInfo.bits < 2048) {
    score -= 20;
    findings.push({
      title: 'Schwache Schlüssellänge',
      severity: 'warn',
      desc: 'Der RSA-Schlüssel ist kürzer als 2048 Bit und entspricht damit nicht mehr dem heutigen Mindeststandard.',
    });
  }

  // Certificate expiry — derived from the cert we already read (validTo).
  if (recon.sslInfo.validTo) {
    const expiry = new Date(recon.sslInfo.validTo).getTime();
    const daysLeft = Math.round((expiry - Date.now()) / 86_400_000);
    if (Number.isFinite(daysLeft)) {
      if (daysLeft < 0) {
        score -= 40;
        findings.push({
          title: 'Zertifikat abgelaufen',
          severity: 'risk',
          desc: `Das SSL-Zertifikat ist seit ${Math.abs(daysLeft)} Tagen abgelaufen. Besucher sehen eine ganzseitige Sicherheitswarnung — die meisten brechen sofort ab.`,
        });
      } else if (daysLeft < 14) {
        score -= 10;
        findings.push({
          title: 'Zertifikat läuft bald ab',
          severity: 'warn',
          desc: `Das SSL-Zertifikat läuft in ${daysLeft} Tagen ab. Wird es nicht rechtzeitig erneuert, wird die Seite schlagartig als unsicher markiert.`,
        });
      }
    }
  }

  if (score >= 100) {
    findings.push({ title: 'Moderne Verschlüsselung', severity: 'ok', desc: 'TLS-Konfiguration entspricht aktuellen Standards.' });
  }

  return { score: Math.max(0, score), grade: getGrade(Math.max(0, score)), findings };
}

function scoreHeaders(recon: ReconResult): CategoryScore {
  let score = 0;
  const findings: CategoryScore['findings'] = [];
  const h = recon.rawHeaders;

  // HSTS (30)
  if (recon.securityHeaders.hsts) {
    score += 30;
    findings.push({ title: 'HSTS aktiv', severity: 'ok', desc: 'Der Browser erzwingt dauerhaft verschlüsselte Verbindungen.' });
  } else {
    findings.push({
      title: 'HSTS fehlt — SSL-Stripping möglich',
      severity: 'warn',
      desc: 'Ohne HSTS kann ein Angreifer im selben Netzwerk (offenes WLAN im Café, Hotel, Bahn) die Verbindung auf unverschlüsseltes HTTP herabstufen und Logins live mitlesen.',
    });
  }

  // CSP (28)
  if (recon.securityHeaders.csp) {
    score += 28;
    findings.push({ title: 'Content-Security-Policy gesetzt', severity: 'ok', desc: 'Eingeschleustes Fremd-JavaScript (XSS) wird wirksam eingedämmt.' });
  } else {
    score += 7; // partial credit: may be set via meta tag / framework escaping
    findings.push({
      title: 'Keine Content-Security-Policy — XSS-Hebel offen',
      severity: 'warn',
      desc: 'Ohne CSP kann eingeschleustes JavaScript — etwa über ein gekapertes Analytics- oder Werbeskript — Sitzungen übernehmen und Eingaben bis hin zu Passwörtern an Fremde weiterleiten.',
    });
  }

  // Clickjacking / X-Frame-Options (16)
  if (recon.securityHeaders.xFrameOptions || /frame-ancestors/i.test(h['content-security-policy'] || '')) {
    score += 16;
    findings.push({ title: 'Clickjacking-Schutz aktiv', severity: 'ok', desc: 'Die Seite kann nicht unbemerkt in fremde Seiten eingebettet werden.' });
  } else {
    findings.push({
      title: 'Clickjacking möglich',
      severity: 'warn',
      desc: 'Die Seite lässt sich unsichtbar über eine fremde Seite legen — Nutzer klicken dann ahnungslos echte Aktionen (Bestellungen, Freigaben) in eurem Namen aus.',
    });
  }

  // MIME-sniffing / X-Content-Type-Options (12)
  if ((h['x-content-type-options'] || '').toLowerCase().includes('nosniff')) {
    score += 12;
    findings.push({ title: 'MIME-Sniffing unterbunden', severity: 'ok', desc: 'Der Browser interpretiert Dateien nur als das, was sie wirklich sind.' });
  } else {
    findings.push({
      title: 'MIME-Sniffing nicht unterbunden',
      severity: 'warn',
      desc: 'Ohne X-Content-Type-Options kann der Browser einen hochgeladenen „Bild"-Upload als Skript ausführen — ein harmlos wirkender Anhang wird so zu aktivem Code.',
    });
  }

  // Referrer-Policy (6)
  if (h['referrer-policy']) {
    score += 6;
  } else {
    findings.push({
      title: 'Referrer-Policy fehlt',
      severity: 'warn',
      desc: 'Beim Klick auf externe Links können interne URLs (inkl. evtl. enthaltener Tokens) an Drittseiten weitergegeben werden.',
    });
  }

  // Cookie flags on the landing response (8)
  const setCookie = h['set-cookie'];
  if (setCookie) {
    const secure = /;\s*secure/i.test(setCookie);
    const httpOnly = /;\s*httponly/i.test(setCookie);
    if (secure && httpOnly) {
      score += 8;
      findings.push({ title: 'Cookies abgesichert', severity: 'ok', desc: 'Gesetzte Cookies sind als Secure und HttpOnly markiert.' });
    } else {
      const gaps: string[] = [];
      if (!httpOnly) gaps.push('per JavaScript auslesbar (kein HttpOnly)');
      if (!secure) gaps.push('auch unverschlüsselt übertragbar (kein Secure)');
      findings.push({
        title: 'Session-Cookies ungeschützt',
        severity: 'risk',
        desc: `Gesetzte Cookies sind ${gaps.join(' und ')}. Ein Angreifer kann damit eine fremde Sitzung kapern und sich als der Nutzer ausgeben.`,
      });
    }
  } else {
    score += 8; // no cookies observed on landing page — nothing to flag
  }

  return { score: Math.min(100, score), grade: getGrade(Math.min(100, score)), findings };
}

function scoreEmailSecurity(recon: ReconResult): CategoryScore {
  let score = 100;
  const findings: CategoryScore['findings'] = [];
  const hasMx = recon.mxRecords.length > 0;

  if (!recon.emailAuth.dmarc) {
    score -= 55;
    findings.push({
      title: 'Kein DMARC — Mail-Spoofing möglich',
      severity: 'risk',
      desc: 'Ohne DMARC-Eintrag kann praktisch jeder E-Mails verschicken, die aussehen, als kämen sie von eurer Domain. Genau das steckt hinter CEO-Fraud und gefälschten Rechnungen — der Empfänger sieht euren echten Absendernamen.',
    });
  } else if (!recon.emailAuth.dmarcPolicy || recon.emailAuth.dmarcPolicy === 'none') {
    score -= 25;
    findings.push({
      title: 'DMARC nur im Beobachtungsmodus (p=none)',
      severity: 'warn',
      desc: 'Ein DMARC-Eintrag existiert, steht aber auf p=none — gefälschte Mails werden gemeldet, aber nicht blockiert. Erst p=quarantine oder p=reject stoppt Spoofing aktiv.',
    });
  } else {
    findings.push({
      title: `DMARC aktiv (p=${recon.emailAuth.dmarcPolicy})`,
      severity: 'ok',
      desc: 'Gefälschte Absender in eurem Namen werden aktiv abgewiesen oder in Quarantäne verschoben.',
    });
  }

  if (!recon.emailAuth.spf) {
    score -= 30;
    findings.push({
      title: 'Kein SPF-Eintrag',
      severity: hasMx ? 'risk' : 'warn',
      desc: 'Ohne SPF ist nicht festgelegt, welche Server überhaupt in eurem Namen Mails senden dürfen. Zusammen mit fehlendem DMARC ist Absender-Fälschung trivial.',
    });
  } else {
    findings.push({
      title: 'SPF vorhanden',
      severity: 'ok',
      desc: 'Es ist hinterlegt, welche Server legitim in eurem Namen senden dürfen.',
    });
  }

  return { score: Math.max(0, score), grade: getGrade(Math.max(0, score)), findings };
}

function scoreInfrastructure(recon: ReconResult): CategoryScore {
  let score = 100;
  const findings: CategoryScore['findings'] = [];

  if (recon.subdomains.length > 10) {
    findings.push({
      title: 'Große Angriffsfläche',
      severity: 'warn',
      desc: `Über ${recon.subdomains.length} öffentliche Subdomains gefunden. Jede davon ist ein möglicher Einstiegspunkt — vergessene Test- oder Alt-Systeme sind ein klassisches Einfallstor.`,
    });
    score -= 10;
  }

  const serverHeader = recon.rawHeaders['server'];
  if (serverHeader && serverHeader.toLowerCase() !== 'server' && serverHeader.length > 3) {
    score -= 10;
    findings.push({
      title: 'Server verrät Software-Version',
      severity: 'warn',
      desc: `Der Server gibt sich als "${serverHeader}" zu erkennen. Angreifer schlagen zu genau dieser Version direkt bekannte Sicherheitslücken (CVEs) nach.`,
    });
  }

  const poweredBy = recon.rawHeaders['x-powered-by'];
  if (poweredBy) {
    score -= 8;
    findings.push({
      title: 'Technologie-Version offengelegt',
      severity: 'warn',
      desc: `Der Header X-Powered-By verrät "${poweredBy}". Das erspart einem Angreifer die Aufklärung und führt ihn direkt zu passenden Exploits.`,
    });
  }

  return { score: Math.max(0, score), grade: getGrade(Math.max(0, score)), findings };
}

function scoreInformationHygiene(recon: ReconResult): CategoryScore {
  let score = 100;
  const findings: CategoryScore['findings'] = [];
  const foundRiskFiles = recon.publicFiles.filter((file) => file.found && file.risk === 'risk');
  const foundInfoFiles = recon.publicFiles.filter((file) => file.found && file.risk === 'info');
  const hasSecurityTxt = recon.publicFiles.some((file) => file.found && file.path.includes('security.txt'));

  foundRiskFiles.forEach((file) => {
    score -= 35;
    findings.push({
      title: `Kritische Datei öffentlich: ${file.path}`,
      severity: 'risk',
      desc: riskFileImpact(file.path, file.status),
    });
  });

  if (foundInfoFiles.length > 0) {
    score -= Math.min(15, foundInfoFiles.length * 5);
    findings.push({
      title: 'Öffentliche Index-Dateien sichtbar',
      severity: 'warn',
      desc: `${foundInfoFiles.map((file) => file.path).join(', ')} sind erreichbar. Das ist oft normal, gibt aber Struktur und interne Pfade preis und sollte bewusst gepflegt werden.`,
    });
  }

  if (hasSecurityTxt) {
    findings.push({
      title: 'security.txt vorhanden',
      severity: 'ok',
      desc: 'Es gibt einen öffentlichen Kontaktpunkt für verantwortungsvolle Sicherheitsmeldungen.',
    });
  } else {
    score -= 10;
    findings.push({
      title: 'security.txt fehlt',
      severity: 'warn',
      desc: 'Ein klarer Sicherheitskontakt für externe Finder ist nicht sichtbar — Hinweise auf Lücken landen dann oft nirgends oder zu spät.',
    });
  }

  if (findings.length === 0) {
    findings.push({
      title: 'Keine auffälligen Public-Files',
      severity: 'ok',
      desc: 'Die geprüften Standardpfade liefern keine offensichtlichen sensiblen Dateien aus.',
    });
  }

  return { score: Math.max(0, score), grade: getGrade(Math.max(0, score)), findings };
}

function riskFileImpact(path: string, status: number | null): string {
  const statusLabel = status ? ` (HTTP ${status})` : '';
  if (path.includes('.git')) {
    return `Das .git-Verzeichnis ist öffentlich erreichbar${statusLabel}. Daraus lässt sich der komplette Quellcode rekonstruieren — inklusive evtl. hinterlegter Passwörter, API-Schlüssel und Datenbank-Zugänge.`;
  }
  if (path.includes('.env')) {
    return `Die .env-Datei antwortet öffentlich${statusLabel}. Solche Dateien enthalten typischerweise Datenbank-Passwörter, API-Schlüssel und Secrets im Klartext — ein direkter Schlüssel ins System.`;
  }
  if (path.includes('.DS_Store')) {
    return `Eine .DS_Store-Datei ist abrufbar${statusLabel}. Sie verrät die interne Ordnerstruktur und Dateinamen und hilft Angreifern, gezielt nach weiteren versteckten Dateien zu suchen.`;
  }
  return `Der öffentliche Pfad ${path} antwortet${statusLabel} und kann interne Informationen preisgeben.`;
}
