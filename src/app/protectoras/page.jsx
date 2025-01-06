import ProtectorasLista from '@/components/Protectoras/Lista'
import { Suspense } from 'react'



export default function page() {
    return (
        <div className='container mx-auto px-4 py-10 flex flex-col'>
            <div className='flex justify-between px-4 pb-2 mb-8 border-b-4 border-blue-100'>
                <h1 className='text-4xl text-blue-400 font-bold'>PROTECTORAS</h1>
            </div>


            <Suspense fallback={
                <div className="text-2xl text-blue-200 font-bold animate-pulse">
                    Obteniendo protectoras ...
                </div>
            }>
                <ProtectorasLista />
            </Suspense>

        </div>
    )
}
