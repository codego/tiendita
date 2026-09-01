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
const bottomNav = readFileSync(join(root, "components/BottomNav.tsx"), "utf8");
const storeCta = readFileSync(join(root, "components/StoreCta.tsx"), "utf8");
const appAlias = readFileSync(join(root, "app/app/page.tsx"), "utf8");
const globals = readFileSync(join(root, "app/globals.css"), "utf8");

test("first screen says Vicky hero copy", () => {
  assert.match(home, /Marcas de TiendaNube\. Tocás, vas a su tienda\./);
  assert.match(home, /Todas las marcas\. Un solo lugar\./);
  assert.match(home, /Ir a las marcas →/);
  assert.match(home, /Buscar marcas, prendas y más/);
  assert.match(catalogHome, /homeCopy\.hero/);
  assert.match(catalogHome, /homeCopy\.search/);
  assert.match(catalogHome, /homeCopy\.bannerCta/);
  assert.match(catalogHome, /HOME_CHIPS/);
  assert.match(landing, /CatalogHome/);
  assert.match(landing, /homeCopy\.hero/);
});

test("home is a dense catalog grid without bag or checkout chrome", () => {
  assert.match(catalogHome, /grid-cols-2/);
  assert.match(catalogHome, /ProductCard/);
  assert.match(catalogHome, /dense/);
  assert.match(productCard, /HeartButton/);
  assert.match(productCard, /formatARS/);
  assert.match(productCard, /sku\.brand/);
  assert.match(productCard, /sku\.name/);
  const shopper = [landing, catalogHome, productCard, bottomNav].join("\n");
  assert.equal(
    /\b(bag|cart|carrito|checkout|pagar|ruleta|roulette)\b|-\d+%/i.test(shopper),
    false,
  );
  assert.equal(storeCta.includes("Ir a la tienda →"), true);
  assert.equal(storeCta.includes("Pagar"), false);
  assert.equal(storeCta.includes("checkout"), false);
});

test("bottom nav is Inicio Colección Buscar Guardados with hanger, no cart", () => {
  assert.match(bottomNav, /Inicio/);
  assert.match(bottomNav, /Colección/);
  assert.match(bottomNav, /Buscar/);
  assert.match(bottomNav, /Guardados/);
  assert.match(bottomNav, /HangerIcon/);
  assert.match(bottomNav, /routes\.landing/);
  assert.match(bottomNav, /routes\.coleccion/);
  assert.equal(bottomNav.includes("Carrito"), false);
  assert.equal(bottomNav.includes("Bolsa"), false);
  assert.equal(bottomNav.includes("Bag"), false);
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
  assert.equal(globals.toLowerCase().includes("#ff6900"), false);
  assert.equal(catalogHome.includes("#ff"), false);
  assert.match(catalogHome, /bg-terracotta/);
});
