import { Spinner } from '@/components/simpleui'
import { DeleteVacuna, UpdateVacuna } from '@/components/vacunas'
import { getMascotasIdNombre } from '@/lib/data/mascotas'
import { getVacuna, getVacunasIdNombre } from '@/lib/data/vacunas'
import { Suspense, ViewTransition } from "react"
import { ArrowLeft, Syringe } from 'lucide-react'
import { BackLink } from '@/components/simpleui'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { defaultImage } from '@/lib/constants'




export async function generateStaticParams() {
    const vacunas = await getVacunasIdNombre()
    if (!vacunas) return []

    return vacunas.map((vacuna) => ({
        id: String(vacuna.id),
    }))
}



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
    'use cache'
    const { id } = await params

    const [vacuna, mascotasIdNombre] = await Promise.all([
        getVacuna(id),
        getMascotasIdNombre()
    ])

    if (!vacuna) notFound()

    vacuna.mascotasIdNombre = mascotasIdNombre



    return (
        <>
            <BackLink className="mb-2 self-start size-10 grid place-content-center rounded-full border border-indigo-500 text-indigo-700 bg-indigo-200 hover:bg-indigo-500 hover:text-white hover:cursor-pointer" >
                <ArrowLeft />
            </BackLink>

            <div className='flex justify-between mt-10'>

                <div className="flex flex-col gap-4 text-xl">

                    <p className='text-3xl flex items-center gap-2'>
                        <Syringe className="size-10 shrink-0" />{vacuna.nombre}
                    </p>

                    <p className='text-slate-400'>{vacuna.descripcion}</p>
                    <p className='text-slate-400'>Vacuna para {vacuna.especie}</p>

                    {vacuna.mascotas?.length > 0
                        ? <p className='font-bold'>Mascotas con esta vacuna.</p>
                        : <p className='font-bold'>No hay mascotas con esta vacuna.</p>
                    }
                    <div className='flex gap-2 flex-wrap'>
                        {vacuna.mascotas.map(mascota => (
                            <Link prefetch href={'/mascotas/' + mascota.id} key={mascota.id} className='flex flex-col items-center'>
                                <ViewTransition name={`mascota-foto-${data.id}`}>
                                    <Image src={mascota.foto || defaultImage} alt={mascota.nombre} width={80} height={80} className='size-20 rounded-full object-cover' />
                                </ViewTransition>
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





