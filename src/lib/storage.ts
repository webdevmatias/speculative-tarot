import { SessaoTarot } from "@/types/tarot";

const STORAGE_KEY = "tarot_especulativo_session_v1";

export function salvarSessao(sessao: SessaoTarot): void {
  if (typeof window === "undefined") return;
  try {
    const dados = {
      ...sessao,
      ultimaModificacao: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dados));
  } catch (error) {
    console.error("Falha ao salvar sessão do Tarô Especulativo no localStorage:", error);
  }
}

export function carregarSessao(): SessaoTarot | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const sessao = JSON.parse(raw) as SessaoTarot;
    
    // Validação básica da sessão carregada
    if (sessao && sessao.tema && Array.isArray(sessao.cartas) && sessao.cartas.length > 0) {
      return sessao;
    }
    return null;
  } catch (error) {
    console.error("Falha ao carregar sessão do Tarô Especulativo do localStorage:", error);
    return null;
  }
}

export function limparSessao(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Falha ao limpar sessão do Tarô Especulativo:", error);
  }
}

export function exportarComoMarkdown(sessao: SessaoTarot): string {
  const data = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  let md = `# Tarô Especulativo — Registro de Reflexão\n\n`;
  md += `**Data:** ${data}\n`;
  md += `**Tema de Investigação:** ${sessao.tema}\n`;
  md += `**Modalidade da Tirada:** ${sessao.tipoTirada} ${sessao.tipoTirada === 1 ? "carta (Reflexão Rápida)" : sessao.tipoTirada === 3 ? "cartas (Exploração Intermediária)" : "cartas (Exploração Aprofundada)"}\n\n`;
  md += `---\n\n`;

  sessao.cartas.forEach((carta, i) => {
    md += `## ${carta.numeroRomano} — ${carta.titulo}\n`;
    if (carta.subtitulo) {
      md += `*${carta.subtitulo}*\n\n`;
    }

    carta.perguntas.forEach((pq, pIndex) => {
      md += `### ${pIndex + 1}. ${pq.pergunta}\n\n`;
      if (pq.resposta && pq.resposta.trim().length > 0) {
        md += `> ${pq.resposta.replace(/\n/g, "\n> ")}\n\n`;
      } else {
        md += `*(Sem resposta registrada)*\n\n`;
      }
    });

    md += `---\n\n`;
  });

  md += `### Resumo da Sessão\n`;
  md += `- **Tema:** "${sessao.tema}"\n`;
  md += `- **Total de Cartas Exploradas:** ${sessao.cartas.length}\n`;
  const totalPerguntas = sessao.cartas.reduce((acc, c) => acc + c.perguntas.length, 0);
  const totalRespondidas = sessao.cartas.reduce(
    (acc, c) => acc + c.perguntas.filter((p) => p.resposta.trim().length > 0).length,
    0
  );
  md += `- **Perguntas Respondidas:** ${totalRespondidas} de ${totalPerguntas}\n`;
  md += `- **Ângulos Abordados:** ${sessao.cartas.map((c) => c.titulo).join(", ")}\n\n`;
  md += `*Gerado com Tarô Especulativo — Design Especulativo e Pensamento de Futuros.*\n`;

  return md;
}

export function exportarComoTextoPuro(sessao: SessaoTarot): string {
  const data = new Date().toLocaleDateString("pt-BR");
  let txt = `TARÔ ESPECULATIVO - REGISTRO DE REFLEXÃO\n`;
  txt += `Data: ${data}\n`;
  txt += `Tema: ${sessao.tema}\n`;
  txt += `Tirada: ${sessao.tipoTirada} carta(s)\n`;
  txt += `=================================================\n\n`;

  sessao.cartas.forEach((carta) => {
    txt += `[CARTA ${carta.numeroRomano}: ${carta.titulo.toUpperCase()}]\n`;
    if (carta.subtitulo) txt += `${carta.subtitulo}\n`;
    txt += `-------------------------------------------------\n`;

    carta.perguntas.forEach((pq, pIndex) => {
      txt += `Pergunta ${pIndex + 1}: ${pq.pergunta}\n`;
      txt += `Resposta:\n${pq.resposta ? pq.resposta : "(Sem resposta)"}\n\n`;
    });
    txt += `\n`;
  });

  return txt;
}
