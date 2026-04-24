import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import nodemailer from 'nodemailer';
import { prisma } from '@/lib/prisma';
import { waitlistLimiter, getClientIP } from '@/lib/rate-limit';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const Body = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().email(),
  locale: z.enum(['de', 'en']).default('de'),
  goal: z.enum(['struktur', 'kommunikation', 'priorisierung', 'automatisierung']),
  painPoints: z.string().optional(),
  techStack: z.string().optional(),
});

type Goal = z.infer<typeof Body>['goal'];

function blueprintFor(data: z.infer<typeof Body>) {
  const { goal, locale, painPoints } = data;
  
  const de = {
    struktur: {
      focus: 'Entlastung der mentalen Last',
      automations: ['KI-gestuetzter Tagesplaner', 'Automatisches Meeting-Protokoll', 'Inbox-Zero Assistent'],
      guardrails: ['Privatsphaere-Filter fuer alle Uploads', 'Menschliche Endkontrolle bei Kundenmails'],
      roadmap: ['Woche 1: Onboarding', 'Woche 2: Kern-Setup', 'Woche 3: Fine-Tuning', 'Woche 4: Rollout']
    },
    kommunikation: {
      focus: 'Skalierbare Authentizitaet',
      automations: ['Ghostwriting-Engine', 'Multichannel-Sync', 'Sentiment-Reporting'],
      guardrails: ['Budget-Check bei Zusagen', 'Markenkonsistenz-Pruefung'],
      roadmap: ['Woche 1: Stilanalyse', 'Woche 2: Profil-Training', 'Woche 3: Kanal-Integration', 'Woche 4: Monitoring']
    },
    priorisierung: {
      focus: 'Strategische Entscheidungshilfe',
      automations: ['Opportunity-Scoring', 'Ressourcen-Heatmap', 'Fokus-Blocker'],
      guardrails: ['Ethische Filter', 'Transparenz der Quellen'],
      roadmap: ['Woche 1: Ziel-Def', 'Woche 2: Daten-Anbindung', 'Woche 3: Dashboard-Config', 'Woche 4: Strategie-Mode']
    },
    automatisierung: {
      focus: 'Workflow Effizienz',
      automations: ['Cross-App Sync', 'Self-Healing Workflows', 'Error-Reporting'],
      guardrails: ['Sicherheits-Audits', 'Uptime-Monitoring'],
      roadmap: ['Woche 1: Prozess-Audit', 'Woche 2: Architektur-Design', 'Woche 3: Implementierung', 'Woche 4: Skalierung']
    }
  };

  const en = {
    struktur: {
      focus: 'Mental Load Relief',
      automations: ['AI Planner', 'Meeting Minutes', 'Inbox Assistant'],
      guardrails: ['Privacy filters', 'Human check'],
      roadmap: ['Week 1: Onboarding', 'Week 2: Setup', 'Week 3: Tuning', 'Week 4: Rollout']
    },
    kommunikation: {
      focus: 'Scalable Authenticity',
      automations: ['Style Engine', 'Channel Sync', 'Sentiment Reporting'],
      guardrails: ['Budget guard', 'Brand consistency'],
      roadmap: ['Week 1: Style Analysis', 'Week 2: Profile Training', 'Week 3: Integration', 'Week 4: Monitoring']
    },
    priorisierung: {
      focus: 'Decision Support',
      automations: ['Opportunity Scoring', 'Heatmap', 'Focus Blocker'],
      guardrails: ['Ethical filters', 'Source transparency'],
      roadmap: ['Week 1: Goal definition', 'Week 2: Data connection', 'Week 3: Dashboard setup', 'Week 4: Review mode']
    },
    automatisierung: {
      focus: 'Efficiency',
      automations: ['Cross-App Sync', 'Self-healing', 'Error Reporting'],
      guardrails: ['Security Audit', 'Monitoring'],
      roadmap: ['Week 1: Audit', 'Week 2: Architecture', 'Week 3: Implementation', 'Week 4: Scaling']
    }
  };

  return locale === 'de' ? de[goal] : en[goal];
}

/**
 * Real Product Logic: Uses Gemini to synthesize a personality profile
 */
