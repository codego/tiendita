export function isShareAbort(error) {
  if (!error || typeof error !== "object") return false;
  return "name" in error && error.name === "AbortError";
}

export async function shareOrCopy(payload) {
  if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
    try {
      await navigator.share({
        title: payload.title,
        text: payload.text,
        url: payload.url,
      });
      return "shared";
    } catch (error) {
      if (isShareAbort(error)) return "aborted";
    }
  }

  try {
    if (!navigator.clipboard?.writeText) return "failed";
    await navigator.clipboard.writeText(payload.text);
    return "copied";
  } catch {
    return "failed";
  }
}
