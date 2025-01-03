'use client'
import { eliminarMascota } from '@/lib/actions'
import { useActionState, useEffect, useId } from 'react'
import { RefreshCw, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { default_image } from "@/components/InputImage";
import MascotaVer from '@/components/Mascotas/Ver'


export default function MascotaEliminar({ mascota = {} }) {
    const formId = useId()
    const [state, action, pending] = useActionState(eliminarMascota, null)


    useEffect(() => {
        if (state?.success) {
            toast.success(state.success)
            document.getElementById(formId).closest('dialog')?.close() // Si el padre es un dialog, lo cerramos
        }
        if (state?.error) toast.error(state.error)

    }, [formId, state])


    return (
        <form id={formId} action={action} >
            <input type="hidden" name="id" defaultValue={mascota?.id} />

            <h1 className='text-red-700 text-xl font-bold text-center'>Eliminar mascota</h1>

            <div className='text-lg mb-4 w-full flex flex-col  gap-4 p-6 rounded-lg border-2 border-zinc-200'>

                {/* <MascotaVer mascota={mascota} /> */}
                <div className="flex flex-col">
                    <img
                        className="place-self-center"
                        src={mascota.foto || default_image}
                        width={324}
                        alt="foto"
                    />
                    <p className="text-2xl font-bold">{mascota.nombre}</p>
                    <p>{mascota.descripcion}</p>
                    <p>Fecha de nacimiento: {mascota.fecha_nacimiento.toLocaleDateString('es-ES')}</p>
                </div>

                <button type="submit" disabled={pending}
                    className='md:col-span-2 mt-6 w-full p-3 bg-red-700 text-white disabled:bg-zinc-400 font-bold text-center rounded-md'
                >
                    {pending
                        ? <div><RefreshCw className='inline animate-spin' /> Eliminado...</div>
                        : <div><Trash className='inline' /> Eliminar</div>

                    }
                </button>

            </div>
        </form>
    )
}