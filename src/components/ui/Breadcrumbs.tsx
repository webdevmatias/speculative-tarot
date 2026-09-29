"use client";

import React from "react";
import { ChevronRight } from "lucide-react";

export type EtapaFluxo = "tema" | "tirada" | "mesa" | "perguntas" | "resumo";

interface BreadcrumbsProps {
  etapaAtual: EtapaFluxo;
  onNavegar?: (etapa: EtapaFluxo) => void;
  temTema?: boolean;
  temCartas?: boolean;
  className?: string;
}

export function Breadcrumbs({
  etapaAtual,
  onNavegar,
  temTema = true,
  temCartas = false,
  className = "",
}: BreadcrumbsProps) {
  const etapas: Array<{ id: EtapaFluxo; label: string; habilitado: boolean }> = [
    { id: "tema", label: "Tema", habilitado: true },
    { id: "tirada", label: "Tirada", habilitado: temTema },
    { id: "mesa", label: "Mesa", habilitado: temCartas },
    { id: "perguntas", label: "Perguntas", habilitado: temCartas },
    { id: "resumo", label: "Síntese", habilitado: temCartas },
  ];

  return (
    <nav
      aria-label="Breadcrumb de Etapas"
      className={`flex items-center justify-center gap-1 sm:gap-2 text-[12px] sm:text-xs py-1.5 px-3 select-none ${className}`}
    >
      {etapas.map((etp, idx) => {
        const isAtual = etapaAtual === etp.id;
        const podeClicar = onNavegar && etp.habilitado && !isAtual;

        return (
          <React.Fragment key={etp.id}>
            {idx > 0 && (
              <ChevronRight className="h-3 w-3 text-ink-muted/40 shrink-0" />
            )}
            <button
              type="button"
              disabled={!podeClicar}
              onClick={() => podeClicar && onNavegar?.(etp.id)}
              className={`rounded-md px-2 py-0.5 font-medium transition-all ${isAtual
                ? "bg-accent text-white font-semibold shadow-clean"
                : podeClicar
                  ? "text-ink-muted hover:text-ink hover:bg-accent-soft/70 cursor-pointer"
                  : "text-ink-muted/50 cursor-default"
                }`}
            >
              {etp.label}
            </button>
          </React.Fragment>
        );
      })}
    </nav>
  );
}
