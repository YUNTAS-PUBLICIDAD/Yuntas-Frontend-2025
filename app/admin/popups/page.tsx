"use client"

import PopupConfigForm from "@/components/molecules/admin/popups/PopupConfigForm";
import { usePopups } from "@/hooks/usePopups"
import { useEffect, useMemo, useState } from "react";
import { House, Package2 } from "lucide-react";

type TabType = "inicio" | "product-detail";

export default function PopupsPage(){
  const {popups, getPopups, savePopup, isLoading, isSaving} = usePopups();

  const [tab, setTab] = useState<TabType>("inicio");

  useEffect(() => {
    getPopups();
  }, []);

  useEffect(() => {
    console.log("TAB:", tab);
    console.log("POPUPS:", popups.map(p => p.page_target));
  }, [tab, popups]);

  const handleSave = async (data:any) => {
    const isUpdate = !!data.id;
    await savePopup(data, isUpdate);
    getPopups();
  };

  const currentPopup = popups.find((p) => p.page_target === tab) || null;
  //
  // const currentPopup = useMemo(() => {
  //   return popups.find(p => p.page_target === tab) ?? null;
  // }, [popups, tab]);

  return (
    <div className="flex flex-col gap-4">
      {/*HEADER + TABS*/}
      {/* HEADER + TABS */}
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-3">

              <h1 className="text-lg font-bold text-gray-800 dark:text-white">
                Configuración de Popups
              </h1>

              <div className="flex gap-2 bg-gray-100 dark:bg-[#141A3F] p-1 rounded-lg">

                <button
                  onClick={() => setTab("inicio")}
                  className={`inline-flex items-center gap-2 px-4 py-1.5 text-sm rounded-md transition-all font-semibold ${
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
                  className={`inline-flex items-center gap-2 px-4 py-1.5 text-sm rounded-md transition-all font-semibold ${
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
    <PopupConfigForm onCancel={() => {}} key={tab} pageTarget={tab} initialData={currentPopup} onSubmit={handleSave} isSaving={isSaving}/>
    </div>
  )
}
