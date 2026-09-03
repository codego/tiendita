function read(name: string): string {
  return (process.env[name] ?? "").trim();
}

/** Until Con pinta has its own inbox. Override with CONTACT_TO. */
export const DEFAULT_CONTACT_TO = "joacoditoma@gmail.com";

export function getContactTo(): string {
  return read("CONTACT_TO") || DEFAULT_CONTACT_TO;
}

export function getContactFrom(): string {
  return read("CONTACT_FROM");
}

export function getResendApiKey(): string {
  return read("RESEND_API_KEY");
}

export function getTnClientId(): string {
  return read("TIENDANUBE_CLIENT_ID");
}

export function getTnClientSecret(): string {
  return read("TIENDANUBE_CLIENT_SECRET");
}

export function getTnRedirectUri(): string {
  return read("TIENDANUBE_REDIRECT_URI");
}

export function isTnOAuthConfigured(): boolean {
  return Boolean(getTnClientId() && getTnClientSecret() && getTnRedirectUri());
}

/** Public origin for OG / WhatsApp previews. Local default until you set one. */
export const DEFAULT_SITE_URL = "http://localhost:3000";

export function getSiteUrl(): string {
  return read("NEXT_PUBLIC_SITE_URL").replace(/\/$/, "") || DEFAULT_SITE_URL;
}
