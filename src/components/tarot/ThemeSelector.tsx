"use client";

import React, { useState, useMemo } from "react";
import { Search, PlusCircle, Check, ArrowRight, ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { TODOS_OS_TEMAS, CATEGORIAS_TEMAS } from "@/lib/data";
import { Tema } from "@/types/tarot";
import { Breadcrumbs, EtapaFluxo } from "@/components/ui/Breadcrumbs";

interface ThemeSelectorProps {
  temaSelecionado: string;
  onSelecionarTema: (tema: string) => void;
  onAvancar: () => void;
  onVoltar: () => void;
  onNavegarEtapa?: (etapa: EtapaFluxo) => void;
}

export function ThemeSelector({
  temaSelecionado,
  onSelecionarTema,
  onAvancar,
  onVoltar,
  onNavegarEtapa,
}: ThemeSelectorProps) {
  const [modo, setModo] = useState<"predefinido" | "personalizado">("predefinido");
  const [termoBusca, setTermoBusca] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  const [temaPersonalizadoTexto, setTemaPersonalizadoTexto] = useState("");
  const [quantidadeExibida, setQuantidadeExibida] = useState(3);

  // Filter predefined themes
  const temasFiltrados = useMemo(() => {
    return TODOS_OS_TEMAS.filter((tema) => {
      const correspondeCategoria =
        categoriaAtiva === "Todos" || tema.categoria === categoriaAtiva;
      const correspondeBusca =
        termoBusca.trim() === "" ||
        tema.titulo.toLowerCase().includes(termoBusca.toLowerCase()) ||
        tema.descricao.toLowerCase().includes(termoBusca.toLowerCase());
      return correspondeCategoria && correspondeBusca;
    });
  }, [termoBusca, categoriaAtiva]);

  const handleEscolherPredefinido = (tema: Tema) => {
    onSelecionarTema(tema.titulo);
  };

  const temaValido = temaSelecionado.trim().length > 0;

  return (
    <div className="mx-auto max-w-5xl px-4 py-4 sm:py-6 flex flex-col justify-between">
      {/* Breadcrumbs Navigation (Replaces 'Etapa 1 de 3') */}
      <div className="flex justify-center mb-4 sm:mb-5">
        <Breadcrumbs
          etapaAtual="tema"
          onNavegar={(etp) => {
            if (etp === "tirada" && temaValido) onAvancar();
            else onNavegarEtapa?.(etp);
          }}
          temTema={temaValido}
        />
      </div>

      {/* Header */}
      <div className="text-center max-w-xl mx-auto">
        <h2 className="mt-1 font-display text-xl sm:text-2xl font-bold tracking-tight text-ink">
          Escolha o Tema de Investigação
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-ink-muted">
          Selecione um cenário especulativo pré-configurado ou defina sua própria hipótese de futuro.
        </p>
      </div>

      {/* Tabs: Predefinidos vs Personalizado */}
      <div className="mt-3 sm:mt-4 flex justify-center">
        <div className="inline-flex rounded-lg border border-line bg-paper p-1 shadow-clean">
          <button
            onClick={() => setModo("predefinido")}
            className={`flex items-center gap-2 rounded-lg px-4 py-1.5 text-xs sm:text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-accent ${
              modo === "predefinido"
                ? "bg-accent-soft text-accent border border-accent/20 shadow-clean"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            <span>Temas Predefinidos (50)</span>
          </button>
          <button
            onClick={() => {
              setModo("personalizado");
              if (temaPersonalizadoTexto) {
                onSelecionarTema(temaPersonalizadoTexto);
              }
            }}
            className={`flex items-center gap-2 rounded-lg px-4 py-1.5 text-xs sm:text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-accent ${
              modo === "personalizado"
                ? "bg-accent-soft text-accent border border-accent/20 shadow-clean"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            <PlusCircle className="h-4 w-4" />
            <span>Criar meu próprio tema</span>
          </button>
        </div>
      </div>

      {/* Mode 1: Predefined Themes */}
      {modo === "predefinido" && (
        <div className="mt-3 sm:mt-4">
          {/* Search bar & Category filters */}
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-ink-muted" />
              <input
                type="text"
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
                placeholder="Buscar temas (ex: IA, genética, trabalho, memória, clima)..."
                className="w-full rounded-lg border border-line bg-paper-raised py-3 pl-10 pr-4 text-sm text-ink placeholder:text-ink-muted/60 outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>

            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {CATEGORIAS_TEMAS.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoriaAtiva(cat)}
                  className={`shrink-0 rounded-lg px-3 py-1 text-xs font-medium transition-all focus-visible:outline-2 focus-visible:outline-accent ${
                    categoriaAtiva === cat
                      ? "border border-accent bg-accent text-white"
                      : "border border-line bg-paper-raised text-ink-muted hover:border-accent/40 hover:text-ink"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Themes Grid (Max 3 themes initially for compact 1-screen fit) */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 p-1">
            {temasFiltrados.slice(0, quantidadeExibida).map((tema) => {
              const isSelected = temaSelecionado === tema.titulo;
              return (
                <div
                  key={tema.id}
                  onClick={() => handleEscolherPredefinido(tema)}
                  className={`group relative cursor-pointer rounded-xl border p-4 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-accent flex flex-col justify-between ${
                    isSelected
                      ? "border-accent bg-accent-soft shadow-clean ring-1 ring-accent"
                      : "border-line bg-paper-raised hover:border-accent/40 hover:bg-accent-soft/30 shadow-clean"
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-mono text-[10px] text-ink-muted">
                        #{tema.id.toString().padStart(2, "0")}
                      </span>
                      <span className="rounded-md bg-paper border border-line px-2 py-0.5 text-[10px] text-ink-muted">
                        {tema.categoria}
                      </span>
                    </div>

                    <h3 className="mt-1.5 text-sm sm:text-base font-semibold text-ink leading-snug">
                      {tema.titulo}
                    </h3>

                    <p className="mt-1.5 text-xs text-ink-muted line-clamp-2 leading-relaxed">
                      {tema.descricao}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-line pt-2.5">
                    <span className="text-[11px] font-medium text-ink-muted">
                      {isSelected ? "Tema selecionado" : "Clique para selecionar"}
                    </span>
                    <div
                      className={`flex h-4 w-4 items-center justify-center rounded-full border transition-all ${
                        isSelected
                          ? "border-accent bg-accent text-white"
                          : "border-line bg-paper group-hover:border-accent/40"
                      }`}
                    >
                      {isSelected && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                    </div>
                  </div>
                </div>
              );
            })}

            {temasFiltrados.length === 0 && (
              <div className="col-span-full py-8 text-center">
                <p className="text-xs text-ink-muted">
                  Nenhum tema encontrado com o termo &ldquo;{termoBusca}&rdquo;.
                </p>
                <button
                  onClick={() => {
                    setTermoBusca("");
                    setCategoriaAtiva("Todos");
                  }}
                  className="mt-1 text-xs text-accent hover:underline focus-visible:outline-2 focus-visible:outline-accent"
                >
                  Limpar filtros
                </button>
              </div>
            )}
          </div>

          {/* Show More / Show Less Controls */}
          {temasFiltrados.length > 3 && (
            <div className="mt-3 flex items-center justify-center gap-2">
              {quantidadeExibida < temasFiltrados.length ? (
                <button
                  type="button"
                  onClick={() => setQuantidadeExibida((prev) => prev + 3)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-paper-raised px-4 py-1.5 text-xs font-semibold text-accent hover:bg-accent-soft transition-colors shadow-clean"
                >
                  <ChevronDown className="h-3.5 w-3.5" />
                  <span>Mostrar mais temas ({temasFiltrados.length - quantidadeExibida} restantes)</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setQuantidadeExibida(3)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-paper-raised px-3.5 py-1.5 text-xs font-medium text-ink-muted hover:text-ink transition-colors shadow-clean"
                >
                  <ChevronUp className="h-3.5 w-3.5" />
                  <span>Recolher para 3 temas</span>
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Mode 2: Custom Theme */}
      {modo === "personalizado" && (
        <div className="mt-8 max-w-2xl mx-auto rounded-2xl border border-line bg-paper-raised p-6 sm:p-8 shadow-clean">
          <div className="flex items-center gap-2 text-xs font-semibold text-accent uppercase tracking-wider">
            <PlusCircle className="h-4 w-4" />
            <span>Defina seu Cenário Especulativo</span>
          </div>

          <h3 className="mt-2 text-lg font-bold text-ink">
            Qual futuro, tecnologia ou hipótese você deseja investigar?
          </h3>

          <p className="mt-1 text-xs text-ink-muted">
            Formule uma pergunta ou descreva uma condição de futuro alternativo.
          </p>

          <div className="mt-4">
            <textarea
              rows={4}
              value={temaPersonalizadoTexto}
              onChange={(e) => {
                setTemaPersonalizadoTexto(e.target.value);
                onSelecionarTema(e.target.value);
              }}
              placeholder="Exemplo: Como seria uma sociedade onde humanos vivem 200 anos? Ou: Um sistema de crédito social baseado na pegada de carbono individual."
              className="w-full rounded-lg border border-line bg-paper p-4 text-sm text-ink placeholder:text-ink-muted/60 outline-none transition-colors focus:border-accent focus:bg-paper-raised focus:ring-1 focus:ring-accent"
            />
          </div>

          {/* Quick Inspirations */}
          <div className="mt-4">
            <span className="text-[11px] font-medium text-ink-muted uppercase tracking-wider">
              Sugestões rápidas:
            </span>
            <div className="mt-2 flex flex-wrap gap-2">
              {[
                "Como seria uma sociedade onde humanos vivem 200 anos?",
                "E se todo trabalho intelectual fosse automatizado por agentes de IA?",
                "Um sistema judiciário totalmente gerido por algoritmos preditivos.",
                "E se o sono biológico pudesse ser substituído por recargas eletromagnéticas?",
              ].map((exemplo) => (
                <button
                  key={exemplo}
                  onClick={() => {
                    setTemaPersonalizadoTexto(exemplo);
                    onSelecionarTema(exemplo);
                  }}
                  className="rounded-lg border border-line bg-paper px-3 py-1.5 text-xs text-ink-muted transition-colors hover:border-accent/40 hover:bg-accent-soft hover:text-accent text-left focus-visible:outline-2 focus-visible:outline-accent"
                >
                  &ldquo;{exemplo}&rdquo;
                </button>
              ))}
            </div>
          </div>
        </div>
      )}



      {/* Bottom Actions */}
      <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
        <button
          onClick={onVoltar}
          className="flex items-center gap-1.5 rounded-lg border border-line bg-paper-raised px-3.5 py-1.5 text-xs font-medium text-ink shadow-clean transition-colors hover:bg-accent-soft hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Início</span>
        </button>

        <button
          onClick={onAvancar}
          disabled={!temaValido}
          className="flex items-center gap-1.5 rounded-lg bg-accent px-5 py-1.5 text-xs font-semibold text-white shadow-clean transition-colors hover:bg-accent/90 disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-accent"
        >
          <span>Escolher Tirada</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
