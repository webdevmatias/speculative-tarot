import React from "react";
import { Compass } from "lucide-react";

export function Footer() {
  return (
    <footer className="no-print mt-auto border-t border-line bg-paper py-8 text-ink-muted text-xs">
      <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <Compass className="h-4 w-4 text-accent" />
          <span className="font-display font-semibold text-ink">
            Tarot Especulativo
          </span>
          <span>— Ferramenta de Exploração de Futuros & Design Crítico</span>
        </div>

        <div>
          <span>12 Arquétipos Oficiais • 50 Temas de Investigação</span>
        </div>
      </div>
    </footer>
  );
}
