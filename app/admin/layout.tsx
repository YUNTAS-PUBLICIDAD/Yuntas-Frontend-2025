"use client";

import { useEffect, useState } from "react";
import SidebarSection from "@/components/organisms/admin/SidebarSection";
import Encabezado from "@/components/molecules/Encabezado";
import { useTokenValidation } from "@/hooks/useTokenValidation";
import Loader from "@/components/atoms/Loader";
import { useSelectedLayoutSegment } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading } = useTokenValidation();
  const segment = useSelectedLayoutSegment();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#141A3F]">
        <Loader size="lg" />
      </div>
    );
  }

  const titleMap: Record<string, string> = {
    blogs: "Blogs",
    productos: "Productos",
    usuarios: "Usuarios",
    reclamaciones: "Reclamaciones",
    seguimiento: "Seguimiento",
    contacto: "Contacto",
  };

  const key = segment ?? "seguimiento";
  const title = titleMap[key] ?? "Panel de Administración";

  return (
    <div className="flex pt-16 md:pt-0 flex-col min-h-screen bg-white dark:bg-[#141A3F] transition-colors duration-300">
      {/* ───────────────── ENCABEZADO AZUL ───────────────── */}
      <Encabezado variant="azul">{title}</Encabezado>

      {/* ───────────────── CONTENIDO ───────────────── */}
      <div className="flex flex-1 bg-white dark:bg-[#141A3F] transition-colors duration-300">
        {/* Sidebar */}
        <SidebarSection
          isOpen={false}
          onClose={() => {}}
        />

        {/* Página */}
        <main className="flex-1 min-w-0 py-6 px-4 md:py-8 md:px-8 bg-white dark:bg-[#141A3F] transition-colors duration-300">
          {children}
        </main>
      </div>
    </div>
  );
}
