import { redirect } from "next/navigation";
import { routes } from "@/lib/routes";

export const metadata = {
  title: "Ayuda — Con pinta",
  description: "Vitrina de marcas de TiendaNube. Tocás, vas a su tienda.",
};

export default function AyudaPage() {
  redirect(routes.faq);
}
