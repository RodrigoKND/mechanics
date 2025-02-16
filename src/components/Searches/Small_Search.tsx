import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Tipografy from "@/components/Tipografy";
import { ImagnifyingGlass } from "@icons";

export default function small_search() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log("Buscando:", searchQuery); // Lógica de búsqueda
    document.body.click(); // Cierra la modal simulando un clic externo
  };

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex justify-between items-center">
        <Tipografy as="h3" className="text-bg font-semibold">
          Buscar
        </Tipografy>
      </div>
      <form className="flex items-center gap-2 w-full">
        <Input
          type="text"
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
          placeholder="Buscar mecánicos..."
          className="w-full"
        />
        <Button
          variant="default"
          onClick={handleSearch}
          aria-label="Buscar"
          type="submit"
        >
          <ImagnifyingGlass />
        </Button>
      </form>
    </div>
  );
}
//something