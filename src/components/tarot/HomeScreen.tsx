"use client";

import React from "react";
import { Sparkles, ArrowRight, RotateCcw } from "lucide-react";
import { SessaoTarot } from "@/types/tarot";

interface HomeScreenProps {
  sessaoSalva: SessaoTarot | null;
  onIniciarNovaTirada: () => void;
  onContinuarSessao: () => void;
}

export function HomeScreen({
  sessaoSalva,
  onIniciarNovaTirada,
  onContinuarSessao,
}: HomeScreenProps) {
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

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto">
        {/* Main Title */}
        <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-ink">
          Tarot Especulativo
        </h1>

        {/* Second descriptive line (replaces former eyebrow badge) */}
        <p className="mt-3 text-sm sm:text-base font-medium text-accent">
          Ferramenta de Design Especulativo & Pensamento de Futuros
        </p>

        {/* Subtitle / Description */}
        <p className="mt-4 text-base sm:text-lg text-ink-muted leading-relaxed max-w-2xl mx-auto">
          Uma ferramenta para desarmar certezas, investigar riscos sistêmicos, antecipar impactos éticos e explorar futuros possíveis através de tiradas de cartas provocativas.
        </p>

        {/* Primary Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onIniciarNovaTirada}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-8 py-3.5 text-sm sm:text-base font-semibold text-white shadow-clean transition-colors hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-accent"
          >
            <Sparkles className="h-4 w-4" />
            <span>Iniciar Nova Tirada</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          {temSessaoValida && (
            <button
              onClick={onContinuarSessao}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-paper-raised px-6 py-3.5 text-sm sm:text-base font-medium text-ink shadow-clean transition-colors hover:bg-accent-soft hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
            >
              <RotateCcw className="h-4 w-4 text-accent" />
              <span>Continuar Sessão em Andamento</span>
            </button>
          )}
        </div>

        {/* Saved Session Card Preview */}
        {temSessaoValida && (
          <div className="mt-8 mx-auto max-w-lg rounded-2xl border border-line bg-paper-raised p-6 text-left shadow-clean">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                Sessão em Andamento
              </span>
              <span className="text-xs text-ink-muted">
                {totalRespondidas} de {totalPerguntas} reflexões
              </span>
            </div>
            <p className="mt-2 text-sm font-semibold text-ink line-clamp-1">
              &ldquo;{sessaoSalva.tema}&rdquo;
            </p>
            <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
              <span className="text-xs text-ink-muted">
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

      {/* Conceptual Guide Steps - No box borders/backgrounds, clean spacing and big numerals */}
      <div className="mt-24 border-t border-line pt-16">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="font-display text-2xl font-bold text-ink">
            Como funciona a exploração especulativa?
          </h2>
          <p className="mt-2 text-sm text-ink-muted">
            Em vez de predizer o futuro, o Tarot Especulativo atua como uma máquina de criar perguntas desconfortáveis sobre o presente.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="flex flex-col">
            <span className="font-mono text-3xl font-light text-accent/60">
              01
            </span>
            <h3 className="mt-2 text-base font-semibold text-ink">
              Defina o Terreno
            </h3>
            <p className="mt-2 text-sm text-ink-muted leading-relaxed">
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
            <p className="mt-2 text-sm text-ink-muted leading-relaxed">
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
            <p className="mt-2 text-sm text-ink-muted leading-relaxed">
              Responda à trilha vertical de provocações de cada carta. Ao final, exporte sua reflexão estruturada em Markdown ou PDF.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
