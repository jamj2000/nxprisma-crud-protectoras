'use client'
import { useRouter } from 'next/navigation';  // IMPORTANTE: No importar desde next/router

function BackButton({ children }) {
    const { back } = useRouter()

    return (
        <div
            onClick={back}
            className='hover:animate-pulse hover:cursor-pointer'>

            {children}

        </div>
    );
}

export default BackButton