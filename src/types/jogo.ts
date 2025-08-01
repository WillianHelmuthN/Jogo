export interface Garrafa {
  x: number;
  y: number;
  angulo: number;
  velocidadeAngular: number;
  raioOrbita: number;
  raioGarrafa: number;
  largura: number;
  altura: number;
  acertada: boolean;
  tempoQuebrada: number;
  cor: string;
}

export type StatusJogo = "jogando" | "vitoria" | "derrota" | "inicial";

export interface ConfiguracaoJogo {
  readonly CANVAS_WIDTH: number;
  readonly CANVAS_HEIGHT: number;
  readonly NUMERO_GARRAFAS: number;
  readonly TEMPO_LIMITE: number;
  readonly RAIO_ORBITA: number;
  readonly TAMANHO_MIRA: number;
  readonly PONTOS_POR_GARRAFA: number;
  readonly MULTIPLICADOR_VELOCIDADE: number;
}

export interface EstadoJogo {
  pontuacao: number;
  garrafasQuebradas: number;
  balasRestantes: number;
  tempoRestante: number;
  jogoAtivo: boolean;
  statusJogo: StatusJogo;
  mostrarPopup: boolean;
}
