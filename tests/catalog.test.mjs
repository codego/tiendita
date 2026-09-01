import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const seed = JSON.parse(readFileSync(join(root, "data/seed.json"), "utf8"));
const home = readFileSync(join(root, "lib/home.ts"), "utf8");

const CHIPS = [
  "ropa",
  "deportiva",
  "carteras",
  "accesorios",
  "trajes-de-bano",
  "sastreria",
  "calzado",
];

const FORBIDDEN_BRANDS = [
  "nike",
  "zara",
  "adidas",
  "puma",
  "gucci",
  "prada",
  "michael kors",
  "kors",
  "temu",
  "shein",
  "uniqlo",
  "h&m",
];

function formatARS(amount) {
  const digits = Math.round(amount).toString();
  const grouped = digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `$ ${grouped}`;
}

test("home chips are the catalog categories", () => {
  assert.match(home, /Todas/);
  assert.match(home, /Ropa/);
  assert.match(home, /Deportiva/);
  assert.match(home, /Carteras/);
  assert.match(home, /Accesorios/);
  assert.match(home, /Trajes de baño/);
  assert.match(home, /Sastrería/);
  assert.match(home, /Calzado/);
});

test("fat seed covers every home chip with dozens of SKUs", () => {
  assert.ok(seed.skus.length >= 36, `expected dozens, got ${seed.skus.length}`);
  const counts = Object.fromEntries(CHIPS.map((chip) => [chip, 0]));
  for (const sku of seed.skus) {
    assert.ok(CHIPS.includes(sku.chip), `unknown chip ${sku.chip}`);
    counts[sku.chip] += 1;
    assert.ok(sku.brand && sku.name && sku.store_url && sku.image);
    assert.equal(typeof sku.price_ars, "number");
    assert.ok(sku.price_ars > 0);
  }
  for (const chip of CHIPS) {
    assert.ok(counts[chip] >= 4, `${chip} is too thin: ${counts[chip]}`);
  }
});

test("sastreria-de-agosto stays the five-piece collection", () => {
  const tapa = seed.collections.filter((c) => c.onTapa);
  assert.equal(tapa.length, 1);
  assert.equal(tapa[0].id, "sastreria-de-agosto");
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

test("featured tapado-coppola matches the ficha spec", () => {
  const sku = seed.skus.find((s) => s.id === "tapado-coppola");
  assert.equal(sku.brand, "Taller Recoleta");
  assert.equal(sku.name, "Tapado Coppola");
  assert.equal(sku.talle, "M");
  assert.equal(sku.tela, "Paño de lana");
  assert.equal(sku.corte, "Oversize");
  assert.equal(formatARS(sku.price_ars), "$ 890.000");
});

test("seed uses invented AR brands, not dummy mall names", () => {
  const blob = JSON.stringify(seed).toLowerCase();
  assert.equal(blob.includes("placeholder"), false);
  assert.equal(blob.includes("mesa de domingo"), false);
  assert.equal(blob.includes("hogar"), false);
  assert.equal(blob.includes("deco"), false);
  assert.equal(blob.includes("traje roma"), false);
  assert.equal(blob.includes("sobretodo livorno"), false);
  assert.equal(blob.includes("blazer firenze"), false);
  for (const brand of FORBIDDEN_BRANDS) {
    assert.equal(blob.includes(brand), false, brand);
  }
});
