import Link from "next/link";
import { getAllConceptos, CAPAS } from "@/lib/conceptos";
import LayerArchitectureVisualizer from "@/components/LayerArchitectureVisualizer";
import InteractiveRequestSimulator from "@/components/InteractiveRequestSimulator";
import ConceptCard from "@/components/ConceptCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  ArrowRight, 
  Sparkles, 
  Terminal, 
  Layers, 
  Compass, 
  ShieldCheck, 
  Zap, 
  Database,
  Cpu,
  Bot
} from "lucide-react";

export default async function Home() {
  const conceptos = await getAllConceptos();
  const destacados = conceptos.slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-12 pb-20 border-b border-white/10">
          {/* Subtle Glow Spheres */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-indigo-500/20 via-purple-500/15 to-sky-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-4xl space-y-6">
            {/* Version Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs font-semibold text-indigo-300 shadow-inner">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400 animate-pulse" />
              <span>Optimizada para Next.js 16 + React 19 + MongoDB</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
              <span className="gradient-text-hero">Mapa Mental Tridimensional de la</span>{" "}
              <span className="gradient-text-cyan">Web Moderna</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              No es una lista plana de librerías. Es una <strong>arquitectura conceptual en 8 capas</strong>: desde el protocolo HTTP hasta pruebas End-to-End con Playwright, anclada en tu stack real.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/conceptos"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 text-white text-sm font-bold shadow-lg shadow-indigo-500/25 hover:from-indigo-600 hover:to-purple-700 active:scale-95 transition-all"
              >
                <span>Explorar los {conceptos.length} Conceptos</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/roadmap"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-white/15 hover:border-white/30 text-white text-sm font-bold hover:bg-slate-800 transition-all"
              >
                <Compass className="h-4 w-4 text-indigo-400" />
                <span>Ruta en 6 Fases</span>
              </Link>
              <Link
                href="/prompt-studio"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-500/10 border border-purple-500/30 hover:bg-purple-500/20 text-purple-300 text-sm font-bold transition-all"
              >
                <Bot className="h-4 w-4" />
                <span>AI Prompt Studio</span>
              </Link>
            </div>

            {/* Quick Layer Jump Bar */}
            <div className="pt-8 flex flex-wrap justify-center gap-2">
              {CAPAS.map((capa) => (
                <Link
                  key={capa.id}
                  href={`/conceptos?capa=${capa.id}`}
                  className="px-3 py-1 rounded-lg text-xs font-mono font-medium border border-white/10 bg-slate-900/60 hover:bg-slate-900 hover:border-white/30 transition-colors text-zinc-300"
                >
                  <span style={{ color: capa.color }}>C{capa.numero}:</span> {capa.nombre.split("(")[0].trim()}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 3D ARCHITECTURE VISUALIZER */}
        <section className="container mx-auto px-4 sm:px-6 py-12">
          <LayerArchitectureVisualizer />
        </section>

        {/* LIVE REQUEST SIMULATOR */}
        <section className="container mx-auto px-4 sm:px-6 py-6">
          <InteractiveRequestSimulator />
        </section>

        {/* FEATURED CONCEPTS */}
        <section className="container mx-auto px-4 sm:px-6 py-12">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-1">
                <Terminal className="h-4 w-4" />
                <span>Conceptos Fundamentales</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Destacados del Ecosistema
              </h2>
            </div>
            <Link
              href="/conceptos"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <span>Ver todos ({conceptos.length})</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destacados.map((concepto) => (
              <ConceptCard key={concepto.id} concepto={concepto} />
            ))}
          </div>
        </section>

        {/* PROMPT CALLOUT */}
        <section className="container mx-auto px-4 sm:px-6 py-12">
          <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-950/60 via-indigo-950/40 to-slate-900 border border-purple-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-wider">
                <Bot className="h-4 w-4" />
                <span>¿Tienes dudas técnicas sobre un concepto?</span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                Usa el Asistente de Prompts IA para tu Stack
              </h3>
              <p className="text-sm text-zinc-300">
                Genera preguntas hiper-específicas para tu IA sobre middlewares con JWT, pipelines de agregación en MongoDB, o streaming con Suspense en Next.js 16 con un solo clic.
              </p>
            </div>
            <Link
              href="/prompt-studio"
              className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-lg shadow-purple-600/30 shrink-0 transition-all active:scale-95"
            >
              Abrir AI Prompt Studio →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
