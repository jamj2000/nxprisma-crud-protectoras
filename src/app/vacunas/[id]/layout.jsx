import { Suspense } from "react";

function VacunasLayout({ children }) {
    return (
        <Suspense fallback={
            <p className="text-2xl text-blue-200 font-bold animate-pulse">
                Obteniendo datos de la vacuna...
            </p>}>
            {children}
        </Suspense>
    );
}

export default VacunasLayout;
