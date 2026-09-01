import { BrandDashboard } from "@/components/BrandDashboard";
import { dashboardCopy } from "@/lib/brand";

export const metadata = {
  title: "Esta semana — Curadario",
  description: dashboardCopy.footer,
};

export default function MarcasDashboardPage() {
  return <BrandDashboard />;
}
