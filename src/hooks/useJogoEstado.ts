import { useState, useRef, useCallback } from "react";
import { EstadoJogo, StatusJogo } from "@/types/jogo";
import { CONFIGURACAO_JOGO } from "@/components/jogo/configuracao";

export const useJogoEstado = () => {
  const [pontuacao, setPontuacao] = useState(0);
  const [garrafasQuebradas, setGarrafasQuebradas] = useState(0);
  const [balasRestantes, setBalasRestantes] = useState(
    CONFIGURACAO_JOGO.NUMERO_GARRAFAS
  );
  const [tempoRestante, setTempoRestante] = useState(
    CONFIGURACAO_JOGO.TEMPO_LIMITE
  );
  const [jogoAtivo, setJogoAtivo] = useState(false);
  const [statusJogo, setStatusJogo] = useState<StatusJogo>("inicial");
  const [mostrarPopup, setMostrarPopup] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const resetarEstado = useCallback(() => {
    setPontuacao(0);
    setGarrafasQuebradas(0);
    setBalasRestantes(CONFIGURACAO_JOGO.NUMERO_GARRAFAS);
    setTempoRestante(CONFIGURACAO_JOGO.TEMPO_LIMITE);
    setStatusJogo("inicial");
    setJogoAtivo(false);
    setMostrarPopup(false);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  const finalizarJogo = useCallback((resultado: "vitoria" | "derrota") => {
    setStatusJogo(resultado);
    setJogoAtivo(false);
    setMostrarPopup(true);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  const iniciarJogo = useCallback(() => {
    setStatusJogo("jogando");
    setJogoAtivo(true);
    setPontuacao(0);
    setGarrafasQuebradas(0);
    setBalasRestantes(CONFIGURACAO_JOGO.NUMERO_GARRAFAS);
    setTempoRestante(CONFIGURACAO_JOGO.TEMPO_LIMITE);
    setMostrarPopup(false);

    // Limpar timer anterior
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Iniciar novo timer
    intervalRef.current = setInterval(() => {
      setTempoRestante((prev) => {
        if (prev <= 1) {
          finalizarJogo("derrota");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [finalizarJogo]);

  const consumirBala = useCallback(() => {
    setBalasRestantes((prev) => prev - 1);
  }, []);

  const quebrarGarrafa = useCallback(() => {
    setPontuacao((prev) => prev + CONFIGURACAO_JOGO.PONTOS_POR_GARRAFA);
    setGarrafasQuebradas((prev) => prev + 1);
  }, []);

  const estadoAtual: EstadoJogo = {
    pontuacao,
    garrafasQuebradas,
    balasRestantes,
    tempoRestante,
    jogoAtivo,
    statusJogo,
    mostrarPopup,
  };

  return {
    estado: estadoAtual,
    acoes: {
      resetarEstado,
      iniciarJogo,
      finalizarJogo,
      consumirBala,
      quebrarGarrafa,
      setMostrarPopup,
    },
    intervalRef,
  };
};
