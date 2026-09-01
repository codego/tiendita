export const LAS21_TIMEZONE = "America/Buenos_Aires";
export const LAS21_HOUR = 21;
export const LAS21_DURATION_MINUTES = 20;
export const LAS21_FLOOR = 3;
export const LIVE_SHARE_COPY = "Está pasando en Curadario. 20 minutos.";
export const DAY_LINE = "Veinte minutos. Una pieza por tienda. Se acaba.";
export const REMIND_CTA = "Avisame a las 20:55";
export const REMIND_DONE = "Te avisamos a las 20:55.";
export const PING_HOUR = 20;
export const PING_MINUTE = 55;
export const BRAND_TEASE = "hoy a las 21, esta.";
export const RAIL_LABEL = "Más drops llegando";
export const ESTA_LABEL = "¿Esta o esta?";
export const ANOCHE_LABEL = "Lo más reenviado anoche";
export const VER_TODO = "Ver todo";
export const LAS21_LABEL = "LAS 21";
export const LIVE_LABEL = "LIVE";
export const RECIEN_STAMP = "RECIéN";

const WINDOW_MS = LAS21_DURATION_MINUTES * 60 * 1000;

export function zonedParts(now, timeZone = LAS21_TIMEZONE) {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });
  const bag = {};
  for (const part of fmt.formatToParts(new Date(now))) {
    if (part.type !== "literal") bag[part.type] = part.value;
  }
  return {
    year: Number(bag.year),
    month: Number(bag.month),
    day: Number(bag.day),
    hour: Number(bag.hour),
    minute: Number(bag.minute),
    second: Number(bag.second),
  };
}

export function zonedDateToUtcMs(
  year,
  month,
  day,
  hour,
  minute = 0,
  second = 0,
  timeZone = LAS21_TIMEZONE,
) {
  const utcGuess = Date.UTC(year, month - 1, day, hour, minute, second);
  const shown = zonedParts(utcGuess, timeZone);
  const shownAsUtc = Date.UTC(
    shown.year,
    shown.month - 1,
    shown.day,
    shown.hour,
    shown.minute,
    shown.second,
  );
  let utc = utcGuess - (shownAsUtc - utcGuess);
  const check = zonedParts(utc, timeZone);
  if (
    check.year !== year ||
    check.month !== month ||
    check.day !== day ||
    check.hour !== hour ||
    check.minute !== minute ||
    check.second !== second
  ) {
    const checkAsUtc = Date.UTC(
      check.year,
      check.month - 1,
      check.day,
      check.hour,
      check.minute,
      check.second,
    );
    const wantedAsUtc = Date.UTC(year, month - 1, day, hour, minute, second);
    utc -= checkAsUtc - wantedAsUtc;
  }
  return utc;
}

export function isInLas21Window(now) {
  const { hour, minute } = zonedParts(now);
  return hour === LAS21_HOUR && minute < LAS21_DURATION_MINUTES;
}

export function meetsLas21Floor(storeCount) {
  return Number(storeCount) >= LAS21_FLOOR;
}

export function isLas21Live(now, forceDrop = false, storeCount = Number.POSITIVE_INFINITY) {
  if (!meetsLas21Floor(storeCount)) return false;
  return Boolean(forceDrop) || isInLas21Window(now);
}

export function dayShareText(now) {
  return formatDayCountdown(now);
}

export function todayWindowStartMs(now) {
  const parts = zonedParts(now);
  return zonedDateToUtcMs(parts.year, parts.month, parts.day, LAS21_HOUR, 0, 0);
}

export function nextLas21StartMs(now) {
  const todayStart = todayWindowStartMs(now);
  if (now < todayStart) return todayStart;
  const todayEnd = todayStart + WINDOW_MS;
  if (now < todayEnd) return todayStart;
  const tomorrow = zonedParts(todayStart + 24 * 60 * 60 * 1000);
  return zonedDateToUtcMs(
    tomorrow.year,
    tomorrow.month,
    tomorrow.day,
    LAS21_HOUR,
    0,
    0,
  );
}

export function msUntilNextLas21(now) {
  if (isInLas21Window(now)) return 0;
  return Math.max(0, nextLas21StartMs(now) - now);
}

export function liveRemainingMs(now, forceDrop = false) {
  const parts = zonedParts(now);
  if (isInLas21Window(now)) {
    const elapsed = (parts.minute * 60 + parts.second) * 1000;
    return Math.max(0, WINDOW_MS - elapsed);
  }
  if (forceDrop) {
    const elapsed =
      ((parts.minute % LAS21_DURATION_MINUTES) * 60 + parts.second) * 1000;
    return Math.max(0, WINDOW_MS - elapsed);
  }
  return 0;
}

export function formatLiveCountdown(remainingMs) {
  const total = Math.max(0, Math.ceil(remainingMs / 1000));
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function formatDayCountdown(now) {
  const ms = msUntilNextLas21(now);
  const hours = Math.floor(ms / 3_600_000);
  const minutes = Math.floor((ms % 3_600_000) / 60_000);
  return `Faltan ${hours} h ${minutes} min para Las 21.`;
}

export function stageIndex(remainingMs, count) {
  if (count <= 1) return 0;
  const elapsed = Math.max(0, WINDOW_MS - remainingMs);
  const slot = WINDOW_MS / count;
  return Math.min(count - 1, Math.floor(elapsed / slot));
}

export function isJustDropped(remainingMs, count) {
  const elapsed = Math.max(0, WINDOW_MS - remainingMs);
  const slot = WINDOW_MS / Math.max(1, count);
  return elapsed % slot < 90_000;
}

export function isForceDropParam(drop) {
  return drop === "1";
}
