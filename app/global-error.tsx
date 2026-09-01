"use client";

import { LoadError } from "@/components/LoadError";
import "./globals.css";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="es-AR">
      <body className="min-h-full bg-cream font-sans text-ink">
        <LoadError onRetry={reset} />
      </body>
    </html>
  );
}
