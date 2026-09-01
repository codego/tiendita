import Link from "next/link";
import { routes } from "@/lib/routes";

export function SiteLinks({ className = "" }: { className?: string }) {
  return (
    <p className={className}>
      <Link href={routes.queEs} className="underline underline-offset-2">
        Qué es
      </Link>
      <span className="mx-2">·</span>
      <Link href={routes.faq} className="underline underline-offset-2">
        FAQ
      </Link>
      <span className="mx-2">·</span>
      <Link href={routes.contacto} className="underline underline-offset-2">
        Contacto
      </Link>
      <span className="mx-2">·</span>
      <Link href={routes.terminos} className="underline underline-offset-2">
        Términos
      </Link>
      <span className="mx-2">·</span>
      <Link href={routes.privacidad} className="underline underline-offset-2">
        Privacidad
      </Link>
    </p>
  );
}
