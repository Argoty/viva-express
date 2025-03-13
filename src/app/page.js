import Navbar from "@/components/Navbar";
import Servicios from "@/components/Servicios";

export default function Home() {
  return (
    <main className="flex flex-col h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Contenido principal que empuja el footer hacia abajo */}
      <section className="flex flex-col items-center justify-center flex-grow bg-white">
        <Servicios />
      </section>
    </main>
  );
}


