import VacunasLista from '@/components/vacunas/lista'
import Spinner from '@/components/spinner'
import { Suspense } from 'react'

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
