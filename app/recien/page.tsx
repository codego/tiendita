import { RecienStories } from "@/components/RecienStories";
import { homeCopy } from "@/lib/home";

export const metadata = {
  title: "Recién — Con pinta",
  description: homeCopy.hero,
};

export default async function RecienPage({
  searchParams,
}: {
  searchParams: Promise<{ sku?: string }>;
}) {
  const { sku } = await searchParams;
  return <RecienStories startId={sku} />;
}
