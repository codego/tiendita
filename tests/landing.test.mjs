import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const home = readFileSync(join(root, "lib/home.ts"), "utf8");
const landing = readFileSync(join(root, "app/page.tsx"), "utf8");
const live = readFileSync(join(root, "components/LiveStage.tsx"), "utf8");
const day = readFileSync(join(root, "components/DaySchedule.tsx"), "utf8");
const lasHome = readFileSync(join(root, "components/Las21Home.tsx"), "utf8");
const shareBtn = readFileSync(join(root, "components/LiveShareButton.tsx"), "utf8");
const remind = readFileSync(join(root, "components/RemindButton.tsx"), "utf8");
const storeCta = readFileSync(join(root, "components/StoreCta.tsx"), "utf8");
const globals = readFileSync(join(root, "app/globals.css"), "utf8");
const readme = readFileSync(join(root, "README.md"), "utf8");
const las21 = readFileSync(join(root, "lib/las21.ts"), "utf8");
const las21Time = readFileSync(join(root, "lib/las21-time.mjs"), "utf8");

test("home is Las 21, not a catalog feed", () => {
  assert.match(landing, /Las21Home/);
  assert.match(landing, /isForceDropParam/);
  assert.match(landing, /getTonightDrop/);
  assert.equal(landing.includes("CatalogHome"), false);
  assert.equal(lasHome.includes("grid-cols-2"), false);
  assert.equal(lasHome.includes("ProductCard"), false);
  assert.equal(live.includes("ProductCard"), false);
  assert.equal(day.includes("CategoryChips"), false);
  assert.match(lasHome, /isLas21Live/);
  assert.match(lasHome, /forceDrop/);
});

test("live window copy and one piece on stage", () => {
  assert.match(home, /Está pasando en Curadario\. 20 minutos\./);
  assert.match(home, /Más drops llegando/);
  assert.match(home, /LAS 21/);
  assert.match(home, /LIVE/);
  assert.match(live, /LAS21_LABEL/);
  assert.match(live, /LIVE_LABEL/);
  assert.match(live, /RAIL_LABEL/);
  assert.match(live, /formatARS/);
  assert.match(live, /StoreCta/);
  assert.match(live, /LiveShareButton/);
  assert.match(live, /RECIEN_STAMP/);
  assert.match(live, /splitStageAndRail/);
  assert.match(shareBtn, /LIVE_SHARE_COPY|liveShareText/);
  assert.equal(live.includes("€"), false);
  assert.equal(live.includes("EUR"), false);
  assert.equal(live.toLowerCase().includes("euro"), false);
});

test("day state is a countdown, not a mall", () => {
  assert.match(home, /Veinte minutos\. Una pieza por tienda\. Se acaba\./);
  assert.match(home, /Avisame a las 20:55/);
  assert.match(home, /¿Esta o esta\?/);
  assert.match(home, /Lo más reenviado anoche/);
  assert.match(home, /Ver todo/);
  assert.match(day, /DAY_LINE/);
  assert.match(day, /RemindButton/);
  assert.match(day, /ESTA_LABEL/);
  assert.match(day, /ANOCHE_LABEL/);
  assert.match(day, /VER_TODO/);
  assert.match(day, /routes\.anoche/);
  assert.match(remind, /Avisame a las 20:55|REMIND_CTA/);
  assert.equal(day.includes("ProductCard"), false);
  assert.equal(day.includes("CategoryChips"), false);
});

test("tokens stay Curadario, not Temu orange", () => {
  assert.match(globals, /#161513/);
  assert.match(globals, /#c8553d/i);
  assert.match(globals, /#efe9dd/i);
  assert.match(globals, /#fbfaf6/i);
  assert.equal(globals.toLowerCase().includes("#ff6a00"), false);
  assert.equal(live.toLowerCase().includes("orange"), false);
  assert.equal(day.toLowerCase().includes("orange"), false);
  assert.match(live, /bg-ink/);
  assert.match(day, /bg-cream|bg-surface/);
});

test("shopper still has no bag or own checkout", () => {
  const shopper = [landing, live, day, lasHome, storeCta].join("\n");
  assert.equal(
    /\b(bag|cart|carrito|checkout|pagar|ruleta|roulette)\b|-\d+%/i.test(shopper),
    false,
  );
  assert.equal(storeCta.includes("Ir a la tienda →"), true);
  assert.equal(storeCta.includes("Pagar"), false);
});

test("readme is local Las 21 preview", () => {
  assert.match(readme, /git pull/);
  assert.match(readme, /npm run dev/);
  assert.match(readme, /localhost:3000/);
  assert.match(readme, /drop=1/);
  assert.match(readme, /America\/Buenos_Aires/);
  assert.match(readme, /21:00/);
  assert.match(readme, /21:20/);
  assert.match(readme, /Está pasando en Curadario\. 20 minutos\./);
  assert.match(las21Time, /America\/Buenos_Aires/);
  assert.match(las21, /tapado-coppola/);
});
