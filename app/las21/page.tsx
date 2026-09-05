import { Las21Home } from "@/components/Las21Home";
import { getTonightDrop, isForceDropParam } from "@/lib/las21";
import { dropMetadata } from "@/lib/seo";

export const metadata = dropMetadata();

export default async function Las21Page({
  searchParams,
}: {
  searchParams: Promise<{ drop?: string }>;
}) {
  const { drop } = await searchParams;
  return (
    <Las21Home
      forceDrop={isForceDropParam(drop)}
      drop={getTonightDrop()}
    />
  );
}
