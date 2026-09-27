"use client";

import React from "react";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmationModalProps {
  aberto: boolean;
  titulo: string;
  mensagem: string;
  textoConfirmar?: string;
  textoCancelar?: string;
  onConfirmar: () => void;
  onCancelar: () => void;
}

export function ConfirmationModal({
  aberto,
  titulo,
  mensagem,
  textoConfirmar = "Confirmar e Recomeçar",
  textoCancelar = "Continuar Tirada Atual",
  onConfirmar,
  onCancelar,
}: ConfirmationModalProps) {
  if (!aberto) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl border border-line bg-paper-raised p-6 shadow-clean">
        <button
          onClick={onCancelar}
          className="absolute top-4 right-4 text-ink-muted hover:text-ink transition-colors focus-visible:outline-2 focus-visible:outline-accent rounded-lg p-1"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-amber-200 bg-amber-50 text-amber-700">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <h3 className="text-base font-bold text-ink">{titulo}</h3>
        </div>

        <p className="mt-3 text-sm text-ink-muted leading-relaxed">
          {mensagem}
        </p>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={onCancelar}
            className="rounded-lg border border-line bg-paper-raised px-4 py-2 text-xs font-medium text-ink shadow-clean hover:bg-accent-soft hover:text-accent transition-colors focus-visible:outline-2 focus-visible:outline-accent"
          >
            {textoCancelar}
          </button>
          <button
            onClick={onConfirmar}
            className="rounded-lg bg-rose-700 px-4 py-2 text-xs font-semibold text-white shadow-clean hover:bg-rose-800 transition-colors focus-visible:outline-2 focus-visible:outline-accent"
          >
            {textoConfirmar}
          </button>
        </div>
      </div>
    </div>
  );
}
