import { obtenerMascotas } from "@/lib/data"
import { Eye, Pencil, Trash } from 'lucide-react'
import Modal from "@/components/Modal"
import MascotaVer from "@/components/Mascotas/Ver"
import MascotaModificar from '@/components/Mascotas/Modificar';
import MascotaEliminar from '@/components/Mascotas/Eliminar';
import Link from "next/link";
import Form from "next/form";
import Filtrar from "@/components/Mascotas/Filtrar";

async function Mascotas({ query, sort, page, per_page }) {
    const { mascotas, totalPages } = await obtenerMascotas({ query, sort, page, per_page })

    return (
        <div className={`flex flex-col mb-10`}>
            <Form action="" className='flex flex-col gap-4'>
                <Filtrar totalPages={totalPages} query={query} sort={sort} page={page} per_page={per_page} />
            </Form>

            {
                mascotas.map((mascota) => (

                    <div key={mascota.id} className="px-4 py-1 flex justify-between items-center even:bg-blue-100 odd:bg-slate-100">
                        <Link href={`/mascotas/${mascota.id}`} className="font-bold hover:text-blue-700">{mascota.nombre}</Link>
                        <div className='flex gap-1'>
                            <Modal
                                icono={<Eye />}
                                className={'place-self-end p-1 rounded-full border border-blue-500 text-blue-700 bg-blue-200 hover:bg-blue-500 hover:text-white hover:cursor-pointer'}>
                                <MascotaVer mascota={mascota} />
                            </Modal>
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
                    </div>

                ))
            }
        </div>
    )
}

export default Mascotas