import { Spinner } from '@/components/simpleui'
import { Suspense } from "react"


import BackButton from "@/components/back-button";
import { UpdateProtectora, DeleteProtectora } from '../components';
import { getMascotasIdNombre, getProtectora } from "@/lib/data";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";






export default function ProtectoraPage({ params }) {

    return (
        <div className='container mx-auto px-4 py-10 flex flex-col'>
            <div className='flex justify-between px-4 pb-2 mb-8 border-b-4 border-blue-100'>
                <h1 className='text-4xl text-blue-400 font-bold'>INFORMACIÓN DE PROTECTORA</h1>
            </div>

            <Suspense fallback={<Spinner />}>
                <ProtectoraContent params={params} />
            </Suspense>
        </div>
    )
}






const ProtectoraContent = async ({ params }) => {
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

                    <p className='font-bold'>Mascotas en esta protectora</p>
                    <div className='flex gap-2'>
                        {protectora.mascotas.map(mascota => (
                            <div key={mascota.id} className='flex flex-col items-center'>
                                <img src={mascota.foto} className='size-20 rounded-full' />
                                <p>{mascota.nombre}</p>
                            </div>
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




