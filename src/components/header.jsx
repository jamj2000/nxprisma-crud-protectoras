import Image from "next/image";
import Link from "next/link";
import { MainMenu, MenuLink, ThemeToggle } from "@/components/simpleui";




export default function Header() {

    return (
        <nav className="fixed top-0 z-50 px-2 w-full flex gap-2 items-center justify-between py-4  bg-neutral-500/50  backdrop-blur-sm">
            <div className="bg-white dark:bg-black rounded-full px-4">
                <Logo />
            </div>

            <div className="flex gap-2 items-center">
                <ThemeToggle />
                <MainMenu>
                    <MenuLink href="/protectoras">Protectoras</MenuLink>
                    <MenuLink href="/mascotas">Mascotas</MenuLink>
                    <MenuLink href="/vacunas">Vacunas</MenuLink>
                </MainMenu>
            </div>
        </nav>
    );
}


const Logo = () => (
    <Link
        href="/"
        className="flex gap-3 items-center">

        <Image
            src="/logo.svg"
            height={48}
            width={48}
            alt="Protectora Logo"
            loading="eager"
        />

        <span className="hidden sm:block self-center text-xl font-semibold whitespace-nowrap text-gray-900 dark:text-gray-100/80">
            Protect
        </span>
    </Link>
)