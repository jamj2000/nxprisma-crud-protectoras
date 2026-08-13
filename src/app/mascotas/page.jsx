import { CardMascota, CreateMascota, DeleteMascota, UpdateMascota, ViewMascota } from '@/app/mascotas/components'
import { getMascotas, getMascotasSinProtectora, getMascotasSinVacunar } from '@/app/mascotas/data'
import { getProtectorasIdNombre } from '@/app/protectoras/data'
import { getVacunasIdNombre } from '@/app/vacunas/data'
import { Suspense } from 'react'
import { List, Table } from '@/components/simpleui'
import Link from 'next/link'


export default function Page() {
    return (
        <div className='container mx-auto px-4 py-10 flex flex-col'>

            <h1 className='px-4 pb-2 text-4xl text-blue-400 font-bold mb-8 border-b-4 border-blue-100'>MASCOTAS</h1>

            <Suspense>
                <Content />
            </Suspense>

            <h2 className='mt-10 text-2xl text-blue-400 font-bold'>MASCOTAS SIN PROTECTORA</h2>

            <Suspense>
                <SinProtectora />
            </Suspense>

            <h2 className='mt-10 text-2xl text-blue-400 font-bold'>MASCOTAS SIN VACUNAR</h2>

            <Suspense>
                <SinVacunar />
            </Suspense>

        </div>
    )
}



const Content = async () => {
    const [mascotas, vacunasIdNombre, protectorasIdNombre] = await Promise.all([
        getMascotas(),
        getVacunasIdNombre(),
        getProtectorasIdNombre()
    ])

    const data = mascotas.map(m => ({
        ...m,
        fecha_nacimiento: m.fecha_nacimiento?.toISOString().split('T')[0],
        vacunasIdNombre,
        protectorasIdNombre
    }))

    // console.log(JSON.stringify(mascotas, null, 2))


    return (
        <List
            prefix="/mascotas"
            card={CardMascota}
            data={data}
            columns={[
                { name: "nombre", label: "Nombre" },
                { name: "descripcion", label: "Descripción" },
                { name: "fecha_nacimiento", label: "Fecha de nacimiento" }
            ]}
            actions={[
                ViewMascota,
                UpdateMascota,
                DeleteMascota
            ]}
            sort="nombre"
        >
            <div className="flex justify-between">
                <h2 className="text-2xl text-center inline"></h2>
                <CreateMascota data={{ vacunasIdNombre: vacunasIdNombre }} />
            </div>
        </List>
    )

    // return (
    //     <Table
    //         prefix="/mascotas"
    //         data={data}
    //         columns={[
    //             { name: "nombre", label: "Nombre" },
    //             { name: "descripcion", label: "Descripción" },
    //             { name: "fecha_nacimiento", label: "Fecha de nacimiento" }
    //         ]}
    //         actions={[
    //             ViewMascota,
    //             UpdateMascota,
    //             DeleteMascota
    //         ]}
    //         sort="nombre"
    //     >
    //         <div className="flex justify-between">
    //             <h2 className="text-2xl text-center inline"></h2>
    //             <CreateMascota data={{ vacunasIdNombre: vacunasIdNombre }} />
    //         </div>
    //     </Table>
    // )
}



const SinProtectora = async () => {
    const mascotas = await getMascotasSinProtectora();

    return (
        <div>
            {mascotas?.length ? (
                <ul className='list-disc list-inside'>
                    {mascotas.map((mascota) => (
                        <li key={mascota.id}>
                            <Link href={"/mascotas/" + mascota.id} >{mascota.nombre}</Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay mascotas sin protectora.</p>
            )}
        </div>
    )
}


const SinVacunar = async () => {

    const mascotas = await getMascotasSinVacunar()

    return (
        <div>
            {mascotas?.length ? (
                <ul className='list-disc list-inside'>
                    {mascotas.map((mascota) => (
                        <li key={mascota.id}>
                            <Link href={"/mascotas/" + mascota.id} >{mascota.nombre}</Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay mascotas sin vacunar.</p>
            )}
        </div>
    )
}
