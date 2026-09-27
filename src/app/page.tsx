"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Toast } from "@/components/ui/Toast";
import { HomeScreen } from "@/components/tarot/HomeScreen";
import { ThemeSelector } from "@/components/tarot/ThemeSelector";
import { SpreadSelector } from "@/components/tarot/SpreadSelector";
import { CardTable } from "@/components/tarot/CardTable";
import { QuestionTrail } from "@/components/tarot/QuestionTrail";
import { ReadingNavigation } from "@/components/tarot/ReadingNavigation";
import { ReadingSummary } from "@/components/tarot/ReadingSummary";
import { ConfirmationModal } from "@/components/tarot/ConfirmationModal";
import { sortearCartas } from "@/lib/data";
import {
  carregarSessao,
  salvarSessao,
  limparSessao,
  exportarComoMarkdown,
} from "@/lib/storage";
import { CartaSessao, SessaoTarot, TipoTirada } from "@/types/tarot";

export default function TarotEspeculativoApp() {
  const [etapa, setEtapa] = useState<"inicio" | "tema" | "tirada" | "mesa" | "resumo">("inicio");
  const [tema, setTema] = useState<string>("");
  const [tipoTirada, setTipoTirada] = useState<TipoTirada>(3);
  const [cartas, setCartas] = useState<CartaSessao[]>([]);
  const [cartaAtivaIndex, setCartaAtivaIndex] = useState<number>(0);
  const [sessaoSalva, setSessaoSalva] = useState<SessaoTarot | null>(null);

  // UI state
  const [modalConfirmacaoAberto, setModalConfirmacaoAberto] = useState(false);
  const [toast, setToast] = useState<{ visivel: boolean; mensagem: string }>({
    visivel: false,
    mensagem: "",
  });

  // Check saved session on mount
  useEffect(() => {
    const salva = carregarSessao();
    if (salva) {
      setSessaoSalva(salva);
    }
  }, []);

  // Helper to persist current session
  const persistirEstado = useCallback(
    (novasCartas: CartaSessao[], novaEtapa = etapa, novoTema = tema, novoTipo = tipoTirada, novoIndex = cartaAtivaIndex) => {
      if (!novoTema || novasCartas.length === 0) return;
      const sessaoAtual: SessaoTarot = {
        tema: novoTema,
        tipoTirada: novoTipo,
        cartas: novasCartas,
        cartaAtualIndex: novoIndex,
        etapa: novaEtapa,
        dataCriacao: sessaoSalva?.dataCriacao || new Date().toISOString(),
        ultimaModificacao: new Date().toISOString(),
      };
      salvarSessao(sessaoAtual);
      setSessaoSalva(sessaoAtual);
    },
    [etapa, tema, tipoTirada, cartaAtivaIndex, sessaoSalva]
  );

  // Resume saved session
  const handleContinuarSessao = () => {
    if (!sessaoSalva) return;
    setTema(sessaoSalva.tema);
    setTipoTirada(sessaoSalva.tipoTirada);
    setCartas(sessaoSalva.cartas);
    setCartaAtivaIndex(sessaoSalva.cartaAtualIndex || 0);
    setEtapa(sessaoSalva.etapa || "mesa");
  };

  // Start new reading flow
  const handleIniciarNovaTirada = () => {
    const temRespostas = cartas.some((c) =>
      c.perguntas.some((p) => p.resposta && p.resposta.trim().length > 0)
    );

    if (temRespostas && etapa !== "inicio" && etapa !== "resumo") {
      setModalConfirmacaoAberto(true);
      return;
    }

    executarNovaTirada();
  };

  const executarNovaTirada = () => {
    setModalConfirmacaoAberto(false);
    limparSessao();
    setSessaoSalva(null);
    setTema("");
    setTipoTirada(3);
    setCartas([]);
    setCartaAtivaIndex(0);
    setEtapa("tema");
  };

  // From Theme to Spread selection
  const handleAvancarParaTirada = () => {
    if (!tema.trim()) return;
    setEtapa("tirada");
  };

  // Draw cards and lay them on the table
  const handleIniciarMesa = () => {
    if (!tema.trim()) return;

    // Fisher-Yates draw from official 12 cards in cartas.json
    const sorteadas = sortearCartas(tipoTirada);

    const novasCartas: CartaSessao[] = sorteadas.map((def, idx) => ({
      id: `slot-${idx}-${def.id}`,
      cartaId: def.id,
      titulo: def.titulo,
      numeroRomano: def.numeroRomano,
      subtitulo: def.subtitulo,
      corPrimaria: def.corPrimaria,
      corBorda: def.corBorda,
      corGradiente: def.corGradiente,
      corGlow: def.corGlow,
      iconeNome: def.iconeNome,
      virada: false, // Initially face down!
      perguntas: def.perguntas.map((p) => ({
        pergunta: p,
        resposta: "",
      })),
    }));

    setCartas(novasCartas);
    setCartaAtivaIndex(0);
    setEtapa("mesa");
    persistirEstado(novasCartas, "mesa", tema, tipoTirada, 0);
  };

  // Flip card (reveals card face and questions trail)
  const handleVirarCarta = (index: number) => {
    const novasCartas = [...cartas];
    novasCartas[index] = {
      ...novasCartas[index],
      virada: true,
    };
    setCartas(novasCartas);
    setCartaAtivaIndex(index);
    persistirEstado(novasCartas, "mesa", tema, tipoTirada, index);
  };

  // Select card in 3 or 6 card spread
  const handleSelecionarCarta = (index: number) => {
    setCartaAtivaIndex(index);
    persistirEstado(cartas, "mesa", tema, tipoTirada, index);
  };

  // Update a question's response in the reflection trail
  const handleAtualizarResposta = (perguntaIndex: number, novaResposta: string) => {
    const novasCartas = [...cartas];
    const cartaModificada = { ...novasCartas[cartaAtivaIndex] };
    const novasPerguntas = [...cartaModificada.perguntas];

    novasPerguntas[perguntaIndex] = {
      ...novasPerguntas[perguntaIndex],
      resposta: novaResposta,
    };

    cartaModificada.perguntas = novasPerguntas;
    novasCartas[cartaAtivaIndex] = cartaModificada;

    setCartas(novasCartas);
    persistirEstado(novasCartas, "mesa", tema, tipoTirada, cartaAtivaIndex);
  };

  // Next card in spread
  const handleProximaCarta = () => {
    if (cartaAtivaIndex < cartas.length - 1) {
      const proximo = cartaAtivaIndex + 1;
      setCartaAtivaIndex(proximo);
      // Auto-reveal if next card was face down
      if (!cartas[proximo].virada) {
        handleVirarCarta(proximo);
      } else {
        persistirEstado(cartas, "mesa", tema, tipoTirada, proximo);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Previous card in spread
  const handleCartaAnterior = () => {
    if (cartaAtivaIndex > 0) {
      const anterior = cartaAtivaIndex - 1;
      setCartaAtivaIndex(anterior);
      persistirEstado(cartas, "mesa", tema, tipoTirada, anterior);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Go to final summary
  const handleIrParaResumo = () => {
    setEtapa("resumo");
    persistirEstado(cartas, "resumo", tema, tipoTirada, cartaAtivaIndex);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Copy reflection to clipboard
  const handleCopiarReflexao = () => {
    const sessaoAtual: SessaoTarot = {
      tema,
      tipoTirada,
      cartas,
      cartaAtualIndex: cartaAtivaIndex,
      etapa,
      dataCriacao: sessaoSalva?.dataCriacao || new Date().toISOString(),
      ultimaModificacao: new Date().toISOString(),
    };
    const md = exportarComoMarkdown(sessaoAtual);
    navigator.clipboard.writeText(md).then(() => {
      setToast({
        visivel: true,
        mensagem: "Reflexão completa copiada para a área de transferência!",
      });
    });
  };

  const cartaAtiva = cartas[cartaAtivaIndex];

  return (
    <div
      className="flex min-h-screen flex-col bg-paper text-ink selection:bg-accent-soft selection:text-accent"
      suppressHydrationWarning
    >
      {/* Navigation Header */}
      <Navbar
        etapa={etapa}
        onNovaTirada={handleIniciarNovaTirada}
        onIrInicio={() => setEtapa("inicio")}
        temSessaoAtiva={cartas.length > 0}
      />

      {/* Main Container */}
      <main className="flex-1">
        {/* Step 0: Home Screen */}
        {etapa === "inicio" && (
          <HomeScreen
            sessaoSalva={sessaoSalva}
            onIniciarNovaTirada={handleIniciarNovaTirada}
            onContinuarSessao={handleContinuarSessao}
          />
        )}

        {/* Step 1: Theme Selection */}
        {etapa === "tema" && (
          <ThemeSelector
            temaSelecionado={tema}
            onSelecionarTema={setTema}
            onAvancar={handleAvancarParaTirada}
            onVoltar={() => setEtapa("inicio")}
          />
        )}

        {/* Step 2: Spread Selection */}
        {etapa === "tirada" && (
          <SpreadSelector
            tema={tema}
            tipoSelecionado={tipoTirada}
            onSelecionarTipo={setTipoTirada}
            onIniciarMesa={handleIniciarMesa}
            onVoltar={() => setEtapa("tema")}
          />
        )}

        {/* Step 3: Tarot Card Table & Question Trail */}
        {etapa === "mesa" && cartaAtiva && (
          <div className="pb-24">
            {/* The Physical Card Table */}
            <CardTable
              tema={tema}
              tipoTirada={tipoTirada}
              cartas={cartas}
              cartaAtivaIndex={cartaAtivaIndex}
              onSelecionarCarta={handleSelecionarCarta}
              onVirarCarta={handleVirarCarta}
            />

            {/* Questions Trail (Appears outside and below the card) */}
            {cartaAtiva.virada ? (
              <QuestionTrail
                carta={cartaAtiva}
                cartaIndex={cartaAtivaIndex}
                totalCartas={cartas.length}
                onAtualizarResposta={handleAtualizarResposta}
                onProximaCarta={cartaAtivaIndex < cartas.length - 1 ? handleProximaCarta : undefined}
                onCartaAnterior={cartaAtivaIndex > 0 ? handleCartaAnterior : undefined}
                onVerResumo={handleIrParaResumo}
              />
            ) : (
              <div className="mt-8 text-center px-4">
                <p className="text-sm text-ink-muted">
                  Esta carta ainda está virada para baixo. Toque nela na mesa acima para revelar suas perguntas.
                </p>
              </div>
            )}

            {/* Bottom Timeline Navigation for 3 and 6 card spreads */}
            {tipoTirada > 1 && (
              <ReadingNavigation
                cartas={cartas}
                cartaAtivaIndex={cartaAtivaIndex}
                onSelecionarCarta={handleSelecionarCarta}
                onVerResumo={handleIrParaResumo}
              />
            )}
          </div>
        )}

        {/* Step 4: Final Summary Screen */}
        {etapa === "resumo" && (
          <ReadingSummary
            sessao={{
              tema,
              tipoTirada,
              cartas,
              cartaAtualIndex: cartaAtivaIndex,
              etapa: "resumo",
              dataCriacao: sessaoSalva?.dataCriacao || new Date().toISOString(),
              ultimaModificacao: new Date().toISOString(),
            }}
            onVoltarRevisar={() => setEtapa("mesa")}
            onNovaTirada={handleIniciarNovaTirada}
            onCopiarReflexao={handleCopiarReflexao}
          />
        )}
      </main>

      {/* Confirmation Modal */}
      <ConfirmationModal
        aberto={modalConfirmacaoAberto}
        titulo="Iniciar nova tirada?"
        mensagem="Você possui reflexões registradas nesta sessão. Se iniciar uma nova tirada, as respostas atuais serão substituídas."
        onConfirmar={executarNovaTirada}
        onCancelar={() => setModalConfirmacaoAberto(false)}
      />

      {/* Toast Notification */}
      <Toast
        mensagem={toast.mensagem}
        visivel={toast.visivel}
        onFechar={() => setToast({ visivel: false, mensagem: "" })}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
