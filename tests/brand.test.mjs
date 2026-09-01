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
const shareFinding = readFileSync(join(root, "lib/shareFinding.ts"), "utf8");
const storeCta = readFileSync(join(root, "components/StoreCta.tsx"), "utf8");
const tiendanube = JSON.parse(
  readFileSync(join(root, "data/tiendanube.json"), "utf8"),
);
const seed = JSON.parse(readFileSync(join(root, "data/seed.json"), "utf8"));
const dashboard = readFileSync(
  join(root, "app/marcas/dashboard/page.tsx"),
  "utf8",
);

test("brand landing copy is exact", () => {
  assert.match(brand, /PARA MARCAS/);
  assert.match(brand, /Publicá tu selección\. No tu tienda entera\./);
  assert.match(
    brand,
    /Cualquier TiendaNube\. Elegís qué sale\. Ellos compran en tu checkout\./,
  );
  assert.match(brand, /Continuar con TiendaNube →/);
  assert.match(brand, /Ya tengo cuenta/);
  assert.match(brand, /¿Tenés TiendaNube\? Publicá tu tienda\./);
  assert.match(brand, /Entrás, elegís qué sale, y tu marca entra en el look\./);
  assert.match(marcas, /routes\.marcasElegir/);
  assert.match(marcas, /routes\.marcasDashboard/);
  assert.match(marcas, /routes\.terminos/);
  assert.match(marcas, /routes\.privacidad/);
});

test("brand dashboard uses seed sastrería pieces and exact footer", () => {
  assert.match(brand, /Esta semana/);
  assert.match(brand, /Piezas que más mandan a tu TiendaNube/);
  assert.match(brand, /Editar selección/);
  assert.match(brand, /Ver mi vitrina →/);
  assert.match(brand, /Curadario no vende\. El clic es el resultado\./);
  assert.match(brand, /visitas/);
  assert.match(brand, /clics a la tienda/);
  assert.match(brand, /piezas publicadas/);
  assert.match(dashboard, /routes\.marcasElegir/);
  assert.match(dashboard, /routes\.coleccion/);
  assert.match(brand, /tapado-coppola/);
  assert.match(brand, /saco-frances/);
  assert.match(brand, /pantalon-pinza/);
  assert.equal(brand.includes("Top Crudo"), false);
  assert.equal(brand.includes("Campera Nómade"), false);
  assert.equal(dashboard.includes("Top Crudo"), false);
  assert.equal(dashboard.includes("Campera Nómade"), false);
  assert.equal(dashboard.includes("Acromática"), false);
  const ids = ["tapado-coppola", "saco-frances", "pantalon-pinza"];
  for (const id of ids) {
    const sku = seed.skus.find((s) => s.id === id);
    assert.equal(sku.collection_id, "sastreria-de-agosto");
  }
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

test("share sheet is a finding, not the look", () => {
  assert.match(brand, /Mirá lo que encontré en Curadario\./);
  assert.match(brand, /Una pieza\. La tienda de la marca\./);
  assert.match(brand, /Copiar enlace/);
  assert.match(brand, /Instagram Stories/);
  assert.match(brand, /WhatsApp/);
  assert.match(brand, /Compartir hallazgo →/);
  assert.equal(brand.includes("Este look está en Curadario"), false);
  assert.equal(brand.includes("Compartir el look"), false);
  assert.match(sharePage, /ShareSheet/);
  assert.match(sharePage, /getSku/);
  assert.match(shareSheet, /routes\.pieza/);
  assert.match(shareSheet, /routes\.landing/);
  assert.match(shareSheet, /sku\.name/);
  assert.match(shareSheet, /sku\.brand/);
  assert.match(shareFinding, /shareCopy\.kit/);
  assert.match(shareFinding, /findingPath/);
  assert.match(shareFinding, /routes\.pieza/);
  assert.equal(shareSheet.includes("routes.app"), false);
  assert.equal(shareSheet.includes("getTapaSkus"), false);
  assert.equal(shareFinding.includes("lookPath"), false);
});

test("shopper still has no bag or own checkout", () => {
  assert.match(storeCta, /Ir a la tienda →/);
  assert.equal(storeCta.includes("Pagar"), false);
  assert.equal(storeCta.includes("checkout"), false);
  assert.equal(seed.skus.every((s) => s.store_url), true);
});
