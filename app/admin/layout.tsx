"use client";

import { useEffect, useState } from "react";
import SidebarSection from "@/components/organisms/admin/SidebarSection";
import Encabezado from "@/components/molecules/Encabezado";
import { useTokenValidation } from "@/hooks/useTokenValidation";
import Loader from "@/components/atoms/Loader";
import { useSelectedLayoutSegment } from "next/navigation";
import HeaderAdmin from "@/components/organisms/admin/HeaderAdmin";
import HeaderMobil from "@/components/organisms/HeaderMobil";
import AdminBreadcrumbs from "@/components/molecules/admin/AdminBreadcrumbs";
import { adminSections, getAdminSectionKey } from "@/config/adminSections";

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

  const key = getAdminSectionKey(segment);
  const title = adminSections[key].label;

  return (
    <div className="flex min-h-screen bg-white dark:bg-[#141A3F] transition-colors duration-300">

      {/* ───────────────── SIDEBAR (desktop) ───────────────── */}
      <SidebarSection
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* ───────────────── COLUMNA DERECHA ───────────────── */}
      <div className="flex flex-col flex-1 min-w-0">

        {/* HEADER DESKTOP */}
        <HeaderAdmin className="text-black" />

        {/* HEADER MOBILE */}
        <HeaderMobil />

        {/* CONTENIDO */}
        <main className="flex-1 py-6 px-4 md:py-8 md:px-8 pt-20 md:pt-6 bg-white dark:bg-[#141A3F] transition-colors duration-300">
          <AdminBreadcrumbs />
          <h1 className="mb-6 text-2xl font-bold text-[#0D1030] dark:text-white md:text-3xl">
            {title}
          </h1>
          {children}
        </main>
      </div>
    </div>
  );
}