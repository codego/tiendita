import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import {
  LAS21_MERCHANT_CTA,
  LAS21_MERCHANT_FOOTER,
  LAS21_MERCHANT_SUBJECT,
  buildLas21MerchantPayload,
  collectLas21MerchantRecipients,
  merchantCockpitUrl,
  merchantHasTonightPiece,
  resetLas21MerchantMailClaims,
  resolveLas21MerchantRecipient,
  sendLas21MerchantPush,
  sendLas21MerchantResend,
  shouldSendLas21MerchantNotice,
} from "../lib/mail-las21.mjs";
import { isForceMerchantMailParam, isInPingWindow } from "../lib/las21-time.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

function art(year, month, day, hour, minute, second = 0) {
  return Date.UTC(year, month - 1, day, hour + 3, minute, second);
}

const htmlFile = read("emails/las21-merchant.html");
const textFile = read("emails/las21-merchant.txt");
const send = read("lib/send-contact.ts");
const mailLas21 = read("lib/mail-las21.mjs");
const api = read("app/api/las21/merchant-mail/route.ts");
const env = read("lib/env.ts");
const pushLib = read("lib/las21-push.ts");
const layout = read("app/layout.tsx");
const qa = read("components/Las21MerchantMailQa.tsx");
const script = read("scripts/las21-merchant-mail.mjs");
const readme = read("README.md");
const pkg = read("package.json");

const drop = [
  { id: "tapado-coppola", brand: "Taller Recoleta" },
  { id: "saco-frances", brand: "Sastrería del Bajo" },
  { id: "pantalon-pinza", brand: "Paño Sur" },
];

