import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Tipografy from "@/components/Tipografy";
import { ImagnifyingGlass } from "@icons";
import { supabase } from "@/components/pages/home/login/RegisterGoogle";

interface Workshop {
  name: string;
}

export default function SmallSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<Workshop[]>([]);

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    try {
      const { data, error } = await supabase
        .from("workshop")
        .select("name")
        .ilike("name", `%${searchQuery}%`); // Búsqueda sin distinción entre mayúsculas y minúsculas

      if (error) throw error;
      setResults(data as Workshop[]);
    } catch (error) {
      console.error("Error al buscar:", error);
    }
  };

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex justify-between items-center">
        <Tipografy as="h3" className="text-bg font-semibold">
          Buscar
        </Tipografy>
      </div>
      <form className="flex items-center gap-2 w-full" onSubmit={handleSearch}>
        <Input
          type="text"
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
          placeholder="Buscar mecánicos..."
          className="w-full"
        />
        <Button variant="default" aria-label="Buscar" type="submit">
          <ImagnifyingGlass />
        </Button>
      </form>

      {/* Mostrar resultados */}
      <div className="mt-4">
        {results.length > 0 ? (
          results.map((item, index) => (
            <div key={index} className="p-2 border rounded-md shadow-sm">
              {item.name}
            </div>
          ))
        ) : (
          searchQuery && <p>No se encontraron resultados.</p>
        )}
      </div>
    </div>
  );
}
//something