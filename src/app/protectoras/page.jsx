import ProtectorasLista from '@/components/Protectoras/Lista'
import Spinner from '@/components/Spinner'
import { Suspense } from 'react'



export default function PaginaProtectoras() {
    return (
        <div className='container mx-auto px-4 py-10 flex flex-col'>
            <div className='flex justify-between px-4 pb-2 mb-8 border-b-4 border-blue-100'>
                <h1 className='text-4xl text-blue-400 font-bold'>PROTECTORAS</h1>
            </div>


            <Suspense fallback={<Spinner />}>
                <ProtectorasLista />
            </Suspense>

        </div>
    )
}
