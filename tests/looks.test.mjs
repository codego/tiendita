import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const seed = JSON.parse(readFileSync(join(root, "data/seed.json"), "utf8"));
const catalog = readFileSync(join(root, "lib/catalog.ts"), "utf8");
const looksIndex = readFileSync(join(root, "components/LooksIndex.tsx"), "utf8");
const looksPage = readFileSync(join(root, "app/app/coleccion/page.tsx"), "utf8");

test("Looks index lists curated collections, not only Sastrería", () => {
  assert.match(catalog, /getLooksCollections/);
  assert.match(looksPage, /LooksIndex/);
  assert.match(looksIndex, /Looks/);
  assert.match(looksIndex, /routes\.coleccionId/);
  const looks = seed.collections.filter((c) => c.id !== "vitrina");
  assert.ok(looks.some((c) => c.id === "sastreria-de-agosto"));
  assert.ok(looks.some((c) => c.id === "lo-que-lleva-el-look"));
  assert.ok(looks.some((c) => c.id === "un-solo-traje"));
  assert.equal(
    looks.some((c) => c.id === "sastreria-de-agosto" && c.onTapa),
    true,
  );
  assert.ok(looks.length >= 3);
});
