import CotizarButton from "@/components/CotizarButton";
import Servicios from "@/components/Servicios";

export default function Home() {
  return (
    <main className="flex flex-col pt-15 pb-20 px-5">
      {/* Botón Cotizar en la esquina superior derecha */}
       <CotizarButton />
      <Servicios />
      
    </main>
  );
}







