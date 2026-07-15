import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import nodemailer from 'nodemailer';
import { captureApiError } from '@/lib/analytics';
import { prisma } from '@/lib/prisma';
import { contactFormLimiter, getClientIP } from '@/lib/rate-limit';

const Body = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().email(),
  message: z.string().trim().min(1).max(5000),
  licht: z.boolean().optional(),
});

export async function POST(req: NextRequest) {
  try {
    // Rate Limiting
    const ip = getClientIP(req);
    const { success } = await contactFormLimiter.check(req, ip);

    if (!success) {
      return NextResponse.json(
        { error: 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.' },
        { status: 429 }
      );
    }

    // Parse Body
    const json = await req.json().catch(() => ({}));
    const result = Body.safeParse(json);

    if (!result.success) {
      return new NextResponse(JSON.stringify({ error: 'Invalid form data' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { name, email, message, licht } = result.data;

    const json = (payload: object, status = 200) =>
      new Response(JSON.stringify(payload), {
        status,
        headers: { 'Content-Type': 'application/json' }
      });

    // Save to database — this is the reliable capture (owner sees it in the console).
    let saved = false;
    try {
      await prisma.contactMessage.create({
        data: { name, email, message, licht: !!licht }
      });
      saved = true;
    } catch (dbError) {
      console.error('[Contact DB Error]', dbError);
    }

    // Email is a best-effort notification: a mail failure (e.g. misconfigured SMTP)
    // must NOT break a request whose message was already stored.
    const smtpConfigured =
      process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;

    if (smtpConfigured) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || '587'),
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
          tls: {
            rejectUnauthorized: process.env.SMTP_REJECT_UNAUTHORIZED !== 'false'
          }
        });

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

        await transporter.sendMail({
          from: process.env.SMTP_FROM || process.env.SMTP_USER,
          to: 'contact@saimor.world',
          subject: `Kontaktanfrage von ${name}${licht ? ' (Lichtgespräch)' : ''}`,
          text: emailContent,
          replyTo: email,
        });

        return json({ success: true, message: 'Nachricht erfolgreich gesendet' });
      } catch (mailError) {
        // Notify the operator via monitoring, but do not fail the visitor if the
        // message is already captured in the database.
        captureApiError('/api/contact:mail', mailError, { method: 'POST' });
        console.error('[Contact Mail Error]', mailError);
        if (saved) {
          return json({ success: true, message: 'Nachricht erhalten' });
        }
        throw mailError;
      }
    }

    // No SMTP configured: only reliable if the message was stored.
    if (saved) {
      return json({ success: true, message: 'Nachricht erhalten' });
    }
    return json(
      { error: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' },
      500
    );

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
