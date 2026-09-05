import type { ContactMessage } from "@/lib/contacto";
import {
  getContactFrom,
  getContactTo,
  getResendApiKey,
  getSiteUrl,
  isTnOAuthConfigured,
} from "@/lib/env";
import {
  getTonightDrop,
  isInPingWindow,
  meetsLas21Floor,
  pingDayKey,
  tonightStoreCount,
} from "@/lib/las21";
import { getTiendaNubeStore } from "@/lib/tiendanube";
import {
  isCuradarioDomainInbox,
  merchantDashboardUrl,
  resolveMailClickRecipient,
  sendMailClickResend,
} from "./mail-click.mjs";
import {
  collectLas21MerchantRecipients,
  markLas21MerchantMailClaimed,
  merchantCockpitUrl,
  merchantHasTonightPiece,
  resolveLas21MerchantRecipient,
  sendLas21MerchantPush,
  sendLas21MerchantResend,
  wasLas21MerchantMailClaimed,
} from "./mail-las21.mjs";

export type ContactDelivery = {
  sent: boolean;
  reason: "delivered" | "no_contact_to" | "no_transport" | "send_failed";
};

export type Las21MerchantDelivery = {
  sent: boolean;
  reason:
    | "delivered"
    | "no_contact_to"
    | "no_transport"
    | "send_failed"
    | "not_in_drop"
    | "already_sent"
    | "not_ping_window"
    | "below_floor";
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
  const subject = `Con pinta · ${soy} · ${entry.name}`;
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

export async function deliverMailClick(
  storeEmail?: string | null,
): Promise<ContactDelivery> {
  const to = resolveMailClickRecipient({
    storeEmail,
    oauthConfigured: isTnOAuthConfigured(),
    contactTo: getContactTo(),
    mockMerchantCount: 1,
  });
  if (!to) {
    return { sent: false, reason: "no_contact_to" };
  }

  const key = getResendApiKey();
  const from = getContactFrom();
  if (!key || !from || isForbiddenInbox(from) || isCuradarioDomainInbox(from)) {
    return { sent: false, reason: "no_transport" };
  }

  try {
    const { ok } = await sendMailClickResend({
      apiKey: key,
      from,
      to,
      dashboardUrl: merchantDashboardUrl(getSiteUrl()),
    });
    if (!ok) {
      return { sent: false, reason: "send_failed" };
    }
    return { sent: true, reason: "delivered" };
  } catch {
    return { sent: false, reason: "send_failed" };
  }
}

export async function deliverLas21MerchantMail(input: {
  storeName?: string | null;
  storeEmail?: string | null;
  storeEmailsByBrand?: Record<string, string>;
  force?: boolean;
  now?: number;
} = {}): Promise<Las21MerchantDelivery> {
  const drop = getTonightDrop();
  const now = input.now ?? Date.now();

  if (!meetsLas21Floor(tonightStoreCount(drop))) {
    return { sent: false, reason: "below_floor" };
  }
  if (!input.force && !isInPingWindow(now)) {
    return { sent: false, reason: "not_ping_window" };
  }

  const day = pingDayKey(now);
  if (!input.force && wasLas21MerchantMailClaimed(day)) {
    return { sent: false, reason: "already_sent" };
  }

  const mockStoreName = getTiendaNubeStore().name;
  const oauthConfigured = isTnOAuthConfigured();
  const contactTo = getContactTo();

  let recipients: { brand: string; to: string }[] = [];
  if (input.storeName) {
    if (!merchantHasTonightPiece(input.storeName, drop)) {
      return { sent: false, reason: "not_in_drop" };
    }
    const to = resolveLas21MerchantRecipient({
      storeName: input.storeName,
      storeEmail: input.storeEmail,
      oauthConfigured,
      contactTo,
      drop,
      mockStoreName,
    });
    if (!to) {
      return { sent: false, reason: "no_contact_to" };
    }
    recipients = [{ brand: input.storeName, to }];
  } else {
    recipients = collectLas21MerchantRecipients({
      drop,
      storeEmailsByBrand: input.storeEmailsByBrand ?? {},
      oauthConfigured,
      contactTo,
      mockStoreName,
    });
    if (recipients.length === 0) {
      return { sent: false, reason: "no_contact_to" };
    }
  }

  for (const recipient of recipients) {
    await sendLas21MerchantPush({ storeName: recipient.brand, drop });
  }

  const key = getResendApiKey();
  const from = getContactFrom();
  if (!key || !from || isForbiddenInbox(from) || isCuradarioDomainInbox(from)) {
    return { sent: false, reason: "no_transport" };
  }

  const cockpitUrl = merchantCockpitUrl(getSiteUrl());
  let anyOk = false;
  try {
    for (const recipient of recipients) {
      const { ok } = await sendLas21MerchantResend({
        apiKey: key,
        from,
        to: recipient.to,
        cockpitUrl,
      });
      if (ok) anyOk = true;
    }
  } catch {
    return { sent: false, reason: "send_failed" };
  }

  if (!anyOk) {
    return { sent: false, reason: "send_failed" };
  }
  if (!input.force) {
    markLas21MerchantMailClaimed(day);
  }
  return { sent: true, reason: "delivered" };
}