test("merchant 20:55 templates are Elena's locked html + plain", () => {
  assert.match(htmlFile, /<!DOCTYPE html>/);
  assert.match(htmlFile, /background:#EFE9DD/);
  assert.match(htmlFile, /color:#C8553D;">\.<\/span>/);
  assert.match(htmlFile, /href="\{\{cockpit_url\}\}"/);
  assert.match(htmlFile, /text-decoration:underline/);
  assert.match(htmlFile, /Ver en el panel/);
  assert.equal(htmlFile.includes(LAS21_MERCHANT_FOOTER), true);
  assert.equal(htmlFile.includes(LAS21_MERCHANT_SUBJECT), true);
  assert.equal(htmlFile.includes("Curadario"), false);
  assert.equal(textFile.includes("Curadario"), false);
  assert.equal(LAS21_MERCHANT_SUBJECT.includes("Curadario"), false);
  assert.equal(htmlFile.includes("@conpinta.com"), false);
  assert.equal(htmlFile.includes("@curadario.com"), false);

  assert.equal(
    textFile.replace(/\s+$/, ""),
    [
      "Tu pieza está en Las 21. 20 minutos.",
      "",
      "Ver en el panel: {{cockpit_url}}",
      "",
      "Solo te avisamos si tu pieza entra al drop. No es un newsletter.",
    ].join("\n"),
  );
});

test("send uses html+text, locked subject, CONTACT_FROM, and /marcas", async () => {
  const from = "pola@example.com";
  const to = "taller@example.com";
  const cockpitUrl = merchantCockpitUrl("http://localhost:3000/");
  assert.equal(cockpitUrl, "http://localhost:3000/marcas");

  let captured;
  const { ok, payload } = await sendLas21MerchantResend({
    apiKey: "re_test",
    from,
    to,
    cockpitUrl,
    fetchImpl: async (url, init) => {
      captured = { url, init };
      return { ok: true };
    },
  });

  assert.equal(ok, true);
  assert.equal(captured.url, "https://api.resend.com/emails");
  const body = JSON.parse(captured.init.body);
  assert.equal(body.from, from);
  assert.equal(body.from, payload.from);
  assert.equal(/@curadario\.(com|la)/i.test(body.from), false);
  assert.equal(/@conpinta\.com/i.test(body.from), false);
  assert.equal(body.subject, LAS21_MERCHANT_SUBJECT);
  assert.equal(body.subject, "Tu pieza está en Las 21. 20 minutos.");
  assert.ok(typeof body.html === "string" && body.html.length > 0);
  assert.ok(typeof body.text === "string" && body.text.length > 0);
  assert.equal(body.html, payload.html);
  assert.equal(body.text, payload.text);
  assert.match(body.html, /#EFE9DD/);
  assert.match(body.html, /href="http:\/\/localhost:3000\/marcas"/);
  assert.match(body.html, /Ver en el panel/);
  assert.match(body.text, /Ver en el panel: http:\/\/localhost:3000\/marcas/);
  assert.equal(body.text.includes(LAS21_MERCHANT_FOOTER), true);
  assert.equal(body.html.includes("/marcas/dashboard"), false);

  const built = buildLas21MerchantPayload({ from, to, cockpitUrl });
  assert.deepEqual(built, payload);

  assert.match(send, /deliverLas21MerchantMail/);
  assert.match(send, /getContactFrom/);
  assert.match(send, /sendLas21MerchantResend/);
  assert.match(mailLas21, /subject: LAS21_MERCHANT_SUBJECT/);
  assert.match(env, /getContactFrom/);
  assert.equal(/from:\s*['"][^'"]*@curadario\.(com|la)/i.test(send), false);
  assert.equal(/from:\s*['"][^'"]*@conpinta\.com/i.test(send), false);
  assert.equal(/from:\s*['"][^'"]*@curadario\.(com|la)/i.test(mailLas21), false);
  assert.equal(send.includes("no-reply@curadario.com"), false);
  assert.equal(send.includes("no-reply@conpinta.com"), false);
  assert.equal(api.includes("no-reply@curadario.com"), false);
  assert.equal(api.includes("@conpinta.com"), false);
  assert.equal(mailLas21.includes("no-reply@conpinta.com"), false);
});

test("only merchants in tonight's drop get a To", () => {
  assert.equal(merchantHasTonightPiece("Taller Recoleta", drop), true);
  assert.equal(merchantHasTonightPiece("Paño Norte", drop), false);

  assert.equal(
    resolveLas21MerchantRecipient({
      storeName: "Taller Recoleta",
      storeEmail: "marca@tienda.com",
      oauthConfigured: true,
      contactTo: "joacoditoma@gmail.com",
      drop,
    }),
    "marca@tienda.com",
  );
  assert.equal(
    resolveLas21MerchantRecipient({
      storeName: "Paño Norte",
      storeEmail: "marca@tienda.com",
      oauthConfigured: true,
      contactTo: "joacoditoma@gmail.com",
      drop,
    }),
    "",
  );
  assert.equal(
    resolveLas21MerchantRecipient({
      storeName: "Taller Recoleta",
      storeEmail: "",
      oauthConfigured: true,
      contactTo: "joacoditoma@gmail.com",
      drop,
    }),
    "",
  );
  assert.equal(
    resolveLas21MerchantRecipient({
      storeName: "Taller Recoleta",
      storeEmail: "",
      oauthConfigured: false,
      contactTo: "joacoditoma@gmail.com",
      drop,
      mockStoreName: "Taller Recoleta",
    }),
    "joacoditoma@gmail.com",
  );
  assert.equal(
    resolveLas21MerchantRecipient({
      storeName: "Sastrería del Bajo",
      storeEmail: "",
      oauthConfigured: false,
      contactTo: "joacoditoma@gmail.com",
      drop,
      mockStoreName: "Taller Recoleta",
    }),
    "",
  );
  assert.equal(
    resolveLas21MerchantRecipient({
      storeName: "Taller Recoleta",
      storeEmail: "marcas@curadario.com",
      oauthConfigured: false,
      contactTo: "joacoditoma@gmail.com",
      drop,
      mockStoreName: "Taller Recoleta",
    }),
    "joacoditoma@gmail.com",
  );

  const collected = collectLas21MerchantRecipients({
    drop,
    storeEmailsByBrand: { "Sastrería del Bajo": "bajo@tienda.com" },
    oauthConfigured: false,
    contactTo: "joacoditoma@gmail.com",
    mockStoreName: "Taller Recoleta",
  });
  assert.deepEqual(collected, [
    { brand: "Taller Recoleta", to: "joacoditoma@gmail.com" },
    { brand: "Sastrería del Bajo", to: "bajo@tienda.com" },
  ]);
});

test("20:55 window and floor gate the merchant notice", () => {
  resetLas21MerchantMailClaims();
  const open = art(2026, 9, 1, 20, 55, 0);
  const afternoon = art(2026, 9, 1, 15, 0, 0);
  assert.equal(isInPingWindow(open), true);
  assert.equal(
    shouldSendLas21MerchantNotice({
      storeName: "Taller Recoleta",
      drop,
      now: open,
    }),
    true,
  );
  assert.equal(
    shouldSendLas21MerchantNotice({
      storeName: "Taller Recoleta",
      drop,
      now: afternoon,
    }),
    false,
  );
  assert.equal(
    shouldSendLas21MerchantNotice({
      storeName: "Taller Recoleta",
      drop,
      now: afternoon,
      force: true,
    }),
    true,
  );
  assert.equal(
    shouldSendLas21MerchantNotice({
      storeName: "Paño Norte",
      drop,
      now: open,
      force: true,
    }),
    false,
  );
  assert.equal(
    shouldSendLas21MerchantNotice({
      storeName: "Taller Recoleta",
      drop: drop.slice(0, 2),
      now: open,
      force: true,
    }),
    false,
  );
  assert.equal(isForceMerchantMailParam("las21"), true);
  assert.equal(isForceMerchantMailParam("1"), false);
});

test("merchant push is stubbed with the same copy", async () => {
  const skipped = await sendLas21MerchantPush({
    storeName: "Paño Norte",
    drop,
  });
  assert.deepEqual(skipped, { sent: false, reason: "not_in_drop" });
  const stub = await sendLas21MerchantPush({
    storeName: "Taller Recoleta",
    drop,
  });
  assert.deepEqual(stub, { sent: false, reason: "no_merchant_push_opt_in" });
  assert.equal(LAS21_MERCHANT_CTA, "Ver en el panel");
  assert.match(mailLas21, /no_merchant_push_opt_in/);
  assert.match(send, /sendLas21MerchantPush/);
});

test("shopper ping, QA ?mail=las21, and script wire the same hook", () => {
  assert.match(pushLib, /requestLas21MerchantMail/);
  assert.match(pushLib, /showLas21Notification/);
  assert.match(pushLib, /routes\.las21MerchantMail/);
  assert.match(qa, /forceMerchantMailFromLocation/);
  assert.match(qa, /requestLas21MerchantMail\(true\)/);
  assert.match(layout, /Las21MerchantMailQa/);
  assert.match(api, /deliverLas21MerchantMail/);
  assert.match(api, /isForceMerchantMailParam/);
  assert.match(script, /\/api\/las21\/merchant-mail/);
  assert.match(pkg, /mail:las21/);
  assert.match(readme, /Tu pieza está en Las 21\. 20 minutos\./);
  assert.match(readme, /mail=las21/);
  assert.match(readme, /Ver en el panel/);
  assert.match(readme, /CONTACT_FROM/);
  assert.equal(readme.includes("no-reply@conpinta.com"), false);
  assert.equal(readme.includes("marcas@curadario.la"), false);
});
