"use client";

import React from "react";
import { ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { CartaSessao } from "@/types/tarot";
import { TarotCard } from "./TarotCard";

interface ReadingNavigationProps {
  cartas: CartaSessao[];
  cartaAtivaIndex: number;
  onSelecionarCarta: (index: number) => void;
  onVerResumo: () => void;
}

export function ReadingNavigation({
  cartas,
  cartaAtivaIndex,
  onSelecionarCarta,
  onVerResumo,
}: ReadingNavigationProps) {
  const totalCartas = cartas.length;

  return (
    <div className="sticky bottom-0 z-40 w-full border-t border-line bg-paper-raised/95 py-3 backdrop-blur-md shadow-clean">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* Previous Button */}
        <button
          onClick={() => onSelecionarCarta(Math.max(0, cartaAtivaIndex - 1))}
          disabled={cartaAtivaIndex === 0}
          className="flex items-center gap-1 rounded-lg border border-line bg-paper px-3 py-2 text-xs font-medium text-ink shadow-clean transition-colors hover:bg-accent-soft hover:text-accent disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-accent"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Anterior</span>
        </button>

        {/* Center: Miniature Cards Timeline */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto py-1 px-2">
          {cartas.map((c, idx) => (
            <TarotCard
              key={`nav-mini-${c.id}`}
              carta={c}
              slotIndex={idx}
              totalCartas={totalCartas}
              isAtiva={cartaAtivaIndex === idx}
              virada={c.virada}
              onSelecionar={() => onSelecionarCarta(idx)}
              modo="miniatura"
            />
          ))}
        </div>

        {/* Next / Summary Button */}
        <div className="flex items-center gap-2">
          {cartaAtivaIndex < totalCartas - 1 ? (
            <button
              onClick={() => onSelecionarCarta(cartaAtivaIndex + 1)}
              className="flex items-center gap-1 rounded-lg border border-line bg-accent-soft px-3 py-2 text-xs font-medium text-accent shadow-clean transition-colors hover:bg-accent hover:text-white focus-visible:outline-2 focus-visible:outline-accent"
            >
              <span className="hidden sm:inline">Próxima</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={onVerResumo}
              className="flex items-center gap-1.5 rounded-lg bg-emerald-700 px-3.5 py-2 text-xs font-semibold text-white shadow-clean transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-accent"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Ver Síntese</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
