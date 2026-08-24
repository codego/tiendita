import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-cream px-6">
      <div className="max-w-[430px] text-center">
        <Wordmark />
        <h1 className="mt-6 font-serif text-[28px] text-ink">
          Esa pieza no está.
        </h1>
        <p className="mt-2 font-sans text-[15px] text-ink/60">
          Volvé a la tapa o a la colección de agosto.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-ink px-6 font-sans text-[15px] text-paper"
        >
          Ir al inicio
        </Link>
      </div>
    </div>
  );
}
