import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const recient = readFileSync(join(root, "lib/recien.ts"), "utf8");
const picker = readFileSync(join(root, "components/BrandPicker.tsx"), "utf8");
const shareSheet = readFileSync(join(root, "components/ShareSheet.tsx"), "utf8");

function mergeRecienOrder(seedIds, bumps) {
  const seen = new Set();
  const out = [];
  for (const bump of [...bumps].sort((a, b) => b.at - a.at)) {
    if (seen.has(bump.id)) continue;
    seen.add(bump.id);
    out.push(bump.id);
  }
  for (const id of seedIds) {
    if (seen.has(id)) continue;
    seen.add(id);
    out.push(id);
  }
  return out;
}

test("a new publish moves that card to the front of Recién", () => {
  const seedIds = ["tapado-coppola", "saco-frances", "blazer-crudo"];
  const after = mergeRecienOrder(seedIds, [
    { id: "blazer-crudo", at: 10 },
  ]);
  assert.equal(after[0], "blazer-crudo");
  assert.deepEqual(after.slice(1), ["tapado-coppola", "saco-frances"]);
  assert.match(recient, /bumpRecien/);
  assert.match(recient, /unshift/);
  assert.match(picker, /bumpRecien\(catalogIdsFromTn/);
  assert.match(picker, /routes\.landing/);
});

test("after share the shopper returns to the feed", () => {
  assert.match(shareSheet, /Mirá lo que encontré en Curadario\.|shareCopy\.headline/);
  assert.match(shareSheet, /routes\.landing/);
  assert.match(shareSheet, /Volver al feed/);
  assert.match(shareSheet, /router\.push\(routes\.landing\)/);
  assert.equal(shareSheet.includes("routes.coleccion"), false);
  assert.equal(shareSheet.includes("getTapaSkus"), false);
});
