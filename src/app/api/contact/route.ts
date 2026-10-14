import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim();
  const topic = String(body.topic ?? '').trim().slice(0, 80);
  const message = String(body.message ?? '').trim();
  const honeypot = String(body.website ?? '').trim();

  // Spam bots fill the hidden field. Pretend success and send nothing.
  if (honeypot) return NextResponse.json({ ok: true });

  if (name.length < 2 || name.length > 80) {
    return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 });
  }
  if (email && (!EMAIL_RE.test(email) || email.length > 120)) {
    return NextResponse.json({ error: 'That email address looks wrong.' }, { status: 400 });
  }
  if (message.length < 10 || message.length > 3000) {
    return NextResponse.json(
      { error: 'Please write a message between 10 and 3000 characters.' },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from =
    process.env.CONTACT_FROM_EMAIL ?? 'Portfolio Contact <onboarding@resend.dev>';

  if (!apiKey || !to) {
    console.error('Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is missing.');
    return NextResponse.json({ error: 'Email is not set up yet.' }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  const text = [
    `Name: ${name}`,
    `Email: ${email || 'not given'}`,
    `Topic: ${topic}`,
    '',
    message,
  ].join('\n');

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
      <h2 style="margin:0 0 12px">New message from your portfolio</h2>
      <p><b>Name:</b> ${escapeHtml(name)}</p>
      <p><b>Email:</b> ${email ? escapeHtml(email) : 'not given'}</p>
      <p><b>Topic:</b> ${escapeHtml(topic)}</p>
      <hr style="border:none;border-top:1px solid #ddd;margin:16px 0" />
      <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
    </div>`;

  const { error } = await resend.emails.send({
    from,
    to,
    subject: `${topic}: new message from ${name}`,
    replyTo: email || undefined,
    text,
    html,
  });

  if (error) {
    console.error('Resend error:', error);
    return NextResponse.json(
      { error: 'Could not send the message. Please try WhatsApp instead.' },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}