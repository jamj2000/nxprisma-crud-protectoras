import { Spinner } from '@/components/simpleui'
import { DeleteVacuna, UpdateVacuna } from '@/app/vacunas/components'
import { getMascotasIdNombre } from '@/app/mascotas/data'
import { getVacuna } from '@/app/vacunas/data'
import { Suspense } from "react"
import { ArrowLeft } from 'lucide-react'
import BackButton from '@/components/back-button'
import Link from 'next/link'


export default async function Page({ params }) {


    return (
        <div className='container mx-auto px-4 py-10'>

            <h1 className='px-4 pb-2 mb-8 border-b-4 border-blue-100 text-4xl text-blue-400 font-bold'>INFORMACIÓN DE VACUNA</h1>


            <Suspense fallback={<Spinner />}>
                <Content params={params} />
            </Suspense>
        </div>
    )
}


const Content = async ({ params }) => {
    const { id } = await params

    const [vacuna, mascotasIdNombre] = await Promise.all([
        getVacuna(id),
        getMascotasIdNombre()
    ])

    vacuna.mascotasIdNombre = mascotasIdNombre

    if (!vacuna) notFound()



    return (
        <>
            <BackButton className="mb-2 self-start size-10 grid place-content-center rounded-full border border-indigo-500 text-indigo-700 bg-indigo-200 hover:bg-indigo-500 hover:text-white hover:cursor-pointer" >
                <ArrowLeft />
            </BackButton>

            <div className='flex justify-between mt-10'>

                <div>
                    <p className='text-3xl'>{vacuna.nombre}</p>
                    <p>{vacuna.especie}</p>

                    {vacuna.mascotas?.length > 0
                        ? <p className='font-bold'>Mascotas con esta vacuna.</p>
                        : <p className='font-bold'>No hay mascotas con esta vacuna.</p>
                    }
                    <div className='flex gap-2 flex-wrap'>
                        {vacuna.mascotas.map(mascota => (
                            <Link href={'/mascotas/' + mascota.id} key={mascota.id} className='flex flex-col items-center'>
                                <img src={mascota.foto} className='size-20 rounded-full' />
                                <p>{mascota.nombre}</p>
                            </Link>
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





