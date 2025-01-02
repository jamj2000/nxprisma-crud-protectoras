'use client'
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { House, Menu, User, X } from 'lucide-react'

// Se usan estilos de DaisyUI: https://daisyui.com/


function Navbar() {
    const pathname = usePathname()

    return (

        <div className="navbar bg-blue-700 text-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <Menu />
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu dropdown-content text-white bg-blue-700 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                            <Link href="/mascotas"
                                className={`${pathname.startsWith('/mascotas') && 'text-white bg-blue-900'} p-2 rounded-full`} >
                                Mascotas
                            </Link>
                        </li>
                        <li>
                            <Link href="/vacunas"
                                className={`${pathname.startsWith('/vacunas') && 'text-white bg-blue-900'} p-2 rounded-full`} >
                                Vacunas
                            </Link>
                        </li>
                    </ul>
                </div>
                <Link href="/"
                    className={`${pathname == '/' && 'text-white bg-blue-900'} p-2 rounded-full`} >
                    <House />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal">
                    <li>
                        <Link href="/mascotas"
                            className={`${pathname.startsWith('/mascotas') && 'text-white bg-blue-900'} p-2 rounded-full`} >
                            Mascotas
                        </Link>
                    </li>
                    <li>
                        <Link href="/vacunas"
                            className={`${pathname.startsWith('/vacunas') && 'text-white bg-blue-900'} p-2 rounded-full`} >
                            Vacunas
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                <details className="dropdown dropdown-end">
                    <summary className="btn btn-sm btn-circle text-white bg-blue-300">
                        <User />
                    </summary>
                    <div className="dropdown-content menu bg-blue-600 rounded-box z-[1] w-52 p-2 shadow">
                        <Link href="/mascotas"
                            className={`${pathname.startsWith('/mascotas') && 'text-white bg-blue-900'} p-2 rounded-full`} >
                            Mascotas
                        </Link>
                        <Link href="/vacunas"
                            className={`${pathname.startsWith('/vacunas') && 'text-white bg-blue-900'} p-2 rounded-full`} >
                            Vacunas
                        </Link>
                    </div>
                </details>
            </div>
        </div>

        // <nav className='flex justify-between items-center px-4 py-2 bg-blue-700 text-white'>
        //     <details className="dropdown">
        //         <summary className="btn btn-sm btn-ghost m-1">
        //             <Menu />
        //         </summary>
        //         <div className="dropdown-content menu bg-blue-600 rounded-box z-[1] w-52 p-2 shadow">
        //             <Link href="/mascotas"
        //                 className={`${pathname.startsWith('/mascotas') && 'text-white bg-blue-900'} p-2 rounded-full`} >
        //                 Artículos
        //             </Link>
        //             <Link href="/vacunas"
        //                 className={`${pathname.startsWith('/vacunas') && 'text-white bg-blue-900'} p-2 rounded-full`} >
        //                 Vacunas
        //             </Link>
        //         </div>
        //     </details>
        //     <div>
        //         <Link href="/"
        //             className={`${pathname == '/' && 'text-white bg-blue-900'} p-2 rounded-full`} >
        //             <House className='inline' />
        //         </Link>
        //     </div>
        // </nav>
    )
}

export default Navbar

