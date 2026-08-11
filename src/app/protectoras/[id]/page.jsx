import { Suspense } from "react"
import { UpdateProtectora, DeleteProtectora } from '@/app/protectoras/components';
import { getMascotasIdNombre } from "@/app/mascotas/data";
import { getProtectora } from "@/app/protectoras/data";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { Spinner } from "@/components/simpleui";
import Link from "next/link";
import BackButton from "@/components/back-button";





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
    const { id } = await params

    const [protectora, mascotasIdNombre] = await Promise.all([
        getProtectora(id),
        getMascotasIdNombre()
    ])

    protectora.mascotasIdNombre = mascotasIdNombre

    if (!protectora) notFound()



    return (
        <>
            <BackButton className="self-start size-10 grid place-content-center rounded-full border border-indigo-500 text-indigo-700 bg-indigo-200 hover:bg-indigo-500 hover:text-white hover:cursor-pointer" >
                <ArrowLeft />
            </BackButton>

            <div className='flex justify-between mt-10'>

                <div>
                    <p className='text-3xl'>{protectora.nombre}</p>
                    <p>{protectora.localidad}</p>
                    <p>{protectora.telefono}</p>

                    {protectora.mascotas?.length > 0
                        ? <p className='font-bold'>Mascotas en esta protectora.</p>
                        : <p className='font-bold'>Esta protectora no tiene mascotas registradas.</p>
                    }
                    <div className='flex gap-2 flex-wrap'>
                        {protectora.mascotas.map(mascota => (
                            <Link href={'/mascotas/' + mascota.id} key={mascota.id} className='flex flex-col items-center'>
                                <img src={mascota.foto} className='size-20 rounded-full' />
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




