import { useRef, useCallback, useEffect } from "react";
import { Garrafa } from "@/types/jogo";
import { CONFIGURACAO_JOGO, CONFIGURACAO_CANVAS } from "./configuracao";

interface CanvasJogoProps {
  garrafasRef: React.MutableRefObject<Garrafa[]>;
  imagensCarregadas: boolean;
  imagemGarrafaRef: React.MutableRefObject<HTMLImageElement | null>;
  imagemQuebradaRef: React.MutableRefObject<HTMLImageElement | null>;
  jogoAtivo: boolean;
  onClick: () => void;
}

export const CanvasJogo = ({
  garrafasRef,
  imagensCarregadas,
  imagemGarrafaRef,
  imagemQuebradaRef,
  jogoAtivo,
  onClick,
}: CanvasJogoProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  const desenharMira = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = "#ff0000";
    ctx.lineWidth = 3;

    // Desenha uma cruz como mira
    ctx.beginPath();
    // Linha horizontal
    ctx.moveTo(
      CONFIGURACAO_CANVAS.miraX - CONFIGURACAO_JOGO.TAMANHO_MIRA / 2,
      CONFIGURACAO_CANVAS.miraY
    );
    ctx.lineTo(
      CONFIGURACAO_CANVAS.miraX + CONFIGURACAO_JOGO.TAMANHO_MIRA / 2,
      CONFIGURACAO_CANVAS.miraY
    );
    // Linha vertical
    ctx.moveTo(
      CONFIGURACAO_CANVAS.miraX,
      CONFIGURACAO_CANVAS.miraY - CONFIGURACAO_JOGO.TAMANHO_MIRA / 2
    );
    ctx.lineTo(
      CONFIGURACAO_CANVAS.miraX,
      CONFIGURACAO_CANVAS.miraY + CONFIGURACAO_JOGO.TAMANHO_MIRA / 2
    );
    ctx.stroke();

    // Círculo ao redor da mira
    ctx.beginPath();
    ctx.arc(
      CONFIGURACAO_CANVAS.miraX,
      CONFIGURACAO_CANVAS.miraY,
      CONFIGURACAO_JOGO.TAMANHO_MIRA / 2,
      0,
      Math.PI * 2
    );
    ctx.stroke();
  }, []);

  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Limpa a tela
    ctx.clearRect(
      0,
      0,
      CONFIGURACAO_JOGO.CANVAS_WIDTH,
      CONFIGURACAO_JOGO.CANVAS_HEIGHT
    );

    // Atualiza e desenha cada garrafa
    garrafasRef.current.forEach((garrafa) => {
      // Verifica se a garrafa quebrada deve desaparecer
      if (garrafa.acertada && garrafa.tempoQuebrada > 0) {
        const tempoDecorrido = Date.now() - garrafa.tempoQuebrada;
        if (tempoDecorrido > 500) {
          return;
        }
      }

      // Atualiza a posição (só gira se não foi acertada)
      if (!garrafa.acertada) {
        // Aplica a direção na velocidade angular
        garrafa.angulo += garrafa.velocidadeAngular * garrafa.direcao;
      }

      // Calcula nova posição
      const x =
        CONFIGURACAO_CANVAS.centroX +
        garrafa.raioOrbita * Math.cos(garrafa.angulo);
      const y =
        CONFIGURACAO_CANVAS.centroY +
        garrafa.raioOrbita * Math.sin(garrafa.angulo);

      garrafa.x = x;
      garrafa.y = y;

      // Desenha a garrafa
      if (
        imagensCarregadas &&
        imagemGarrafaRef.current &&
        imagemQuebradaRef.current
      ) {
        const imagemParaUsar = garrafa.acertada
          ? imagemQuebradaRef.current
          : imagemGarrafaRef.current;

        ctx.drawImage(
          imagemParaUsar,
          x - garrafa.largura / 2,
          y - garrafa.altura / 2,
          garrafa.largura,
          garrafa.altura
        );
      } else {
        // Fallback: desenha círculo
        ctx.beginPath();
        ctx.arc(x, y, garrafa.raioGarrafa, 0, Math.PI * 2);
        ctx.fillStyle = garrafa.acertada ? "#8b0000" : garrafa.cor;
        ctx.fill();
        ctx.closePath();
      }
    });

    // Desenha a mira
    desenharMira(ctx);

    // Próximo frame
    animationFrameRef.current = requestAnimationFrame(gameLoop);
  }, [
    imagensCarregadas,
    garrafasRef,
    imagemGarrafaRef,
    imagemQuebradaRef,
    desenharMira,
  ]);

  // Iniciar loop quando as imagens carregarem
  useEffect(() => {
    if (imagensCarregadas) {
      gameLoop();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [imagensCarregadas, gameLoop]);

  return (
    <canvas
      ref={canvasRef}
      width={CONFIGURACAO_JOGO.CANVAS_WIDTH}
      height={CONFIGURACAO_JOGO.CANVAS_HEIGHT}
      onClick={onClick}
      className={`bg-[#f0e68c] border-[10px] border-[#8b4513] ${
        jogoAtivo ? "cursor-crosshair" : "cursor-not-allowed opacity-70"
      }`}
      style={{ cursor: jogoAtivo ? "crosshair" : "not-allowed" }}
    />
  );
};
