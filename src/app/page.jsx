// import Link from "next/link";



// export default function Home() {
//   return (
//     <div className='container mx-auto px-4 py-10 flex flex-col'>

//       <h1 className='text-4xl text-blue-400 font-bold px-4 pb-2 mb-8 border-b-4 border-blue-100'>
//         PROTECTORAS DE ANIMALES
//       </h1>

//       <Link href='/protectoras' className="block text-2xl">PROTECTORAS</Link>
//       <Link prefetch={true} href='/mascotas' className="block text-2xl">MASCOTAS</Link>
//       <Link href='/vacunas' className="block text-2xl">VACUNAS</Link>

//     </div>
//   )
// }


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
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-500">
          Gestión
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-slate-800 md:text-5xl">
          Protectoras de animales
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-slate-500">
          Gestiona protectoras, mascotas y vacunas desde un único lugar.
        </p>
      </header>

      {/* Opciones */}
      <section className="grid gap-6 md:grid-cols-3">
        <Link
          href="/protectoras"
          className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
        >
          <CardIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 21h16.5M4.5 21V8.25L12 3l7.5 5.25V21M8.25 21v-6h7.5v6"
              />
            </svg>
          </CardIcon>

          <h2 className="mt-5 text-xl font-semibold text-slate-800 group-hover:text-blue-600">
            Protectoras
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Consulta y gestiona las protectoras de animales.
          </p>

          <span className="mt-5 inline-flex items-center text-sm font-semibold text-blue-500">
            Acceder
            <span className="ml-2 transition-transform group-hover:translate-x-1">
              →
            </span>
          </span>
        </Link>

        <Link
          prefetch={true}
          href="/mascotas"
          className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
        >
          <CardIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 20.25c4.5 0 7.5-2.7 7.5-6.75 0-2.25-1.5-3.75-3-5.25-.75-.75-1.5-2.25-1.5-3.75A3 3 0 0 0 12 1.5a3 3 0 0 0-3 3c0 1.5-.75 3-1.5 3.75-1.5 1.5-3 3-3 5.25 0 4.05 3 6.75 7.5 6.75Z"
              />
            </svg>
          </CardIcon>

          <h2 className="mt-5 text-xl font-semibold text-slate-800 group-hover:text-emerald-600">
            Mascotas
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Consulta y administra las mascotas registradas.
          </p>

          <span className="mt-5 inline-flex items-center text-sm font-semibold text-emerald-500">
            Acceder
            <span className="ml-2 transition-transform group-hover:translate-x-1">
              →
            </span>
          </span>
        </Link>

        <Link
          href="/vacunas"
          className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-lg"
        >
          <CardIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m15.75 7.5 2.25-2.25m0 0 1.5 1.5-2.25 2.25m.75-3.75L15 3m-2.25 1.5L4.5 12.75a2.25 2.25 0 0 0 0 3.182l3.568 3.568a2.25 2.25 0 0 0 3.182 0l8.25-8.25M7.5 15l1.5-1.5"
              />
            </svg>
          </CardIcon>

          <h2 className="mt-5 text-xl font-semibold text-slate-800 group-hover:text-amber-600">
            Vacunas
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Gestiona las vacunas y el historial sanitario.
          </p>

          <span className="mt-5 inline-flex items-center text-sm font-semibold text-amber-500">
            Acceder
            <span className="ml-2 transition-transform group-hover:translate-x-1">
              →
            </span>
          </span>
        </Link>
      </section>
    </main>
  );
}


