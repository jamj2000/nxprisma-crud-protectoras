import MascotaVer from "@/components/Mascotas/Ver";
import { Suspense } from "react";



async function page({ params }) {
    const { id } = await params

    return <Suspense fallback={
        <div className="text-2xl text-blue-200 font-bold animate-pulse">
            Obteniendo datos ...
        </div>
    }>
        <MascotaVer id={+id} />
    </Suspense>
}


export default page;