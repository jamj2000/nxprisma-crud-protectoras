import { Suspense } from "react";

function ProtectorasLayout({ children }) {
    return (
        <Suspense fallback={
            <p className="text-2xl text-blue-200 font-bold animate-pulse">
                Obteniendo datos de la protectora...
            </p>}>
            {children}
        </Suspense>
    );
}

export default ProtectorasLayout;
