'use client';

import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import SwitchMode from "@/components/molecules/admin/SwitchMode";
import Button from "@/components/atoms/Button";
import NavList from "@/components/molecules/admin/NavList";
import UserSection from "@/components/molecules/header/UserSection";
import Loader from "@/components/atoms/Loader";
import Link from "next/link";
import Logo from "@/components/atoms/Logo";
import {
  BellRing,
  ClipboardList,
  FileText,
  LayoutDashboard,
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
  { label: "General", href: "/admin", icon: LayoutDashboard },
  { label: "Seguimiento", href: "/admin/seguimiento", icon: ClipboardList },
  { label: "Blogs", href: "/admin/blogs", icon: FileText },
  { label: "Productos", href: "/admin/productos", icon: Package },
  { label: "Usuarios", href: "/admin/usuarios", icon: Users },
  { label: "Reclamaciones", href: "/admin/reclamaciones", icon: BellRing },
  { label: "Contacto", href: "/admin/contacto", icon: MessageSquare },
  { label: "Pop-ups", href: "/admin/popups", icon: Megaphone },
  {
    label: "Plantillas", href: "/admin/templates", icon: FileText
  }
];

export default function SidebarSection({ isOpen, onClose }: SidebarProps) {
  const { logout, isLoading } = useAuth();
  const navRef = useRef<HTMLElement | null>(null);
  const [showTopFade, setShowTopFade] = useState(false);
  const [showBottomFade, setShowBottomFade] = useState(true);

  const updateFadeState = () => {
    const navElement = navRef.current;

    if (!navElement) return;

    const { scrollTop, clientHeight, scrollHeight } = navElement;
    const threshold = 6;

    setShowTopFade(scrollTop > threshold);
    setShowBottomFade(scrollTop + clientHeight < scrollHeight - threshold);
  };

  useEffect(() => {
    updateFadeState();

    const onResize = () => updateFadeState();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

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
    fixed top-0 left-0 h-screen w-72 flex-col
    border-r border-gray-300
    bg-white dark:bg-[#141A3F]
    transition-colors duration-300
  "
>
        <div className="flex flex-col items-center gap-2 py-8 px-6 border-b border-gray-200 dark:border-white/10">
        <Link href="/">
          <Logo src="/logo.svg" darkSrc="/logo-white.png" size="xl" alt="Yuntas Publicidad" />
        </Link>
        <span className="text-base font-semibold tracking-widest uppercase text-[#5A6B93] dark:text-white/70">
          Administración
        </span>
      </div>

        <div className="relative flex-1 min-h-0 px-6 pb-6 mt-4">
          <nav
            ref={navRef}
            onScroll={updateFadeState}
            className="h-full overflow-y-auto scrollbar-hidden text-[#203565] dark:text-white"
          >
            <NavList
              items={navItems}
              className="text-base"
            />
          </nav>

          {showTopFade && (
            <div className="pointer-events-none absolute left-6 right-6 top-0 h-6 bg-gradient-to-b from-white to-transparent dark:from-[#141A3F]" />
          )}

          {showBottomFade && (
            <div className="pointer-events-none absolute left-6 right-6 bottom-6 h-6 bg-gradient-to-t from-white to-transparent dark:from-[#141A3F]" />
          )}
        </div>

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