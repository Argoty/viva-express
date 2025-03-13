import Image from "next/image";

export default function Servicios() {
    return (
        <>
            <div className="mt-8 flex justify-center gap-12">
                <div className="flex flex-col items-center">
                    <Image src="/mensajeriaImagen.png" alt="Mensajería" width={80} height={80} />
                    <p className="mt-2 text-lg font-semibold">Mensajería</p>
                </div>
                <div className="flex flex-col items-center">
                    <Image src="/paqueteria.png" alt="Paquetería" width={80} height={80} />
                    <p className="mt-2 text-lg font-semibold">Paquetería</p>
                </div>
            </div>

            {/* Texto */}
            <p className="mt-6 text-center text-gray-700 text-lg">
                Enviamos todo tipo de documentos y paquetería para la ciudad de Bogotá y en todo Quindio.
                <br />
                Recogemos en tu domicilio sin costo.
                <br />
                Paquetería desde 1 kg hasta 5 kg.
            </p>
        </>
    );
}

