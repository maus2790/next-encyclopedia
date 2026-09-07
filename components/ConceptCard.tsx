"use client";

import Link from "next/link";
import { Concepto, getCapaById } from "@/lib/conceptos";
import { ArrowUpRight, CheckCircle2, Sparkles, Code2, ShieldAlert } from "lucide-react";

interface ConceptCardProps {
  concepto: Concepto;
  onPreview?: (concepto: Concepto) => void;
}

export default function ConceptCard({ concepto, onPreview }: ConceptCardProps) {
  const capa = getCapaById(concepto.capa);
  const layerColor = capa?.color || "#6366f1";

  const difficultyColors = {
    básico: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    intermedio: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    avanzado: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl glass-card p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      {/* Top Accent Line */}
      <div
        className="absolute top-0 left-6 right-6 h-[2px] rounded-full opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:left-3 group-hover:right-3"
        style={{ backgroundColor: layerColor }}
      />

      <div>
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full"
            style={{
              backgroundColor: `${layerColor}15`,
              color: layerColor,
              border: `1px solid ${layerColor}30`,
            }}
          >
            C{concepto.capaNumero}: {concepto.capaNombre?.split("(")[0]?.trim() || "Web"}
          </span>

          <span
            className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
              difficultyColors[concepto.dificultad] || difficultyColors["intermedio"]
            }`}
          >
            {concepto.dificultad}
          </span>
        </div>

        {/* Title */}
        <Link href={`/conceptos/${concepto.id}`} className="block group-hover:text-indigo-300 transition-colors">
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center justify-between">
            <span>{concepto.nombre}</span>
            <ArrowUpRight className="h-4 w-4 opacity-0 -translate-x-1 translate-y-1 transition-all group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 text-indigo-400 shrink-0" />
          </h3>
        </Link>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed line-clamp-3">
          {concepto.descripcion_corta}
        </p>

        {/* Practical takeaway */}
        {concepto.resumen_practico && (
          <div className="mt-3.5 p-2.5 rounded-xl bg-slate-950/60 border border-white/5 text-[11px] text-zinc-300 flex items-start gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
            <span className="line-clamp-2">{concepto.resumen_practico}</span>
          </div>
        )}
      </div>

      {/* Footer Tags & Actions */}
      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between gap-2">
        <div className="flex gap-1.5 flex-wrap">
          {concepto.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] bg-white/5 hover:bg-white/10 text-zinc-400 px-2 py-0.5 rounded-md font-mono transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>

        <Link
          href={`/conceptos/${concepto.id}`}
          className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 shrink-0 hover:underline"
        >
          Ver detalle →
        </Link>
      </div>
    </div>
  );
}