import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const home = readFileSync(join(root, "lib/home.ts"), "utf8");
const rail = readFileSync(join(root, "components/HomeBannerRail.tsx"), "utf8");
const catalogHome = readFileSync(join(root, "components/CatalogHome.tsx"), "utf8");
const skeleton = readFileSync(join(root, "components/Skeleton.tsx"), "utf8");
const page = readFileSync(join(root, "app/page.tsx"), "utf8");

const BANNERS = [
  "banner-llego.png",
  "banner-esta-semana.png",
  "banner-las21.png",
];

test("home rail is Elena's three photo 1:1 squares", () => {
  assert.match(home, /HOME_RAIL/);
  assert.match(home, /banner-llego\.png/);
  assert.match(home, /Llegó\./);
  assert.match(home, /banner-esta-semana\.png/);
  assert.match(home, /De esta semana\./);
  assert.match(home, /banner-las21\.png/);
  assert.match(home, /Hoy a las 21\./);
  assert.match(home, /href: "\/las21"/);
  assert.equal(home.includes("banner-look.png"), false);
  assert.equal(home.includes("Lo que lleva el look"), false);
  assert.equal(home.includes("daytimeOnly"), false);
  assert.equal(home.includes("visibleHomeRail"), false);
  assert.match(home, /Carteras/);
  assert.match(home, /#C8553D/);
  assert.match(rail, /aspect-square/);
  assert.match(rail, /HOME_RAIL/);
  assert.match(rail, /item\.src/);
  assert.equal(rail.includes("visibleHomeRail"), false);
  assert.equal(rail.includes("banner-look.png"), false);
  assert.match(catalogHome, /HomeBannerRail/);
  assert.equal(catalogHome.includes("Las21Module"), false);
  assert.equal(catalogHome.includes("isLas21Live"), false);
  assert.equal(catalogHome.includes("forceDrop"), false);
  assert.match(catalogHome, /grid-cols-2/);
  assert.equal(page.includes("searchParams"), false);
  assert.equal(page.includes("drop"), false);
  assert.match(skeleton, /banner-llego\.png/);
  assert.match(skeleton, /banner-esta-semana\.png/);
  assert.match(skeleton, /banner-las21\.png/);
  assert.equal(skeleton.includes("banner-look.png"), false);
  assert.match(skeleton, /HomeBannerRailSkeleton/);

  const llego = home.indexOf("banner-llego.png");
  const semana = home.indexOf("banner-esta-semana.png");
  const las21 = home.indexOf("banner-las21.png");
  assert.ok(llego < semana && semana < las21);
});

test("rail PNGs are in public/ and ofertas/SALE/look stay off the rail", () => {
  for (const file of BANNERS) {
    const path = join(root, "public", file);
    assert.equal(existsSync(path), true, path);
    const bytes = readFileSync(path);
    assert.deepEqual(bytes.subarray(0, 8), Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
    assert.ok(bytes.length > 10_000);
  }
  assert.equal(existsSync(join(root, "public", "banner-ofertas.png")), false);
  assert.equal(existsSync(join(root, "public", "banner-primavera.png")), false);
  assert.equal(existsSync(join(root, "public", "banner-carteras.png")), false);

  const blob = [home, rail, catalogHome].join("\n");
  assert.equal(/ofertas|SALE|banner-ofertas/i.test(blob), false);
  assert.equal(/banner-look/i.test(blob), false);
  assert.equal(/fal[_-]?key|FAL_KEY|fal\.ai/i.test(blob), false);
});
