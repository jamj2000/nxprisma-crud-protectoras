import Protectora from "@/components/Protectoras/Item"
import Spinner from "@/components/Spinner"
import { Suspense } from "react"



async function PaginaProtectora({ params }) {
    const { id } = await params

    return (
        <Suspense fallback={<Spinner />}>
            <Protectora id={id} />
        </Suspense>
    )
}


export default PaginaProtectora
