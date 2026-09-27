"use client";

import React from "react";
import { ArrowRight, ArrowLeft, CheckCircle2, BookOpen } from "lucide-react";
import { CartaSessao } from "@/types/tarot";
import { QuestionCheckpoint } from "./QuestionCheckpoint";

interface QuestionTrailProps {
  carta: CartaSessao;
  cartaIndex: number;
  totalCartas: number;
  onAtualizarResposta: (perguntaIndex: number, novaResposta: string) => void;
  onProximaCarta?: () => void;
  onCartaAnterior?: () => void;
  onVerResumo?: () => void;
}

export function QuestionTrail({
  carta,
  cartaIndex,
  totalCartas,
  onAtualizarResposta,
  onProximaCarta,
  onCartaAnterior,
  onVerResumo,
}: QuestionTrailProps) {
  const totalPerguntas = carta.perguntas.length;
  const respondidas = carta.perguntas.filter(
    (p) => p.resposta && p.resposta.trim().length > 0
  ).length;
  const isUltimaCarta = cartaIndex === totalCartas - 1;
  const isPrimeiraCarta = cartaIndex === 0;

  return (
    <section
      aria-label={`Trilha de perguntas para ${carta.titulo}`}
      className="mt-8 sm:mt-12 w-full max-w-3xl mx-auto px-4 sm:px-6"
    >
      {/* ============================================================== */}
      {/* SECTION HEADER                                                 */}
      {/* ============================================================== */}
      <div className="mb-8 rounded-2xl border border-line bg-paper-raised p-6 shadow-clean">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Trilha de Reflexão Especulativa</span>
            </div>
            <h3 className="mt-1 text-xl sm:text-2xl font-bold text-ink">
              Provocações de {carta.titulo}
            </h3>
            {carta.subtitulo && (
              <p className="mt-1 text-xs sm:text-sm text-ink-muted">
                Explore as tensões, riscos e novos hábitos provocados por este arquétipo.
              </p>
            )}
          </div>

          {/* Progress pill */}
          <div className="shrink-0 flex items-center gap-3 rounded-lg border border-line bg-paper px-3.5 py-2 text-xs">
            <div className="flex flex-col items-end">
              <span className="font-semibold text-ink">
                {respondidas} de {totalPerguntas} respondidas
              </span>
              <span className="text-[11px] text-ink-muted">
                {Math.round((respondidas / totalPerguntas) * 100)}% nesta carta
              </span>
            </div>
            <div className="h-2 w-12 overflow-hidden rounded-full bg-line">
              <div
                className="h-full bg-accent transition-all duration-300"
                style={{
                  width: `${(respondidas / totalPerguntas) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* VERTICAL TRAIL OF QUESTIONS (24px fixed spacing)               */}
      {/* ============================================================== */}
      <div className="space-y-6">
        {carta.perguntas.map((p, idx) => (
          <QuestionCheckpoint
            key={`${carta.id}-pergunta-${idx}`}
            numero={idx + 1}
            pergunta={p.pergunta}
            resposta={p.resposta}
            corPrimaria={carta.corPrimaria}
            corBorda={carta.corBorda}
            isUltima={idx === carta.perguntas.length - 1}
            onSalvarResposta={(novaResp) => onAtualizarResposta(idx, novaResp)}
          />
        ))}
      </div>

      {/* ============================================================== */}
      {/* BOTTOM TRAIL NAVIGATION                                        */}
      {/* ============================================================== */}
      <div className="mt-8 mb-16 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
        <div>
          {!isPrimeiraCarta && onCartaAnterior && (
            <button
              onClick={onCartaAnterior}
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-paper-raised px-4 py-2.5 text-xs sm:text-sm font-medium text-ink shadow-clean transition-colors hover:bg-accent-soft hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Carta Anterior</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          {!isUltimaCarta && onProximaCarta && (
            <button
              onClick={onProximaCarta}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-clean transition-colors hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-accent"
            >
              <span>Próxima Carta ({cartaIndex + 2} de {totalCartas})</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}

          {isUltimaCarta && onVerResumo && (
            <button
              onClick={onVerResumo}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-clean transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-accent"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Concluir e Ver Reflexão</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
