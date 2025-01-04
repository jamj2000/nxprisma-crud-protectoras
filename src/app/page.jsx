import Link from "next/link";
import VacunasLista from '@/components/Vacunas/Lista'
import Modal from '@/components/Modal'
import { Plus } from 'lucide-react'
import { Suspense } from 'react'
import VacunaInsertar from '@/components/Vacunas/Insertar'


export default function Home() {
  return (
    <div className='container mx-auto px-4 py-10 flex flex-col'>

      <h1 className='text-4xl text-blue-400 font-bold px-4 pb-2 mb-8 border-b-4 border-blue-100'>
        PROTECTORAS DE ANIMALES
      </h1>

      <Link href='/protectoras' className="block text-2xl">PROTECTORAS</Link>
      <Link href='/mascotas' className="block text-2xl">MASCOTAS</Link>
      <Link href='/vacunas' className="block text-2xl">VACUNAS</Link>

    </div>
  )
}


