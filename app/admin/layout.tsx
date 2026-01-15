'use client';

import SidebarSection from "@/components/organisms/admin/SidebarSection";
import Encabezado from "@/components/molecules/Encabezado";
import { useTokenValidation } from "@/hooks/useTokenValidation";
import Loader from "@/components/atoms/Loader";
import { useSelectedLayoutSegment } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isLoading } = useTokenValidation();
  const segment = useSelectedLayoutSegment();

  if (isLoading) {
    return (
      <div className="
        min-h-screen flex items-center justify-center
        bg-white dark:bg-[#141A3F]
      ">
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
    <div className="
      flex flex-col min-h-screen
      bg-white dark:bg-[#141A3F]
      transition-colors duration-300
    ">
      {/* Encabezado */}
      <Encabezado variant="azul">{title}</Encabezado>

      {/* Contenido */}
      <div className="
        flex flex-1
        bg-white dark:bg-[#141A3F]
        transition-colors duration-300
      ">
        {/* Sidebar */}
        <SidebarSection />

        {/* Página */}
        <main className="
          flex-1 py-16 px-8
          bg-white dark:bg-[#141A3F]
          transition-colors duration-300
        ">
          {children}
        </main>
      </div>
    </div>
  );

}
