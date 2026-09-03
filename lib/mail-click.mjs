import { readFileSync } from "node:fs";
import { join } from "node:path";

export const MAIL_CLICK_SUBJECT = "Alguien salió de Con pinta a tu ficha.";
export const MAIL_CLICK_CTA = "Ver en Con pinta";
export const MAIL_CLICK_FOOTER =
  "No es un newsletter. Te avisamos cuando alguien toca Ir a la tienda.";
export const MAIL_CLICK_DASHBOARD_PATH = "/marcas/dashboard";

const CURADARIO_DOMAIN = /@curadario\.(com|la)\b/i;
const FORBIDDEN_INBOXES = ["marcas@curadario.la", "marcas@curadario.com"];

function emailsDir() {
  return join(process.cwd(), "emails");
}

export function isCuradarioDomainInbox(value) {
  const folded = String(value ?? "")
    .trim()
    .toLowerCase();
  if (!folded) return false;
  return (
    CURADARIO_DOMAIN.test(folded) ||
    FORBIDDEN_INBOXES.some((inbox) => folded.includes(inbox))
  );
}

export function merchantDashboardUrl(siteUrl) {
  const origin = String(siteUrl ?? "")
    .trim()
    .replace(/\/$/, "");
  return `${origin}${MAIL_CLICK_DASHBOARD_PATH}`;
}

export function loadMailClickTemplates() {
  return {
    html: readFileSync(join(emailsDir(), "mail-click.html"), "utf8"),
    text: readFileSync(join(emailsDir(), "mail-click.txt"), "utf8"),
  };
}

export function renderMailClickTemplates(dashboardUrl) {
  const { html, text } = loadMailClickTemplates();
  return {
    html: html.replaceAll("{{dashboard_url}}", dashboardUrl),
    text: text.replaceAll("{{dashboard_url}}", dashboardUrl),
  };
}

export function resolveMailClickRecipient({
  storeEmail,
  oauthConfigured,
  contactTo,
  mockMerchantCount = 1,
}) {
  const store = String(storeEmail ?? "").trim();
  if (store && !isCuradarioDomainInbox(store)) {
    return store;
  }
  if (!oauthConfigured && mockMerchantCount === 1) {
    const fallback = String(contactTo ?? "").trim();
    if (fallback && !isCuradarioDomainInbox(fallback)) {
      return fallback;
    }
  }
  return "";
}

export function buildMailClickPayload({ from, to, dashboardUrl }) {
  const { html, text } = renderMailClickTemplates(dashboardUrl);
  return {
    from,
    to: [to],
    subject: MAIL_CLICK_SUBJECT,
    html,
    text,
  };
}

export async function sendMailClickResend({
  apiKey,
  from,
  to,
  dashboardUrl,
  fetchImpl = globalThis.fetch,
}) {
  const payload = buildMailClickPayload({ from, to, dashboardUrl });
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
