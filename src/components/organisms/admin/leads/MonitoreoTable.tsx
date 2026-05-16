"use client";

import { useAdminTable } from "@/hooks/ui/admin/useAdminTable";

//icono del Empty State
const SearchXIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mb-2">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.3-4.3"></path>
        <path d="m13.5 8.5-5 5"></path>
        <path d="m8.5 8.5 5 5"></path>
    </svg>
);

interface MonitoreoTableProps<T = any> {
  data: T[];
  minRows?: number;
  isLoading?: boolean;
  emptyMessage?: string;
  onResetSearch?: () => void;
  resetSearchText?: string;
}

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "NOMBRE" },
  { key: "email_messages", label: "MENSAJES EMAIL" },
  { key: "email_messages_last", label: "ÚLTIMO EMAIL" },
  { key: "email_campaigns", label: "CAMPAÑAS EMAIL" },
  { key: "email_campaigns_last", label: "ÚLTIMA CAMPAÑA EMAIL" },
  { key: "whatsapp_messages", label: "MENSAJES WHATSAPP" },
  { key: "whatsapp_messages_last", label: "ÚLTIMO WHATSAPP" },
  { key: "whatsapp_campaigns", label: "CAMPAÑAS WHATSAPP" },
  { key: "whatsapp_campaigns_last", label: "ÚLTIMA CAMPAÑA WHATSAPP" },
];

export default function MonitoreoTable({
  data,
  minRows = 5,
  isLoading = false,
  emptyMessage = "No se encontraron registros",
  onResetSearch,
  resetSearchText = "Ver todos",
}: MonitoreoTableProps) {
  const { rows } = useAdminTable({ data, minRows });

  const isDataEmpty = data.length === 0;

if (!isLoading && isDataEmpty) {
      return (
        <div className="w-full rounded-[1.75rem] border border-[#D8E7F3] bg-white/95 p-3 shadow-[0_18px_40px_rgba(13,16,48,0.07)] dark:border-white/10 dark:bg-[#1C2347]/95 md:p-5">
            <div className="flex flex-col items-center justify-center py-12 px-4 bg-gray-50/50 dark:bg-[#1C2347]/50 border-2 border-dashed border-gray-300 dark:border-white/10 rounded-lg mt-4 w-full transition-colors duration-300">
                  <SearchXIcon />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{emptyMessage}</h3>
              <p className="text-gray-500 dark:text-gray-300 text-sm mt-1 text-center max-w-sm">
                      No hay resultados para tu búsqueda. Intenta con otro término o revisa la ortografía.
              </p>
              {onResetSearch && (
                  <button
                      onClick={onResetSearch}
                  className="mt-4 text-sm text-[#203565] dark:text-[#6DE1E3] font-semibold hover:underline"
                  >
                      {resetSearchText}
                  </button>
              )}
            </div>
        </div>
      );
  }

  return (
    <div className="w-full rounded-[1.75rem] border border-[#D8E7F3] bg-white/95 p-3 shadow-[0_18px_40px_rgba(13,16,48,0.07)] dark:border-white/10 dark:bg-[#1C2347]/95 md:p-5">
    <div className="w-full px-2 md:px-0">
      <table className="w-full block lg:table border-separate border-spacing-y-4 lg:border-spacing-y-2">
        {/* HEADER solo desktop */}
        <thead className="hidden lg:table-header-group">
          <tr className="bg-[#0D1030] dark:bg-[#293296]">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`text-white font-semibold text-sm py-3 px-3 text-center first:rounded-l-lg last:rounded-r-lg`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="block lg:table-row-group">
          {isLoading
            ? Array.from({ length: minRows }).map((_, index) => (
                <tr
                  key={`monitor-desktop-skeleton-${index}`}
                  className="hidden lg:table-row mb-4 lg:mb-0 rounded-lg overflow-hidden"
                >
                  {columns.map((col) => (
                    <td
                      key={`${col.key}-${index}`}
                        className="py-3 px-4 bg-[#F4F4F2] dark:bg-[#151A3D] first:rounded-l-lg last:rounded-r-lg"
                    >
                      <div className="h-4 w-full max-w-[7rem] mx-auto rounded bg-gray-200 dark:bg-white/10 animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))
            : rows.map((row, index) => {
            const isEmpty = row._empty === true;

            return (
              <tr
                key={row.id || index}
                className="block lg:table-row mb-4 lg:mb-0 rounded-lg overflow-hidden"
              >
                {columns.map((col) => {
                  const isCount = [
                    "email_messages",
                    "email_campaigns",
                    "whatsapp_messages",
                    "whatsapp_campaigns",
                  ].includes(col.key);
                  const isDate = col.key.includes("_last");

                  return (
                    <td
                      key={col.key}
                      className={`flex justify-between items-center lg:table-cell
                                            py-2 lg:py-3 px-4 lg:px-3 text-center
                                            bg-[#F4F4F2] dark:bg-[#151A3D]
                                            first:rounded-l-lg
                                            last:rounded-r-lg
                                            ${col.key === "id" ? "font-bold text-[#0D1030] dark:text-white" : "text-[#0D1030] dark:text-white"}
                                            ${isCount ? "font-semibold" : ""}
                                            ${isDate ? "text-sm text-gray-600 dark:text-gray-300" : ""}
                                        `}
                    >
                      <span className="lg:hidden font-black uppercase text-xs text-[#0D1030] dark:text-gray-200">
                        {col.label}:
                      </span>

                      <span className="text-right lg:text-center ml-4 text-[#0D1030] dark:text-white">
                        {isEmpty ? "" : row[col.key]}
                      </span>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {isLoading && (
        <div className="lg:hidden flex flex-col gap-6">
          {Array.from({ length: Math.max(2, Math.min(minRows, 4)) }).map((_, index) => (
            <div
              key={`monitor-mobile-skeleton-${index}`}
              className="bg-white dark:bg-[#151A3D] border border-[#E5EEF6] dark:border-[#4A6FD8] rounded-[1.5rem] p-6 shadow-sm transition-colors duration-300"
            >
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((__, lineIndex) => (
                  <div key={`line-${lineIndex}`} className="flex justify-between items-center gap-4">
                    <div className="h-3 w-24 rounded bg-gray-200 dark:bg-white/10 animate-pulse" />
                    <div className="h-4 w-20 rounded bg-gray-200 dark:bg-white/10 animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}
