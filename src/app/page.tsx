import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="flex h-[70vh] flex-col items-center justify-center mt-8">
        <h1>Olá!</h1>
        <p>Você ainda não está conectado</p>
        <div className="flex justify-center gap-2 flex-wrap">
          <button type="button" className="border border-slate-400 hover:bg-blue-400 bg-blue-300 rounded p-2 mt-4">
            <Link href="/account/login">Conectar-se</Link>
          </button>
          <button type="button" className="border border-slate-400 hover:bg-green-400 bg-green-300 rounded p-2 mt-4">
            <Link href="/account/register">Cadastrar-se</Link>
          </button>
        </div>
      </main>
    </>
  )
}
