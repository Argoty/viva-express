import Image from "next/image";

export default function Servicios() {
    return (
        <section className="flex flex-col items-center w-full bg-white space-y-10 mt-2">
            {/* Servicios en Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl px-4">
                <div className="flex flex-col items-center bg-gradient-to-br from-blue-500 to-blue-700 p-5 rounded-lg shadow-xl z-0">
                    <div className="flex flex-col items-center hover:scale-110 transition-transform">
                        <Image src="/mensajeriaImagen.png" alt="Mensajería" width={70} height={70} />
                        <p className="mt-2 text-lg font-semibold text-white">Mensajería</p>
                    </div>
                </div>
                <div className="flex flex-col items-center bg-gradient-to-br from-red-500 to-red-700 p-3 rounded-lg shadow-xl z-0">
                    <div className="flex flex-col items-center hover:scale-110 transition-transform">
                        <Image src="/paqueteria.png" alt="Paquetería" width={70} height={70} />
                        <p className="mt-2 text-lg font-semibold text-white">Paquetería</p>
                    </div>
                </div>
            </div>

            {/* Texto descriptivo */}
            <div className="text-center">
                <p className="text-base text-gray-700 leading-relaxed">
                    Enviamos documentos y paquetería para <span className="font-semibold text-black">Bogotá</span> y <span className="font-semibold text-black">Génova</span> desde <span className="font-semibold">1 kg</span> hasta <span className="font-semibold">5 kg</span>.
                    <br />
                    Para el <span className="font-semibold text-black">Quindío</span>, <span className="font-semibold text-black">Caicedonia</span> y <span className="font-semibold text-black">Sevilla</span> manejamos todo tipo de carga.
                    <br />
                    Recogemos en tu domicilio sin costo adicional.
                </p>
            </div>

            {/* Mapa más pequeño */}
            <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-900 hover:scale-105 transition-transform z-0">
                <Image
                    src="/mapa.png"
                    alt="Mapa"
                    width={350}
                    height={250}
                    className="object-cover"
                />
            </div>
        </section>
    );
}

