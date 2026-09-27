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
    <header className="no-print sticky top-0 z-50 w-full border-b border-line bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand */}
        <button
          onClick={onIrInicio}
          className="group flex items-center gap-2 text-left transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-accent"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-accent-soft text-accent shadow-clean group-hover:border-accent/30">
            <Compass className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45" />
          </div>
          <div>
            <span className="font-display text-base font-bold tracking-wider text-ink sm:text-lg">
              TAROT ESPECULATIVO
            </span>
            <span className="hidden text-xs text-ink-muted sm:block">
              Design Especulativo & Pensamento de Futuros
            </span>
          </div>
        </button>

        {/* Step Indicator (Desktop) */}
        {etapa && etapa !== "inicio" && (
          <nav aria-label="Progresso da sessão" className="hidden items-center gap-2 text-xs md:flex">
            <span
              className={`rounded-lg px-2.5 py-1 font-medium transition-colors ${
                etapa === "tema"
                  ? "bg-accent-soft text-accent border border-accent/20"
                  : "text-ink-muted"
              }`}
            >
              1. Tema
            </span>
            <span className="text-line">/</span>
            <span
              className={`rounded-lg px-2.5 py-1 font-medium transition-colors ${
                etapa === "tirada"
                  ? "bg-accent-soft text-accent border border-accent/20"
                  : "text-ink-muted"
              }`}
            >
              2. Tirada
            </span>
            <span className="text-line">/</span>
            <span
              className={`rounded-lg px-2.5 py-1 font-medium transition-colors ${
                etapa === "mesa"
                  ? "bg-accent-soft text-accent border border-accent/20"
                  : "text-ink-muted"
              }`}
            >
              3. Mesa de Reflexão
            </span>
            <span className="text-line">/</span>
            <span
              className={`rounded-lg px-2.5 py-1 font-medium transition-colors ${
                etapa === "resumo"
                  ? "bg-accent-soft text-accent border border-accent/20"
                  : "text-ink-muted"
              }`}
            >
              4. Síntese
            </span>
          </nav>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2">
          {temSessaoAtiva && etapa && etapa !== "inicio" && (
            <button
              onClick={onNovaTirada}
              className="flex items-center gap-1.5 rounded-lg border border-line bg-paper-raised px-3 py-1.5 text-xs font-medium text-ink shadow-clean transition-colors hover:bg-accent-soft hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
              title="Reiniciar com uma nova tirada"
            >
              <RotateCcw className="h-3.5 w-3.5 text-accent" />
              <span className="hidden sm:inline">Nova Tirada</span>
            </button>
          )}

          {etapa && etapa !== "inicio" && (
            <button
              onClick={onIrInicio}
              className="flex items-center gap-1.5 rounded-lg border border-line bg-paper-raised px-2.5 py-1.5 text-xs text-ink-muted shadow-clean transition-colors hover:text-ink hover:bg-accent-soft focus-visible:outline-2 focus-visible:outline-accent"
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
