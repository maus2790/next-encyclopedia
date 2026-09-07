import conceptosData from "@/data/conceptos.json";

export type Dificultad = "básico" | "intermedio" | "avanzado";

export interface CapaInfo {
  id: string;
  numero: number;
  nombre: string;
  subtitulo: string;
  descripcion: string;
  color: string;
  gradient: string;
  borderGlow: string;
  icon: string;
}

export interface Concepto {
  id: string;
  nombre: string;
  capa: string; // "capa-0", "capa-1", etc.
  capaNumero: number;
  capaNombre: string;
  descripcion_corta: string;
  explicacion: string;
  resumen_practico?: string;
  en_tu_stack?: string;
  ejemplo_codigo?: {
    lenguaje: string;
    codigo: string;
    titulo?: string;
  };
  tags: string[];
  relacionados: string[];
  dificultad: Dificultad;
  prompt_ia?: {
    pregunta: string;
    prompt_completo: string;
  };
}

export interface RoadmapFase {
  fase: number;
  titulo: string;
  estado_previo: string;
  descripcion: string;
  conceptos_ids: string[];
  nivel: string;
}

export const CAPAS: CapaInfo[] = [
  {
    id: "capa-0",
    numero: 0,
    nombre: "El Contrato Base (HTTP y la Web)",
    subtitulo: "Protocolo, Verbos, Headers y Seguridad de Red",
    descripcion: "Antes de escribir código, el navegador y el servidor hablan un idioma común: HTTP/HTTPS, Cookies seguras y CORS.",
    color: "#38bdf8", // Sky
    gradient: "from-sky-500/20 via-cyan-500/10 to-transparent",
    borderGlow: "border-sky-500/30 hover:border-sky-500/60 shadow-sky-500/10",
    icon: "Globe",
  },
  {
    id: "capa-1",
    numero: 1,
    nombre: "Frontend (El Navegador como Plataforma)",
    subtitulo: "Renderizado, Estado, React 19 y Server Actions",
    descripcion: "Aquí no solo se pintan interfaces, se gestiona estado del servidor y del cliente, hidratación y streaming en tiempo real.",
    color: "#818cf8", // Indigo
    gradient: "from-indigo-500/20 via-blue-500/10 to-transparent",
    borderGlow: "border-indigo-500/30 hover:border-indigo-500/60 shadow-indigo-500/10",
    icon: "Layout",
  },
  {
    id: "capa-2",
    numero: 2,
    nombre: "Backend (Cerebro y Lógica de Negocio)",
    subtitulo: "APIs en Next.js, ORMs/ODMs y Seguridad OWASP",
    descripcion: "Arquitectura de servidor: Route Handlers, Server Actions, Middleware en el Edge, Mongoose/Prisma y mitigación de OWASP Top 10.",
    color: "#a855f7", // Purple
    gradient: "from-purple-500/20 via-violet-500/10 to-transparent",
    borderGlow: "border-purple-500/30 hover:border-purple-500/60 shadow-purple-500/10",
    icon: "Server",
  },
  {
    id: "capa-3",
    numero: 3,
    nombre: "Bases de Datos (El Arte de Persistir)",
    subtitulo: "Modelado SQL vs NoSQL, Pipelines y 4 Capas de Caché",
    descripcion: "Diferencias estructurales entre MongoDB y PostgreSQL/Turso, pipelines de agregación y estrategias de caché multinivel (Redis, CDN, Next Data Cache).",
    color: "#10b981", // Emerald
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    borderGlow: "border-emerald-500/30 hover:border-emerald-500/60 shadow-emerald-500/10",
    icon: "Database",
  },
  {
    id: "capa-4",
    numero: 4,
    nombre: "Infraestructura y Despliegue",
    subtitulo: "PaaS, DBaaS, Serverless, Edge y Observabilidad",
    descripcion: "Cómo vive tu app en producción: Vercel, MongoDB Atlas, Edge Runtime, variables seguras y monitoreo con Sentry/Core Web Vitals.",
    color: "#f59e0b", // Amber
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    borderGlow: "border-amber-500/30 hover:border-amber-500/60 shadow-amber-500/10",
    icon: "Cloud",
  },
  {
    id: "capa-5",
    numero: 5,
    nombre: "DevX (Experiencia del Desarrollador)",
    subtitulo: "TypeScript, Turbopack, HMR, Linters y Monorepos",
    descripcion: "El entorno de herramientas que multiplica tu velocidad: TypeScript estricto, Turbopack ultrarrápido, Conventional Commits y Turborepo.",
    color: "#ec4899", // Pink
    gradient: "from-pink-500/20 via-rose-500/10 to-transparent",
    borderGlow: "border-pink-500/30 hover:border-pink-500/60 shadow-pink-500/10",
    icon: "Wrench",
  },
  {
    id: "capa-6",
    numero: 6,
    nombre: "Comunicación en Tiempo Real",
    subtitulo: "WebSockets, SSE, Long Polling y Supabase/Firebase",
    descripcion: "Técnicas modernas para empujar datos del servidor al navegador sin polling innecesario: WebSockets bidireccionales y Server-Sent Events.",
    color: "#06b6d4", // Cyan
    gradient: "from-cyan-500/20 via-sky-500/10 to-transparent",
    borderGlow: "border-cyan-500/30 hover:border-cyan-500/60 shadow-cyan-500/10",
    icon: "Radio",
  },
  {
    id: "capa-7",
    numero: 7,
    nombre: "Pruebas y Calidad (Testing)",
    subtitulo: "Pirámide: Unitarias, Integración y E2E con Playwright",
    descripcion: "La trinchera de la calidad del software profesional: pruebas aisladas con Vitest/Jest, componentes con RTL y flujos completos con Playwright.",
    color: "#14b8a6", // Teal
    gradient: "from-teal-500/20 via-emerald-500/10 to-transparent",
    borderGlow: "border-teal-500/30 hover:border-teal-500/60 shadow-teal-500/10",
    icon: "ShieldCheck",
  },
];

