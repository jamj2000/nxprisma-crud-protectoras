import prisma from '@/lib/prisma'
import ListaProveedores from '@/components/ListaProveedores'
import { Suspense } from 'react'


async function Form({ children, action, articuloId, disabled = false }) {

    let articulo;

    if (articuloId) {
        articulo = await prisma.articulo.findUnique({
            where: {
                id: Number(articuloId),
            },
        })
    }

    return (
        <form action={action} >
            <input type='hidden' name='id' value={articulo?.id} />
            <fieldset disabled={disabled}>
                <legend># {articulo?.id}</legend>
                <label htmlFor='nombre'>Nombre</label>
                <input type='text' id='nombre' name='nombre'
                    placeholder='Nombre'
                    defaultValue={articulo?.nombre} autoFocus required />
                <label htmlFor='descripcion'>Descripción</label>
                <input type='text' id='descripcion' name='descripcion'
                    placeholder='Descripción'
                    defaultValue={articulo?.descripcion} />
                <label htmlFor='precio'>Precio</label>
                <input type='number' id='precio' name='precio' min='0' step={0.01}
                    placeholder='precio'
                    defaultValue={Number(articulo?.precio)} required />
            </fieldset>
            <Suspense fallback={'Proveedores...'}>
                <ListaProveedores articuloId={articulo?.id} disabled={disabled} />
            </Suspense>
            {children}
        </form >
    )
}

export default Form