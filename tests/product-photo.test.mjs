import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { hasProductImage, tnProductImage } from "../lib/product-image.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

const photo = read("components/ProductPhoto.tsx");
const productCard = read("components/ProductCard.tsx");
const railCard = read("components/RailCard.tsx");
const ficha = read("app/app/pieza/[slug]/page.tsx");
const stories = read("components/RecienStories.tsx");
const picker = read("components/BrandPicker.tsx");
const cockpit = read("components/BrandDashboard.tsx");
const oauth = read("lib/tiendanube-oauth.ts");
const banners = read("components/CollectionBanner.tsx");
const looks = read("components/LooksIndex.tsx");
const catalogHome = read("components/CatalogHome.tsx");
const seed = JSON.parse(read("data/seed.json"));
const tn = JSON.parse(read("data/tiendanube.json"));
const buildSeed = read("scripts/build-seed.mjs");

const PRODUCT_FRAMES = [
  productCard,
  railCard,
  ficha,
  stories,
  picker,
  cockpit,
];

test("missing or blank TN photo is empty, never a fake garment", () => {
  assert.equal(hasProductImage(""), false);
  assert.equal(hasProductImage("   "), false);
  assert.equal(hasProductImage(null), false);
  assert.equal(hasProductImage(undefined), false);
  assert.equal(tnProductImage(""), "");
  assert.equal(tnProductImage(undefined), "");
  assert.equal(tnProductImage("/images/tapado-coppola.jpg"), "/images/tapado-coppola.jpg");
  assert.equal(
    tnProductImage(" https://store.mitiendanube.com/prenda.jpg "),
    "https://store.mitiendanube.com/prenda.jpg",
  );
});

test("ProductCard, rail, ficha, Recién, elegir, cockpit use ProductPhoto", () => {
  for (const source of PRODUCT_FRAMES) {
    assert.match(source, /ProductPhoto/);
    assert.equal(source.includes("from \"next/image\""), false);
    assert.equal(/fal\.ai|@fal-ai|fal\.subscribe|fal\.run/i.test(source), false);
  }
  assert.match(photo, /#EFE9DD/);
  assert.match(photo, /onError/);
  assert.match(photo, />\s*C\s*</);
  assert.equal(/fal\.ai|@fal-ai/i.test(photo), false);
  assert.match(oauth, /tnProductImage/);
  assert.equal(oauth.includes("tapado-coppola.jpg"), false);
  assert.equal(/fal\.ai|@fal-ai|fal\.run/i.test(oauth), false);
});

test("seed keeps working garment URLs and does not invent fal clothes", () => {
  const working = [
    "/images/tapado-coppola.jpg",
    "/images/saco-frances.jpg",
    "/images/pantalon-pinza.jpg",
    "/images/camisa-oxford.jpg",
    "/images/mocasin-goma.jpg",
    "/images/tote-lona.jpg",
    "/images/baguette-napa.jpg",
    "/images/bikini-triangulo.jpg",
    "/images/enteriza-canale.jpg",
  ];
  for (const src of working) {
    assert.ok(
      seed.skus.some((sku) => sku.image === src),
      `missing working seed image ${src}`,
    );
    assert.match(buildSeed, new RegExp(src.replace(/\./g, "\\.")));
  }
  const blob = `${JSON.stringify(seed)}\n${JSON.stringify(tn)}\n${buildSeed}`;
  assert.equal(/fal\.ai|@fal-ai|fal\.run/i.test(blob), false);
  assert.match(buildSeed, /image = ""/);
  assert.ok(
    tn.products.some((product) => product.image === ""),
    "TN mock keeps a piece with no photo instead of inventing a prenda",
  );
});

test("banners stay app chrome and are not rewritten as product frames", () => {
  assert.match(banners, /collection\.coverImage/);
  assert.match(banners, /from "next\/image"/);
  assert.equal(banners.includes("ProductPhoto"), false);
  assert.match(looks, /collection\.coverImage/);
  assert.equal(looks.includes("ProductPhoto"), false);
  assert.match(catalogHome, /homeCopy\.banner/);
  assert.equal(catalogHome.includes("ProductPhoto"), false);
});
