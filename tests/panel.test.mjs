import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

const brand = read("lib/brand.ts");
const routes = read("lib/routes.ts");
const marcas = read("app/marcas/page.tsx");
const elegir = read("app/marcas/elegir/page.tsx");
const dashboardPage = read("app/marcas/dashboard/page.tsx");
const entrar = read("app/marcas/entrar/route.ts");
const salir = read("app/marcas/salir/route.ts");
const oauth = read("app/marcas/oauth/route.ts");
const callback = read("app/marcas/oauth/callback/route.ts");
const panel = read("components/BrandDashboard.tsx");
const picker = read("components/BrandPicker.tsx");
const published = read("lib/published.ts");
const catalogHome = read("components/CatalogHome.tsx");
const marcaPage = read("app/marca/[slug]/page.tsx");
const ficha = read("app/app/pieza/[slug]/page.tsx");
const readme = read("README.md");
const tiendanube = JSON.parse(read("data/tiendanube.json"));
const seed = JSON.parse(read("data/seed.json"));

test("merchant routes: login or panel, elegir, dashboard redirect", () => {
  assert.match(routes, /marcas: "\/marcas"/);
  assert.match(routes, /marcasElegir: "\/marcas\/elegir"/);
  assert.match(routes, /marcasDashboard: "\/marcas\/dashboard"/);
  assert.match(routes, /marcasEntrar: "\/marcas\/entrar"/);
  assert.match(routes, /marcasSalir: "\/marcas\/salir"/);
  assert.match(marcas, /readMerchantGate/);
  assert.match(marcas, /BrandDashboard/);
  assert.match(marcas, /MarcasLogin|brandCopy\.primary/);
  assert.match(elegir, /redirect\(routes\.marcas\)/);
  assert.match(elegir, /BrandPicker/);
  assert.match(dashboardPage, /redirect\(routes\.marcas\)/);
  assert.match(entrar, /TN_MOCK_COOKIE/);
  assert.match(entrar, /routes\.marcasOauth/);
  assert.match(salir, /TN_SESSION_COOKIE/);
  assert.match(salir, /TN_MOCK_COOKIE/);
  assert.match(oauth, /routes\.marcasEntrar/);
  assert.match(callback, /routes\.marcas,/);
});

test("panel copy matches Elena's cockpit, not the old ranking", () => {
  assert.match(brand, /Curadario · tu tienda/);
  assert.match(brand, /Todavía no hay nada en Curadario\./);
  assert.match(brand, /Elegí al menos una pieza para aparecer en el feed\./);
  assert.match(brand, /Elegir más piezas/);
  assert.match(brand, /Ver mi vitrina/);
  assert.match(brand, /Cerrar sesión/);
  assert.match(brand, /Qué publicás/);
  assert.match(
    brand,
    /Lo que prendes entra al feed\. El checkout sigue en tu TiendaNube\./,
  );
  assert.match(brand, /Listo · \$\{count\} publicadas/);
  assert.match(panel, /dashboardCopy\.more/);
  assert.match(panel, /dashboardCopy\.pick/);
  assert.match(panel, /dashboardCopy\.logout/);
  assert.match(panel, /elegirCopy\.emptyTitle/);
  assert.match(panel, /setPublishedIds/);
  assert.match(picker, /listoCta/);
  assert.match(picker, /hasPublishedOnce/);
  assert.match(picker, /PublishConfirm/);
  assert.equal(panel.includes("dashboardRanking"), false);
  assert.equal(panel.includes("1284"), false);
  assert.equal(panel.includes("312"), false);
  assert.equal(brand.includes("Casa Norte"), false);
  assert.equal(panel.includes("Casa Norte"), false);
});

test("unpublished pieces leave the shopper feed; vitrina route stays", () => {
  assert.match(published, /filterFeedSkus/);
  assert.match(published, /hasPublishedOverride/);
  assert.match(catalogHome, /filterFeedSkus/);
  assert.match(marcaPage, /MarcaGrid/);
  assert.match(marcaPage, /getBrandBySlug/);
  assert.match(ficha, /TrackVisit/);
  assert.equal(tiendanube.store.name, "Taller Recoleta");
  assert.equal(
    seed.skus.some((sku) => sku.brand === "Casa Norte"),
    false,
  );
  const blob = `${JSON.stringify(tiendanube)}\n${panel}\n${picker}`;
  assert.equal(/jarr[oó]n|vela de soja|casa norte/i.test(blob), false);
});

test("readme documents the merchant panel routes", () => {
  assert.match(readme, /\/marcas/);
  assert.match(readme, /\/marcas\/elegir/);
  assert.match(readme, /\/marcas\/dashboard/);
  assert.match(readme, /Qué publicás/);
  assert.match(readme, /Elegir más piezas/);
  assert.match(readme, /Ver mi vitrina/);
});
