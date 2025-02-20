'use client'
import { useActionState, useEffect, useId } from 'react'
import { CircleCheck, CircleX, Pencil, RefreshCw } from 'lucide-react';
import { modificarVacuna } from '@/lib/actions'
import { toast } from 'sonner';



export default function VacunaModificar({ vacuna = {}, mascotas = {} }) {
    const formId = useId()
    const [state, action, pending] = useActionState(modificarVacuna, {})

    useEffect(() => {
        if (state?.success) {
            toast.success(state.success)
            document.getElementById(formId).closest('dialog')?.close() // Si el padre es un dialog, lo cerramos
        }
        if (state?.error) toast.error(state.error)

    }, [formId, state])


    const mascotasIDs = vacuna?.mascotas?.map(mascota => mascota.id)

    return (
        <form id={formId} action={action} >
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
            <h1 className='text-orange-700 text-xl font-bold text-center'>Actualizar vacuna</h1>

            <div className='text-lg mb-4 w-full grid grid-cols-1 md:grid-cols-[100px_auto] items-center gap-4 p-6 rounded-lg border-2 border-zinc-200'>

                <input type="hidden" name="id" value={vacuna?.id} />

                <label htmlFor="nombre"> Nombre </label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    defaultValue={vacuna?.nombre}
                    className='bg-zinc-100 p-2 rounded hover:ring-1 focus:outline-none disabled:bg-zinc-400 disabled:text-zinc-200'
                    disabled={pending}
                    required
                />

                <label htmlFor="especie"> Especie </label>
                <input
                    type="text"
                    id="especie"
                    name="especie"
                    defaultValue={vacuna.especie}
                    className='place-self-start self-center bg-zinc-100 p-2 rounded hover:ring-1 focus:outline-none disabled:bg-zinc-400 disabled:text-zinc-200'
                    disabled={pending}
                />

                <details>
                    <summary>Mascotas</summary>

                    {mascotas?.map((mascota) => (
                        <label key={mascota.id} className='block'>
                            <input
                                type='checkbox'
                                name={mascota.id}
                                value={mascota.id}
                                defaultChecked={mascotasIDs.includes(mascota.id)}
                            />

                            {mascota.nombre}
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