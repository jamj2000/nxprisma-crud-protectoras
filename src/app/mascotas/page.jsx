import MascotasLista from '@/components/mascotas/lista'
import { Suspense } from 'react'

import Loading from './loading';


export default async function PaginaMascotas({ searchParams }) {
    let { query, sort, page, limit } = await searchParams

    // controlamos valores undefined
    query ??= ''
    sort ??= 'createdAt desc'
    page ??= 1
    limit ??= 10

    // controlamos valor 0 o negativos en page
    if (Number(page) < 1) redirect('/mascotas?' + new URLSearchParams({ query, sort, page: 1 }))

    return (
        <div className='container mx-auto px-4 py-10 flex flex-col'>
            <div className='flex justify-between px-4 pb-2 mb-8 border-b-4 border-blue-100'>
                <h1 className='text-4xl text-blue-400 font-bold'>MASCOTAS</h1>
            </div>


            <Suspense fallback={<Loading />}>
                <MascotasLista query={query} sort={sort} page={page} limit={10} />
            </Suspense>

        </div>
    )
}
