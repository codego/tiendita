export const MAIL_CLICK_SUBJECT: "Alguien salió de Curadario a tu ficha.";
export const MAIL_CLICK_CTA: "Ver en Curadario";
export const MAIL_CLICK_FOOTER: "No es un newsletter. Te avisamos cuando alguien toca Ir a la tienda.";
export const MAIL_CLICK_DASHBOARD_PATH: "/marcas/dashboard";

export function isCuradarioDomainInbox(value: string | null | undefined): boolean;

export function merchantDashboardUrl(siteUrl: string): string;

export function loadMailClickTemplates(): { html: string; text: string };

export function renderMailClickTemplates(dashboardUrl: string): {
  html: string;
  text: string;
};

export function resolveMailClickRecipient(input: {
  storeEmail?: string | null;
  oauthConfigured: boolean;
  contactTo?: string | null;
  mockMerchantCount?: number;
}): string;

export function buildMailClickPayload(input: {
  from: string;
  to: string;
  dashboardUrl: string;
}): {
  from: string;
  to: string[];
  subject: string;
  html: string;
  text: string;
};

export function sendMailClickResend(input: {
  apiKey: string;
  from: string;
  to: string;
  dashboardUrl: string;
  fetchImpl?: typeof fetch;
}): Promise<{
  ok: boolean;
  payload: ReturnType<typeof buildMailClickPayload>;
}>;
