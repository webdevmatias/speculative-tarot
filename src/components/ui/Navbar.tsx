"use client";

import React from "react";
import { Compass, RotateCcw, Home } from "lucide-react";
import { SessaoTarot } from "@/types/tarot";

interface NavbarProps {
  etapa?: "inicio" | "tema" | "tirada" | "mesa" | "perguntas" | "resumo";
  onNovaTirada?: () => void;
  onIrInicio?: () => void;
  temSessaoAtiva?: boolean;
}

export function Navbar({
  etapa,
  onNovaTirada,
  onIrInicio,
  temSessaoAtiva,
}: NavbarProps) {
  return (
    <header className="no-print shrink-0 sticky top-0 z-50 w-full border-b border-[#3D2E7C] bg-[#2D225A] text-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 relative">
        {/* Left spacer / Home button */}
        <div className="flex items-center gap-2 min-w-[70px] sm:min-w-[140px]">
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

        {/* Center Minimalist Brand */}
        <div className="flex items-center justify-center text-center">
          <button
            onClick={onIrInicio}
            className="group flex items-center justify-center gap-2.5 text-center transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-white"
          >
            <Compass className="h-6 w-6 text-purple-200 transition-transform duration-500 group-hover:rotate-45 shrink-0" />
            <span className="font-display text-sm sm:text-base font-bold tracking-widest text-white">
              TARÔ ESPECULATIVO
            </span>
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center justify-end gap-2 min-w-[70px] sm:min-w-[140px] relative">

          {/* New Spread Button */}
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
        </div>
      </div>
    </header>
  );
}
