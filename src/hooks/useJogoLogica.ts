import { useEffect, useCallback } from "react";
import { useJogoEstado } from "./useJogoEstado";
import { useGarrafas } from "./useGarrafas";
import { useImagensJogo } from "./useImagensJogo";
import { CONFIGURACAO_CANVAS } from "@/components/jogo/configuracao";

export const useJogoLogica = () => {
  const { estado, acoes, intervalRef } = useJogoEstado();
  const { garrafasRef, verificarAcerto, inicializarGarrafas } = useGarrafas();
  const { imagensCarregadas, imagemGarrafaRef, imagemQuebradaRef } =
    useImagensJogo();

  // Verificar condições de vitória/derrota
  const verificarStatusJogo = useCallback(() => {
    if (!estado.jogoAtivo) return;

    // Vitória: todas as garrafas foram quebradas
    if (estado.garrafasQuebradas === 8) {
      acoes.finalizarJogo("vitoria");
      return;
    }

    // Derrota: sem balas e ainda há garrafas
    if (estado.balasRestantes === 0 && estado.garrafasQuebradas < 8) {
      acoes.finalizarJogo("derrota");
      return;
    }
  }, [
    estado.jogoAtivo,
    estado.garrafasQuebradas,
    estado.balasRestantes,
    acoes,
  ]);

  // Effect para verificar status do jogo
  useEffect(() => {
    verificarStatusJogo();
  }, [verificarStatusJogo]);

  // Inicializar garrafas quando as imagens carregarem
  useEffect(() => {
    if (imagensCarregadas) {
      inicializarGarrafas();
    }
  }, [imagensCarregadas, inicializarGarrafas]);

  // Cleanup ao desmontar
  useEffect(() => {
    const interval = intervalRef.current;
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [intervalRef]);

  // Manipular cliques no canvas
  const handleCanvasClick = useCallback(() => {
    if (!estado.jogoAtivo || estado.balasRestantes <= 0) return;

    // Consome uma bala a cada clique
    acoes.consumirBala();

    // Verificar se acertou alguma garrafa
    const acertou = verificarAcerto(
      CONFIGURACAO_CANVAS.miraX,
      CONFIGURACAO_CANVAS.miraY
    );

    if (acertou) {
      acoes.quebrarGarrafa();
      console.log("Acertou na mira!");
    }
  }, [estado.jogoAtivo, estado.balasRestantes, acoes, verificarAcerto]);

  // Handlers para os botões
  const handleIniciarJogo = useCallback(() => {
    acoes.iniciarJogo();
    inicializarGarrafas();
  }, [acoes, inicializarGarrafas]);

  const handleReiniciarJogo = useCallback(() => {
    acoes.resetarEstado();
    inicializarGarrafas();
  }, [acoes, inicializarGarrafas]);

  const handleJogarNovamente = useCallback(() => {
    acoes.setMostrarPopup(false);
    acoes.iniciarJogo();
    inicializarGarrafas();
  }, [acoes, inicializarGarrafas]);

  const handleVoltarMenu = useCallback(() => {
    acoes.setMostrarPopup(false);
    acoes.resetarEstado();
    inicializarGarrafas();
  }, [acoes, inicializarGarrafas]);

  return {
    estado,
    garrafasRef,
    imagensCarregadas,
    imagemGarrafaRef,
    imagemQuebradaRef,
    handlers: {
      handleCanvasClick,
      handleIniciarJogo,
      handleReiniciarJogo,
      handleJogarNovamente,
      handleVoltarMenu,
    },
  };
};
