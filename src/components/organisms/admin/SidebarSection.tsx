'use client';

import { useAuth } from "@/hooks/useAuth";
import SwitchMode from "@/components/molecules/admin/SwitchMode";
import Button from "@/components/atoms/Button";
import NavList from "@/components/molecules/admin/NavList";
import UserSection from "@/components/molecules/header/UserSection";
import Loader from "@/components/atoms/Loader";
import {
  BellRing,
  ClipboardList,
  FileText,
  Megaphone,
  MessageSquare,
  Package,
  Users,
  type LucideIcon,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems: NavItem[] = [
  //{ label: "Inicio", href: "/admin" },
  { label: "Seguimiento", href: "/admin/seguimiento", icon: ClipboardList },
  { label: "Blogs", href: "/admin/blogs", icon: FileText },
  { label: "Productos", href: "/admin/productos", icon: Package },
  { label: "Usuarios", href: "/admin/usuarios", icon: Users },
  { label: "Reclamaciones", href: "/admin/reclamaciones", icon: BellRing },
  { label: "Contacto", href: "/admin/contacto", icon: MessageSquare },
  { label: "Pop-ups", href: "/admin/popups", icon: Megaphone },
];

export default function SidebarSection({ isOpen, onClose }: SidebarProps) {
  const { logout, isLoading } = useAuth();

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}


<aside
  className="
    hidden lg:flex
    sticky top-0 h-full min-h-fit w-72 flex-col
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

        <nav className="flex-1 px-6 pb-6 text-[#203565] dark:text-white border-y border-gray-200 dark:border-white/10">
          <p className="px-3 pt-6 pb-4 text-xs font-semibold tracking-[0.2em] uppercase text-[#5A6B93] dark:text-white/60">
            Navegación
          </p>
          <NavList
            items={navItems}
            className="text-base"
          />
        </nav>

        <div className="flex justify-center my-6">
          <Button size="sm" className="dark:bg-[#293296] dark:text-white">
            <div className="flex items-center gap-3 -mx-2">
              <SwitchMode />
              <p className="font-semibold text-lg">Dark mode</p>
            </div>
          </Button>
        </div>

        <div className="border-t border-gray-200 dark:border-white/10 p-4 bg-white dark:bg-[#141A3F]">
          <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-3 py-3 text-[#203565] dark:text-white">
            <div className="flex items-center gap-3 min-w-0">
              <div className="rounded-full shadow-sm shrink-0">
                <UserSection size="sm" enableDarkMode />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-[#5A6B93] dark:text-white/60 leading-none">
                  Bienvenido
                </p>
                <p className="text-sm font-semibold truncate">Administrador</p>
              </div>
            </div>

            <Button
              size="sm"
              onClick={logout}
              disabled={isLoading}
              className="mt-3 w-full bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 text-white px-3"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader size="sm" color="border-white" />
                  <span className="font-semibold text-sm">Cerrando...</span>
                </div>
              ) : (
                <span className="font-semibold text-sm">Cerrar Sesión</span>
              )}
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
