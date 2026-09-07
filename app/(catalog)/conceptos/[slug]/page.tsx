import { notFound } from "next/navigation";
import Link from "next/link";
import { getConceptoBySlug, getAllConceptos, getCapaById } from "@/lib/conceptos";
import CodeBlock from "@/components/CodeBlock";
import { 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  Bot, 
  Copy, 
  ExternalLink, 
  Layers, 
  Tag, 
  Share2,
  BookOpen
} from "lucide-react";

interface ConceptoPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const conceptos = await getAllConceptos();
  return conceptos.map((c) => ({ slug: c.id }));
}

export default async function ConceptoPage({ params }: ConceptoPageProps) {
  const { slug } = await params;
  const concepto = await getConceptoBySlug(slug);

  if (!concepto) {
    notFound();
  }

  const capa = getCapaById(concepto.capa);
  const todos = await getAllConceptos();
  const relacionadosConceptos = todos.filter((c) => concepto.relacionados?.includes(c.id));

  const difficultyColors = {
    básico: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    intermedio: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    avanzado: "bg-rose-500/10 text-rose-400 border-rose-500/30",
  };

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 max-w-4xl space-y-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between gap-4 text-xs text-zinc-400 border-b border-white/10 pb-4">
        <Link
          href="/conceptos"
          className="inline-flex items-center gap-1.5 hover:text-white transition-colors group"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Volver al catálogo</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-zinc-500">Enciclopedia</span>
          <span>/</span>
          <Link
            href={`/conceptos?capa=${concepto.capa}`}
            className="hover:text-indigo-300 transition-colors"
            style={{ color: capa?.color }}
          >
            Capa {concepto.capaNumero}
          </Link>
          <span>/</span>
          <span className="text-white font-medium">{concepto.nombre}</span>
        </div>
      </div>

      {/* Main Card / Article */}
      <article className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-8 relative overflow-hidden">
        {/* Glow corner */}
        <div
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: capa?.color || "#6366f1" }}
        />

        {/* Title Header */}
        <div className="space-y-3 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="text-xs font-mono font-bold px-3 py-1 rounded-full"
              style={{
                backgroundColor: `${capa?.color || '#6366f1'}20`,
                color: capa?.color || '#6366f1',
                border: `1px solid ${capa?.color || '#6366f1'}40`,
              }}
            >
              Capa {concepto.capaNumero}: {concepto.capaNombre}
            </span>
            <span
              className={`text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                difficultyColors[concepto.dificultad]
              }`}
            >
              {concepto.dificultad}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {concepto.nombre}
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
            {concepto.descripcion_corta}
          </p>
        </div>

        {/* Practical Takeaway / "Lo que debes saber en la práctica" */}
        {concepto.resumen_practico && (
          <div className="p-4 sm:p-5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-indigo-300">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Lo que debes saber en la práctica & En tu Stack</span>
            </div>
            <p className="text-sm text-zinc-200 leading-relaxed">
              {concepto.resumen_practico}
            </p>
          </div>
        )}

        {/* Deep Explanation */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-indigo-400" />
            <span>Explicación Profunda</span>
          </h2>
          <div
            className="prose prose-invert max-w-none text-zinc-300 text-sm leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_strong]:text-white [&_code]:bg-white/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-indigo-300"
            dangerouslySetInnerHTML={{ __html: concepto.explicacion }}
          />
        </div>

        {/* Code Example */}
        {concepto.ejemplo_codigo && (
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-400" />
              <span>Ejemplo de Código en Next.js 16</span>
            </h2>
            <CodeBlock
              language={concepto.ejemplo_codigo.lenguaje}
              code={concepto.ejemplo_codigo.codigo}
              title={concepto.ejemplo_codigo.titulo}
            />
          </div>
        )}

        {/* AI Prompt Ready Box */}
        {concepto.prompt_ia && (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/50 to-slate-900 border border-purple-500/30 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-bold text-purple-300 uppercase tracking-wider">
                <Bot className="h-4 w-4" />
                <span>Consulta a tu IA (Prompt Listo)</span>
              </div>
              <Link
                href={`/prompt-studio`}
                className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 hover:underline"
              >
                <span>Abrir Studio</span>
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
            <p className="text-xs text-zinc-300 font-medium">
              ¿Quieres profundizar más con un asistente inteligente? Copia esta instrucción:
            </p>
            <div className="p-3 rounded-xl bg-black/60 border border-white/5 font-mono text-xs text-purple-200 select-all">
              "{concepto.prompt_ia.prompt_completo}"
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
          <span className="text-xs text-zinc-400 font-semibold flex items-center gap-1 mr-2">
            <Tag className="h-3.5 w-3.5" />
            <span>Etiquetas:</span>
          </span>
          {concepto.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-zinc-300 font-mono"
            >
              #{tag}
            </span>
          ))}
        </div>
      </article>

      {/* Related Concepts */}
      {relacionadosConceptos.length > 0 && (
        <section className="space-y-4 pt-4">
          <h3 className="text-xl font-bold text-white">
            Conceptos Relacionados
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {relacionadosConceptos.map((rel) => {
              const relCapa = getCapaById(rel.capa);
              return (
                <Link
                  key={rel.id}
                  href={`/conceptos/${rel.id}`}
                  className="p-4 rounded-xl glass-card border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <span
                      className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full mb-2 inline-block"
                      style={{
                        backgroundColor: `${relCapa?.color || '#6366f1'}15`,
                        color: relCapa?.color || '#6366f1',
                      }}
                    >
                      C{rel.capaNumero}
                    </span>
                    <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {rel.nombre}
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                      {rel.descripcion_corta}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-indigo-400 mt-3 flex items-center gap-1">
                    <span>Leer guía</span>
                    <ExternalLink className="h-3 w-3" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}