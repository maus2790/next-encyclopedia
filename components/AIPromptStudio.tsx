"use client";

import { useState } from "react";
import { Concepto } from "@/lib/conceptos";
import { 
  Sparkles, 
  Copy, 
  Check, 
  Bot, 
} from "lucide-react";

interface AIPromptStudioProps {
  conceptos: Concepto[];
  defaultConceptoId?: string;
}

const GOALS = [
  { id: "code", label: "💻 Generar Código de Producción", promptSnippet: "Proporciona una implementación completa y lista para producción con tipado estricto en TypeScript y buenas prácticas de Next.js 16 y React 19." },
  { id: "explain", label: "🧠 Explicación Práctica & Analogía", promptSnippet: "Explica este concepto con una analogía clara del mundo real y demuestra paso a paso cómo resuelve un problema común en desarrollo web moderno." },
  { id: "security", label: "🛡️ Auditoría de Seguridad & OWASP", promptSnippet: "Detalla qué vulnerabilidades de seguridad pueden ocurrir si se implementa incorrectamente y cómo blindarlo contra ataques OWASP Top 10." },
  { id: "debug", label: "🐛 Depuración & Errores Comunes", promptSnippet: "Enumera los 3 errores más comunes que los desarrolladores cometen con este concepto y cómo diagnosticarlos y solucionarlos rápidamente." },
];

export default function AIPromptStudio({ conceptos, defaultConceptoId }: AIPromptStudioProps) {
  const [selectedConceptoId, setSelectedConceptoId] = useState<string>(defaultConceptoId || conceptos[0]?.id || "server-actions");
  const [selectedGoal, setSelectedGoal] = useState<string>("code");
  const [customDetail, setCustomDetail] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const selectedConcepto = conceptos.find((c) => c.id === selectedConceptoId) || conceptos[0];
  const selectedGoalObj = GOALS.find((g) => g.id === selectedGoal) || GOALS[0];

  const generatedPrompt = `Actúa como un Arquitecto Senior en Desarrollo Web Full-Stack especialista en Next.js 16, React 19 y MongoDB.

Quiero profundizar en el concepto: "${selectedConcepto?.nombre}" (${selectedConcepto?.capaNombre}).

Contexto de mi aplicación:
- Framework: Next.js 16 (App Router con Turbopack)
- Librería de UI: React 19 (Server Components, Server Actions, Suspense)
- Base de Datos: MongoDB Atlas con Mongoose / Driver Nativo
- Autenticación: Sesiones seguras en cookies HttpOnly y JWT

Objetivo de mi consulta:
${selectedGoalObj.promptSnippet}

${customDetail ? `Detalles adicionales de mi caso:\n${customDetail}\n` : ""}
Por favor estructura tu respuesta con:
1. Resumen conceptual de alto nivel
2. Código TypeScript completo y comentado
3. Consideraciones de rendimiento y Edge Runtime si aplica
4. Pruebas de verificación recomendadas`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full my-8 space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-white/10">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-purple-600 dark:text-purple-400 mb-1">
          <Bot className="h-4 w-4" />
          <span>Generador de Consultas IA para tu Stack</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          AI Prompt Studio
        </h2>
        <p className="text-sm text-slate-600 dark:text-zinc-400 mt-1 max-w-2xl">
          Genera prompts de alta precisión técnica para consultar a cualquier modelo de IA (Claude, ChatGPT, Gemini) y obtener código exacto adaptado a Next.js 16 y MongoDB.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Configuration Controls */}
        <div className="lg:col-span-5 space-y-5">
          {/* Concept Selector */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 space-y-3 shadow-xs">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-zinc-300 block">
              1. Selecciona el concepto de la Enciclopedia:
            </label>
            <select
              value={selectedConceptoId}
              onChange={(e) => setSelectedConceptoId(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/15 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-indigo-500"
            >
              {conceptos.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.capaNombre.split("(")[0].trim()} → {c.nombre}
                </option>
              ))}
            </select>
            {selectedConcepto && (
              <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-2">
                {selectedConcepto.descripcion_corta}
              </p>
            )}
          </div>

          {/* Goal Selector */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 space-y-3 shadow-xs">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-zinc-300 block">
              2. Elige el objetivo de tu consulta:
            </label>
            <div className="space-y-2">
              {GOALS.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => setSelectedGoal(goal.id)}
                  className={`w-full text-left p-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                    selectedGoal === goal.id
                      ? "bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/40 shadow-xs"
                      : "bg-slate-50 dark:bg-slate-950/60 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-slate-950"
                  }`}
                >
                  <span>{goal.label}</span>
                  {selectedGoal === goal.id && <Check className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />}
                </button>
              ))}
            </div>
          </div>

          {/* Optional Specific Note */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 space-y-2 shadow-xs">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-zinc-300 block">
              3. ¿Algún detalle o caso específico? (Opcional)
            </label>
            <textarea
              value={customDetail}
              onChange={(e) => setCustomDetail(e.target.value)}
              placeholder="Ej: Necesito validar contraseñas con Zod y guardar en una colección 'accounts' con Mongoose..."
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/15 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 h-20 resize-none"
            />
          </div>
        </div>

        {/* Right: Generated Prompt Preview & Copy Action */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-6 border border-slate-200 dark:border-white/10 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <span className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
                  Prompt Optimizado para IA
                </span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-md active:scale-95 transition-all"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-300" />
                    <span>¡Copiado al Portapapeles!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copiar Prompt Listo</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 text-zinc-200 dark:bg-black/50 border border-slate-300 dark:border-white/10 font-mono text-xs whitespace-pre-wrap leading-relaxed max-h-[380px] overflow-y-auto select-all shadow-inner">
              {generatedPrompt}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 text-xs text-purple-700 dark:text-purple-300 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Bot className="h-4 w-4 shrink-0" />
              <span>Copia este prompt y pégalo directamente en tu chat de IA favorito.</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
