import { readFileSync } from "node:fs";
import { join } from "node:path";
import { isCuradarioDomainInbox } from "./mail-click.mjs";
import {
  LAS21_FLOOR,
  isForceMerchantMailParam,
  isInPingWindow,
  pingDayKey,
} from "./las21-time.mjs";

export { isForceMerchantMailParam };

export const LAS21_MERCHANT_SUBJECT = "Tu pieza está en Las 21. 20 minutos.";
export const LAS21_MERCHANT_CTA = "Ver en el panel";
export const LAS21_MERCHANT_FOOTER =
  "Solo te avisamos si tu pieza entra al drop. No es un newsletter.";
export const LAS21_MERCHANT_COCKPIT_PATH = "/marcas";
export const LAS21_MERCHANT_MAIL_PARAM = "las21";
export const LAS21_MERCHANT_PUSH_TITLE = LAS21_MERCHANT_SUBJECT;
export const LAS21_MERCHANT_PUSH_BODY = LAS21_MERCHANT_SUBJECT;
export const LAS21_MERCHANT_PUSH_URL = LAS21_MERCHANT_COCKPIT_PATH;

const claimedDays = new Set();

function emailsDir() {
  return join(process.cwd(), "emails");
}

export function merchantCockpitUrl(siteUrl) {
  const origin = String(siteUrl ?? "")
    .trim()
    .replace(/\/$/, "");
  return `${origin}${LAS21_MERCHANT_COCKPIT_PATH}`;
}

export function merchantHasTonightPiece(storeName, drop) {
  const name = String(storeName ?? "").trim();
  if (!name || !Array.isArray(drop)) return false;
  return drop.some((sku) => sku?.brand === name);
}

export function shouldSendLas21MerchantNotice({
  storeName,
  drop,
  now = Date.now(),
  force = false,
  alreadySent = false,
}) {
  if (!merchantHasTonightPiece(storeName, drop)) return false;
  if (!Array.isArray(drop) || drop.length < LAS21_FLOOR) return false;
  if (force) return true;
  if (alreadySent) return false;
  return isInPingWindow(now);
}

export function wasLas21MerchantMailClaimed(dayKey) {
  return claimedDays.has(String(dayKey ?? ""));
}

export function markLas21MerchantMailClaimed(dayKey) {
  const key = String(dayKey ?? "");
  if (key) claimedDays.add(key);
}

export function resetLas21MerchantMailClaims() {
  claimedDays.clear();
}

export function claimLas21MerchantMailDay(now = Date.now(), { force = false } = {}) {
  if (force) return true;
  const key = pingDayKey(now);
  if (claimedDays.has(key)) return false;
  claimedDays.add(key);
  return true;
}

export function loadLas21MerchantTemplates() {
  return {
    html: readFileSync(join(emailsDir(), "las21-merchant.html"), "utf8"),
    text: readFileSync(join(emailsDir(), "las21-merchant.txt"), "utf8"),
  };
}

export function renderLas21MerchantTemplates(cockpitUrl) {
  const { html, text } = loadLas21MerchantTemplates();
  return {
    html: html.replaceAll("{{cockpit_url}}", cockpitUrl),
    text: text.replaceAll("{{cockpit_url}}", cockpitUrl),
  };
}

export function resolveLas21MerchantRecipient({
  storeName,
  storeEmail,
  oauthConfigured,
  contactTo,
  drop,
  mockStoreName,
}) {
  if (!merchantHasTonightPiece(storeName, drop)) return "";
  const store = String(storeEmail ?? "").trim();
  if (store && !isCuradarioDomainInbox(store)) {
    return store;
  }
  const mockName = String(mockStoreName ?? "").trim();
  if (!oauthConfigured && mockName && storeName === mockName) {
    const fallback = String(contactTo ?? "").trim();
    if (fallback && !isCuradarioDomainInbox(fallback)) {
      return fallback;
    }
  }
  return "";
}

export function collectLas21MerchantRecipients({
  drop,
  storeEmailsByBrand = {},
  oauthConfigured,
  contactTo,
  mockStoreName,
}) {
  const recipients = [];
  const seen = new Set();
  if (!Array.isArray(drop)) return recipients;
  for (const sku of drop) {
    const brand = String(sku?.brand ?? "").trim();
    if (!brand || seen.has(brand)) continue;
    seen.add(brand);
    const to = resolveLas21MerchantRecipient({
      storeName: brand,
      storeEmail: storeEmailsByBrand[brand],
      oauthConfigured,
      contactTo,
      drop,
      mockStoreName,
    });
    if (to) recipients.push({ brand, to });
  }
  return recipients;
}

export function buildLas21MerchantPayload({ from, to, cockpitUrl }) {
  const { html, text } = renderLas21MerchantTemplates(cockpitUrl);
  return {
    from,
    to: [to],
    subject: LAS21_MERCHANT_SUBJECT,
    html,
    text,
  };
}

export async function sendLas21MerchantResend({
  apiKey,
  from,
  to,
  cockpitUrl,
  fetchImpl = globalThis.fetch,
}) {
  const payload = buildLas21MerchantPayload({ from, to, cockpitUrl });
  const response = await fetchImpl("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return { ok: Boolean(response?.ok), payload };
}

/** No merchant push opt-in yet — same copy, no send. */
export async function sendLas21MerchantPush({ storeName, drop } = {}) {
  if (storeName && drop && !merchantHasTonightPiece(storeName, drop)) {
    return { sent: false, reason: "not_in_drop" };
  }
  return { sent: false, reason: "no_merchant_push_opt_in" };
}
