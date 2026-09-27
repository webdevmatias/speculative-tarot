export interface PerguntaRaw {
  titulo: string;
  perguntas: string[];
}

export interface Tema {
  id: number;
  titulo: string;
  descricao: string;
  categoria?: string;
}

export interface PerguntaResposta {
  pergunta: string;
  resposta: string;
}

export interface CartaDef {
  id: number;
  titulo: string;
  numeroRomano: string;
  subtitulo: string;
  corPrimaria: string;
  corBorda: string;
  corGradiente: string;
  corGlow: string;
  iconeNome: string;
  imagemFrente?: string;
  imagemVerso?: string;
  perguntas: string[];
}

export interface CartaSessao {
  id: string; // e.g. "slot-0"
  cartaId: number;
  titulo: string;
  numeroRomano: string;
  subtitulo: string;
  corPrimaria: string;
  corBorda: string;
  corGradiente: string;
  corGlow: string;
  iconeNome: string;
  imagemFrente?: string;
  imagemVerso?: string;
  virada: boolean;
  perguntas: PerguntaResposta[];
}

export type TipoTirada = 1 | 3 | 6;

export interface SessaoTarot {
  tema: string;
  tipoTirada: TipoTirada;
  cartas: CartaSessao[];
  cartaAtualIndex: number;
  etapa: "inicio" | "tema" | "tirada" | "mesa" | "resumo";
  dataCriacao: string;
  ultimaModificacao: string;
}
