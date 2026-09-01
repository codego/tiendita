export const LAS21_TIMEZONE: "America/Buenos_Aires";
export const LAS21_HOUR: 21;
export const LAS21_DURATION_MINUTES: 20;
export const LIVE_SHARE_COPY: "Está pasando en Curadario. 20 minutos.";
export const DAY_LINE: "Veinte minutos. Una pieza por tienda. Se acaba.";
export const REMIND_CTA: "Avisame a las 20:55";
export const REMIND_DONE: "Te avisamos a las 20:55.";
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
export function isLas21Live(now: number, forceDrop?: boolean): boolean;
export function todayWindowStartMs(now: number): number;
export function nextLas21StartMs(now: number): number;
export function msUntilNextLas21(now: number): number;
export function liveRemainingMs(now: number, forceDrop?: boolean): number;
export function formatLiveCountdown(remainingMs: number): string;
export function formatDayCountdown(now: number): string;
export function stageIndex(remainingMs: number, count: number): number;
export function isJustDropped(remainingMs: number, count: number): boolean;
export function isForceDropParam(drop: string | undefined): boolean;
