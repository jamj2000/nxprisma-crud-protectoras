import { Suspense } from "react";

function MascotasLayout({ children }) {
    return (
        <Suspense fallback={
            <p className="text-2xl text-blue-200 font-bold animate-pulse">
                Obteniendo datos de mascota...
            </p>}>
            {children}
        </Suspense>
    );
}

export default MascotasLayout;
