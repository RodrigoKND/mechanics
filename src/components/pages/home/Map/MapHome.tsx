import { useState } from "react";
import { Map, Marker, Overlay, ZoomControl } from "pigeon-maps";
import Section from "@/components/Section";
import InfoPlace from "@/components/pages/home/InfoPlace/InfoPlace";
import { useWatchLocation } from "@/hooks/useWatchLocation";
import MessageAlert from "@/components/MessageAlert";
import { useAuthGoogle } from "@/hooks/useAuthGoogle";

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
          <Overlay anchor={[location.latitude, location.longitude]}>
            <div className="relative cursor-pointer" onClick={handleWorkShop}>
              <img
                src={
                  infoUser
                    ? infoUser?.user_metadata?.avatar_url + "-mo"
                    : "/mechanicpin.webp"
                }
                className="w-16 h-16 border-2 rounded-full object-cover"
                alt={
                  infoUser
                    ? infoUser?.identities?.[0]?.identity_data?.full_name
                    : "User session image"
                }
              />
            </div>
          </Overlay>
          {/* <Marker
            color={!isChangeColorMarker ? "#93C0D0" : "#EA443C"}
            width={50}
            anchor={[location.latitude, location.longitude]}
            onClick={handleWorkShop}
          >
            <div className="relative cursor-pointer pointer-events-none">
              <img
                src={
                  infoUser
                    ? infoUser?.user_metadata?.avatar_url + "-mo"
                    : "https://static.vecteezy.com/system/resources/thumbnails/019/897/155/small/location-pin-icon-map-pin-place-marker-png.png"
                }
                className="w-12 h-10 rounded-full object-cover pointer-events-none"
                alt={
                  infoUser
                    ? infoUser?.identities?.[0]?.identity_data?.full_name
                    : "User session image"
                }
              />
            </div>
          </Marker> */}
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
