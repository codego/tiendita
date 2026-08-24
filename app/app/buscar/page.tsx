import { AppShell } from "@/components/AppShell";
import { SearchPanel } from "@/components/SearchPanel";

export default function BuscarPage() {
  return (
    <AppShell>
      <div className="pt-2">
        <SearchPanel />
      </div>
    </AppShell>
  );
}
