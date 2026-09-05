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
const routes = read("lib/routes.ts");
const pushLib = read("lib/las21-push.ts");
const sheet = read("components/Las21PushSheet.tsx");
const scheduler = read("components/Las21PushScheduler.tsx");
const chrome = read("components/ShopperChrome.tsx");
const page = read("app/ajustes/page.tsx");
const toggle = read("components/AjustesPingToggle.tsx");
const menu = read("components/SiteMenu.tsx");
const links = read("components/SiteLinks.tsx");
const home = read("components/CatalogHome.tsx");
const onboarding = read("components/ShopperOnboarding.tsx");
const offlineBanner = read("components/OfflineBanner.tsx");
const catalogHome = read("components/CatalogHome.tsx");
const dashboard = read("components/BrandDashboard.tsx");
const readme = read("README.md");

test("ajustes is a cream Con pinta page with the Avisame toggle", () => {
  assert.match(routes, /ajustes: "\/ajustes"/);
  assert.match(edges, /title: "Ajustes"/);
  assert.match(edges, /toggle: "Avisame a las 21\."/);
  assert.match(edges, /blocked: "El teléfono no deja\."/);
  assert.match(edges, /ayuda: "Ayuda"/);
  assert.match(edges, /privacidad: "Privacidad"/);
  assert.match(edges, /curadario:las21-push-off/);
  assert.match(page, /AjustesPingToggle/);
  assert.match(page, /Las21PushScheduler/);
  assert.match(page, /bg-cream/);
  assert.match(page, /Wordmark/);
  assert.match(page, /SiteMenu/);
  assert.match(page, /ajustesCopy\.title/);
  assert.match(page, /ajustesCopy\.ayuda/);
  assert.match(page, /ajustesCopy\.privacidad/);
  assert.match(page, /routes\.ayuda/);
  assert.match(page, /routes\.privacidad/);
  assert.match(page, /Ajustes — Con pinta/);
  assert.equal(page.includes("cuenta"), false);
  assert.equal(page.includes("email"), false);
  assert.equal(page.includes("Curadario"), false);
  assert.match(toggle, /ajustesCopy\.toggle/);
  assert.match(toggle, /role="switch"/);
  assert.match(toggle, /optInLas21Ping/);
  assert.match(toggle, /optOutLas21Ping/);
  assert.match(toggle, /getLas21PingEnabled/);
  assert.match(toggle, /getLas21PingBlocked/);
  assert.match(toggle, /ajustesCopy\.blocked/);
  assert.match(readme, /\/ajustes/);
  assert.match(readme, /Avisame a las 21\./);
});

test("Ajustes is reachable from the shopper hamburger and home footer", () => {
  assert.match(menu, /routes\.ajustes/);
  assert.match(menu, /Ajustes/);
  assert.match(links, /routes\.ajustes/);
  assert.match(links, /Ajustes/);
  assert.match(home, /SiteMenu/);
});

test("toggle on/off uses the same Las 21 ping flow and stays honest", () => {
  assert.match(pushLib, /optInLas21Ping/);
  assert.match(pushLib, /optOutLas21Ping/);
  assert.match(pushLib, /clearPushSheetDismissed|removeItem\(LAS21_PUSH_KEY\)/);
  assert.match(pushLib, /Notification\.requestPermission/);
  assert.match(pushLib, /LAS21_PUSH_OFF_KEY/);
  assert.match(pushLib, /isLas21OptedOut/);
  assert.match(pushLib, /hasNotificationPermission\(\) && !isLas21OptedOut/);
  assert.match(pushLib, /permission === "denied"/);
  assert.match(pushLib, /armLas21LocalPing/);
  assert.match(pushLib, /isLas21OptedOut\(\)/);
  assert.match(scheduler, /armLas21LocalPing/);
  const plan = pushLib.indexOf("function plan()");
  const gate = pushLib.indexOf("isLas21OptedOut()", plan);
  assert.ok(plan > 0 && gate > plan);
});

test("first-time sheet, offline banner, onboarding, and cockpit stay put", () => {
  assert.match(sheet, /las21PushCopy\.cta/);
  assert.match(sheet, /las21PushCopy\.later/);
  assert.match(sheet, /requestLas21Permission/);
  assert.match(sheet, /markPushSheetDismissed/);
  assert.match(chrome, /Las21PushSheet/);
  assert.match(chrome, /CookieBanner/);
  assert.match(chrome, /PwaIosSheet/);
  assert.match(chrome, /PwaPrompt/);
  assert.match(catalogHome, /OfflineBanner/);
  assert.match(offlineBanner, /offlineBannerCopy/);
  assert.match(onboarding, /onboardingSlides/);
  assert.match(dashboard, /dashboardCopy/);
  assert.equal(dashboard.includes("AjustesPingToggle"), false);
});

test("ajustes never lectures about enabling notifications", () => {
  const scanned = [
    edges,
    page,
    toggle,
    pushLib,
    menu,
    links,
    readme,
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
