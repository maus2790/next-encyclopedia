import { getAllConceptos } from "@/lib/conceptos";
import InteractiveExplorer from "@/components/InteractiveExplorer";
import { BookOpen } from "lucide-react";

interface ConceptosPageProps {
  searchParams: Promise<{ capa?: string; view?: "grid" | "table" | "layers" | "roadmap" | "ai" }>;
}

export default async function ConceptosPage({ searchParams }: ConceptosPageProps) {
  const { capa, view } = await searchParams;
  const conceptos = await getAllConceptos();

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs font-semibold text-indigo-300">
          <BookOpen className="h-3.5 w-3.5 text-indigo-400" />
          <span>Enciclopedia Completa & Cheat Sheets</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
          Explorador de Conceptos
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
          Navega entre los {conceptos.length} conceptos clave estructurados por capa, consulta snippets de código para Next.js 16 y genera prompts personalizados para tu IA.
        </p>
      </div>

      {/* Dynamic Interactive Explorer */}
      <InteractiveExplorer
        initialConceptos={conceptos}
        defaultCapa={capa}
        defaultView={view || "grid"}
      />
    </div>
  );
}