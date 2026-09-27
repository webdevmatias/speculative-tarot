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
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-wider text-accent">
          Etapa 2 de 3
        </span>
        <h2 className="mt-2 font-display text-2xl sm:text-4xl font-bold tracking-tight text-ink">
          Escolha a Tirada de Cartas
        </h2>
        <p className="mt-2 text-sm sm:text-base text-ink-muted">
          Defina o nível de profundidade e o número de ângulos que deseja explorar para o tema:
        </p>

        {/* Selected Theme chip */}
        <div className="mt-4 inline-block rounded-2xl border border-line bg-paper px-4 py-2 text-xs sm:text-sm text-ink shadow-clean">
          <span className="font-semibold text-accent">Tema:</span> &ldquo;{tema}&rdquo;
        </div>
      </div>

      {/* Cards Options Grid */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {opcoes.map((opcao) => {
          const isSelected = tipoSelecionado === opcao.tipo;

          return (
            <div
              key={opcao.tipo}
              onClick={() => onSelecionarTipo(opcao.tipo)}
              className={`group relative cursor-pointer flex flex-col justify-between rounded-2xl border p-6 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-accent ${
                isSelected
                  ? "border-accent bg-accent-soft shadow-clean ring-1 ring-accent"
                  : "border-line bg-paper-raised hover:border-accent/40 hover:bg-accent-soft/30 shadow-clean"
              }`}
            >
              {/* Highlight pill */}
              {opcao.destaque && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-amber-700 shadow-clean">
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
                        className={`relative h-13 w-8.5 overflow-hidden rounded-md border transition-all shadow-sm ${
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

                  <div className="flex items-center gap-1 text-xs text-ink-muted">
                    <Clock className="h-3.5 w-3.5 text-ink-muted" />
                    <span>{opcao.tempoEstimado}</span>
                  </div>
                </div>

                {/* Title (Sans-serif font-bold per prompt instructions) */}
                <h3 className="mt-5 text-xl font-bold text-ink group-hover:text-accent">
                  {opcao.titulo}
                </h3>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-accent">
                  {opcao.subtitulo}
                </h4>

                <p className="mt-3 text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {opcao.descricao}
                </p>

                <p className="mt-3 text-xs text-ink-muted border-t border-line pt-3 italic">
                  {opcao.beneficio}
                </p>
              </div>

              {/* Bottom selection feedback */}
              <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                <span className="text-xs font-medium text-ink-muted">
                  {isSelected ? "Selecionada" : "Clique para escolher"}
                </span>

                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-full border transition-all ${
                    isSelected
                      ? "border-accent bg-accent text-white"
                      : "border-line bg-paper group-hover:border-accent/40"
                  }`}
                >
                  <div
                    className={`h-2 w-2 rounded-full transition-colors ${
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
      <div className="mt-12 flex items-center justify-between border-t border-line pt-6">
        <button
          onClick={onVoltar}
          className="flex items-center gap-2 rounded-lg border border-line bg-paper-raised px-4 py-2.5 text-xs sm:text-sm font-medium text-ink shadow-clean transition-colors hover:bg-accent-soft hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar ao Tema</span>
        </button>

        <button
          onClick={onIniciarMesa}
          className="flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-clean transition-colors hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-accent"
        >
          <Sparkles className="h-4 w-4" />
          <span>Dispor as Cartas na Mesa</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
