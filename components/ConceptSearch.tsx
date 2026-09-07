"use client";
import { useState } from "react";
import Fuse from "fuse.js";
import { Input } from "@/components/ui/input";
import { Concepto } from "@/lib/conceptos";

interface ConceptSearchProps {
  conceptos: Concepto[];
  onSearch?: (resultados: Concepto[]) => void;
}

export default function ConceptSearch({ conceptos, onSearch }: ConceptSearchProps) {
  const [query, setQuery] = useState("");
  const fuse = new Fuse(conceptos, {
    keys: ["nombre", "descripcion_corta", "tags"],
    threshold: 0.3,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) {
      const resultados = value ? fuse.search(value).map(r => r.item) : conceptos;
      onSearch(resultados);
    }
  };

  return (
    <Input
      placeholder="Buscar concepto..."
      value={query}
      onChange={handleChange}
      className="w-full md:w-72"
    />
  );
}