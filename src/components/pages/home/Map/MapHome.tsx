import { useEffect, useState } from "react";
import { Map, Overlay, ZoomControl } from "pigeon-maps";
import Section from "@/components/Section";
import InfoPlace from "@/components/pages/home/InfoPlace/InfoPlace";
import { useWatchLocation } from "@/hooks/useWatchLocation";
import MessageAlert from "@/components/MessageAlert";
import { useAuthGoogle } from "@/hooks/useAuthGoogle";
import { io } from "socket.io-client";

export default function MapHome() {
  const provider = (x: number, y: number, z: number) => {
    return `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;
  };

  const [movingWorkShop, setMovingWorkShop] =
    useState<string>("translate-x-full");

  const handleWorkShop = () => {
    setMovingWorkShop((prev) =>
      prev === "translate-x-full" ? "translate-x-0" : "translate-x-full"
    );
  };

  const { location, error } = useWatchLocation();
  const { infoUser } = useAuthGoogle();
  const [coords, setCoords] = useState<Array<Record<string, number>>>([]);

  const socket = io("http://localhost:3000");
  const sendCoordsSocket = () => {
    socket.emit("send-location", location);
  };

  const getCoordsSocket = () => {
    socket.on("received-coords", (data) =>{
      const setCoordsUnique = new Set(coords);
      if (setCoordsUnique.has(data)) {
        return;
      }
      setCoordsUnique.add(data);
      setCoords((prev) => [...prev, data])
    }
    );
  };

  useEffect(() => {
    sendCoordsSocket();
    getCoordsSocket();
    console.log(coords);
  }, [location]);

  return (
    <>
      {error && <MessageAlert message={error} state="error" />}
      <Section className="absolute inset-0 z-10 flex items-center justify-center">
        <Map
          height={window.innerHeight}
          attributionPrefix={false}
          provider={provider}
          center={[location.latitude, location.longitude]}
          defaultCenter={[location.latitude, location.longitude]}
          defaultZoom={11}
        >
          <ZoomControl style={{ top: window.innerHeight - 100 }} />
          {coords.map((coord, index) => (
            <Overlay key={index} anchor={[coord.latitude, coord.longitude]}>
              <div className="relative cursor-pointer" onClick={handleWorkShop}>
                <img
                  src={
                    infoUser
                      ? infoUser?.user_metadata?.avatar_url + "-mo"
                      : "https://static.vecteezy.com/system/resources/thumbnails/019/897/155/small/location-pin-icon-map-pin-place-marker-png.png"
                  }
                  className="w-10 border-2 border-blue-300 h-10 rounded-full object-cover"
                  alt={
                    infoUser
                      ? infoUser?.identities?.[0]?.identity_data?.full_name
                      : "User session image"
                  }
                />
              </div>
            </Overlay>
          ))}
        </Map>
      </Section>

      <InfoPlace
        isVisible={movingWorkShop === "translate-x-0"}
        handleWorkShop={handleWorkShop}
        movingWorkShop={movingWorkShop}
      />
    </>
    
  );
  
}
