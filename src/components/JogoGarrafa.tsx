"use client";

import Link from "next/link";
import { useJogoLogica } from "@/hooks/useJogoLogica";
import { Placar } from "./jogo/Placar";
import { BotoesControle } from "./jogo/BotoesControle";
import { CanvasJogo } from "./jogo/CanvasJogo";
import { PopupResultado } from "./jogo/PopupResultado";

const JogoGarrafa = () => {
  const {
    estado,
    garrafasRef,
    imagensCarregadas,
    imagemGarrafaRef,
    imagemQuebradaRef,
    handlers,
  } = useJogoLogica();

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

      {/* Placar */}
      <Placar estado={estado} />

      {/* Botões de Controle */}
      <BotoesControle
        statusJogo={estado.statusJogo}
        onIniciarJogo={handlers.handleIniciarJogo}
        onReiniciarJogo={handlers.handleReiniciarJogo}
      />

      {/* Canvas do Jogo */}
      <CanvasJogo
        garrafasRef={garrafasRef}
        imagensCarregadas={imagensCarregadas}
        imagemGarrafaRef={imagemGarrafaRef}
        imagemQuebradaRef={imagemQuebradaRef}
        jogoAtivo={estado.jogoAtivo}
        onClick={handlers.handleCanvasClick}
      />

      {/* Instruções */}
      <div className="mt-4 text-center max-w-md">
        <p className="text-sm opacity-80 mb-2">
          {estado.statusJogo === "inicial"
            ? 'Clique em "Iniciar Jogo" para começar!'
            : "Clique quando as garrafas passarem pela mira vermelha no topo!"}
        </p>
        <p className="text-xs opacity-60">
          Você tem{" "}
          {estado.statusJogo === "inicial" ? "8" : estado.balasRestantes} balas
          para quebrar todas as 8 garrafas em 30 segundos!
        </p>
      </div>

      {/* Popup de Resultado */}
      <PopupResultado
        estado={estado}
        onJogarNovamente={handlers.handleJogarNovamente}
        onVoltarMenu={handlers.handleVoltarMenu}
      />
    </div>
  );
};

export default JogoGarrafa;
