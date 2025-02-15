import Vacuna from "@/components/vacunas/item"
import Spinner from "@/components/spinner"
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
