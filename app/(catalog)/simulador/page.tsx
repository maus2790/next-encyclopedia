import InteractiveRequestSimulator from "@/components/InteractiveRequestSimulator";
import { Zap } from "lucide-react";

export default function SimuladorPage() {
  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 space-y-8">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
          <Zap className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Simulador en Tiempo Real</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Simulador de Petición HTTP & Ciclo de Vida
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
          Experimenta cómo se ejecuta una petición a través de cada una de las capas de tu stack en Next.js 16 con baja latencia y caching multinivel.
        </p>
      </div>

      <InteractiveRequestSimulator />
    </div>
  );
}
