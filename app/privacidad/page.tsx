import { LegalDoc } from "@/components/LegalDoc";
import { legalCopy } from "@/lib/brand";

export const metadata = {
  title: "Privacidad — Curadario",
  description: legalCopy.vitrina,
};

export default function PrivacidadPage() {
  return (
    <LegalDoc title="Privacidad">
      <p>{legalCopy.vitrina}</p>
      <p>
        No pedimos pagos ni datos de checkout. El carrito vive en la tienda de
        la marca. Curadario no recibe números de tarjeta, CBU ni comprobantes.
      </p>
      <p>
        En este corte local, lo que queda en tu navegador es mínimo: piezas
        guardadas, la selección publicada de la marca y eventos de{" "}
        <span className="font-mono text-[13px]">cta_to_store</span>. No hay
        cuenta real ni servidor de analítica.
      </p>
      <p>
        El conector de TiendaNube está mockeado con un seed de prendas. No
        sincronizamos catálogos ajenos ni leemos clientes de una tienda.
      </p>
      <p>
        Si más adelante hay OAuth verdadero, pediremos solo el alcance para
        listar productos y marcar cuáles se ven en la vitrina. Nunca el
        permiso para cobrar.
      </p>
    </LegalDoc>
  );
}
