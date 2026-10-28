import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { messages } from "@/db/schema";

/**
 * POST /api/contact — validates the contact form and stores it in PostgreSQL.
 * The "company" field is a honeypot: humans never see it, so any value means
 * a bot filled the form. We return success without storing.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const schema = z.object({
  name: z.string().trim().min(2, "Name too short").max(120),
  email: z
    .string()
    .trim()
    .max(200)
    .regex(EMAIL_RE, "Invalid email address"),
  message: z.string().trim().min(10, "Message too short").max(5000),
  company: z.string().max(200).optional().default(""),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.issues.map((i) => i.message) },
      { status: 400 },
    );
  }

  // Honeypot triggered → pretend everything is fine
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  try {
    await db.insert(messages).values({
      name: parsed.data.name,
      email: parsed.data.email,
      message: parsed.data.message,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] failed to store message:", err);
    return NextResponse.json({ ok: false, error: "Failed to send" }, { status: 500 });
  }
}
