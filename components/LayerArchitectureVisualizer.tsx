"use client";

import { useState } from "react";
import Link from "next/link";
import { CAPAS, getConceptosByCapa } from "@/lib/conceptos";
import { 
  Globe, 
  Layout, 
  Server, 
  Database, 
  Cloud, 
  Wrench, 
  Radio, 
  ShieldCheck, 
  ArrowRight,
  ExternalLink,
  Layers,
  Sparkles,
  CheckCircle2
} from "lucide-react";

const ICON_MAP: Record<string, any> = {
  Globe,
  Layout,
  Server,
  Database,
  Cloud,
  Wrench,
  Radio,
  ShieldCheck,
};

export default function LayerArchitectureVisualizer() {
  const [selectedLayerId, setSelectedLayerId] = useState<string>("capa-1");
  const activeLayer = CAPAS.find((c) => c.id === selectedLayerId) || CAPAS[0];
  const layerConceptos = getConceptosByCapa(selectedLayerId);

  return (
    <div className="w-full my-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-1">
            <Layers className="h-4 w-4" />
            <span>Mapa Mental Tridimensional</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Pila de Arquitectura Web en 8 Capas
          </h2>
          <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
            Haz clic en cualquiera de las capas de la pila para inspeccionar sus responsabilidades, tecnologías estándar y conceptos clave para tu stack.
          </p>
        </div>
        <Link
          href="/conceptos"
          className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors self-start md:self-end"
        >
          <span>Ver catálogo completo</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Grid: 3D Stack (Left) + Layer Deep Dive (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Interactive Stack */}
        <div className="lg:col-span-5 flex flex-col gap-2.5">
          {CAPAS.map((capa) => {
            const Icon = ICON_MAP[capa.icon] || Globe;
            const isSelected = capa.id === selectedLayerId;
            return (
              <button
                key={capa.id}
                onClick={() => setSelectedLayerId(capa.id)}
                className={`relative w-full text-left p-3.5 rounded-xl transition-all duration-300 flex items-center justify-between group ${
                  isSelected
                    ? "bg-slate-900 border-2 shadow-lg ring-1"
                    : "bg-slate-950/60 hover:bg-slate-900/80 border border-white/5 hover:border-white/20"
                }`}
                style={{
                  borderColor: isSelected ? capa.color : undefined,
                  boxShadow: isSelected ? `0 8px 24px -6px ${capa.color}33` : undefined,
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-mono text-sm font-bold shadow-inner"
                    style={{
                      backgroundColor: `${capa.color}20`,
                      color: capa.color,
                      border: `1px solid ${capa.color}40`,
                    }}
                  >
                    C{capa.numero}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white group-hover:text-indigo-200 transition-colors">
                        {capa.nombre.split("(")[0]}
                      </span>
                    </div>
                    <span className="text-[11px] text-zinc-400 block truncate max-w-[200px] sm:max-w-xs">
                      {capa.subtitulo}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Icon
                    className="h-4 w-4 transition-transform group-hover:scale-110"
                    style={{ color: isSelected ? capa.color : "#94a3b8" }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Active Layer Detail Panel */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-6 border border-white/10 relative overflow-hidden">
          {/* Top Gradient Background */}
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none -mr-20 -mt-20"
            style={{ backgroundColor: activeLayer.color }}
          />

          <div className="relative z-10 space-y-6">
            {/* Header of Active Layer */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2"
                  style={{
                    backgroundColor: `${activeLayer.color}15`,
                    color: activeLayer.color,
                    border: `1px solid ${activeLayer.color}30`,
                  }}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Capa {activeLayer.numero}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {activeLayer.nombre}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 font-medium mt-1">
                  {activeLayer.subtitulo}
                </p>
              </div>
              <Link
                href={`/conceptos?capa=${activeLayer.id}`}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-white border border-white/15 bg-white/5 hover:bg-white/10 transition-colors shrink-0 flex items-center gap-1"
              >
                <span>Filtrar capa</span>
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>

            {/* Description */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-sm text-zinc-300 leading-relaxed">
              {activeLayer.descripcion}
            </div>

            {/* Concepts inside this layer */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Conceptos de esta capa ({layerConceptos.length})
                </h4>
                <span className="text-[11px] text-zinc-500">Haz clic para leer la guía técnica</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {layerConceptos.map((concepto) => (
                  <Link
                    key={concepto.id}
                    href={`/conceptos/${concepto.id}`}
                    className="p-3 rounded-xl bg-slate-900/70 border border-white/5 hover:border-white/20 hover:bg-slate-800/80 transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
                          {concepto.nombre}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-zinc-400 border border-white/5">
                          {concepto.dificultad}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                        {concepto.descripcion_corta}
                      </p>
                    </div>

                    {concepto.resumen_practico && (
                      <div className="mt-2 pt-2 border-t border-white/5 text-[11px] text-indigo-300/90 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3 shrink-0 text-emerald-400" />
                        <span className="truncate">{concepto.resumen_practico}</span>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
