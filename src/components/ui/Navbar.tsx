"use client";

import React from "react";
import { Compass, RotateCcw, Home } from "lucide-react";

interface NavbarProps {
  etapa?: "inicio" | "tema" | "tirada" | "mesa" | "resumo";
  onNovaTirada?: () => void;
  onIrInicio?: () => void;
  temSessaoAtiva?: boolean;
}

export function Navbar({ etapa, onNovaTirada, onIrInicio, temSessaoAtiva }: NavbarProps) {
  return (
    <header className="no-print shrink-0 sticky top-0 z-50 w-full border-b border-[#3D2E7C] bg-[#2D225A] text-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6">
        {/* Minimalist Brand */}
        <button
          onClick={onIrInicio}
          className="group flex items-center gap-2 text-left transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-white"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-purple-200 border border-white/15 transition-transform duration-500 group-hover:rotate-45">
            <Compass className="h-4 w-4" />
          </div>
          <span className="font-display text-sm sm:text-base font-bold tracking-widest text-white">
            TARÔ ESPECULATIVO
          </span>
        </button>

        {/* Minimal Step Indicator (Desktop) */}
        {etapa && etapa !== "inicio" && (
          <nav aria-label="Progresso da sessão" className="hidden items-center gap-1.5 text-[11px] font-medium text-purple-200/80 md:flex">
            <span className={etapa === "tema" ? "text-white font-bold underline underline-offset-4 decoration-purple-300" : ""}>
              1. Tema
            </span>
            <span className="text-purple-300/40">•</span>
            <span className={etapa === "tirada" ? "text-white font-bold underline underline-offset-4 decoration-purple-300" : ""}>
              2. Tirada
            </span>
            <span className="text-purple-300/40">•</span>
            <span className={etapa === "mesa" ? "text-white font-bold underline underline-offset-4 decoration-purple-300" : ""}>
              3. Mesa
            </span>
            <span className="text-purple-300/40">•</span>
            <span className={etapa === "resumo" ? "text-white font-bold underline underline-offset-4 decoration-purple-300" : ""}>
              4. Síntese
            </span>
          </nav>
        )}

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          {temSessaoAtiva && etapa && etapa !== "inicio" && (
            <button
              onClick={onNovaTirada}
              className="flex items-center gap-1 rounded-md border border-white/15 bg-white/10 px-2.5 py-1 text-xs font-medium text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white"
              title="Reiniciar com uma nova tirada"
            >
              <RotateCcw className="h-3 w-3 text-purple-200" />
              <span className="hidden sm:inline">Nova Tirada</span>
            </button>
          )}

          {etapa && etapa !== "inicio" && (
            <button
              onClick={onIrInicio}
              className="flex items-center justify-center rounded-md border border-white/15 bg-white/10 p-1.5 text-xs text-purple-200 transition-colors hover:bg-white/20 hover:text-white focus-visible:outline-2 focus-visible:outline-white"
              title="Voltar à tela inicial"
            >
              <Home className="h-3.5 w-3.5" />
              <span className="sr-only">Início</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
