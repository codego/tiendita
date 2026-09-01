import { ShareSheet } from "@/components/ShareSheet";
import { shareCopy } from "@/lib/brand";
import { getTapaCollection, getTapaSkus } from "@/lib/catalog";

export const metadata = {
  title: "Compartir el look — Curadario",
  description: `${shareCopy.headline} ${shareCopy.sub}`,
};

export default function CompartirLookPage() {
  return (
    <ShareSheet
      look={getTapaCollection()}
      pieces={getTapaSkus()}
      hero="/images/tapa-sastreria.jpg"
    />
  );
}
