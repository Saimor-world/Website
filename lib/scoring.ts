import { ReconResult } from './recon';

export type SecurityGrade = 'A' | 'B' | 'C' | 'D' | 'F';

export interface CategoryScore {
  score: number;
  grade: SecurityGrade;
  findings: { title: string; severity: 'risk' | 'warn' | 'ok'; desc: string }[];
}

export function calculateSecurityScore(recon: ReconResult) {
  const categories: Record<string, CategoryScore> = {
    encryption: scoreEncryption(recon),
    headers: scoreHeaders(recon),
    informationHygiene: scoreInformationHygiene(recon),
    infrastructure: scoreInfrastructure(recon)
  };

  const totalScore = Math.round(
    (categories.encryption.score * 0.35) +
    (categories.headers.score * 0.30) +
    (categories.informationHygiene.score * 0.20) +
    (categories.infrastructure.score * 0.15)
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
      // HTTPS fetch succeeded → TLS is valid, cert is trusted by system roots.
      // We can't read cert metadata (no raw socket), so cap at 85 instead of 100.
      findings.push({
        title: 'HTTPS bestätigt',
        severity: 'ok',
        desc: 'Die Website nutzt eine gültige HTTPS-Verbindung. Zertifikatsdetails konnten passiv nicht ausgelesen werden.',
      });
      return { score: 85, grade: getGrade(85), findings };
    }

    // No TLS probe + no successful HTTPS fetch → site unreachable or HTTP only.
    return {
      score: 0,
      grade: 'F',
      findings: [{ title: 'Keine Verschlüsselung erkennbar', severity: 'risk', desc: 'Die Website scheint kein HTTPS zu nutzen oder war während des Checks nicht erreichbar.' }],
    };
  }

  if (!recon.sslInfo.valid) {
    score -= 50;
    findings.push({ title: 'Ungültiges Zertifikat', severity: 'risk', desc: 'Das SSL-Zertifikat ist nicht vertrauenswürdig oder abgelaufen.' });
  }

  if (recon.sslInfo.protocol === 'TLSv1.0' || recon.sslInfo.protocol === 'TLSv1.1') {
    score -= 30;
    findings.push({ title: 'Veraltetes Protokoll', severity: 'risk', desc: `Nutzt ${recon.sslInfo.protocol}, was als unsicher gilt.` });
  }

  if (recon.sslInfo.bits && recon.sslInfo.bits < 2048) {
    score -= 20;
    findings.push({ title: 'Schwache Schlüssellänge', severity: 'warn', desc: 'Der RSA-Schlüssel ist kürzer als 2048 Bit.' });
  }

  if (score === 100) {
    findings.push({ title: 'Moderne Verschlüsselung', severity: 'ok', desc: 'TLS-Konfiguration entspricht aktuellen Standards.' });
  }

  return { score, grade: getGrade(score), findings };
}

function scoreHeaders(recon: ReconResult): CategoryScore {
  let score = 0;
  const findings: CategoryScore['findings'] = [];

  if (recon.securityHeaders.hsts) {
    score += 40;
    findings.push({ title: 'HSTS Aktiv', severity: 'ok', desc: 'Erzwingt HTTPS-Verbindungen dauerhaft.' });
  } else {
    findings.push({ title: 'HSTS fehlt', severity: 'warn', desc: 'Besucher könnten auf unverschlüsselte Seiten herabgestuft werden.' });
  }

  if (recon.securityHeaders.csp) {
    score += 40;
    findings.push({ title: 'CSP-Header vorhanden', severity: 'ok', desc: 'Content Security Policy schützt vor XSS-Angriffen.' });
  } else {
    // CSP via HTTP header is best practice but absence doesn't mean the site is unprotected —
    // many sites deploy CSP via meta tag or rely on framework-level escaping.
    score += 10; // partial credit: not zero, just not optimal
    findings.push({
      title: 'CSP-Header nicht gesetzt',
      severity: 'warn',
      desc: 'Kein Content-Security-Policy-Header gefunden. Kann auch via Meta-Tag oder Framework-Ebene umgesetzt sein.',
    });
  }

  if (recon.securityHeaders.xFrameOptions) {
    score += 20;
    findings.push({ title: 'Clickjacking Schutz', severity: 'ok', desc: 'X-Frame-Options verhindern das Einbetten in fremde Frames.' });
  } else {
    findings.push({ title: 'Clickjacking Risiko', severity: 'warn', desc: 'Die Seite kann in fremde Frames eingebettet werden.' });
  }

  return { score, grade: getGrade(score), findings };
}

function scoreInfrastructure(recon: ReconResult): CategoryScore {
  let score = 100;
  const findings: CategoryScore['findings'] = [];

  if (recon.subdomains.length > 10) {
    findings.push({ title: 'Große Angriffsfläche', severity: 'warn', desc: `Über ${recon.subdomains.length} Subdomains gefunden.` });
    score -= 10;
  }

  const serverHeader = recon.rawHeaders['server'];
  if (serverHeader && serverHeader.toLowerCase() !== 'server' && serverHeader.length > 3) {
    score -= 10;
    findings.push({ title: 'Server-Fingerprinting', severity: 'warn', desc: `Server gibt Software-Version preis: ${serverHeader}` });
  }

  return { score, grade: getGrade(score), findings };
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
      title: `Kritische Datei sichtbar: ${file.path}`,
      severity: 'risk',
      desc: `Der oeffentliche Pfad ${file.path} antwortet mit Status ${file.status}. Das kann interne Informationen preisgeben.`,
    });
  });

  if (foundInfoFiles.length > 0) {
    score -= Math.min(15, foundInfoFiles.length * 5);
    findings.push({
      title: 'Oeffentliche Index-Dateien sichtbar',
      severity: 'warn',
      desc: `${foundInfoFiles.map((file) => file.path).join(', ')} sind erreichbar. Das ist oft normal, sollte aber bewusst gepflegt werden.`,
    });
  }

  if (hasSecurityTxt) {
    findings.push({
      title: 'security.txt vorhanden',
      severity: 'ok',
      desc: 'Es gibt einen oeffentlichen Kontaktpunkt fuer verantwortungsvolle Sicherheitsmeldungen.',
    });
  } else {
    score -= 10;
    findings.push({
      title: 'security.txt fehlt',
      severity: 'warn',
      desc: 'Ein klarer Sicherheitskontakt fuer externe Finder ist nicht sichtbar.',
    });
  }

  if (findings.length === 0) {
    findings.push({
      title: 'Keine auffaelligen Public-Files',
      severity: 'ok',
      desc: 'Die geprueften Standardpfade liefern keine offensichtlichen sensiblen Dateien aus.',
    });
  }

  return { score: Math.max(0, score), grade: getGrade(Math.max(0, score)), findings };
}
