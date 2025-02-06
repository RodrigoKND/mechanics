import { useState } from "react";
import ReactSlider from "react-slider";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Tipografy from "@/components/Tipografy";
import { Icar, Imoto, Istar } from "@icons";

const ALL_SERVICES = [
  { id: "ayuda", label: "Ayuda en carretera" },
  { id: "domicilio", label: "A domicilio" },
  { id: "revision", label: "Revisión" },
  { id: "cambioAceite", label: "Cambio de aceite" },
  { id: "lavado", label: "Lavado" },
  { id: "diagnostico", label: "Diagnóstico" },
  { id: "neumaticos", label: "Cambio de neumáticos" },
  { id: "bateria", label: "Revisión de batería" },
];

export default function Filter() {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 120]);
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [showOtherInput, setShowOtherInput] = useState<boolean>(false);
  const [selectedCar, setSelectedCar] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [visibleServices, setVisibleServices] = useState<number>(5);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleToggleServices = () => {
    setVisibleServices(isExpanded ? 5 : ALL_SERVICES.length);
    setIsExpanded(!isExpanded);
  };

  const handleRangeChange = (values: [number, number]) => {
    // Asegúrate de que los puntos no se superpongan
    if (values[0] < values[1]) {
      // Establece una distancia mínima entre los puntos (por ejemplo, 10)
      const minDistance = 3;

      // Si la diferencia entre los puntos es menor que la distancia mínima
      if (values[1] - values[0] < minDistance) {
        // Ajusta el punto máximo para mantener la distancia mínima
        values[1] = values[0] + minDistance;

        // Asegúrate de no exceder el máximo permitido
        if (values[1] > 120) {
          values[1] = 120;
          values[0] = 110; // Ajusta el punto mínimo si es necesario
        }
      }

      setPriceRange(values);
    }
  };

  const handleMouseEnter = (index: number) => {
    setHoveredRating(index);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  const handleClick = (index: number) => {
    setRating(index);
  };

  const handleCarSelection = (type: string) => {
    if (type === "otros") {
      setShowOtherInput(true);
      setPriceRange([0, 200]);
    } else if (type === "imoto") {
      setShowOtherInput(false);
      setPriceRange([0, 180]);
    } else {
      setShowOtherInput(false);
      setPriceRange([0, 120]);
    }
    setSelectedCar((prev) => (prev === type ? null : type));
  };

  const handleServiceSelection = (type: string) => {
    setSelectedServices((prev) => {
      if (prev.includes(type)) {
        return prev.filter((service) => service !== type);
      } else {
        return [...prev, type];
      }
    });
  };

  return (
    <form>
      <Tipografy as="h5" className="mt-3">
        Selecione su tipo transporte{" "}
      </Tipografy>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-wrap justify-around border border-slate-600 rounded-lg items-center p-2">
          <Button
            type="button"
            variant="normal"
            className={`flex-1 m-1 rounded-lg bg-white hover:bg-gray-100 ${
              selectedCar === "icar" ? "border border-black" : ""
            }`}
            onClick={() => handleCarSelection("icar")}
          >
            <div className="justify-self-center">
              <Icar />
            </div>
          </Button>
          <Button
            type="button"
            variant="normal"
            className={`flex-1 m-1 rounded-lg bg-white hover:bg-gray-100 ${
              selectedCar === "imoto" ? "border border-black" : ""
            }`}
            onClick={() => handleCarSelection("imoto")}
          >
            <div className="justify-self-center">
              <Imoto />
            </div>
          </Button>
          <Button
            type="button"
            variant="normal"
            className={`flex-1 m-1 rounded-lg bg-white hover:bg-gray-100 ${
              selectedCar === "otros" ? "border border-black" : ""
            }`}
            onClick={() => handleCarSelection("otros")}
          >
            <Tipografy as="p">Otros</Tipografy>
          </Button>
        </div>
      </div>

      {showOtherInput && (
        <Input
          type="text"
          placeholder="Especifica otro tipo de transporte..."
          className="mb-4 bg-white w-full"
        />
      )}

      <hr className="w-11/12 h-px bg-slate-600" />

      <div className="flex flex-col gap-4 mt-4 mb-4">
        <Tipografy as="h5">Rango de precios</Tipografy>
        <div className="flex flex-col items-center">
          <ReactSlider
            className="w-full h -3 bg-gray-300 rounded-lg mb-3"
            thumbClassName="w-6 h-6 bg-gray-300 rounded-full cursor-pointer"
            trackClassName="bg-gray-600 h-3 rounded-lg"
            value={priceRange}
            onChange={handleRangeChange}
            min={30}
            max={120}
            step={1}
            minDistance={3}
            ariaLabel={["Min price", "Max price"]}
          />
          <div className="flex justify-between w-full mt-2">
            <div>
              <Tipografy as="p" className="block text-sm text-gray-700">
                Mínimo
              </Tipografy>
              <Input
                type="number"
                value={priceRange[0]}
                readOnly
                className="w-20 text-center bg-white"
              />
            </div>
            <div>
              <Tipografy
                as="p"
                className="block text-sm text-gray-700 text-right"
              >
                Máximo
              </Tipografy>
              <Input
                type="number"
                value={priceRange[1]}
                readOnly
                className="w-20 text-center bg-white"
              />
            </div>
          </div>
        </div>
      </div>

      <hr className="w-11/12 h-px bg-slate-600" />

      <div className="mt-4">
        <Tipografy as="h5" className="mb-4">
          Servicios
        </Tipografy>
        <div className="flex flex-wrap gap-3">
          {ALL_SERVICES.slice(0, visibleServices).map((service) => (
            <Button
              key={service.id}
              type="button"
              variant="normal"
              className={`flex hover:bg-gray-100 rounded-full border border-gray px-4 py-2 gap-2 ${
                selectedServices.includes(service.id)
                  ? "border border-black"
                  : ""
              }`}
              onClick={() => handleServiceSelection(service.id)}
            >
              <Tipografy as="p">{service.label}</Tipografy>
            </Button>
          ))}
        </div>

        {ALL_SERVICES.length > 5 && (
          <div className="mt-4 text-center">
            <Button
              type="button"
              variant="normal"
              className="px-4 py-2 border-2 border-neutral-600 rounded-full"
              onClick={handleToggleServices}
            >
              {isExpanded ? "Mostrar menos ↑↑" : "Mostrar más ↓↓"}
            </Button>
          </div>
        )}
      </div>

      <hr className="w-11/12 h-px bg-slate-600 m-4"/>

      <div className="mt-4 mb-4">
        <Tipografy as="h5">Filtrar por puntuación</Tipografy>
        <div className="flex justify-center my-4">
          {[0, 1, 2, 3, 4].map((star) => (
            <div
              key={star}
              onMouseEnter={() => handleMouseEnter(star)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(star)}
              className={`cursor-pointer ${
                star <= (hoveredRating || rating)
                  ? "text-yellow-500"
                  : "text-gray-400"
              }`}
            >
              <Istar />
            </div>
          ))}
        </div>
      </div>

      <Button type="submit">Aplicar</Button>
    </form>
  );
}