export const ROADMAP_FASES: RoadmapFase[] = [
  {
    fase: 1,
    titulo: "Fundamentos Full-Stack (Frontend + Backend + DB)",
    estado_previo: "Base inicial",
    descripcion: "Domina el ciclo completo: componentes React 19 / Server Components, Route Handlers de Next.js y persistencia en MongoDB con Mongoose.",
    conceptos_ids: ["csr", "ssr", "ssg", "server-actions", "api-routes", "mongodb", "orm"],
    nivel: "Fundacional",
  },
  {
    fase: 2,
    titulo: "Seguridad Robusta & Autenticación",
    estado_previo: "Siguiente paso prioritario",
    descripcion: "Profundiza en cookies HttpOnly seguras, JWT rotativos, CORS estricto, protección CSRF nativa y Rate Limiting con Upstash Redis.",
    conceptos_ids: ["cookies", "cors", "jwt", "rate-limiting", "csrf", "xss", "sql-injection"],
    nivel: "Seguridad",
  },
  {
    fase: 3,
    titulo: "Modelado de Datos Avanzado & Rendimiento",
    estado_previo: "Especialización de datos",
    descripcion: "Crea relaciones complejas, pipelines de agregación ($match, $lookup, $group) en MongoDB vs esquemas SQL, e índices optimizados.",
    conceptos_ids: ["sql-vs-nosql", "mongodb", "postgresql", "caching"],
    nivel: "Persistencia",
  },
  {
    fase: 4,
    titulo: "Arquitectura en el Edge & Bases Distribuidas",
    estado_previo: "Baja latencia global",
    descripcion: "Despliega lógica en el Edge Runtime de Next.js (Middleware) y experimenta con bases de datos serverless distribuidas como Turso (libSQL/Drizzle).",
    conceptos_ids: ["edge", "middleware", "serverless", "dbaas"],
    nivel: "Escalabilidad",
  },
  {
    fase: 5,
    titulo: "DevOps Ligero, CI/CD & Observabilidad",
    estado_previo: "Producción profesional",
    descripcion: "Automatiza despliegues con GitHub Actions hacia Vercel/Atlas, monitorea errores con Sentry y audita Core Web Vitals en tiempo real.",
    conceptos_ids: ["paas", "env-vars", "logging", "turbopack", "conventional-commits", "monorepo"],
    nivel: "DevOps & Calidad",
  },
  {
    fase: 6,
    titulo: "Comunicación en Tiempo Real & Testing E2E",
    estado_previo: "Maestría Web",
    descripcion: "Integra WebSockets / SSE para feeds en vivo y asegura la suite con tests unitarios en Vitest y flujos End-to-End con Playwright.",
    conceptos_ids: ["websockets", "sse", "firebase-realtime", "unit-testing", "integration-testing", "e2e-testing"],
    nivel: "Avanzado",
  },
];

const conceptos = conceptosData as Concepto[];

export async function getAllConceptos(): Promise<Concepto[]> {
  return conceptos;
}

export async function getConceptoBySlug(slug: string): Promise<Concepto | undefined> {
  return conceptos.find(c => c.id === slug);
}

export function getCapas(): CapaInfo[] {
  return CAPAS;
}

export function getCapaById(id: string): CapaInfo | undefined {
  return CAPAS.find(c => c.id === id);
}

export function getConceptosByCapa(capaId: string): Concepto[] {
  return conceptos.filter(c => c.capa === capaId);
}