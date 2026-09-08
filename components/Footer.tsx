import Link from "next/link";
import { CAPAS } from "@/lib/conceptos";
import { Terminal, Layers, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950/90 text-slate-600 dark:text-zinc-400 mt-20 transition-colors">
      <div className="container mx-auto px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Columna 1: Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                <Terminal className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">Enciclopedia Web Moderna</span>
              <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                v16.3 (Turbopack)
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-zinc-400 max-w-md leading-relaxed">
              Un mapa mental tridimensional del ecosistema web moderno estructurado en 8 capas de abstracción: desde el protocolo HTTP hasta pruebas de calidad con Playwright, optimizado para el stack <strong>Next.js 16 + MongoDB + Auth</strong>.
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-md bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-700 dark:text-zinc-300 shadow-xs">⚛️ React 19</span>
              <span className="px-2.5 py-1 rounded-md bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-700 dark:text-zinc-300 shadow-xs">⚡ Turbopack</span>
              <span className="px-2.5 py-1 rounded-md bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-700 dark:text-zinc-300 shadow-xs">🍃 MongoDB Mongoose</span>
              <span className="px-2.5 py-1 rounded-md bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-700 dark:text-zinc-300 shadow-xs">🛡️ OWASP Ready</span>
            </div>
          </div>

          {/* Columna 2: Capas Principales */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <Layers className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              Capas Principales
            </h3>
            <ul className="space-y-1.5 text-xs">
              {CAPAS.slice(0, 4).map((capa) => (
                <li key={capa.id}>
                  <Link
                    href={`/conceptos?capa=${capa.id}`}
                    className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-slate-400 dark:text-zinc-500 font-mono">C{capa.numero}:</span>
                    <span>{capa.nombre.split("(")[0]}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Especialización */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              Especialización
            </h3>
            <ul className="space-y-1.5 text-xs">
              {CAPAS.slice(4).map((capa) => (
                <li key={capa.id}>
                  <Link
                    href={`/conceptos?capa=${capa.id}`}
                    className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-slate-400 dark:text-zinc-500 font-mono">C{capa.numero}:</span>
                    <span>{capa.nombre.split("(")[0]}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link href="/prompt-studio" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline flex items-center gap-1">
                  <span>✨ AI Prompt Studio</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-zinc-500">
          <p>© 2026 Next Web Encyclopedia. Construido con React 19 y Next.js 16.</p>
          <div className="flex items-center gap-4">
            <Link href="/roadmap" className="hover:text-slate-900 dark:hover:text-zinc-300 transition-colors">
              Ruta de Aprendizaje
            </Link>
            <Link href="/arquitectura" className="hover:text-slate-900 dark:hover:text-zinc-300 transition-colors">
              Mapa 3D
            </Link>
            <Link href="/simulador" className="hover:text-slate-900 dark:hover:text-zinc-300 transition-colors">
              Simulador
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
