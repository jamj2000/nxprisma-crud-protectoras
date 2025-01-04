import BackButton from "@/components/BackButton"


function notFound() {
    return (
        <section className="flex flex-col items-center">
            <h1 className="text-blue-400 text-2xl mb-10">
                Página no encontrada
            </h1>

            <BackButton>
                <img src="/not-found.webp" />
            </BackButton>
        </section >
    )
}

export default notFound