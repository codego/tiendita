import { AppShell } from "@/components/AppShell";
import { SearchPanel } from "@/components/SearchPanel";

export default async function BuscarPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return (
    <AppShell>
      <div className="pt-2">
        <SearchPanel initialQuery={q ?? ""} />
      </div>
    </AppShell>
  );
}
