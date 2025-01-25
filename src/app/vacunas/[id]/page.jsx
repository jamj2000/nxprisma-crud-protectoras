import Vacuna from "@/components/Vacunas/Item"
import Spinner from "@/components/Spinner"
import { Suspense } from "react"


async function PaginaVacuna({ params }) {
    const { id } = await params

    return (
        <Suspense fallback={<Spinner />}>
            <Vacuna id={id} />
        </Suspense>
    )
}


export default PaginaVacuna
