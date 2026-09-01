import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const terminos = readFileSync(join(root, "app/terminos/page.tsx"), "utf8");
const privacidad = readFileSync(join(root, "app/privacidad/page.tsx"), "utf8");
const brand = readFileSync(join(root, "lib/brand.ts"), "utf8");
const readme = readFileSync(join(root, "README.md"), "utf8");

test("legal pages say Curadario is a vitrina without payments", () => {
  assert.match(brand, /Curadario es una vitrina/);
  assert.match(brand, /No hay carrito ni checkout propio/);
  assert.match(terminos, /legalCopy\.vitrina/);
  assert.match(terminos, /legalCopy\.noCheckout/);
  assert.match(terminos, /TiendaNube/);
  assert.match(privacidad, /No pedimos pagos ni datos de checkout/);
  assert.match(privacidad, /Nunca el/);
});

test("readme documents brand, share, and legal routes", () => {
  assert.match(readme, /\/marcas/);
  assert.match(readme, /\/marcas\/elegir/);
  assert.match(readme, /\/marcas\/dashboard/);
  assert.match(readme, /\/app\/coleccion\/compartir/);
  assert.match(readme, /\/terminos/);
  assert.match(readme, /\/privacidad/);
  assert.match(readme, /Ir a la tienda/);
  assert.match(readme, /vitrina/);
});
