'use client'
import MascotaVer from "@/components/mascotas/ver"
import Modal from "@/components/modal"
import { default_image } from "@/components/input-image"



function ProtectoraVer({ protectora = {}, enPagina = false }) {

    return (
        <div>
            <div className="mb-4">
                <p className='text-2xl'>{protectora?.nombre}</p>
                <p>Localidad: {protectora?.localidad}</p>
                <p>Teléfono: {protectora?.telefono}</p>
            </div>


            {protectora?.mascotas?.length > 0
                ? <p className="font-bold">Animales en esta protectora </p>
                : <p className="font-bold">No hay animales en esta protectora </p>
            }

            {enPagina
                ?
                <div className=" grid grid-cols-[repeat(auto-fill,80px)] gap-4">
                    {protectora?.mascotas?.map(mascota =>
                        <Modal key={mascota.id}
                            imagen={<img src={mascota.foto || default_image} className="rounded-full" />}
                            texto={mascota.nombre}
                            className={'hover:cursor-pointer flex flex-col items-center text-indigo-500 truncate'}>
                            <MascotaVer mascota={mascota} protectoras={[protectora]} />
                        </Modal>
                    )}
                </div>
                :
                <div className="grid grid-cols-[repeat(auto-fill,80px)] gap-4">
                    {protectora?.mascotas?.map(mascota =>
                        <div key={mascota.id}>
                            <img src={mascota.foto || default_image} className="rounded-full" />
                            <p className="text-slate-600 text-center">{mascota.nombre}</p>
                        </div>
                    )}
                </div>
            }

        </div >
    )
}


export default ProtectoraVer

