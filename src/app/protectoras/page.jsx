import { CreateProtectora, DeleteProtectora, UpdateProtectora, ViewProtectora } from '@/app/protectoras/components'
import { Spinner, Table } from '@/components/simpleui'
import { getMascotasIdNombre, getProtectoras } from '@/lib/data'
import { Suspense } from 'react'



export default function ProtectorasPage() {
    return (
        <div className='container mx-auto px-4 py-10 flex flex-col'>
            <div className='flex justify-between px-4 pb-2 mb-8 border-b-4 border-blue-100'>
                <h1 className='text-4xl text-blue-400 font-bold'>PROTECTORAS</h1>
            </div>


            <Suspense>
                <ProtectorasData />
            </Suspense>

        </div>
    )
}



const ProtectorasData = async () => {
    const [protectoras, mascotasIdNombre] = await Promise.all([
        getProtectoras(),
        getMascotasIdNombre()
    ])

    const data = protectoras.map(p => ({ ...p, mascotasIdNombre }))

    // console.log(JSON.stringify(data, null, 2))

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