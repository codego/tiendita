import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import {
  MAIL_CLICK_FOOTER,
  MAIL_CLICK_SUBJECT,
  buildMailClickPayload,
  merchantDashboardUrl,
  resolveMailClickRecipient,
  sendMailClickResend,
} from "../lib/mail-click.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

const htmlFile = read("emails/mail-click.html");
const textFile = read("emails/mail-click.txt");
const send = read("lib/send-contact.ts");
const mailClick = read("lib/mail-click.mjs");
const analytics = read("lib/analytics.ts");
const api = read("app/api/mail-click/route.ts");
const env = read("lib/env.ts");

test("click templates are Elena's locked html + plain", () => {
  assert.match(htmlFile, /<!DOCTYPE html>/);
  assert.match(htmlFile, /background:#EFE9DD/);
  assert.match(htmlFile, /color:#C8553D;">Con pinta\.</);
  assert.match(htmlFile, /display:none!important/);
  assert.match(htmlFile, /href="\{\{dashboard_url\}\}"/);
  assert.match(htmlFile, /text-decoration:underline/);
  assert.match(htmlFile, /Ver en Con pinta/);
  assert.equal(htmlFile.includes(MAIL_CLICK_FOOTER), true);
  assert.equal(htmlFile.includes(MAIL_CLICK_SUBJECT), true);
  assert.equal(htmlFile.includes("Curadario"), false);
  assert.equal(textFile.includes("Curadario"), false);
  assert.equal(MAIL_CLICK_SUBJECT.includes("Curadario"), false);

  assert.equal(
    textFile.replace(/\s+$/, ""),
    [
      "Alguien salió de Con pinta a tu ficha.",
      "",
      "Ver en Con pinta: {{dashboard_url}}",
      "",
      "No es un newsletter. Te avisamos cuando alguien toca Ir a la tienda.",
    ].join("\n"),
  );
});

test("send uses html+text, locked subject, and CONTACT_FROM", async () => {
  const from = "pola@example.com";
  const to = "taller@example.com";
  const dashboardUrl = merchantDashboardUrl("http://localhost:3000/");
  assert.equal(dashboardUrl, "http://localhost:3000/marcas/dashboard");

  let captured;
  const { ok, payload } = await sendMailClickResend({
    apiKey: "re_test",
    from,
    to,
    dashboardUrl,
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
  assert.equal(body.subject, MAIL_CLICK_SUBJECT);
  assert.equal(body.subject, "Alguien salió de Con pinta a tu ficha.");
  assert.ok(typeof body.html === "string" && body.html.length > 0);
  assert.ok(typeof body.text === "string" && body.text.length > 0);
  assert.equal(body.html, payload.html);
  assert.equal(body.text, payload.text);
  assert.match(body.html, /#EFE9DD/);
  assert.match(body.html, /href="http:\/\/localhost:3000\/marcas\/dashboard"/);
  assert.match(body.html, /Ver en Con pinta/);
  assert.match(
    body.text,
    /Ver en Con pinta: http:\/\/localhost:3000\/marcas\/dashboard/,
  );
  assert.equal(body.text.includes(MAIL_CLICK_FOOTER), true);

  const built = buildMailClickPayload({ from, to, dashboardUrl });
  assert.deepEqual(built, payload);

  assert.match(send, /deliverMailClick/);
  assert.match(send, /getContactFrom/);
  assert.match(send, /sendMailClickResend/);
  assert.match(mailClick, /html,/);
  assert.match(mailClick, /text,/);
  assert.match(mailClick, /subject: MAIL_CLICK_SUBJECT/);
  assert.match(env, /getContactFrom/);
  assert.equal(/from:\s*['"][^'"]*@curadario\.(com|la)/i.test(send), false);
  assert.equal(/from:\s*['"][^'"]*@curadario\.(com|la)/i.test(mailClick), false);
  assert.equal(send.includes("no-reply@curadario.com"), false);
  assert.equal(api.includes("no-reply@curadario.com"), false);
  assert.equal(mailClick.includes("no-reply@curadario.com"), false);
});

test("merchant To is store email, not Pola's inbox unless mock-only", () => {
  assert.equal(
    resolveMailClickRecipient({
      storeEmail: "marca@tienda.com",
      oauthConfigured: true,
      contactTo: "joacoditoma@gmail.com",
    }),
    "marca@tienda.com",
  );
  assert.equal(
    resolveMailClickRecipient({
      storeEmail: "",
      oauthConfigured: true,
      contactTo: "joacoditoma@gmail.com",
    }),
    "",
  );
  assert.equal(
    resolveMailClickRecipient({
      storeEmail: "",
      oauthConfigured: false,
      contactTo: "joacoditoma@gmail.com",
      mockMerchantCount: 1,
    }),
    "joacoditoma@gmail.com",
  );
  assert.equal(
    resolveMailClickRecipient({
      storeEmail: "",
      oauthConfigured: false,
      contactTo: "joacoditoma@gmail.com",
      mockMerchantCount: 3,
    }),
    "",
  );
  assert.equal(
    resolveMailClickRecipient({
      storeEmail: "marcas@curadario.com",
      oauthConfigured: false,
      contactTo: "joacoditoma@gmail.com",
    }),
    "joacoditoma@gmail.com",
  );
});

test("Ir a la tienda still persists locally and posts mail-click", () => {
  assert.match(analytics, /localStorage/);
  assert.match(analytics, /Alguien salió de Con pinta a tu ficha\./);
  assert.match(analytics, /\/api\/mail-click/);
  assert.match(api, /deliverMailClick/);
  assert.match(api, /fetchTnStoreEmail/);
  assert.match(api, /getContactFrom|deliverMailClick/);
  assert.match(send, /no_transport/);
});
