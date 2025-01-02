import { obtenerMascota } from "@/lib/data";
import { notFound } from "next/navigation";


const Info = (mascota) => (
    <div>
        <p><strong>{mascota.nombre}</strong></p>
        <p>{mascota.descripcion}</p>
        <p>{mascota.fecha_nacimiento.toString()}</p>
    </div>
)



async function Mascota({ mascota, id }) {
    if (id) {
        const mascota = await obtenerMascota(id)
        if (!mascota) notFound();

        return Info(mascota)
    }

    return Info(mascota)

}


export default Mascota