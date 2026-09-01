import { LegalDoc } from "@/components/LegalDoc";
import { legalCopy } from "@/lib/brand";

export const metadata = {
  title: "Términos — Curadario",
  description: legalCopy.vitrina,
};

export default function TerminosPage() {
  return (
    <LegalDoc title="Términos">
      <p>{legalCopy.vitrina}</p>
      <p>{legalCopy.noCheckout}</p>
      <p>
        Curadario muestra una selección editorial de indumentaria. Las marcas
        publican qué piezas aparecen; lo no elegido no se muestra. Quien compra,
        compra en la TiendaNube de la marca, con el checkout y los medios de
        pago de esa tienda.
      </p>
      <p>
        Continuar con TiendaNube, en este corte, es un OAuth simulado: no
        conecta una tienda real ni mueve stock, pedidos ni dinero.
      </p>
      <p>
        Al usar Curadario aceptás que el vínculo comercial es entre vos y la
        marca. Nosotros no somos parte de la venta, no emitimos facturas y no
        guardamos datos de tarjetas.
      </p>
    </LegalDoc>
  );
}
