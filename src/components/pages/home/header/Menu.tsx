import { useState } from "react";
import Button from "@/components/ui/Button";
import Aside from "@/components/Aside";
import Header from "@/components/Header";
import Tipografy from "@/components/Tipografy";
import AvatarWithText from "@/components/AvatarWithText";
import { List, ListItem } from "@/components/List";
import { Igearplus, Icampaignplus, Iclosex, Imessage } from "@icons";
import { Istatistics } from "@icons";
import Statistics from "@/components/pages/home/statistics/Statistics"; 
import Notification from "../../../Notifications/Notifications";

interface Notification {
  id: number;
  message: string;
  timestamp: string;
}

interface MenuProps {
  visibilityMenu: string;
  handleMenu: () => void;
}
        
export default function Menu({ visibilityMenu, handleMenu }: MenuProps) {
  const [movingWorkShop, setMovingWorkShop] = useState<string>("translate-x-full");

  const handleWorkShop = () => {
    setMovingWorkShop((prev) =>
      prev === "translate-x-0" ? "translate-x-full" : "translate-x-0"
    );
  };
  return (
    <>
    <Aside
      className={`${visibilityMenu} absolute z-30 h-full inset-0 transition-transform lg:w-1/4`}
    >
      <div className="px-3 py-5">
        <Header className="justify-between mb-7">
          <Tipografy as="h3">Menú</Tipografy>
          <Button variant="normal" onClick={handleMenu}>
            <Iclosex />
          </Button>
        </Header>
        <List className="flex-col mb-7">
            <ListItem type="menu">
              <Igearplus />
              <span>Mecánicos solicitados</span>
            </ListItem>
            <Notification/>
            <ListItem type="menu">
              <Imessage />
              <span>Mensajes</span>
            </ListItem>
            <ListItem type="menu" onClick={handleWorkShop}>
              <Istatistics />
              <span>Estadísticas</span>
            </ListItem>
          </List>

        <div className="flex flex-col gap-5">
          <Tipografy as="h5" className="text-lg font-semibold">
            Talleres cercanos
          </Tipografy>
          <AvatarWithText
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwW0oqt9Seh3IodYGwH5hRJsZZn9RGu4bsQA&s"
            alt="Nombre de taller cercano"
            classNameAvatar="rounded-full w-14 h-14 object-cover"
            text="Taller Mecánico Express"
          />
          <AvatarWithText
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwW0oqt9Seh3IodYGwH5hRJsZZn9RGu4bsQA&s"
            alt="Nombre de taller cercano"
            classNameAvatar="rounded-full w-14 h-14 object-cover"
            text="Taller Mecánico Express"
          />
        </div>
      </div>
    </Aside>
       <Statistics
        isVisible={movingWorkShop === "translate-x-0"}
        handleWorkShop={handleWorkShop}
        movingWorkShop={movingWorkShop}
      />
      </>
  );
}
