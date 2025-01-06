import Link from "next/link"
import Modal from "@/components/Modal"
import ProtectoraVer from "@/components/Protectoras/Ver"
import ProtectoraModificar from '@/components/Protectoras/Modificar';
import ProtectoraEliminar from '@/components/Protectoras/Eliminar';
import ProtectoraInsertar from "./Insertar";
import { obtenerProtectoras } from "@/lib/data"
import { Eye, Pencil, Plus, Trash } from 'lucide-react'

async function Protectoras() {
    const protectoras = await obtenerProtectoras()

    return (
        <>
            <Modal
                icono={<Plus />}
                className={'mx-4 mb-4 place-self-end p-1 rounded-full border border-green-500 text-green-700 bg-green-200 hover:bg-green-500 hover:text-white hover:cursor-pointer'}>
                <ProtectoraInsertar />
            </Modal>

            {protectoras.map((protectora) => (

                <div key={protectora.id} className="px-4 py-1 flex justify-between items-center even:bg-blue-100 odd:bg-slate-100">

                    <Link
                        href={`/protectoras/${protectora.id}`}
                        className="font-bold hover:text-blue-700">
                        {protectora.nombre}
                    </Link>


                    <div className='flex gap-1'>
                        <Modal
                            icono={<Eye />}
                            className={'place-self-end p-1 rounded-full border border-blue-500 text-blue-700 bg-blue-200 hover:bg-blue-500 hover:text-white hover:cursor-pointer'}>
                            <ProtectoraVer protectora={protectora} />
                        </Modal>
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

            ))}

        </>
    )

}

export default Protectoras