"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
import { CartaSessao } from "@/types/tarot";

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
  const [perguntaAtivaIndex, setPerguntaAtivaIndex] = useState(0);
  const [imgError, setImgError] = useState(false);

  // When active card changes, reset to question 0
  useEffect(() => {
    setPerguntaAtivaIndex(0);
    setImgError(false);
  }, [carta.id]);

  const totalPerguntas = carta.perguntas.length;
  const respondidas = carta.perguntas.filter(
    (p) => p.resposta && p.resposta.trim().length > 0
  ).length;

  const perguntaAtual = carta.perguntas[perguntaAtivaIndex] || {
    pergunta: "",
    resposta: "",
  };

  const isUltimaPergunta = perguntaAtivaIndex === totalPerguntas - 1;
  const isPrimeiraPergunta = perguntaAtivaIndex === 0;
  const isUltimaCarta = cartaIndex === totalCartas - 1;
  const isPrimeiraCarta = cartaIndex === 0;

  const handlePerguntaAnterior = () => {
    if (perguntaAtivaIndex > 0) {
      setPerguntaAtivaIndex(perguntaAtivaIndex - 1);
    }
  };

  const handleProximaPergunta = () => {
    if (perguntaAtivaIndex < totalPerguntas - 1) {
      setPerguntaAtivaIndex(perguntaAtivaIndex + 1);
    }
  };

  return (
    <section
      aria-label={`Reflexão para ${carta.titulo}`}
      className="mt-6 sm:mt-8 w-full max-w-4xl mx-auto px-4 sm:px-6"
    >
      {/* ============================================================== */}
      {/* SIDE-BY-SIDE COCKPIT: CARD IMAGE + 1 QUESTION AT A TIME        */}
      {/* ============================================================== */}
      <div className="flex flex-col md:flex-row items-center md:items-stretch gap-6 rounded-2xl border border-line bg-paper-raised p-5 sm:p-7 shadow-clean">
        {/* ============================================================== */}
        {/* LEFT: CARD ARTWORK SIDEBAR                                     */}
        {/* ============================================================== */}
        <div className="flex flex-col items-center justify-between shrink-0 w-44 sm:w-52 md:w-56">
          <div className="relative w-full aspect-[2/3] overflow-hidden rounded-xl border border-line bg-paper shadow-clean">
            {carta.imagemFrente && !imgError ? (
              <img
                src={carta.imagemFrente}
                alt={carta.titulo}
                className="h-full w-full object-cover select-none"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="flex h-full flex-col justify-between p-4 text-center">
                <span className="font-mono text-xs font-bold text-accent">
                  {carta.numeroRomano}
                </span>
                <h4 className="text-base font-bold text-ink">{carta.titulo}</h4>
                <span className="text-[10px] text-ink-muted">
                  Carta {cartaIndex + 1} de {totalCartas}
                </span>
              </div>
            )}
          </div>

          {/* Caption */}
          <div className="mt-3 text-center w-full">
            <div className="flex items-center justify-center gap-1.5 font-mono text-xs font-semibold text-accent">
              <span>{carta.numeroRomano}</span>
              <span>•</span>
              <span className="truncate">{carta.titulo}</span>
            </div>
            {carta.subtitulo && (
              <p className="mt-0.5 text-[11px] text-ink-muted line-clamp-2 leading-relaxed">
                {carta.subtitulo}
              </p>
            )}
          </div>
        </div>

        {/* ============================================================== */}
        {/* RIGHT: SINGLE QUESTION STEPPER & REFLECTION FORM               */}
        {/* ============================================================== */}
        <div className="flex-1 w-full flex flex-col justify-between border-t md:border-t-0 md:border-l border-line pt-5 md:pt-0 md:pl-7">
          <div>
            {/* Top Stepper Bar */}
            <div className="flex items-center justify-between gap-3 border-b border-line pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent">
                  Pergunta {perguntaAtivaIndex + 1} de {totalPerguntas}
                </span>
                <span className="text-xs text-ink-muted">
                  • {respondidas}/{totalPerguntas} respondidas
                </span>
              </div>

              {/* Stepper Dots/Pills */}
              <div className="flex items-center gap-1.5">
                {carta.perguntas.map((p, idx) => {
                  const preenchida = p.resposta && p.resposta.trim().length > 0;
                  const isCurrent = idx === perguntaAtivaIndex;
                  return (
                    <button
                      key={idx}
                      onClick={() => setPerguntaAtivaIndex(idx)}
                      className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-mono font-semibold transition-all focus-visible:outline-2 focus-visible:outline-accent ${
                        isCurrent
                          ? "bg-accent text-white shadow-clean ring-2 ring-accent/30"
                          : preenchida
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
                          : "bg-paper text-ink-muted border border-line hover:border-accent/40 hover:text-ink"
                      }`}
                      title={`Ir para pergunta ${idx + 1}`}
                      aria-label={`Pergunta ${idx + 1}${preenchida ? " (respondida)" : ""}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Current Question Text */}
            <div className="mt-4">
              <span className="text-[11px] font-mono uppercase tracking-wider text-accent font-semibold">
                Provocação
              </span>
              <h3 className="mt-1 text-base sm:text-lg font-bold text-ink leading-snug">
                {perguntaAtual.pergunta}
              </h3>
            </div>

            {/* Textarea Input */}
            <div className="mt-4">
              <label htmlFor="resposta-atual" className="sr-only">
                Sua resposta para a pergunta {perguntaAtivaIndex + 1}
              </label>
              <textarea
                id="resposta-atual"
                rows={4}
                value={perguntaAtual.resposta || ""}
                onChange={(e) =>
                  onAtualizarResposta(perguntaAtivaIndex, e.target.value)
                }
                placeholder="Escreva sua reflexão especulativa sobre esta provocação..."
                className="w-full rounded-xl border border-line bg-paper p-3.5 text-xs sm:text-sm text-ink placeholder:text-ink-muted/60 focus:border-accent focus:bg-paper-raised focus:ring-1 focus:ring-accent focus:outline-none transition-all resize-y"
              />
              <div className="mt-1.5 flex items-center justify-between text-[11px] text-ink-muted">
                <span>Salvamento automático</span>
                <span>
                  {perguntaAtual.resposta?.trim().length || 0} caracteres
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Question Navigation Controls */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
            <div>
              {perguntaAtivaIndex > 0 ? (
                <button
                  onClick={handlePerguntaAnterior}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-paper px-3.5 py-2 text-xs font-medium text-ink shadow-clean transition-colors hover:bg-accent-soft hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Pergunta Anterior</span>
                </button>
              ) : !isPrimeiraCarta && onCartaAnterior ? (
                <button
                  onClick={onCartaAnterior}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-paper px-3.5 py-2 text-xs font-medium text-ink shadow-clean transition-colors hover:bg-accent-soft hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Carta Anterior</span>
                </button>
              ) : (
                <div />
              )}
            </div>

            <div className="flex items-center gap-2">
              {!isUltimaPergunta ? (
                <button
                  onClick={handleProximaPergunta}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-white shadow-clean transition-colors hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <span>Próxima Pergunta</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              ) : !isUltimaCarta && onProximaCarta ? (
                <button
                  onClick={onProximaCarta}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-white shadow-clean transition-colors hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <span>Avançar para Carta {cartaIndex + 2}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              ) : isUltimaCarta && onVerResumo ? (
                <button
                  onClick={onVerResumo}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-700 px-5 py-2 text-xs font-semibold text-white shadow-clean transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Concluir e Ver Síntese</span>
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
