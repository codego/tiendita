import { BrandPicker } from "@/components/BrandPicker";
import { elegirCopy } from "@/lib/brand";
import { getTiendaNubeProducts, getTiendaNubeStore } from "@/lib/tiendanube";

export const metadata = {
  title: "Elegí qué publicar — Curadario",
  description: elegirCopy.title,
};

export default function MarcasElegirPage() {
  return (
    <BrandPicker
      store={getTiendaNubeStore()}
      products={getTiendaNubeProducts()}
    />
  );
}
