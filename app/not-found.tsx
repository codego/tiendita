import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";
import { routes } from "@/lib/routes";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-cream px-6">
      <div className="max-w-md text-center">
        <Wordmark />
        <h1 className="mt-6 font-serif text-[28px] text-ink">
          Esa pieza no está.
        </h1>
        <p className="mt-2 font-sans text-[15px] text-ink/60">
          Volvé a la tapa o a la colección de agosto.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href={routes.landing}
            className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-6 font-sans text-[15px] text-paper"
          >
            Ir al inicio
          </Link>
          <Link
            href={routes.coleccion}
            className="inline-flex h-12 items-center justify-center rounded-full border border-ink px-6 font-sans text-[15px] text-ink"
          >
            Ver Sastrería de agosto
          </Link>
        </div>
      </div>
    </div>
  );
}