async function generateAIProfile(data: any) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const prompt = `Analysiere folgende Nutzerdaten und erstelle ein professionelles Profil fuer ein "Digitales Ich" (KI-Zwilling).
    Name: ${data.name}
    Ziel: ${data.goal}
    Probleme: ${data.painPoints}
    Tools: ${data.techStack}
    
    Antworte im JSON-Format:
    {
      "personaDescription": "Ein Satz ueber den Arbeitsstil",
      "efficiencyPotential": "Prozentuale Steigerung (Zahl)",
      "topAutomation": "Die wichtigste spezifische Automation",
      "strategicAdvice": "Ein strategischer Rat"
    }`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    const result = await response.json();
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return null;
    const cleaned = text.replace(/```json|```/g, '').trim();
    try {
      return JSON.parse(cleaned);
    } catch {
      const match = cleaned.match(/\{[\s\S]*\}/);
      if (!match) return null;
      return JSON.parse(match[0]);
    }
  } catch (e) {
    return null;
  }
}

function createTransporter() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: process.env.SMTP_REJECT_UNAUTHORIZED !== 'false',
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const ip = getClientIP(req);
    const limited = await waitlistLimiter.check(req, ip);
    if (!limited.success) return NextResponse.json({ error: 'Too many requests' }, { status: 429 });

    const json = await req.json().catch(() => ({}));
    const parsed = Body.safeParse(json);
    if (!parsed.success) return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });

    const { name, email, goal, locale, painPoints, techStack } = parsed.data;
    const blueprint = blueprintFor(parsed.data);
    const aiInsight = await generateAIProfile(parsed.data);

    let userId = null;
    if (session?.user?.email) {
      const user = await prisma.user.findUnique({ where: { email: session.user.email } });
      if (user) userId = user.id;
    }

    const created = await prisma.digitalSelfBlueprint.create({
      data: {
        userId,
        name,
        email,
        goal,
        focus: aiInsight?.personaDescription || blueprint.focus,
        painPoints,
        techStack,
        automations: blueprint.automations as any,
        guardrails: blueprint.guardrails as any,
        roadmap: blueprint.roadmap as any,
      },
    });

    const summary =
      `Digital Self Blueprint\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Goal: ${goal}\n` +
      `Focus: ${aiInsight?.personaDescription || blueprint.focus}\n` +
      `Automations: ${(blueprint.automations || []).join(', ')}\n` +
      `Guardrails: ${(blueprint.guardrails || []).join(', ')}\n` +
      `Roadmap: ${(blueprint.roadmap || []).join(' | ')}`;

    try {
      await prisma.contactMessage.create({
        data: {
          name,
          email,
          message: summary,
          licht: false,
        },
      });
    } catch (dbError) {
      console.error('[Digital Self ContactMessage Error]', dbError);
    }

    let emailed = false;
    const transporter = createTransporter();
    if (transporter) {
      try {
        const subject =
          locale === 'de'
            ? `Digital AI Self Blueprint (${goal})`
            : `Digital AI Self blueprint (${goal})`;
        const advice = aiInsight?.strategicAdvice ? `\n\nStrategic Advice: ${aiInsight.strategicAdvice}` : '';

        await transporter.sendMail({
          from: process.env.SMTP_FROM || process.env.SMTP_USER,
          to: email,
          subject,
          text:
            `Focus: ${aiInsight?.personaDescription || blueprint.focus}\n` +
            `Automations: ${(blueprint.automations || []).join(', ')}\n` +
            `Guardrails: ${(blueprint.guardrails || []).join(', ')}\n` +
            `Roadmap: ${(blueprint.roadmap || []).join(' | ')}` +
            advice,
        });

        await transporter.sendMail({
          from: process.env.SMTP_FROM || process.env.SMTP_USER,
          to: 'contact@saimor.world',
          subject: `[Digital Self] ${name} (${goal})`,
          text: summary,
          replyTo: email,
        });
        emailed = true;
      } catch (mailError) {
        console.error('[Digital Self Mail Error]', mailError);
      }
    }

    return NextResponse.json({
      success: true,
      id: created.id,
      blueprint: {
        ...blueprint,
        focus: aiInsight?.personaDescription || blueprint.focus,
        aiInsight
      },
      registered: true,
      accountLinked: !!session?.user,
      emailed,
    });
  } catch (error) {
    console.error('[Digital Self API Error]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
