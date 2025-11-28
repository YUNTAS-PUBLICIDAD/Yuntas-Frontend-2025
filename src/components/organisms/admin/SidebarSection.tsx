import SwitchMode from "@/components/molecules/admin/SwitchMode";
import Button from "@/components/atoms/Button";
import NavList from "@/components/molecules/admin/NavList";
import UserSection from "@/components/molecules/header/UserSection";
interface NavItem {
    label: string;
    href: string;
}

const navItems: NavItem[] = [
    { label: "Inicio", href: "/admin" },
    { label: "Seguimiento", href: "/admin/seguimiento" },
    { label: "Blogs", href: "/admin/blogs" },
    { label: "Productos", href: "/admin/productos" },
    { label: "Usuarios", href: "/admin/usuarios" },
];

export default function SidebarSection() {

    return (
        <aside className="sticky top-0 h-full min-h-fit w-72 flex flex-col border-r border-gray-300 ">
            <h2 className="text-center text-[#0D1030] font-semibold text-2xl py-8 px-6">Administración</h2>
            <nav className="flex-1 px-12 text-xl text-[#203565]">
                <NavList 
                    items={navItems} 
                    className="border-l border-gray-300" 
                />
            </nav>
            <div className="flex justify-center my-8">
                <Button size="sm">
                    <div className="flex items-center gap-3 -mx-2">
                        <SwitchMode />
                        <p className="font-semibold text-lg">Dark mode</p>
                    </div>
                </Button>
            </div>
            <div className="flex flex-col gap-12 items-center py-16 bg-[#F4F4F2] text-[#203565]">
                <div className="flex flex-col items-center text-xl">
                    <div className="mb-4">
                        <UserSection size="lg" />
                    </div>
                    <p className="font-bold">Bienvenido</p>
                    <p className="font-medium">Administrador</p>
                </div>
                <Button size="sm">
                    <p className="font-semibold text-xl">Cerrar Sesión</p>
                </Button>
            </div>
        </aside>
    );
}