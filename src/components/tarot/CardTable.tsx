"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { CartaSessao, TipoTirada } from "@/types/tarot";
import { TarotCard } from "./TarotCard";

interface CardTableProps {
  tema: string;
  tipoTirada: TipoTirada;
  cartas: CartaSessao[];
  cartaAtivaIndex: number;
  onSelecionarCarta: (index: number) => void;
  onVirarCarta: (index: number) => void;
}

export function CardTable({
  tema,
  tipoTirada,
  cartas,
  cartaAtivaIndex,
  onSelecionarCarta,
  onVirarCarta,
}: CardTableProps) {
  const cartaAtiva = cartas[cartaAtivaIndex];
  const todasViradas = cartas.every((c) => c.virada);
  const totalPerguntasGeral = cartas.reduce((acc, c) => acc + c.perguntas.length, 0);
  const totalRespondidasGeral = cartas.reduce(
    (acc, c) => acc + c.perguntas.filter((p) => p.resposta && p.resposta.trim().length > 0).length,
    0
  );

  return (
    <div className="w-full">
      {/* ============================================================== */}
      {/* TABLE TOP BAR: THEME INFO & INSTRUCTIONS                       */}
      {/* ============================================================== */}
      <div className="mx-auto max-w-5xl px-4 pt-3 pb-2 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-line bg-paper-raised p-3.5 sm:p-4 shadow-clean">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-accent-soft border border-accent/20 px-2 py-0.5 text-[11px] font-semibold text-accent">
                Tema de Investigação
              </span>
              <span className="text-[11px] text-ink-muted">
                {tipoTirada} {tipoTirada === 1 ? "Carta" : "Cartas"}
              </span>
            </div>
            <h2 className="mt-1 text-sm sm:text-base font-bold text-ink line-clamp-1">
              &ldquo;{tema}&rdquo;
            </h2>
          </div>

          {/* Quick status pill */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right">
              <p className="text-xs font-semibold text-ink">
                {totalRespondidasGeral} de {totalPerguntasGeral} reflexões
              </p>
              <p className="text-[10px] text-ink-muted">
                {todasViradas ? "Todas as cartas reveladas" : "Cartas na mesa"}
              </p>
            </div>
            <div className="flex h-7 items-center justify-center rounded-lg border border-line bg-paper px-2 text-xs font-mono font-medium text-accent">
              {cartas.filter((c) => c.virada).length}/{cartas.length}
            </div>
          </div>
        </div>

        {/* Guidance tip */}
        <div className="mt-2 flex items-center justify-center gap-1.5 text-center text-xs text-ink-muted">
          <Sparkles className="h-3.5 w-3.5 text-accent shrink-0" />
          <span>
            {!cartaAtiva.virada
              ? "Clique sobre a carta virada para revelá-la."
              : "Reflita sobre as perguntas ao lado. Navegue entre cartas e perguntas a qualquer momento."}
          </span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* THE PHYSICAL TAROT TABLE (Clean Light Editorial Surface)       */}
      {/* ============================================================== */}
      <div className="relative mx-auto mt-1 max-w-5xl px-4 sm:px-6">
        <div className="relative rounded-xl border border-line bg-paper-raised p-4 sm:p-6 shadow-clean">
          {/* Spread Layout: 1 Card, 3 Cards, or 6 Cards */}
          {tipoTirada === 1 && (
            <div className="flex justify-center py-4">
              <TarotCard
                carta={cartas[0]}
                slotIndex={0}
                totalCartas={1}
                isAtiva={true}
                virada={cartas[0].virada}
                onVirar={() => onVirarCarta(0)}
                onSelecionar={() => onSelecionarCarta(0)}
              />
            </div>
          )}

          {tipoTirada === 3 && (
            <div>
              {/* Desktop: 3 cards side-by-side */}
              <div className="hidden sm:grid sm:grid-cols-3 gap-6 justify-items-center py-4">
                {cartas.map((carta, idx) => (
                  <div key={carta.id} className="flex flex-col items-center">
                    <TarotCard
                      carta={carta}
                      slotIndex={idx}
                      totalCartas={3}
                      isAtiva={cartaAtivaIndex === idx}
                      virada={carta.virada}
                      onVirar={() => onVirarCarta(idx)}
                      onSelecionar={() => onSelecionarCarta(idx)}
                    />
                    <div className="mt-3 text-center">
                      <button
                        onClick={() => onSelecionarCarta(idx)}
                        className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-accent ${
                          cartaAtivaIndex === idx
                            ? "bg-accent-soft text-accent border border-accent/30"
                            : "text-ink-muted hover:text-ink hover:bg-accent-soft/40"
                        }`}
                      >
                        {carta.virada ? carta.titulo : `Carta ${idx + 1}`}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile: Active card centered with selector dots */}
              <div className="sm:hidden flex flex-col items-center py-2">
                <TarotCard
                  carta={cartaAtiva}
                  slotIndex={cartaAtivaIndex}
                  totalCartas={3}
                  isAtiva={true}
                  virada={cartaAtiva.virada}
                  onVirar={() => onVirarCarta(cartaAtivaIndex)}
                  onSelecionar={() => onSelecionarCarta(cartaAtivaIndex)}
                />

                {/* Mobile Navigation dots */}
                <div className="mt-5 flex items-center gap-2">
                  {cartas.map((c, idx) => (
                    <button
                      key={c.id}
                      onClick={() => onSelecionarCarta(idx)}
                      className={`h-2.5 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-accent ${
                        cartaAtivaIndex === idx
                          ? "w-8 bg-accent"
                          : "w-2.5 bg-line hover:bg-ink-muted/40"
                      }`}
                      aria-label={`Ver Carta ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {tipoTirada === 6 && (
            <div>
              {/* Desktop: 2 rows of 3 */}
              <div className="hidden md:grid md:grid-cols-3 gap-6 justify-items-center py-4">
                {cartas.map((carta, idx) => (
                  <div key={carta.id} className="flex flex-col items-center">
                    <TarotCard
                      carta={carta}
                      slotIndex={idx}
                      totalCartas={6}
                      isAtiva={cartaAtivaIndex === idx}
                      virada={carta.virada}
                      onVirar={() => onVirarCarta(idx)}
                      onSelecionar={() => onSelecionarCarta(idx)}
                    />
                    <div className="mt-3 text-center">
                      <button
                        onClick={() => onSelecionarCarta(idx)}
                        className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-accent ${
                          cartaAtivaIndex === idx
                            ? "bg-accent-soft text-accent border border-accent/30"
                            : "text-ink-muted hover:text-ink hover:bg-accent-soft/40"
                        }`}
                      >
                        {carta.virada ? carta.titulo : `Carta ${idx + 1}`}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile / Tablet: Active card centered with quick picker */}
              <div className="md:hidden flex flex-col items-center py-2">
                <TarotCard
                  carta={cartaAtiva}
                  slotIndex={cartaAtivaIndex}
                  totalCartas={6}
                  isAtiva={true}
                  virada={cartaAtiva.virada}
                  onVirar={() => onVirarCarta(cartaAtivaIndex)}
                  onSelecionar={() => onSelecionarCarta(cartaAtivaIndex)}
                />

                {/* Mobile Navigation dots */}
                <div className="mt-5 flex items-center gap-2">
                  {cartas.map((c, idx) => (
                    <button
                      key={c.id}
                      onClick={() => onSelecionarCarta(idx)}
                      className={`h-2.5 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-accent ${
                        cartaAtivaIndex === idx
                          ? "w-8 bg-accent"
                          : "w-2.5 bg-line hover:bg-ink-muted/40"
                      }`}
                      aria-label={`Ver Carta ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
