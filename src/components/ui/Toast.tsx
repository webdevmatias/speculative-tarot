"use client";

import React, { useEffect } from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

interface ToastProps {
  mensagem: string;
  tipo?: "sucesso" | "info" | "alerta";
  visivel: boolean;
  onFechar: () => void;
}

export function Toast({ mensagem, tipo = "sucesso", visivel, onFechar }: ToastProps) {
  useEffect(() => {
    if (visivel) {
      const timer = setTimeout(() => {
        onFechar();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [visivel, onFechar]);

  if (!visivel) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex max-w-md items-center gap-3 rounded-lg border border-line bg-paper-raised px-4 py-3 text-sm text-ink shadow-clean animate-in fade-in slide-in-from-bottom-5">
      {tipo === "sucesso" ? (
        <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-700" />
      ) : (
        <AlertCircle className="h-5 w-5 shrink-0 text-amber-700" />
      )}
      <p className="flex-1 font-medium">{mensagem}</p>
      <button
        onClick={onFechar}
        className="rounded-lg p-1 text-ink-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-accent"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
