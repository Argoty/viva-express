"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FiDollarSign, FiTrendingUp } from "react-icons/fi";
import { Combobox } from "@/components/ui/Combobox";

//ciudad: 1kg, 2kg, 3kg, 4kg, 5kg, 6-30kg
const tarifas = {
  armenia: [7500, 9000, 11000, 13000, 15000, 20000],
  bogota: [12500, 15000, 18000, 20000, 23000, null],
  buenavista: [9000, 11500, 14000, 17000, 20000, 23000],
  caicedonia: [9000, 11500, 14000, 17000, 20000, 23000],
  calarca: [9000, 11500, 14000, 17000, 20000, 23000],
  circacia: [9000, 11500, 14000, 17000, 20000, 23000],
  cordoba: [9000, 11500, 14000, 17000, 20000, 23000],
  filandia: [9000, 11500, 14000, 17000, 20000, 23000],
  genova: [12500, 15000, 18000, 20000, 23000, null],
  latebaida: [9000, 11500, 14000, 17000, 20000, 23000],
  montenegro: [9000, 11500, 14000, 17000, 20000, 23000],
  pijao: [9000, 11500, 14000, 17000, 20000, 23000],
  quimbaya: [9000, 11500, 14000, 17000, 20000, 23000],
  salento: [9000, 11500, 14000, 17000, 20000, 23000],
  sevilla: [9000, 11500, 14000, 17000, 20000, 23000],
};

const destinos = Object.keys(tarifas).map((ciudad) => ({
  label: ciudad.charAt(0).toUpperCase() + ciudad.slice(1).replace(/_/g, ' '),
  value: ciudad,
}));

export default function CotizarButton() {
  const [open, setOpen] = useState(false);
  const [kg, setKg] = useState("1");
  const [destino, setDestino] = useState("bogota");
  const [valorComercial, setValorComercial] = useState("25000");
  const [precioEstimado, setPrecioEstimado] = useState(null);

  const [errorKg, setErrorKg] = useState("");
  const [errorDestino, setErrorDestino] = useState("");
  const [errorValor, setErrorValor] = useState("");

  const getMinimoValorComercial = (kg) => {
    const kgInt = parseInt(kg);
    return kgInt >= 1 && kgInt <= 3 ? 25000 : 50000;
  };

  const handleKgChange = (e) => {
    let value = e.target.value;
    if (value === "") {
      setKg("");
      return;
    }
    let numericValue = parseInt(value, 10);
    if (isNaN(numericValue) || numericValue < 1 || numericValue > 30) {
      numericValue = "";
    }
    setKg(numericValue.toString());
    setValorComercial(getMinimoValorComercial(numericValue).toString());
    if (errorKg) setErrorKg("");
    if (errorValor) setErrorValor("");
  };

  const calcularValores = () => {
    const kgValue = parseInt(kg);
    const minimo = getMinimoValorComercial(kgValue);
    let valido = true;
    // VALIDA FORMULARIO
    if (!kg || kgValue < 1 || kgValue > 30) {
      setErrorKg("Debe digitar entre 1 y 30 kg");
      valido = false;
    }

    if (!destino) {
      setErrorDestino("Debe seleccionar un destino.");
      valido = false;
    }

    if (!valorComercial || parseInt(valorComercial) < minimo) {
      setErrorValor(`El valor debe ser mínimo $${new Intl.NumberFormat("es-CO").format(minimo)}.`);
      valido = false;
    }

    if (!valido) {
      setPrecioEstimado(null);
      return;
    }

    // determinar indice tarifa por kg
    let indexTarifa = kgValue >= 6 ? 5 : kgValue - 1;
    let tarifa = tarifas[destino][indexTarifa];

    if (tarifa === null) {
      setPrecioEstimado("No disponible para este destino");
      return;
    }

    // calcular 2% solo del excedente
    const excedente = Math.max(0, parseInt(valorComercial) - minimo);
    const porcentaje = excedente * 0.02;
    const total = tarifa + porcentaje;

    setPrecioEstimado(total);
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
              <label className="font-medium">Destino:</label>
              <Combobox
                items={destinos}
                value={destino}
                setValue={(val) => {
                  setDestino(val);
                  if (val && errorDestino) setErrorDestino("");
                }}
                placeholder="Seleccione un destino"
                searchPlaceholder="Buscar destino..."
                emptyMessage="No se encontró destino."
              />
              {errorDestino && <p className="text-sm text-red-600 mt-1">{errorDestino}</p>}
            </div>

            <div>
              <label className="font-medium">KG (1-30):</label>
              <Input
                type="number"
                value={kg}
                onChange={handleKgChange}
                min="1"
                max="30"
              />
              {errorKg && <p className="text-sm text-red-600 mt-1">{errorKg}</p>}
            </div>

            <div>
              <label className="font-medium">
                Valor Comercial (mínimo ${new Intl.NumberFormat("es-CO").format(getMinimoValorComercial(kg))}):
              </label>
              <Input
                type="number"
                value={valorComercial}
                onChange={(e) => { setValorComercial(e.target.value); setErrorValor('') }}
              />
              {errorValor && <p className="text-sm text-red-600 mt-1">{errorValor}</p>}
            </div>

            <Button onClick={calcularValores} className="flex items-center gap-2">
              <FiTrendingUp size={20} />
              Calcular
            </Button>

            {precioEstimado !== null && (
              <p className="text-center font-semibold text-lg">
                Precio estimado: {typeof precioEstimado === 'string' ? precioEstimado : `$${new Intl.NumberFormat("es-CO").format(precioEstimado)}`}
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
