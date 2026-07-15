"use client"

import PopupConfigForm from "@/components/molecules/admin/popups/PopupConfigForm";
import { usePopups } from "@/hooks/usePopups"
import { useEffect, useMemo, useState } from "react";
import { House, Package2, FileText } from "lucide-react";
import Link from "next/link";
import { getPermissions } from "@/utils/permission";

type TabType = "inicio" | "product-detail";

export default function PopupsPage(){
  const {popups, getPopups, savePopup, isLoading, isSaving} = usePopups();

  const [tab, setTab] = useState<TabType>("inicio");

  const permissions = getPermissions();

  const canCreate = permissions.includes("popups.crear");
  const canEdit = permissions.includes("popups.editar");

  useEffect(() => {
    getPopups();
  }, []);

  useEffect(() => {
    console.log("TAB:", tab);
    console.log("POPUPS:", popups.map(p => p.page_target));
  }, [tab, popups]);

  const handleSave = async (data: any) => {
    const isUpdate = !!data.id;

    if (isUpdate && !canEdit) {
        throw new Error("No tienes permiso para editar este popup.");
    }

    if (!isUpdate && !canCreate) {
        throw new Error("No tienes permiso para crear popups.");
    }

    const res = await savePopup(data, isUpdate);

    if (!res.success) {
        throw new Error(res.message || "Error al guardar el popup");
    }

    getPopups();
};

  const currentPopup = popups.find((p) => p.page_target === tab) || null;
  //
  // const currentPopup = useMemo(() => {
  //   return popups.find(p => p.page_target === tab) ?? null;
  // }, [popups, tab]);

  return (
    <div className="flex flex-col gap-4">
      {/* HEADER + TABS */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between border-b border-gray-200 dark:border-white/10 pb-3 gap-3">
        <h1 className="text-lg font-bold text-gray-800 dark:text-white truncate pt-1">
          Configuración de Popups
        </h1>

        <div className="flex flex-col items-start sm:items-end gap-3 w-full sm:w-auto">
          <Link 
            href="/admin/templates"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold bg-[#203565] hover:bg-[#162548] text-white dark:bg-white dark:text-[#203565] dark:hover:bg-white/90 rounded-xl transition-all shadow-sm whitespace-nowrap"
          >
            <FileText className="h-4 w-4" />
            Ver Plantillas
          </Link>

          <div className="flex gap-2 bg-gray-100 dark:bg-[#141A3F] p-1 rounded-lg overflow-x-auto max-w-full">
            <button
              onClick={() => setTab("inicio")}
              className={`inline-flex items-center gap-2 px-4 py-1.5 text-sm rounded-md transition-all font-semibold shrink-0 ${
                tab === "inicio"
                  ? "bg-white dark:bg-[#293296] text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-white/60 hover:text-black dark:hover:text-white"
              }`}
            >
              <House className="h-4 w-4" />
              Inicio
            </button>

            <button
              onClick={() => setTab("product-detail")}
              className={`inline-flex items-center gap-2 px-4 py-1.5 text-sm rounded-md transition-all font-semibold shrink-0 ${
                tab === "product-detail"
                  ? "bg-white dark:bg-[#293296] text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-white/60 hover:text-black dark:hover:text-white"
              }`}
            >
              <Package2 className="h-4 w-4" />
              Producto
            </button>
          </div>
        </div>
      </div>
      <PopupConfigForm onCancel={() => {}} key={tab} pageTarget={tab} initialData={currentPopup} onSubmit={handleSave} isSaving={isSaving}/>
    </div>
  )
}
