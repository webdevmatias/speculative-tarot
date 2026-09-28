"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
import { CartaSessao } from "@/types/tarot";
import { TODAS_AS_CARTAS } from "@/lib/data";

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
  const [imgError, setImgError] = useState(false);
  const [reflexaoCompleta, setReflexaoCompleta] = useState("");

  const subtituloEfetivo =
    carta.subtitulo || TODAS_AS_CARTAS.find((d) => d.titulo === carta.titulo)?.subtitulo || "";

  const totalPerguntas = carta.perguntas.length;
  const temReflexao = carta.perguntas[0]?.resposta && carta.perguntas[0].resposta.trim().length > 0;

  const isUltimaCarta = cartaIndex === totalCartas - 1;
  const isPrimeiraCarta = cartaIndex === 0;

  useEffect(() => {
    setImgError(false);
    const respostaExistente = carta.perguntas[0]?.resposta || "";
    setReflexaoCompleta(respostaExistente);
  }, [carta.id, carta.perguntas[0]?.resposta]);

  const handleMudancaReflexao = (valor: string) => {
    setReflexaoCompleta(valor);
    onAtualizarResposta(0, valor);
  };

  return (
    <section
      aria-label={`Reflexão para ${carta.titulo}`}
      className="mt-2 sm:mt-3 w-full max-w-4xl mx-auto px-3 sm:px-6"
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-4 rounded-xl border border-line bg-paper-raised p-3 sm:p-4 shadow-clean">
        <div className="flex flex-col items-center justify-between shrink-0 w-28 sm:w-36 md:w-40">
          <div className="relative w-full aspect-[2/3] overflow-hidden rounded-lg border border-line bg-paper shadow-clean">
            {carta.imagemFrente && !imgError ? (
              <img
                src={carta.imagemFrente}
                alt={carta.titulo}
                className="h-full w-full object-cover select-none"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="flex h-full flex-col justify-between p-2 text-center">
                <span className="font-mono text-[10px] font-bold text-accent">
                  {carta.numeroRomano}
                </span>
                <h4 className="text-xs font-bold text-ink">{carta.titulo}</h4>
                <span className="text-[9px] text-ink-muted">
                  {cartaIndex + 1}/{totalCartas}
                </span>
              </div>
            )}
          </div>

          <div className="mt-2 text-center w-full px-1">
            <div className="flex items-center justify-center gap-1 font-mono text-xs font-semibold text-accent">
              <span>{carta.numeroRomano}</span>
              <span>•</span>
              <span className="truncate">{carta.titulo}</span>
            </div>
            {subtituloEfetivo && (
              <p className="mt-1 text-[11px] text-ink-muted font-medium leading-snug line-clamp-2">
                {subtituloEfetivo}
              </p>
            )}
          </div>
        </div>

        <div className="flex-1 w-full flex flex-col justify-between border-t sm:border-t-0 sm:border-l border-line pt-3 sm:pt-0 sm:pl-4">
          <div>
            <div className="flex items-center justify-between gap-2 border-b border-line pb-2">
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-accent">
                  {totalPerguntas} Provocação{totalPerguntas > 1 ? "s" : ""}
                </span>
                <span className="text-[10px] text-ink-muted">
                  • {temReflexao ? "Reflexão registrada" : "Sem reflexão"}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                {carta.perguntas.map((p, idx) => (
                  <button
                    key={idx}
                    disabled
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-mono font-semibold text-ink-muted border border-line bg-paper transition-all focus-visible:outline-2 focus-visible:outline-accent"
                    title={`Provocação ${idx + 1}`}
                    aria-label={`Provocação ${idx + 1}`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-2.5 space-y-3">
              {carta.perguntas.map((p, idx) => (
                <div key={idx} className="p-3 rounded-lg border border-line/50 bg-paper/50">
                  <div className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-accent/10 text-accent font-mono text-[10px] font-bold">
                      {idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm font-medium text-ink leading-snug mt-0.5">
                      {p.pergunta}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <label htmlFor="reflexao-completa" className="block text-[10px] font-mono uppercase tracking-wider text-accent font-semibold mb-1.5">
                Sua Reflexão
              </label>
              <textarea
                id="reflexao-completa"
                rows={6}
                value={reflexaoCompleta}
                onChange={(e) => handleMudancaReflexao(e.target.value)}
                placeholder="Escreva sua reflexão livre sobre todas as provocações acima... Não há respostas certas ou erradas, apenas sua jornada especulativa."
                className="w-full rounded-lg border border-line bg-paper p-3 text-sm text-ink placeholder:text-ink-muted/60 focus:border-accent focus:bg-paper-raised focus:ring-1 focus:ring-accent focus:outline-none transition-all resize-y min-h-[120px]"
              />
              <div className="mt-1.5 flex items-center justify-between text-[10px] text-ink-muted">
                <span>Salvamento automático</span>
                <span>
                  {reflexaoCompleta.trim().length} caracteres
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-3">
            <div>
              {!isPrimeiraCarta && onCartaAnterior ? (
                <button
                  onClick={onCartaAnterior}
                  className="inline-flex items-center gap-1 rounded-md border border-line bg-paper px-2.5 py-1 text-xs font-medium text-ink shadow-clean transition-colors hover:bg-accent-soft hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <ArrowLeft className="h-3 w-3" />
                  <span>Carta Anterior</span>
                </button>
              ) : (
                <div />
              )}
            </div>

            <div className="flex items-center gap-2">
              {!isUltimaCarta && onProximaCarta ? (
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