import Link from "next/link"
import Modal from "@/components/modal"
import VacunaVer from "@/components/vacunas/ver"
import VacunaModificar from '@/components/vacunas/modificar';
import VacunaEliminar from '@/components/vacunas/eliminar';
import { obtenerVacunasMascotas, obtenerMascotas } from "@/lib/data"
import { Eye, Pencil, Plus, Trash } from 'lucide-react'
import VacunaInsertar from "./insertar";


async function Vacunas() {
    const vacunas = await obtenerVacunasMascotas()
    const mascotas = await obtenerMascotas()

    return (
        <>
            <Modal
                icono={<Plus />}
                className={'mx-4 mb-4 place-self-end p-1 rounded-full border border-green-500 text-green-700 bg-green-200 hover:bg-green-500 hover:text-white hover:cursor-pointer'}>
                <VacunaInsertar mascotas={mascotas} />
            </Modal>


            {vacunas.map((vacuna) => (

                <div key={vacuna.id} className="px-4 py-1 flex justify-between items-center even:bg-blue-100 odd:bg-slate-100">

                    <Link
                        href={`/vacunas/${vacuna.id}`}
                        className="font-bold hover:text-blue-700">
                        {vacuna.nombre}
                    </Link>


                    <div className='flex gap-1'>
                        <Modal
                            icono={<Eye />}
                            className={'place-self-end p-1 rounded-full border border-blue-500 text-blue-700 bg-blue-200 hover:bg-blue-500 hover:text-white hover:cursor-pointer'}>
                            <VacunaVer vacuna={vacuna} />
                        </Modal>
                        <Modal
                            icono={<Pencil />}
                            className={'place-self-end p-1 rounded-full border border-orange-500 text-orange-700 bg-orange-200 hover:bg-orange-500 hover:text-white hover:cursor-pointer'}>
                            <VacunaModificar vacuna={vacuna} mascotas={mascotas} />
                        </Modal>
                        <Modal
                            icono={<Trash />}
                            className={'place-self-end p-1 rounded-full border border-red-500 text-red-700 bg-red-200 hover:bg-red-500 hover:text-white hover:cursor-pointer'}>
                            <VacunaEliminar vacuna={vacuna} />
                        </Modal>

                    </div>
                </div>
            ))}
        </>
    )
}

export default Vacunas