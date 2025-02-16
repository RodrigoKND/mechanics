import React from "react";
import Button from "@/components/ui/Button";
import Aside from "@/components/Aside";
import Header from "@/components/Header";
import Tipografy from "@/components/Tipografy";
import { Istar, Iusers, Iwatch, Icheck, Iclosex } from "@icons";
import StatCard from "@/components/icons/StatCard";

interface StatisticsProps {
  isVisible: boolean;
  handleWorkShop: () => void;
  movingWorkShop: string;
}

const Statistics: React.FC<StatisticsProps> = ({
  isVisible,
  handleWorkShop,
  movingWorkShop,
}: StatisticsProps) => {
  return (
    <>
      <Aside
        className={`absolute max-w-full lg:max-w-xl z-40 transition-transform ease-in-out right-0 duration-300 top-0 ${movingWorkShop} bg-white`}
      >
        {isVisible && (
          <div className="p-4 lg:p-5">
            {/* Header */}
            <Header className="flex justify-between mb-5">
              <Tipografy as="h3" className="text-lg font-bold">
                Estadísticas
              </Tipografy>
              <Button variant="normal" onClick={handleWorkShop}>
                <Iclosex />
              </Button>
            </Header>

            {/* Contenido de estadísticas */}
            <div className="container mx-auto px-2 sm:px-4 py-4 lg:py-8">
              <div className="mb-4 lg:mb-8">
                <h1 className="text-md sm:text-lg font-normal text-gray-500">
                  Estadísticas del Mecánico
                </h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-4 lg:mb-8">
                <StatCard
                  icon={Iusers}
                  value="35"
                  label="Visitas Totales"
                  change="12"
                  isPositive={true}
                />
                <StatCard
                  icon={Istar}
                  value="24"
                  label="Estrellas"
                  change="8"
                  isPositive={true}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-4 lg:mb-8">
                <StatCard
                  icon={Iwatch}
                  value="45min"
                  label="Tiempo Promedio"
                  change="5"
                  isPositive={false}
                />
                <StatCard
                  icon={Icheck}
                  value="98%"
                  label="Tasa de Éxito"
                  change="2"
                  isPositive={true}
                />
              </div>
            </div>
          </div>
        )}
      </Aside>
    </>
  );
};

export default Statistics;
