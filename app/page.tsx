import { Las21Home } from "@/components/Las21Home";
import { homeCopy } from "@/lib/home";
import {
  getAnocheForwarded,
  getEstaOEsta,
  getTonightDrop,
  isForceDropParam,
} from "@/lib/las21";

export const metadata = {
  title: "Curadario — Las 21",
  description: homeCopy.hero,
};

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ drop?: string }>;
}) {
  const { drop } = await searchParams;
  return (
    <Las21Home
      forceDrop={isForceDropParam(drop)}
      initialNow={Date.now()}
      drop={getTonightDrop()}
      esta={getEstaOEsta()}
      anoche={getAnocheForwarded()}
    />
  );
}
