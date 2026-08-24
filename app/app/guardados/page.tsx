import { AppShell } from "@/components/AppShell";
import { SavedGrid } from "@/components/SavedGrid";

export default function GuardadosPage() {
  return (
    <AppShell>
      <div className="px-5 pb-10 pt-2">
        <h1 className="font-serif text-[32px] leading-tight text-ink">
          Guardados
        </h1>
        <p className="mt-1 font-serif text-[16px] italic text-ink/70">
          Lo que te quedaste mirando.
        </p>
        <SavedGrid />
      </div>
    </AppShell>
  );
}
