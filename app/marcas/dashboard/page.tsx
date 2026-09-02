import { redirect } from "next/navigation";
import { dashboardCopy } from "@/lib/brand";
import { routes } from "@/lib/routes";

export const metadata = {
  title: "Tu tienda — Curadario",
  description: dashboardCopy.footer,
};

export default function MarcasDashboardPage() {
  redirect(routes.marcas);
}
