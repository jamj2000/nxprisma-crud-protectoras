import VacunaVer from "@/components/Vacunas/Ver";
import { obtenerVacuna } from "@/lib/data";
import { notFound } from "next/navigation";


async function page({ params }) {
    const { id } = await params
    const vacuna = await obtenerVacuna(id)

    if (!vacuna) notFound()

    return <VacunaVer vacuna={vacuna} />
}


export default page;