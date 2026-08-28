import Link from "next/link"

export const Prefetch = ({ href, children }) => {

    if (href) return (
        <Link href={href} prefetch>
            {children}
        </Link>
    )

    return children

}
