import BackButton from "@/components/back-button";
import Modal from "@/components/modal";
import ProtectoraEliminar from "@/components/protectoras/eliminar";
import ProtectoraModificar from "@/components/protectoras/modificar";
import ProtectoraVer from "@/components/protectoras/ver";
import { obtenerProtectoraMascotasVacunas } from "@/lib/data";
import { ArrowLeft, Pencil, Trash } from "lucide-react";
import { notFound } from "next/navigation";



async function Protectora({ id }) {
    const protectora = await obtenerProtectoraMascotasVacunas(id)

    if (!protectora) notFound()

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
                        <ProtectoraModificar protectora={protectora} />
                    </Modal>

                    <Modal
                        icono={<Trash />}
                        className={'place-self-end p-1 rounded-full border border-red-500 text-red-700 bg-red-200 hover:bg-red-500 hover:text-white hover:cursor-pointer'}>
                        <ProtectoraEliminar protectora={protectora} />
                    </Modal>
                </div>

            </div>
            <ProtectoraVer protectora={protectora} enPagina />

        </>
    )
}


export default Protectora;