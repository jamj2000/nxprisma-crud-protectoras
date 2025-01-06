'use client'
import { nuevaMascota } from '@/lib/actions'
import { useActionState, useEffect, useId } from 'react'
import { CircleCheck, CircleX, Plus, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import InputImage from '../InputImage';




export default function MascotaInsertar({ protectoras = [], vacunas = [] }) {
    const formId = useId()
    const [state, action, pending] = useActionState(nuevaMascota, {})


    useEffect(() => {
        if (state.success) {
            toast.success(state.success)
            document.getElementById(formId).closest('dialog')?.close() // Si el padre es un dialog, lo cerramos
        }
        if (state.error) toast.error(state.error)

    }, [formId, state])


    return (
        <form id={formId} action={action} >
            <h1 className='text-green-700 text-xl font-bold text-center'>Dar de alta a nueva mascota</h1>

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

            <div className='text-lg mb-4 w-full flex flex-col  gap-4 p-6 rounded-lg border-2 border-zinc-200'>
                <div className='self-center' >
                    <InputImage />
                </div>


                <label className='flex flex-col'> Nombre
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
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
                        defaultValue={new Date().toISOString().split('T')[0]}
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
                            />

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
                            />

                            {vacuna.nombre}
                        </label>
                    ))}
                </details>

                <button type="submit" disabled={pending}
                    className='mt-6 w-full p-3 bg-green-700 text-white disabled:bg-zinc-400 font-bold text-center rounded-md'
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
