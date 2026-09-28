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
import { Breadcrumbs, EtapaFluxo } from "@/components/ui/Breadcrumbs";
import { sortearCartas, TODAS_AS_CARTAS } from "@/lib/data";
import {
  carregarSessao,
  salvarSessao,
  limparSessao,
  exportarComoMarkdown,
} from "@/lib/storage";
import { CartaSessao, SessaoTarot, TipoTirada } from "@/types/tarot";

export default function TarotEspeculativoApp() {
  const [etapa, setEtapa] = useState<"inicio" | "tema" | "tirada" | "mesa" | "perguntas" | "resumo">("inicio");
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

  const [montado, setMontado] = useState(false);

  // Check saved session on mount and mark client mounted
  useEffect(() => {
    setMontado(true);
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
    const cartasComImagens = sessaoSalva.cartas.map((c) => {
      const def = TODAS_AS_CARTAS.find((d) => d.id === c.cartaId || d.titulo === c.titulo);
      return {
        ...c,
        subtitulo: c.subtitulo || def?.subtitulo || "",
        numeroRomano: c.numeroRomano || def?.numeroRomano || "",
        imagemFrente: c.imagemFrente || def?.imagemFrente,
        imagemVerso: c.imagemVerso || def?.imagemVerso || "/assets/cartas/verso.png",
      };
    });
    setCartas(cartasComImagens);
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
      imagemFrente: def.imagemFrente,
      imagemVerso: def.imagemVerso,
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

  // Advance from Mesa (discovery) to Perguntas (questions cockpit)
  const handleAvancarParaPerguntas = () => {
    // Reveal first card if not already revealed
    if (cartas.length > 0 && !cartas[cartaAtivaIndex].virada) {
      handleVirarCarta(cartaAtivaIndex);
    }
    setEtapa("perguntas");
    persistirEstado(cartas, "perguntas", tema, tipoTirada, cartaAtivaIndex);
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  if (!montado) {
    return null;
  }

  return (
    <div
      className="flex h-screen max-h-screen w-full flex-col overflow-hidden bg-paper text-ink selection:bg-accent-soft selection:text-accent"
      suppressHydrationWarning
    >
      {/* Navigation Header */}
      <Navbar
        etapa={etapa}
        onNovaTirada={handleIniciarNovaTirada}
        onIrInicio={() => setEtapa("inicio")}
        temSessaoAtiva={cartas.length > 0}
        sessaoSalva={sessaoSalva}
        onContinuarSessao={handleContinuarSessao}
      />

      {/* Main Container: fills remaining viewport height and scrolls smoothly without clipping top content */}
      <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden flex flex-col">
        {/* Active Stage Screen wrapper */}
        <div className="flex-1 flex flex-col items-center w-full">
          {/* Step 0: Home Screen (Fills 1 full screen, pushing footer below the fold) */}
          {etapa === "inicio" && (
            <div className="h-[calc(100vh-48px)] min-h-[calc(100vh-48px)] shrink-0 flex flex-col justify-center items-center w-full py-2 sm:py-4">
              <HomeScreen
                sessaoSalva={sessaoSalva}
                onIniciarNovaTirada={handleIniciarNovaTirada}
                onContinuarSessao={handleContinuarSessao}
              />
            </div>
          )}

          {/* Step 1: Theme Selection */}
          {etapa === "tema" && (
            <div className="w-full pt-6 sm:pt-8 pb-12">
              <ThemeSelector
                temaSelecionado={tema}
                onSelecionarTema={setTema}
                onAvancar={handleAvancarParaTirada}
                onVoltar={() => setEtapa("inicio")}
                onNavegarEtapa={(etp) => setEtapa(etp)}
              />
            </div>
          )}

          {/* Step 2: Spread Selection */}
          {etapa === "tirada" && (
            <div className="w-full pt-6 sm:pt-8 pb-12">
              <SpreadSelector
                tema={tema}
                tipoSelecionado={tipoTirada}
                onSelecionarTipo={setTipoTirada}
                onIniciarMesa={handleIniciarMesa}
                onVoltar={() => setEtapa("tema")}
                onNavegarEtapa={(etp) => setEtapa(etp)}
              />
            </div>
          )}

          {/* Step 3: Tarot Card Table (Mesa de Descoberta) */}
          {etapa === "mesa" && cartaAtiva && (
            <div className="w-full pt-6 sm:pt-8 pb-12">
              <CardTable
                tema={tema}
                tipoTirada={tipoTirada}
                cartas={cartas}
                cartaAtivaIndex={cartaAtivaIndex}
                onSelecionarCarta={handleSelecionarCarta}
                onVirarCarta={handleVirarCarta}
                onNavegarEtapa={(etp) => setEtapa(etp)}
                onIrParaResumo={handleIrParaResumo}
                onVoltarParaTirada={() => setEtapa("tirada")}
                onAvancarParaPerguntas={handleAvancarParaPerguntas}
              />
            </div>
          )}

          {/* Step 4: Questions Trail (Etapa de Perguntas e Reflexão) */}
          {etapa === "perguntas" && cartaAtiva && (
            <div className="w-full pt-6 sm:pt-8 pb-28">
              {/* Breadcrumbs Navigation with generous bottom spacing */}
              <div className="flex justify-center mb-3 sm:mb-4">
                <Breadcrumbs
                  etapaAtual="perguntas"
                  onNavegar={(etp: EtapaFluxo) => setEtapa(etp)}
                  temTema={true}
                  temCartas={true}
                />
              </div>

              {/* Selected Theme Header (Clean & Minimalist) */}
              <div className="flex justify-center mb-3 px-4 text-center">
                <div className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-paper-raised px-3 py-1 text-xs text-ink shadow-clean">
                  <span className="font-semibold text-accent">Tema:</span>
                  <span className="font-bold text-ink">&ldquo;{tema}&rdquo;</span>
                </div>
              </div>

              {/* Questions Trail Cockpit */}
              <QuestionTrail
                carta={cartaAtiva}
                cartaIndex={cartaAtivaIndex}
                totalCartas={cartas.length}
                onAtualizarResposta={handleAtualizarResposta}
                onProximaCarta={cartaAtivaIndex < cartas.length - 1 ? handleProximaCarta : undefined}
                onCartaAnterior={cartaAtivaIndex > 0 ? handleCartaAnterior : undefined}
                onVerResumo={handleIrParaResumo}
              />

              {/* Fixed Bottom Cards Timeline Navigation */}
              <ReadingNavigation
                cartas={cartas}
                cartaAtivaIndex={cartaAtivaIndex}
                onSelecionarCarta={handleSelecionarCarta}
                onVerResumo={handleIrParaResumo}
              />
            </div>
          )}

          {/* Step 5: Final Summary Screen (Síntese) */}
          {etapa === "resumo" && (
            <div className="w-full pt-6 sm:pt-8 pb-12">
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
                onVoltarRevisar={() => setEtapa("perguntas")}
                onNovaTirada={handleIniciarNovaTirada}
                onCopiarReflexao={handleCopiarReflexao}
                onNavegarEtapa={(etp) => setEtapa(etp)}
              />
            </div>
          )}
        </div>

        {/* Footer: Offscreen, accessible by scrolling down only on home screen */}
        {etapa === "inicio" && <Footer />}
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
    </div>
  );
}
