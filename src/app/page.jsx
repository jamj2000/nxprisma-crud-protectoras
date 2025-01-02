import Link from "next/link";


export default function Home() {
  return (
    <div className='container mx-auto px-4 py-10 flex flex-col'>

      <h1 className='text-4xl text-blue-400 font-bold px-4 pb-2 mb-8 border-b-4 border-blue-100'>
        PROTECTORAS DE ANIMALES
      </h1>

      <Link href="/mascotas" className="text-2xl text-blue-400"> Mascotas  </Link>
      <Link href="/protectoras" className="text-2xl text-blue-400"> Protectoras    </Link>

    </div>
  );
}
