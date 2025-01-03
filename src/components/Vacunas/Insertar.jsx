'use client'
import { nuevaVacuna } from '@/lib/actions'
import { useActionState, useEffect, useId } from 'react'
import { CircleCheck, CircleX, Plus, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';





export default function VacunaInsertar() {
    const formId = useId()
    const [state, action, pending] = useActionState(nuevaVacuna, null)


    useEffect(() => {
        if (state?.success) {
            toast.success(state.success)
            document.getElementById(formId).closest('dialog')?.close() // Si el padre es un dialog, lo cerramos
        }
        if (state?.error) toast.error(state.error)

    }, [formId, state])


    return (
        <form id={formId} action={action} >
            <h1 className='text-green-700 text-xl font-bold text-center'>Crear nuevo vacuna</h1>

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

            <div className='text-lg mb-4 w-full grid grid-cols-1 md:grid-cols-[100px_auto] items-center gap-4 p-6 rounded-lg border-2 border-zinc-200'>
                <label htmlFor="nombre"> Nombre </label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder="Introduce un nombre"
                    className='bg-zinc-100 p-2 rounded hover:ring-1 focus:outline-none disabled:bg-zinc-400 disabled:text-zinc-200'
                    disabled={pending}
                    required
                />

                <label htmlFor="especie"> Especie </label>
                <input
                    id="especie"
                    name="especie"
                    className='place-self-start self-center bg-zinc-100 p-2 rounded hover:ring-1 focus:outline-none disabled:bg-zinc-400 disabled:text-zinc-200'
                    disabled={pending}
                />


                <button type="submit" disabled={pending}
                    className='md:col-span-2 mt-6 w-full p-3 bg-green-700 text-white disabled:bg-zinc-400 font-bold text-center rounded-md'
                >
                    {pending
                        ? <div><RefreshCw className='inline animate-spin' /> Guardando...</div>
                        : <div><Plus className='inline' /> Guardar</div>

                    }
                </button>

            </div>
        </form>
    )
}