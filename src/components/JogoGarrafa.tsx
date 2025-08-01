"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

interface Garrafa {
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

const JogoGarrafa = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const garrafasRef = useRef<Garrafa[]>([]);
  const imagemGarrafaRef = useRef<HTMLImageElement | null>(null);
  const imagemQuebradaRef = useRef<HTMLImageElement | null>(null);
  const [imagensCarregadas, setImagensCarregadas] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  const [pontuacao, setPontuacao] = useState(0);
  const [garrafasQuebradas, setGarrafasQuebradas] = useState(0);

  // Novos estados para o sistema de balas e tempo
  const [balasRestantes, setBalasRestantes] = useState(8);
  const [tempoRestante, setTempoRestante] = useState(30);
  const [jogoAtivo, setJogoAtivo] = useState(false);
  const [statusJogo, setStatusJogo] = useState<
    "jogando" | "vitoria" | "derrota" | "inicial"
  >("inicial");
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Configurações do jogo
  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 600;
  const centroX = CANVAS_WIDTH / 2;
  const centroY = CANVAS_HEIGHT / 2;
  const miraX = centroX;
  const miraY = centroY - 150;
  const miraTamanho = 30;

  // Carregar imagens
  useEffect(() => {
    let imagensCarregadasCount = 0;

    const verificarImagensCarregadas = () => {
      imagensCarregadasCount++;
      if (imagensCarregadasCount === 2) {
        setImagensCarregadas(true);
        console.log("Imagens carregadas com sucesso!");
      }
    };

    // Criar e carregar imagem da garrafa
    const imagemGarrafa = new Image();
    imagemGarrafa.src = "/images/garrafa.png";
    imagemGarrafa.onload = verificarImagensCarregadas;
    imagemGarrafaRef.current = imagemGarrafa;

    // Criar e carregar imagem da garrafa quebrada
    const imagemQuebrada = new Image();
    imagemQuebrada.src = "/images/quebrada.png";
    imagemQuebrada.onload = verificarImagensCarregadas;
    imagemQuebradaRef.current = imagemQuebrada;

    return () => {
      // Cleanup
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Criar garrafas
  const criarGarrafas = (quantidade: number, raioOrbita: number) => {
    const novasGarrafas: Garrafa[] = [];
    for (let i = 0; i < quantidade; i++) {
      novasGarrafas.push({
        x: 0,
        y: 0,
        angulo: ((Math.PI * 2) / quantidade) * i,
        velocidadeAngular: 0.01,
        raioOrbita: raioOrbita,
        raioGarrafa: 25,
        largura: 40,
        altura: 60,
        acertada: false,
        tempoQuebrada: 0,
        cor: "#2a9d8f",
      });
    }
    garrafasRef.current = novasGarrafas;
  };

  // Iniciar jogo
  const iniciarJogo = () => {
    setStatusJogo("jogando");
    setJogoAtivo(true);
    setPontuacao(0);
    setGarrafasQuebradas(0);
    setBalasRestantes(8);
    setTempoRestante(30);
    setMostrarPopup(false);

    criarGarrafas(8, 150);

    // Iniciar timer de 30 segundos
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setTempoRestante((prev) => {
        if (prev <= 1) {
          finalizarJogo("derrota");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Finalizar jogo
  const finalizarJogo = (resultado: "vitoria" | "derrota") => {
    setStatusJogo(resultado);
    setJogoAtivo(false);
    setMostrarPopup(true);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  // Verificar condições de vitória/derrota
  const verificarStatusJogo = useCallback(() => {
    if (!jogoAtivo) return;

    // Vitória: todas as garrafas foram quebradas
    if (garrafasQuebradas === 8) {
      finalizarJogo("vitoria");
      return;
    }

    // Derrota: sem balas e ainda há garrafas
    if (balasRestantes === 0 && garrafasQuebradas < 8) {
      finalizarJogo("derrota");
      return;
    }
  }, [jogoAtivo, garrafasQuebradas, balasRestantes]);

  // Effect para verificar status do jogo
  useEffect(() => {
    verificarStatusJogo();
  }, [verificarStatusJogo]);

  // Desenhar mira
  const desenharMira = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      ctx.strokeStyle = "#ff0000";
      ctx.lineWidth = 3;

      // Desenha uma cruz como mira
      ctx.beginPath();
      // Linha horizontal
      ctx.moveTo(miraX - miraTamanho / 2, miraY);
      ctx.lineTo(miraX + miraTamanho / 2, miraY);
      // Linha vertical
      ctx.moveTo(miraX, miraY - miraTamanho / 2);
      ctx.lineTo(miraX, miraY + miraTamanho / 2);
      ctx.stroke();

      // Círculo ao redor da mira
      ctx.beginPath();
      ctx.arc(miraX, miraY, miraTamanho / 2, 0, Math.PI * 2);
      ctx.stroke();
    },
    [miraX, miraY, miraTamanho]
  );

  // Game loop
  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Limpa a tela
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

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
        garrafa.angulo += garrafa.velocidadeAngular;
      }

      // Calcula nova posição
      const x = centroX + garrafa.raioOrbita * Math.cos(garrafa.angulo);
      const y = centroY + garrafa.raioOrbita * Math.sin(garrafa.angulo);

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
  }, [imagensCarregadas, centroX, centroY, desenharMira]);

  // Inicializar jogo quando as imagens carregarem
  useEffect(() => {
    if (imagensCarregadas) {
      criarGarrafas(8, 150);
      gameLoop();
    }
  }, [imagensCarregadas, gameLoop]);

  // Manipular cliques
  const handleCanvasClick = () => {
    const canvas = canvasRef.current;
    if (!canvas || !jogoAtivo || balasRestantes <= 0) return;

    // Consome uma bala a cada clique
    setBalasRestantes((prev) => prev - 1);

    // Verificar se alguma garrafa está na zona da mira
    garrafasRef.current.forEach((garrafa) => {
      if (!garrafa.acertada) {
        const distanciaDaMira = Math.sqrt(
          Math.pow(garrafa.x - miraX, 2) + Math.pow(garrafa.y - miraY, 2)
        );

        if (distanciaDaMira < 30) {
          console.log("Acertou na mira!");
          garrafa.acertada = true;
          garrafa.tempoQuebrada = Date.now();

          // Atualiza pontuação
          setPontuacao((prev) => prev + 10);
          setGarrafasQuebradas((prev) => prev + 1);

          // Aumenta a velocidade de todas as garrafas
          garrafasRef.current.forEach((g) => {
            g.velocidadeAngular *= 1.2;
          });

          console.log(
            "Velocidade aumentada! Nova velocidade:",
            garrafasRef.current[0].velocidadeAngular.toFixed(4)
          );
        }
      }
    });
  };

  // Reiniciar jogo
  const reiniciarJogo = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Reset todos os estados
    setPontuacao(0);
    setGarrafasQuebradas(0);
    setBalasRestantes(8);
    setTempoRestante(30);
    setStatusJogo("inicial");
    setJogoAtivo(false);
    setMostrarPopup(false);

    criarGarrafas(8, 150);
    gameLoop();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#5a2a0a] text-white relative">
      {/* Navegação */}
      <div className="absolute top-4 left-4">
        <Link
          href="/"
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors text-sm"
        >
          ← Voltar ao Início
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center">
        Acerte as Garrafas
      </h1>

      {/* Placar Expandido */}
      <div className="flex gap-4 mb-4 text-lg flex-wrap justify-center">
        <div className="bg-blue-900 px-4 py-2 rounded-lg">
          <span className="font-bold">Pontuação: </span>
          <span className="text-yellow-300">{pontuacao}</span>
        </div>
        <div className="bg-green-900 px-4 py-2 rounded-lg">
          <span className="font-bold">Garrafas: </span>
          <span className="text-yellow-300">{garrafasQuebradas}/8</span>
        </div>
        <div className="bg-red-900 px-4 py-2 rounded-lg">
          <span className="font-bold">Balas: </span>
          <span className="text-yellow-300">{balasRestantes}</span>
        </div>
        <div className="bg-purple-900 px-4 py-2 rounded-lg">
          <span className="font-bold">Tempo: </span>
          <span className="text-yellow-300">{tempoRestante}s</span>
        </div>
      </div>

      {/* Botões de Controle */}
      <div className="mb-4 flex gap-4">
        {statusJogo === "inicial" && (
          <button
            onClick={iniciarJogo}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors"
          >
            🎯 Iniciar Jogo
          </button>
        )}

        <button
          onClick={reiniciarJogo}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
        >
          🔄 Reiniciar Jogo
        </button>
      </div>

      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        onClick={handleCanvasClick}
        className={`bg-[#f0e68c] border-[10px] border-[#8b4513] ${
          jogoAtivo ? "cursor-crosshair" : "cursor-not-allowed opacity-70"
        }`}
        style={{ cursor: jogoAtivo ? "crosshair" : "not-allowed" }}
      />

      <div className="mt-4 text-center max-w-md">
        <p className="text-sm opacity-80 mb-2">
          {statusJogo === "inicial"
            ? 'Clique em "Iniciar Jogo" para começar!'
            : "Clique quando as garrafas passarem pela mira vermelha no topo!"}
        </p>
        <p className="text-xs opacity-60">
          Você tem {statusJogo === "inicial" ? "8" : balasRestantes} balas para
          quebrar todas as 8 garrafas em 30 segundos!
        </p>
      </div>

      {/* Popup de Resultado */}
      {mostrarPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black p-8 rounded-lg text-center max-w-md mx-4">
            {statusJogo === "vitoria" ? (
              <>
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold mb-2 text-green-600">
                  PARABÉNS!
                </h2>
                <p className="mb-4">
                  Você conseguiu quebrar todas as garrafas!
                </p>
                <p className="text-lg font-semibold mb-4">
                  Pontuação Final:{" "}
                  <span className="text-green-600">{pontuacao}</span>
                </p>
                <p className="text-sm text-gray-600 mb-6">
                  Tempo restante: {tempoRestante}s | Balas restantes:{" "}
                  {balasRestantes}
                </p>
              </>
            ) : (
              <>
                <div className="text-6xl mb-4">😔</div>
                <h2 className="text-2xl font-bold mb-2 text-red-600">
                  GAME OVER!
                </h2>
                <p className="mb-4">
                  {balasRestantes === 0
                    ? "Suas balas acabaram!"
                    : "O tempo acabou!"}
                </p>
                <p className="text-lg font-semibold mb-4">
                  Pontuação: <span className="text-blue-600">{pontuacao}</span>
                </p>
                <p className="text-sm text-gray-600 mb-6">
                  Garrafas quebradas: {garrafasQuebradas}/8
                </p>
              </>
            )}

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  setMostrarPopup(false);
                  iniciarJogo();
                }}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
              >
                🎯 Jogar Novamente
              </button>
              <button
                onClick={() => {
                  setMostrarPopup(false);
                  reiniciarJogo();
                }}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
              >
                🏠 Menu Principal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JogoGarrafa;
