'use client'
import { useActionState, useEffect, useId } from 'react'
import { CircleCheck, CircleX, Pencil, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

import { modificarMascota } from '@/lib/actions'
import Image from 'next/image';



export default function MascotaModificar({ mascota = {} }) {
    const formId = useId()
    const [state, action, pending] = useActionState(modificarMascota, null)

    useEffect(() => {
        if (state?.success) {
            toast.success(state.success)
            document.getElementById(formId).closest('dialog')?.close() // Si el padre es un dialog, lo cerramos
        }
        if (state?.error) toast.error(state.error)

    }, [formId, state])


    return (
        <form id={formId} action={action} >
            {state?.success &&
                <p className='bg-green-100 text-green-700 mb-2 p-3 rounded-md flex gap-2 items-center'>
                    <CircleCheck /> {state?.success}
                </p>
            }
            {state?.error &&
                <p className='bg-red-100 text-red-700 mb-2 p-3 rounded-md flex gap-2 items-center'>
                    <CircleX /> {state?.error}
                </p>
            }
            <h1 className='text-orange-700 text-xl font-bold text-center'>Actualizar mascota</h1>

            <div className='text-lg mb-4 w-full grid grid-cols-1 md:grid-cols-[100px_auto] items-center gap-4 p-6 rounded-lg border-2 border-zinc-200'>

                <input type="hidden" name="id" value={mascota?.id} />

                <label htmlFor="nombre"> Nombre </label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    defaultValue={mascota?.nombre}
                    className='bg-zinc-100 p-2 rounded hover:ring-1 focus:outline-none disabled:bg-zinc-400 disabled:text-zinc-200'
                    disabled={pending}
                    required
                />

                <label htmlFor="descripcion"> Descripción </label>
                <input
                    type="text"
                    id="descripcion"
                    name="descripcion"
                    defaultValue={mascota?.descripcion}
                    className='bg-zinc-100 p-2 rounded hover:ring-1 focus:outline-none disabled:bg-zinc-400 disabled:text-zinc-200'
                    disabled={pending}
                    required
                />


                <label htmlFor="fecha_nacimiento"> Fecha_nacimiento </label>
                <input
                    type="date"
                    id="fecha_nacimiento"
                    name="fecha_nacimiento"
                    placeholder="Introduce la fecha de nacimiento"
                    className='bg-zinc-100 p-2 rounded hover:ring-1 focus:outline-none disabled:bg-zinc-400 disabled:text-zinc-200'
                    disabled={pending}
                    required
                />


                <Image src={mascota.imagen || '/images/no-image.png'} alt="" width={400} height={400} className='mx-auto md:col-span-2 w-[400px] h-[300px] object-cover' />
                <input
                    type="hidden"
                    id="imagen"
                    name="imagen"
                    defaultValue={mascota?.imagen}
                    disabled={pending}
                />


                <label htmlFor="file"> Cambiar Imagen </label>
                <input
                    type="file"
                    id="file"
                    name="file"
                    accept="image/*"
                    className='bg-zinc-100 p-2 rounded hover:ring-1 focus:outline-none disabled:bg-zinc-400 disabled:text-zinc-200'
                    disabled={pending}
                />

                <button type="submit" disabled={pending}
                    className='md:col-span-2 mt-6 w-full p-3 bg-orange-700 text-white disabled:bg-zinc-400 font-bold text-center rounded-md'
                >
                    {pending
                        ? <div><RefreshCw className='inline animate-spin' /> Actualizando...</div>
                        : <div><Pencil className='inline' /> Actualizar</div>

                    }
                </button>

            </div>
        </form>
    )
}