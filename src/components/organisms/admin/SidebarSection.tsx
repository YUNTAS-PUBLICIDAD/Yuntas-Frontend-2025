'use client';

import { useAuth } from "@/hooks/useAuth";
import SwitchMode from "@/components/molecules/admin/SwitchMode";
import Button from "@/components/atoms/Button";
import NavList from "@/components/molecules/admin/NavList";
import UserSection from "@/components/molecules/header/UserSection";
import Loader from "@/components/atoms/Loader";

interface NavItem {
    label: string;
    href: string;
}

const navItems: NavItem[] = [
  //{ label: "Inicio", href: "/admin" },
    { label: "Seguimiento", href: "/admin/seguimiento" },
    { label: "Blogs", href: "/admin/blogs" },
    { label: "Productos", href: "/admin/productos" },
    { label: "Usuarios", href: "/admin/usuarios" },
     { label: "Reclamaciones", href: "/admin/reclamaciones" },
];

export default function SidebarSection() {
    const { logout, isLoading } = useAuth();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <aside
            className="
                hidden lg:flex
                sticky top-0 h-full min-h-fit w-72 flex flex-col
                border-r border-gray-300
                bg-white dark:bg-[#141A3F]
                transition-colors duration-300
            "
        >
            <h2
                className="
                    text-center font-semibold text-2xl py-8 px-6
                    text-[#0D1030] dark:text-white
                "
            >
                Administración
            </h2>

            <nav
                className="
                    flex-1 px-12 text-xl
                    text-[#203565] dark:text-white
                "
            >
                <NavList
                    items={navItems}
                    className="border-l border-gray-300 dark:border-white/30"
                />
            </nav>

            {/* Switch modo */}
            <div className="flex justify-center my-8">
                <Button
                    size="sm"
                    className="dark:bg-[#293296] dark:text-white"
                >
                    <div className="flex items-center gap-3 -mx-2 ">
                        <SwitchMode />
                        <p className="font-semibold text-lg">Dark mode</p>
                    </div>
                </Button>
            </div>

            <div
                className="
                    flex flex-col gap-12 items-center py-16
                    bg-[#F4F4F2] dark:bg-[#0D1030]
                    text-[#203565] dark:text-white
                "
            >
                <div className="flex flex-col items-center text-xl">
                    <div className="mb-4  p-3 rounded-full shadow-sm">
                        <UserSection size="lg" enableDarkMode />
                    </div>
                    <p className="font-bold">Bienvenido</p>
                    <p className="font-medium">Administrador</p>
                </div>

                <Button
                    size="sm"
                    onClick={handleLogout}
                    disabled={isLoading}
                    className="dark:bg-[white] dark:text-[#0D1030]"
                >
                    <div className="flex items-center gap-2">
                        {isLoading ? (
                            <>
                                <Loader size="sm" color="border-white" />
                                <span className="font-semibold text-xl">
                                    Cerrando...
                                </span>
                            </>
                        ) : (
                            <span className="font-semibold text-xl">
                                Cerrar Sesión
                            </span>
                        )}
                    </div>
                </Button>
            </div>
        </aside>
    );
}
