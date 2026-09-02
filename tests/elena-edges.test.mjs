import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

function walk(dir, suffix) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(path, suffix));
    else if (entry.name.endsWith(suffix)) out.push(path);
  }
  return out;
}

const edges = read("lib/edges.ts");
const brand = read("lib/brand.ts");
const seo = read("lib/seo.ts");
const env = read("lib/env.ts");
const envExample = read(".env.example");
const readme = read("README.md");
const routes = read("lib/routes.ts");
const cookie = read("components/CookieBanner.tsx");
const pwa = read("components/PwaPrompt.tsx");
const chrome = read("components/ShopperChrome.tsx");
const publish = read("components/PublishConfirm.tsx");
const picker = read("components/BrandPicker.tsx");
const dashboard = read("components/BrandDashboard.tsx");
const analytics = read("lib/analytics.ts");
const productCard = read("components/ProductCard.tsx");
const railCard = read("components/RailCard.tsx");
const marcaPage = read("app/marca/[slug]/page.tsx");
const marcaLib = read("lib/marca.ts");
const skeleton = read("components/Skeleton.tsx");
const globals = read("app/globals.css");
const catalogHome = read("components/CatalogHome.tsx");
const pieza = read("app/app/pieza/[slug]/page.tsx");
const compartir = read("app/app/coleccion/compartir/page.tsx");
const las21Page = read("app/las21/page.tsx");
const las21Og = read("app/las21/opengraph-image.tsx");
const layout = read("app/layout.tsx");
const liveShare = read("components/LiveShareButton.tsx");
const shareFinding = read("lib/shareFinding.ts");
const seed = JSON.parse(read("data/seed.json"));

test("cookie banner uses Elena's locked line and persists Entendido", () => {
  assert.match(edges, /Usamos lo mínimo para que funcione\./);
  assert.match(edges, /Privacidad →/);
  assert.match(edges, /Entendido/);
  assert.match(edges, /curadario:cookie-ok/);
  assert.match(cookie, /cookieCopy\.line/);
  assert.match(cookie, /cookieCopy\.privacy/);
  assert.match(cookie, /cookieCopy\.accept/);
  assert.match(cookie, /routes\.privacidad/);
  assert.match(cookie, /markCookieAccepted/);
  assert.match(chrome, /CookieBanner/);
});

test("PWA prompt uses the mock copy and beforeinstallprompt", () => {
  assert.match(edges, /Abrí Curadario desde el home/);
  assert.match(
    edges,
    /Instalá la app en tu pantalla de inicio para acceder más rápido\./,
  );
  assert.match(edges, /Agregar/);
  assert.match(edges, /Ahora no/);
  assert.match(pwa, /pwaCopy\.title/);
  assert.match(pwa, /pwaCopy\.body/);
  assert.match(pwa, /pwaCopy\.add/);
  assert.match(pwa, /pwaCopy\.later/);
  assert.match(pwa, /beforeinstallprompt/);
  assert.match(pwa, /markPwaDismissed/);
  assert.match(chrome, /PwaPrompt/);
});

test("publish confirm is Listo. over elegir, then Ver el feed", () => {
  assert.match(brand, /Listo\./);
  assert.match(brand, /Ya está en Curadario\./);
  assert.match(brand, /Ver el feed/);
  assert.match(picker, /PublishConfirm/);
  assert.match(picker, /setDone\(true\)/);
  assert.match(picker, /hasPublishedOnce/);
  assert.match(picker, /router\.push/);
  assert.match(publish, /publishCopy\.title/);
  assert.match(publish, /publishCopy\.sub/);
  assert.match(publish, /publishCopy\.feed/);
  assert.match(publish, /routes\.landing/);
  assert.match(publish, /onClose/);
});

test("ficha de marca is /marca and does not collide with /marcas", () => {
  assert.match(routes, /marca: \(slug: string\) => `\/marca\/\$\{slug\}`/);
  assert.match(routes, /marcas: "\/marcas"/);
  assert.match(marcaLib, /brandSlug/);
  assert.match(marcaPage, /marcaCountLine/);
  assert.match(edges, /TiendaNube · \$\{count\} \$\{noun\} en Curadario/);
  assert.match(edges, /Ir a su tienda/);
  assert.match(marcaPage, /BrandStoreCta/);
  assert.match(marcaPage, /BrandMark/);
  assert.match(marcaPage, /text-terracotta/);
  assert.match(productCard, /BrandNameLink/);
  assert.match(railCard, /BrandNameLink/);
  assert.match(marcaPage, /emptyMarca/);
  const taller = seed.skus.find((sku) => sku.brand === "Taller Recoleta");
  assert.equal(taller.id, "tapado-coppola");
  assert.equal(
    seed.skus.some((sku) => sku.brand === "Casa Norte"),
    false,
  );
});

test("OG hallazgo and Las 21 drop cards are locked", () => {
  assert.match(seo, /Mirá lo que encontré en Curadario/);
  assert.match(seo, /Está pasando\. 20 minutos\./);
  assert.match(seo, /curadario.app/);
  assert.match(seo, /sku\.image/);
  assert.match(pieza, /findingMetadata/);
  assert.match(compartir, /findingMetadata/);
  assert.match(layout, /metadataBase/);
  assert.match(layout, /getSiteUrl/);
  assert.match(env, /NEXT_PUBLIC_SITE_URL/);
  assert.match(envExample, /NEXT_PUBLIC_SITE_URL/);
  assert.match(readme, /NEXT_PUBLIC_SITE_URL/);
  assert.match(las21Page, /dropMetadata|LIVE_SHARE_COPY/);
  assert.match(las21Og, /LAS 21/);
  assert.match(las21Og, /#C8553D/);
  assert.match(liveShare, /liveShareUrl/);
  assert.match(shareFinding, /routes\.las21/);
});

test("merchant click notice is the locked line", () => {
  assert.match(brand, /Alguien salió de Curadario a tu ficha\./);
  assert.match(analytics, /Alguien salió de Curadario a tu ficha\./);
  assert.match(dashboard, /useWeekStoreClicks|countStoreClicksThisWeek/);
});

test("home grid skeleton is terracotta shimmer, not a spinner", () => {
  assert.match(skeleton, /skeleton-shimmer/);
  assert.match(skeleton, /aspect-\[3\/4\]/);
  assert.match(globals, /curadario-shimmer/);
  assert.match(catalogHome, /RecienRailSkeleton/);
  assert.match(catalogHome, /Las21Module/);
  assert.match(catalogHome, /ProductCard/);
  assert.match(catalogHome, /recient\.length > 0/);
  assert.equal(skeleton.toLowerCase().includes("spinner"), false);
});

test("locked Elena copy does not invent a Curadario inbox", () => {
  const scanned = [
    edges,
    brand,
    seo,
    cookie,
    pwa,
    publish,
    marcaPage,
    readme,
    ...walk(join(root, "app"), ".tsx").map((path) => readFileSync(path, "utf8")),
    ...walk(join(root, "components"), ".tsx").map((path) =>
      readFileSync(path, "utf8"),
    ),
  ].join("\n");
  assert.equal(scanned.includes("marcas@curadario.la"), false);
  assert.equal(scanned.includes("@curadario.com"), false);
});
