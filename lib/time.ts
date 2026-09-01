export function relativeHace(at: number, now = Date.now()): string {
  const minutes = Math.max(0, Math.round((now - at) / 60_000));
  if (minutes < 1) return "hace instantes";
  if (minutes === 1) return "hace 1 min";
  if (minutes < 60) return `hace ${minutes} min`;
  const hours = Math.round(minutes / 60);
  if (hours === 1) return "hace 1 h";
  if (hours < 24) return `hace ${hours} h`;
  const days = Math.round(hours / 24);
  if (days === 1) return "hace 1 día";
  return `hace ${days} días`;
}
