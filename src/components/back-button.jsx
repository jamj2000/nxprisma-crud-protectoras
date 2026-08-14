'use client'
import { useRouter } from 'next/navigation';
import { startTransition } from 'react';
import Link from 'next/link';

function BackButton({ children, className, href }) {
    const router = useRouter()

    const handleClick = (e) => {
        if (href) {
            e.preventDefault()
            startTransition(() => {
                router.push(href)
            })
        } else {
            startTransition(() => {
                router.back()
            })
        }
    }

    if (href) {
        return (
            <Link
                href={href}
                onClick={handleClick}
                className={`${className} hover:animate-pulse hover:cursor-pointer`}>
                {children}
            </Link>
        )
    }

    return (
        <div
            onClick={handleClick}
            className={`${className} hover:animate-pulse hover:cursor-pointer`}>
            {children}
        </div>
    );
}

export default BackButton