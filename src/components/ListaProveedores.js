import { getArticulo, getProveedores } from '@/lib/actions'

async function ListaProveedores({ articuloId, disabled }) {
    const proveedores = await getProveedores()

    let articulo = null;
    let proveeArticulo = [];
    if (articuloId) {
        articulo = await getArticulo(articuloId)
        proveeArticulo = articulo.proveedores.map(p => p.id);
    }

    return (
        <fieldset disabled={disabled}>
            <legend>Proveedores</legend>
            {proveedores?.map((proveedor) => (
                <div key={proveedor.id}>
                        {proveeArticulo.includes(proveedor.id)
                            ? <input type='checkbox' name={proveedor.id} value={proveedor.id} defaultChecked />
                            : <input type='checkbox' name={proveedor.id} value={proveedor.id} />
                        }
                        {proveedor.nombre}
                </div>
            ))}
        </fieldset>
    )
}

export default ListaProveedores