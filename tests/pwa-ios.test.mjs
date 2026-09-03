import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

const edges = read("lib/edges.ts");
const pwaLib = read("lib/pwa.ts");
const ios = read("components/PwaIosSheet.tsx");
const android = read("components/PwaPrompt.tsx");
const chrome = read("components/ShopperChrome.tsx");
const readme = read("README.md");

test("iOS how-to copy is Elena's locked lines", () => {
  assert.match(edges, /Abrí Con pinta desde el home\./);
  assert.match(edges, /En iPhone, Safari no instala solo\./);
  assert.match(edges, /Tocá Compartir/);
  assert.match(edges, /Agregar a inicio/);
  assert.match(edges, /pwaIosCopy[\s\S]*add: "Agregar"/);
  assert.match(edges, /pwaIosCopy[\s\S]*later: "Ahora no"/);
  assert.match(edges, /curadario:pwa-ios-dismissed/);
  assert.match(ios, /pwaIosCopy\.title/);
  assert.match(ios, /pwaIosCopy\.sub/);
  assert.match(ios, /pwaIosCopy\.share/);
  assert.match(ios, /pwaIosCopy\.home/);
  assert.match(ios, /pwaIosCopy\.add/);
  assert.match(ios, /pwaIosCopy\.later/);
});

test("iOS sheet is a cream how-to, not a fake install CTA", () => {
  assert.match(ios, /bg-cream/);
  assert.match(ios, /bg-terracotta/);
  assert.match(ios, /font-serif/);
  assert.match(ios, /border-terracotta/);
  assert.match(ios, /rounded-full/);
  assert.match(ios, /fixed inset-0/);
  assert.match(ios, /markPwaIosDismissed/);
  assert.equal(ios.includes("beforeinstallprompt"), false);
  assert.equal(ios.includes(".prompt("), false);
  assert.equal((ios.match(/<button/g) || []).length, 1);
  assert.match(ios, /<button[\s\S]*pwaIosCopy\.later/);
  assert.match(ios, /<span[\s\S]*pwaIosCopy\.add/);
});

test("iOS sheet shows only on Safari, never standalone or after dismiss", () => {
  assert.match(pwaLib, /display-mode: standalone/);
  assert.match(pwaLib, /standalone/);
  assert.match(pwaLib, /iPhone\|iPad\|iPod/);
  assert.match(pwaLib, /CriOS/);
  assert.match(pwaLib, /PWA_IOS_KEY/);
  assert.match(pwaLib, /markPwaIosDismissed/);
  assert.match(pwaLib, /isIosSafari/);
  assert.match(pwaLib, /getPwaAndroidHidden/);
  assert.match(pwaLib, /isIosDevice\(\)/);
});

test("cookie wins, then the iOS sheet, then the Android prompt", () => {
  assert.match(chrome, /CookieBanner/);
  assert.match(chrome, /PwaIosSheet/);
  assert.match(chrome, /PwaPrompt/);
  const cookie = chrome.indexOf("if (!cookieOk)");
  const iosSheet = chrome.indexOf("if (!iosDismissed)");
  const androidPrompt = chrome.indexOf("if (!androidHidden)");
  assert.ok(cookie > 0 && iosSheet > cookie && androidPrompt > iosSheet);
  assert.match(chrome, /getPwaIosDismissed/);
  assert.match(chrome, /getPwaAndroidHidden/);
});

test("Android/desktop beforeinstallprompt modal stays", () => {
  assert.match(android, /beforeinstallprompt/);
  assert.match(android, /pwaCopy\.add/);
  assert.match(android, /pwaCopy\.later/);
  assert.match(android, /markPwaDismissed/);
  assert.match(edges, /curadario:pwa-later/);
  assert.match(readme, /beforeinstallprompt/);
  assert.match(readme, /curadario:pwa-ios-dismissed/);
});
