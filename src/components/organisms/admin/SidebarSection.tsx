"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import NavList from "@/components/molecules/admin/NavList";
import Loader from "@/components/atoms/Loader";
import Link from "next/link";
import Logo from "@/components/atoms/Logo";
import { LogOut } from "lucide-react";
import { useBrandLogo } from "@/hooks/useBrandLogo";
import { getRole } from "@/utils/role";
import {
  BellRing,
  ClipboardList,
  FileText,
  LayoutDashboard,
  Megaphone,
  Settings,
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

const getNavItems = (): NavItem[] => {
  const role = getRole();

  return [
    { label: "General", href: "/admin", icon: LayoutDashboard },

    ...(role === "admin"
      ? [
          {
            label: "Seguimiento",
            href: "/admin/seguimiento",
            icon: ClipboardList,
          },
        ]
      : []),

    { label: "Blogs", href: "/admin/blogs", icon: FileText },
    { label: "Productos", href: "/admin/productos", icon: Package },

    ...(role === "admin"
      ? [
          {
            label: "Usuarios",
            href: "/admin/usuarios",
            icon: Users,
          },
        ]
      : []),

    { label: "Reclamaciones", href: "/admin/reclamaciones", icon: BellRing },
    { label: "Contacto", href: "/admin/contacto", icon: MessageSquare },
    { label: "Pop-ups", href: "/admin/popups", icon: Megaphone },
    { label: "Plantillas", href: "/admin/templates", icon: FileText },
    { label: "Configuracion", href: "/admin/configuracion", icon: Settings },

        ...(role === "admin"
      ? [
          {
            label: "Historial",
            href: "/admin/historial",
            icon: ClipboardList,
          },
        ]
      : []),
  ];
};

export default function SidebarSection({ isOpen, onClose }: SidebarProps) {
  const { logout, isLoading } = useAuth();
  const navRef = useRef<HTMLElement | null>(null);
  const { logoLight, logoDark, companyName } = useBrandLogo();
  const [showTopFade, setShowTopFade] = useState(false);
  const [showBottomFade, setShowBottomFade] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const updateFadeState = () => {
    const el = navRef.current;
    if (!el) return;
    const { scrollTop, clientHeight, scrollHeight } = el;
    setShowTopFade(scrollTop > 6);
    setShowBottomFade(scrollTop + clientHeight < scrollHeight - 6);
  };

  useEffect(() => {
    updateFadeState();
    window.addEventListener("resize", updateFadeState);
    return () => window.removeEventListener("resize", updateFadeState);
  }, []);

  return (
    <>
      {isOpen && (
        <div onClick={onClose} className="fixed inset-0 bg-black/50 z-30 md:hidden" />
      )}

      <aside className="
        hidden lg:flex fixed top-0 left-0 h-screen w-72 flex-col
        border-r border-gray-300 dark:border-white/10
        bg-white dark:bg-[#141A3F]
        transition-colors duration-300
        overflow-hidden
      ">
        {/* Logo */}
        <div className="flex flex-col items-center gap-1 py-4 px-4 border-b border-gray-200 dark:border-white/10">
          <Link href="/">
            <Logo src={logoLight} darkSrc={logoDark} size="lg" alt={companyName} />
          </Link>
          <span className="text-sm font-semibold tracking-widest uppercase text-[#5A6B93] dark:text-white/70">
            Administración
          </span>
        </div>

        {/* Nav */}
       <div className="relative flex-1 min-h-0 px-3"> 
        <nav
          ref={navRef}
          onScroll={updateFadeState}
          className="h-full overflow-y-auto scrollbar-hidden text-brand-blue dark:text-white pt-4" 
        >
          <NavList items={getNavItems()} />
        </nav>

          {showTopFade && (
            <div className="pointer-events-none absolute left-2 right-2 top-0 h-6 bg-gradient-to-b from-white to-transparent dark:from-[#141A3F]" />
          )}
          {showBottomFade && (
            <div className="pointer-events-none absolute left-2 right-2 bottom-0 h-6 bg-gradient-to-t from-white to-transparent dark:from-[#141A3F]" />
          )}
        </div>

        {/* Cerrar Sesión */}
        <div className="px-6 pb-4 pt-1">
          <button
            onClick={() => setShowLogoutModal(true)}
            disabled={isLoading}
            className="
              w-full flex items-center justify-center gap-3
              px-4 py-3 rounded-[20px]
              bg-[#EF4444] hover:bg-red-500
              text-white font-semibold text-base
              transition-all duration-200
              disabled:opacity-60
            "
          >
            {isLoading ? (
              <><Loader size="sm" color="border-white" /><span>Cerrando...</span></>
            ) : (
              <><LogOut size={18} /><span>Cerrar Sesión</span></>
            )}
          </button>
        </div>
      </aside>
     {showLogoutModal && (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-4">
        <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-[#141A3F]">

          {/* Botón X */}
          <button
            type="button"
            onClick={() => setShowLogoutModal(false)}
            className="absolute right-4 top-4 text-2xl font-bold text-gray-500 hover:text-gray-800 dark:text-white/70 dark:hover:text-white"
            aria-label="Cerrar"
          >
            ×
          </button>

          {/* Icono */}
          <div className="flex justify-center pt-2">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/10">
              <LogOut className="h-8 w-8 text-red-500" />
            </div>
          </div>

          {/* Título */}
          <h2 className="mt-5 text-center text-2xl font-bold text-[#0D1030] dark:text-white">
            ¿Cerrar sesión?
          </h2>

          {/* Mensaje */}
          <p className="mt-3 text-center text-sm leading-6 text-gray-600 dark:text-white/70">
            ¿Estás seguro de que deseas salir? 
          </p>

          {/* Botones */}
          <div className="mt-7 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => setShowLogoutModal(false)}
              className="rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-white/10 dark:text-white dark:hover:bg-white/10"
            >
              Cancelar
            </button>

            <button
              type="button"
              onClick={logout}
              disabled={isLoading}
              className="flex items-center gap-2 rounded-xl bg-[#EF4444] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-500 disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader size="sm" color="border-white" />
                  <span>Cerrando...</span>
                </>
              ) : (
                <>
                  <LogOut size={17} />
                  <span>Cerrar sesión</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    )}




























    </>
  );
}