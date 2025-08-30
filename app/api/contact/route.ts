import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const form = await req.formData();
  const name = String(form.get('name')||'');
  const email = String(form.get('email')||'');
  const message = String(form.get('message')||'');

  // TODO: Plug in email service (Resend, SMTP) or webhook
  console.log('Contact form:', { name, email, message });

  return NextResponse.json({ ok: true });
}
