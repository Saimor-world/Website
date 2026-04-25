import Anthropic from '@anthropic-ai/sdk';

export type ReconData = {
  domain: string;
  ip?: string;
  headers: Record<string, string>;
  tls: any;
  subdomains: string[];
  techStack?: string[];
};

export async function runAisecurityAnalysis(data: ReconData) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.warn('[SecurityAnalysis] No ANTHROPIC_API_KEY — skipping AI analysis');
    return null;
  }

  const client = new Anthropic({ apiKey });

  const prompt = `Du bist ein Elite-Penetration-Tester. Analysiere die folgenden passiven Recon-Daten der Domain "${data.domain}" auf kritische Schwachstellen.

ROHDATEN:
- IP: ${data.ip ?? 'unbekannt'}
- Server-Header: ${JSON.stringify(data.headers)}
- TLS/SSL: ${JSON.stringify(data.tls)}
- Gefundene Subdomains: ${data.subdomains.length > 0 ? data.subdomains.slice(0, 20).join(', ') : 'keine'}

AUFGABE:
1. Identifiziere "Low Hanging Fruits" (leicht ausnutzbare Schwachstellen).
2. Bewerte die IT-Sicherheit mit einem Score von 0–100 (100 = perfekt gesichert).
3. Erstelle einen "Attacker's Path": Wie würde ein gezielter Angriff ablaufen?

TONFALL: Technisch, präzise, ehrlich. Nutze kurze Metaphern für Laien wo sinnvoll.

ANTWORTE NUR MIT DIESEM JSON (kein Text davor oder danach):
{
  "score": <number 0-100>,
  "summary": "<1-2 Sätze kognitive Einschätzung>",
  "findings": [
    { "title": "<Kurztitel>", "severity": "risk|warn|ok", "desc": "<1 Satz Erklärung>" }
  ],
  "attacker_path": "<Schritt-für-Schritt Angriffsszenario in 2-4 Sätzen>",
  "followUpQuestions": ["<Frage 1 die der Nutzer stellen sollte>", "<Frage 2>", "<Frage 3>"]
}`;

  try {
    const response = await client.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    });

    const content = response.content[0];
    if (content.type !== 'text') return null;

    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('[SecurityAnalysis] No JSON in response:', content.text.slice(0, 200));
      return null;
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error: any) {
    console.error('[SecurityAnalysis] LLM call failed:', error?.message ?? error);
    return null;
  }
}
