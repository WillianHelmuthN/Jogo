import { EstadoJogo } from "@/types/jogo";

interface PopupResultadoProps {
  estado: EstadoJogo;
  onJogarNovamente: () => void;
  onVoltarMenu: () => void;
}

export const PopupResultado = ({
  estado,
  onJogarNovamente,
  onVoltarMenu,
}: PopupResultadoProps) => {
  const {
    statusJogo,
    pontuacao,
    tempoRestante,
    balasRestantes,
    garrafasQuebradas,
  } = estado;

  if (!estado.mostrarPopup) return null;

  const isVitoria = statusJogo === "vitoria";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white text-black p-8 rounded-lg text-center max-w-md mx-4">
        {isVitoria ? (
          <>
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-2 text-green-600">
              PARABÉNS!
            </h2>
            <p className="mb-4">Você conseguiu quebrar todas as garrafas!</p>
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
            <h2 className="text-2xl font-bold mb-2 text-red-600">GAME OVER!</h2>
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
            onClick={onJogarNovamente}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
          >
            🎯 Jogar Novamente
          </button>
          <button
            onClick={onVoltarMenu}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
          >
            🏠 Menu Principal
          </button>
        </div>
      </div>
    </div>
  );
};
