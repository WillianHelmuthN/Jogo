import { ConfiguracaoJogo } from "@/types/jogo";

export const CONFIGURACAO_JOGO: ConfiguracaoJogo = {
  CANVAS_WIDTH: 800,
  CANVAS_HEIGHT: 600,
  NUMERO_GARRAFAS: 8,
  TEMPO_LIMITE: 30,
  RAIO_ORBITA: 150,
  TAMANHO_MIRA: 30,
  PONTOS_POR_GARRAFA: 10,
  MULTIPLICADOR_VELOCIDADE: 1.2,
} as const;

export const CONFIGURACAO_CANVAS = {
  centroX: CONFIGURACAO_JOGO.CANVAS_WIDTH / 2,
  centroY: CONFIGURACAO_JOGO.CANVAS_HEIGHT / 2,
  get miraX() {
    return this.centroX;
  },
  get miraY() {
    return this.centroY - CONFIGURACAO_JOGO.RAIO_ORBITA;
  },
} as const;
