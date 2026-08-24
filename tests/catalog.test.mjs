import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const seed = JSON.parse(readFileSync(join(root, "data/seed.json"), "utf8"));

function formatARS(amount) {
  const digits = Math.round(amount).toString();
  const grouped = digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `$ ${grouped}`;
}

test("three collections and Banner 01 is only sastreria", () => {
  assert.equal(seed.collections.length, 3);
  const ids = seed.collections.map((c) => c.id).sort();
  assert.deepEqual(ids, [
    "lo-que-lleva-el-look",
    "sastreria-de-agosto",
    "un-solo-traje",
  ]);
  const onTapa = seed.collections.filter((c) => c.onTapa);
  assert.equal(onTapa.length, 1);
  assert.equal(onTapa[0].id, "sastreria-de-agosto");
  assert.deepEqual(
    seed.collections.map((c) => c.homeChip),
    ["Sastrería", "Carteras", "Trajes"],
  );
});

test("catalog is only the nine seed SKUs", () => {
  assert.equal(seed.skus.length, 9);
  const names = seed.skus.map((s) => s.name);
  assert.ok(names.every((name) => typeof name === "string" && name.length > 0));
  assert.ok(seed.skus.every((s) => s.brand && s.brand !== "PLACEHOLDER"));
  const blob = JSON.stringify(seed);
  assert.equal(blob.includes("Traje Roma"), false);
  assert.equal(blob.includes("Sobretodo Livorno"), false);
  assert.equal(blob.includes("Blazer Firenze"), false);
});

test("sastreria-de-agosto has the five launch pieces", () => {
  const skus = seed.skus.filter((s) => s.collection_id === "sastreria-de-agosto");
  assert.equal(skus.length, 5);
  assert.deepEqual(
    skus.map((s) => s.id),
    [
      "tapado-coppola",
      "saco-frances",
      "pantalon-pinza",
      "camisa-oxford",
      "mocasin-goma",
    ],
  );
});

test("carteras and swim live only in their own collections", () => {
  const toteBag = seed.skus.filter((s) =>
    ["tote", "baguette"].includes(s.category),
  );
  const swim = seed.skus.filter((s) =>
    ["bikini", "enteriza"].includes(s.category),
  );
  assert.equal(toteBag.length, 2);
  assert.ok(toteBag.every((s) => s.collection_id === "lo-que-lleva-el-look"));
  assert.equal(swim.length, 2);
  assert.ok(swim.every((s) => s.collection_id === "un-solo-traje"));
  assert.ok(
    seed.skus.every((s) => s.collection_id !== "sastreria-de-agosto" || !["tote", "baguette", "bikini", "enteriza"].includes(s.category)),
  );
});

test("featured tapado-coppola matches the ficha spec", () => {
  const sku = seed.skus.find((s) => s.id === "tapado-coppola");
  assert.equal(sku.brand, "Taller Recoleta");
  assert.equal(sku.name, "Tapado Coppola");
  assert.equal(sku.talle, "M");
  assert.equal(sku.tela, "Paño de lana");
  assert.equal(sku.corte, "Oversize");
  assert.equal(formatARS(sku.price_ars), "$ 890.000");
});

test("seed never prints PLACEHOLDER or hogar/deco", () => {
  const blob = JSON.stringify(seed).toLowerCase();
  assert.equal(blob.includes("placeholder"), false);
  assert.equal(blob.includes("mesa de domingo"), false);
  assert.equal(blob.includes("hogar"), false);
  assert.equal(blob.includes("deco"), false);
});
