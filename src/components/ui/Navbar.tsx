"use client";

import React, { useState, useRef, useEffect } from "react";
import { Compass, RotateCcw, Home, Lightbulb, ArrowRight, X } from "lucide-react";
import { SessaoTarot } from "@/types/tarot";

interface NavbarProps {
  etapa?: "inicio" | "tema" | "tirada" | "mesa" | "perguntas" | "resumo";
  onNovaTirada?: () => void;
  onIrInicio?: () => void;
  temSessaoAtiva?: boolean;
  sessaoSalva?: SessaoTarot | null;
  onContinuarSessao?: () => void;
}

export function Navbar({
  etapa,
  onNovaTirada,
  onIrInicio,
  temSessaoAtiva,
  sessaoSalva,
  onContinuarSessao,
}: NavbarProps) {
  const [popoverAberto, setPopoverAberto] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close popover when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setPopoverAberto(false);
      }
    }
    if (popoverAberto) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popoverAberto]);

  const temSessaoValida = Boolean(
    sessaoSalva && sessaoSalva.tema && sessaoSalva.cartas && sessaoSalva.cartas.length > 0
  );

  const totalPerguntasSalvas =
    sessaoSalva?.cartas?.reduce((acc, c) => acc + c.perguntas.length, 0) || 0;
  const totalRespondidasSalvas =
    sessaoSalva?.cartas?.reduce(
      (acc, c) => acc + c.perguntas.filter((p) => p.resposta && p.resposta.trim().length > 0).length,
      0
    ) || 0;

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

        {/* Right Actions: Notification Lamp with Dot & Nova Tirada */}
        <div className="flex items-center justify-end gap-2 min-w-[70px] sm:min-w-[140px] relative">
          {/* Notification Lamp with Dot (Sessão em Andamento) */}
          {temSessaoValida && sessaoSalva && (
            <div className="relative" ref={popoverRef}>
              <button
                onClick={() => setPopoverAberto(!popoverAberto)}
                className={`relative flex items-center justify-center rounded-md border p-1.5 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-white ${
                  popoverAberto
                    ? "border-amber-400 bg-white/25 text-amber-200"
                    : "border-white/15 bg-white/10 text-amber-300 hover:bg-white/20 hover:text-amber-200"
                }`}
                title="Sessão em andamento"
                aria-label="Notificação de sessão em andamento"
              >
                <Lightbulb className="h-4 w-4 text-amber-300" />
                {/* Notification Pulse Dot (Subtle & Small) */}
                <span className="absolute -top-0.5 -right-0.5 flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400 ring-1 ring-[#2D225A]"></span>
                </span>
              </button>

              {/* Notification Popover Dropdown */}
              {popoverAberto && (
                <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 rounded-xl border border-line bg-paper-raised p-3.5 shadow-xl text-ink z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between border-b border-line pb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
                      </span>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-accent">
                        Sessão em Andamento
                      </span>
                    </div>
                    <button
                      onClick={() => setPopoverAberto(false)}
                      className="text-xs text-ink-muted hover:text-ink p-0.5 rounded transition-colors"
                      aria-label="Fechar notificação"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="mt-2.5 text-left">
                    <span className="text-[10px] font-semibold text-accent uppercase tracking-wider">
                      Tema
                    </span>
                    <p className="mt-0.5 text-xs sm:text-sm font-bold text-ink line-clamp-2">
                      &ldquo;{sessaoSalva.tema}&rdquo;
                    </p>
                    <div className="mt-2 flex items-center justify-between text-[11px] text-ink-muted">
                      <span>
                        Tirada de {sessaoSalva.tipoTirada}{" "}
                        {sessaoSalva.tipoTirada === 1 ? "carta" : "cartas"}
                      </span>
                      <span className="font-semibold text-emerald-700">
                        {totalRespondidasSalvas}/{totalPerguntasSalvas} respondidas
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-line flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        setPopoverAberto(false);
                        onContinuarSessao?.();
                      }}
                      className="flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-white shadow-clean hover:bg-accent/90 transition-colors focus-visible:outline-2 focus-visible:outline-accent"
                    >
                      <span>Retomar Tirada</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

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
