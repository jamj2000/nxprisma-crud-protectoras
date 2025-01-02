import prisma from '@/lib/prisma'

async function Form({ children, action, proveedorId, disabled = false }) {

    let proveedor;

    if (proveedorId) {
        proveedor = await prisma.proveedor.findUnique({
            where: {
                id: Number(proveedorId),
            },
        })
    }

    return (
        <form action={action} >
            <input type='hidden' name='id' value={proveedor?.id} />
            <fieldset disabled={disabled}>
                <legend># {proveedor?.id}</legend>
                <label htmlFor='nombre'>Nombre</label>
                <input type='text' id='nombre' name='nombre'
                    placeholder='Nombre'
                    defaultValue={proveedor?.nombre} autoFocus required></input>
                <div>
                    {proveedor?.nacional
                        ? <input type='checkbox' id='nacional' name='nacional' defaultChecked />
                        : <input type='checkbox' id='nacional' name='nacional' />
                    }
                    <label htmlFor='nacional'>Nacional</label>
                </div>
            </fieldset>

            {children}
        </form>
    )
}

export default Form