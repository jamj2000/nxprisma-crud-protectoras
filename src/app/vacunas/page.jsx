import { Spinner, Table } from '@/components/simpleui'
import { Suspense } from 'react'
import { getMascotasIdNombre, getVacunas } from '@/lib/data'
import { CreateVacuna, DeleteVacuna, UpdateVacuna, ViewVacuna } from './components'

export default function PaginaVacunas() {
    return (
        <div className='container mx-auto px-4 py-10 flex flex-col'>
            <div className='flex justify-between px-4 pb-2 mb-8 border-b-4 border-blue-100'>
                <h1 className='text-4xl text-blue-400 font-bold'>VACUNAS</h1>
            </div>


            <Suspense>
                <VacunasData />
            </Suspense>

        </div>
    )
}


const VacunasData = async () => {
    const [vacunas, mascotasIdNombre] = await Promise.all([
        getVacunas(),
        getMascotasIdNombre()
    ])

    const data = vacunas.map(v => ({ ...v, mascotasIdNombre }))

    // console.log(JSON.stringify(data, null, 2))

    return (
        <Table
            prefix="/vacunas"
            data={data}
            columns={[
                { name: "nombre", label: "Nombre" },
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
        </Table>
    )

}