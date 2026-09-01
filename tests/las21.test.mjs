import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import {
  BRAND_TEASE,
  LAS21_DURATION_MINUTES,
  LAS21_FLOOR,
  LAS21_HOUR,
  LAS21_TIMEZONE,
  LIVE_SHARE_COPY,
  PING_HOUR,
  PING_MINUTE,
  REMIND_CTA,
  dayShareText,
  formatDayCountdown,
  formatLiveCountdown,
  isForceDropParam,
  isInLas21Window,
  isLas21Live,
  liveRemainingMs,
  meetsLas21Floor,
  zonedParts,
} from "../lib/las21-time.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const seed = JSON.parse(readFileSync(join(root, "data/seed.json"), "utf8"));
const las21 = readFileSync(join(root, "lib/las21.ts"), "utf8");
const brand = readFileSync(join(root, "lib/brand.ts"), "utf8");
const home = readFileSync(join(root, "lib/home.ts"), "utf8");

const FORBIDDEN = [
  "arc'teryx",
  "arcteryx",
  "the row",
  "celine",
  "lemaire",
  "nike",
  "zara",
  "gucci",
  "prada",
  "temu",
  "shein",
];

function art(year, month, day, hour, minute, second = 0) {
  return Date.UTC(year, month - 1, day, hour + 3, minute, second);
}

test("timezone and window are Las 21 in Buenos Aires", () => {
  assert.equal(LAS21_TIMEZONE, "America/Buenos_Aires");
  assert.equal(LAS21_HOUR, 21);
  assert.equal(LAS21_DURATION_MINUTES, 20);
});

test("21:05 is live, 21:21 is day, ?drop=1 forces live", () => {
  const inside = art(2026, 9, 1, 21, 5, 0);
  const after = art(2026, 9, 1, 21, 21, 0);
  const afternoon = art(2026, 9, 1, 15, 0, 0);

  assert.equal(zonedParts(inside).hour, 21);
  assert.equal(zonedParts(inside).minute, 5);
  assert.equal(isInLas21Window(inside), true);
  assert.equal(isLas21Live(inside, false), true);
  assert.equal(isInLas21Window(after), false);
  assert.equal(isLas21Live(after, false), false);
  assert.equal(isLas21Live(after, true), true);
  assert.equal(isLas21Live(afternoon, false), false);
  assert.equal(isLas21Live(afternoon, true), true);
  assert.equal(isForceDropParam("1"), true);
  assert.equal(isForceDropParam(undefined), false);
});

test("live countdown starts at 20:00 and day copy is exact", () => {
  const open = art(2026, 9, 1, 21, 0, 0);
  const ten = art(2026, 9, 1, 21, 10, 0);
  const after = art(2026, 9, 1, 21, 21, 0);
  assert.equal(formatLiveCountdown(liveRemainingMs(open)), "20:00");
  assert.equal(formatLiveCountdown(liveRemainingMs(ten)), "10:00");
  assert.match(formatDayCountdown(after), /Faltan \d+ h \d+ min para Las 21\./);
  assert.equal(dayShareText(after), formatDayCountdown(after));
  assert.equal(LIVE_SHARE_COPY, "Está pasando. 20 minutos.");
  assert.equal(LIVE_SHARE_COPY.includes("en Curadario"), false);
  assert.match(home, /Mirá lo que encontré en Curadario\./);
  assert.match(brand, /Mirá lo que encontré en Curadario\./);
  assert.match(home, /Está pasando\. 20 minutos\./);
  assert.equal(home.includes("Está pasando en Curadario. 20 minutos."), false);
  assert.equal(BRAND_TEASE, "hoy a las 21, esta.");
  assert.equal(REMIND_CTA, "Avisame a las 20:55");
  assert.equal(PING_HOUR, 20);
  assert.equal(PING_MINUTE, 55);
});

test("con 3 se prende; con menos no", () => {
  const inside = art(2026, 9, 1, 21, 5, 0);
  assert.equal(LAS21_FLOOR, 3);
  assert.equal(meetsLas21Floor(0), false);
  assert.equal(meetsLas21Floor(1), false);
  assert.equal(meetsLas21Floor(2), false);
  assert.equal(meetsLas21Floor(3), true);
  assert.equal(isLas21Live(inside, false, 2), false);
  assert.equal(isLas21Live(inside, true, 2), false);
  assert.equal(isLas21Live(inside, false, 3), true);
  assert.equal(isLas21Live(inside, true, 3), true);
});

test("tonight is one invented AR store each, never luxury or euros", () => {
  const ids = [
    "tapado-coppola",
    "saco-frances",
    "pantalon-pinza",
    "camisa-oxford",
    "mocasin-goma",
    "tote-lona",
    "baguette-napa",
  ];
  for (const id of ids) {
    assert.match(las21, new RegExp(id));
  }
  const drop = ids.map((id) => seed.skus.find((sku) => sku.id === id));
  assert.ok(drop.every(Boolean));
  const brands = new Set(drop.map((sku) => sku.brand));
  assert.equal(brands.size, drop.length);
  const blob = JSON.stringify(drop).toLowerCase();
  for (const brand of FORBIDDEN) {
    assert.equal(blob.includes(brand), false, brand);
  }
  assert.equal(blob.includes("€"), false);
  assert.equal(blob.includes("eur"), false);
  assert.ok(drop.every((sku) => sku.price_ars > 0));
});
