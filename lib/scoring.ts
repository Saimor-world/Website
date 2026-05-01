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

  if (!recon.sslInfo) {
    return {
      score: 0,
      grade: 'F',
      findings: [{ title: 'Keine Verschlüsselung', severity: 'risk', desc: 'Die Website unterstützt kein TLS/SSL.' }]
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
    findings.push({ title: 'CSP vorhanden', severity: 'ok', desc: 'Content Security Policy schützt vor XSS-Angriffen.' });
  } else {
    findings.push({ title: 'CSP fehlt', severity: 'risk', desc: 'Kein Schutz gegen Cross-Site Scripting (XSS) durch Header.' });
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
