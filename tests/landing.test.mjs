import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const home = readFileSync(join(root, "lib/home.ts"), "utf8");
const landing = readFileSync(join(root, "app/page.tsx"), "utf8");
const catalogHome = readFileSync(join(root, "components/CatalogHome.tsx"), "utf8");
const module21 = readFileSync(join(root, "components/Las21Module.tsx"), "utf8");
const productCard = readFileSync(join(root, "components/ProductCard.tsx"), "utf8");
const railCard = readFileSync(join(root, "components/RailCard.tsx"), "utf8");
const shareBtn = readFileSync(join(root, "components/LiveShareButton.tsx"), "utf8");
const remind = readFileSync(join(root, "components/RemindButton.tsx"), "utf8");
const storeCta = readFileSync(join(root, "components/StoreCta.tsx"), "utf8");
const globals = readFileSync(join(root, "app/globals.css"), "utf8");
const readme = readFileSync(join(root, "README.md"), "utf8");
const las21Time = readFileSync(join(root, "lib/las21-time.mjs"), "utf8");
const recient = readFileSync(join(root, "lib/recien.ts"), "utf8");

test("home is the packed catalog plus a Las 21 module", () => {
  assert.match(home, /Marcas de TiendaNube\. Tocás, vas a su tienda\./);
  assert.match(home, /Todas las marcas\. Un solo lugar\./);
  assert.match(home, /Ir a las marcas →/);
  assert.match(home, /Buscar marcas, prendas y más/);
  assert.match(catalogHome, /homeCopy\.hero/);
  assert.match(catalogHome, /homeCopy\.search/);
  assert.match(catalogHome, /homeCopy\.banner/);
  assert.match(catalogHome, /Las21Module/);
  assert.match(catalogHome, /HOME_CHIPS/);
  assert.match(catalogHome, /grid-cols-2/);
  assert.match(catalogHome, /ProductCard/);
  assert.match(catalogHome, /dense/);
  assert.match(catalogHome, /homeCopy\.recient/);
  assert.match(catalogHome, /RailCard/);
  assert.match(catalogHome, /homeCopy\.anoche/);
  assert.match(landing, /CatalogHome/);
  assert.match(landing, /homeCopy\.hero/);
  assert.match(landing, /AppShell/);
  assert.equal(landing.includes("Las21Home"), false);
});

test("Las 21 is a module on the feed, not a replacement", () => {
  assert.match(module21, /formatDayCountdown/);
  assert.match(module21, /RemindButton/);
  assert.match(module21, /isLas21Live/);
  assert.match(module21, /tonightStoreCount/);
  assert.match(module21, /LIVE_SHARE_COPY|LiveShareButton|StoreCta/);
  assert.match(module21, /formatLiveCountdown/);
  assert.equal(module21.includes("min-h-dvh"), false);
  assert.match(catalogHome, /Las21Module/);
  assert.match(catalogHome, /grid-cols-2/);
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
});

test("Recién rail and cards stay on the vitrine", () => {
  assert.match(catalogHome, /recient\.length > 0/);
  assert.match(railCard, /homeCopy\.recientBadge/);
  assert.match(productCard, /HeartButton/);
  assert.match(productCard, /ShareFindingButton/);
  assert.match(productCard, /formatARS/);
  assert.match(recient, /bumpRecien/);
  assert.equal(productCard.includes("recientBadge"), false);
});

test("tokens stay Curadario, not Temu orange", () => {
  assert.match(globals, /#161513/);
  assert.match(globals, /#c8553d/i);
  assert.match(globals, /#efe9dd/i);
  assert.match(globals, /#fbfaf6/i);
  assert.equal(globals.toLowerCase().includes("#ff6a00"), false);
  assert.match(catalogHome, /bg-terracotta/);
});

test("shopper still has no bag or own checkout", () => {
  const shopper = [landing, catalogHome, module21, productCard, storeCta].join("\n");
  assert.equal(
    /\b(bag|cart|carrito|checkout|pagar|ruleta|roulette)\b|-\d+%/i.test(shopper),
    false,
  );
  assert.equal(storeCta.includes("Ir a la tienda →"), true);
  assert.equal(storeCta.includes("Pagar"), false);
  assert.match(shareBtn, /LIVE_SHARE_COPY|liveShareText/);
  assert.match(remind, /Avisame a las 20:55|REMIND_CTA/);
});

test("readme is feed plus Las 21 module, local only", () => {
  assert.match(readme, /git pull/);
  assert.match(readme, /npm run dev/);
  assert.match(readme, /localhost:3000/);
  assert.match(readme, /drop=1/);
  assert.match(readme, /Marcas de TiendaNube/);
  assert.match(readme, /Está pasando en Curadario\. 20 minutos\./);
  assert.match(readme, /Avisame a las 20:55/);
  assert.match(readme, /con 3 se prende/);
  assert.match(las21Time, /America\/Buenos_Aires/);
  assert.match(las21Time, /LAS21_FLOOR = 3/);
});
