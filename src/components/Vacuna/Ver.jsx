import { obtenerProveedor } from "@/lib/data";
import { notFound } from "next/navigation";


const Info = (proveedor) => (
    <div>
        <p><strong>{proveedor.nombre}</strong></p>
        <p>Nacional: {proveedor.nacional ? 'Sí' : 'No'}</p>
    </div>
)



async function Proveedor({ proveedor, id }) {
    if (id) {
        const proveedor = await obtenerProveedor(id)
        if (!proveedor) notFound();

        return Info(proveedor)
    }

    return Info(proveedor)

}


export default Proveedor

