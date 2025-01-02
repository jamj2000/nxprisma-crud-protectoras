import { obtenerVacuna } from "@/lib/data";
import { notFound } from "next/navigation";


const Info = (vacuna) => (
    <div>
        <p><strong>{vacuna.nombre}</strong></p>
        <p>Especie: {vacuna.especie}</p>
    </div>
)



async function Vacuna({ vacuna, id }) {
    if (id) {
        const vacuna = await obtenerVacuna(id)
        if (!vacuna) notFound();

        return Info(vacuna)
    }

    return Info(vacuna)

}


export default Vacuna

