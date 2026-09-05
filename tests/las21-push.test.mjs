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

function fold(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "");
}

const edges = read("lib/edges.ts");
const pushLib = read("lib/las21-push.ts");
const sheet = read("components/Las21PushSheet.tsx");
const scheduler = read("components/Las21PushScheduler.tsx");
const chrome = read("components/ShopperChrome.tsx");
const sw = read("public/sw.js");
const env = read("lib/env.ts");
const envExample = read(".env.example");
const readme = read("README.md");
const hook = read("app/api/las21/push/route.ts");
const catalogHome = read("components/CatalogHome.tsx");
const offlineBanner = read("components/OfflineBanner.tsx");
const time = read("lib/las21-time.mjs");
const osSheet = read("components/OsSettingsSheet.tsx");
const remind = read("components/RemindButton.tsx");
const toggle = read("components/AjustesPingToggle.tsx");
const layout = read("app/layout.tsx");

test("first-time sheet copy is Avisame a las 21, not a permission lecture", () => {
  assert.match(edges, /title: "Avisame a las 21\."/);
  assert.match(edges, /line: "Te avisamos cuando empieza el drop\."/);
  assert.match(edges, /quiet: "Sin spam\."/);
  assert.match(edges, /cta: "Avisame a las 21\."/);
  assert.match(edges, /later: "Ahora no"/);
  assert.match(edges, /curadario:las21-push-dismissed/);
  assert.match(sheet, /las21PushCopy\.title/);
  assert.match(sheet, /las21PushCopy\.line/);
  assert.match(sheet, /las21PushCopy\.quiet/);
  assert.match(sheet, /las21PushCopy\.cta/);
  assert.match(sheet, /las21PushCopy\.later/);
  assert.match(sheet, /Wordmark/);
  assert.match(sheet, /bg-cream/);
  assert.match(sheet, /backdrop-blur/);
  assert.match(sheet, /requestLas21Permission/);
  assert.match(sheet, /markPushSheetDismissed/);
  assert.match(sheet, /bg-ink/);
  assert.match(sheet, /border-ink/);
  assert.equal(sheet.includes("requestLas21Permission();"), true);
  assert.match(sheet, /onClick=\{markPushSheetDismissed\}/);
});

test("sheet waits until cookie and PWA, then remembers dismiss", () => {
  assert.match(chrome, /CookieBanner/);
  assert.match(chrome, /PwaIosSheet/);
  assert.match(chrome, /PwaPrompt/);
  assert.match(chrome, /Las21PushSheet/);
  assert.match(chrome, /Las21PushScheduler/);
  const cookie = chrome.indexOf("if (!cookieOk)");
  const iosSheet = chrome.indexOf("if (!iosDismissed)");
  const androidPrompt = chrome.indexOf("if (!androidHidden)");
  const pushSheet = chrome.indexOf("pushHidden ? null : <Las21PushSheet");
  assert.ok(cookie > 0 && iosSheet > cookie && androidPrompt > iosSheet);
  assert.ok(pushSheet > androidPrompt);
  assert.match(pushLib, /LAS21_PUSH_KEY/);
  assert.match(pushLib, /Notification\.requestPermission/);
  assert.match(pushLib, /markPushSheetDismissed/);
  assert.match(pushLib, /getServerPushSheetHidden/);
  assert.match(pushLib, /isStandaloneDisplay/);
  assert.match(pushLib, /openOsSettingsSheet/);
  assert.match(pushLib, /askNotificationPermission/);
  const ask = pushLib.indexOf("async function askNotificationPermission");
  const denied = pushLib.indexOf('permission === "denied"', ask);
  const request = pushLib.indexOf("Notification.requestPermission", ask);
  assert.ok(ask > 0 && denied > ask && request > denied);
  assert.match(osSheet, /osSettingsCopy/);
  assert.match(osSheet, /bg-cream/);
  assert.match(osSheet, /closeOsSettingsSheet/);
  assert.match(osSheet, /titleIos|isIosDevice/);
  assert.match(osSheet, /osSettingsCopy\.later/);
  assert.match(layout, /OsSettingsSheet/);
  assert.match(toggle, /openOsSettingsSheet/);
  assert.match(toggle, /notificationPermission\(\) === "denied"/);
  assert.match(remind, /openOsSettingsSheet/);
  assert.match(edges, /titleIos: "Abrí Ajustes del iPhone"/);
  assert.match(edges, /titleAndroid: "Abrí Ajustes"/);
  assert.equal(osSheet.includes("activar"), false);
});

