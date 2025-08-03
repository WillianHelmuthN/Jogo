import { useRef, useCallback } from "react";
import { Garrafa } from "@/types/jogo";
import { CONFIGURACAO_JOGO } from "@/components/jogo/configuracao";

export const useGarrafas = () => {
  const garrafasRef = useRef<Garrafa[]>([]);

  const criarGarrafas = useCallback(
    (quantidade: number, raioOrbita: number) => {
      const novasGarrafas: Garrafa[] = [];
      for (let i = 0; i < quantidade; i++) {
        novasGarrafas.push({
          x: 0,
          y: 0,
          angulo: ((Math.PI * 2) / quantidade) * i,
          velocidadeAngular: 0.01,
          raioOrbita: raioOrbita,
          raioGarrafa: 18,
          largura: 40,
          altura: 60,
          acertada: false,
          tempoQuebrada: 0,
          cor: "#2a9d8f",
        });
      }
      garrafasRef.current = novasGarrafas;
    },
    []
  );

  const verificarAcerto = useCallback(
    (miraX: number, miraY: number): boolean => {
      let acertou = false;

      garrafasRef.current.forEach((garrafa) => {
        if (!garrafa.acertada) {
          const distanciaDaMira = Math.sqrt(
            Math.pow(garrafa.x - miraX, 2) + Math.pow(garrafa.y - miraY, 2)
          );

          if (distanciaDaMira < 30) {
            garrafa.acertada = true;
            garrafa.tempoQuebrada = Date.now();
            acertou = true;

            // Aumenta a velocidade de todas as garrafas
            garrafasRef.current.forEach((g) => {
              g.velocidadeAngular *= CONFIGURACAO_JOGO.MULTIPLICADOR_VELOCIDADE;
            });
          }
        }
      });

      return acertou;
    },
    []
  );

  const inicializarGarrafas = useCallback(() => {
    criarGarrafas(
      CONFIGURACAO_JOGO.NUMERO_GARRAFAS,
      CONFIGURACAO_JOGO.RAIO_ORBITA
    );
  }, [criarGarrafas]);

  return {
    garrafasRef,
    criarGarrafas,
    verificarAcerto,
    inicializarGarrafas,
  };
};
