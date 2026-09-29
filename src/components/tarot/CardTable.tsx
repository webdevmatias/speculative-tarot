"use client";

import React from "react";
import { Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import { CartaSessao, TipoTirada } from "@/types/tarot";
import { TarotCard } from "./TarotCard";
import { Breadcrumbs, EtapaFluxo } from "@/components/ui/Breadcrumbs";
import { TODAS_AS_CARTAS } from "@/lib/data";

interface CardTableProps {
  tema: string;
  tipoTirada: TipoTirada;
  cartas: CartaSessao[];
  cartaAtivaIndex: number;
  onSelecionarCarta: (index: number) => void;
  onVirarCarta: (index: number) => void;
  onNavegarEtapa?: (etapa: EtapaFluxo) => void;
  onIrParaResumo?: () => void;
  onVoltarParaTirada?: () => void;
  onAvancarParaPerguntas?: () => void;
}

export function CardTable({
  tema,
  tipoTirada,
  cartas,
  cartaAtivaIndex,
  onSelecionarCarta,
  onVirarCarta,
  onNavegarEtapa,
  onIrParaResumo,
  onVoltarParaTirada,
  onAvancarParaPerguntas,
}: CardTableProps) {
  const cartaAtiva = cartas[cartaAtivaIndex];
  const todasViradas = cartas.every((c) => c.virada);

  const getSubtitulo = (c: CartaSessao) => {
    return c.subtitulo || TODAS_AS_CARTAS.find((d) => d.titulo === c.titulo)?.subtitulo || "";
  };

  return (
    <div className="w-full">
      {/* Breadcrumbs Navigation */}
      <div className="flex justify-center pt-1 pb-4 sm:pb-5">
        <Breadcrumbs
          etapaAtual="mesa"
          onNavegar={(etp) => {
            if (etp === "resumo") onIrParaResumo?.();
            else if (etp === "perguntas") onAvancarParaPerguntas?.();
            else onNavegarEtapa?.(etp);
          }}
          temTema={true}
          temCartas={true}
        />
      </div>

      {/* ============================================================== */}
      {/* TABLE TOP BAR: COMPACT THEME INFO & STATUS                      */}
      {/* ============================================================== */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex items-center justify-between gap-3 rounded-lg border border-line bg-paper-raised px-3 py-1.5 shadow-clean">
          <div className="flex items-center gap-2 min-w-0">
            <span className="shrink-0 rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold text-accent bg-accent-soft border border-accent/20">
              Tema:
            </span>
            <span className="truncate text-xs font-bold text-ink">
              &ldquo;{tema}&rdquo;
            </span>
            <span className="hidden sm:inline shrink-0 text-[10px] text-ink-muted">
              ({tipoTirada} {tipoTirada === 1 ? "carta" : "cartas"})
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[11px] text-ink-muted hidden sm:inline">
              {cartas.filter((c) => c.virada).length} de {cartas.length} reveladas
            </span>
            <div className="flex h-5 items-center justify-center rounded border border-line bg-paper px-1.5 text-[11px] font-mono font-semibold text-accent">
              {cartas.filter((c) => c.virada).length}/{cartas.length}
            </div>
          </div>
        </div>

        {/* Guidance tip */}
        <div className="my-4 flex items-center justify-center gap-1 text-center text-[11px] text-ink-muted">
          <Sparkles className="h-3 w-3 text-accent shrink-0" />
          <span>
            {!todasViradas
              ? "Toque nas cartas viradas para revelá-las na mesa."
              : "Todas as cartas reveladas! Você pode explorá-las ou avançar para as perguntas."}
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
            <div className="flex flex-col items-center justify-center py-4">
              <TarotCard
                carta={cartas[0]}
                slotIndex={0}
                totalCartas={1}
                isAtiva={true}
                virada={cartas[0].virada}
                onVirar={() => onVirarCarta(0)}
                onSelecionar={() => onSelecionarCarta(0)}
              />
              <div className="mt-3 text-center flex flex-col items-center">
                <button
                  onClick={() => {
                    if (!cartas[0].virada) onVirarCarta(0);
                    else onSelecionarCarta(0);
                  }}
                  className="rounded-lg px-3 py-1 text-xs font-semibold text-accent bg-accent-soft border border-accent/30 shadow-clean hover:bg-accent-soft/80 transition-colors"
                >
                  {cartas[0].virada ? `${cartas[0].numeroRomano} • ${cartas[0].titulo}` : "Toque para Revelar"}
                </button>
                {cartas[0].virada && getSubtitulo(cartas[0]) && (
                  <p className="mt-1 text-xs text-ink-muted font-medium max-w-xs">
                    {getSubtitulo(cartas[0])}
                  </p>
                )}
              </div>
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
                    <div className="mt-2.5 text-center flex flex-col items-center">
                      <button
                        onClick={() => {
                          if (!carta.virada) onVirarCarta(idx);
                          else onSelecionarCarta(idx);
                        }}
                        className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-accent ${cartaAtivaIndex === idx
                          ? "bg-accent-soft text-accent border border-accent/30 font-semibold"
                          : "text-ink-muted hover:text-ink hover:bg-accent-soft/40"
                          }`}
                      >
                        {carta.virada ? `${carta.numeroRomano} • ${carta.titulo}` : `Carta ${idx + 1}`}
                      </button>
                      {carta.virada && getSubtitulo(carta) && (
                        <p className="mt-1 text-[11px] text-ink-muted font-medium line-clamp-1 max-w-[170px] leading-tight">
                          {getSubtitulo(carta)}
                        </p>
                      )}
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

                <div className="mt-2 text-center">
                  <span className="font-mono text-xs font-bold text-accent">
                    {cartaAtiva.virada ? `${cartaAtiva.numeroRomano} • ${cartaAtiva.titulo}` : `Carta ${cartaAtivaIndex + 1}`}
                  </span>
                  {cartaAtiva.virada && getSubtitulo(cartaAtiva) && (
                    <p className="mt-0.5 text-xs text-ink-muted font-medium">
                      {getSubtitulo(cartaAtiva)}
                    </p>
                  )}
                </div>

                {/* Mobile Navigation dots */}
                <div className="mt-4 flex items-center gap-2">
                  {cartas.map((c, idx) => (
                    <button
                      key={c.id}
                      onClick={() => onSelecionarCarta(idx)}
                      className={`h-2.5 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-accent ${cartaAtivaIndex === idx
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
                    <div className="mt-2.5 text-center flex flex-col items-center">
                      <button
                        onClick={() => {
                          if (!carta.virada) onVirarCarta(idx);
                          else onSelecionarCarta(idx);
                        }}
                        className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-accent ${cartaAtivaIndex === idx
                          ? "bg-accent-soft text-accent border border-accent/30 font-semibold"
                          : "text-ink-muted hover:text-ink hover:bg-accent-soft/40"
                          }`}
                      >
                        {carta.virada ? `${carta.numeroRomano} • ${carta.titulo}` : `Carta ${idx + 1}`}
                      </button>
                      {carta.virada && getSubtitulo(carta) && (
                        <p className="mt-1 text-[11px] text-ink-muted font-medium line-clamp-1 max-w-[170px] leading-tight">
                          {getSubtitulo(carta)}
                        </p>
                      )}
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

                <div className="mt-2 text-center">
                  <span className="font-mono text-xs font-bold text-accent">
                    {cartaAtiva.virada ? `${cartaAtiva.numeroRomano} • ${cartaAtiva.titulo}` : `Carta ${cartaAtivaIndex + 1}`}
                  </span>
                  {cartaAtiva.virada && getSubtitulo(cartaAtiva) && (
                    <p className="mt-0.5 text-xs text-ink-muted font-medium">
                      {getSubtitulo(cartaAtiva)}
                    </p>
                  )}
                </div>

                {/* Mobile Navigation dots */}
                <div className="mt-4 flex items-center gap-2">
                  {cartas.map((c, idx) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        if (!c.virada) onVirarCarta(idx);
                        else onSelecionarCarta(idx);
                      }}
                      className={`h-2.5 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-accent ${cartaAtivaIndex === idx
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

          {/* ============================================================== */}
          {/* DETALHES DA CARTA ATIVA NA MESA                               */}
          {/* ============================================================== */}
          {cartaAtiva?.virada ? (
            <div className="mt-5 rounded-xl border border-line bg-paper p-4 sm:p-5 shadow-sm transition-all duration-300 animate-in fade-in slide-in-from-top-2">
              {/* Card Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-line pb-3.5">
                <div className="flex items-start gap-3.5">
                  {cartaAtiva.imagemFrente && (
                    <div className="relative h-16 w-11 shrink-0 overflow-hidden rounded-lg border border-line bg-paper-raised shadow-clean">
                      <img
                        src={cartaAtiva.imagemFrente}
                        alt={cartaAtiva.titulo}
                        className="h-full w-full object-cover select-none"
                      />
                    </div>
                  )}
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-accent bg-accent-soft px-2 py-0.5 rounded border border-accent/20">
                        {cartaAtiva.numeroRomano}
                      </span>
                      <span className="text-sm sm:text-base font-bold text-ink">
                        {cartaAtiva.titulo}
                      </span>
                      {cartas.length > 1 && (
                        <span className="text-[11px] font-mono text-ink-muted">
                          (Carta {cartaAtivaIndex + 1} de {cartas.length})
                        </span>
                      )}
                    </div>
                    {getSubtitulo(cartaAtiva) && (
                      <p className="mt-1 text-xs text-ink-muted font-medium">
                        {getSubtitulo(cartaAtiva)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto shrink-0">
                  {cartas.length > 1 && (
                    <div className="flex items-center gap-1 sm:mr-1">
                      {cartas.map((c, idx) => (
                        <button
                          key={c.id}
                          onClick={() => {
                            if (!c.virada) onVirarCarta(idx);
                            else onSelecionarCarta(idx);
                          }}
                          className={`h-7 min-w-[28px] px-2 rounded text-xs font-mono font-medium transition-all ${cartaAtivaIndex === idx
                            ? "bg-accent text-white shadow-clean"
                            : c.virada
                              ? "bg-accent-soft text-accent hover:bg-accent-soft/80"
                              : "bg-paper-raised border border-line text-ink-muted hover:text-ink"
                            }`}
                          title={`Carta ${idx + 1}: ${c.virada ? c.titulo : "Virada para baixo"}`}
                        >
                          {c.virada ? c.numeroRomano : `${idx + 1}`}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Provocations List */}
              <div className="mt-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-accent font-semibold">
                    Provocações deste arquétipo para o tema:
                  </span>
                  <span className="text-[10px] text-ink-muted">
                    {cartaAtiva.perguntas.length} questões
                  </span>
                </div>

                <div className="mt-2.5 grid gap-2.5 sm:grid-cols-3">
                  {cartaAtiva.perguntas.map((p, pIdx) => (
                    <div
                      key={pIdx}
                      className="flex flex-col rounded-lg border border-line bg-paper-raised p-3 text-xs shadow-clean transition-colors hover:border-accent/30"
                    >
                      <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-accent">
                        <span>0{pIdx + 1}</span>
                        <span className="text-ink-muted font-normal">• Provocação</span>
                      </div>
                      <p className="mt-1.5 text-ink leading-relaxed">
                        {p.pergunta}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-4 rounded-xl border border-dashed border-line bg-paper/60 p-3.5 text-center text-xs text-ink-muted flex items-center justify-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              <span>Clique em uma carta na mesa para revelá-la e visualizar suas informações e provocações.</span>
            </div>
          )}

          {/* Table Bottom Navigation: Voltar para Tirada & Avançar para Perguntas */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-3">
            <button
              onClick={onVoltarParaTirada}
              className="flex items-center gap-1.5 rounded-lg border border-line bg-paper px-3 py-1.5 text-xs font-medium text-ink shadow-clean transition-colors hover:bg-accent-soft hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Mudar Tirada</span>
            </button>

            <div className="flex items-center gap-3">
              {todasViradas && (
                <span className="hidden sm:inline text-xs font-medium text-emerald-700">
                  Todas as cartas reveladas!
                </span>
              )}
              <button
                onClick={onAvancarParaPerguntas}
                className="flex items-center gap-1.5 rounded-lg bg-accent px-5 py-2 text-xs font-semibold text-white shadow-clean transition-colors hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-accent"
              >
                <span>Prosseguir para as Perguntas</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
