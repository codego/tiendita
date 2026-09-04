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
const queEs = readFileSync(join(root, "lib/que-es.ts"), "utf8");
const queEsPage = readFileSync(join(root, "components/QueEsPage.tsx"), "utf8");

test("legal pages say Con pinta is a vitrina without payments", () => {
  assert.match(brand, /Con pinta es una vitrina/);
  assert.match(brand, /No hay carrito ni checkout propio/);
  assert.match(terminos, /legalCopy\.vitrina/);
  assert.match(terminos, /legalCopy\.noCheckout/);
  assert.match(terminos, /TiendaNube/);
  assert.match(privacidad, /No pedimos pagos ni datos de checkout/);
  assert.match(privacidad, /Nunca el/);
  assert.match(privacidad, /cookieCopy\.line/);
  assert.equal(terminos.includes("Curadario"), false);
  assert.equal(privacidad.includes("Curadario"), false);
  assert.equal(brand.includes("Curadario"), false);
  assert.equal(/@curadario\.(com|la)/i.test(terminos), false);
  assert.equal(/@curadario\.(com|la)/i.test(privacidad), false);
  assert.match(
    queEs,
    /Con pinta junta marcas de TiendaNube\. Tocás, vas a su tienda\./,
  );
  assert.equal(queEs.includes("Curadario"), false);
  assert.equal(queEsPage.includes("Curadario"), false);
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
  assert.match(readme, /Lo vi en Con pinta/);
  assert.match(readme, /Publicá tu tienda/);
  assert.match(readme, /\/ayuda/);
  assert.match(readme, /\/faq/);
  assert.match(readme, /\/que-es/);
  assert.match(readme, /\/contacto/);
  assert.equal(readme.includes("marcas@curadario.la"), false);
});
