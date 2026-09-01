import { NextResponse } from "next/server";
import type { ContactMessage, ContactRole } from "@/lib/contacto";
import { deliverContact } from "@/lib/send-contact";

function asRole(value: unknown): ContactRole {
  return value === "marca" ? "marca" : "shopper";
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: true, sent: false });
  }

  const raw = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const entry: ContactMessage = {
    name: String(raw.name ?? "").trim(),
    email: String(raw.email ?? "").trim(),
    role: asRole(raw.role),
    message: String(raw.message ?? "").trim(),
    ts: Date.now(),
  };

  if (!entry.name || !entry.email || !entry.message) {
    return NextResponse.json({ ok: true, sent: false });
  }

  const delivery = await deliverContact(entry);
  return NextResponse.json({ ok: true, sent: delivery.sent });
}
