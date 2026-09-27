"use client";

import React from "react";
import { Sparkles, Clock, ArrowRight, ArrowLeft } from "lucide-react";
import { TipoTirada } from "@/types/tarot";

interface SpreadSelectorProps {
  tema: string;
  tipoSelecionado: TipoTirada;
  onSelecionarTipo: (tipo: TipoTirada) => void;
  onIniciarMesa: () => void;
  onVoltar: () => void;
}

export function SpreadSelector({
  tema,
  tipoSelecionado,
  onSelecionarTipo,
  onIniciarMesa,
  onVoltar,
}: SpreadSelectorProps) {
  const opcoes: Array<{
    tipo: TipoTirada;
    titulo: string;
    subtitulo: string;
    descricao: string;
    tempoEstimado: string;
    destaque?: string;
    beneficio: string;
  }> = [
    {
      tipo: 1,
      titulo: "1 Carta",
      subtitulo: "Reflexão Rápida",
      descricao:
        "Uma provocação cirúrgica para quebrar certezas e iluminar um ponto cego imediato do seu tema.",
      tempoEstimado: "~5 minutos",
      beneficio: "Ideal para aquecimento criativo, alinhamento rápido ou desbloqueio de ideias.",
    },
    {
      tipo: 3,
      titulo: "3 Cartas",
      subtitulo: "Exploração Intermediária",
      descricao:
        "Triangulação de forças: confronta tensões culturais, comportamentos de usuários e riscos imprevistos.",
      tempoEstimado: "~15 minutos",
      destaque: "Recomendado",
      beneficio: "Ideal para design de produtos, workshops de inovação e análise crítica de cenários.",
    },
    {
      tipo: 6,
      titulo: "6 Cartas",
      subtitulo: "Exploração Aprofundada",
      descricao:
        "Mapeamento holístico de futuros: abrange agentes antagônicos, escala massiva, impacto ecológico e obsolescência sistêmica.",
      tempoEstimado: "~30 minutos",
      beneficio: "Ideal para pesquisa prospectiva, estratégia de longo prazo e formulação de políticas éticas.",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-4 sm:py-6">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-accent">
          Etapa 2 de 3
        </span>
        <h2 className="mt-1 font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-ink">
          Escolha a Tirada de Cartas
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-ink-muted">
          Defina o nível de profundidade e o número de ângulos que deseja explorar:
        </p>

        {/* Selected Theme chip */}
        <div className="mt-2.5 inline-block rounded-xl border border-line bg-paper px-3 py-1 text-xs text-ink shadow-clean">
          <span className="font-semibold text-accent">Tema:</span> &ldquo;{tema}&rdquo;
        </div>
      </div>

      {/* Cards Options Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {opcoes.map((opcao) => {
          const isSelected = tipoSelecionado === opcao.tipo;

          return (
            <div
              key={opcao.tipo}
              onClick={() => onSelecionarTipo(opcao.tipo)}
              className={`group relative cursor-pointer flex flex-col justify-between rounded-xl border p-4 sm:p-5 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-accent ${
                isSelected
                  ? "border-accent bg-accent-soft shadow-clean ring-1 ring-accent"
                  : "border-line bg-paper-raised hover:border-accent/40 hover:bg-accent-soft/30 shadow-clean"
              }`}
            >
              {/* Highlight pill */}
              {opcao.destaque && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-md border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-700 shadow-clean">
                  {opcao.destaque}
                </div>
              )}

              <div>
                {/* Visual Card representation */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: opcao.tipo }).map((_, i) => (
                      <div
                        key={i}
                        className={`relative h-11 w-7.5 overflow-hidden rounded border transition-all shadow-sm ${
                          isSelected
                            ? "border-accent ring-1 ring-accent"
                            : "border-line group-hover:border-accent/30"
                        }`}
                        style={{
                          transform: `rotate(${(i - (opcao.tipo - 1) / 2) * 6}deg)`,
                        }}
                      >
                        <img
                          src="/assets/cartas/verso.png"
                          alt="Verso"
                          className="h-full w-full object-cover select-none"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-ink-muted">
                    <Clock className="h-3 w-3 text-ink-muted" />
                    <span>{opcao.tempoEstimado}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="mt-3.5 text-base sm:text-lg font-bold text-ink group-hover:text-accent">
                  {opcao.titulo}
                </h3>
                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-accent">
                  {opcao.subtitulo}
                </h4>

                <p className="mt-2 text-xs text-ink-muted leading-relaxed">
                  {opcao.descricao}
                </p>

                <p className="mt-2 text-[11px] text-ink-muted border-t border-line pt-2 italic">
                  {opcao.beneficio}
                </p>
              </div>

              {/* Bottom selection feedback */}
              <div className="mt-4 flex items-center justify-between border-t border-line/70 pt-2.5">
                <span className="text-[11px] font-medium text-ink-muted">
                  {isSelected ? "Selecionada" : "Clique para escolher"}
                </span>

                <div
                  className={`flex h-4 w-4 items-center justify-center rounded-full border transition-all ${
                    isSelected
                      ? "border-accent bg-accent text-white"
                      : "border-line bg-paper group-hover:border-accent/40"
                  }`}
                >
                  <div
                    className={`h-1.5 w-1.5 rounded-full transition-colors ${
                      isSelected ? "bg-white" : "bg-transparent"
                    }`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Footer */}
      <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
        <button
          onClick={onVoltar}
          className="flex items-center gap-2 rounded-lg border border-line bg-paper-raised px-4 py-2 text-xs sm:text-sm font-medium text-ink shadow-clean transition-colors hover:bg-accent-soft hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar ao Tema</span>
        </button>

        <button
          onClick={onIniciarMesa}
          className="flex items-center gap-2 rounded-lg bg-accent px-5 py-2 text-xs sm:text-sm font-semibold text-white shadow-clean transition-colors hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-accent"
        >
          <Sparkles className="h-4 w-4" />
          <span>Dispor as Cartas na Mesa</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
