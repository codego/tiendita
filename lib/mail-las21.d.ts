export const LAS21_MERCHANT_SUBJECT: "Tu pieza está en Las 21. 20 minutos.";
export const LAS21_MERCHANT_CTA: "Ver en el panel";
export const LAS21_MERCHANT_FOOTER: "Solo te avisamos si tu pieza entra al drop. No es un newsletter.";
export const LAS21_MERCHANT_COCKPIT_PATH: "/marcas";
export const LAS21_MERCHANT_MAIL_PARAM: "las21";
export const LAS21_MERCHANT_PUSH_TITLE: "Tu pieza está en Las 21. 20 minutos.";
export const LAS21_MERCHANT_PUSH_BODY: "Tu pieza está en Las 21. 20 minutos.";
export const LAS21_MERCHANT_PUSH_URL: "/marcas";

export function isForceMerchantMailParam(mail: string | undefined): boolean;

export function merchantCockpitUrl(siteUrl: string): string;

export function merchantHasTonightPiece(
  storeName: string | null | undefined,
  drop: ReadonlyArray<{ brand?: string | null }> | null | undefined,
): boolean;

export function shouldSendLas21MerchantNotice(input: {
  storeName: string | null | undefined;
  drop: ReadonlyArray<{ brand?: string | null }> | null | undefined;
  now?: number;
  force?: boolean;
  alreadySent?: boolean;
}): boolean;

export function wasLas21MerchantMailClaimed(dayKey: string): boolean;
export function markLas21MerchantMailClaimed(dayKey: string): void;
export function resetLas21MerchantMailClaims(): void;
export function claimLas21MerchantMailDay(
  now?: number,
  opts?: { force?: boolean },
): boolean;

export function loadLas21MerchantTemplates(): { html: string; text: string };

export function renderLas21MerchantTemplates(cockpitUrl: string): {
  html: string;
  text: string;
};

export function resolveLas21MerchantRecipient(input: {
  storeName: string;
  storeEmail?: string | null;
  oauthConfigured: boolean;
  contactTo?: string | null;
  drop: ReadonlyArray<{ brand?: string | null }>;
  mockStoreName?: string | null;
}): string;

export function collectLas21MerchantRecipients(input: {
  drop: ReadonlyArray<{ brand?: string | null }>;
  storeEmailsByBrand?: Record<string, string>;
  oauthConfigured: boolean;
  contactTo?: string | null;
  mockStoreName?: string | null;
}): Array<{ brand: string; to: string }>;

export function buildLas21MerchantPayload(input: {
  from: string;
  to: string;
  cockpitUrl: string;
}): {
  from: string;
  to: string[];
  subject: string;
  html: string;
  text: string;
};

export function sendLas21MerchantResend(input: {
  apiKey: string;
  from: string;
  to: string;
  cockpitUrl: string;
  fetchImpl?: typeof fetch;
}): Promise<{
  ok: boolean;
  payload: ReturnType<typeof buildLas21MerchantPayload>;
}>;

export function sendLas21MerchantPush(input?: {
  storeName?: string;
  drop?: ReadonlyArray<{ brand?: string | null }>;
}): Promise<{ sent: false; reason: "not_in_drop" | "no_merchant_push_opt_in" }>;
