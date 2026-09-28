import React from "react";
import { Compass } from "lucide-react";

export function Footer() {
  return (
    <footer className="no-print shrink-0 border-t border-[#2D225A] bg-[#1C1733] py-2.5 px-4 text-purple-200/75 text-[11px]">
      <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between gap-2 sm:px-4">
        <div className="flex items-center gap-2">
          <Compass className="h-3.5 w-3.5 text-purple-300" />
          <span className="font-display font-semibold text-white">
            Tarô Especulativo
          </span>
          <span>— Design Especulativo & Pensamento de Futuros</span>
        </div>

        <div>
          <span>12 Arquétipos Oficiais • 50 Cenários Críticos</span>
        </div>
      </div>
    </footer>
  );
}
