import BackButton from "@/components/back-button";
import MascotaEliminar from "@/components/mascotas/eliminar";
import MascotaModificar from "@/components/mascotas/modificar";
import MascotaVer from "@/components/mascotas/ver";
import Modal from "@/components/modal";
import { obtenerMascota, obtenerProtectoras, obtenerVacunas } from "@/lib/data";
import { ArrowLeft, Pencil, Trash } from "lucide-react";
import { notFound } from "next/navigation";


async function Mascota({ id }) {
    const mascota = await obtenerMascota(id)  // incluye vacunas
    const protectoras = await obtenerProtectoras() // incluye mascotas
    const vacunas = await obtenerVacunas()

    if (!mascota) notFound()

    return (
        <>
            <div className='flex justify-between mb-4'>
                <BackButton className="p-1 rounded-full border border-indigo-500 text-indigo-700 bg-indigo-200 hover:bg-indigo-500 hover:text-white hover:cursor-pointer" >
                    <ArrowLeft />
                </BackButton>

                <div className='flex gap-1'>
                    <Modal
                        icono={<Pencil />}
                        className={'place-self-end p-1 rounded-full border border-orange-500 text-orange-700 bg-orange-200 hover:bg-orange-500 hover:text-white hover:cursor-pointer'}>
                        <MascotaModificar mascota={mascota} protectoras={protectoras} vacunas={vacunas} />
                    </Modal>
                    <Modal
                        icono={<Trash />}
                        className={'place-self-end p-1 rounded-full border border-red-500 text-red-700 bg-red-200 hover:bg-red-500 hover:text-white hover:cursor-pointer'}>
                        <MascotaEliminar mascota={mascota} protectoras={protectoras} />
                    </Modal>
                </div>

            </div>
            <MascotaVer mascota={mascota} protectoras={protectoras} />
        </>
    )
}

export default Mascota
