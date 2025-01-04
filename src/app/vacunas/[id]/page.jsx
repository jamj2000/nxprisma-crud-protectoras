import Modal from "@/components/Modal";
import VacunaEliminar from "@/components/Vacunas/Eliminar";
import VacunaModificar from "@/components/Vacunas/Modificar";
import VacunaVer from "@/components/Vacunas/Ver";
import { obtenerVacuna } from "@/lib/data";
import { Pencil, Trash } from "lucide-react";
import { notFound } from "next/navigation";


async function page({ params }) {
    const { id } = await params
    const vacuna = await obtenerVacuna(id)

    if (!vacuna) notFound()

    return (
        <>
            <div className='flex gap-1 justify-end mb-2'>
                <Modal
                    icono={<Pencil />}
                    className={'place-self-end p-1 rounded-full border border-orange-500 text-orange-700 bg-orange-200 hover:bg-orange-500 hover:text-white hover:cursor-pointer'}>
                    <VacunaModificar vacuna={vacuna} />
                </Modal>

                <Modal
                    icono={<Trash />}
                    className={'place-self-end p-1 rounded-full border border-red-500 text-red-700 bg-red-200 hover:bg-red-500 hover:text-white hover:cursor-pointer'}>
                    <VacunaEliminar vacuna={vacuna} />
                </Modal>

            </div>
            <VacunaVer vacuna={vacuna} />
        </>
    )
}


export default page;