test("20:55 notification copy and click go to /las21", () => {
  assert.match(time, /PUSH_TITLE = "Está pasando en Con pinta\."/);
  assert.match(time, /PUSH_BODY = "20 minutos\."/);
  assert.match(time, /PUSH_URL = "\/las21"/);
  assert.match(pushLib, /showNotification/);
  assert.match(pushLib, /PUSH_TITLE/);
  assert.match(pushLib, /PUSH_BODY/);
  assert.match(pushLib, /LAS21_PING_DAY_KEY/);
  assert.match(pushLib, /isForcePingParam/);
  assert.match(pushLib, /armLas21LocalPing/);
  assert.match(scheduler, /registerLas21Worker/);
  assert.match(scheduler, /armLas21LocalPing/);
  assert.match(sw, /Está pasando en Con pinta\./);
  assert.match(sw, /20 minutos\./);
  assert.match(sw, /\/las21/);
  assert.equal(sw.includes('PUSH_URL = "/"'), false);
  assert.match(sw, /notificationclick/);
  assert.match(sw, /openWindow/);
  assert.match(sw, /addEventListener\("push"/);
  assert.equal(sw.includes("Curadario"), false);
});

test("VAPID stays a placeholder; hook is 501 without keys", () => {
  assert.match(env, /NEXT_PUBLIC_VAPID_PUBLIC_KEY/);
  assert.match(env, /VAPID_PRIVATE_KEY/);
  assert.match(env, /isVapidConfigured/);
  assert.match(envExample, /NEXT_PUBLIC_VAPID_PUBLIC_KEY=/);
  assert.match(envExample, /VAPID_PRIVATE_KEY=/);
  assert.match(envExample, /VAPID_SUBJECT=mailto:joacoditoma@gmail.com/);
  assert.match(hook, /isVapidConfigured/);
  assert.match(hook, /status: 501/);
  assert.match(hook, /vapid/);
  assert.match(readme, /NEXT_PUBLIC_VAPID_PUBLIC_KEY/);
  assert.match(readme, /\/\?avisame=1/);
  assert.match(readme, /\/\?ping=1/);
  assert.match(readme, /mail=las21/);
  assert.match(pushLib, /requestLas21MerchantMail/);
  assert.match(pushLib, /forceSheetFromLocation/);
  assert.match(pushLib, /avisame/);
  assert.match(readme, /Avisame a las 21\./);
  assert.match(readme, /Está pasando en Con pinta\./);
  assert.match(readme, /20 minutos\./);
  assert.equal(/VAPID_PRIVATE_KEY=.+/.test(envExample.split("\n").find((line) => line.startsWith("VAPID_PRIVATE_KEY=")) || ""), false);
});

test("soft offline banner is untouched", () => {
  assert.match(catalogHome, /OfflineBanner/);
  assert.match(offlineBanner, /offlineBannerCopy/);
  assert.match(offlineBanner, /Sin conexión|offlineBannerCopy/);
});

test("UI never lectures about enabling notifications", () => {
  const scanned = [
    edges,
    sheet,
    scheduler,
    chrome,
    sw,
    hook,
    ...walk(join(root, "app"), ".tsx").map((path) => readFileSync(path, "utf8")),
    ...walk(join(root, "components"), ".tsx").map((path) =>
      readFileSync(path, "utf8"),
    ),
  ].join("\n");
  const flat = fold(scanned);
  assert.equal(flat.includes("activar notificacion"), false);
  assert.equal(flat.includes("activa las notificacion"), false);
  assert.equal(flat.includes("habilitar notificacion"), false);
  assert.equal(flat.includes("enable notification"), false);
  assert.equal(flat.includes("turn on notification"), false);
  assert.equal(scanned.includes("Curadario"), false);
});
