import MascotaVer from "@/components/Mascotas/Ver"
import Modal from "@/components/Modal"
import Image from "next/image"
import { default_image } from "../InputImage"


function ProtectoraVer({ protectora = {} }) {
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

            <div className="hover:cursor-pointer grid auto-rows-max grid-cols-[repeat(auto-fit,80px)] gap-4">
                {protectora?.mascotas?.map(mascota =>
                    <Modal key={mascota.id}
                        imagen={<img src={mascota.foto || default_image} className="rounded-full" />}
                        texto={mascota.nombre}
                        className={'flex flex-col items-center text-indigo-500 truncate'}>
                        <MascotaVer mascota={mascota} protectoras={[protectora]} />
                    </Modal>
                )}
            </div>


        </div >
    )
}


export default ProtectoraVer

