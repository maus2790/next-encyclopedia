"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ROADMAP_FASES, Concepto } from "@/lib/conceptos";
import { 
  CheckCircle2, 
  Circle, 
  Compass, 
  ArrowRight, 
  Sparkles, 
  Trophy,
  Flame,
  BookOpen
} from "lucide-react";

interface RoadmapViewProps {
  conceptos?: Concepto[];
}

export default function RoadmapView({ conceptos = [] }: RoadmapViewProps) {
  const [completedPhases, setCompletedPhases] = useState<number[]>([]);
  const [completedConcepts, setCompletedConcepts] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedPhases = localStorage.getItem("roadmap_completed_phases");
      const savedConcepts = localStorage.getItem("roadmap_completed_concepts");
      if (savedPhases) setCompletedPhases(JSON.parse(savedPhases));
      if (savedConcepts) setCompletedConcepts(JSON.parse(savedConcepts));
    } catch (e) {
      console.error("Error reading localStorage roadmap:", e);
    }
    setIsLoaded(true);
  }, []);

  const toggleConcept = (id: string) => {
    const updated = completedConcepts.includes(id)
      ? completedConcepts.filter((c) => c !== id)
      : [...completedConcepts, id];
    setCompletedConcepts(updated);
    try {
      localStorage.setItem("roadmap_completed_concepts", JSON.stringify(updated));
    } catch (e) {}
  };

  const togglePhase = (faseNum: number) => {
    const updated = completedPhases.includes(faseNum)
      ? completedPhases.filter((p) => p !== faseNum)
      : [...completedPhases, faseNum];
    setCompletedPhases(updated);
    try {
      localStorage.setItem("roadmap_completed_phases", JSON.stringify(updated));
    } catch (e) {}
  };

  const totalConceptsCount = ROADMAP_FASES.reduce((acc, f) => acc + f.conceptos_ids.length, 0);
  const completedConceptsCount = completedConcepts.length;
  const progressPercentage = Math.min(100, Math.round((completedConceptsCount / (totalConceptsCount || 1)) * 100));

  return (
    <div className="w-full my-8 space-y-8">
      {/* Header & Progress Bar */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-1">
              <Compass className="h-4 w-4" />
              <span>Ruta de Aprendizaje Evolutiva</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Mapa de Ruta Fullstack (6 Fases)
            </h2>
            <p className="text-sm text-zinc-400 mt-1">
              Diseñado para profundizar metódicamente en Next.js 16 + MongoDB + Auth sin saturarte.
            </p>
          </div>

          {/* Gamification Badge */}
          <div className="flex items-center gap-3 self-start md:self-auto p-3 rounded-xl bg-slate-900 border border-white/10">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-zinc-400">Progreso Total</div>
              <div className="text-lg font-bold text-white flex items-center gap-2">
                <span>{progressPercentage}%</span>
                <span className="text-[11px] font-normal text-indigo-300">
                  ({completedConceptsCount}/{totalConceptsCount} conceptos)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-white/5">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 transition-all duration-500 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* 6 Phases Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ROADMAP_FASES.map((fase) => {
          const isPhaseDone = completedPhases.includes(fase.fase);
          const phaseConceptCount = fase.conceptos_ids.length;
          const completedInThisPhase = fase.conceptos_ids.filter((id) => completedConcepts.includes(id)).length;
          const isAllConceptsDone = completedInThisPhase === phaseConceptCount && phaseConceptCount > 0;

          return (
            <div
              key={fase.fase}
              className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                isPhaseDone || isAllConceptsDone
                  ? "bg-slate-900/90 border-emerald-500/40 shadow-emerald-500/10"
                  : "bg-slate-950/60 border-white/10 hover:border-white/20"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 font-mono text-xs font-bold border border-indigo-500/30">
                      F{fase.fase}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                      {fase.nivel}
                    </span>
                  </div>

                  <button
                    onClick={() => togglePhase(fase.fase)}
                    className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
                  >
                    {isPhaseDone ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        <span className="text-emerald-400 font-medium">Completada</span>
                      </>
                    ) : (
                      <>
                        <Circle className="h-4 w-4 text-zinc-500" />
                        <span>Marcar fase</span>
                      </>
                    )}
                  </button>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">
                  {fase.titulo}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
                  {fase.descripcion}
                </p>

                {/* Concept Chips in this phase */}
                <div className="space-y-2 mb-4">
                  <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                    Hitos clave de esta fase:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {fase.conceptos_ids.map((id) => {
                      const isChecked = completedConcepts.includes(id);
                      return (
                        <div
                          key={id}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs border transition-all ${
                            isChecked
                              ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"
                              : "bg-slate-900 border-white/10 text-zinc-300 hover:border-white/30"
                          }`}
                        >
                          <button
                            onClick={() => toggleConcept(id)}
                            className="text-zinc-500 hover:text-emerald-400 transition-colors"
                            title="Completar concepto"
                          >
                            {isChecked ? (
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                            ) : (
                              <Circle className="h-3.5 w-3.5" />
                            )}
                          </button>
                          <Link
                            href={`/conceptos/${id}`}
                            className="hover:underline font-medium"
                          >
                            {id.replace(/-/g, " ")}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
                <span className="flex items-center gap-1 text-indigo-300">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Estado: {fase.estado_previo}</span>
                </span>
                <span className="font-mono text-zinc-500">
                  {completedInThisPhase}/{phaseConceptCount} listos
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
