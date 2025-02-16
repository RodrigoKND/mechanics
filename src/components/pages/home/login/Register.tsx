import { useState } from "react";
import { useSelectCountryAndPhone } from "@/hooks/useSelectCountryAndPhone";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import RegisterWorkShop from "@/components/pages/home/workshop/RegisterWorkShop";
import Image from "@/components/ui/Image";
import Tipografy from "@/components/Tipografy";
import { Iphone, IarrowDown } from "@icons";

export default function Register() {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggleModal = () => setIsVisible((prev) => !prev);

  const {
    handleSelect,
    selectedCountry,
    isOpen,
    toggleDropdown,
    countries,
    handleTogglePhone,
    isOpenPhone,
    selectedNumber,
    isSelectedNumber,
    suffixesPhone,
    handleSelectPhone,
  } = useSelectCountryAndPhone();

  return (
    <form className="flex flex-col gap-3 w-full sm:w2/4">
      <Input
        type="text"
        placeholder="Nombre"
        className="w-full"
        required
        autoComplete="off"
      />

      <div className="relative flex items-center gap-3">
        <div className="relative">
          <Button
            variant="border"
            type="button"
            className="flex items-center w-36 justify-between"
            onClick={toggleDropdown}
          >
            <div className="flex items-center w-full overflow-hidden whitespace-nowrap">
              <Image
                src={selectedCountry.flag}
                alt={selectedCountry.alt}
                className="w-5 h-4 mr-2"
              />
              {selectedCountry.name}
            </div>
            <IarrowDown isOpen={isOpen} />
          </Button>

          {isOpen && (
            <div className="absolute z-50 h-44 w-max overflow-y-auto mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
              {countries
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((country) => (
                  <Button
                    key={country.name}
                    variant="normal"
                    type="button"
                    className="flex w-full items-center px-4 py-2 bg-white hover:bg-gray-100"
                    onClick={() => handleSelect(country.name)}
                  >
                    <Image
                      src={country.flag}
                      alt={country.alt}
                      className="w-5 h-4 mr-2"
                    />
                    {country.name}
                  </Button>
                ))}
            </div>
          )}
        </div>

        <div className="relative">
          <Button
            variant="border"
            type="button"
            className="flex items-center w-max justify-between"
            onClick={handleTogglePhone}
          >
            <Tipografy as="span">
              {selectedNumber || "Seleccionar código"}
            </Tipografy>
            <IarrowDown isOpen={isOpenPhone} />
          </Button>

          {isOpenPhone && (
            <div
              className={`absolute z-50 ${
                isSelectedNumber ? "h-max" : "h-44"
              } w-max overflow-y-auto mt-2 bg-white border border-gray-300 rounded-md shadow-lg`}
            >
              {isSelectedNumber ? (
                <Button
                  variant="normal"
                  type="button"
                  onClick={() => handleSelectPhone(selectedNumber)}
                  className="flex w-full items-center px-4 py-2 bg-white hover:bg-gray-100"
                >
                  <Tipografy as="span">{selectedNumber}</Tipografy>
                </Button>
              ) : (
                suffixesPhone.map((suffix) => (
                  <Button
                    key={suffix}
                    variant="normal"
                    type="button"
                    onClick={() => handleSelectPhone(suffix)}
                    className="flex w-full items-center px-4 py-2 bg-white hover:bg-gray-100"
                  >
                    <Tipografy as="span">{suffix}</Tipografy>
                  </Button>
                ))
              )}
            </div>
          )}
        </div>

        <Input
          type="text"
          placeholder="Móvil"
          className="w-full"
          required
          autoComplete="off"
        />
        <div className="absolute right-0 rounded-full bg-transparent p-2">
          <Iphone />
        </div>
      </div>

      <Input
        type="email"
        placeholder="Correo electronico"
        className="w-full"
        required
        autoComplete="email"
      />
      <Input
        type="password"
        placeholder="Contraseña"
        className="w-full"
        autoComplete="off"
        required
      />
      <select className="w-full p-3 border">
        <option value="" disabled selected>
          Registrarse como:
        </option>
        <option value="user">Registrarse como: Usuario</option>
        <option value="mechanic">Registrarse como: Mecánico</option>
      </select>
      <Button variant="primary" className="w-full" type="submit">
        Registrarse
      </Button>
      <Button
        variant="normal"
        className="text-center text-md font-semibold"
        onClick={handleToggleModal}
        type="button"
      >
        Registrar como mecánico/taller
      </Button>
      <RegisterWorkShop
        classNameModal="h-[90%]"
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
    </form>
  );
}
