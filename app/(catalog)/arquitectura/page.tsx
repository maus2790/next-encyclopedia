import LayerArchitectureVisualizer from "@/components/LayerArchitectureVisualizer";
import InteractiveRequestSimulator from "@/components/InteractiveRequestSimulator";
import { Layers } from "lucide-react";

export default function ArquitecturaPage() {
  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 space-y-12">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-50 dark:bg-indigo-500/10 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
          <Layers className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>Arquitectura Conceptual</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Mapa Tridimensional de 8 Capas
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
          Comprende cómo encajan todas las piezas del rompecabezas web: desde el socket TCP y cabeceras HTTP hasta bases de datos distribuidas y testing automatizado.
        </p>
      </div>

      {/* 3D Visualizer */}
      <LayerArchitectureVisualizer />

      {/* Simulator */}
      <InteractiveRequestSimulator />
    </div>
  );
}
