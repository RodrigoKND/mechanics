import { FormEvent, useState } from "react";
import Button from "@/components/ui/Button";
import Aside from "@/components/Aside";
import Header from "@/components/Header";
import Tipografy from "@/components/Tipografy";
import Image from "@/components/ui/Image";
import { List, ListItem } from "@/components/List";
import Section from "@/components/Section";


import {
  Iclosex,
  IarrowLeft,
  IarrowRight,
  ImarkerLocation,
  Iwatch,
  Ikey,
} from "@icons";

import { useAuthUser } from "@/hooks/useAuthUser";
import MessageAlert from "@/components/MessageAlert";

interface InfoPlaceProps {
  isChangeColorMarker: boolean;
  setIsChangeColorMarker: React.Dispatch<React.SetStateAction<boolean>>;
  handleWorkShop: () => void;
  movingWorkShop: string;
  setMovingWorkShop: React.Dispatch<React.SetStateAction<string>>;
  isVisible: boolean;
}

const services = [
  { id: 1, name: "Servicio de mantenimiento" },
  { id: 2, name: "Servicio de reparación" },
  { id: 3, name: "Servicio de limpieza" },
  { id: 4, name: "Servicio de diagnóstico" },
];

export default function InfoPlace({
  handleWorkShop,
  movingWorkShop,
  isVisible,
}: InfoPlaceProps) {
  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwW0oqt9Seh3IodYGwH5hRJsZZn9RGu4bsQA&s",
    "data:image/jpeg;base64,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",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const { isLogged } = useAuthUser();

  const sendData = async (e: FormEvent) => {
    e.preventDefault();
    if (!isLogged) return;

    alert("TODO: Sending data to the backend");
  };

  return (
    <>
      {!isLogged && isVisible && (
        <MessageAlert
          message="Inicia sesión para solicitar a Auto Service Pro"
          state="error"
        />
      )}
      <Aside
        className={`${movingWorkShop} absolute max-w-md z-40 transition-transform ease-in-out right-0 duration-300 top-0 ${
          isVisible ? "xl:w-2/6" : "hidden"
        }`}
      >
        <form className="lg:p-5 px-4 py-5" onSubmit={sendData}>
          <Header className="justify-between mb-5">
            <Tipografy as="h3">Auto Service Pro</Tipografy>
            <Button variant="normal" onClick={handleWorkShop}>
              <Iclosex />
            </Button>
          </Header>

          <Section className="relative my-4">
            <div className="flex overflow-hidden">
              <Image
                src={images[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                className="w-full h-60 rounded-lg"
              />
            </div>

            <div className="absolute inset-0 flex justify-between items-center px-4">
              <Button onClick={handlePrev} variant="indicator">
                <IarrowLeft />
              </Button>
              <Button variant="indicator" onClick={handleNext}>
                <IarrowRight />
              </Button>
            </div>
          </Section>

          <List className="flex-col gap-2 my-7">
            <ListItem type="option" className="text-sm font-light">
              <ImarkerLocation />
              <span>Avenida Central Córdoba</span>
            </ListItem>
            <ListItem type="option" className="text-sm font-light">
              <Iwatch />
              <span>Disponible ahora</span>
            </ListItem>
          </List>
          <Section className="flex w-full mt-5 mb-8 items-center gap-3">
            <div>
              <Ikey />
            </div>
            <List className="gap-3 flex-wrap">
              {services.map((service) => {
                return (
                  <ListItem type="service" key={service.id}>
                    {service.name}
                  </ListItem>
                );
              })}
            </List>
          </Section>
          <Button variant="primary" type="primary">
            Solicitar mecánico
          </Button>
        </form>
      </Aside>
    </>
  );
}
