import { getAllConceptos } from "@/lib/conceptos";
import RoadmapView from "@/components/RoadmapView";
import { Compass } from "lucide-react";

export default async function RoadmapPage() {
  const conceptos = await getAllConceptos();

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 space-y-8">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-50 dark:bg-indigo-500/10 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
          <Compass className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>Plan de Evolución Profesional</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Ruta de Aprendizaje (6 Fases)
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
          Sigue el orden metodológico para dominar el stack completo: Frontend + Backend ➔ Seguridad OWASP ➔ Modelado de Datos ➔ Edge ➔ DevOps ➔ Tiempo Real & Tests.
        </p>
      </div>

      <RoadmapView conceptos={conceptos} />
    </div>
  );
}
