import VacunasLista from '@/components/Vacunas/Lista'
import Modal from '@/components/Modal'
import { Plus } from 'lucide-react'
import { Suspense } from 'react'
import VacunaInsertar from '@/components/Vacunas/Insertar'
import Spinner from '@/components/Spinner'


export default function PaginaVacunas() {
    return (
        <div className='container mx-auto px-4 py-10 flex flex-col'>
            <div className='flex justify-between px-4 pb-2 mb-8 border-b-4 border-blue-100'>
                <h1 className='text-4xl text-blue-400 font-bold'>VACUNAS</h1>
            </div>


            <Suspense fallback={<Spinner />}>
                <VacunasLista />
            </Suspense>

        </div>
    )
}
