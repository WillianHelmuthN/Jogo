import { useState, useRef, useEffect } from "react";

export const useImagensJogo = () => {
  const [imagensCarregadas, setImagensCarregadas] = useState(false);
  const imagemGarrafaRef = useRef<HTMLImageElement | null>(null);
  const imagemQuebradaRef = useRef<HTMLImageElement | null>(null);

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
  }, []);

  return {
    imagensCarregadas,
    imagemGarrafaRef,
    imagemQuebradaRef,
  };
};
