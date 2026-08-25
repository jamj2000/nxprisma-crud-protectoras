import { List, List2, Table, Spinner } from '@/components/simpleui'
import { CardProtectora, CreateProtectora, DeleteProtectora, UpdateProtectora, ViewProtectora } from '@/components/protectoras'
import { getMascotasIdNombre } from '@/lib/data/mascotas'
import { getProtectoras, getProtectorasSinMascotas } from '@/lib/data/protectoras'
import { Suspense } from 'react'
import Link from 'next/link'



export default function Page() {
    return (
        <div className='container mx-auto px-4 py-10 flex flex-col'>

            <h1 className='px-4 pb-2 text-4xl text-blue-400 font-bold mb-8 border-b-4 border-blue-100'>PROTECTORAS</h1>

            <Suspense fallback={<Spinner />}>
                <Content />
            </Suspense>

            <h2 className='mt-10 text-2xl text-blue-400 font-bold'>PROTECTORAS SIN MASCOTAS</h2>

            <Suspense fallback={<Spinner />}>
                <SinMascotas />
            </Suspense>

        </div>
    )
}



const Content = async () => {
    const [protectoras, mascotasIdNombre] = await Promise.all([
        getProtectoras(),
        getMascotasIdNombre()
    ])

    const data = protectoras.map(p => ({ ...p, mascotasIdNombre }))

    // console.log(JSON.stringify(data, null, 2))


    // return (
    //     <List
    //         prefix="/protectoras"
    //         card={CardProtectora}
    //         data={data}
    //         columns={[
    //             { name: "nombre", label: "Nombre" },
    //             { name: "localidad", label: "Localidad" },
    //             { name: "telefono", label: "Telefono" }
    //         ]}
    //         actions={[
    //             ViewProtectora,
    //             UpdateProtectora,
    //             DeleteProtectora
    //         ]}
    //         sort="nombre"
    //     >
    //         <div className="flex justify-between">
    //             <h2 className="text-2xl text-center inline"></h2>
    //             <CreateProtectora data={{ mascotasIdNombre: mascotasIdNombre }} />
    //         </div>
    //     </List>
    // )


    return (
        <Table
            prefix="/protectoras"
            data={data}
            columns={[
                { name: "nombre", label: "Nombre" },
                { name: "localidad", label: "Localidad" },
                { name: "telefono", label: "Telefono" }
            ]}
            actions={[
                ViewProtectora,
                UpdateProtectora,
                DeleteProtectora
            ]}
            sort="nombre"
        >
            <div className="flex justify-between">
                <h2 className="text-2xl text-center inline"></h2>
                <CreateProtectora data={{ mascotasIdNombre: mascotasIdNombre }} />
            </div>
        </Table>
    )

}




const SinMascotas = async () => {
    const protectoras = await getProtectorasSinMascotas()
    return (
        <div className='text-xl'>
            {protectoras?.length > 0 ? (
                <ul className='list-disc list-inside'>
                    {protectoras.map((protectora) => (
                        <li key={protectora.id}>
                            <Link href={"/protectoras/" + protectora.id} className='text-blue-400 hover:underline hover:underline-offset-4'>
                                {protectora.nombre}
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay protectoras sin mascotas.</p>
            )}
        </div>
    )
}