"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, RotateCcw, X } from "lucide-react";
import { SessaoTarot } from "@/types/tarot";
import { TODAS_AS_CARTAS } from "@/lib/data";

interface HomeScreenProps {
  sessaoSalva: SessaoTarot | null;
  onIniciarNovaTirada: () => void;
  onContinuarSessao: () => void;
}

// Assemble all cards and card back for the visual showcase
const CARTAS_CARROSSEL = [
  { id: "verso-1", titulo: "Tarô Especulativo", imagem: "/assets/cartas/verso.png" },
  ...TODAS_AS_CARTAS.map((c) => ({
    id: `carta-${c.id}`,
    titulo: c.titulo,
    imagem: c.imagemFrente || "/assets/cartas/verso.png",
  })),
];

export function HomeScreen({
  sessaoSalva,
  onIniciarNovaTirada,
  onContinuarSessao,
}: HomeScreenProps) {
  const [modalGuiaAberto, setModalGuiaAberto] = useState(false);

  const temSessaoValida =
    sessaoSalva &&
    sessaoSalva.tema &&
    sessaoSalva.cartas &&
    sessaoSalva.cartas.length > 0;

  const handleConfirmarInicio = () => {
    setModalGuiaAberto(false);
    onIniciarNovaTirada();
  };

  return (
    <div className="h-full w-full flex-1 flex flex-col justify-center items-center px-4 py-2 sm:py-4 overflow-hidden select-none my-auto">
      {/* ============================================================== */}
      {/* INCLINED CARDS CAROUSEL (3 CARDS IN VIEW: 1 FULL, 2 HALVES)    */}
      {/* ============================================================== */}
      <div className="relative mx-auto w-full max-w-[88vw] sm:max-w-[420px] md:max-w-[450px] mb-2 sm:mb-3 overflow-hidden py-4 sm:py-5">
        {/* Subtle Edge Fade Gradients */}
        <div className="pointer-events-none absolute left-0 inset-y-0 w-10 sm:w-16 bg-gradient-to-r from-paper via-paper/75 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 inset-y-0 w-10 sm:w-16 bg-gradient-to-l from-paper via-paper/75 to-transparent z-10" />

        {/* Subtly Curved / Slanted Track */}
        <div className="transform -rotate-1 sm:-rotate-1.5 origin-center py-1 select-none">
          <div className="animate-card-marquee gap-3 sm:gap-3.5 items-center">
            {[...CARTAS_CARROSSEL, ...CARTAS_CARROSSEL].map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="group relative w-[38vw] max-w-[145px] sm:w-[170px] md:w-[185px] aspect-[2/3] shrink-0 rounded-xl overflow-hidden border border-line bg-paper-raised shadow-clean transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-accent/40 cursor-pointer"
              >
                <img
                  src={item.imagem}
                  alt={item.titulo}
                  className="h-full w-full object-cover select-none"
                  loading="lazy"
                />
                {/* Minimalist Title Overlay on Hover */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end items-center pb-2.5 px-2">
                  <p className="font-display text-xs sm:text-sm font-semibold tracking-wide text-white drop-shadow-sm text-center truncate max-w-full">
                    {item.titulo}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section (Focused & Compact) */}
      <div className="text-center max-w-xl mx-auto flex flex-col items-center">
        {/* Main Title */}
        <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-ink">
          Tarô Especulativo
        </h1>

        {/* Second descriptive line */}
        <p className="mt-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-accent">
          Design Especulativo & Pensamento de Futuros
        </p>

        {/* Subtitle / Description */}
        <p className="mt-1.5 text-xs sm:text-sm text-ink-muted leading-relaxed max-w-md mx-auto">
          Uma ferramenta para desarmar certezas, investigar riscos sistêmicos e explorar futuros possíveis através de tiradas provocativas.
        </p>

        {/* Primary Action Buttons */}
        <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row items-center justify-center gap-2.5">
          <button
            onClick={() => setModalGuiaAberto(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-clean transition-colors hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-accent"
          >
            <Sparkles className="h-4 w-4" />
            <span>Iniciar Nova Tirada</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          {temSessaoValida && (
            <button
              onClick={onContinuarSessao}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-paper-raised px-4 py-2.5 text-xs sm:text-sm font-medium text-ink shadow-clean transition-colors hover:bg-accent-soft hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
            >
              <RotateCcw className="h-4 w-4 text-accent" />
              <span>Continuar Sessão em Andamento</span>
            </button>
          )}
        </div>
      </div>

      {/* Modal: Conceptual Guide Steps (Compact) */}
      {modalGuiaAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-ink/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl rounded-xl border border-line bg-paper-raised p-4 sm:p-6 shadow-clean max-h-[88vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setModalGuiaAberto(false)}
              className="absolute top-3 right-3 text-ink-muted hover:text-ink transition-colors focus-visible:outline-2 focus-visible:outline-accent rounded-lg p-1"
              aria-label="Fechar modal"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Modal Header */}
            <div className="text-left max-w-lg">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-accent">
                Guia Conceitual
              </span>
              <h2 className="mt-0.5 font-display text-lg sm:text-xl font-bold text-ink">
                Como funciona a exploração especulativa?
              </h2>
              <p className="mt-1 text-xs text-ink-muted leading-relaxed">
                Em vez de predizer o futuro, o Tarô Especulativo atua como uma máquina de criar perguntas desconfortáveis sobre o presente.
              </p>
            </div>

            {/* Steps Grid */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-line pt-4">
              {/* Step 1 */}
              <div className="flex flex-col">
                <span className="font-mono text-xl font-bold text-accent/70">
                  01
                </span>
                <h3 className="mt-1 text-xs sm:text-sm font-semibold text-ink">
                  Defina o Terreno
                </h3>
                <p className="mt-1 text-[11px] text-ink-muted leading-relaxed">
                  Escolha um tema pré-configurado ou formule uma hipótese própria sobre tecnologias e futuros alternativos.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col">
                <span className="font-mono text-xl font-bold text-accent/70">
                  02
                </span>
                <h3 className="mt-1 text-xs sm:text-sm font-semibold text-ink">
                  Mesa de Cartas
                </h3>
                <p className="mt-1 text-[11px] text-ink-muted leading-relaxed">
                  Tire 1, 3 ou 6 cartas aleatórias. Toque para virá-las em 3D e revelar arquétipos provocativos.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col">
                <span className="font-mono text-xl font-bold text-accent/70">
                  03
                </span>
                <h3 className="mt-1 text-xs sm:text-sm font-semibold text-ink">
                  Trilha & Síntese
                </h3>
                <p className="mt-1 text-[11px] text-ink-muted leading-relaxed">
                  Responda às provocações reflexivas. Ao final, exporte sua síntese formatada em Markdown ou PDF.
                </p>
              </div>
            </div>

            {/* Modal Footer / Confirmation Action */}
            <div className="mt-5 flex items-center justify-end gap-2 border-t border-line pt-3.5">
              <button
                onClick={() => setModalGuiaAberto(false)}
                className="rounded-lg border border-line bg-paper px-3 py-1.5 text-xs font-medium text-ink shadow-clean hover:bg-accent-soft hover:text-accent transition-colors focus-visible:outline-2 focus-visible:outline-accent"
              >
                Voltar
              </button>
              <button
                onClick={handleConfirmarInicio}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-accent px-4 py-1.5 text-xs font-semibold text-white shadow-clean hover:bg-accent/90 transition-colors focus-visible:outline-2 focus-visible:outline-accent"
              >
                <span>Continuar</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
