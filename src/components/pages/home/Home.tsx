import HomeHeader from "@/components/pages/home/header/HomeHeader";
import MapHome from "@/components/pages/home/Map/MapHome";
import ButtonStartEnd from "./startend/ButtonStartEnd";

export default function Home() {
    return (
        <>
            <HomeHeader />
            <MapHome />
            <ButtonStartEnd />
        </>
    );
}

