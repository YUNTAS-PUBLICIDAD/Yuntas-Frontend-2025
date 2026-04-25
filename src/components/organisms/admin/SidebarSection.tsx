"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import NavList from "@/components/molecules/admin/NavList";
import Loader from "@/components/atoms/Loader";
import Link from "next/link";
import Logo from "@/components/atoms/Logo";
import { LogOut } from "lucide-react";
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

const navItems: NavItem[] = [
  { label: "General", href: "/admin", icon: LayoutDashboard },
  { label: "Seguimiento", href: "/admin/seguimiento", icon: ClipboardList },
  { label: "Blogs", href: "/admin/blogs", icon: FileText },
  { label: "Productos", href: "/admin/productos", icon: Package },
  { label: "Usuarios", href: "/admin/usuarios", icon: Users },
  { label: "Reclamaciones", href: "/admin/reclamaciones", icon: BellRing },
  { label: "Contacto", href: "/admin/contacto", icon: MessageSquare },
  { label: "Pop-ups", href: "/admin/popups", icon: Megaphone },
  { label: "Plantillas", href: "/admin/templates", icon: FileText },
  //{ label: "Configuracion",       href: "/admin/configuracion",     icon: Settings   },
];

export default function SidebarSection({ isOpen, onClose }: SidebarProps) {
  const { logout, isLoading } = useAuth();
  const navRef = useRef<HTMLElement | null>(null);
  const [showTopFade, setShowTopFade] = useState(false);
  const [showBottomFade, setShowBottomFade] = useState(true);

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
            <Logo src="/logo.svg" darkSrc="/logo-white.png" size="lg" alt="Yuntas Publicidad" />
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
          className="h-full overflow-y-auto scrollbar-hidden text-[#203565] dark:text-white pt-5" 
        >
          <NavList items={navItems} />
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
            onClick={logout}
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
    </>
  );
}