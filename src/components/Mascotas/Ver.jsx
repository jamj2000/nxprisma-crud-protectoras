'use client'
import { default_image } from "@/components/InputImage";


function MascotaVer({ mascota = {}, protectoras = [], vacunas = [] }) {

    // console.log('mascota', mascota);

    return (
        <div className="flex flex-col">
            <img
                className="place-self-center"
                src={mascota?.foto || default_image}
                width={400}
                alt="foto"
            />

            <p className="text-2xl font-bold">{mascota.nombre}</p>
            <p>{mascota.descripcion}</p>
            {/* <p>Fecha de nacimiento: {mascota.fecha_nacimiento.toISOString().split('T')[0]}</p> */}
            <p>Fecha de nacimiento: {mascota.fecha_nacimiento?.toLocaleDateString('es-ES')}</p>
            <p>Protectora: {protectoras.find(p => p.id == mascota.protectoraId)?.nombre}</p>

            <p> Vacunas: {mascota.vacunas?.map(vacuna => vacuna.nombre).join(', ')}
            </p>

        </div>
    )

}


export default MascotaVer