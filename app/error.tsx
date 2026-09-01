"use client";

import { LoadError } from "@/components/LoadError";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <LoadError onRetry={reset} />;
}
