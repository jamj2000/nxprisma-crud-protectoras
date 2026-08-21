"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-950 px-6 text-white">
            <div className="w-full max-w-lg text-center">
                <div className="mb-6 text-6xl">⚠️</div>

                <h1 className="text-4xl font-bold tracking-tight">
                    Algo salió mal
                </h1>

                <p className="mt-4 text-gray-400">
                    Ha ocurrido un error inesperado. Puedes intentar cargar la página
                    de nuevo.
                </p>

                <div className="mt-8 flex justify-center gap-4">
                    <button
                        onClick={() => reset()}
                        className="rounded-lg bg-white px-5 py-3 font-medium text-gray-950 transition hover:bg-gray-200"
                    >
                        Intentar de nuevo
                    </button>

                    <Link
                        href="/"
                        className="rounded-lg border border-gray-700 px-5 py-3 font-medium text-gray-300 transition hover:bg-gray-900"
                    >
                        Volver al inicio
                    </Link>
                </div>
            </div>
        </main>
    );
}


