function read(name: string): string {
  return (process.env[name] ?? "").trim();
}

export function getContactTo(): string {
  return read("CONTACT_TO");
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
