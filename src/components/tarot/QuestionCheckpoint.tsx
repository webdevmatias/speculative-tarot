"use client";

import React, { useState } from "react";
import { Check, Edit3 } from "lucide-react";

interface QuestionCheckpointProps {
  numero: number;
  pergunta: string;
  resposta: string;
  corPrimaria: string;
  corBorda: string;
  isUltima: boolean;
  onSalvarResposta: (novaResposta: string) => void;
}

export function QuestionCheckpoint({
  numero,
  pergunta,
  resposta,
  isUltima,
  onSalvarResposta,
}: QuestionCheckpointProps) {
  const [localText, setLocalText] = useState(resposta || "");
  const [isFocused, setIsFocused] = useState(false);

  const foiRespondida = localText.trim().length > 0;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setLocalText(val);
    onSalvarResposta(val);
  };

  return (
    <div className="relative flex items-start gap-4 sm:gap-6">
      {/* ============================================================== */}
      {/* VERTICAL TRAIL COLUMN (Checkpoint Node & Connector Line)       */}
      {/* ============================================================== */}
      <div className="relative flex flex-col items-center">
        {/* Node Circle */}
        <div
          className={`relative z-10 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border-2 transition-all duration-200 ${
            foiRespondida
              ? "border-emerald-600 bg-emerald-50 text-emerald-700 shadow-clean"
              : isFocused
              ? "border-accent bg-paper-raised text-accent shadow-clean"
              : "border-line bg-paper text-ink-muted"
          }`}
        >
          {foiRespondida ? (
            <Check className="h-4 w-4 stroke-[2.5]" />
          ) : (
            <span className="font-mono text-xs font-semibold">{numero}</span>
          )}
        </div>

        {/* Vertical Connecting Line */}
        {!isUltima && (
          <div
            className={`w-0.5 flex-1 transition-colors duration-300 my-1 ${
              foiRespondida ? "bg-emerald-600" : "bg-line"
            }`}
            style={{
              minHeight: "140px",
            }}
          />
        )}
      </div>

      {/* ============================================================== */}
      {/* QUESTION & TEXTAREA BOX                                        */}
      {/* ============================================================== */}
      <div className="flex-1 pb-6">
        <div
          className={`rounded-2xl border p-5 sm:p-6 transition-all duration-200 ${
            isFocused
              ? "border-accent bg-paper-raised shadow-clean"
              : "border-line bg-paper-raised shadow-clean hover:border-accent/40"
          }`}
        >
          {/* Question Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2">
              <span className="mt-0.5 inline-block font-mono text-xs font-bold uppercase tracking-wider text-accent">
                P{numero}
              </span>
              <h4 className="text-sm font-semibold leading-relaxed text-ink sm:text-base">
                {pergunta}
              </h4>
            </div>

            {/* Status Badge */}
            <span
              className={`shrink-0 rounded-lg px-2.5 py-0.5 text-xs font-medium transition-colors ${
                foiRespondida
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold"
                  : "bg-paper text-ink-muted border border-line"
              }`}
            >
              {foiRespondida ? "Registrado" : "Em aberto"}
            </span>
          </div>

          {/* Textarea Input */}
          <div className="mt-4 relative">
            <textarea
              value={localText}
              onChange={handleChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              rows={4}
              aria-label={`Resposta para a pergunta ${numero}: ${pergunta}`}
              placeholder="Descreva suas hipóteses, tensões, consequências inesperadas ou reflexões..."
              className="w-full resize-y rounded-lg border border-line bg-paper p-3.5 text-sm text-ink placeholder:text-ink-muted/60 outline-none transition-colors focus:border-accent focus:bg-paper-raised focus:ring-1 focus:ring-accent leading-relaxed"
            />

            {/* Bottom info bar */}
            <div className="mt-2 flex items-center justify-between text-xs text-ink-muted">
              <span className="flex items-center gap-1">
                <Edit3 className="h-3.5 w-3.5" />
                <span>Salvo automaticamente</span>
              </span>
              <span className="font-mono text-[11px]">
                {localText.length} caracteres
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
