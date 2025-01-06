'use client'
import { useActionState, useEffect, useId } from 'react'
import { Pencil, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { modificarMascota } from '@/lib/actions'
import InputImage, { default_image } from '@/components/InputImage';




export default function MascotaModificar({ mascota = {}, protectoras = [], vacunas = [] }) {
    const formId = useId()
    const [state, action, pending] = useActionState(modificarMascota, {})

    useEffect(() => {
        if (state.success) {
            toast.success(state.success)
            document.getElementById(formId).closest('dialog')?.close() // Si el padre es un dialog, lo cerramos
        }
        if (state.error) toast.error(state.error)
    }, [formId, state])


    const vacunasIDs = mascota?.vacunas?.map(vacuna => vacuna.id)


    return (
        <form id={formId} action={action}>
            <input type="hidden" name="id" defaultValue={mascota?.id} />
            <input type="hidden" name="foto" defaultValue={mascota?.foto} />

            {/* {state?.success &&
                <p className='bg-green-100 text-green-700 mb-2 p-3 rounded-md flex gap-2 items-center'>
                    <CircleCheck /> {state?.success}
                </p>
            }
            {state?.error &&
                <p className='bg-red-100 text-red-700 mb-2 p-3 rounded-md flex gap-2 items-center'>
                    <CircleX /> {state?.error}
                </p>
            } */}
            <h1 className='text-orange-700 text-xl font-bold text-center'>Actualizar mascota</h1>

            <div className='text-lg mb-4 w-full flex flex-col gap-4 p-6 rounded-lg border-2 border-zinc-200'>

                <div className='self-center' >
                    <InputImage image={mascota?.foto || default_image} />
                </div>

                <label className='flex flex-col'> Nombre
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        defaultValue={mascota?.nombre}
                        placeholder="Introduce un nombre"
                        className='bg-zinc-100 p-2 rounded hover:ring-1 focus:outline-none disabled:bg-zinc-400 disabled:text-zinc-200'
                        disabled={pending}
                        required
                    />
                </label>

                <label className='flex flex-col'> Descripción
                    <input
                        type="text"
                        id="descripcion"
                        name="descripcion"
                        defaultValue={mascota?.descripcion}
                        placeholder="Introduce una descripción"
                        className='bg-zinc-100 p-2 rounded hover:ring-1 focus:outline-none disabled:bg-zinc-400 disabled:text-zinc-200'
                        disabled={pending}
                        required
                    />
                </label>

                <label className='flex flex-col'> Fecha nacimiento
                    <input
                        type="date"
                        id="fecha_nacimiento"
                        name="fecha_nacimiento"
                        defaultValue={new Date(mascota.fecha_nacimiento).toISOString().split('T')[0]}
                        className='bg-zinc-100 p-2 rounded hover:ring-1 focus:outline-none disabled:bg-zinc-400 disabled:text-zinc-200'
                        disabled={pending}
                        required
                    />
                </label>

                <details>
                    <summary>Protectora</summary>

                    {protectoras?.map((protectora) => (
                        <label key={protectora.id} className='block'>
                            <input
                                type='radio'
                                name='protectoraId'
                                value={protectora.id}
                                defaultChecked={protectora.id == mascota.protectoraId} />

                            {protectora.nombre}
                        </label>
                    ))}
                </details>

                <details>
                    <summary>Vacunas</summary>

                    {vacunas?.map((vacuna) => (
                        <label key={vacuna.id} className='block'>
                            <input
                                type='checkbox'
                                name={vacuna.id}
                                value={vacuna.id}
                                defaultChecked={vacunasIDs.includes(vacuna.id)}
                            />

                            {vacuna.nombre}
                        </label>
                    ))}
                </details>


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