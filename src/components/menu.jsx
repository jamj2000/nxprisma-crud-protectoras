"use client"

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { MenuIcon, X } from "lucide-react";



export default function Menu() {
    const pathname = usePathname()
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen)


    return (
        <nav>

            <button
                onClick={toggleMenu}
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-900 rounded-lg lg:hidden bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-900 dark:focus:ring-gray-600"
                aria-controls="navbar-default"
                aria-expanded={menuOpen} >

                <span className="sr-only">Open main menu</span>

                <MenuIcon className={`w-6 h-6 ${menuOpen ? "hidden" : ""}`} />
                <X className={`w-6 h-6 ${menuOpen ? "" : "hidden"}`} />

            </button>


            <div id="navbar-default"
                onClick={toggleMenu}
                className={`${menuOpen ? "" : "hidden"} z-10 absolute right-0 w-screen lg:relative lg:block lg:w-auto`}

            >
                <ul className="bg-slate-200 dark:bg-slate-900 font-medium flex flex-col gap-2 mt-1 px-8 py-4 rounded-sm lg:static lg:flex-row lg:mt-0 lg:p-2 ">

                    <li>
                        <Link href="/protectoras"
                            className={`bg-slate-400 block py-2 px-3 text-white hover:text-white hover:bg-gray-700 hover:outline hover:outline-gray-200 hover:outline-2 rounded dark:text-white dark:hover:bg-gray-700 dark:hover:text-blue-200 md:dark:hover:text-blue-200 
                            ${pathname.startsWith('/protectoras') && 'outline outline-2'}`}
                        >
                            Protectoras
                        </Link>
                    </li>

                    <li>
                        <Link href="/mascotas"
                            className={`bg-slate-400 block py-2 px-3 text-white hover:text-white hover:bg-gray-700 hover:outline hover:outline-gray-200 hover:outline-2 rounded dark:text-white dark:hover:bg-gray-700 dark:hover:text-blue-200 md:dark:hover:text-blue-200 
                            ${pathname.startsWith('/mascotas') && 'outline outline-2'}`}
                        >
                            Mascotas
                        </Link>
                    </li>

                    <li>
                        <Link href="/vacunas"
                            className={`bg-slate-400 block py-2 px-3 text-white hover:text-white hover:bg-gray-700 hover:outline hover:outline-gray-200 hover:outline-1 rounded dark:text-white dark:hover:bg-gray-700 dark:hover:text-blue-200 md:dark:hover:text-blue-200  
                            ${pathname.startsWith('/vacunas') && 'outline outline-2'} `}
                        >
                            Vacunas
                        </Link>
                    </li>


                </ul>
            </div>
        </nav >
    );
}