import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const recient = readFileSync(join(root, "lib/recien.ts"), "utf8");
const picker = readFileSync(join(root, "components/BrandPicker.tsx"), "utf8");
const shareSheet = readFileSync(join(root, "components/ShareSheet.tsx"), "utf8");
const productCard = readFileSync(join(root, "components/ProductCard.tsx"), "utf8");
const railCard = readFileSync(join(root, "components/RailCard.tsx"), "utf8");
const catalogHome = readFileSync(join(root, "components/CatalogHome.tsx"), "utf8");
const shareButton = readFileSync(
  join(root, "components/ShareFindingButton.tsx"),
  "utf8",
);

function recientFromBumps(bumps) {
  return [...bumps]
    .sort((a, b) => b.at - a.at)
    .map((bump) => bump.id);
}

test("Recién is only newly published bumps, not the catalog", () => {
  assert.deepEqual(
    recientFromBumps([{ id: "blazer-crudo", at: 10 }]),
    ["blazer-crudo"],
  );
  assert.match(recient, /bumpRecien/);
  assert.match(recient, /unshift/);
  assert.match(recient, /return \[\];/);
  assert.equal(recient.includes("for (const id of seedIds)"), false);
  assert.match(picker, /bumpRecien\(catalogIdsFromTn/);
  assert.match(picker, /routes\.landing/);
  assert.match(catalogHome, /recient\.length > 0/);
  assert.match(railCard, /homeCopy\.recientBadge/);
  assert.equal(productCard.includes("recientBadge"), false);
  assert.equal(productCard.includes("RECIéN"), false);
});

test("every card starts the finding share kit", () => {
  assert.match(shareButton, /Mirá lo que encontré en Curadario\.|shareCopy/);
  assert.match(shareButton, /compartirSku/);
  assert.match(productCard, /ShareFindingButton/);
  assert.match(railCard, /ShareFindingButton/);
  assert.match(shareSheet, /routes\.landing/);
  assert.match(shareSheet, /Volver al feed/);
  assert.match(shareSheet, /router\.push\(routes\.landing\)/);
  assert.equal(shareSheet.includes("routes.coleccion"), false);
  assert.equal(shareSheet.includes("getTapaSkus"), false);
});
