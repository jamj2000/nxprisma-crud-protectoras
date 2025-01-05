import MascotaInsertar from '@/components/Mascotas/Insertar'
import MascotasLista from '@/components/Mascotas/Lista'
import Modal from '@/components/Modal'
import { Plus } from 'lucide-react'
import { Suspense } from 'react'


export default async function page({ searchParams }) {
    let { query, sort, page, per_page } = await searchParams

    // controlamos valores undefined
    query ??= ''
    sort ??= 'createdAt desc'
    page ??= 1
    per_page ??= 5

    // controlamos valor 0 o negativos en page
    if (Number(page) < 1) redirect('/mascotas?' + new URLSearchParams({ query, sort, page: 1 }))

    return (
        <div className='container mx-auto px-4 py-10 flex flex-col'>
            <div className='flex justify-between px-4 pb-2 mb-8 border-b-4 border-blue-100'>
                <h1 className='text-4xl text-blue-400 font-bold'>MASCOTAS</h1>

                {/* <Modal
                    icono={<Plus />}
                    className={'place-self-end p-1 rounded-full border border-green-500 text-green-700 bg-green-200 hover:bg-green-500 hover:text-white hover:cursor-pointer'}>
                    <MascotaInsertar />
                </Modal> */}
            </div>


            <Suspense fallback={
                <div className="text-2xl text-blue-200 font-bold animate-pulse">
                    Obteniendo mascotas ...
                </div>
            }>
                <MascotasLista query={query} sort={sort} page={page} per_page={per_page} />
            </Suspense>

        </div>
    )
}
