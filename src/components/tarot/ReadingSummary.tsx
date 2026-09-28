"use client";

import React, { useState } from "react";
import {
  Copy,
  Download,
  Printer,
  RotateCcw,
  ArrowLeft,
  CheckCircle2,
  Bot,
  Layers,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { SessaoTarot } from "@/types/tarot";
import { exportarComoMarkdown, exportarComoTextoPuro } from "@/lib/storage";
import { Breadcrumbs, EtapaFluxo } from "@/components/ui/Breadcrumbs";
import { TODAS_AS_CARTAS } from "@/lib/data";

interface ReadingSummaryProps {
  sessao: SessaoTarot;
  onVoltarRevisar: () => void;
  onNovaTirada: () => void;
  onCopiarReflexao: () => void;
  onNavegarEtapa?: (etapa: EtapaFluxo) => void;
}

export function ReadingSummary({
  sessao,
  onVoltarRevisar,
  onNovaTirada,
  onCopiarReflexao,
  onNavegarEtapa,
}: ReadingSummaryProps) {
  const [expandirPromptIA, setExpandirPromptIA] = useState(false);

  const totalCartas = sessao.cartas.length;
  const totalPerguntas = sessao.cartas.reduce((acc, c) => acc + c.perguntas.length, 0);
  const totalRespondidas = sessao.cartas.filter(
    (c) => c.perguntas[0]?.resposta && c.perguntas[0].resposta.trim().length > 0
  ).length;

  const downloadArquivo = (conteudo: string, nomeArquivo: string, tipo: string) => {
    const blob = new Blob([conteudo], { type: tipo });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = nomeArquivo;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleBaixarMarkdown = () => {
    const md = exportarComoMarkdown(sessao);
    const dataSlug = new Date().toISOString().slice(0, 10);
    downloadArquivo(md, `tarot-especulativo-reflexao-${dataSlug}.md`, "text/markdown;charset=utf-8");
  };

  const handleBaixarTexto = () => {
    const txt = exportarComoTextoPuro(sessao);
    const dataSlug = new Date().toISOString().slice(0, 10);
    downloadArquivo(txt, `tarot-especulativo-reflexao-${dataSlug}.txt`, "text/plain;charset=utf-8");
  };

  const handleImprimir = () => {
    window.print();
  };

  // Structured prompt ready for external AI analysis
  const promptIA = `Você é um facilitador sênior de Design Especulativo e Pensamento Crítico de Futuros. 
Analise a seguinte sessão realizada com o Tarô Especulativo:

TEMA DE INVESTIGAÇÃO:
"${sessao.tema}"

TIRADA:
${sessao.tipoTirada} carta(s)

REGISTRO DE CARTAS E REFLEXÕES:
${sessao.cartas
  .map(
    (c) => `[Carta ${c.numeroRomano}: ${c.titulo}]
Provocações:
${c.perguntas.map((p, i) => `${i + 1}. ${p.pergunta}`).join("\n")}
Reflexão: ${c.perguntas[0]?.resposta?.trim() ? c.perguntas[0].resposta : "(Sem reflexão registrada)"}`
  )
  .join("\n\n")}

Com base estritamente nas respostas e tensões levantadas pelo usuário acima:
1. Identifique as 3 principais tensões ou dilemas sistêmicos que emergiram nesta reflexão.
2. Aponte quais hipóteses não testadas continuam implícitas no cenário.
3. Proponha 2 intervenções conceituais ou perguntas provocativas de segundo nível para aprofundar o projeto.`;

  return (
    <div className="mx-auto max-w-4xl px-4 py-3 sm:py-5">
      {/* Breadcrumbs Navigation */}
      <div className="flex justify-center mb-4 sm:mb-5">
        <Breadcrumbs
          etapaAtual="resumo"
          onNavegar={(etp) => {
            if (etp === "perguntas") onVoltarRevisar();
            else onNavegarEtapa?.(etp);
          }}
          temTema={true}
          temCartas={true}
        />
      </div>

      {/* ============================================================== */}
      {/* TOP ACTIONS BAR (Hidden when printing)                         */}
      {/* ============================================================== */}
      <div className="no-print mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-line pb-2.5">
        <button
          onClick={onVoltarRevisar}
          className="flex items-center gap-1.5 rounded-lg border border-line bg-paper-raised px-3 py-1.5 text-xs font-medium text-ink shadow-clean transition-colors hover:bg-accent-soft hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Voltar para Perguntas</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onCopiarReflexao}
            className="flex items-center gap-1.5 rounded-lg border border-line bg-paper-raised px-3 py-1.5 text-xs font-medium text-ink shadow-clean transition-colors hover:bg-accent-soft hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
            title="Copiar texto formatado em Markdown"
          >
            <Copy className="h-3.5 w-3.5 text-accent" />
            <span>Copiar</span>
          </button>

          <button
            onClick={handleBaixarMarkdown}
            className="flex items-center gap-1.5 rounded-lg border border-line bg-paper-raised px-3 py-1.5 text-xs font-medium text-ink shadow-clean transition-colors hover:bg-accent-soft hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
            title="Baixar arquivo Markdown (.md)"
          >
            <Download className="h-3.5 w-3.5 text-accent" />
            <span>Baixar .md</span>
          </button>

          <button
            onClick={handleImprimir}
            className="flex items-center gap-1.5 rounded-lg border border-line bg-paper-raised px-3 py-1.5 text-xs font-medium text-ink shadow-clean transition-colors hover:bg-accent-soft hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
            title="Imprimir ou Salvar em PDF"
          >
            <Printer className="h-3.5 w-3.5 text-accent" />
            <span>Imprimir</span>
          </button>

          <button
            onClick={onNovaTirada}
            className="flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-1.5 text-xs font-semibold text-white shadow-clean transition-colors hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-accent"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Nova Tirada</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SUMMARY MAIN DOCUMENT (Clean Light Paper & Hairline Dividers)  */}
      {/* ============================================================== */}
      <article className="rounded-xl border border-line bg-paper-raised p-5 sm:p-7 shadow-clean print-clean">
        {/* Title & Metadata */}
        <header className="border-b border-line pb-4 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-accent">
              Registro de Design Especulativo
            </span>
            <span className="text-[11px] text-ink-muted">
              {new Date().toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <h1 className="mt-1 font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-ink">
            Sua reflexão
          </h1>

          {/* Theme Banner */}
          <div className="mt-3 rounded-xl border border-line bg-paper p-3">
            <p className="text-base sm:text-lg font-bold text-ink">
              <span className="font-semibold text-accent">Tema:</span> &ldquo;{sessao.tema}&rdquo;
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-2.5 text-xs text-ink-muted">
              <span className="flex items-center gap-1">
                <Layers className="h-3 w-3 text-accent" />
                <span>
                  Tirada de {sessao.tipoTirada} {sessao.tipoTirada === 1 ? "carta" : "cartas"}
                </span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-emerald-700" />
                  <span className="text-emerald-700 font-medium">
                    {totalRespondidas} de {totalCartas} carta{totalCartas > 1 ? "s" : ""} com reflexão
                  </span>
                </span>
            </div>
          </div>
        </header>

        {/* Detailed Cards and Answers (Clean hairline dividers) */}
        <div className="mt-6 divide-y divide-line">
          {sessao.cartas.map((carta, cIdx) => (
            <section
              key={carta.id}
              className="pt-8 first:pt-0 space-y-6"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-line pb-3.5">
                <div className="flex items-center gap-3">
                  {carta.imagemFrente && (
                    <div className="relative h-16 w-11 shrink-0 overflow-hidden rounded-lg border border-line bg-paper-raised shadow-clean">
                      <img
                        src={carta.imagemFrente}
                        alt={carta.titulo}
                        className="h-full w-full object-cover select-none"
                      />
                    </div>
                  )}
                  <div>
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span className="font-mono text-sm font-bold text-accent">
                        {carta.numeroRomano}
                      </span>
                      <h2 className="text-lg sm:text-xl font-bold text-ink">
                        {carta.titulo}
                      </h2>
                    </div>
                    {(carta.subtitulo || TODAS_AS_CARTAS.find((d) => d.titulo === carta.titulo)?.subtitulo) && (
                      <p className="text-xs text-ink-muted italic mt-0.5">
                        {carta.subtitulo || TODAS_AS_CARTAS.find((d) => d.titulo === carta.titulo)?.subtitulo}
                      </p>
                    )}
                  </div>
                </div>

                <span className="font-mono text-xs text-ink-muted">
                  Carta {cIdx + 1} de {totalCartas}
                </span>
              </div>

              {/* Questions and Answers */}
              <div className="space-y-6 pl-2">
                {carta.perguntas.map((pq, pIdx) => (
                  <div key={`resumo-pq-${pIdx}`} className="space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-xs font-bold text-accent mt-0.5">
                        {pIdx + 1}.
                      </span>
                      <h3 className="text-sm font-semibold text-ink leading-snug">
                        {pq.pergunta}
                      </h3>
                    </div>
                  </div>
                ))}

                {/* Single combined reflection (stored in first question's resposta) */}
                {carta.perguntas[0]?.resposta && carta.perguntas[0].resposta.trim().length > 0 && (
                  <div className="pl-4 border-l-2 border-accent mt-4">
                    <p className="text-sm text-ink leading-relaxed whitespace-pre-wrap">
                      {carta.perguntas[0].resposta}
                    </p>
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>

        {/* ============================================================== */}
        {/* FUTURE AI INTEGRATION MODULE (Compact)                         */}
        {/* ============================================================== */}
        <div className="no-print mt-6 rounded-xl border border-line bg-paper p-3 sm:p-4 shadow-clean">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-accent shrink-0" />
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-ink">
                  Aprofundamento com Inteligência Artificial
                </h4>
                <p className="text-[11px] text-ink-muted leading-tight">
                  Analise esta reflexão em IAs generativas (ChatGPT, Claude ou Gemini).
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(promptIA);
                  onCopiarReflexao();
                }}
                className="flex items-center gap-1 rounded-md border border-line bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent hover:bg-accent hover:text-white transition-colors shadow-clean focus-visible:outline-2 focus-visible:outline-accent"
              >
                <Copy className="h-3 w-3" />
                <span>Copiar Prompt</span>
              </button>
              <button
                onClick={() => setExpandirPromptIA(!expandirPromptIA)}
                className="flex items-center gap-1 rounded-md border border-line bg-paper-raised px-2.5 py-1 text-xs font-medium text-ink-muted hover:text-ink transition-colors shadow-clean focus-visible:outline-2 focus-visible:outline-accent"
              >
                <span>{expandirPromptIA ? "Ocultar" : "Ver"}</span>
                {expandirPromptIA ? (
                  <ChevronUp className="h-3 w-3" />
                ) : (
                  <ChevronDown className="h-3 w-3" />
                )}
              </button>
            </div>
          </div>

          {expandirPromptIA && (
            <div className="mt-2.5 border-t border-line pt-2.5">
              <pre className="max-h-48 overflow-y-auto rounded-lg border border-line bg-paper-raised p-3 text-[11px] font-mono text-ink whitespace-pre-wrap leading-relaxed">
                {promptIA}
              </pre>
            </div>
          )}
        </div>
      </article>

      {/* Bottom Repeat Actions */}
      <div className="no-print mt-8 flex items-center justify-between border-t border-line pt-6">
        <button
          onClick={onVoltarRevisar}
          className="flex items-center gap-2 text-xs sm:text-sm text-ink-muted hover:text-ink transition-colors focus-visible:outline-2 focus-visible:outline-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar para revisar respostas</span>
        </button>

        <button
          onClick={onNovaTirada}
          className="flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-clean hover:bg-accent/90 transition-colors focus-visible:outline-2 focus-visible:outline-accent"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Iniciar Nova Tirada</span>
        </button>
      </div>
    </div>
  );
}
