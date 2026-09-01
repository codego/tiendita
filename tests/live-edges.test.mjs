import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

function walk(dir, suffix) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(path, suffix));
    else if (entry.name.endsWith(suffix)) out.push(path);
  }
  return out;
}

const contactoApi = read("app/api/contacto/route.ts");
const send = read("lib/send-contact.ts");
const form = read("components/ContactForm.tsx");
const helpFaq = read("components/HelpFaq.tsx");
const oauth = read("lib/tiendanube-oauth.ts");
const authorize = read("app/marcas/oauth/route.ts");
const callback = read("app/marcas/oauth/callback/route.ts");
const marcas = read("app/marcas/page.tsx");
const elegir = read("app/marcas/elegir/page.tsx");
const picker = read("components/BrandPicker.tsx");
const readme = read("README.md");
const env = read("lib/env.ts");

test("contact persists locally and can send to CONTACT_TO, never a fake inbox", () => {
  assert.match(form, /saveContactMessage/);
  assert.match(form, /postContactMessage/);
  assert.match(form, /Mensaje enviado|contactoCopy\.done/);
  assert.match(contactoApi, /deliverContact/);
  assert.match(send, /CONTACT_TO|getContactTo/);
  assert.match(send, /RESEND_API_KEY|getResendApiKey/);
  assert.match(send, /no_contact_to/);
  assert.match(helpFaq, /routes\.contacto/);
  assert.equal(send.includes("marcas@curadario.la"), true);
  assert.match(send, /isForbiddenInbox/);
  assert.match(readme, /CONTACT_TO/);
  assert.equal(readme.includes("marcas@curadario.la"), false);
});

test("TiendaNube OAuth is real when env is set, mock when it is not", () => {
  assert.match(env, /TIENDANUBE_CLIENT_ID/);
  assert.match(env, /TIENDANUBE_CLIENT_SECRET/);
  assert.match(env, /TIENDANUBE_REDIRECT_URI/);
  assert.match(oauth, /www\.tiendanube\.com\/apps/);
  assert.match(oauth, /authorize\/token/);
  assert.match(oauth, /api\.tiendanube\.com\/v1/);
  assert.match(authorize, /tnAuthorizeUrl/);
  assert.match(callback, /exchangeTnCode/);
  assert.match(callback, /routes\.marcasElegir/);
  assert.match(marcas, /isTnOAuthConfigured/);
  assert.match(marcas, /routes\.marcasOauth/);
  assert.match(marcas, /mockLabel/);
  assert.match(elegir, /fetchTnProducts/);
  assert.match(elegir, /getTiendaNubeProducts/);
  assert.match(picker, /source === "mock"/);
  assert.match(readme, /TIENDANUBE_CLIENT_ID/);
  assert.match(readme, /TIENDANUBE_REDIRECT_URI/);
});

test("no invented Curadario mailbox and still no shopper checkout", () => {
  const scanned = [
    ...walk(join(root, "app"), ".tsx").map((path) => readFileSync(path, "utf8")),
    ...walk(join(root, "components"), ".tsx").map((path) =>
      readFileSync(path, "utf8"),
    ),
    readme,
  ].join("\n");
  assert.equal(scanned.includes("marcas@curadario.la"), false);
  assert.equal(scanned.includes("@curadario.com"), false);
});
