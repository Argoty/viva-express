"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FiDollarSign, FiTrendingUp } from "react-icons/fi";
import { Combobox } from "@/components/ui/combobox";
import { toast } from "sonner";

const destinos = [
  { label: "Bogotá", value: "bogota" },
  { label: "Quindío", value: "quindio" },
];

export default function CotizarButton() {
  const [open, setOpen] = useState(false);
  const [kg, setKg] = useState("1");
  const [destino, setDestino] = useState(destinos[0].value);
  const [precioEstimado, setPrecioEstimado] = useState(null);
  const [valorComercial, setValorComercial] = useState("");

  const getMinimoValorComercial = (kg) => {
    const kgInt = parseInt(kg);
    if (kgInt >= 1 && kgInt <= 3) return 25000;
    if (kgInt >= 4 && kgInt <= 5) return 30000;
    return 0;
  };

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
  };

  const calcularValores = () => {
    const kgValue = parseInt(kg);
    const minimo = getMinimoValorComercial(kgValue);

    if (parseInt(valorComercial) < minimo) {
      toast.error(`El valor comercial mínimo es de $${new Intl.NumberFormat("es-CO").format(minimo)}`);
      setPrecioEstimado(null);
      return;
    }

    const precioPorKg = destino === "bogota" ? 12000 : 9000;
    const precioBase = kgValue * precioPorKg;
    const porcentaje = parseInt(valorComercial) * 0.02;
    const precioTotal = precioBase + porcentaje;

    setPrecioEstimado(precioTotal);
    toast.success("Cotización generada correctamente");
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
                onChange={(e) => setValorComercial(e.target.value)}
                min={getMinimoValorComercial(kg)}
              />
            </div>

            <div>
              <label className="font-medium">Destino:</label>
              <Combobox
                items={destinos}
                value={destino}
                setValue={setDestino}
                placeholder="Seleccione un destino"
                searchPlaceholder="Buscar destino..."
                emptyMessage="No se encontró destino."
              />
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

