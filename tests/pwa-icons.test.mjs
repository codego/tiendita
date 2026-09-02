import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

function pngSize(rel) {
  const buf = readFileSync(join(root, rel));
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

const manifest = read("app/manifest.ts");
const layout = read("app/layout.tsx");
const pwa = read("components/PwaPrompt.tsx");
const readme = read("README.md");

test("manifest ships Elena’s C icons and cream chrome", () => {
  assert.match(manifest, /name: "Curadario"/);
  assert.match(manifest, /short_name: "Curadario"/);
  assert.match(manifest, /start_url: "\/"/);
  assert.match(manifest, /display: "standalone"/);
  assert.match(manifest, /background_color: "#EFE9DD"/);
  assert.match(manifest, /theme_color: "#EFE9DD"/);
  assert.match(manifest, /\/icon-192\.png/);
  assert.match(manifest, /\/icon-512\.png/);
  assert.match(manifest, /\/icon-maskable-512\.png/);
  assert.match(manifest, /purpose: "maskable"/);
  assert.equal(manifest.includes('src: "/icon"'), false);
});

test("root layout wires apple-touch-icon, favicon, theme-color, splash", () => {
  assert.match(layout, /themeColor: "#EFE9DD"/);
  assert.match(layout, /favicon-32\.png/);
  assert.match(layout, /apple-touch-icon\.png/);
  assert.match(layout, /splash-cream\.png/);
  assert.match(layout, /startupImage/);
});

test("Agregar modal uses the C monogram file, not a placeholder letter", () => {
  assert.match(pwa, /\/icon-192\.png/);
  assert.equal(pwa.includes("font-serif text-[36px]"), false);
});

test("PWA icon files exist at the locked sizes and generated icon.tsx is gone", () => {
  assert.deepEqual(pngSize("public/icon-512.png"), { width: 512, height: 512 });
  assert.deepEqual(pngSize("public/icon-192.png"), { width: 192, height: 192 });
  assert.deepEqual(pngSize("public/icon-maskable-512.png"), {
    width: 512,
    height: 512,
  });
  assert.deepEqual(pngSize("public/apple-touch-icon.png"), {
    width: 180,
    height: 180,
  });
  assert.deepEqual(pngSize("public/favicon-32.png"), { width: 32, height: 32 });
  assert.equal(existsSync(join(root, "public/splash-cream.png")), true);
  assert.equal(existsSync(join(root, "app/icon.tsx")), false);
  assert.match(readme, /splash-cream\.png/);
  assert.match(readme, /No wordmark on the icon/);
});
