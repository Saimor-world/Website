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

    // Save to database
    try {
      await prisma.contactMessage.create({
        data: {
          name,
          email,
          message,
          licht: !!licht
        }
      });
    } catch (dbError) {
      console.error('[Contact DB Error]', dbError);
    }

    // Check if SMTP is configured
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
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
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        // Only reject if not explicitly disabled for compatibility with some providers
        rejectUnauthorized: process.env.SMTP_REJECT_UNAUTHORIZED !== 'false'
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
