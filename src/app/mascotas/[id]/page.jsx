import Mascota from "@/components/Mascotas/Item"
import Spinner from "@/components/Spinner"
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