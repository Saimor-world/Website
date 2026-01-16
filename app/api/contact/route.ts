export const runtime = 'nodejs';
import { z } from 'zod';
import nodemailer from 'nodemailer';
import { captureApiError } from '@/lib/analytics';

const Body = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().email(),
  message: z.string().trim().min(1).max(5000),
  licht: z.boolean().optional(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json().catch(() => ({}));
    const result = Body.safeParse(json);

    if (!result.success) {
      return new Response(JSON.stringify({ error: 'Invalid form data' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { name, email, message, licht } = result.data;

    // Check if SMTP is configured
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      // Log to Sentry in development for debugging
      if (process.env.NODE_ENV === 'development') {
        captureApiError('/api/contact', new Error('SMTP not configured'), {
          method: 'POST',
          context: 'SMTP configuration missing'
        });
      }
      return new Response(JSON.stringify({
        success: true,
        message: 'Form submitted successfully'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
      }
    });

    // Email content
    const emailContent = `
Neue Kontaktanfrage von der Saimôr Website

Name: ${name}
E-Mail: ${email}
${licht ? 'Interesse an Lichtgespräch: Ja' : ''}

Nachricht:
${message}

---
Gesendet am: ${new Date().toLocaleString('de-DE')}
    `.trim();

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: 'contact@saimor.world',
      subject: `Kontaktanfrage von ${name}${licht ? ' (Lichtgespräch)' : ''}`,
      text: emailContent,
      replyTo: email,
    });

    return new Response(JSON.stringify({
      success: true,
      message: 'Nachricht erfolgreich gesendet'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    captureApiError('/api/contact', error, {
      method: 'POST',
    });
    console.error('Contact form error:', error);
    return new Response(JSON.stringify({
      error: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
