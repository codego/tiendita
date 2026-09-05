export const LAS21_TIMEZONE: "America/Buenos_Aires";
export const LAS21_HOUR: 21;
export const LAS21_DURATION_MINUTES: 20;
export const LAS21_FLOOR: 3;
export const LIVE_SHARE_COPY: "Está pasando en Con pinta. 20 minutos.";
export const DAY_LINE: "Veinte minutos. Una pieza por tienda. Se acaba.";
export const REMIND_CTA: "Avisame a las 20:55";
export const REMIND_DONE: "Te avisamos a las 20:55.";
export const PING_HOUR: 20;
export const PING_MINUTE: 55;
export const PING_WINDOW_MS: 60_000;
export const PUSH_TITLE: "Está pasando en Con pinta.";
export const PUSH_BODY: "20 minutos.";
export const PUSH_URL: "/las21";
export const PUSH_TAG: "conpinta-las21";
export const BRAND_TEASE: "hoy a las 21, esta.";
export const RAIL_LABEL: "Más drops llegando";
export const ESTA_LABEL: "¿Esta o esta?";
export const ANOCHE_LABEL: "Lo más reenviado anoche";
export const VER_TODO: "Ver todo";
export const LAS21_LABEL: "LAS 21";
export const LIVE_LABEL: "LIVE";
export const RECIEN_STAMP: "RECIéN";

export type ZonedParts = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
};

export function zonedParts(now: number, timeZone?: string): ZonedParts;
export function zonedDateToUtcMs(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute?: number,
  second?: number,
  timeZone?: string,
): number;
export function isInLas21Window(now: number): boolean;
export function meetsLas21Floor(storeCount: number): boolean;
export function isLas21Live(
  now: number,
  forceDrop?: boolean,
  storeCount?: number,
): boolean;
export function dayShareText(now: number): string;
export function todayWindowStartMs(now: number): number;
export function nextLas21StartMs(now: number): number;
export function msUntilNextLas21(now: number): number;
export function liveRemainingMs(now: number, forceDrop?: boolean): number;
export function formatLiveCountdown(remainingMs: number): string;
export function formatDayCountdown(now: number): string;
export function stageIndex(remainingMs: number, count: number): number;
export function isJustDropped(remainingMs: number, count: number): boolean;
export function isForceDropParam(drop: string | undefined): boolean;
export function isForcePingParam(ping: string | undefined): boolean;
export function isForceMerchantMailParam(mail: string | undefined): boolean;
export function pingDayKey(now: number): string;
export function todayPingMs(now: number): number;
export function nextPingMs(now: number): number;
export function isInPingWindow(now: number): boolean;
export function msUntilNextPing(now: number): number;
