import { BackLink } from "@/components/simpleui"
import Image from 'next/image'


function notFound() {
    return (
        <section className="flex flex-col items-center">
            <h1 className="text-blue-400 text-2xl mb-10">
                Página no encontrada
            </h1>

            <BackLink>
                <Image src="/not-found.webp" alt="Página no encontrada" width={400} height={300} />
            </BackLink>
        </section >
    )
}

export default notFound