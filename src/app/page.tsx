import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Jogo de Apostas</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Bem-vindo!
          </p>
        </div>

        <div className="flex gap-4 items-center justify-center flex-col sm:flex-row">
          <Link
            href="/jogo"
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
          >
            🎯 Jogar Tiro ao Alvo
          </Link>
        </div>
      </main>
    </div>
  );
}
