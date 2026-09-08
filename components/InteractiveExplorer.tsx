"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import { Concepto, CAPAS, getCapaById } from "@/lib/conceptos";
import ConceptCard from "@/components/ConceptCard";
import LayerArchitectureVisualizer from "@/components/LayerArchitectureVisualizer";
import RoadmapView from "@/components/RoadmapView";
import AIPromptStudio from "@/components/AIPromptStudio";
import { 
  Search, 
  Grid, 
  Table, 
  Layers, 
  Compass, 
  Sparkles, 
  Filter, 
  X, 
  ExternalLink
} from "lucide-react";

interface InteractiveExplorerProps {
  initialConceptos: Concepto[];
  defaultCapa?: string;
  defaultView?: "grid" | "table" | "layers" | "roadmap" | "ai";
}

export default function InteractiveExplorer({ 
  initialConceptos, 
  defaultCapa,
  defaultView = "grid" 
}: InteractiveExplorerProps) {
  const [query, setQuery] = useState("");
  const [selectedCapa, setSelectedCapa] = useState<string | null>(defaultCapa || null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "table" | "layers" | "roadmap" | "ai">(defaultView);

  // Fuse.js Index for Instant Search
  const fuse = useMemo(() => {
    return new Fuse(initialConceptos, {
      keys: ["nombre", "descripcion_corta", "tags", "resumen_practico", "en_tu_stack"],
      threshold: 0.35,
    });
  }, [initialConceptos]);

  const filteredConceptos = useMemo(() => {
    let list = initialConceptos;

    if (query.trim()) {
      list = fuse.search(query).map((r) => r.item);
    }

    if (selectedCapa) {
      list = list.filter((c) => c.capa === selectedCapa);
    }

    if (selectedDifficulty) {
      list = list.filter((c) => c.dificultad === selectedDifficulty);
    }

    return list;
  }, [query, selectedCapa, selectedDifficulty, initialConceptos, fuse]);

  const resetFilters = () => {
    setQuery("");
    setSelectedCapa(null);
    setSelectedDifficulty(null);
  };

  const hasActiveFilters = query || selectedCapa || selectedDifficulty;

  return (
    <div className="w-full space-y-6">
      {/* Search & Navigation Toolbar */}
      <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-white/10 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-zinc-400" />
            <input
              type="text"
              placeholder="Buscar por concepto, tecnología (ej. cookies, Mongoose, ISR, Playwright)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-white/15 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-xs"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-white/10 self-start md:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                viewMode === "grid"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Grid className="h-3.5 w-3.5" />
              <span>Grid 3D</span>
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                viewMode === "table"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Table className="h-3.5 w-3.5" />
              <span>Matriz / Cheat Sheet</span>
            </button>
            <button
              onClick={() => setViewMode("layers")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                viewMode === "layers"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Capas</span>
            </button>
            <button
              onClick={() => setViewMode("roadmap")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                viewMode === "roadmap"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Compass className="h-3.5 w-3.5" />
              <span>Roadmap</span>
            </button>
            <button
              onClick={() => setViewMode("ai")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                viewMode === "ai"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>AI Studio</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200 dark:border-white/5 text-xs">
          <span className="text-slate-600 dark:text-zinc-400 font-semibold flex items-center gap-1 mr-1">
            <Filter className="h-3 w-3" />
            <span>Capas:</span>
          </span>
          <button
            onClick={() => setSelectedCapa(null)}
            className={`px-3 py-1 rounded-full font-medium transition-all ${
              selectedCapa === null
                ? "bg-indigo-600 text-white font-bold shadow-xs"
                : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800"
            }`}
          >
            Todas ({initialConceptos.length})
          </button>
          {CAPAS.map((capa) => {
            const isSelected = selectedCapa === capa.id;
            return (
              <button
                key={capa.id}
                onClick={() => setSelectedCapa(isSelected ? null : capa.id)}
                className={`px-3 py-1 rounded-full font-medium transition-all flex items-center gap-1.5 border ${
                  isSelected
                    ? "text-white font-bold shadow-xs"
                    : "bg-white dark:bg-slate-900/80 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20"
                }`}
                style={{
                  backgroundColor: isSelected ? capa.color : undefined,
                  borderColor: isSelected ? capa.color : undefined,
                  color: isSelected ? "#ffffff" : undefined,
                }}
              >
                <span>C{capa.numero}: {capa.nombre.split("(")[0].trim()}</span>
              </button>
            );
          })}

          {/* Difficulty filter */}
          <div className="flex items-center gap-1 ml-auto">
            {["básico", "intermedio", "avanzado"].map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(selectedDifficulty === diff ? null : diff)}
                className={`px-2.5 py-1 rounded-md capitalize text-[11px] transition-all ${
                  selectedDifficulty === diff
                    ? "bg-indigo-600 text-white font-bold"
                    : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {diff}
              </button>
            ))}
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-[11px] text-rose-500 hover:underline ml-2"
              >
                Limpiar
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main View Content */}
      {viewMode === "layers" && (
        <LayerArchitectureVisualizer />
      )}

      {viewMode === "roadmap" && (
        <RoadmapView conceptos={initialConceptos} />
      )}

      {viewMode === "ai" && (
        <AIPromptStudio conceptos={initialConceptos} />
      )}

      {viewMode === "grid" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400 px-1">
            <span>Mostrando <strong>{filteredConceptos.length}</strong> conceptos encontrados</span>
            {selectedCapa && (
              <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                Filtrado por: {getCapaById(selectedCapa)?.nombre}
              </span>
            )}
          </div>

          {filteredConceptos.length === 0 ? (
            <div className="p-12 text-center glass-panel rounded-2xl border border-slate-200 dark:border-white/10 space-y-3">
              <p className="text-base text-slate-800 dark:text-zinc-300 font-semibold">No se encontraron conceptos para tu búsqueda.</p>
              <p className="text-xs text-slate-500 dark:text-zinc-500">Prueba con términos como "Next.js", "CORS", "MongoDB", "Token" o limpia los filtros.</p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors"
              >
                Restablecer Filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredConceptos.map((concepto) => (
                <ConceptCard key={concepto.id} concepto={concepto} />
              ))}
            </div>
          )}
        </div>
      )}

      {viewMode === "table" && (
        <div className="glass-panel rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-950/80 text-slate-700 dark:text-zinc-400 font-semibold uppercase tracking-wider">
                  <th className="p-3.5">Capa</th>
                  <th className="p-3.5">Concepto</th>
                  <th className="p-3.5">Explicación Profunda</th>
                  <th className="p-3.5">En tu stack Next.js 16</th>
                  <th className="p-3.5">Dificultad</th>
                  <th className="p-3.5 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {filteredConceptos.map((c) => {
                  const capa = getCapaById(c.capa);
                  return (
                    <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                      <td className="p-3.5 font-mono whitespace-nowrap">
                        <span
                          className="px-2 py-0.5 rounded text-[10px] font-bold"
                          style={{
                            backgroundColor: `${capa?.color || '#6366f1'}20`,
                            color: capa?.color || '#6366f1',
                            border: `1px solid ${capa?.color || '#6366f1'}40`,
                          }}
                        >
                          C{c.capaNumero}
                        </span>
                      </td>
                      <td className="p-3.5 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                        <Link href={`/conceptos/${c.id}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline">
                          {c.nombre}
                        </Link>
                      </td>
                      <td className="p-3.5 text-slate-600 dark:text-zinc-300 max-w-sm leading-relaxed">
                        {c.descripcion_corta}
                      </td>
                      <td className="p-3.5 text-indigo-700 dark:text-indigo-300 font-medium max-w-xs leading-relaxed">
                        {c.resumen_practico || c.en_tu_stack || "Next.js 16 + Mongo"}
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        <span className="capitalize px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-zinc-400 border border-slate-200 dark:border-white/5 text-[10px]">
                          {c.dificultad}
                        </span>
                      </td>
                      <td className="p-3.5 text-right whitespace-nowrap">
                        <Link
                          href={`/conceptos/${c.id}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400 font-semibold transition-colors shadow-xs"
                        >
                          <span>Guía</span>
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
