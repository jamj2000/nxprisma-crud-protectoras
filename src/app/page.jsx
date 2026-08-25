import { Spinner } from '@/components/simpleui';
import prisma from '@/lib/prisma';
import { ArrowRight, PawPrint, Squirrel, Syringe } from 'lucide-react';
import Link from "next/link";
import { Suspense } from 'react';


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
      <section className="grid gap-6 lg:grid-cols-3">
        <Link
          href="/protectoras"
          className="group rounded-2xl border border-slate-200 bg-white dark:bg-zinc-700 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
        >

          <div className='flex gap-4 items-center'>
            <CardIcon>
              <PawPrint />
            </CardIcon>

            <Suspense fallback={<Spinner color="text-slate-500" />}>
              <TotalProtectoras />
            </Suspense>

            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-500">
              Protectoras
            </h2>
          </div>

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

          <div className='flex gap-4 items-center'>
            <CardIcon>
              <Squirrel />
            </CardIcon>

            <Suspense fallback={<Spinner color="text-slate-500" />}>
              <TotalMascotas />
            </Suspense>

            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600">
              Mascotas
            </h2>
          </div>

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

          <div className='flex gap-4 items-center'>
            <CardIcon>
              <Syringe />
            </CardIcon>

            <Suspense fallback={<Spinner color="text-slate-500" />}>
              <TotalVacunas />
            </Suspense>

            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 group-hover:text-amber-600">
              Vacunas
            </h2>
          </div>

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


const TotalProtectoras = async () => {

  const protectoras = await prisma.protectora.count();
  return (
    <p className='font-bold text-4xl'>{protectoras}</p>
  )
}

const TotalMascotas = async () => {
  const mascotas = await prisma.mascota.count();
  return (
    <p className='font-bold text-4xl'>{mascotas}</p>
  )
}

const TotalVacunas = async () => {
  const vacunas = await prisma.vacuna.count();
  return (
    <p className='font-bold text-4xl'>{vacunas}</p>
  )
}
