import { Spinner } from '@/components/simpleui'
import { getMascotasIdNombre, getVacuna } from '@/lib/data'
import { Suspense } from "react"
import { DeleteVacuna, UpdateVacuna } from '../components'
import BackButton from '@/components/back-button'
import { ArrowLeft } from 'lucide-react'


export default async function VacunaPage({ params }) {


    return (
        <div className='container mx-auto px-4 py-10 flex flex-col'>
            <div className='flex justify-between px-4 pb-2 mb-8 border-b-4 border-blue-100'>
                <h1 className='text-4xl text-blue-400 font-bold'>INFORMACIÓN DE PROTECTORA</h1>
            </div>

            <Suspense fallback={<Spinner />}>
                <VacunaContent params={params} />
            </Suspense>
        </div>
    )
}


const VacunaContent = async ({ params }) => {
    const { id } = await params

    const [vacuna, mascotasIdNombre] = await Promise.all([
        getVacuna(id),
        getMascotasIdNombre()
    ])

    vacuna.mascotasIdNombre = mascotasIdNombre

    if (!vacuna) notFound()



    return (
        <>
            <BackButton className="self-start size-10 grid place-content-center rounded-full border border-indigo-500 text-indigo-700 bg-indigo-200 hover:bg-indigo-500 hover:text-white hover:cursor-pointer" >
                <ArrowLeft />
            </BackButton>

            <div className='flex justify-between mt-10'>

                <div>
                    <p className='text-3xl'>{vacuna.nombre}</p>
                    <p>{vacuna.especie}</p>

                    <p className='font-bold'>Mascotas con esta vacuna</p>
                    <div className='flex gap-2'>
                        {vacuna.mascotas.map(mascota => (
                            <div key={mascota.id} className='flex flex-col items-center'>
                                <img src={mascota.foto} className='size-20 rounded-full' />
                                <p>{mascota.nombre}</p>
                            </div>
                        ))}
                    </div>

                </div>

                <div className='flex gap-2'>
                    <UpdateVacuna data={vacuna} />
                    <DeleteVacuna data={vacuna} />
                </div>
            </div >

        </>
    )
}





