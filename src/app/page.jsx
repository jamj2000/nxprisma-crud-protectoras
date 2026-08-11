import { ArrowRight, Fence, PawPrint, Squirrel, Syringe } from 'lucide-react';
import Link from "next/link";


function CardIcon({ children }) {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-500">
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      {/* Cabecera */}
      <header className="mb-12">

        <h1 className="text-4xl font-bold tracking-tight text-slate-800 dark:text-slate-200 md:text-5xl">
          Protectoras de animales
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-slate-500 dark:text-slate-300">
          Gestiona protectoras, mascotas y vacunas desde un único lugar.
        </p>
      </header>

      {/* Opciones */}
      <section className="grid gap-6 md:grid-cols-3">
        <Link
          href="/protectoras"
          className="group rounded-2xl border border-slate-200 bg-white dark:bg-zinc-700 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
        >
          <CardIcon>
            <PawPrint />
          </CardIcon>

          <h2 className="mt-5 text-xl font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-500">
            Protectoras
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-300">
            Consulta y gestiona las protectoras de animales.
          </p>

          <span className="mt-5 inline-flex items-center text-md font-semibold text-blue-500">
            Acceder
            <span className="ml-2 transition-transform group-hover:translate-x-1">
              <ArrowRight />
            </span>
          </span>
        </Link>

        <Link
          href="/mascotas"
          className="group rounded-2xl border border-slate-200 bg-white dark:bg-zinc-700 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
        >
          <CardIcon>
            <Squirrel />
          </CardIcon>

          <h2 className="mt-5 text-xl font-semibold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600">
            Mascotas
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-300">
            Consulta y administra las mascotas registradas.
          </p>

          <span className="mt-5 inline-flex items-center text-md font-semibold text-emerald-500">
            Acceder
            <span className="ml-2 transition-transform group-hover:translate-x-1">
              <ArrowRight />
            </span>
          </span>
        </Link>

        <Link
          href="/vacunas"
          className="group rounded-2xl border border-slate-200 bg-white dark:bg-zinc-700 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-lg"
        >
          <CardIcon>
            <Syringe />
          </CardIcon>

          <h2 className="mt-5 text-xl font-semibold text-slate-800 dark:text-slate-200 group-hover:text-amber-600">
            Vacunas
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-300">
            Gestiona las vacunas y el historial sanitario.
          </p>

          <span className="mt-5 inline-flex items-center text-md font-semibold text-amber-500">
            Acceder
            <span className="ml-2 transition-transform group-hover:translate-x-1">
              <ArrowRight />
            </span>
          </span>
        </Link>
      </section>
    </main>
  );
}


