import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const markosSource = readFileSync(join(root, "lib/markos.ts"), "utf8");
const landingSource = readFileSync(join(root, "app/page.tsx"), "utf8");
const seed = JSON.parse(readFileSync(join(root, "data/seed.json"), "utf8"));

test("Markos landing copy is exact", () => {
  assert.match(markosSource, /COLECCIÓN · 01/);
  assert.match(markosSource, /Sastrería de agosto/);
  assert.match(markosSource, /Cinco piezas\. Un look\. Un lugar\./);
  assert.match(
    markosSource,
    /Marcas de indumentaria, juntas\. Vos descubrís\. Ellas venden en su tienda\./,
  );
  assert.match(markosSource, /Ver Sastrería de agosto/);
  assert.match(markosSource, /Entrá a un look, no a un mall\./);
  assert.match(markosSource, /Elegí la pieza, con la marca a la vista\./);
  assert.match(markosSource, /Tocá y vas a su tienda\./);
  assert.match(markosSource, /Curadario no vende\./);
  assert.equal([...markosSource.matchAll(/Entrá a un look/g)].length, 1);
});

test("landing uses /app routes and only sastrería helpers", () => {
  assert.match(landingSource, /routes\.coleccion/);
  assert.match(landingSource, /routes\.app/);
  assert.match(landingSource, /routes\.marcas/);
  assert.match(landingSource, /brandCopy\.landingCta/);
  assert.match(landingSource, /getTapaSkus/);
  assert.equal(landingSource.includes("lo-que-lleva-el-look"), false);
  assert.equal(landingSource.includes("un-solo-traje"), false);
  assert.equal(landingSource.includes("Tote"), false);
  assert.equal(landingSource.includes("Bikini"), false);
  assert.equal(landingSource.includes("Enteriza"), false);
  assert.equal(landingSource.includes("Leonardo"), false);
  assert.equal(landingSource.includes("Portsaid"), false);
  assert.equal(landingSource.includes("Lorenzo"), false);
});

test("landing thumbs come from the five sastrería SKUs", () => {
  const tapa = seed.skus.filter((s) => s.collection_id === "sastreria-de-agosto");
  assert.equal(tapa.length, 5);
  assert.ok(tapa.every((s) => s.brand && s.name));
});
