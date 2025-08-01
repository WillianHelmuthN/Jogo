import { EstadoJogo } from "@/types/jogo";

interface PlacarProps {
  estado: EstadoJogo;
}

export const Placar = ({ estado }: PlacarProps) => {
  const { pontuacao, garrafasQuebradas, balasRestantes, tempoRestante } =
    estado;

  return (
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
  );
};
