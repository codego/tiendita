import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const home = readFileSync(join(root, "lib/home.ts"), "utf8");
const landing = readFileSync(join(root, "app/page.tsx"), "utf8");
const catalogHome = readFileSync(join(root, "components/CatalogHome.tsx"), "utf8");
const productCard = readFileSync(join(root, "components/ProductCard.tsx"), "utf8");
const railCard = readFileSync(join(root, "components/RailCard.tsx"), "utf8");
const bottomNav = readFileSync(join(root, "components/BottomNav.tsx"), "utf8");
const storeCta = readFileSync(join(root, "components/StoreCta.tsx"), "utf8");
const appAlias = readFileSync(join(root, "app/app/page.tsx"), "utf8");
const globals = readFileSync(join(root, "app/globals.css"), "utf8");
const picker = readFileSync(join(root, "components/BrandPicker.tsx"), "utf8");
const recient = readFileSync(join(root, "lib/recien.ts"), "utf8");

test("first screen says Vicky hero copy", () => {
  assert.match(home, /Marcas de TiendaNube\. Tocás, vas a su tienda\./);
  assert.match(home, /Todas las marcas\. Un solo lugar\./);
  assert.match(home, /Ir a las marcas →/);
  assert.match(home, /Buscar marcas, prendas y más/);
  assert.match(catalogHome, /homeCopy\.hero/);
  assert.match(catalogHome, /homeCopy\.search/);
  assert.match(catalogHome, /homeCopy\.banner/);
  assert.match(catalogHome, /homeCopy\.bannerCta/);
  assert.match(catalogHome, /routes\.marcas/);
  assert.match(landing, /CatalogHome/);
  assert.match(landing, /homeCopy\.hero/);
});

test("chips are Todas Ropa Deportiva Carteras Accesorios Trajes de baño Sastrería Calzado", () => {
  assert.match(home, /Todas/);
  assert.match(home, /Ropa/);
  assert.match(home, /Deportiva/);
  assert.match(home, /Carteras/);
  assert.match(home, /Accesorios/);
  assert.match(home, /Trajes de baño/);
  assert.match(home, /Sastrería/);
  assert.match(home, /Calzado/);
  assert.match(catalogHome, /HOME_CHIPS/);
});

test("home is a dense 2-col catalog with Recién rail", () => {
  assert.match(catalogHome, /grid-cols-2/);
  assert.match(catalogHome, /ProductCard/);
  assert.match(catalogHome, /dense/);
  assert.match(catalogHome, /homeCopy\.recient/);
  assert.match(catalogHome, /RailCard/);
  assert.match(productCard, /HeartButton/);
  assert.match(productCard, /formatARS/);
  assert.match(productCard, /sku\.brand/);
  assert.match(productCard, /sku\.name/);
  assert.match(railCard, /homeCopy\.recientBadge/);
  assert.match(recient, /bumpRecien/);
  assert.match(picker, /bumpRecien/);
  const shopper = [landing, catalogHome, productCard, bottomNav].join("\n");
  assert.equal(
    /\b(bag|cart|carrito|checkout|pagar|ruleta|roulette)\b|-\d+%/i.test(shopper),
    false,
  );
  assert.equal(storeCta.includes("Ir a la tienda →"), true);
  assert.equal(storeCta.includes("Pagar"), false);
});

test("bottom nav is Inicio Colección Buscar Guardados, no cart", () => {
  assert.match(bottomNav, /Inicio/);
  assert.match(bottomNav, /Colección/);
  assert.match(bottomNav, /Buscar/);
  assert.match(bottomNav, /Guardados/);
  assert.match(bottomNav, /routes\.landing/);
  assert.match(bottomNav, /routes\.coleccion/);
  assert.equal(bottomNav.includes("Carrito"), false);
  assert.equal(bottomNav.includes("Bolsa"), false);
});

test("app alias redirects to the new home", () => {
  assert.match(appAlias, /redirect/);
  assert.match(appAlias, /routes\.landing/);
});

test("tokens stay Curadario, not Temu orange", () => {
  assert.match(globals, /#161513/);
  assert.match(globals, /#c8553d/i);
  assert.match(globals, /#efe9dd/i);
  assert.match(globals, /#fbfaf6/i);
  assert.equal(globals.toLowerCase().includes("#ff6a00"), false);
  assert.match(catalogHome, /bg-terracotta/);
});
