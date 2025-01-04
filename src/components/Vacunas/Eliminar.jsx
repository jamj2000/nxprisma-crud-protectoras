'use client'
import { eliminarVacuna } from '@/lib/actions'
import { useActionState, useEffect, useId } from 'react'
import { RefreshCw, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';  // IMPORTANTE: No importar desde next/router
import { useParams } from 'next/navigation'
import VacunaVer from '@/components/Vacunas/Ver'


export default function VacunaEliminar({ vacuna = {} }) {
    const params = useParams()
    const formId = useId()
    const { refresh, back } = useRouter()
    const [state, action, pending] = useActionState(eliminarVacuna, {})


    useEffect(() => {
        if (state?.success) {
            toast.success(state.success)
            document.getElementById(formId).closest('dialog')?.close() // Si el padre es un dialog, lo cerramos
            if (params.id) back()  // Si estamos en una página con params id, salimos de la página
        }
        if (state?.error) toast.error(state.error)
        refresh()     // refrescamos página después de mostrar mensaje de success o error
    }, [formId, state])


    return (
        <form id={formId} action={action} >
            <input type="hidden" name="id" value={vacuna?.id} />

            <h1 className='text-red-700 text-xl font-bold text-center'>Eliminar vacuna</h1>

            <div className='mb-4 w-full flex flex-col gap-4 p-6 '>

                <VacunaVer vacuna={vacuna} />

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