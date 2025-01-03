import { obtenerMascota } from "@/lib/data";
import { notFound } from "next/navigation";
import { default_image } from "@/components/InputImage";


const Info = (mascota) => (
    <div className="flex flex-col">
        <img
            className="place-self-center"
            src={mascota.foto || default_image}
            width={400}
            alt="foto"
        />

        <p className="text-2xl font-bold">{mascota.nombre}</p>
        <p>{mascota.descripcion}</p>
        {/* <p>Fecha de nacimiento: {mascota.fecha_nacimiento.toISOString().split('T')[0]}</p> */}
        <p>Fecha de nacimiento: {mascota.fecha_nacimiento.toLocaleDateString('es-ES')}</p>


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