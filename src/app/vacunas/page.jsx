import { Suspense } from 'react'
import { CardVacuna, CardVacuna2, CreateVacuna, DeleteVacuna, UpdateVacuna, ViewVacuna } from '@/app/vacunas/components'
import { getMascotasIdNombre } from '@/app/mascotas/data'
import { getVacunas, getVacunasSinAdministrar } from '@/app/vacunas/data'
import { List, List2, Table, Spinner } from '@/components/simpleui'
import Link from 'next/link'


export default function Page() {
    return (
        <div className='container mx-auto px-4 py-10 flex flex-col'>

            <h1 className='px-4 pb-2 text-4xl text-blue-400 font-bold mb-8 border-b-4 border-blue-100'>VACUNAS</h1>

            <Suspense fallback={<Spinner />}>
                <Content />
            </Suspense>

            <h2 className='mt-10 text-2xl text-blue-400 font-bold'>VACUNAS SIN ADMINISTRAR</h2>

            <Suspense fallback={<Spinner />}>
                <SinAdministrar />
            </Suspense>


        </div>
    )
}


const Content = async () => {
    const [vacunas, mascotasIdNombre] = await Promise.all([
        getVacunas(),
        getMascotasIdNombre()
    ])

    const data = vacunas.map(v => ({ ...v, mascotasIdNombre }))

    return (
        <List2
            prefix="/vacunas"
            card={CardVacuna2}
            data={data}
            columns={[
                { name: "nombre", label: "Nombre" },
                { name: "descripcion", label: "Descripción" },
                { name: "especie", label: "Especie" },
            ]}
            actions={[
                ViewVacuna,
                UpdateVacuna,
                DeleteVacuna
            ]}
            sort="nombre"
        >
            <div className="flex justify-between">
                <h2 className="text-2xl text-center inline"></h2>
                <CreateVacuna data={{ mascotasIdNombre: mascotasIdNombre }} />
            </div>
        </List2>
    )

    //     return (
    //         <Table
    //             prefix="/vacunas"
    //             data={data}
    //             columns={[
    //                 { name: "nombre", label: "Nombre" },
    //                 { name: "especie", label: "Especie" },
    //             ]}
    //             actions={[
    //                 ViewVacuna,
    //                 UpdateVacuna,
    //                 DeleteVacuna
    //             ]}
    //             sort="nombre"
    //         >
    //             <div className="flex justify-between">
    //                 <h2 className="text-2xl text-center inline"></h2>
    //                 <CreateVacuna data={{ mascotasIdNombre: mascotasIdNombre }} />
    //             </div>
    //         </Table>
    //     )
}



const SinAdministrar = async () => {
    const vacunas = await getVacunasSinAdministrar()
    return (
        <div>
            {vacunas?.length > 0 ? (
                <ul className='list-disc list-inside'>
                    {vacunas.map((vacuna) => (
                        <li key={vacuna.id}>
                            <Link href={"/vacunas/" + vacuna.id} >{vacuna.nombre}</Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay vacunas sin administrar.</p>
            )}
        </div>
    )
}