import React from "react";

export function Footer() {
  return (
    <footer className="no-print w-full py-8 sm:py-10 px-4 text-center border-t border-line bg-paper-raised text-ink-muted">
      <div className="max-w-2xl mx-auto space-y-2.5">
        <p className="text-xs sm:text-sm font-medium text-ink">
          Desenvolvido por{" "}
          <span className="font-semibold text-accent">Lucas Matias</span>,{" "}
          <span className="font-semibold text-accent">Jeane Vitória</span> &amp;{" "}
          <span className="font-semibold text-accent">Brenno Araújo</span>
        </p>

        <p className="text-[11px] sm:text-xs leading-relaxed text-ink-muted/90">
          Adaptação desenvolvida para trabalho universitário da disciplina de{" "}
          <strong className="text-ink font-semibold">Design Especulativo</strong> da{" "}
          <strong className="text-ink font-semibold">UFRPE</strong> (Universidade Federal Rural de Pernambuco).
        </p>

        <p className="text-[10px] sm:text-[11px] text-ink-muted/70">
          A ideia não é autoral — projeto inspirado no{" "}
          <a
            href="https://tarotcardsoftech.artefactgroup.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline font-medium hover:text-accent/80 transition-colors"
          >
            The Tarot Cards of Tech
          </a>
          , criado pelo Artefact Group.
        </p>
      </div>
    </footer>
  );
}
