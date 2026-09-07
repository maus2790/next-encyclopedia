import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container mx-auto py-20 px-4 text-center">
      <h1 className="text-5xl font-extrabold tracking-tight lg:text-6xl">
        Guía completa del desarrollo web moderno
      </h1>
      <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
        Explora cada capa: HTTP, Frontend, Backend, Bases de Datos, Infraestructura, DevX, Tiempo Real y Testing.
      </p>
      <div className="mt-10">
        <Link
          href="/conceptos"
          className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
        >
          Ver todos los conceptos
        </Link>
      </div>
    </div>
  );
}