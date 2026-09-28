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

  const totalPerguntas = temSessaoValida
    ? sessaoSalva.cartas.reduce((acc, c) => acc + c.perguntas.length, 0)
    : 0;
  const totalRespondidas = temSessaoValida
    ? sessaoSalva.cartas.reduce(
      (acc, c) =>
        acc +
        c.perguntas.filter((p) => p.resposta && p.resposta.trim().length > 0).length,
      0
    )
    : 0;

  const handleConfirmarInicio = () => {
    setModalGuiaAberto(false);
    onIniciarNovaTirada();
  };

  return (
    <div className="mx-auto max-w-5xl px-4 pt-14 pb-8 sm:pt-20 sm:pb-12 overflow-hidden">
      {/* ============================================================== */}
      {/* INCLINED CARDS CAROUSEL (3 CARDS IN VIEW: 1 FULL, 2 HALVES)    */}
      {/* ============================================================== */}
      <div className="relative mx-auto max-w-[520px] sm:max-w-[600px] md:max-w-[660px] mb-6 sm:mb-8 overflow-hidden py-2">
        {/* Subtle Edge Fade Gradients */}
        <div className="pointer-events-none absolute left-0 inset-y-0 w-8 sm:w-16 bg-gradient-to-r from-paper to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 inset-y-0 w-8 sm:w-16 bg-gradient-to-l from-paper to-transparent z-10" />

        {/* Slanted / Inclined Track */}
        <div className="transform -rotate-1 sm:-rotate-1.5 origin-center py-2 select-none">
          <div className="animate-card-marquee gap-4 sm:gap-6 items-center">
            {[...CARTAS_CARROSSEL, ...CARTAS_CARROSSEL].map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="group relative w-[54vw] sm:w-[250px] md:w-[275px] aspect-[2/3] shrink-0 rounded-2xl overflow-hidden border border-line bg-paper-raised shadow-clean transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-accent/40 cursor-pointer"
              >
                <img
                  src={item.imagem}
                  alt={item.titulo}
                  className="h-full w-full object-cover select-none"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-ink/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-2.5">
                  <span className="font-mono text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-md bg-paper/95 text-accent shadow-sm border border-line backdrop-blur-sm truncate max-w-[90%]">
                    {item.titulo}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section (Focused & Compact) */}
      <div className="text-center max-w-xl mx-auto">
        {/* Main Title */}
        <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-ink">
          Tarot Especulativo
        </h1>

        {/* Second descriptive line */}
        <p className="mt-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-accent">
          Ferramenta de Design Especulativo & Pensamento de Futuros
        </p>

        {/* Subtitle / Description */}
        <p className="mt-2 text-xs sm:text-sm text-ink-muted leading-relaxed max-w-md mx-auto">
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

        {/* Saved Session Card Preview */}
        {temSessaoValida && (
          <div className="mt-4 mx-auto max-w-md rounded-xl border border-line bg-paper-raised p-4 text-left shadow-clean">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold text-accent uppercase tracking-wider">
                Sessão em Andamento
              </span>
              <span className="text-[11px] text-ink-muted">
                {totalRespondidas} de {totalPerguntas} reflexões
              </span>
            </div>
            <p className="mt-1 text-xs sm:text-sm font-semibold text-ink line-clamp-1">
              &ldquo;{sessaoSalva.tema}&rdquo;
            </p>
            <div className="mt-2.5 flex items-center justify-between border-t border-line pt-2">
              <span className="text-[11px] text-ink-muted">
                Tirada de {sessaoSalva.tipoTirada} {sessaoSalva.tipoTirada === 1 ? "carta" : "cartas"}
              </span>
              <button
                onClick={onContinuarSessao}
                className="text-xs font-semibold text-accent hover:underline flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-accent"
              >
                <span>Retomar tirada</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal: Conceptual Guide Steps */}
      {modalGuiaAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl rounded-2xl border border-line bg-paper-raised p-6 sm:p-8 shadow-clean max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setModalGuiaAberto(false)}
              className="absolute top-4 right-4 text-ink-muted hover:text-ink transition-colors focus-visible:outline-2 focus-visible:outline-accent rounded-lg p-1"
              aria-label="Fechar modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Header */}
            <div className="text-left max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                Guia Conceitual
              </span>
              <h2 className="mt-1 font-display text-2xl font-bold text-ink">
                Como funciona a exploração especulativa?
              </h2>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                Em vez de predizer o futuro, o Tarot Especulativo atua como uma máquina de criar perguntas desconfortáveis sobre o presente.
              </p>
            </div>

            {/* Steps Grid */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-line pt-6">
              {/* Step 1 */}
              <div className="flex flex-col">
                <span className="font-mono text-3xl font-light text-accent/60">
                  01
                </span>
                <h3 className="mt-2 text-base font-semibold text-ink">
                  Defina o Terreno
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-ink-muted leading-relaxed">
                  Escolha entre 50 temas predefinidos (de biotecnologia a IA) ou escreva uma premissa própria sobre produtos, tecnologias ou modelos sociais.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col">
                <span className="font-mono text-3xl font-light text-accent/60">
                  02
                </span>
                <h3 className="mt-2 text-base font-semibold text-ink">
                  Revele as Cartas na Mesa
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-ink-muted leading-relaxed">
                  Tire 1, 3 ou 6 cartas aleatórias. Toque para virar cada carta em uma experiência 3D tátil e revelar seus arquétipos críticos.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col">
                <span className="font-mono text-3xl font-light text-accent/60">
                  03
                </span>
                <h3 className="mt-2 text-base font-semibold text-ink">
                  Trilha de Perguntas & Síntese
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-ink-muted leading-relaxed">
                  Responda à trilha vertical de provocações de cada carta. Ao final, exporte sua reflexão estruturada em Markdown ou PDF.
                </p>
              </div>
            </div>

            {/* Modal Footer / Confirmation Action */}
            <div className="mt-8 flex flex-col-reverse sm:flex-row items-center justify-end gap-3 border-t border-line pt-6">
              <button
                onClick={() => setModalGuiaAberto(false)}
                className="w-full sm:w-auto rounded-lg border border-line bg-paper-raised px-4 py-2.5 text-xs sm:text-sm font-medium text-ink shadow-clean hover:bg-accent-soft hover:text-accent transition-colors focus-visible:outline-2 focus-visible:outline-accent"
              >
                Voltar
              </button>
              <button
                onClick={handleConfirmarInicio}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-clean hover:bg-accent/90 transition-colors focus-visible:outline-2 focus-visible:outline-accent"
              >
                <span>Continuar para Escolha do Tema</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
