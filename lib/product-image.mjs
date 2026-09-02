/** Product photos come from TiendaNube only. Missing → cream frame, never fal. */
export function hasProductImage(src) {
  return typeof src === "string" && src.trim().length > 0;
}

export function tnProductImage(src) {
  return hasProductImage(src) ? src.trim() : "";
}
