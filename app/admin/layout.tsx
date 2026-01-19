'use client';

import { useState } from "react";
import SidebarSection from "@/components/organisms/admin/SidebarSection";
import Encabezado from "@/components/molecules/Encabezado";
import { useTokenValidation } from "@/hooks/useTokenValidation";
import Loader from "@/components/atoms/Loader";
import { useSelectedLayoutSegment } from "next/navigation";
import UserSection from "@/components/molecules/header/UserSection";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading } = useTokenValidation();
  const segment = useSelectedLayoutSegment();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isLoading) {
    return (
      <div
        className="
          min-h-screen flex items-center justify-center
          bg-white dark:bg-[#141A3F]
        "
      >
        <Loader size="lg" />
      </div>
    );
  }

  const titleMap: Record<string, string> = {
    admin: "Bienvenido Administrador",
    blogs: "Blogs",
    productos: "Productos",
    usuarios: "Usuarios",
    reclamaciones: "Reclamaciones",
    seguimiento: "Seguimiento",
  };

  const key = segment ?? "admin";
  const title = titleMap[key] ?? "Panel de Administración";

  return (
    <div
      className="
        flex flex-col min-h-screen
        bg-white dark:bg-[#141A3F]
        transition-colors duration-300
      "
    >
      {/* ───────────────── TOP BAR (solo móvil) ───────────────── */}
      <div
        className="
          flex items-center justify-between
          h-16 px-6
          bg-white dark:bg-[#141A3F]
          border-b border-gray-200 dark:border-white/10
          md:hidden
        "
      >
        {/* Hamburguesa */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-2xl text-[#0D1030] dark:text-white"
          aria-label="Abrir menú"
        >
          ☰
        </button>

        {/* Usuario */}
        <UserSection size="sm" />
      </div>

      {/* ───────────────── ENCABEZADO AZUL ───────────────── */}
      <Encabezado variant="azul">{title}</Encabezado>

      {/* ───────────────── CONTENIDO ───────────────── */}
      <div
        className="
          flex flex-1
          bg-white dark:bg-[#141A3F]
          transition-colors duration-300
        "
      >
        {/* Overlay móvil */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="
              fixed inset-0 bg-black/50 z-30
              md:hidden
            "
          />
        )}

        {/* Sidebar */}
        <SidebarSection
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Página */}
        <main
          className="
            flex-1 py-16 px-8
            bg-white dark:bg-[#141A3F]
            transition-colors duration-300
          "
        >
          {children}
        </main>
      </div>
    </div>
  );
}
