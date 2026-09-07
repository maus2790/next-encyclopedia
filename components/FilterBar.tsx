"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  capas: string[];
  onFilter?: (capa: string | null) => void;
}

export default function FilterBar({ capas, onFilter }: FilterBarProps) {
  const [activa, setActiva] = useState<string | null>(null);

  const handleClick = (capa: string | null) => {
    setActiva(capa);
    onFilter?.(capa);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => handleClick(null)}
        className={cn(
          "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
          activa === null
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground hover:bg-muted/80"
        )}
      >
        Todas
      </button>
      {capas.map((capa) => (
        <button
          key={capa}
          onClick={() => handleClick(capa)}
          className={cn(
            "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
            activa === capa
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          )}
        >
          {capa}
        </button>
      ))}
    </div>
  );
}
