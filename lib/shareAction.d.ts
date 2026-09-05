export function isShareAbort(error: unknown): boolean;

export function shareOrCopy(payload: {
  title: string;
  text: string;
  url?: string;
}): Promise<"shared" | "copied" | "aborted" | "failed">;
