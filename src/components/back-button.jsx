'use client'
import { useRouter } from 'next/navigation';  // IMPORTANTE: No importar desde next/router

function BackButton({ children, className }) {
    const { back } = useRouter()

    return (
        <div
            onClick={back}
            className={`${className} hover:animate-pulse hover:cursor-pointer`}>

            {children}

        </div>
    );
}

export default BackButton