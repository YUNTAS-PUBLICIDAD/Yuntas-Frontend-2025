'use client'

import SidebarSection from "@/components/organisms/admin/SidebarSection";
import Encabezado from "@/components/molecules/Encabezado";
import { useTokenValidation } from "@/hooks/useTokenValidation";
import Loader from "@/components/atoms/Loader";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isLoading } = useTokenValidation();

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

  return (
    <div className="
      flex flex-col min-h-screen
      bg-white dark:bg-[#141A3F]
      transition-colors duration-300
    ">
      {/* Encabezado */}
      <Encabezado variant="azul">SECCIÓN PRINCIPAL</Encabezado>

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
