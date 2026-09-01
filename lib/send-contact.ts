import type { ContactMessage } from "@/lib/contacto";
import { getContactFrom, getContactTo, getResendApiKey } from "@/lib/env";

export type ContactDelivery = {
  sent: boolean;
  reason: "delivered" | "no_contact_to" | "no_transport" | "send_failed";
};

const FORBIDDEN_INBOXES = [
  "marcas@curadario.la",
  "marcas@curadario.com",
] as const;

export function isForbiddenInbox(value: string): boolean {
  const folded = value.trim().toLowerCase();
  return FORBIDDEN_INBOXES.some((inbox) => folded.includes(inbox));
}

export async function deliverContact(
  entry: ContactMessage,
): Promise<ContactDelivery> {
  const to = getContactTo();
  if (!to || isForbiddenInbox(to)) {
    return { sent: false, reason: "no_contact_to" };
  }

  const key = getResendApiKey();
  const from = getContactFrom();
  if (!key || !from || isForbiddenInbox(from)) {
    return { sent: false, reason: "no_transport" };
  }

  const soy = entry.role === "marca" ? "Marca" : "Shopper";
  const subject = `Curadario · ${soy} · ${entry.name}`;
  const text = [
    `Nombre: ${entry.name}`,
    `Email: ${entry.email}`,
    `Soy: ${soy}`,
    "",
    entry.message,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: entry.email,
        subject,
        text,
      }),
    });
    if (!response.ok) {
      return { sent: false, reason: "send_failed" };
    }
    return { sent: true, reason: "delivered" };
  } catch {
    return { sent: false, reason: "send_failed" };
  }
}
