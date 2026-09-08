"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Layers, Compass, Sparkles, BookOpen, Menu, X, Terminal, Radio } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/conceptos", label: "Catálogo", icon: BookOpen },
    { href: "/arquitectura", label: "Arquitectura 3D", icon: Layers },
    { href: "/roadmap", label: "Roadmap", icon: Compass },
    { href: "/simulador", label: "Simulador HTTP", icon: Radio },
    { href: "/prompt-studio", label: "AI Prompts", icon: Sparkles },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl transition-colors">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-indigo-500/20 transition-transform group-hover:scale-105 text-white">
            <Terminal className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              Next Web Encyclopedia
              <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold text-indigo-600 dark:text-indigo-400">
                Next.js 16
              </span>
            </span>
            <span className="text-[11px] text-slate-500 dark:text-zinc-400 hidden sm:inline">
              Mapa mental tridimensional de 8 capas
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? "bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30 shadow-sm"
                    : "text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-zinc-400"}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <Link
            href="/conceptos"
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
          >
            <span>Buscar</span>
            <kbd className="rounded bg-slate-200 dark:bg-black/40 px-1.5 py-0.5 text-[10px] text-slate-600 dark:text-zinc-400">⌘K</kbd>
          </Link>
          <ThemeToggle />

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
            aria-label="Abrir menú móvil"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-white/10 bg-white/95 dark:bg-slate-950/95 px-4 py-4 space-y-2 transition-colors">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30"
                    : "text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                }`}
              >
                <Icon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
