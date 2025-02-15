import Protectora from "@/components/protectoras/item"
import Spinner from "@/components/spinner"
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
