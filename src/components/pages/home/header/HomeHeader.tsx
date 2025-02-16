import { useState } from "react";
import { useAuthGoogle } from "@/hooks/useAuthGoogle";
import { useSelectOptionButton } from "@/hooks/useSelectOptionButton";
import Input from "@/components/ui/Input";
import Header from "@/components/Header";
import Button from "@/components/ui/Button";
import DynamicModalButton from "@/components/DynamicModalButton";
import Menu from "@/components/pages/home/header/Menu";
import LogoutWithImage from "@/components/LogoutWithImage";
import Login from "@/components/pages/home/login/Login";
import Register from "@/components/pages/home/login/Register";
import RegisterGoogle from "@/components/pages/home/login/RegisterGoogle";
import Filter from "@/components/Filters/Filter";
import Small_Search from "@/components/Searches/Small_Search";
import OptionsButtonLogin from "@/components/OptionsButtonLogin";
import { Ihamburguer, Ifilter, Iperson, ImagnifyingGlass } from "@icons";
import { supabase } from "@/components/pages/home/login/RegisterGoogle";

interface Workshop {
  name: string;
}

export default function HomeHeader() {
  const [visibilityMenu, setVisibilityMenu] = useState<string>("-translate-x-full");
  const { selectOptionButton, setSelectOptionButton } = useSelectOptionButton("login");
  const { isSessionUser  } = useAuthGoogle();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [results, setResults] = useState<Workshop[]>([]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim() !== "") {
      const { data, error } = await supabase
        .from("workshop")
        .select("name")
        .ilike("name", `%${query}%`);

      if (!error) {
        setResults(data as Workshop[] || []);
      } else {
        console.error("Error fetching data:", error);
      }
    } else {
      setResults([]);
    }
  };

  const handleMenu = () => {
    setVisibilityMenu((prev) =>
      prev === "-translate-x-full" ? "translate-x-0" : "-translate-x-full"
    );
  };

  const isVisible = visibilityMenu === "translate-x-0";

  return (
    <>
      {isVisible && (
        <div
          className="absolute inset-0 z-20 bg-gray-400 opacity-50 cursor-pointer"
          onClick={handleMenu}
        ></div>
      )}
      <Menu visibilityMenu={visibilityMenu} handleMenu={handleMenu} />
      <Header className="gap-3 justify-center lg:p-5 p-2 absolute z-20 lg:w-full w-full">
        <Button
          variant="border"
          onClick={handleMenu}
          type="button"
          aria-label="Toggle menu"
        >
          <Ihamburguer />
        </Button>

        <div className="relative w-full">
          <div className="sm:hidden">
            <DynamicModalButton icon={<ImagnifyingGlass />}>
              <Small_Search />
            </DynamicModalButton>
          </div>
          <div className="hidden sm:block">
            <Input
              type="text"
              placeholder="Buscar mecánicos..."
              className="w-full"
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
            />
            {results.length > 0 ? (
              <div className="absolute bg-white shadow-md rounded-md mt-2 w-full z-10">
                {results.map((item, index) => (
                  <div key={index} className="p-2 border-b last:border-none">
                    {item.name}
                  </div>
                ))}
              </div>
            ) : (
              searchQuery.trim() !== "" && (
                <div className="absolute bg-white shadow-md rounded-md mt-2 w-full z-10 p-2">
                  No se encontraron resultados.
                </div>
              )
            )}
          </div>
        </div>

        <DynamicModalButton icon={<Ifilter />} classNameModal="h-3/4">
          <Filter />
        </DynamicModalButton>

        {!isSessionUser  ? (
          <DynamicModalButton icon={<Iperson />}>
            <OptionsButtonLogin
              selectOptionButton={selectOptionButton}
              setSelectOptionButton={setSelectOptionButton}
            />
            <RegisterGoogle
              textButton={
                selectOptionButton === "login"
                  ? "Conectar con Google"
                  : "Registrarse con Google"
              }
            />
            {selectOptionButton === "login" ? <Login /> : <Register />}
          </DynamicModalButton>
        ) : (
          <LogoutWithImage />
        )}
      </Header>
    </>
  );
}