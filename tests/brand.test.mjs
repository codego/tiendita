import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const brand = readFileSync(join(root, "lib/brand.ts"), "utf8");
const marcas = readFileSync(join(root, "app/marcas/page.tsx"), "utf8");
const elegir = readFileSync(join(root, "app/marcas/elegir/page.tsx"), "utf8");
const picker = readFileSync(join(root, "components/BrandPicker.tsx"), "utf8");
const sharePage = readFileSync(
  join(root, "app/app/coleccion/compartir/page.tsx"),
  "utf8",
);
const shareSheet = readFileSync(join(root, "components/ShareSheet.tsx"), "utf8");
const storeCta = readFileSync(join(root, "components/StoreCta.tsx"), "utf8");
const tiendanube = JSON.parse(
  readFileSync(join(root, "data/tiendanube.json"), "utf8"),
);
const seed = JSON.parse(readFileSync(join(root, "data/seed.json"), "utf8"));

test("brand landing copy is exact", () => {
  assert.match(brand, /PARA MARCAS/);
  assert.match(brand, /Publicá tu selección\. No tu tienda entera\./);
  assert.match(
    brand,
    /Cualquier TiendaNube\. Elegís qué sale\. Ellos compran en tu checkout\./,
  );
  assert.match(brand, /Continuar con TiendaNube →/);
  assert.match(brand, /Ya tengo cuenta/);
  assert.match(marcas, /routes\.marcasElegir/);
  assert.match(marcas, /routes\.terminos/);
  assert.match(marcas, /routes\.privacidad/);
});

test("picker copy, apparel seed, and mock sync banner", () => {
  assert.match(brand, /Elegí qué publicar\./);
  assert.match(brand, /Buscar productos/);
  assert.match(brand, /Lo no elegido no aparece en Curadario\./);
  assert.match(brand, /El checkout sigue en tu tienda\./);
  assert.match(brand, /Sincronizado • \$\{count\} productos de tu TiendaNube/);
  assert.match(picker, /publishCta/);
  assert.match(elegir, /getTiendaNubeProducts/);
  assert.equal(tiendanube.store.syncedCount, 247);
  assert.equal(tiendanube.store.platform, "TiendaNube");
  assert.ok(tiendanube.products.length >= 12);
  assert.ok(tiendanube.products.every((p) => p.kind === "apparel"));
  assert.equal(
    tiendanube.products.filter((p) => p.selected).length,
    12,
  );
  const blob = JSON.stringify(tiendanube).toLowerCase();
  assert.equal(blob.includes("deco"), false);
  assert.equal(blob.includes("hogar"), false);
  assert.equal(blob.includes("taza"), false);
  assert.equal(blob.includes("vela"), false);
  assert.equal(blob.includes("aceite"), false);
  assert.equal(blob.includes("servilleta"), false);
  assert.equal(blob.includes("bowl"), false);
});

test("share sheet is the look, not the home", () => {
  assert.match(brand, /Armé mi parte del look\./);
  assert.match(brand, /Está en Curadario, no en cinco tiendas\./);
  assert.match(brand, /Sastrería de agosto/);
  assert.match(brand, /Look completo • 5 productos/);
  assert.match(brand, /por Sofía • 2 min/);
  assert.match(brand, /Copiar enlace/);
  assert.match(brand, /Instagram Stories/);
  assert.match(brand, /WhatsApp/);
  assert.match(brand, /Compartir el look →/);
  assert.match(sharePage, /getTapaCollection/);
  assert.match(sharePage, /getTapaSkus/);
  assert.match(shareSheet, /routes\.coleccion/);
  assert.equal(shareSheet.includes("routes.app"), false);
  assert.equal(shareSheet.includes('href={routes.app}'), false);
});

test("shopper still has no bag or own checkout", () => {
  assert.match(storeCta, /Ir a la tienda →/);
  assert.equal(storeCta.includes("Pagar"), false);
  assert.equal(storeCta.includes("checkout"), false);
  assert.equal(seed.skus.every((s) => s.store_url), true);
});
