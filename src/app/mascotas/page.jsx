import { CreateMascota, DeleteMascota, UpdateMascota, ViewMascota } from '@/app/mascotas/components'
import { Table } from '@/components/simpleui'
import { getMascotas, getVacunasIdNombre } from '@/lib/data'
import { Suspense } from 'react'



export default function MascotasPage() {
    return (
        <div className='container mx-auto px-4 py-10 flex flex-col'>
            <div className='flex justify-between px-4 pb-2 mb-8 border-b-4 border-blue-100'>
                <h1 className='text-4xl text-blue-400 font-bold'>MASCOTAS</h1>
            </div>


            <Suspense>
                <MascotasData />
            </Suspense>

        </div>
    )
}



const MascotasData = async () => {
    const [mascotas, vacunasIdNombre] = await Promise.all([
        getMascotas(),
        getVacunasIdNombre()
    ])

    const data = mascotas.map(m => ({ ...m, vacunasIdNombre }))

    // console.log(JSON.stringify(data, null, 2))

    return (
        <Table
            prefix="/mascotas"
            data={data}
            columns={[
                { name: "nombre", label: "Nombre" },
                { name: "descripcion", label: "Descripción" }
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
        </Table>
    )

}