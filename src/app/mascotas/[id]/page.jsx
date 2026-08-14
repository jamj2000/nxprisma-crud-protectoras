import { Spinner } from '@/components/simpleui'
import { DeleteMascota, UpdateMascota } from '@/app/mascotas/components'
import { getMascota, getMascotasIdNombre } from '@/app/mascotas/data'
import { getProtectorasIdNombre } from '@/app/protectoras/data'
import { getVacunasIdNombre } from '@/app/vacunas/data'
import { Suspense, ViewTransition } from "react"
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import BackButton from '@/components/back-button'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
    const mascotas = await getMascotasIdNombre()
    if (!mascotas) return []

    return mascotas.map((mascota) => ({
        id: String(mascota.id),
    }))
}

export default function Page({ params }) {

    return (
        <div className='container mx-auto px-4 py-10'>

            <h1 className='px-4 pb-2 mb-8 border-b-4 border-blue-100 text-4xl text-blue-400 font-bold'>INFORMACIÓN DE MASCOTA</h1>

            <Suspense fallback={<Spinner />}>
                <Content params={params} />
            </Suspense>
        </div>
    )
}



const Content = async ({ params }) => {
    'use cache'
    const { id } = await params

    const [mascota, vacunasIdNombre, protectorasIdNombre] = await Promise.all([
        getMascota(id),
        getVacunasIdNombre(),
        getProtectorasIdNombre(),
    ])

    if (!mascota) notFound()

    mascota.vacunasIdNombre = vacunasIdNombre
    mascota.protectorasIdNombre = protectorasIdNombre

    const data = mascota



    return (
        <>
            <BackButton href="/mascotas" className="mb-2 self-start size-10 grid place-content-center rounded-full border border-indigo-500 text-indigo-700 bg-indigo-200 hover:bg-indigo-500 hover:text-white hover:cursor-pointer" >
                <ArrowLeft />
            </BackButton>

            <ViewTransition name={`mascota-foto-${mascota.id}`} share="morph">
                <img src={mascota.foto} className='mx-auto' />
            </ViewTransition>

            <div className='flex justify-between mt-10'>

                <div>
                    <p className='text-3xl'>{mascota.nombre}</p>
                    <p>{mascota.especie}</p>

                    <p className='font-bold'>Protectora</p>
                    <p>
                        {mascota.protectora?.nombre
                            ? <Link href={'/protectoras/' + mascota.protectora.id}>{mascota.protectora.nombre}</Link>
                            : "(Sin protectora)"
                        }
                    </p>

                    <p className='font-bold'>Vacunas administradas</p>
                    {mascota.vacunas.length > 0
                        ? < ul className='text-left list-disc list-inside'>
                            {mascota.vacunas.map(vacuna => (
                                <Link href={'/vacunas/' + vacuna.id} key={vacuna.id}>
                                    <li>{vacuna.nombre}</li>
                                </Link>
                            ))}
                        </ul>
                        : "(Sin vacunas)"
                    }
                </div>

                <div className='flex gap-2'>
                    <UpdateMascota data={data} />
                    <DeleteMascota data={data} />
                </div>
            </div >

        </>
    )
}





