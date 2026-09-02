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
const stories = readFileSync(join(root, "components/RecienStories.tsx"), "utf8");
const recientPage = readFileSync(join(root, "app/recien/page.tsx"), "utf8");
const storeCta = readFileSync(join(root, "components/StoreCta.tsx"), "utf8");

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
  assert.match(picker, /routes\.marcas/);
  assert.match(catalogHome, /recient\.length > 0/);
  assert.match(railCard, /homeCopy\.recientBadge/);
  assert.equal(productCard.includes("recientBadge"), false);
  assert.equal(productCard.includes("RECIéN"), false);
});

test("Recién rail opens full-screen stories of new publishes only", () => {
  assert.match(recientPage, /RecienStories/);
  assert.match(stories, /homeCopy\.recientBadge/);
  assert.match(stories, /relativeHace/);
  assert.match(stories, /formatARSCode/);
  assert.match(stories, /Ir a la tienda|StoreCta/);
  assert.match(stories, /variant="cream"/);
  assert.match(stories, /variant="native"/);
  assert.match(stories, /homeCopy\.hero/);
  assert.match(stories, /routes\.landing/);
  assert.match(stories, /Anterior/);
  assert.match(stories, /Siguiente/);
  assert.match(railCard, /routes\.recientSku/);
  assert.match(catalogHome, /routes\.recient/);
  assert.match(storeCta, /Ir a la tienda →/);
  assert.equal(/sale|countdown|ruleta|roulette/i.test(stories), false);
  assert.equal(stories.includes("getTapaSkus"), false);
  assert.match(stories, /Nadie publicó todavía|emptyRecien/);
  assert.equal(stories.includes("router.replace"), false);
});

test("every card starts the finding share kit", () => {
  assert.match(shareButton, /Mirá lo que encontré en Curadario\.|shareCopy/);
  assert.match(shareButton, /compartirSku/);
  assert.match(shareButton, /findingShareText/);
  assert.match(shareButton, /native/);
  assert.match(productCard, /ShareFindingButton/);
  assert.match(railCard, /ShareFindingButton/);
  assert.match(shareSheet, /routes\.landing/);
  assert.match(shareSheet, /Volver al feed/);
  assert.match(shareSheet, /router\.push\(routes\.landing\)/);
  assert.match(shareSheet, /trackShare/);
  assert.match(shareButton, /trackShare/);
  assert.equal(shareSheet.includes("routes.coleccion"), false);
  assert.equal(shareSheet.includes("getTapaSkus"), false);
});
