import { AppShell } from "@/components/AppShell";
import { LooksIndex } from "@/components/LooksIndex";
import { getLooksCollections } from "@/lib/catalog";

export const metadata = {
  title: "Looks — Con pinta",
  description: "Colecciones curadas. Sastrería de agosto es una.",
};

export default function LooksPage() {
  return (
    <AppShell>
      <div className="pt-2">
        <LooksIndex collections={getLooksCollections()} />
      </div>
    </AppShell>
  );
}
