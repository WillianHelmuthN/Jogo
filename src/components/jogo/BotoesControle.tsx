import { StatusJogo } from "@/types/jogo";

interface BotoesControleProps {
  statusJogo: StatusJogo;
  onIniciarJogo: () => void;
  onReiniciarJogo: () => void;
}

export const BotoesControle = ({
  statusJogo,
  onIniciarJogo,
  onReiniciarJogo,
}: BotoesControleProps) => {
  return (
    <div className="mb-4 flex gap-4">
      {statusJogo === "inicial" && (
        <button
          onClick={onIniciarJogo}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors"
        >
          🎯 Iniciar Jogo
        </button>
      )}

      <button
        onClick={onReiniciarJogo}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
      >
        🔄 Reiniciar Jogo
      </button>
    </div>
  );
};
