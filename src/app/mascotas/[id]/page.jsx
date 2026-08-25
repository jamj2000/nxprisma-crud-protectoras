import { Spinner } from '@/components/simpleui'
import { DeleteMascota, UpdateMascota } from '@/components/mascotas'
import { getMascota, getMascotasIdNombre } from '@/lib/data/mascotas'
import { getProtectorasIdNombre } from '@/lib/data/protectoras'
import { getVacunasIdNombre } from '@/lib/data/vacunas'
import { Suspense, ViewTransition } from "react"
import { ArrowLeft, Squirrel } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { BackLink } from '@/components/simpleui'
import { notFound } from 'next/navigation'
import { defaultImage } from '@/lib/constants'

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

    const data = { ...mascota, fecha_nacimiento: mascota?.fecha_nacimiento?.toISOString().split('T')[0] }



    return (
        <>
            <BackLink className="mb-2 self-start size-10 grid place-content-center rounded-full border border-indigo-500 text-indigo-700 bg-indigo-200 hover:bg-indigo-500 hover:text-white hover:cursor-pointer" >
                <ArrowLeft />
            </BackLink>


            {/* <ViewTransition name={`mascota-foto-${data.id}`}> */}
            <Image
                src={data.foto || defaultImage}
                alt={mascota.nombre}
                width={384}
                height={320}
                priority
                className="w-full max-w-sm h-80 object-cover rounded-xl shadow-md"
            />
            {/* </ViewTransition> */}

            <div className='flex justify-between mt-10'>

                <div className="flex flex-col gap-4 text-xl">

                    <p className='text-3xl flex items-center gap-2'>
                        <Squirrel className="size-10" />{mascota.nombre}
                    </p>
                    <p className='text-slate-400'>{mascota.descripcion}</p>

                    <p className='text-slate-400'>Nació el {new Intl.DateTimeFormat("es-ES", {
                        dateStyle: "full",
                        timeZone: "Europe/Madrid",
                    }).format(mascota.fecha_nacimiento)}</p>

                    {/* <p>Nació en {mascota.fecha_nacimiento.toISOString().split('T')[0]}</p> */}
                    <p className='font-bold'>Protectora</p>
                    <p>
                        {mascota.protectora?.nombre
                            ? <Link href={'/protectoras/' + mascota.protectora.id} className='text-blue-400 hover:underline hover:underline-offset-4'>
                                {mascota.protectora.nombre}
                            </Link>
                            : "(Sin protectora)"
                        }
                    </p>

                    <p className='font-bold'>Vacunas administradas</p>
                    {mascota.vacunas.length > 0
                        ? < ul className='text-left list-disc list-inside text-blue-400'>
                            {mascota.vacunas.map(vacuna => (
                                <Link href={'/vacunas/' + vacuna.id} key={vacuna.id} className='text-blue-400 hover:underline hover:underline-offset-4'>
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





