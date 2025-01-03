import Link from "next/link"
import Modal from "@/components/Modal"
import VacunaVer from "@/components/Vacunas/Ver"
import VacunaModificar from '@/components/Vacunas/Modificar';
import VacunaEliminar from '@/components/Vacunas/Eliminar';
import { obtenerVacunas } from "@/lib/data"
import { Eye, Pencil, Trash } from 'lucide-react'


async function Vacunas() {
    const vacunas = await obtenerVacunas()

    return (
        vacunas.map((vacuna) => (

            <div key={vacuna.id} className="px-4 py-1 flex justify-between items-center even:bg-blue-100 odd:bg-slate-100">
                <Link href={`/vacunas/${vacuna.id}`} className="font-bold hover:text-blue-700">{vacuna.nombre}</Link>
                <div className='flex gap-1'>
                    <Modal
                        icono={<Eye />}
                        className={'place-self-end p-1 rounded-full border border-blue-500 text-blue-700 bg-blue-200 hover:bg-blue-500 hover:text-white hover:cursor-pointer'}>
                        <VacunaVer vacuna={vacuna} />
                    </Modal>
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
            </div>

        ))
    )
}

export default Vacunas