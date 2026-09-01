import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const home = readFileSync(join(root, "lib/home.ts"), "utf8");
const landing = readFileSync(join(root, "app/page.tsx"), "utf8");
const catalogHome = readFileSync(join(root, "components/CatalogHome.tsx"), "utf8");
const railCard = readFileSync(join(root, "components/RailCard.tsx"), "utf8");
const feedCard = readFileSync(join(root, "components/FeedCard.tsx"), "utf8");
const bottomNav = readFileSync(join(root, "components/BottomNav.tsx"), "utf8");
const storeCta = readFileSync(join(root, "components/StoreCta.tsx"), "utf8");
const appAlias = readFileSync(join(root, "app/app/page.tsx"), "utf8");
const globals = readFileSync(join(root, "app/globals.css"), "utf8");
const picker = readFileSync(join(root, "components/BrandPicker.tsx"), "utf8");
const recient = readFileSync(join(root, "lib/recien.ts"), "utf8");

test("first screen says Vicky hero copy", () => {
  assert.match(home, /Marcas de TiendaNube\. Tocás, vas a su tienda\./);
  assert.match(home, /Marcas de TiendaNube/);
  assert.match(catalogHome, /homeCopy\.hero/);
  assert.match(catalogHome, /homeCopy\.marcasRow/);
  assert.match(catalogHome, /routes\.marcas/);
  assert.match(landing, /CatalogHome/);
  assert.match(landing, /homeCopy\.hero/);
});

test("chips are Todas Mujer Hombre Accesorios Deporte Joyas", () => {
  assert.match(home, /Todas/);
  assert.match(home, /Mujer/);
  assert.match(home, /Hombre/);
  assert.match(home, /Accesorios/);
  assert.match(home, /Deporte/);
  assert.match(home, /Joyas/);
  assert.match(catalogHome, /HOME_CHIPS/);
});

test("the hook is Recién publicadas, not a Temu grid", () => {
  assert.match(home, /Recién publicadas/);
  assert.match(home, /RECIéN/);
  assert.match(catalogHome, /homeCopy\.recient/);
  assert.match(catalogHome, /RailCard/);
  assert.match(catalogHome, /useRecienIds/);
  assert.match(railCard, /homeCopy\.recientBadge/);
  assert.match(railCard, /formatARS/);
  assert.match(feedCard, /formatARS/);
  assert.match(recient, /bumpRecien/);
  assert.match(recient, /mergeRecienOrder/);
  assert.match(picker, /bumpRecien/);
  assert.match(picker, /routes\.landing/);
  assert.equal(catalogHome.includes("dense"), false);
  const hook = [catalogHome, railCard, recient, picker].join("\n");
  assert.equal(/sale|countdown|ruleta|roulette|-\d+%/i.test(hook), false);
});

test("home has no bag or checkout chrome", () => {
  const shopper = [landing, catalogHome, railCard, feedCard, bottomNav].join("\n");
  assert.equal(
    /\b(bag|cart|carrito|checkout|pagar|ruleta|roulette)\b|-\d+%/i.test(shopper),
    false,
  );
  assert.equal(storeCta.includes("Ir a la tienda →"), true);
  assert.equal(storeCta.includes("Pagar"), false);
  assert.equal(storeCta.includes("checkout"), false);
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
  assert.equal(globals.toLowerCase().includes("#ff6900"), false);
  assert.match(railCard, /bg-terracotta/);
});
