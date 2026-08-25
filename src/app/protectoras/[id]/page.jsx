import Link from "next/link"
import { ArrowLeft, PawPrint } from "lucide-react"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import Image from 'next/image'

import { getMascotasIdNombre } from "@/lib/data/mascotas"
import { getProtectora, getProtectorasIdNombre } from "@/lib/data/protectoras"
import { DeleteProtectora, UpdateProtectora } from "@/components/protectoras"

import { BackLink } from "@/components/simpleui"
import { Spinner } from "@/components/simpleui"
import { defaultImage } from '@/lib/constants'





export async function generateStaticParams() {
    const protectoras = await getProtectorasIdNombre()
    if (!protectoras) return []

    return protectoras.map((protectora) => ({
        id: String(protectora.id),
    }))
}



export default function Page({ params }) {

    return (
        <div className='container mx-auto px-4 py-10'>

            <h1 className='px-4 pb-2 mb-8 border-b-4 border-blue-100 text-4xl text-blue-400 font-bold'>INFORMACIÓN DE PROTECTORA</h1>


            <Suspense fallback={<Spinner />}>
                <Content params={params} />
            </Suspense>
        </div>
    )
}






const Content = async ({ params }) => {
    'use cache'
    const { id } = await params

    const [protectora, mascotasIdNombre] = await Promise.all([
        getProtectora(id),
        getMascotasIdNombre()
    ])

    if (!protectora) notFound()

    protectora.mascotasIdNombre = mascotasIdNombre



    return (
        <>
            <BackLink className="mb-2 self-start size-10 grid place-content-center rounded-full border border-indigo-500 text-indigo-700 bg-indigo-200 hover:bg-indigo-500 hover:text-white hover:cursor-pointer" >
                <ArrowLeft />
            </BackLink>

            <div className='flex justify-between mt-10'>

                <div className="flex flex-col gap-4 text-xl">
                    <p className='text-3xl flex items-center gap-2'>
                        <PawPrint className="size-10" />{protectora.nombre}
                    </p>
                    <p className='text-slate-400'>{protectora.localidad}</p>
                    <p className='text-slate-400'>{protectora.telefono}</p>

                    {protectora.mascotas?.length > 0
                        ? <p className='font-bold'>Mascotas en esta protectora.</p>
                        : <p className='font-bold'>Esta protectora no tiene mascotas registradas.</p>
                    }
                    <div className='flex gap-2 flex-wrap'>
                        {protectora.mascotas.map(mascota => (
                            <Link href={'/mascotas/' + mascota.id} key={mascota.id} className='flex flex-col items-center'>
                                <Image src={mascota.foto || defaultImage} alt={mascota.nombre} width={80} height={80} className='size-20 rounded-full object-cover' />
                                <p>{mascota.nombre}</p>
                            </Link>
                        ))}
                    </div>

                </div>

                <div className='flex gap-2'>
                    <UpdateProtectora data={protectora} />
                    <DeleteProtectora data={protectora} />
                </div>
            </div >

        </>
    )
}




