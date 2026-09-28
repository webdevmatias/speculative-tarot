"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  Zap,
  HeartHandshake,
  UserX,
  Skull,
  Waves,
  Flame,
  Users,
  AlertTriangle,
  Globe,
  Radio,
  Leaf,
  Sparkles,
  Eye,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { CartaSessao } from "@/types/tarot";

interface TarotCardProps {
  carta: CartaSessao;
  slotIndex: number;
  totalCartas: number;
  isAtiva?: boolean;
  virada?: boolean;
  onVirar?: () => void;
  onSelecionar?: () => void;
  modo?: "mesa" | "miniatura";
}

// Icon dictionary for archetypes
const ICONES_ARQUETIPOS: Record<string, LucideIcon> = {
  ShieldAlert,
  Zap,
  HeartHandshake,
  UserX,
  Skull,
  Waves,
  Flame,
  Users,
  AlertTriangle,
  Globe,
  Radio,
  Leaf,
  Sparkles,
};

export function TarotCard({
  carta,
  slotIndex,
  totalCartas,
  isAtiva = false,
  virada = false,
  onVirar,
  onSelecionar,
  modo = "mesa",
}: TarotCardProps) {
  const Icone = ICONES_ARQUETIPOS[carta.iconeNome] || Sparkles;
  const [frenteError, setFrenteError] = useState(false);
  const [versoError, setVersoError] = useState(false);

  // Check if all questions for this card have been answered
  const totalPerguntas = carta.perguntas.length;
  const respondidas = carta.perguntas.filter(
    (p) => p.resposta && p.resposta.trim().length > 0
  ).length;
  const todasRespondidas = totalPerguntas > 0 && respondidas === totalPerguntas;

  // Miniatura mode for the top/bottom navigation timeline
  if (modo === "miniatura") {
    return (
      <button
        onClick={onSelecionar}
        className={`group relative flex flex-col items-center rounded-lg border p-1.5 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-accent ${
          isAtiva
            ? "border-accent bg-accent-soft shadow-clean ring-1 ring-accent"
            : "border-line bg-paper-raised hover:border-accent/40 hover:bg-accent-soft/40"
        }`}
      >
        <div
          className={`relative h-20 w-14 overflow-hidden rounded-lg border text-center transition-all ${
            virada
              ? "border-line bg-paper-raised"
              : "border-line bg-paper"
          }`}
        >
          {virada ? (
            carta.imagemFrente && !frenteError ? (
              <img
                src={carta.imagemFrente}
                alt={carta.titulo}
                className="h-full w-full object-cover"
                onError={() => setFrenteError(true)}
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-between p-1.5">
                <span className="font-mono text-[10px] font-bold text-accent">
                  {carta.numeroRomano}
                </span>
                <Icone className="h-4 w-4 text-accent" />
                <span className="font-mono text-[9px] font-medium text-ink-muted">
                  {respondidas}/{totalPerguntas}
                </span>
              </div>
            )
          ) : (
            carta.imagemVerso && !versoError ? (
              <img
                src={carta.imagemVerso}
                alt="Verso"
                className="h-full w-full object-cover"
                onError={() => setVersoError(true)}
              />
            ) : (
              <div className="flex h-full items-center justify-center p-1">
                <div className="h-10 w-8 rounded-lg border border-line bg-paper-raised flex items-center justify-center">
                  <Eye className="h-3 w-3 text-ink-muted" />
                </div>
              </div>
            )
          )}

          {todasRespondidas && virada && (
            <div className="absolute top-0.5 right-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 p-0.5 shadow-sm">
              <CheckCircle2 className="h-3 w-3" />
            </div>
          )}
        </div>

        <span className="mt-1 line-clamp-1 max-w-[72px] text-[11px] font-medium text-ink">
          {virada ? carta.titulo : `Carta ${slotIndex + 1}`}
        </span>
      </button>
    );
  }

  // Standard interactive 3D table card
  const handleCardClick = () => {
    if (!virada && onVirar) {
      onVirar();
    } else if (onSelecionar) {
      onSelecionar();
    }
  };

  return (
    <div
      className={`card-perspective relative select-none transition-all duration-300 ${
        isAtiva ? "z-20 scale-100 sm:scale-105" : "z-10 opacity-95 hover:opacity-100"
      }`}
    >
      <div
        onClick={handleCardClick}
        role="button"
        tabIndex={0}
        aria-label={`${carta.titulo}, Carta ${slotIndex + 1} de ${totalCartas}${
          virada ? ", Revelada" : ", Virada para baixo, clique para revelar"
        }`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleCardClick();
          }
        }}
        className={`card-preserve-3d relative h-[290px] w-[190px] cursor-pointer rounded-xl transition-transform duration-700 sm:h-[330px] sm:w-[215px] focus-visible:outline-2 focus-visible:outline-accent ${
          virada ? "card-rotate-y-180 card-revealed-shadow" : "card-elevation hover:-translate-y-2"
        }`}
      >
        {/* ============================================================== */}
        {/* VERSO DA CARTA (Face Down)                                     */}
        {/* ============================================================== */}
        <div className="card-backface-hidden absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-paper-raised shadow-clean transition-colors">
          {carta.imagemVerso && !versoError ? (
            <div className="relative h-full w-full overflow-hidden rounded-2xl bg-paper">
              <img
                src={carta.imagemVerso}
                alt="Verso da Carta"
                className="h-full w-full object-cover select-none"
                onError={() => setVersoError(true)}
              />
              <div className="absolute inset-0 bg-ink/10 opacity-0 transition-opacity hover:opacity-100 flex items-end justify-center pb-4">
                <div className="flex items-center gap-1.5 rounded-lg border border-line bg-paper/95 px-3 py-1 text-xs font-semibold text-accent shadow-clean backdrop-blur-sm">
                  <Sparkles className="h-3 w-3 text-accent" />
                  <span>Toque para Revelar</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative flex h-full flex-col justify-between p-5">
              {/* Subtle Inner Geometric Hairline Frame */}
              <div className="pointer-events-none absolute inset-3 rounded-lg border border-line" />

              {/* Corner Subtle Linework */}
              <div className="absolute top-4 left-4 h-2 w-2 border-t border-l border-ink-muted/30" />
              <div className="absolute top-4 right-4 h-2 w-2 border-t border-r border-ink-muted/30" />
              <div className="absolute bottom-4 left-4 h-2 w-2 border-b border-l border-ink-muted/30" />
              <div className="absolute bottom-4 right-4 h-2 w-2 border-b border-r border-ink-muted/30" />

              {/* Card Top Label */}
              <div className="relative z-10 flex items-center justify-between text-ink-muted">
                <span className="font-mono text-[10px] tracking-wider uppercase">
                  Tarô Especulativo
                </span>
                <span className="font-mono text-xs font-medium">
                  0{slotIndex + 1}/0{totalCartas}
                </span>
              </div>

              {/* Center Discreet Emblem Motif */}
              <div className="relative z-10 my-auto flex flex-col items-center justify-center">
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-line bg-paper shadow-clean">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <Eye className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-1.5 rounded-lg border border-line bg-accent-soft px-3 py-1 text-xs font-semibold text-accent shadow-clean">
                  <Sparkles className="h-3 w-3 text-accent" />
                  <span>Toque para Revelar</span>
                </div>
              </div>

              {/* Bottom Card Label */}
              <div className="relative z-10 text-center">
                <span className="font-mono text-[10px] tracking-wider text-ink-muted uppercase">
                  Arquétipo Oculto
                </span>
              </div>
            </div>
          )}
        </div>

        {/* ============================================================== */}
        {/* FRENTE DA CARTA (Face Up - Revealed)                           */}
        {/* STRICT RULE: Absolutely NO questions or answers inside card!  */}
        {/* ============================================================== */}
        <div className="card-backface-hidden card-rotate-y-180 absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-paper-raised text-ink">
          {carta.imagemFrente && !frenteError ? (
            <div className="relative h-full w-full overflow-hidden rounded-2xl bg-paper">
              <img
                src={carta.imagemFrente}
                alt={carta.titulo}
                className="h-full w-full object-cover select-none"
                onError={() => setFrenteError(true)}
              />
            </div>
          ) : (
            <div className="relative flex h-full flex-col justify-between p-5">
              {/* Subtle Inner Hairline Border */}
              <div className="pointer-events-none absolute inset-3 rounded-lg border border-line" />

              {/* Corner Accent Details */}
              <div className="absolute top-4 left-4 h-2 w-2 border-t border-l border-accent/40" />
              <div className="absolute top-4 right-4 h-2 w-2 border-t border-r border-accent/40" />
              <div className="absolute bottom-4 left-4 h-2 w-2 border-b border-l border-accent/40" />
              <div className="absolute bottom-4 right-4 h-2 w-2 border-b border-r border-accent/40" />

              {/* Card Header: Roman Numeral & Slot Indicator */}
              <div className="relative z-10 flex items-center justify-between border-b border-line pb-2.5">
                <span className="font-mono text-xs font-bold tracking-widest uppercase text-accent">
                  {carta.numeroRomano}
                </span>
                <span className="font-mono text-[11px] tracking-wider text-ink-muted">
                  CARTA {slotIndex + 1} DE {totalCartas}
                </span>
              </div>

              {/* Card Center: Archetype Motif Emblem & Title (Inter/sans) */}
              <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center px-2">
                {/* Icon Container */}
                <div className="relative mb-4 flex h-20 w-20 items-center justify-center rounded-2xl border border-line bg-paper shadow-clean">
                  <Icone className="h-8 w-8 text-accent" />
                </div>

                {/* Card Title (Sans-serif font-bold, per prompt instructions) */}
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-ink">
                  {carta.titulo}
                </h3>

                {/* Archetype Provocation Subtitle */}
                {carta.subtitulo && (
                  <p className="mt-2 line-clamp-2 max-w-[210px] text-xs font-medium text-ink-muted leading-relaxed">
                    {carta.subtitulo}
                  </p>
                )}
              </div>

              {/* Card Footer: Progress Pill */}
              <div className="relative z-10 flex items-center justify-between border-t border-line pt-2.5 text-xs">
                <span className="font-mono text-[11px] font-medium text-ink-muted">
                  {respondidas} de {totalPerguntas} respondidas
                </span>
                {todasRespondidas ? (
                  <span className="flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-2 py-0.5 text-[11px]">
                    <CheckCircle2 className="h-3 w-3" />
                    Completa
                  </span>
                ) : (
                  <span className="font-mono text-[10px] text-ink-muted uppercase tracking-wider">
                    Em reflexão
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


