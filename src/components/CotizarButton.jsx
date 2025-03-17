"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FiDollarSign, FiTrendingUp } from "react-icons/fi";
import { Combobox } from "@/components/ui/combobox";

const destinos = [
  { label: "Bogotá", value: "bogota" },
  { label: "Todo Quindío | Caicedonia y Sevilla", value: "quindio" },
];

export default function CotizarButton() {
  const [open, setOpen] = useState(false);
  const [kg, setKg] = useState("1");
  const [destino, setDestino] = useState("");
  const [valorComercial, setValorComercial] = useState("");
  const [precioEstimado, setPrecioEstimado] = useState(null);

  // Mensajes de error
  const [errorDestino, setErrorDestino] = useState("");
  const [errorValor, setErrorValor] = useState("");

  // Obtener el valor minimo comercial segun kilos
  const getMinimoValorComercial = (kg) => {
    const kgInt = parseInt(kg);
    if (kgInt >= 1 && kgInt <= 3) return 25000;
    if (kgInt >= 4 && kgInt <= 5) return 30000;
    return 0;
  };

  // Manejar el input de los kilos que solo permita 1-5 kg
  const handleKgChange = (e) => {
    let value = e.target.value;
    if (value === "") {
      setKg("");
      return;
    }
    let numericValue = parseInt(value, 10);
    if (isNaN(numericValue) || numericValue < 1 || numericValue > 5) {
      numericValue = "";
    }
    setKg(numericValue.toString());
    if (errorValor!="") setErrorValor("");
  };

  // Calcula el precio
  const calcularValores = () => {
    const kgValue = parseInt(kg);
    const minimo = getMinimoValorComercial(kgValue);

    // Resetear errores
    setErrorDestino("");
    setErrorValor("");

    let valido = true;

    // Valida si destino existe
    if (!destino) {
      setErrorDestino("Debe seleccionar un destino.");
      valido = false;
    }
     // Valida que valor comercial sea mayor que el minimo
    if (valorComercial === "" || parseInt(valorComercial) < minimo) {
      setErrorValor(`El valor debe ser mínimo $${new Intl.NumberFormat("es-CO").format(minimo)}.`);
      valido = false;
    }

    if (!valido) {
      setPrecioEstimado(null);
      return;
    }

    // Calcula el precio total
    const precioPorKg = destino === "bogota" ? 12000 : 9000;
    const precioBase = kgValue * precioPorKg;
    const porcentaje = parseInt(valorComercial) * 0.02;
    const precioTotal = precioBase + porcentaje;

    setPrecioEstimado(precioTotal);
  };

  return (
    <div className="flex justify-end mt-2">
      <Button className="flex items-center gap-2" onClick={() => setOpen(true)}>
        <FiDollarSign size={20} />
        Cotizar Envío
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Calcular Costo de Envío</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div>
              <label className="font-medium">Kilogramos (1-5 kg):</label>
              <Input
                type="number"
                value={kg}
                onChange={handleKgChange}
                min="1"
                max="5"
              />
            </div>

            <div>
              <label className="font-medium">
                Valor Comercial (mínimo ${new Intl.NumberFormat("es-CO").format(getMinimoValorComercial(kg))}):
              </label>
              <Input
                type="number"
                value={valorComercial}
                onChange={(e) => {setValorComercial(e.target.value); setErrorValor('')}}
              />
              {errorValor && <p className="text-sm text-red-600 mt-1">{errorValor}</p>}
            </div>

            <div>
              <label className="font-medium">Destino:</label>
              <Combobox
                items={destinos}
                value={destino}
                setValue={(val) => {
                  setDestino(val);
                  if (val && errorDestino!="") setErrorDestino("");
                }}
                placeholder="Seleccione un destino"
                searchPlaceholder="Buscar destino..."
                emptyMessage="No se encontró destino."
                setError={setErrorDestino}
              />
              {errorDestino && <p className="text-sm text-red-600 mt-1">{errorDestino}</p>}
            </div>

            <Button onClick={calcularValores} className="flex items-center gap-2">
              <FiTrendingUp size={20} />
              Calcular
            </Button>

            {precioEstimado !== null && (
              <p className="text-center font-semibold text-lg">
                Precio estimado: ${new Intl.NumberFormat("es-CO").format(precioEstimado)}
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
