import React, { useState } from "react";
import Button from "@/components/ui/Button";

const ButtonStartEnd: React.FC = () => {
  const [isRouteStarted, setIsRouteStarted] = useState(false);

  const handleButtonClick = () => {
    setIsRouteStarted((prevState) => !prevState);
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <Button
        onClick={handleButtonClick}
        className={`px-6 py-3 rounded-3xl text-base font-semibold shadow-lg transition-all duration-300 ${
          isRouteStarted ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-black hover:bg-gray-800 text-white"
        }`}
        style={{
          minWidth: "150px", // Ancho mínimo para el botón
          textAlign: "center",
        }}
      >
        {isRouteStarted ? "Finalizar Ruta" : "Iniciar Ruta"}
      </Button>
    </div>
  );
};

export default ButtonStartEnd;
