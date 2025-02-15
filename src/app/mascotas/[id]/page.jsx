import Mascota from "@/components/mascotas/item"
import Spinner from "@/components/spinner"
import { Suspense } from "react"



async function PaginaMascota({ params }) {
    const { id } = await params

    return (
        <Suspense fallback={<Spinner />}>
            <Mascota id={id} />
        </Suspense>
    )
}


export default PaginaMascota