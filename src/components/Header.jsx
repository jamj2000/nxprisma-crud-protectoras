import Image from "next/image";
import Link from "next/link";
import Menu from "@/components/Menu"




export default function Header({ session }) {

    return (
        <header className="flex justify-between items-center px-8 bg-slate-200 dark:bg-slate-900 font-bold sticky top-0 z-50 ">
            <div className="flex items-center gap-2 lg:gap-10 lg:flex-row-reverse">
                <Menu />
                <Logo />
            </div>

            <div>
                {/* <Login sesion={session} /> */}
            </div>
        </header>
    );
}


function Logo() {
    return (
        <Link
            href="/"
            className="flex gap-3 items-center">

            <Image
                src="/logo.svg"
                height={48}
                width={48}
                alt="Protectora Logo"
            />

            <span className="hidden sm:block self-center text-xl font-semibold whitespace-nowrap text-gray-900 dark:text-gray-100/80">
                Protectoras
            </span>
        </Link>
    );
}


// function Login({ sesion }) {

//     if (sesion) return (
//         <Link href="/auth/logout">
//             <button className="px-4 py-2 flex gap-2 items-center rounded-lg bg-white/80 dark:bg-blue-400/80 transition duration-500 hover:bg-white hover:shadow-xl ">
//                 <img
//                     src={sesion.user?.image ? sesion?.user.image : "/user.svg"}
//                     className="w-6 rounded-[50%]"
//                     alt="FloWeather Logo"
//                 /> Logout
//             </button>
//         </Link>)

//     return (
//         <Link href="/auth/login">
//             <button className="px-4 py-2 flex gap-2 items-center rounded-lg bg-white/80 dark:bg-blue-400/80  transition duration-500 hover:bg-white hover:shadow-xl 	">
//                 <img
//                     src={"/logo-login.png"}
//                     className="w-6"
//                     alt="FloWeather Logo"
//                 /> Login
//             </button>
//         </Link>
//     )

// }