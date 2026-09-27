import { CartaDef, Tema } from "@/types/tarot";
import cartasJson from "@/data/cartas.json";
import temasJson from "@/data/temas.json";

// Roman numerals for tarot archetypes
const NUMEROS_ROMANOS = [
  "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"
];

// Curated palette and archetypal metadata for the 12 official cards in cartas.json
const METADATA_CARTAS: Record<string, {
  subtitulo: string;
  corPrimaria: string;
  corBorda: string;
  corGradiente: string;
  corGlow: string;
  iconeNome: string;
}> = {
  "O Traidor": {
    subtitulo: "Ruptura de Confiança & Vulnerabilidade",
    corPrimaria: "#e11d48", // rose-600
    corBorda: "border-rose-500/50",
    corGradiente: "from-rose-950/80 via-neutral-900 to-rose-950/40",
    corGlow: "rgba(225, 29, 72, 0.25)",
    iconeNome: "ShieldAlert",
  },
  "O Catalisador": {
    subtitulo: "Transformação Cultural & Mudança de Hábitos",
    corPrimaria: "#9333ea", // purple-600
    corBorda: "border-purple-500/50",
    corGradiente: "from-purple-950/80 via-neutral-900 to-purple-950/40",
    corGlow: "rgba(147, 51, 234, 0.25)",
    iconeNome: "Zap",
  },
  "O Cão de Serviço": {
    subtitulo: "Populações Negligenciadas & Cuidado Sistêmico",
    corPrimaria: "#d97706", // amber-600
    corBorda: "border-amber-500/50",
    corGradiente: "from-amber-950/80 via-neutral-900 to-amber-950/40",
    corGlow: "rgba(217, 119, 6, 0.25)",
    iconeNome: "HeartHandshake",
  },
  "O Esquecido": {
    subtitulo: "Exclusões Involuntárias & Ângulos Cegos",
    corPrimaria: "#0284c7", // sky-600
    corBorda: "border-sky-500/50",
    corGradiente: "from-sky-950/80 via-neutral-900 to-sky-950/40",
    corGlow: "rgba(2, 132, 199, 0.25)",
    iconeNome: "UserX",
  },
  "O Lobo Mau": {
    subtitulo: "Comportamento Predatório & Agentes Mal-intencionados",
    corPrimaria: "#dc2626", // red-600
    corBorda: "border-red-500/50",
    corGradiente: "from-red-950/80 via-neutral-900 to-red-950/40",
    corGlow: "rgba(220, 38, 38, 0.25)",
    iconeNome: "Skull",
  },
  "A Sereia": {
    subtitulo: "Uso Excessivo, Atração & Desconexão",
    corPrimaria: "#0d9488", // teal-600
    corBorda: "border-teal-500/50",
    corGradiente: "from-teal-950/80 via-neutral-900 to-teal-950/40",
    corGlow: "rgba(13, 148, 136, 0.25)",
    iconeNome: "Waves",
  },
  "O Superfã": {
    subtitulo: "Comunidade Apaixonada, Regras & Subversão",
    corPrimaria: "#eab308", // yellow-500
    corBorda: "border-yellow-500/50",
    corGradiente: "from-yellow-950/80 via-neutral-900 to-yellow-950/40",
    corGlow: "rgba(234, 179, 8, 0.25)",
    iconeNome: "Flame",
  },
  "Os Melhores Amigos": {
    subtitulo: "Vínculos Humanos & Intermediação Social",
    corPrimaria: "#059669", // emerald-600
    corBorda: "border-emerald-500/50",
    corGradiente: "from-emerald-950/80 via-neutral-900 to-emerald-950/40",
    corGlow: "rgba(5, 150, 105, 0.25)",
    iconeNome: "Users",
  },
  "O Escândalo": {
    subtitulo: "Piores Cenários, Exposição Pública & Perigo",
    corPrimaria: "#ea580c", // orange-600
    corBorda: "border-orange-500/50",
    corGradiente: "from-orange-950/80 via-neutral-900 to-orange-950/40",
    corGlow: "rgba(234, 88, 12, 0.25)",
    iconeNome: "AlertTriangle",
  },
  "O Grande Sucesso": {
    subtitulo: "Escala Massiva & Consequências Sistêmicas",
    corPrimaria: "#4f46e5", // indigo-600
    corBorda: "border-indigo-500/50",
    corGradiente: "from-indigo-950/80 via-neutral-900 to-indigo-950/40",
    corGlow: "rgba(79, 70, 229, 0.25)",
    iconeNome: "Globe",
  },
  "A Estrela do Rádio": {
    subtitulo: "Obsolescência, Deslocamento & Substituição",
    corPrimaria: "#c2410c", // copper/amber-700
    corBorda: "border-amber-600/50",
    corGradiente: "from-amber-950/80 via-neutral-900 to-amber-950/40",
    corGlow: "rgba(194, 65, 12, 0.25)",
    iconeNome: "Radio",
  },
  "A Mãe Natureza": {
    subtitulo: "Impacto Ecológico & Sustentabilidade Não-Humana",
    corPrimaria: "#65a30d", // lime-600
    corBorda: "border-lime-500/50",
    corGradiente: "from-lime-950/80 via-neutral-900 to-lime-950/40",
    corGlow: "rgba(101, 163, 13, 0.25)",
    iconeNome: "Leaf",
  },
};

