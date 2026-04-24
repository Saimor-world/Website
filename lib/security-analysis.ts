import { ChatAnthropic } from "@langchain/anthropic";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export type ReconData = {
  domain: string;
  ip?: string;
  headers: Record<string, string>;
  tls: any;
  subdomains: string[];
  techStack?: string[];
};

export async function runAisecurityAnalysis(data: ReconData) {
  const model = new ChatGoogleGenerativeAI({
    modelName: "gemini-1.5-flash",
    maxOutputTokens: 2048,
    apiKey: process.env.GOOGLE_API_KEY, // Nutzt dein Free Tier
  });

  const prompt = `
    DU BIST EIN ELITE PENETRATION TESTER. 
    DEIN ZIEL: Analysiere die passiven Recon-Daten der Domain "${data.domain}" auf KRITISCHE Schwachstellen.
    
    ROHDATEN:
    - IP: ${data.ip}
    - Server-Header: ${JSON.stringify(data.headers)}
    - TLS/SSL: ${JSON.stringify(data.tls)}
    - Gefundene Subdomains: ${data.subdomains.join(', ')}
    
    AUFGABE:
    1. Identifiziere "Low Hanging Fruits" (Offene Türen).
    2. Bewerte die Professionalität der IT-Absicherung (1-100).
    3. Erstelle einen "Attacker's Path": Wie würde ein gezielter Angriff ablaufen?
    
    TONFALL:
    - Technisch, trocken, ehrlich. 
    - Nutze Metaphern für Laien, aber bleibe in der Analyse präzise.
    - Keine Standard-Phrasen wie "Nutzen Sie komplexe Passwörter".
    
    ANTWORTE IN DIESEM JSON-FORMAT:
    {
      "score": number,
      "summary": "Mora's kognitive Einschätzung",
      "findings": [
        { "title": "Punkt", "severity": "risk|warn|ok", "desc": "Warum ist das gefährlich?" }
      ],
      "attacker_path": "Schritt-für-Schritt Angriffsszenario"
    }
  `;

  try {
    const res = await model.invoke(prompt);
    // Hier parsen wir das JSON aus der Antwort
    const content = typeof res.content === 'string' ? res.content : JSON.stringify(res.content);
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
  } catch (error) {
    console.error("LLM Scan failed:", error);
    return null;
  }
}
