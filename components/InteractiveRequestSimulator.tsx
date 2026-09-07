"use client";

import { useState } from "react";
import { 
  Play, 
  RotateCcw, 
  CheckCircle, 
  Globe, 
  Shield, 
  Cpu, 
  Database, 
  Zap, 
  Layers, 
  ArrowRight,
  Clock,
  Sparkles
} from "lucide-react";

interface Step {
  id: number;
  capa: string;
  capaNum: number;
  nombre: string;
  descripcion: string;
  latencia: string;
  tecnologia: string;
  icon: any;
  color: string;
}

const STEPS: Step[] = [
  {
    id: 1,
    capa: "Capa 1: Frontend",
    capaNum: 1,
    nombre: "1. Despacho en el Navegador",
    descripcion: "El usuario presiona 'Actualizar Perfil' o navega a una ruta. React 19 inicia la Server Action con useTransition.",
    latencia: "~0ms",
    tecnologia: "React 19 Actions / Fetch",
    icon: Globe,
    color: "#818cf8",
  },
  {
    id: 2,
    capa: "Capa 0: Contrato Base HTTP",
    capaNum: 0,
    nombre: "2. Red, DNS & Handshake TLS",
    descripcion: "Petición HTTPS con cabeceras `Authorization: Bearer` y cookie HttpOnly `session_token` hacia el CDN.",
    latencia: "12ms",
    tecnologia: "HTTP/2, TLS 1.3, Cookies",
    icon: Zap,
    color: "#38bdf8",
  },
  {
    id: 3,
    capa: "Capa 4: Edge Runtime",
    capaNum: 4,
    nombre: "3. Middleware en el Edge",
    descripcion: "El archivo `middleware.ts` intercepta la petición en el nodo de red más cercano. Aplica Rate Limiting con Upstash y valida JWT.",
    latencia: "8ms",
    tecnologia: "Next.js Edge Middleware + Upstash",
    icon: Shield,
    color: "#f59e0b",
  },
  {
    id: 4,
    capa: "Capa 2: Backend Next.js",
    capaNum: 2,
    nombre: "4. Server Action / Route Handler",
    descripcion: "Ejecución en entorno Serverless seguro. Validación de schema con Zod y verificación de permisos contra OWASP Top 10.",
    latencia: "20ms",
    tecnologia: "Node.js Serverless + Zod",
    icon: Cpu,
    color: "#a855f7",
  },
  {
    id: 5,
    capa: "Capa 3: Persistencia & Caché",
    capaNum: 3,
    nombre: "5. Redis Cache Miss ➔ MongoDB Query",
    descripcion: "Revisa caché en Redis (1ms). Al expirar, ejecuta pipeline de agregación en MongoDB Atlas con Mongoose y almacena resultado en caché.",
    latencia: "35ms",
    tecnologia: "Upstash Redis + MongoDB Atlas",
    icon: Database,
    color: "#10b981",
  },
  {
    id: 6,
    capa: "Capa 1: Frontend & Streaming",
    capaNum: 1,
    nombre: "6. Streaming SSR & Hidratación",
    descripcion: "El servidor transmite el payload UI al cliente. React reconcilia el árbol DOM y el hook `useOptimistic` se confirma con éxito.",
    latencia: "15ms",
    tecnologia: "React 19 Hydration + RSC",
    icon: Sparkles,
    color: "#818cf8",
  },
];

export default function InteractiveRequestSimulator() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [scenario, setScenario] = useState<"server-action" | "ssr-page">("server-action");

  const runSimulation = () => {
    setIsRunning(true);
    setCurrentStep(1);

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= STEPS.length) {
          clearInterval(interval);
          setIsRunning(false);
          return prev;
        }
        return prev + 1;
      });
    }, 900);
  };

  const resetSimulation = () => {
    setCurrentStep(0);
    setIsRunning(false);
  };

  return (
    <div className="w-full my-8 p-6 glass-panel rounded-2xl border border-white/10 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-1">
            <Zap className="h-4 w-4" />
            <span>Simulador Interactivo de Ciclo de Vida</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            ¿Cómo viaja una petición por las 8 capas?
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Observa paso a paso cómo interactúan el navegador, el Edge Middleware, el Backend Next.js 16 y MongoDB.
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={runSimulation}
            disabled={isRunning}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all shadow-lg ${
              isRunning
                ? "bg-zinc-700 opacity-60 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-95 shadow-indigo-500/25"
            }`}
          >
            <Play className="h-4 w-4" />
            <span>{isRunning ? "Simulando flujo..." : "Disparar Petición HTTP"}</span>
          </button>
          <button
            onClick={resetSimulation}
            className="p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300 transition-colors"
            title="Reiniciar simulador"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Flow Steps Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {STEPS.map((step) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isDone = currentStep > step.id;

          return (
            <div
              key={step.id}
              className={`p-4 rounded-xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                isActive
                  ? "bg-slate-900/90 border-2 scale-[1.02] shadow-xl ring-2"
                  : isDone
                  ? "bg-slate-950/70 border-emerald-500/30 opacity-90"
                  : "bg-slate-950/40 border-white/5 opacity-50"
              }`}
              style={{
                borderColor: isActive ? step.color : isDone ? "#10b981" : undefined,
                boxShadow: isActive ? `0 10px 30px -10px ${step.color}40` : undefined,
              }}
            >
              {/* Active Pulse Animation */}
              {isActive && (
                <div
                  className="absolute -top-10 -right-10 w-28 h-28 rounded-full blur-2xl opacity-40 animate-pulse"
                  style={{ backgroundColor: step.color }}
                />
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${step.color}20`,
                      color: step.color,
                      border: `1px solid ${step.color}40`,
                    }}
                  >
                    {step.capa}
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                    <Clock className="h-3 w-3" />
                    <span>{step.latencia}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="p-1.5 rounded-lg shrink-0"
                    style={{ backgroundColor: `${step.color}20`, color: step.color }}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white leading-tight">
                    {step.nombre}
                  </h4>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed mb-3">
                  {step.descripcion}
                </p>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
                <span className="text-zinc-400 font-mono">{step.tecnologia}</span>
                {isDone && (
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <CheckCircle className="h-3.5 w-3.5" />
                    <span>OK</span>
                  </span>
                )}
                {isActive && (
                  <span className="flex items-center gap-1 text-indigo-400 font-semibold animate-pulse">
                    <span>Procesando...</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Latency Total Result */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/80 border border-white/10 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 font-bold">
            ✓
          </div>
          <div>
            <span className="font-semibold text-white">Tiempo Total Estimado de Round-Trip:</span>
            <span className="text-emerald-400 font-mono font-bold ml-2">~90ms (Edge + Next.js 16 + Redis)</span>
          </div>
        </div>
        <span className="text-zinc-400">
          Cero cuellos de botella gracias a ejecución distribuida e invalidación ISR.
        </span>
      </div>
    </div>
  );
}