// Guarantee the original questions from cartas.json are preserved strictly
export const TODAS_AS_CARTAS: CartaDef[] = cartasJson.map((carta, index) => {
  const meta = METADATA_CARTAS[carta.titulo] || {
    subtitulo: "Perspectiva Especulativa",
    corPrimaria: "#8b5cf6",
    corBorda: "border-violet-500/50",
    corGradiente: "from-violet-950/80 via-neutral-900 to-violet-950/40",
    corGlow: "rgba(139, 92, 246, 0.25)",
    iconeNome: "Sparkles",
  };

  return {
    id: index + 1,
    titulo: carta.titulo,
    numeroRomano: NUMEROS_ROMANOS[index % NUMEROS_ROMANOS.length] || `ARC-${index + 1}`,
    subtitulo: meta.subtitulo,
    corPrimaria: meta.corPrimaria,
    corBorda: meta.corBorda,
    corGradiente: meta.corGradiente,
    corGlow: meta.corGlow,
    iconeNome: meta.iconeNome,
    perguntas: [...carta.perguntas], // Strictly from cartas.json
  };
});

// Category helper for predefined themes in temas.json
function categorizarTema(titulo: string, descricao: string): string {
  const texto = `${titulo} ${descricao}`.toLowerCase();
  if (texto.includes("genétic") || texto.includes("bebê") || texto.includes("vida") || texto.includes("órgão") || texto.includes("prótese") || texto.includes("clonagem")) {
    return "Biotecnologia & Vida";
  }
  if (texto.includes("ia") || texto.includes("inteligência artificial") || texto.includes("robô") || texto.includes("algoritm") || texto.includes("conversa")) {
    return "Inteligência Artificial";
  }
  if (texto.includes("mente") || texto.includes("memória") || texto.includes("neural") || texto.includes("telepatia") || texto.includes("sonho") || texto.includes("consciência")) {
    return "Neurotecnologia & Mente";
  }
  if (texto.includes("clima") || texto.includes("planeta") || texto.includes("água") || texto.includes("natureza") || texto.includes("energia") || texto.includes("aliment") || texto.includes("carne")) {
    return "Planeta & Recursos";
  }
  if (texto.includes("trabalho") || texto.includes("dinheiro") || texto.includes("renda") || texto.includes("governo") || texto.includes("democracia") || texto.includes("privacidade") || texto.includes("vigilância")) {
    return "Sociedade & Política";
  }
  return "Fronteiras Futuras";
}

export const TODOS_OS_TEMAS: Tema[] = temasJson.map((tema) => ({
  id: tema.id,
  titulo: tema.titulo,
  descricao: tema.descricao,
  categoria: categorizarTema(tema.titulo, tema.descricao),
}));

export const CATEGORIAS_TEMAS = [
  "Todos",
  "Biotecnologia & Vida",
  "Inteligência Artificial",
  "Neurotecnologia & Mente",
  "Sociedade & Política",
  "Planeta & Recursos",
  "Fronteiras Futuras",
];

/**
 * Embaralha e seleciona N cartas distintas aleatoriamente
 */
export function sortearCartas(quantidade: 1 | 3 | 6): CartaDef[] {
  const cartasCopia = [...TODAS_AS_CARTAS];
  
  // Algoritmo Fisher-Yates para embaralhamento uniforme
  for (let i = cartasCopia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cartasCopia[i], cartasCopia[j]] = [cartasCopia[j], cartasCopia[i]];
  }

  return cartasCopia.slice(0, quantidade);
}
