import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

function fold(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "");
}

function searchSeed(skus, query) {
  const tokens = fold(query).split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return skus;
  return skus.filter((sku) => {
    const hay = fold(
      [sku.name, sku.brand, sku.category, sku.categoryLabel, sku.chip].join(" "),
    );
    return tokens.every((token) => hay.includes(token));
  });
}

const notFound = read("app/not-found.tsx");
const notFoundCopy = read("lib/not-found-copy.ts");
const contacto = read("lib/contacto.ts");
const form = read("components/ContactForm.tsx");
const contactoPage = read("app/contacto/page.tsx");
const searchPanel = read("components/SearchPanel.tsx");
const catalog = read("lib/catalog.ts");
const saved = read("components/SavedGrid.tsx");
const savedLib = read("lib/saved.ts");
const heart = read("components/HeartButton.tsx");
const productCard = read("components/ProductCard.tsx");
const nav = read("components/BottomNav.tsx");
const helpFaq = read("components/HelpFaq.tsx");
const seed = JSON.parse(read("data/seed.json"));

test("404 uses Elena's terracotta feed line", () => {
  assert.match(notFoundCopy, /Esto no está en Curadario\./);
  assert.match(notFoundCopy, /Volvé al feed\./);
  assert.match(notFoundCopy, /Ir al feed →/);
  assert.match(notFound, /tone="terracotta"/);
  assert.match(notFound, /text-terracotta/);
  assert.match(notFound, /bg-terracotta/);
  assert.match(notFound, /routes\.landing/);
  assert.match(notFound, /SearchIcon/);
  assert.equal(notFound.includes("Ver Looks"), false);
  assert.equal(notFound.toLowerCase().includes("olive"), false);
});

test("contacto is a form with Soy pills, not a fake inbox", () => {
  assert.match(contacto, /Marcas y el resto, acá\./);
  assert.match(contacto, /Nombre/);
  assert.match(contacto, /Email/);
  assert.match(contacto, /Soy/);
  assert.match(contacto, /Marca/);
  assert.match(contacto, /Shopper/);
  assert.match(contacto, /Mensaje/);
  assert.match(contacto, /Enviar/);
  assert.match(contacto, /Mensaje enviado\./);
  assert.match(form, /saveContactMessage/);
  assert.match(form, /postContactMessage/);
  assert.match(form, /contactoCopy\.done/);
  assert.match(form, /contactoCopy\.doneCta/);
  assert.match(form, /aria-live="polite"/);
  assert.match(form, /contactoCopy\.marca/);
  assert.match(form, /contactoCopy\.shopper/);
  assert.match(form, /bg-ink/);
  assert.match(form, /routes\.landing/);
  assert.match(contactoPage, /ContactForm/);
  assert.match(helpFaq, /routes\.contacto/);
  assert.equal(contacto.includes("marcas@curadario.la"), false);
  assert.equal(form.includes("marcas@curadario.la"), false);
  assert.equal(contactoPage.includes("marcas@curadario.la"), false);
  assert.equal(helpFaq.includes("mailto:"), false);
});

test("Buscar filters the seed by brand, name, and category", () => {
  assert.match(catalog, /searchSkus/);
  assert.match(catalog, /sku\.brand/);
  assert.match(catalog, /sku\.name/);
  assert.match(catalog, /sku\.category/);
  assert.match(searchPanel, /searchSkus/);
  assert.match(searchPanel, /No encontramos eso\.|emptySearch/);
  assert.match(searchPanel, /aria-live="polite"/);
  assert.match(searchPanel, /Ir al feed|emptySearch\.cta/);
  assert.match(searchPanel, /routes\.landing/);
  const byBrand = searchSeed(seed.skus, "Taller Recoleta");
  assert.ok(byBrand.some((sku) => sku.id === "tapado-coppola"));
  const byName = searchSeed(seed.skus, "Tapado");
  assert.ok(byName.some((sku) => sku.name.toLowerCase().includes("tapado")));
  const byCategory = searchSeed(seed.skus, "sastreria");
  assert.ok(byCategory.length > 0);
  assert.equal(searchSeed(seed.skus, "zzzznoexiste").length, 0);
});

test("Guardados stays as a persisted pocket of hearts", () => {
  assert.match(nav, /Guardados/);
  assert.match(nav, /routes\.guardados/);
  assert.match(saved, /useSavedIds/);
  assert.match(saved, /emptyGuardados/);
  assert.match(savedLib, /curadario:saved/);
  assert.match(savedLib, /localStorage/);
  assert.match(savedLib, /toggleSaved/);
  assert.match(heart, /toggleSaved|toggle\(/);
  assert.match(productCard, /HeartButton/);
});
