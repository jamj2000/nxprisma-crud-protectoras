import Link from "next/link"

function notFound() {
    return (
        <section className="flex flex-col items-center">
            <h1 className="text-blue-400 text-2xl">
                Página no encontrada
            </h1>

            <hr />

            <Link href="/">  <img src="/not-found.webp" />   </Link>
        </section >
    )
}

export default notFound