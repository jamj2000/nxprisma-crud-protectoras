import MascotaEliminar from "@/components/Mascotas/Eliminar";
import MascotaModificar from "@/components/Mascotas/Modificar";
import MascotaVer from "@/components/Mascotas/Ver";
import Modal from "@/components/Modal";
import { obtenerMascota } from "@/lib/data";
import { Pencil, Trash } from "lucide-react";
import { notFound } from "next/navigation";



async function page({ params }) {
    const { id } = await params
    const mascota = await obtenerMascota(id)

    if (!mascota) notFound()

    return (
        <>
            <div className='flex gap-1 justify-end mb-2'>
                <Modal
                    icono={<Pencil />}
                    className={'place-self-end p-1 rounded-full border border-orange-500 text-orange-700 bg-orange-200 hover:bg-orange-500 hover:text-white hover:cursor-pointer'}>
                    <MascotaModificar mascota={mascota} />
                </Modal>

                <Modal
                    icono={<Trash />}
                    className={'place-self-end p-1 rounded-full border border-red-500 text-red-700 bg-red-200 hover:bg-red-500 hover:text-white hover:cursor-pointer'}>
                    <MascotaEliminar mascota={mascota} />
                </Modal>

            </div>
            <MascotaVer mascota={mascota} />
        </>
    )
}


export default page;
