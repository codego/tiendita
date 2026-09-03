import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import {
  pickTonightPiece,
  rankForwarded,
  tonightXor,
} from "../lib/cockpit.mjs";

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
const shares = read("lib/shares.ts");
const shareSheet = read("components/ShareSheet.tsx");
const shareButton = read("components/ShareFindingButton.tsx");
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

test("panel copy matches Elena's mature cockpit, not analytics", () => {
  assert.match(brand, /Con pinta · tu tienda/);
  assert.match(brand, /Salidas a tu tienda \(7 días\)/);
  assert.match(brand, /Con pinta no vende\. El clic es el resultado\./);
  assert.match(brand, /Lo que más reenviaron/);
  assert.match(brand, /Hoy a las 21: esta\./);
  assert.match(brand, /Esta noche no tenés pieza en el drop\./);
  assert.match(brand, /Las 21/);
  assert.match(brand, /Cambiar/);
  assert.match(brand, /Todavía no hay nada en Con pinta\./);
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
  assert.match(panel, /dashboardCopy\.salidas/);
  assert.match(panel, /dashboardCopy\.forwarded/);
  assert.match(panel, /dashboardCopy\.tonightTitle/);
  assert.match(panel, /dashboardCopy\.more/);
  assert.match(panel, /dashboardCopy\.pick/);
  assert.match(panel, /dashboardCopy\.logout/);
  assert.match(panel, /dashboardCopy\.vitrina/);
  assert.match(panel, /elegirCopy\.emptyTitle/);
  assert.match(panel, /useWeekClickMap/);
  assert.match(panel, /useWeekShareMap/);
  assert.match(panel, /routes\.marcasElegir/);
  assert.match(panel, /routes\.marca/);
  assert.equal(panel.includes("setPublishedIds"), false);
  assert.equal(panel.includes("useWeekVisits"), false);
  assert.equal(/visitas/i.test(panel), false);
  assert.equal(/clics/i.test(panel), false);
  assert.equal(panel.includes("MERCHANT COCKPIT"), false);
  assert.equal(picker.includes("BrandDashboard"), false);
  assert.match(picker, /listoCta/);
  assert.match(picker, /hasPublishedOnce/);
  assert.match(picker, /PublishConfirm/);
  assert.equal(panel.includes("dashboardRanking"), false);
  assert.equal(panel.includes("1284"), false);
  assert.equal(panel.includes("312"), false);
  assert.equal(brand.includes("Casa Norte"), false);
  assert.equal(panel.includes("Casa Norte"), false);
  assert.equal(brand.includes("Visitas"), false);
  assert.equal(brand.includes("Clics a la tienda"), false);
});

test("Las 21 cockpit is card XOR empty line, never both", () => {
  const withPiece = tonightXor({ id: "tapado-coppola", name: "Tapado Coppola" });
  assert.deepEqual(withPiece, { showCard: true, showEmpty: false });
  assert.equal(tonightXor(null).showCard, false);
  assert.equal(tonightXor(null).showEmpty, true);
  assert.equal(tonightXor(undefined).showEmpty, true);

  const taller = pickTonightPiece("Taller Recoleta", [
    { id: "tapado-coppola", brand: "Taller Recoleta", name: "Tapado Coppola" },
    { id: "tote-lona", brand: "Atelier Costanera", name: "Tote Lona" },
  ]);
  const missing = pickTonightPiece("Paño Norte", [
    { id: "tapado-coppola", brand: "Taller Recoleta", name: "Tapado Coppola" },
  ]);
  assert.equal(taller?.id, "tapado-coppola");
  assert.equal(missing, null);
  assert.deepEqual(tonightXor(taller), { showCard: true, showEmpty: false });
  assert.deepEqual(tonightXor(missing), { showCard: false, showEmpty: true });

  assert.match(panel, /tonightXor/);
  assert.match(panel, /drop\.showCard && tonight/);
  assert.match(panel, /drop\.showEmpty/);
  assert.match(panel, /dashboardCopy\.tonightEmpty/);
  assert.match(panel, /dashboardCopy\.tonightChip/);
  assert.match(panel, /dashboardCopy\.change/);
  assert.match(panel, /tonightPieceForStore/);
  const emptyBlock = panel.slice(panel.indexOf("drop.showEmpty"));
  assert.equal(emptyBlock.includes("dashboardCopy.tonightChip"), false);
  assert.equal(emptyBlock.includes("dashboardCopy.change"), false);
});

test("lo que más reenviaron ranks by share count, empty if none", () => {
  const ranked = rankForwarded([
    { id: "a", name: "Bolso", count: 5 },
    { id: "b", name: "Tote", count: 12 },
    { id: "c", name: "Cartera", count: 0 },
    { id: "d", name: "Mochila", count: 8 },
    { id: "e", name: "Clutch", count: 3 },
  ]);
  assert.deepEqual(
    ranked.map((item) => item.id),
    ["b", "d", "a"],
  );
  assert.deepEqual(rankForwarded([{ id: "z", name: "Nada", count: 0 }]), []);
  assert.match(panel, /rankForwarded/);
  assert.match(panel, /shareMap/);
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

test("share sheet increments share counts for the cockpit ranking", () => {
  assert.match(shares, /curadario:shares/);
  assert.match(shares, /trackShare/);
  assert.match(shares, /getWeekShareMap/);
  assert.match(shareSheet, /trackShare\(sku\.id\)/);
  assert.match(shareButton, /trackShare\(piece\.id\)/);
  assert.match(panel, /useWeekShareMap/);
  assert.equal(panel.includes("useWeekVisits"), false);
});

test("readme documents the merchant panel routes", () => {
  assert.match(readme, /\/marcas/);
  assert.match(readme, /\/marcas\/elegir/);
  assert.match(readme, /\/marcas\/dashboard/);
  assert.match(readme, /Qué publicás/);
  assert.match(readme, /Elegir más piezas/);
  assert.match(readme, /Ver mi vitrina/);
  assert.match(readme, /Salidas a tu tienda/);
  assert.match(readme, /Lo que más reenviaron/);
  assert.match(readme, /Hoy a las 21: esta\./);
});
